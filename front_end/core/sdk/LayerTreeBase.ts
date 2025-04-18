// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import type * as Protocol from '../../generated/protocol.js';

import {DOMModel, type DOMNode} from './DOMModel.js';
import type {SnapshotWithRect} from './PaintProfiler.js';
import type {Target} from './Target.js';

export interface Layer {
  id(): string;
  parentId(): string|null;
  parent(): Layer|null;
  isRoot(): boolean;
  children(): Layer[];
  addChild(child: Layer): void;
  node(): DOMNode|null;
  nodeForSelfOrAncestor(): DOMNode|null;
  offsetX(): number;
  offsetY(): number;
  width(): number;
  height(): number;
  transform(): number[]|null;
  quad(): number[];
  anchorPoint(): number[];
  invisible(): boolean;
  paintCount(): number;
  lastPaintRect(): Protocol.DOM.Rect|null;
  scrollRects(): Protocol.LayerTree.ScrollRect[];
  stickyPositionConstraint(): StickyPositionConstraint|null;
  gpuMemoryUsage(): number;
  requestCompositingReasons(): Promise<string[]>;
  requestCompositingReasonIds(): Promise<string[]>;
  drawsContent(): boolean;
  snapshots(): Array<Promise<SnapshotWithRect|null>>;
}

export namespace Layer {
  export const enum ScrollRectType {
    NON_FAST_SCROLLABLE = 'NonFastScrollable',
    TOUCH_EVENT_HANDLER = 'TouchEventHandler',
    WHEEL_EVENT_HANDLER = 'WheelEventHandler',
    REPAINTS_ON_SCROLL = 'RepaintsOnScroll',
    MAIN_THREAD_SCROLL_REASON = 'MainThreadScrollingReason',
  }
}

export class StickyPositionConstraint {
  readonly #stickyBoxRectInternal: Protocol.DOM.Rect;
  readonly #containingBlockRectInternal: Protocol.DOM.Rect;
  readonly #nearestLayerShiftingStickyBoxInternal: Layer|null;
  readonly #nearestLayerShiftingContainingBlockInternal: Layer|null;

  constructor(layerTree: LayerTreeBase|null, constraint: Protocol.LayerTree.StickyPositionConstraint) {
    this.#stickyBoxRectInternal = constraint.stickyBoxRect;
    this.#containingBlockRectInternal = constraint.containingBlockRect;
    this.#nearestLayerShiftingStickyBoxInternal = null;
    if (layerTree && constraint.nearestLayerShiftingStickyBox) {
      this.#nearestLayerShiftingStickyBoxInternal = layerTree.layerById(constraint.nearestLayerShiftingStickyBox);
    }

    this.#nearestLayerShiftingContainingBlockInternal = null;
    if (layerTree && constraint.nearestLayerShiftingContainingBlock) {
      this.#nearestLayerShiftingContainingBlockInternal =
          layerTree.layerById(constraint.nearestLayerShiftingContainingBlock);
    }
  }

  stickyBoxRect(): Protocol.DOM.Rect {
    return this.#stickyBoxRectInternal;
  }

  containingBlockRect(): Protocol.DOM.Rect {
    return this.#containingBlockRectInternal;
  }

  nearestLayerShiftingStickyBox(): Layer|null {
    return this.#nearestLayerShiftingStickyBoxInternal;
  }

  nearestLayerShiftingContainingBlock(): Layer|null {
    return this.#nearestLayerShiftingContainingBlockInternal;
  }
}

export class LayerTreeBase {
  readonly #targetInternal: Target|null;
  #domModel: DOMModel|null;
  layersById = new Map<string|number, Layer>();
  #rootInternal: Layer|null = null;
  #contentRootInternal: Layer|null = null;
  readonly #backendNodeIdToNodeInternal = new Map<Protocol.DOM.BackendNodeId, DOMNode|null>();
  #viewportSizeInternal?: {
    width: number,
    height: number,
  };

  constructor(target: Target|null) {
    this.#targetInternal = target;
    this.#domModel = target ? target.model(DOMModel) : null;
  }

  target(): Target|null {
    return this.#targetInternal;
  }

  root(): Layer|null {
    return this.#rootInternal;
  }

  setRoot(root: Layer|null): void {
    this.#rootInternal = root;
  }

  contentRoot(): Layer|null {
    return this.#contentRootInternal;
  }

  setContentRoot(contentRoot: Layer|null): void {
    this.#contentRootInternal = contentRoot;
  }

  forEachLayer<T>(callback: (arg0: Layer) => T, root?: Layer|null): T|boolean {
    if (!root) {
      root = this.root();
      if (!root) {
        return false;
      }
    }
    return callback(root) || root.children().some(this.forEachLayer.bind(this, callback));
  }

  layerById(id: string): Layer|null {
    return this.layersById.get(id) || null;
  }

  async resolveBackendNodeIds(requestedNodeIds: Set<Protocol.DOM.BackendNodeId>): Promise<void> {
    if (!requestedNodeIds.size || !this.#domModel) {
      return;
    }

    const nodesMap = await this.#domModel.pushNodesByBackendIdsToFrontend(requestedNodeIds);

    if (!nodesMap) {
      return;
    }
    for (const nodeId of nodesMap.keys()) {
      this.#backendNodeIdToNodeInternal.set(nodeId, nodesMap.get(nodeId) || null);
    }
  }

  backendNodeIdToNode(): Map<Protocol.DOM.BackendNodeId, DOMNode|null> {
    return this.#backendNodeIdToNodeInternal;
  }

  setViewportSize(viewportSize: {
    width: number,
    height: number,
  }): void {
    this.#viewportSizeInternal = viewportSize;
  }

  viewportSize(): {
    width: number,
    height: number,
  }|undefined {
    return this.#viewportSizeInternal;
  }
}
