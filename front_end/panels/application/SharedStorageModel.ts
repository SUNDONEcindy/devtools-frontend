// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as ProtocolProxyApi from '../../generated/protocol-proxy-api.js';
import * as Protocol from '../../generated/protocol.js';

export class SharedStorageForOrigin extends Common.ObjectWrapper.ObjectWrapper<SharedStorageForOrigin.EventTypes> {
  readonly #model: SharedStorageModel;
  readonly #securityOrigin: string;

  constructor(model: SharedStorageModel, securityOrigin: string) {
    super();
    this.#model = model;
    this.#securityOrigin = securityOrigin;
  }

  get securityOrigin(): string {
    return this.#securityOrigin;
  }

  async getMetadata(): Promise<Protocol.Storage.SharedStorageMetadata|null> {
    return await this.#model.storageAgent.invoke_getSharedStorageMetadata({ownerOrigin: this.securityOrigin})
        .then(({metadata}) => metadata);
  }

  async getEntries(): Promise<Protocol.Storage.SharedStorageEntry[]|null> {
    return await this.#model.storageAgent.invoke_getSharedStorageEntries({ownerOrigin: this.securityOrigin})
        .then(({entries}) => entries);
  }

  async setEntry(key: string, value: string, ignoreIfPresent: boolean): Promise<void> {
    await this.#model.storageAgent.invoke_setSharedStorageEntry(
        {ownerOrigin: this.securityOrigin, key, value, ignoreIfPresent});
  }

  async deleteEntry(key: string): Promise<void> {
    await this.#model.storageAgent.invoke_deleteSharedStorageEntry({ownerOrigin: this.securityOrigin, key});
  }

  async clear(): Promise<void> {
    await this.#model.storageAgent.invoke_clearSharedStorageEntries({ownerOrigin: this.securityOrigin});
  }

  async resetBudget(): Promise<void> {
    await this.#model.storageAgent.invoke_resetSharedStorageBudget({ownerOrigin: this.securityOrigin});
  }
}

export namespace SharedStorageForOrigin {
  export const enum Events {
    SHARED_STORAGE_CHANGED = 'SharedStorageChanged',
  }

  export interface SharedStorageChangedEvent {
    accessTime: Protocol.Network.TimeSinceEpoch;
    scope: Protocol.Storage.SharedStorageAccessScope;
    method: Protocol.Storage.SharedStorageAccessMethod;
    mainFrameId: Protocol.Page.FrameId;
    ownerSite: string;
    params: Protocol.Storage.SharedStorageAccessParams;
  }

  export interface EventTypes {
    [Events.SHARED_STORAGE_CHANGED]: SharedStorageChangedEvent;
  }
}

export class SharedStorageModel extends SDK.SDKModel.SDKModel<EventTypes> implements
    ProtocolProxyApi.StorageDispatcher {
  readonly #securityOriginManager: SDK.SecurityOriginManager.SecurityOriginManager;
  #storages: Map<string, SharedStorageForOrigin>;
  readonly storageAgent: ProtocolProxyApi.StorageApi;
  #enabled: boolean;

  constructor(target: SDK.Target.Target) {
    super(target);
    target.registerStorageDispatcher(this);
    this.#securityOriginManager = target.model(SDK.SecurityOriginManager.SecurityOriginManager) as
        SDK.SecurityOriginManager.SecurityOriginManager;
    this.#storages = new Map();
    this.storageAgent = target.storageAgent();
    this.#enabled = false;
  }

  async enable(): Promise<void> {
    if (this.#enabled) {
      return;
    }

    this.#securityOriginManager.addEventListener(
        SDK.SecurityOriginManager.Events.SecurityOriginAdded, this.#securityOriginAdded, this);
    this.#securityOriginManager.addEventListener(
        SDK.SecurityOriginManager.Events.SecurityOriginRemoved, this.#securityOriginRemoved, this);

    await this.storageAgent.invoke_setSharedStorageTracking({enable: true});
    this.#addAllOrigins();
    this.#enabled = true;
  }

  disable(): void {
    if (!this.#enabled) {
      return;
    }

    this.#securityOriginManager.removeEventListener(
        SDK.SecurityOriginManager.Events.SecurityOriginAdded, this.#securityOriginAdded, this);
    this.#securityOriginManager.removeEventListener(
        SDK.SecurityOriginManager.Events.SecurityOriginRemoved, this.#securityOriginRemoved, this);

    void this.storageAgent.invoke_setSharedStorageTracking({enable: false});
    this.#removeAllOrigins();
    this.#enabled = false;
  }

  override dispose(): void {
    this.disable();
  }

  #addAllOrigins(): void {
    for (const securityOrigin of this.#securityOriginManager.securityOrigins()) {
      void this.#maybeAddOrigin(securityOrigin);
    }
  }

  #removeAllOrigins(): void {
    for (const securityOrigin of this.#storages.keys()) {
      this.#removeOrigin(securityOrigin);
    }
  }

  #securityOriginAdded(event: Common.EventTarget.EventTargetEvent<string>): void {
    this.#maybeAddOrigin(event.data);
  }

  #maybeAddOrigin(securityOrigin: string): void {
    const parsedSecurityOrigin = new Common.ParsedURL.ParsedURL(securityOrigin);
    // These are "opaque" origins which are not supposed to support shared storage.
    if (!parsedSecurityOrigin.isValid || parsedSecurityOrigin.scheme === 'data' ||
        parsedSecurityOrigin.scheme === 'about' || parsedSecurityOrigin.scheme === 'javascript') {
      return;
    }

    // Only add origin if it's not already added.
    if (this.#storages.has(securityOrigin)) {
      return;
    }

    const storage = new SharedStorageForOrigin(this, securityOrigin);
    this.#storages.set(securityOrigin, storage);
    this.dispatchEventToListeners(Events.SHARED_STORAGE_ADDED, storage);
  }

  #securityOriginRemoved(event: Common.EventTarget.EventTargetEvent<string>): void {
    this.#removeOrigin(event.data);
  }

  #removeOrigin(securityOrigin: string): void {
    const storage = this.storageForOrigin(securityOrigin);
    if (!storage) {
      return;
    }
    this.#storages.delete(securityOrigin);
    this.dispatchEventToListeners(Events.SHARED_STORAGE_REMOVED, storage);
  }

  storages(): IterableIterator<SharedStorageForOrigin> {
    return this.#storages.values();
  }

  storageForOrigin(origin: string): SharedStorageForOrigin|null {
    return this.#storages.get(origin) || null;
  }

  numStoragesForTesting(): number {
    return this.#storages.size;
  }

  isChangeEvent(event: Protocol.Storage.SharedStorageAccessedEvent): boolean {
    return [
      Protocol.Storage.SharedStorageAccessMethod.Set,
      Protocol.Storage.SharedStorageAccessMethod.Append,
      Protocol.Storage.SharedStorageAccessMethod.Delete,
      Protocol.Storage.SharedStorageAccessMethod.Clear,
    ].includes(event.method);
  }

  sharedStorageAccessed(event: Protocol.Storage.SharedStorageAccessedEvent): void {
    if (this.isChangeEvent(event)) {
      const sharedStorage = this.storageForOrigin(event.ownerOrigin);

      if (sharedStorage) {
        const eventData = {
          accessTime: event.accessTime,
          method: event.method,
          mainFrameId: event.mainFrameId,
          ownerSite: event.ownerSite,
          params: event.params,
          scope: event.scope,
        };

        // Forward events that may have changed `sharedStorage` to listeners for `sharedStorage`.
        sharedStorage.dispatchEventToListeners(SharedStorageForOrigin.Events.SHARED_STORAGE_CHANGED, eventData);
      } else {
        void this.#maybeAddOrigin(event.ownerOrigin);
      }
    }

    this.dispatchEventToListeners(Events.SHARED_STORAGE_ACCESS, event);
  }

  sharedStorageWorkletOperationExecutionFinished(
      _event: Protocol.Storage.SharedStorageWorkletOperationExecutionFinishedEvent): void {
  }

  attributionReportingTriggerRegistered(_event: Protocol.Storage.AttributionReportingTriggerRegisteredEvent): void {
  }

  indexedDBListUpdated(_event: Protocol.Storage.IndexedDBListUpdatedEvent): void {
  }

  indexedDBContentUpdated(_event: Protocol.Storage.IndexedDBContentUpdatedEvent): void {
  }

  cacheStorageListUpdated(_event: Protocol.Storage.CacheStorageListUpdatedEvent): void {
  }

  cacheStorageContentUpdated(_event: Protocol.Storage.CacheStorageContentUpdatedEvent): void {
  }

  interestGroupAccessed(_event: Protocol.Storage.InterestGroupAccessedEvent): void {
  }

  interestGroupAuctionEventOccurred(_event: Protocol.Storage.InterestGroupAuctionEventOccurredEvent): void {
  }

  interestGroupAuctionNetworkRequestCreated(_event: Protocol.Storage.InterestGroupAuctionNetworkRequestCreatedEvent):
      void {
  }

  storageBucketCreatedOrUpdated(_event: Protocol.Storage.StorageBucketCreatedOrUpdatedEvent): void {
  }

  storageBucketDeleted(_event: Protocol.Storage.StorageBucketDeletedEvent): void {
  }

  attributionReportingSourceRegistered(_event: Protocol.Storage.AttributionReportingSourceRegisteredEvent): void {
  }
  attributionReportingReportSent(_event: Protocol.Storage.AttributionReportingReportSentEvent): void {
  }
  attributionReportingVerboseDebugReportSent(_event: Protocol.Storage.AttributionReportingVerboseDebugReportSentEvent):
      void {
  }
}

SDK.SDKModel.SDKModel.register(SharedStorageModel, {capabilities: SDK.Target.Capability.STORAGE, autostart: false});

export const enum Events {
  SHARED_STORAGE_ACCESS = 'SharedStorageAccess',
  SHARED_STORAGE_ADDED = 'SharedStorageAdded',
  SHARED_STORAGE_REMOVED = 'SharedStorageRemoved',
}

export interface EventTypes {
  [Events.SHARED_STORAGE_ACCESS]: Protocol.Storage.SharedStorageAccessedEvent;
  [Events.SHARED_STORAGE_ADDED]: SharedStorageForOrigin;
  [Events.SHARED_STORAGE_REMOVED]: SharedStorageForOrigin;
}
