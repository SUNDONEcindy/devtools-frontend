// Copyright (c) 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This file is auto-generated, do not edit manually. *
 * Re-generate with: npm run generate-protocol-resources.
 */

/**
 * Mappings from protocol event and command names to the types required for them.
 */
export namespace ProtocolMapping {
  export interface Events {
    /**
     * The loadComplete event mirrors the load complete event sent by the browser to assistive
     * technology when the web page has finished loading.
     */
    'Accessibility.loadComplete': [Protocol.Accessibility.LoadCompleteEvent];
    /**
     * The nodesUpdated event is sent every time a previously requested node has changed the in tree.
     */
    'Accessibility.nodesUpdated': [Protocol.Accessibility.NodesUpdatedEvent];
    /**
     * Event for when an animation has been cancelled.
     */
    'Animation.animationCanceled': [Protocol.Animation.AnimationCanceledEvent];
    /**
     * Event for each animation that has been created.
     */
    'Animation.animationCreated': [Protocol.Animation.AnimationCreatedEvent];
    /**
     * Event for animation that has been started.
     */
    'Animation.animationStarted': [Protocol.Animation.AnimationStartedEvent];
    /**
     * Event for animation that has been updated.
     */
    'Animation.animationUpdated': [Protocol.Animation.AnimationUpdatedEvent];
    'Audits.issueAdded': [Protocol.Audits.IssueAddedEvent];
    /**
     * Emitted when an address form is filled.
     */
    'Autofill.addressFormFilled': [Protocol.Autofill.AddressFormFilledEvent];
    /**
     * Called when the recording state for the service has been updated.
     */
    'BackgroundService.recordingStateChanged': [Protocol.BackgroundService.RecordingStateChangedEvent];
    /**
     * Called with all existing backgroundServiceEvents when enabled, and all new
     * events afterwards if enabled and recording.
     */
    'BackgroundService.backgroundServiceEventReceived': [Protocol.BackgroundService.BackgroundServiceEventReceivedEvent];
    /**
     * Fired when page is about to start a download.
     */
    'Browser.downloadWillBegin': [Protocol.Browser.DownloadWillBeginEvent];
    /**
     * Fired when download makes progress. Last call has |done| == true.
     */
    'Browser.downloadProgress': [Protocol.Browser.DownloadProgressEvent];
    /**
     * Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded
     * web font.
     */
    'CSS.fontsUpdated': [Protocol.CSS.FontsUpdatedEvent];
    /**
     * Fires whenever a MediaQuery result changes (for example, after a browser window has been
     * resized.) The current implementation considers only viewport-dependent media features.
     */
    'CSS.mediaQueryResultChanged': [];
    /**
     * Fired whenever an active document stylesheet is added.
     */
    'CSS.styleSheetAdded': [Protocol.CSS.StyleSheetAddedEvent];
    /**
     * Fired whenever a stylesheet is changed as a result of the client operation.
     */
    'CSS.styleSheetChanged': [Protocol.CSS.StyleSheetChangedEvent];
    /**
     * Fired whenever an active document stylesheet is removed.
     */
    'CSS.styleSheetRemoved': [Protocol.CSS.StyleSheetRemovedEvent];
    'CSS.computedStyleUpdated': [Protocol.CSS.ComputedStyleUpdatedEvent];
    /**
     * This is fired whenever the list of available sinks changes. A sink is a
     * device or a software surface that you can cast to.
     */
    'Cast.sinksUpdated': [Protocol.Cast.SinksUpdatedEvent];
    /**
     * This is fired whenever the outstanding issue/error message changes.
     * |issueMessage| is empty if there is no issue.
     */
    'Cast.issueUpdated': [Protocol.Cast.IssueUpdatedEvent];
    /**
     * Fired when `Element`'s attribute is modified.
     */
    'DOM.attributeModified': [Protocol.DOM.AttributeModifiedEvent];
    /**
     * Fired when `Element`'s attribute is removed.
     */
    'DOM.attributeRemoved': [Protocol.DOM.AttributeRemovedEvent];
    /**
     * Mirrors `DOMCharacterDataModified` event.
     */
    'DOM.characterDataModified': [Protocol.DOM.CharacterDataModifiedEvent];
    /**
     * Fired when `Container`'s child node count has changed.
     */
    'DOM.childNodeCountUpdated': [Protocol.DOM.ChildNodeCountUpdatedEvent];
    /**
     * Mirrors `DOMNodeInserted` event.
     */
    'DOM.childNodeInserted': [Protocol.DOM.ChildNodeInsertedEvent];
    /**
     * Mirrors `DOMNodeRemoved` event.
     */
    'DOM.childNodeRemoved': [Protocol.DOM.ChildNodeRemovedEvent];
    /**
     * Called when distribution is changed.
     */
    'DOM.distributedNodesUpdated': [Protocol.DOM.DistributedNodesUpdatedEvent];
    /**
     * Fired when `Document` has been totally updated. Node ids are no longer valid.
     */
    'DOM.documentUpdated': [];
    /**
     * Fired when `Element`'s inline style is modified via a CSS property modification.
     */
    'DOM.inlineStyleInvalidated': [Protocol.DOM.InlineStyleInvalidatedEvent];
    /**
     * Called when a pseudo element is added to an element.
     */
    'DOM.pseudoElementAdded': [Protocol.DOM.PseudoElementAddedEvent];
    /**
     * Called when top layer elements are changed.
     */
    'DOM.topLayerElementsUpdated': [];
    /**
     * Fired when a node's scrollability state changes.
     */
    'DOM.scrollableFlagUpdated': [Protocol.DOM.ScrollableFlagUpdatedEvent];
    /**
     * Called when a pseudo element is removed from an element.
     */
    'DOM.pseudoElementRemoved': [Protocol.DOM.PseudoElementRemovedEvent];
    /**
     * Fired when backend wants to provide client with the missing DOM structure. This happens upon
     * most of the calls requesting node ids.
     */
    'DOM.setChildNodes': [Protocol.DOM.SetChildNodesEvent];
    /**
     * Called when shadow root is popped from the element.
     */
    'DOM.shadowRootPopped': [Protocol.DOM.ShadowRootPoppedEvent];
    /**
     * Called when shadow root is pushed into the element.
     */
    'DOM.shadowRootPushed': [Protocol.DOM.ShadowRootPushedEvent];
    'DOMStorage.domStorageItemAdded': [Protocol.DOMStorage.DomStorageItemAddedEvent];
    'DOMStorage.domStorageItemRemoved': [Protocol.DOMStorage.DomStorageItemRemovedEvent];
    'DOMStorage.domStorageItemUpdated': [Protocol.DOMStorage.DomStorageItemUpdatedEvent];
    'DOMStorage.domStorageItemsCleared': [Protocol.DOMStorage.DomStorageItemsClearedEvent];
    /**
     * Notification sent after the virtual time budget for the current VirtualTimePolicy has run out.
     */
    'Emulation.virtualTimeBudgetExpired': [];
    /**
     * Emitted only when `Input.setInterceptDrags` is enabled. Use this data with `Input.dispatchDragEvent` to
     * restore normal drag and drop behavior.
     */
    'Input.dragIntercepted': [Protocol.Input.DragInterceptedEvent];
    /**
     * Fired when remote debugging connection is about to be terminated. Contains detach reason.
     */
    'Inspector.detached': [Protocol.Inspector.DetachedEvent];
    /**
     * Fired when debugging target has crashed
     */
    'Inspector.targetCrashed': [];
    /**
     * Fired when debugging target has reloaded after crash
     */
    'Inspector.targetReloadedAfterCrash': [];
    'LayerTree.layerPainted': [Protocol.LayerTree.LayerPaintedEvent];
    'LayerTree.layerTreeDidChange': [Protocol.LayerTree.LayerTreeDidChangeEvent];
    /**
     * Issued when new message was logged.
     */
    'Log.entryAdded': [Protocol.Log.EntryAddedEvent];
    /**
     * Fired when data chunk was received over the network.
     */
    'Network.dataReceived': [Protocol.Network.DataReceivedEvent];
    /**
     * Fired when EventSource message is received.
     */
    'Network.eventSourceMessageReceived': [Protocol.Network.EventSourceMessageReceivedEvent];
    /**
     * Fired when HTTP request has failed to load.
     */
    'Network.loadingFailed': [Protocol.Network.LoadingFailedEvent];
    /**
     * Fired when HTTP request has finished loading.
     */
    'Network.loadingFinished': [Protocol.Network.LoadingFinishedEvent];
    /**
     * Details of an intercepted HTTP request, which must be either allowed, blocked, modified or
     * mocked.
     * Deprecated, use Fetch.requestPaused instead.
     */
    'Network.requestIntercepted': [Protocol.Network.RequestInterceptedEvent];
    /**
     * Fired if request ended up loading from cache.
     */
    'Network.requestServedFromCache': [Protocol.Network.RequestServedFromCacheEvent];
    /**
     * Fired when page is about to send HTTP request.
     */
    'Network.requestWillBeSent': [Protocol.Network.RequestWillBeSentEvent];
    /**
     * Fired when resource loading priority is changed
     */
    'Network.resourceChangedPriority': [Protocol.Network.ResourceChangedPriorityEvent];
    /**
     * Fired when a signed exchange was received over the network
     */
    'Network.signedExchangeReceived': [Protocol.Network.SignedExchangeReceivedEvent];
    /**
     * Fired when HTTP response is available.
     */
    'Network.responseReceived': [Protocol.Network.ResponseReceivedEvent];
    /**
     * Fired when WebSocket is closed.
     */
    'Network.webSocketClosed': [Protocol.Network.WebSocketClosedEvent];
    /**
     * Fired upon WebSocket creation.
     */
    'Network.webSocketCreated': [Protocol.Network.WebSocketCreatedEvent];
    /**
     * Fired when WebSocket message error occurs.
     */
    'Network.webSocketFrameError': [Protocol.Network.WebSocketFrameErrorEvent];
    /**
     * Fired when WebSocket message is received.
     */
    'Network.webSocketFrameReceived': [Protocol.Network.WebSocketFrameReceivedEvent];
    /**
     * Fired when WebSocket message is sent.
     */
    'Network.webSocketFrameSent': [Protocol.Network.WebSocketFrameSentEvent];
    /**
     * Fired when WebSocket handshake response becomes available.
     */
    'Network.webSocketHandshakeResponseReceived': [Protocol.Network.WebSocketHandshakeResponseReceivedEvent];
    /**
     * Fired when WebSocket is about to initiate handshake.
     */
    'Network.webSocketWillSendHandshakeRequest': [Protocol.Network.WebSocketWillSendHandshakeRequestEvent];
    /**
     * Fired upon WebTransport creation.
     */
    'Network.webTransportCreated': [Protocol.Network.WebTransportCreatedEvent];
    /**
     * Fired when WebTransport handshake is finished.
     */
    'Network.webTransportConnectionEstablished': [Protocol.Network.WebTransportConnectionEstablishedEvent];
    /**
     * Fired when WebTransport is disposed.
     */
    'Network.webTransportClosed': [Protocol.Network.WebTransportClosedEvent];
    /**
     * Fired upon direct_socket.TCPSocket creation.
     */
    'Network.directTCPSocketCreated': [Protocol.Network.DirectTCPSocketCreatedEvent];
    /**
     * Fired when direct_socket.TCPSocket connection is opened.
     */
    'Network.directTCPSocketOpened': [Protocol.Network.DirectTCPSocketOpenedEvent];
    /**
     * Fired when direct_socket.TCPSocket is aborted.
     */
    'Network.directTCPSocketAborted': [Protocol.Network.DirectTCPSocketAbortedEvent];
    /**
     * Fired when direct_socket.TCPSocket is closed.
     */
    'Network.directTCPSocketClosed': [Protocol.Network.DirectTCPSocketClosedEvent];
    /**
     * Fired when data is sent to tcp direct socket stream.
     */
    'Network.directTCPSocketChunkSent': [Protocol.Network.DirectTCPSocketChunkSentEvent];
    /**
     * Fired when data is received from tcp direct socket stream.
     */
    'Network.directTCPSocketChunkReceived': [Protocol.Network.DirectTCPSocketChunkReceivedEvent];
    /**
     * Fired upon direct_socket.UDPSocket creation.
     */
    'Network.directUDPSocketCreated': [Protocol.Network.DirectUDPSocketCreatedEvent];
    /**
     * Fired when direct_socket.UDPSocket connection is opened.
     */
    'Network.directUDPSocketOpened': [Protocol.Network.DirectUDPSocketOpenedEvent];
    /**
     * Fired when direct_socket.UDPSocket is aborted.
     */
    'Network.directUDPSocketAborted': [Protocol.Network.DirectUDPSocketAbortedEvent];
    /**
     * Fired when direct_socket.UDPSocket is closed.
     */
    'Network.directUDPSocketClosed': [Protocol.Network.DirectUDPSocketClosedEvent];
    /**
     * Fired when message is sent to udp direct socket stream.
     */
    'Network.directUDPSocketChunkSent': [Protocol.Network.DirectUDPSocketChunkSentEvent];
    /**
     * Fired when message is received from udp direct socket stream.
     */
    'Network.directUDPSocketChunkReceived': [Protocol.Network.DirectUDPSocketChunkReceivedEvent];
    /**
     * Fired when additional information about a requestWillBeSent event is available from the
     * network stack. Not every requestWillBeSent event will have an additional
     * requestWillBeSentExtraInfo fired for it, and there is no guarantee whether requestWillBeSent
     * or requestWillBeSentExtraInfo will be fired first for the same request.
     */
    'Network.requestWillBeSentExtraInfo': [Protocol.Network.RequestWillBeSentExtraInfoEvent];
    /**
     * Fired when additional information about a responseReceived event is available from the network
     * stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
     * it, and responseReceivedExtraInfo may be fired before or after responseReceived.
     */
    'Network.responseReceivedExtraInfo': [Protocol.Network.ResponseReceivedExtraInfoEvent];
    /**
     * Fired when 103 Early Hints headers is received in addition to the common response.
     * Not every responseReceived event will have an responseReceivedEarlyHints fired.
     * Only one responseReceivedEarlyHints may be fired for eached responseReceived event.
     */
    'Network.responseReceivedEarlyHints': [Protocol.Network.ResponseReceivedEarlyHintsEvent];
    /**
     * Fired exactly once for each Trust Token operation. Depending on
     * the type of the operation and whether the operation succeeded or
     * failed, the event is fired before the corresponding request was sent
     * or after the response was received.
     */
    'Network.trustTokenOperationDone': [Protocol.Network.TrustTokenOperationDoneEvent];
    /**
     * Fired once security policy has been updated.
     */
    'Network.policyUpdated': [];
    /**
     * Fired once when parsing the .wbn file has succeeded.
     * The event contains the information about the web bundle contents.
     */
    'Network.subresourceWebBundleMetadataReceived': [Protocol.Network.SubresourceWebBundleMetadataReceivedEvent];
    /**
     * Fired once when parsing the .wbn file has failed.
     */
    'Network.subresourceWebBundleMetadataError': [Protocol.Network.SubresourceWebBundleMetadataErrorEvent];
    /**
     * Fired when handling requests for resources within a .wbn file.
     * Note: this will only be fired for resources that are requested by the webpage.
     */
    'Network.subresourceWebBundleInnerResponseParsed': [Protocol.Network.SubresourceWebBundleInnerResponseParsedEvent];
    /**
     * Fired when request for resources within a .wbn file failed.
     */
    'Network.subresourceWebBundleInnerResponseError': [Protocol.Network.SubresourceWebBundleInnerResponseErrorEvent];
    /**
     * Is sent whenever a new report is added.
     * And after 'enableReportingApi' for all existing reports.
     */
    'Network.reportingApiReportAdded': [Protocol.Network.ReportingApiReportAddedEvent];
    'Network.reportingApiReportUpdated': [Protocol.Network.ReportingApiReportUpdatedEvent];
    'Network.reportingApiEndpointsChangedForOrigin': [Protocol.Network.ReportingApiEndpointsChangedForOriginEvent];
    /**
     * Fired when the node should be inspected. This happens after call to `setInspectMode` or when
     * user manually inspects an element.
     */
    'Overlay.inspectNodeRequested': [Protocol.Overlay.InspectNodeRequestedEvent];
    /**
     * Fired when the node should be highlighted. This happens after call to `setInspectMode`.
     */
    'Overlay.nodeHighlightRequested': [Protocol.Overlay.NodeHighlightRequestedEvent];
    /**
     * Fired when user asks to capture screenshot of some area on the page.
     */
    'Overlay.screenshotRequested': [Protocol.Overlay.ScreenshotRequestedEvent];
    /**
     * Fired when user cancels the inspect mode.
     */
    'Overlay.inspectModeCanceled': [];
    'Page.domContentEventFired': [Protocol.Page.DomContentEventFiredEvent];
    /**
     * Emitted only when `page.interceptFileChooser` is enabled.
     */
    'Page.fileChooserOpened': [Protocol.Page.FileChooserOpenedEvent];
    /**
     * Fired when frame has been attached to its parent.
     */
    'Page.frameAttached': [Protocol.Page.FrameAttachedEvent];
    /**
     * Fired when frame no longer has a scheduled navigation.
     */
    'Page.frameClearedScheduledNavigation': [Protocol.Page.FrameClearedScheduledNavigationEvent];
    /**
     * Fired when frame has been detached from its parent.
     */
    'Page.frameDetached': [Protocol.Page.FrameDetachedEvent];
    /**
     * Fired before frame subtree is detached. Emitted before any frame of the
     * subtree is actually detached.
     */
    'Page.frameSubtreeWillBeDetached': [Protocol.Page.FrameSubtreeWillBeDetachedEvent];
    /**
     * Fired once navigation of the frame has completed. Frame is now associated with the new loader.
     */
    'Page.frameNavigated': [Protocol.Page.FrameNavigatedEvent];
    /**
     * Fired when opening document to write to.
     */
    'Page.documentOpened': [Protocol.Page.DocumentOpenedEvent];
    'Page.frameResized': [];
    /**
     * Fired when a navigation starts. This event is fired for both
     * renderer-initiated and browser-initiated navigations. For renderer-initiated
     * navigations, the event is fired after `frameRequestedNavigation`.
     * Navigation may still be cancelled after the event is issued. Multiple events
     * can be fired for a single navigation, for example, when a same-document
     * navigation becomes a cross-document navigation (such as in the case of a
     * frameset).
     */
    'Page.frameStartedNavigating': [Protocol.Page.FrameStartedNavigatingEvent];
    /**
     * Fired when a renderer-initiated navigation is requested.
     * Navigation may still be cancelled after the event is issued.
     */
    'Page.frameRequestedNavigation': [Protocol.Page.FrameRequestedNavigationEvent];
    /**
     * Fired when frame schedules a potential navigation.
     */
    'Page.frameScheduledNavigation': [Protocol.Page.FrameScheduledNavigationEvent];
    /**
     * Fired when frame has started loading.
     */
    'Page.frameStartedLoading': [Protocol.Page.FrameStartedLoadingEvent];
    /**
     * Fired when frame has stopped loading.
     */
    'Page.frameStoppedLoading': [Protocol.Page.FrameStoppedLoadingEvent];
    /**
     * Fired when page is about to start a download.
     * Deprecated. Use Browser.downloadWillBegin instead.
     */
    'Page.downloadWillBegin': [Protocol.Page.DownloadWillBeginEvent];
    /**
     * Fired when download makes progress. Last call has |done| == true.
     * Deprecated. Use Browser.downloadProgress instead.
     */
    'Page.downloadProgress': [Protocol.Page.DownloadProgressEvent];
    /**
     * Fired when interstitial page was hidden
     */
    'Page.interstitialHidden': [];
    /**
     * Fired when interstitial page was shown
     */
    'Page.interstitialShown': [];
    /**
     * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been
     * closed.
     */
    'Page.javascriptDialogClosed': [Protocol.Page.JavascriptDialogClosedEvent];
    /**
     * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to
     * open.
     */
    'Page.javascriptDialogOpening': [Protocol.Page.JavascriptDialogOpeningEvent];
    /**
     * Fired for lifecycle events (navigation, load, paint, etc) in the current
     * target (including local frames).
     */
    'Page.lifecycleEvent': [Protocol.Page.LifecycleEventEvent];
    /**
     * Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
     * not assume any ordering with the Page.frameNavigated event. This event is fired only for
     * main-frame history navigation where the document changes (non-same-document navigations),
     * when bfcache navigation fails.
     */
    'Page.backForwardCacheNotUsed': [Protocol.Page.BackForwardCacheNotUsedEvent];
    'Page.loadEventFired': [Protocol.Page.LoadEventFiredEvent];
    /**
     * Fired when same-document navigation happens, e.g. due to history API usage or anchor navigation.
     */
    'Page.navigatedWithinDocument': [Protocol.Page.NavigatedWithinDocumentEvent];
    /**
     * Compressed image data requested by the `startScreencast`.
     */
    'Page.screencastFrame': [Protocol.Page.ScreencastFrameEvent];
    /**
     * Fired when the page with currently enabled screencast was shown or hidden `.
     */
    'Page.screencastVisibilityChanged': [Protocol.Page.ScreencastVisibilityChangedEvent];
    /**
     * Fired when a new window is going to be opened, via window.open(), link click, form submission,
     * etc.
     */
    'Page.windowOpen': [Protocol.Page.WindowOpenEvent];
    /**
     * Issued for every compilation cache generated. Is only available
     * if Page.setGenerateCompilationCache is enabled.
     */
    'Page.compilationCacheProduced': [Protocol.Page.CompilationCacheProducedEvent];
    /**
     * Current values of the metrics.
     */
    'Performance.metrics': [Protocol.Performance.MetricsEvent];
    /**
     * Sent when a performance timeline event is added. See reportPerformanceTimeline method.
     */
    'PerformanceTimeline.timelineEventAdded': [Protocol.PerformanceTimeline.TimelineEventAddedEvent];
    /**
     * There is a certificate error. If overriding certificate errors is enabled, then it should be
     * handled with the `handleCertificateError` command. Note: this event does not fire if the
     * certificate error has been allowed internally. Only one client per target should override
     * certificate errors at the same time.
     */
    'Security.certificateError': [Protocol.Security.CertificateErrorEvent];
    /**
     * The security state of the page changed.
     */
    'Security.visibleSecurityStateChanged': [Protocol.Security.VisibleSecurityStateChangedEvent];
    /**
     * The security state of the page changed. No longer being sent.
     */
    'Security.securityStateChanged': [Protocol.Security.SecurityStateChangedEvent];
    'ServiceWorker.workerErrorReported': [Protocol.ServiceWorker.WorkerErrorReportedEvent];
    'ServiceWorker.workerRegistrationUpdated': [Protocol.ServiceWorker.WorkerRegistrationUpdatedEvent];
    'ServiceWorker.workerVersionUpdated': [Protocol.ServiceWorker.WorkerVersionUpdatedEvent];
    /**
     * A cache's contents have been modified.
     */
    'Storage.cacheStorageContentUpdated': [Protocol.Storage.CacheStorageContentUpdatedEvent];
    /**
     * A cache has been added/deleted.
     */
    'Storage.cacheStorageListUpdated': [Protocol.Storage.CacheStorageListUpdatedEvent];
    /**
     * The origin's IndexedDB object store has been modified.
     */
    'Storage.indexedDBContentUpdated': [Protocol.Storage.IndexedDBContentUpdatedEvent];
    /**
     * The origin's IndexedDB database list has been modified.
     */
    'Storage.indexedDBListUpdated': [Protocol.Storage.IndexedDBListUpdatedEvent];
    /**
     * One of the interest groups was accessed. Note that these events are global
     * to all targets sharing an interest group store.
     */
    'Storage.interestGroupAccessed': [Protocol.Storage.InterestGroupAccessedEvent];
    /**
     * An auction involving interest groups is taking place. These events are
     * target-specific.
     */
    'Storage.interestGroupAuctionEventOccurred': [Protocol.Storage.InterestGroupAuctionEventOccurredEvent];
    /**
     * Specifies which auctions a particular network fetch may be related to, and
     * in what role. Note that it is not ordered with respect to
     * Network.requestWillBeSent (but will happen before loadingFinished
     * loadingFailed).
     */
    'Storage.interestGroupAuctionNetworkRequestCreated': [Protocol.Storage.InterestGroupAuctionNetworkRequestCreatedEvent];
    /**
     * Shared storage was accessed by the associated page.
     * The following parameters are included in all events.
     */
    'Storage.sharedStorageAccessed': [Protocol.Storage.SharedStorageAccessedEvent];
    /**
     * A shared storage run or selectURL operation finished its execution.
     * The following parameters are included in all events.
     */
    'Storage.sharedStorageWorkletOperationExecutionFinished': [Protocol.Storage.SharedStorageWorkletOperationExecutionFinishedEvent];
    'Storage.storageBucketCreatedOrUpdated': [Protocol.Storage.StorageBucketCreatedOrUpdatedEvent];
    'Storage.storageBucketDeleted': [Protocol.Storage.StorageBucketDeletedEvent];
    'Storage.attributionReportingSourceRegistered': [Protocol.Storage.AttributionReportingSourceRegisteredEvent];
    'Storage.attributionReportingTriggerRegistered': [Protocol.Storage.AttributionReportingTriggerRegisteredEvent];
    'Storage.attributionReportingReportSent': [Protocol.Storage.AttributionReportingReportSentEvent];
    'Storage.attributionReportingVerboseDebugReportSent': [Protocol.Storage.AttributionReportingVerboseDebugReportSentEvent];
    /**
     * Issued when attached to target because of auto-attach or `attachToTarget` command.
     */
    'Target.attachedToTarget': [Protocol.Target.AttachedToTargetEvent];
    /**
     * Issued when detached from target for any reason (including `detachFromTarget` command). Can be
     * issued multiple times per target if multiple sessions have been attached to it.
     */
    'Target.detachedFromTarget': [Protocol.Target.DetachedFromTargetEvent];
    /**
     * Notifies about a new protocol message received from the session (as reported in
     * `attachedToTarget` event).
     */
    'Target.receivedMessageFromTarget': [Protocol.Target.ReceivedMessageFromTargetEvent];
    /**
     * Issued when a possible inspection target is created.
     */
    'Target.targetCreated': [Protocol.Target.TargetCreatedEvent];
    /**
     * Issued when a target is destroyed.
     */
    'Target.targetDestroyed': [Protocol.Target.TargetDestroyedEvent];
    /**
     * Issued when a target has crashed.
     */
    'Target.targetCrashed': [Protocol.Target.TargetCrashedEvent];
    /**
     * Issued when some information about a target has changed. This only happens between
     * `targetCreated` and `targetDestroyed`.
     */
    'Target.targetInfoChanged': [Protocol.Target.TargetInfoChangedEvent];
    /**
     * Informs that port was successfully bound and got a specified connection id.
     */
    'Tethering.accepted': [Protocol.Tethering.AcceptedEvent];
    'Tracing.bufferUsage': [Protocol.Tracing.BufferUsageEvent];
    /**
     * Contains a bucket of collected trace events. When tracing is stopped collected events will be
     * sent as a sequence of dataCollected events followed by tracingComplete event.
     */
    'Tracing.dataCollected': [Protocol.Tracing.DataCollectedEvent];
    /**
     * Signals that tracing is stopped and there is no trace buffers pending flush, all data were
     * delivered via dataCollected events.
     */
    'Tracing.tracingComplete': [Protocol.Tracing.TracingCompleteEvent];
    /**
     * Issued when the domain is enabled and the request URL matches the
     * specified filter. The request is paused until the client responds
     * with one of continueRequest, failRequest or fulfillRequest.
     * The stage of the request can be determined by presence of responseErrorReason
     * and responseStatusCode -- the request is at the response stage if either
     * of these fields is present and in the request stage otherwise.
     * Redirect responses and subsequent requests are reported similarly to regular
     * responses and requests. Redirect responses may be distinguished by the value
     * of `responseStatusCode` (which is one of 301, 302, 303, 307, 308) along with
     * presence of the `location` header. Requests resulting from a redirect will
     * have `redirectedRequestId` field set.
     */
    'Fetch.requestPaused': [Protocol.Fetch.RequestPausedEvent];
    /**
     * Issued when the domain is enabled with handleAuthRequests set to true.
     * The request is paused until client responds with continueWithAuth.
     */
    'Fetch.authRequired': [Protocol.Fetch.AuthRequiredEvent];
    /**
     * Notifies that a new BaseAudioContext has been created.
     */
    'WebAudio.contextCreated': [Protocol.WebAudio.ContextCreatedEvent];
    /**
     * Notifies that an existing BaseAudioContext will be destroyed.
     */
    'WebAudio.contextWillBeDestroyed': [Protocol.WebAudio.ContextWillBeDestroyedEvent];
    /**
     * Notifies that existing BaseAudioContext has changed some properties (id stays the same)..
     */
    'WebAudio.contextChanged': [Protocol.WebAudio.ContextChangedEvent];
    /**
     * Notifies that the construction of an AudioListener has finished.
     */
    'WebAudio.audioListenerCreated': [Protocol.WebAudio.AudioListenerCreatedEvent];
    /**
     * Notifies that a new AudioListener has been created.
     */
    'WebAudio.audioListenerWillBeDestroyed': [Protocol.WebAudio.AudioListenerWillBeDestroyedEvent];
    /**
     * Notifies that a new AudioNode has been created.
     */
    'WebAudio.audioNodeCreated': [Protocol.WebAudio.AudioNodeCreatedEvent];
    /**
     * Notifies that an existing AudioNode has been destroyed.
     */
    'WebAudio.audioNodeWillBeDestroyed': [Protocol.WebAudio.AudioNodeWillBeDestroyedEvent];
    /**
     * Notifies that a new AudioParam has been created.
     */
    'WebAudio.audioParamCreated': [Protocol.WebAudio.AudioParamCreatedEvent];
    /**
     * Notifies that an existing AudioParam has been destroyed.
     */
    'WebAudio.audioParamWillBeDestroyed': [Protocol.WebAudio.AudioParamWillBeDestroyedEvent];
    /**
     * Notifies that two AudioNodes are connected.
     */
    'WebAudio.nodesConnected': [Protocol.WebAudio.NodesConnectedEvent];
    /**
     * Notifies that AudioNodes are disconnected. The destination can be null, and it means all the outgoing connections from the source are disconnected.
     */
    'WebAudio.nodesDisconnected': [Protocol.WebAudio.NodesDisconnectedEvent];
    /**
     * Notifies that an AudioNode is connected to an AudioParam.
     */
    'WebAudio.nodeParamConnected': [Protocol.WebAudio.NodeParamConnectedEvent];
    /**
     * Notifies that an AudioNode is disconnected to an AudioParam.
     */
    'WebAudio.nodeParamDisconnected': [Protocol.WebAudio.NodeParamDisconnectedEvent];
    /**
     * Triggered when a credential is added to an authenticator.
     */
    'WebAuthn.credentialAdded': [Protocol.WebAuthn.CredentialAddedEvent];
    /**
     * Triggered when a credential is deleted, e.g. through
     * PublicKeyCredential.signalUnknownCredential().
     */
    'WebAuthn.credentialDeleted': [Protocol.WebAuthn.CredentialDeletedEvent];
    /**
     * Triggered when a credential is updated, e.g. through
     * PublicKeyCredential.signalCurrentUserDetails().
     */
    'WebAuthn.credentialUpdated': [Protocol.WebAuthn.CredentialUpdatedEvent];
    /**
     * Triggered when a credential is used in a webauthn assertion.
     */
    'WebAuthn.credentialAsserted': [Protocol.WebAuthn.CredentialAssertedEvent];
    /**
     * This can be called multiple times, and can be used to set / override /
     * remove player properties. A null propValue indicates removal.
     */
    'Media.playerPropertiesChanged': [Protocol.Media.PlayerPropertiesChangedEvent];
    /**
     * Send events as a list, allowing them to be batched on the browser for less
     * congestion. If batched, events must ALWAYS be in chronological order.
     */
    'Media.playerEventsAdded': [Protocol.Media.PlayerEventsAddedEvent];
    /**
     * Send a list of any messages that need to be delivered.
     */
    'Media.playerMessagesLogged': [Protocol.Media.PlayerMessagesLoggedEvent];
    /**
     * Send a list of any errors that need to be delivered.
     */
    'Media.playerErrorsRaised': [Protocol.Media.PlayerErrorsRaisedEvent];
    /**
     * Called whenever a player is created, or when a new agent joins and receives
     * a list of active players. If an agent is restored, it will receive the full
     * list of player ids and all events again.
     */
    'Media.playersCreated': [Protocol.Media.PlayersCreatedEvent];
    /**
     * A device request opened a user prompt to select a device. Respond with the
     * selectPrompt or cancelPrompt command.
     */
    'DeviceAccess.deviceRequestPrompted': [Protocol.DeviceAccess.DeviceRequestPromptedEvent];
    /**
     * Upsert. Currently, it is only emitted when a rule set added.
     */
    'Preload.ruleSetUpdated': [Protocol.Preload.RuleSetUpdatedEvent];
    'Preload.ruleSetRemoved': [Protocol.Preload.RuleSetRemovedEvent];
    /**
     * Fired when a preload enabled state is updated.
     */
    'Preload.preloadEnabledStateUpdated': [Protocol.Preload.PreloadEnabledStateUpdatedEvent];
    /**
     * Fired when a prefetch attempt is updated.
     */
    'Preload.prefetchStatusUpdated': [Protocol.Preload.PrefetchStatusUpdatedEvent];
    /**
     * Fired when a prerender attempt is updated.
     */
    'Preload.prerenderStatusUpdated': [Protocol.Preload.PrerenderStatusUpdatedEvent];
    /**
     * Send a list of sources for all preloading attempts in a document.
     */
    'Preload.preloadingAttemptSourcesUpdated': [Protocol.Preload.PreloadingAttemptSourcesUpdatedEvent];
    'FedCm.dialogShown': [Protocol.FedCm.DialogShownEvent];
    /**
     * Triggered when a dialog is closed, either by user action, JS abort,
     * or a command below.
     */
    'FedCm.dialogClosed': [Protocol.FedCm.DialogClosedEvent];
    /**
     * Event for when a GATT operation of |type| to the peripheral with |address|
     * happened.
     */
    'BluetoothEmulation.gattOperationReceived': [Protocol.BluetoothEmulation.GattOperationReceivedEvent];
    /**
     * Event for when a characteristic operation of |type| to the characteristic
     * respresented by |characteristicId| happened. |data| and |writeType| is
     * expected to exist when |type| is write.
     */
    'BluetoothEmulation.characteristicOperationReceived': [Protocol.BluetoothEmulation.CharacteristicOperationReceivedEvent];
    /**
     * Event for when a descriptor operation of |type| to the descriptor
     * respresented by |descriptorId| happened. |data| is expected to exist when
     * |type| is write.
     */
    'BluetoothEmulation.descriptorOperationReceived': [Protocol.BluetoothEmulation.DescriptorOperationReceivedEvent];
    /**
     * Fired when breakpoint is resolved to an actual script and location.
     * Deprecated in favor of `resolvedBreakpoints` in the `scriptParsed` event.
     */
    'Debugger.breakpointResolved': [Protocol.Debugger.BreakpointResolvedEvent];
    /**
     * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
     */
    'Debugger.paused': [Protocol.Debugger.PausedEvent];
    /**
     * Fired when the virtual machine resumed execution.
     */
    'Debugger.resumed': [];
    /**
     * Fired when virtual machine fails to parse the script.
     */
    'Debugger.scriptFailedToParse': [Protocol.Debugger.ScriptFailedToParseEvent];
    /**
     * Fired when virtual machine parses script. This event is also fired for all known and uncollected
     * scripts upon enabling debugger.
     */
    'Debugger.scriptParsed': [Protocol.Debugger.ScriptParsedEvent];
    'HeapProfiler.addHeapSnapshotChunk': [Protocol.HeapProfiler.AddHeapSnapshotChunkEvent];
    /**
     * If heap objects tracking has been started then backend may send update for one or more fragments
     */
    'HeapProfiler.heapStatsUpdate': [Protocol.HeapProfiler.HeapStatsUpdateEvent];
    /**
     * If heap objects tracking has been started then backend regularly sends a current value for last
     * seen object id and corresponding timestamp. If the were changes in the heap since last event
     * then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
     */
    'HeapProfiler.lastSeenObjectId': [Protocol.HeapProfiler.LastSeenObjectIdEvent];
    'HeapProfiler.reportHeapSnapshotProgress': [Protocol.HeapProfiler.ReportHeapSnapshotProgressEvent];
    'HeapProfiler.resetProfiles': [];
    'Profiler.consoleProfileFinished': [Protocol.Profiler.ConsoleProfileFinishedEvent];
    /**
     * Sent when new profile recording is started using console.profile() call.
     */
    'Profiler.consoleProfileStarted': [Protocol.Profiler.ConsoleProfileStartedEvent];
    /**
     * Reports coverage delta since the last poll (either from an event like this, or from
     * `takePreciseCoverage` for the current isolate. May only be sent if precise code
     * coverage has been started. This event can be trigged by the embedder to, for example,
     * trigger collection of coverage data immediately at a certain point in time.
     */
    'Profiler.preciseCoverageDeltaUpdate': [Protocol.Profiler.PreciseCoverageDeltaUpdateEvent];
    /**
     * Notification is issued every time when binding is called.
     */
    'Runtime.bindingCalled': [Protocol.Runtime.BindingCalledEvent];
    /**
     * Issued when console API was called.
     */
    'Runtime.consoleAPICalled': [Protocol.Runtime.ConsoleAPICalledEvent];
    /**
     * Issued when unhandled exception was revoked.
     */
    'Runtime.exceptionRevoked': [Protocol.Runtime.ExceptionRevokedEvent];
    /**
     * Issued when exception was thrown and unhandled.
     */
    'Runtime.exceptionThrown': [Protocol.Runtime.ExceptionThrownEvent];
    /**
     * Issued when new execution context is created.
     */
    'Runtime.executionContextCreated': [Protocol.Runtime.ExecutionContextCreatedEvent];
    /**
     * Issued when execution context is destroyed.
     */
    'Runtime.executionContextDestroyed': [Protocol.Runtime.ExecutionContextDestroyedEvent];
    /**
     * Issued when all executionContexts were cleared in browser
     */
    'Runtime.executionContextsCleared': [];
    /**
     * Issued when object should be inspected (for example, as a result of inspect() command line API
     * call).
     */
    'Runtime.inspectRequested': [Protocol.Runtime.InspectRequestedEvent];
  }

  export interface Commands {
    /**
     * Disables the accessibility domain.
     */
    'Accessibility.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables the accessibility domain which causes `AXNodeId`s to remain consistent between method calls.
     * This turns on accessibility for the page, which can impact performance until accessibility is disabled.
     */
    'Accessibility.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Fetches the accessibility node and partial accessibility tree for this DOM node, if it exists.
     */
    'Accessibility.getPartialAXTree': {
      paramsType: [Protocol.Accessibility.GetPartialAXTreeRequest?];
      returnType: Protocol.Accessibility.GetPartialAXTreeResponse;
    };
    /**
     * Fetches the entire accessibility tree for the root Document
     */
    'Accessibility.getFullAXTree': {
      paramsType: [Protocol.Accessibility.GetFullAXTreeRequest?];
      returnType: Protocol.Accessibility.GetFullAXTreeResponse;
    };
    /**
     * Fetches the root node.
     * Requires `enable()` to have been called previously.
     */
    'Accessibility.getRootAXNode': {
      paramsType: [Protocol.Accessibility.GetRootAXNodeRequest?];
      returnType: Protocol.Accessibility.GetRootAXNodeResponse;
    };
    /**
     * Fetches a node and all ancestors up to and including the root.
     * Requires `enable()` to have been called previously.
     */
    'Accessibility.getAXNodeAndAncestors': {
      paramsType: [Protocol.Accessibility.GetAXNodeAndAncestorsRequest?];
      returnType: Protocol.Accessibility.GetAXNodeAndAncestorsResponse;
    };
    /**
     * Fetches a particular accessibility node by AXNodeId.
     * Requires `enable()` to have been called previously.
     */
    'Accessibility.getChildAXNodes': {
      paramsType: [Protocol.Accessibility.GetChildAXNodesRequest];
      returnType: Protocol.Accessibility.GetChildAXNodesResponse;
    };
    /**
     * Query a DOM node's accessibility subtree for accessible name and role.
     * This command computes the name and role for all nodes in the subtree, including those that are
     * ignored for accessibility, and returns those that match the specified name and role. If no DOM
     * node is specified, or the DOM node does not exist, the command returns an error. If neither
     * `accessibleName` or `role` is specified, it returns all the accessibility nodes in the subtree.
     */
    'Accessibility.queryAXTree': {
      paramsType: [Protocol.Accessibility.QueryAXTreeRequest?];
      returnType: Protocol.Accessibility.QueryAXTreeResponse;
    };
    /**
     * Disables animation domain notifications.
     */
    'Animation.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables animation domain notifications.
     */
    'Animation.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Returns the current time of the an animation.
     */
    'Animation.getCurrentTime': {
      paramsType: [Protocol.Animation.GetCurrentTimeRequest];
      returnType: Protocol.Animation.GetCurrentTimeResponse;
    };
    /**
     * Gets the playback rate of the document timeline.
     */
    'Animation.getPlaybackRate': {
      paramsType: [];
      returnType: Protocol.Animation.GetPlaybackRateResponse;
    };
    /**
     * Releases a set of animations to no longer be manipulated.
     */
    'Animation.releaseAnimations': {
      paramsType: [Protocol.Animation.ReleaseAnimationsRequest];
      returnType: void;
    };
    /**
     * Gets the remote object of the Animation.
     */
    'Animation.resolveAnimation': {
      paramsType: [Protocol.Animation.ResolveAnimationRequest];
      returnType: Protocol.Animation.ResolveAnimationResponse;
    };
    /**
     * Seek a set of animations to a particular time within each animation.
     */
    'Animation.seekAnimations': {
      paramsType: [Protocol.Animation.SeekAnimationsRequest];
      returnType: void;
    };
    /**
     * Sets the paused state of a set of animations.
     */
    'Animation.setPaused': {
      paramsType: [Protocol.Animation.SetPausedRequest];
      returnType: void;
    };
    /**
     * Sets the playback rate of the document timeline.
     */
    'Animation.setPlaybackRate': {
      paramsType: [Protocol.Animation.SetPlaybackRateRequest];
      returnType: void;
    };
    /**
     * Sets the timing of an animation node.
     */
    'Animation.setTiming': {
      paramsType: [Protocol.Animation.SetTimingRequest];
      returnType: void;
    };
    /**
     * Returns the response body and size if it were re-encoded with the specified settings. Only
     * applies to images.
     */
    'Audits.getEncodedResponse': {
      paramsType: [Protocol.Audits.GetEncodedResponseRequest];
      returnType: Protocol.Audits.GetEncodedResponseResponse;
    };
    /**
     * Disables issues domain, prevents further issues from being reported to the client.
     */
    'Audits.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables issues domain, sends the issues collected so far to the client by means of the
     * `issueAdded` event.
     */
    'Audits.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Runs the contrast check for the target page. Found issues are reported
     * using Audits.issueAdded event.
     */
    'Audits.checkContrast': {
      paramsType: [Protocol.Audits.CheckContrastRequest?];
      returnType: void;
    };
    /**
     * Runs the form issues check for the target page. Found issues are reported
     * using Audits.issueAdded event.
     */
    'Audits.checkFormsIssues': {
      paramsType: [];
      returnType: Protocol.Audits.CheckFormsIssuesResponse;
    };
    /**
     * Installs an unpacked extension from the filesystem similar to
     * --load-extension CLI flags. Returns extension ID once the extension
     * has been installed. Available if the client is connected using the
     * --remote-debugging-pipe flag and the --enable-unsafe-extension-debugging
     * flag is set.
     */
    'Extensions.loadUnpacked': {
      paramsType: [Protocol.Extensions.LoadUnpackedRequest];
      returnType: Protocol.Extensions.LoadUnpackedResponse;
    };
    /**
     * Uninstalls an unpacked extension (others not supported) from the profile.
     * Available if the client is connected using the --remote-debugging-pipe flag
     * and the --enable-unsafe-extension-debugging.
     */
    'Extensions.uninstall': {
      paramsType: [Protocol.Extensions.UninstallRequest];
      returnType: void;
    };
    /**
     * Gets data from extension storage in the given `storageArea`. If `keys` is
     * specified, these are used to filter the result.
     */
    'Extensions.getStorageItems': {
      paramsType: [Protocol.Extensions.GetStorageItemsRequest];
      returnType: Protocol.Extensions.GetStorageItemsResponse;
    };
    /**
     * Removes `keys` from extension storage in the given `storageArea`.
     */
    'Extensions.removeStorageItems': {
      paramsType: [Protocol.Extensions.RemoveStorageItemsRequest];
      returnType: void;
    };
    /**
     * Clears extension storage in the given `storageArea`.
     */
    'Extensions.clearStorageItems': {
      paramsType: [Protocol.Extensions.ClearStorageItemsRequest];
      returnType: void;
    };
    /**
     * Sets `values` in extension storage in the given `storageArea`. The provided `values`
     * will be merged with existing values in the storage area.
     */
    'Extensions.setStorageItems': {
      paramsType: [Protocol.Extensions.SetStorageItemsRequest];
      returnType: void;
    };
    /**
     * Trigger autofill on a form identified by the fieldId.
     * If the field and related form cannot be autofilled, returns an error.
     */
    'Autofill.trigger': {
      paramsType: [Protocol.Autofill.TriggerRequest];
      returnType: void;
    };
    /**
     * Set addresses so that developers can verify their forms implementation.
     */
    'Autofill.setAddresses': {
      paramsType: [Protocol.Autofill.SetAddressesRequest];
      returnType: void;
    };
    /**
     * Disables autofill domain notifications.
     */
    'Autofill.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables autofill domain notifications.
     */
    'Autofill.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables event updates for the service.
     */
    'BackgroundService.startObserving': {
      paramsType: [Protocol.BackgroundService.StartObservingRequest];
      returnType: void;
    };
    /**
     * Disables event updates for the service.
     */
    'BackgroundService.stopObserving': {
      paramsType: [Protocol.BackgroundService.StopObservingRequest];
      returnType: void;
    };
    /**
     * Set the recording state for the service.
     */
    'BackgroundService.setRecording': {
      paramsType: [Protocol.BackgroundService.SetRecordingRequest];
      returnType: void;
    };
    /**
     * Clears all stored data for the service.
     */
    'BackgroundService.clearEvents': {
      paramsType: [Protocol.BackgroundService.ClearEventsRequest];
      returnType: void;
    };
    /**
     * Set permission settings for given origin.
     */
    'Browser.setPermission': {
      paramsType: [Protocol.Browser.SetPermissionRequest];
      returnType: void;
    };
    /**
     * Grant specific permissions to the given origin and reject all others.
     */
    'Browser.grantPermissions': {
      paramsType: [Protocol.Browser.GrantPermissionsRequest];
      returnType: void;
    };
    /**
     * Reset all permission management for all origins.
     */
    'Browser.resetPermissions': {
      paramsType: [Protocol.Browser.ResetPermissionsRequest?];
      returnType: void;
    };
    /**
     * Set the behavior when downloading a file.
     */
    'Browser.setDownloadBehavior': {
      paramsType: [Protocol.Browser.SetDownloadBehaviorRequest];
      returnType: void;
    };
    /**
     * Cancel a download if in progress
     */
    'Browser.cancelDownload': {
      paramsType: [Protocol.Browser.CancelDownloadRequest];
      returnType: void;
    };
    /**
     * Close browser gracefully.
     */
    'Browser.close': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Crashes browser on the main thread.
     */
    'Browser.crash': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Crashes GPU process.
     */
    'Browser.crashGpuProcess': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Returns version information.
     */
    'Browser.getVersion': {
      paramsType: [];
      returnType: Protocol.Browser.GetVersionResponse;
    };
    /**
     * Returns the command line switches for the browser process if, and only if
     * --enable-automation is on the commandline.
     */
    'Browser.getBrowserCommandLine': {
      paramsType: [];
      returnType: Protocol.Browser.GetBrowserCommandLineResponse;
    };
    /**
     * Get Chrome histograms.
     */
    'Browser.getHistograms': {
      paramsType: [Protocol.Browser.GetHistogramsRequest?];
      returnType: Protocol.Browser.GetHistogramsResponse;
    };
    /**
     * Get a Chrome histogram by name.
     */
    'Browser.getHistogram': {
      paramsType: [Protocol.Browser.GetHistogramRequest];
      returnType: Protocol.Browser.GetHistogramResponse;
    };
    /**
     * Get position and size of the browser window.
     */
    'Browser.getWindowBounds': {
      paramsType: [Protocol.Browser.GetWindowBoundsRequest];
      returnType: Protocol.Browser.GetWindowBoundsResponse;
    };
    /**
     * Get the browser window that contains the devtools target.
     */
    'Browser.getWindowForTarget': {
      paramsType: [Protocol.Browser.GetWindowForTargetRequest?];
      returnType: Protocol.Browser.GetWindowForTargetResponse;
    };
    /**
     * Set position and/or size of the browser window.
     */
    'Browser.setWindowBounds': {
      paramsType: [Protocol.Browser.SetWindowBoundsRequest];
      returnType: void;
    };
    /**
     * Set size of the browser contents resizing browser window as necessary.
     */
    'Browser.setContentsSize': {
      paramsType: [Protocol.Browser.SetContentsSizeRequest];
      returnType: void;
    };
    /**
     * Set dock tile details, platform-specific.
     */
    'Browser.setDockTile': {
      paramsType: [Protocol.Browser.SetDockTileRequest?];
      returnType: void;
    };
    /**
     * Invoke custom browser commands used by telemetry.
     */
    'Browser.executeBrowserCommand': {
      paramsType: [Protocol.Browser.ExecuteBrowserCommandRequest];
      returnType: void;
    };
    /**
     * Allows a site to use privacy sandbox features that require enrollment
     * without the site actually being enrolled. Only supported on page targets.
     */
    'Browser.addPrivacySandboxEnrollmentOverride': {
      paramsType: [Protocol.Browser.AddPrivacySandboxEnrollmentOverrideRequest];
      returnType: void;
    };
    /**
     * Configures encryption keys used with a given privacy sandbox API to talk
     * to a trusted coordinator.  Since this is intended for test automation only,
     * coordinatorOrigin must be a .test domain. No existing coordinator
     * configuration for the origin may exist.
     */
    'Browser.addPrivacySandboxCoordinatorKeyConfig': {
      paramsType: [Protocol.Browser.AddPrivacySandboxCoordinatorKeyConfigRequest];
      returnType: void;
    };
    /**
     * Inserts a new rule with the given `ruleText` in a stylesheet with given `styleSheetId`, at the
     * position specified by `location`.
     */
    'CSS.addRule': {
      paramsType: [Protocol.CSS.AddRuleRequest];
      returnType: Protocol.CSS.AddRuleResponse;
    };
    /**
     * Returns all class names from specified stylesheet.
     */
    'CSS.collectClassNames': {
      paramsType: [Protocol.CSS.CollectClassNamesRequest];
      returnType: Protocol.CSS.CollectClassNamesResponse;
    };
    /**
     * Creates a new special "via-inspector" stylesheet in the frame with given `frameId`.
     */
    'CSS.createStyleSheet': {
      paramsType: [Protocol.CSS.CreateStyleSheetRequest];
      returnType: Protocol.CSS.CreateStyleSheetResponse;
    };
    /**
     * Disables the CSS agent for the given page.
     */
    'CSS.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been
     * enabled until the result of this command is received.
     */
    'CSS.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Ensures that the given node will have specified pseudo-classes whenever its style is computed by
     * the browser.
     */
    'CSS.forcePseudoState': {
      paramsType: [Protocol.CSS.ForcePseudoStateRequest];
      returnType: void;
    };
    /**
     * Ensures that the given node is in its starting-style state.
     */
    'CSS.forceStartingStyle': {
      paramsType: [Protocol.CSS.ForceStartingStyleRequest];
      returnType: void;
    };
    'CSS.getBackgroundColors': {
      paramsType: [Protocol.CSS.GetBackgroundColorsRequest];
      returnType: Protocol.CSS.GetBackgroundColorsResponse;
    };
    /**
     * Returns the computed style for a DOM node identified by `nodeId`.
     */
    'CSS.getComputedStyleForNode': {
      paramsType: [Protocol.CSS.GetComputedStyleForNodeRequest];
      returnType: Protocol.CSS.GetComputedStyleForNodeResponse;
    };
    /**
     * Resolve the specified values in the context of the provided element.
     * For example, a value of '1em' is evaluated according to the computed
     * 'font-size' of the element and a value 'calc(1px + 2px)' will be
     * resolved to '3px'.
     * If the `propertyName` was specified the `values` are resolved as if
     * they were property's declaration. If a value cannot be parsed according
     * to the provided property syntax, the value is parsed using combined
     * syntax as if null `propertyName` was provided. If the value cannot be
     * resolved even then, return the provided value without any changes.
     */
    'CSS.resolveValues': {
      paramsType: [Protocol.CSS.ResolveValuesRequest];
      returnType: Protocol.CSS.ResolveValuesResponse;
    };
    'CSS.getLonghandProperties': {
      paramsType: [Protocol.CSS.GetLonghandPropertiesRequest];
      returnType: Protocol.CSS.GetLonghandPropertiesResponse;
    };
    /**
     * Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM
     * attributes) for a DOM node identified by `nodeId`.
     */
    'CSS.getInlineStylesForNode': {
      paramsType: [Protocol.CSS.GetInlineStylesForNodeRequest];
      returnType: Protocol.CSS.GetInlineStylesForNodeResponse;
    };
    /**
     * Returns the styles coming from animations & transitions
     * including the animation & transition styles coming from inheritance chain.
     */
    'CSS.getAnimatedStylesForNode': {
      paramsType: [Protocol.CSS.GetAnimatedStylesForNodeRequest];
      returnType: Protocol.CSS.GetAnimatedStylesForNodeResponse;
    };
    /**
     * Returns requested styles for a DOM node identified by `nodeId`.
     */
    'CSS.getMatchedStylesForNode': {
      paramsType: [Protocol.CSS.GetMatchedStylesForNodeRequest];
      returnType: Protocol.CSS.GetMatchedStylesForNodeResponse;
    };
    /**
     * Returns the values of the default UA-defined environment variables used in env()
     */
    'CSS.getEnvironmentVariables': {
      paramsType: [];
      returnType: Protocol.CSS.GetEnvironmentVariablesResponse;
    };
    /**
     * Returns all media queries parsed by the rendering engine.
     */
    'CSS.getMediaQueries': {
      paramsType: [];
      returnType: Protocol.CSS.GetMediaQueriesResponse;
    };
    /**
     * Requests information about platform fonts which we used to render child TextNodes in the given
     * node.
     */
    'CSS.getPlatformFontsForNode': {
      paramsType: [Protocol.CSS.GetPlatformFontsForNodeRequest];
      returnType: Protocol.CSS.GetPlatformFontsForNodeResponse;
    };
    /**
     * Returns the current textual content for a stylesheet.
     */
    'CSS.getStyleSheetText': {
      paramsType: [Protocol.CSS.GetStyleSheetTextRequest];
      returnType: Protocol.CSS.GetStyleSheetTextResponse;
    };
    /**
     * Returns all layers parsed by the rendering engine for the tree scope of a node.
     * Given a DOM element identified by nodeId, getLayersForNode returns the root
     * layer for the nearest ancestor document or shadow root. The layer root contains
     * the full layer tree for the tree scope and their ordering.
     */
    'CSS.getLayersForNode': {
      paramsType: [Protocol.CSS.GetLayersForNodeRequest];
      returnType: Protocol.CSS.GetLayersForNodeResponse;
    };
    /**
     * Given a CSS selector text and a style sheet ID, getLocationForSelector
     * returns an array of locations of the CSS selector in the style sheet.
     */
    'CSS.getLocationForSelector': {
      paramsType: [Protocol.CSS.GetLocationForSelectorRequest];
      returnType: Protocol.CSS.GetLocationForSelectorResponse;
    };
    /**
     * Starts tracking the given node for the computed style updates
     * and whenever the computed style is updated for node, it queues
     * a `computedStyleUpdated` event with throttling.
     * There can only be 1 node tracked for computed style updates
     * so passing a new node id removes tracking from the previous node.
     * Pass `undefined` to disable tracking.
     */
    'CSS.trackComputedStyleUpdatesForNode': {
      paramsType: [Protocol.CSS.TrackComputedStyleUpdatesForNodeRequest?];
      returnType: void;
    };
    /**
     * Starts tracking the given computed styles for updates. The specified array of properties
     * replaces the one previously specified. Pass empty array to disable tracking.
     * Use takeComputedStyleUpdates to retrieve the list of nodes that had properties modified.
     * The changes to computed style properties are only tracked for nodes pushed to the front-end
     * by the DOM agent. If no changes to the tracked properties occur after the node has been pushed
     * to the front-end, no updates will be issued for the node.
     */
    'CSS.trackComputedStyleUpdates': {
      paramsType: [Protocol.CSS.TrackComputedStyleUpdatesRequest];
      returnType: void;
    };
    /**
     * Polls the next batch of computed style updates.
     */
    'CSS.takeComputedStyleUpdates': {
      paramsType: [];
      returnType: Protocol.CSS.TakeComputedStyleUpdatesResponse;
    };
    /**
     * Find a rule with the given active property for the given node and set the new value for this
     * property
     */
    'CSS.setEffectivePropertyValueForNode': {
      paramsType: [Protocol.CSS.SetEffectivePropertyValueForNodeRequest];
      returnType: void;
    };
    /**
     * Modifies the property rule property name.
     */
    'CSS.setPropertyRulePropertyName': {
      paramsType: [Protocol.CSS.SetPropertyRulePropertyNameRequest];
      returnType: Protocol.CSS.SetPropertyRulePropertyNameResponse;
    };
    /**
     * Modifies the keyframe rule key text.
     */
    'CSS.setKeyframeKey': {
      paramsType: [Protocol.CSS.SetKeyframeKeyRequest];
      returnType: Protocol.CSS.SetKeyframeKeyResponse;
    };
    /**
     * Modifies the rule selector.
     */
    'CSS.setMediaText': {
      paramsType: [Protocol.CSS.SetMediaTextRequest];
      returnType: Protocol.CSS.SetMediaTextResponse;
    };
    /**
     * Modifies the expression of a container query.
     */
    'CSS.setContainerQueryText': {
      paramsType: [Protocol.CSS.SetContainerQueryTextRequest];
      returnType: Protocol.CSS.SetContainerQueryTextResponse;
    };
    /**
     * Modifies the expression of a supports at-rule.
     */
    'CSS.setSupportsText': {
      paramsType: [Protocol.CSS.SetSupportsTextRequest];
      returnType: Protocol.CSS.SetSupportsTextResponse;
    };
    /**
     * Modifies the expression of a scope at-rule.
     */
    'CSS.setScopeText': {
      paramsType: [Protocol.CSS.SetScopeTextRequest];
      returnType: Protocol.CSS.SetScopeTextResponse;
    };
    /**
     * Modifies the rule selector.
     */
    'CSS.setRuleSelector': {
      paramsType: [Protocol.CSS.SetRuleSelectorRequest];
      returnType: Protocol.CSS.SetRuleSelectorResponse;
    };
    /**
     * Sets the new stylesheet text.
     */
    'CSS.setStyleSheetText': {
      paramsType: [Protocol.CSS.SetStyleSheetTextRequest];
      returnType: Protocol.CSS.SetStyleSheetTextResponse;
    };
    /**
     * Applies specified style edits one after another in the given order.
     */
    'CSS.setStyleTexts': {
      paramsType: [Protocol.CSS.SetStyleTextsRequest];
      returnType: Protocol.CSS.SetStyleTextsResponse;
    };
    /**
     * Enables the selector recording.
     */
    'CSS.startRuleUsageTracking': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Stop tracking rule usage and return the list of rules that were used since last call to
     * `takeCoverageDelta` (or since start of coverage instrumentation).
     */
    'CSS.stopRuleUsageTracking': {
      paramsType: [];
      returnType: Protocol.CSS.StopRuleUsageTrackingResponse;
    };
    /**
     * Obtain list of rules that became used since last call to this method (or since start of coverage
     * instrumentation).
     */
    'CSS.takeCoverageDelta': {
      paramsType: [];
      returnType: Protocol.CSS.TakeCoverageDeltaResponse;
    };
    /**
     * Enables/disables rendering of local CSS fonts (enabled by default).
     */
    'CSS.setLocalFontsEnabled': {
      paramsType: [Protocol.CSS.SetLocalFontsEnabledRequest];
      returnType: void;
    };
    /**
     * Deletes a cache.
     */
    'CacheStorage.deleteCache': {
      paramsType: [Protocol.CacheStorage.DeleteCacheRequest];
      returnType: void;
    };
    /**
     * Deletes a cache entry.
     */
    'CacheStorage.deleteEntry': {
      paramsType: [Protocol.CacheStorage.DeleteEntryRequest];
      returnType: void;
    };
    /**
     * Requests cache names.
     */
    'CacheStorage.requestCacheNames': {
      paramsType: [Protocol.CacheStorage.RequestCacheNamesRequest?];
      returnType: Protocol.CacheStorage.RequestCacheNamesResponse;
    };
    /**
     * Fetches cache entry.
     */
    'CacheStorage.requestCachedResponse': {
      paramsType: [Protocol.CacheStorage.RequestCachedResponseRequest];
      returnType: Protocol.CacheStorage.RequestCachedResponseResponse;
    };
    /**
     * Requests data from cache.
     */
    'CacheStorage.requestEntries': {
      paramsType: [Protocol.CacheStorage.RequestEntriesRequest];
      returnType: Protocol.CacheStorage.RequestEntriesResponse;
    };
    /**
     * Starts observing for sinks that can be used for tab mirroring, and if set,
     * sinks compatible with |presentationUrl| as well. When sinks are found, a
     * |sinksUpdated| event is fired.
     * Also starts observing for issue messages. When an issue is added or removed,
     * an |issueUpdated| event is fired.
     */
    'Cast.enable': {
      paramsType: [Protocol.Cast.EnableRequest?];
      returnType: void;
    };
    /**
     * Stops observing for sinks and issues.
     */
    'Cast.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Sets a sink to be used when the web page requests the browser to choose a
     * sink via Presentation API, Remote Playback API, or Cast SDK.
     */
    'Cast.setSinkToUse': {
      paramsType: [Protocol.Cast.SetSinkToUseRequest];
      returnType: void;
    };
    /**
     * Starts mirroring the desktop to the sink.
     */
    'Cast.startDesktopMirroring': {
      paramsType: [Protocol.Cast.StartDesktopMirroringRequest];
      returnType: void;
    };
    /**
     * Starts mirroring the tab to the sink.
     */
    'Cast.startTabMirroring': {
      paramsType: [Protocol.Cast.StartTabMirroringRequest];
      returnType: void;
    };
    /**
     * Stops the active Cast session on the sink.
     */
    'Cast.stopCasting': {
      paramsType: [Protocol.Cast.StopCastingRequest];
      returnType: void;
    };
    /**
     * Collects class names for the node with given id and all of it's child nodes.
     */
    'DOM.collectClassNamesFromSubtree': {
      paramsType: [Protocol.DOM.CollectClassNamesFromSubtreeRequest];
      returnType: Protocol.DOM.CollectClassNamesFromSubtreeResponse;
    };
    /**
     * Creates a deep copy of the specified node and places it into the target container before the
     * given anchor.
     */
    'DOM.copyTo': {
      paramsType: [Protocol.DOM.CopyToRequest];
      returnType: Protocol.DOM.CopyToResponse;
    };
    /**
     * Describes node given its id, does not require domain to be enabled. Does not start tracking any
     * objects, can be used for automation.
     */
    'DOM.describeNode': {
      paramsType: [Protocol.DOM.DescribeNodeRequest?];
      returnType: Protocol.DOM.DescribeNodeResponse;
    };
    /**
     * Scrolls the specified rect of the given node into view if not already visible.
     * Note: exactly one between nodeId, backendNodeId and objectId should be passed
     * to identify the node.
     */
    'DOM.scrollIntoViewIfNeeded': {
      paramsType: [Protocol.DOM.ScrollIntoViewIfNeededRequest?];
      returnType: void;
    };
    /**
     * Disables DOM agent for the given page.
     */
    'DOM.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Discards search results from the session with the given id. `getSearchResults` should no longer
     * be called for that search.
     */
    'DOM.discardSearchResults': {
      paramsType: [Protocol.DOM.DiscardSearchResultsRequest];
      returnType: void;
    };
    /**
     * Enables DOM agent for the given page.
     */
    'DOM.enable': {
      paramsType: [Protocol.DOM.EnableRequest?];
      returnType: void;
    };
    /**
     * Focuses the given element.
     */
    'DOM.focus': {
      paramsType: [Protocol.DOM.FocusRequest?];
      returnType: void;
    };
    /**
     * Returns attributes for the specified node.
     */
    'DOM.getAttributes': {
      paramsType: [Protocol.DOM.GetAttributesRequest];
      returnType: Protocol.DOM.GetAttributesResponse;
    };
    /**
     * Returns boxes for the given node.
     */
    'DOM.getBoxModel': {
      paramsType: [Protocol.DOM.GetBoxModelRequest?];
      returnType: Protocol.DOM.GetBoxModelResponse;
    };
    /**
     * Returns quads that describe node position on the page. This method
     * might return multiple quads for inline nodes.
     */
    'DOM.getContentQuads': {
      paramsType: [Protocol.DOM.GetContentQuadsRequest?];
      returnType: Protocol.DOM.GetContentQuadsResponse;
    };
    /**
     * Returns the root DOM node (and optionally the subtree) to the caller.
     * Implicitly enables the DOM domain events for the current target.
     */
    'DOM.getDocument': {
      paramsType: [Protocol.DOM.GetDocumentRequest?];
      returnType: Protocol.DOM.GetDocumentResponse;
    };
    /**
     * Returns the root DOM node (and optionally the subtree) to the caller.
     * Deprecated, as it is not designed to work well with the rest of the DOM agent.
     * Use DOMSnapshot.captureSnapshot instead.
     */
    'DOM.getFlattenedDocument': {
      paramsType: [Protocol.DOM.GetFlattenedDocumentRequest?];
      returnType: Protocol.DOM.GetFlattenedDocumentResponse;
    };
    /**
     * Finds nodes with a given computed style in a subtree.
     */
    'DOM.getNodesForSubtreeByStyle': {
      paramsType: [Protocol.DOM.GetNodesForSubtreeByStyleRequest];
      returnType: Protocol.DOM.GetNodesForSubtreeByStyleResponse;
    };
    /**
     * Returns node id at given location. Depending on whether DOM domain is enabled, nodeId is
     * either returned or not.
     */
    'DOM.getNodeForLocation': {
      paramsType: [Protocol.DOM.GetNodeForLocationRequest];
      returnType: Protocol.DOM.GetNodeForLocationResponse;
    };
    /**
     * Returns node's HTML markup.
     */
    'DOM.getOuterHTML': {
      paramsType: [Protocol.DOM.GetOuterHTMLRequest?];
      returnType: Protocol.DOM.GetOuterHTMLResponse;
    };
    /**
     * Returns the id of the nearest ancestor that is a relayout boundary.
     */
    'DOM.getRelayoutBoundary': {
      paramsType: [Protocol.DOM.GetRelayoutBoundaryRequest];
      returnType: Protocol.DOM.GetRelayoutBoundaryResponse;
    };
    /**
     * Returns search results from given `fromIndex` to given `toIndex` from the search with the given
     * identifier.
     */
    'DOM.getSearchResults': {
      paramsType: [Protocol.DOM.GetSearchResultsRequest];
      returnType: Protocol.DOM.GetSearchResultsResponse;
    };
    /**
     * Hides any highlight.
     */
    'DOM.hideHighlight': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Highlights DOM node.
     */
    'DOM.highlightNode': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Highlights given rectangle.
     */
    'DOM.highlightRect': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Marks last undoable state.
     */
    'DOM.markUndoableState': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Moves node into the new container, places it before the given anchor.
     */
    'DOM.moveTo': {
      paramsType: [Protocol.DOM.MoveToRequest];
      returnType: Protocol.DOM.MoveToResponse;
    };
    /**
     * Searches for a given string in the DOM tree. Use `getSearchResults` to access search results or
     * `cancelSearch` to end this search session.
     */
    'DOM.performSearch': {
      paramsType: [Protocol.DOM.PerformSearchRequest];
      returnType: Protocol.DOM.PerformSearchResponse;
    };
    /**
     * Requests that the node is sent to the caller given its path. // FIXME, use XPath
     */
    'DOM.pushNodeByPathToFrontend': {
      paramsType: [Protocol.DOM.PushNodeByPathToFrontendRequest];
      returnType: Protocol.DOM.PushNodeByPathToFrontendResponse;
    };
    /**
     * Requests that a batch of nodes is sent to the caller given their backend node ids.
     */
    'DOM.pushNodesByBackendIdsToFrontend': {
      paramsType: [Protocol.DOM.PushNodesByBackendIdsToFrontendRequest];
      returnType: Protocol.DOM.PushNodesByBackendIdsToFrontendResponse;
    };
    /**
     * Executes `querySelector` on a given node.
     */
    'DOM.querySelector': {
      paramsType: [Protocol.DOM.QuerySelectorRequest];
      returnType: Protocol.DOM.QuerySelectorResponse;
    };
    /**
     * Executes `querySelectorAll` on a given node.
     */
    'DOM.querySelectorAll': {
      paramsType: [Protocol.DOM.QuerySelectorAllRequest];
      returnType: Protocol.DOM.QuerySelectorAllResponse;
    };
    /**
     * Returns NodeIds of current top layer elements.
     * Top layer is rendered closest to the user within a viewport, therefore its elements always
     * appear on top of all other content.
     */
    'DOM.getTopLayerElements': {
      paramsType: [];
      returnType: Protocol.DOM.GetTopLayerElementsResponse;
    };
    /**
     * Returns the NodeId of the matched element according to certain relations.
     */
    'DOM.getElementByRelation': {
      paramsType: [Protocol.DOM.GetElementByRelationRequest];
      returnType: Protocol.DOM.GetElementByRelationResponse;
    };
    /**
     * Re-does the last undone action.
     */
    'DOM.redo': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Removes attribute with given name from an element with given id.
     */
    'DOM.removeAttribute': {
      paramsType: [Protocol.DOM.RemoveAttributeRequest];
      returnType: void;
    };
    /**
     * Removes node with given id.
     */
    'DOM.removeNode': {
      paramsType: [Protocol.DOM.RemoveNodeRequest];
      returnType: void;
    };
    /**
     * Requests that children of the node with given id are returned to the caller in form of
     * `setChildNodes` events where not only immediate children are retrieved, but all children down to
     * the specified depth.
     */
    'DOM.requestChildNodes': {
      paramsType: [Protocol.DOM.RequestChildNodesRequest];
      returnType: void;
    };
    /**
     * Requests that the node is sent to the caller given the JavaScript node object reference. All
     * nodes that form the path from the node to the root are also sent to the client as a series of
     * `setChildNodes` notifications.
     */
    'DOM.requestNode': {
      paramsType: [Protocol.DOM.RequestNodeRequest];
      returnType: Protocol.DOM.RequestNodeResponse;
    };
    /**
     * Resolves the JavaScript node object for a given NodeId or BackendNodeId.
     */
    'DOM.resolveNode': {
      paramsType: [Protocol.DOM.ResolveNodeRequest?];
      returnType: Protocol.DOM.ResolveNodeResponse;
    };
    /**
     * Sets attribute for an element with given id.
     */
    'DOM.setAttributeValue': {
      paramsType: [Protocol.DOM.SetAttributeValueRequest];
      returnType: void;
    };
    /**
     * Sets attributes on element with given id. This method is useful when user edits some existing
     * attribute value and types in several attribute name/value pairs.
     */
    'DOM.setAttributesAsText': {
      paramsType: [Protocol.DOM.SetAttributesAsTextRequest];
      returnType: void;
    };
    /**
     * Sets files for the given file input element.
     */
    'DOM.setFileInputFiles': {
      paramsType: [Protocol.DOM.SetFileInputFilesRequest];
      returnType: void;
    };
    /**
     * Sets if stack traces should be captured for Nodes. See `Node.getNodeStackTraces`. Default is disabled.
     */
    'DOM.setNodeStackTracesEnabled': {
      paramsType: [Protocol.DOM.SetNodeStackTracesEnabledRequest];
      returnType: void;
    };
    /**
     * Gets stack traces associated with a Node. As of now, only provides stack trace for Node creation.
     */
    'DOM.getNodeStackTraces': {
      paramsType: [Protocol.DOM.GetNodeStackTracesRequest];
      returnType: Protocol.DOM.GetNodeStackTracesResponse;
    };
    /**
     * Returns file information for the given
     * File wrapper.
     */
    'DOM.getFileInfo': {
      paramsType: [Protocol.DOM.GetFileInfoRequest];
      returnType: Protocol.DOM.GetFileInfoResponse;
    };
    /**
     * Returns list of detached nodes
     */
    'DOM.getDetachedDomNodes': {
      paramsType: [];
      returnType: Protocol.DOM.GetDetachedDomNodesResponse;
    };
    /**
     * Enables console to refer to the node with given id via $x (see Command Line API for more details
     * $x functions).
     */
    'DOM.setInspectedNode': {
      paramsType: [Protocol.DOM.SetInspectedNodeRequest];
      returnType: void;
    };
    /**
     * Sets node name for a node with given id.
     */
    'DOM.setNodeName': {
      paramsType: [Protocol.DOM.SetNodeNameRequest];
      returnType: Protocol.DOM.SetNodeNameResponse;
    };
    /**
     * Sets node value for a node with given id.
     */
    'DOM.setNodeValue': {
      paramsType: [Protocol.DOM.SetNodeValueRequest];
      returnType: void;
    };
    /**
     * Sets node HTML markup, returns new node id.
     */
    'DOM.setOuterHTML': {
      paramsType: [Protocol.DOM.SetOuterHTMLRequest];
      returnType: void;
    };
    /**
     * Undoes the last performed action.
     */
    'DOM.undo': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Returns iframe node that owns iframe with the given domain.
     */
    'DOM.getFrameOwner': {
      paramsType: [Protocol.DOM.GetFrameOwnerRequest];
      returnType: Protocol.DOM.GetFrameOwnerResponse;
    };
    /**
     * Returns the query container of the given node based on container query
     * conditions: containerName, physical and logical axes, and whether it queries
     * scroll-state or anchored elements. If no axes are provided and
     * queriesScrollState is false, the style container is returned, which is the
     * direct parent or the closest element with a matching container-name.
     */
    'DOM.getContainerForNode': {
      paramsType: [Protocol.DOM.GetContainerForNodeRequest];
      returnType: Protocol.DOM.GetContainerForNodeResponse;
    };
    /**
     * Returns the descendants of a container query container that have
     * container queries against this container.
     */
    'DOM.getQueryingDescendantsForContainer': {
      paramsType: [Protocol.DOM.GetQueryingDescendantsForContainerRequest];
      returnType: Protocol.DOM.GetQueryingDescendantsForContainerResponse;
    };
    /**
     * Returns the target anchor element of the given anchor query according to
     * https://www.w3.org/TR/css-anchor-position-1/#target.
     */
    'DOM.getAnchorElement': {
      paramsType: [Protocol.DOM.GetAnchorElementRequest];
      returnType: Protocol.DOM.GetAnchorElementResponse;
    };
    /**
     * When enabling, this API force-opens the popover identified by nodeId
     * and keeps it open until disabled.
     */
    'DOM.forceShowPopover': {
      paramsType: [Protocol.DOM.ForceShowPopoverRequest];
      returnType: Protocol.DOM.ForceShowPopoverResponse;
    };
    /**
     * Returns event listeners of the given object.
     */
    'DOMDebugger.getEventListeners': {
      paramsType: [Protocol.DOMDebugger.GetEventListenersRequest];
      returnType: Protocol.DOMDebugger.GetEventListenersResponse;
    };
    /**
     * Removes DOM breakpoint that was set using `setDOMBreakpoint`.
     */
    'DOMDebugger.removeDOMBreakpoint': {
      paramsType: [Protocol.DOMDebugger.RemoveDOMBreakpointRequest];
      returnType: void;
    };
    /**
     * Removes breakpoint on particular DOM event.
     */
    'DOMDebugger.removeEventListenerBreakpoint': {
      paramsType: [Protocol.DOMDebugger.RemoveEventListenerBreakpointRequest];
      returnType: void;
    };
    /**
     * Removes breakpoint on particular native event.
     */
    'DOMDebugger.removeInstrumentationBreakpoint': {
      paramsType: [Protocol.DOMDebugger.RemoveInstrumentationBreakpointRequest];
      returnType: void;
    };
    /**
     * Removes breakpoint from XMLHttpRequest.
     */
    'DOMDebugger.removeXHRBreakpoint': {
      paramsType: [Protocol.DOMDebugger.RemoveXHRBreakpointRequest];
      returnType: void;
    };
    /**
     * Sets breakpoint on particular CSP violations.
     */
    'DOMDebugger.setBreakOnCSPViolation': {
      paramsType: [Protocol.DOMDebugger.SetBreakOnCSPViolationRequest];
      returnType: void;
    };
    /**
     * Sets breakpoint on particular operation with DOM.
     */
    'DOMDebugger.setDOMBreakpoint': {
      paramsType: [Protocol.DOMDebugger.SetDOMBreakpointRequest];
      returnType: void;
    };
    /**
     * Sets breakpoint on particular DOM event.
     */
    'DOMDebugger.setEventListenerBreakpoint': {
      paramsType: [Protocol.DOMDebugger.SetEventListenerBreakpointRequest];
      returnType: void;
    };
    /**
     * Sets breakpoint on particular native event.
     */
    'DOMDebugger.setInstrumentationBreakpoint': {
      paramsType: [Protocol.DOMDebugger.SetInstrumentationBreakpointRequest];
      returnType: void;
    };
    /**
     * Sets breakpoint on XMLHttpRequest.
     */
    'DOMDebugger.setXHRBreakpoint': {
      paramsType: [Protocol.DOMDebugger.SetXHRBreakpointRequest];
      returnType: void;
    };
    /**
     * Sets breakpoint on particular native event.
     */
    'EventBreakpoints.setInstrumentationBreakpoint': {
      paramsType: [Protocol.EventBreakpoints.SetInstrumentationBreakpointRequest];
      returnType: void;
    };
    /**
     * Removes breakpoint on particular native event.
     */
    'EventBreakpoints.removeInstrumentationBreakpoint': {
      paramsType: [Protocol.EventBreakpoints.RemoveInstrumentationBreakpointRequest];
      returnType: void;
    };
    /**
     * Removes all breakpoints
     */
    'EventBreakpoints.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Disables DOM snapshot agent for the given page.
     */
    'DOMSnapshot.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables DOM snapshot agent for the given page.
     */
    'DOMSnapshot.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Returns a document snapshot, including the full DOM tree of the root node (including iframes,
     * template contents, and imported documents) in a flattened array, as well as layout and
     * white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is
     * flattened.
     */
    'DOMSnapshot.getSnapshot': {
      paramsType: [Protocol.DOMSnapshot.GetSnapshotRequest];
      returnType: Protocol.DOMSnapshot.GetSnapshotResponse;
    };
    /**
     * Returns a document snapshot, including the full DOM tree of the root node (including iframes,
     * template contents, and imported documents) in a flattened array, as well as layout and
     * white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is
     * flattened.
     */
    'DOMSnapshot.captureSnapshot': {
      paramsType: [Protocol.DOMSnapshot.CaptureSnapshotRequest];
      returnType: Protocol.DOMSnapshot.CaptureSnapshotResponse;
    };
    'DOMStorage.clear': {
      paramsType: [Protocol.DOMStorage.ClearRequest];
      returnType: void;
    };
    /**
     * Disables storage tracking, prevents storage events from being sent to the client.
     */
    'DOMStorage.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables storage tracking, storage events will now be delivered to the client.
     */
    'DOMStorage.enable': {
      paramsType: [];
      returnType: void;
    };
    'DOMStorage.getDOMStorageItems': {
      paramsType: [Protocol.DOMStorage.GetDOMStorageItemsRequest];
      returnType: Protocol.DOMStorage.GetDOMStorageItemsResponse;
    };
    'DOMStorage.removeDOMStorageItem': {
      paramsType: [Protocol.DOMStorage.RemoveDOMStorageItemRequest];
      returnType: void;
    };
    'DOMStorage.setDOMStorageItem': {
      paramsType: [Protocol.DOMStorage.SetDOMStorageItemRequest];
      returnType: void;
    };
    /**
     * Clears the overridden Device Orientation.
     */
    'DeviceOrientation.clearDeviceOrientationOverride': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Overrides the Device Orientation.
     */
    'DeviceOrientation.setDeviceOrientationOverride': {
      paramsType: [Protocol.DeviceOrientation.SetDeviceOrientationOverrideRequest];
      returnType: void;
    };
    /**
     * Tells whether emulation is supported.
     */
    'Emulation.canEmulate': {
      paramsType: [];
      returnType: Protocol.Emulation.CanEmulateResponse;
    };
    /**
     * Clears the overridden device metrics.
     */
    'Emulation.clearDeviceMetricsOverride': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Clears the overridden Geolocation Position and Error.
     */
    'Emulation.clearGeolocationOverride': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Requests that page scale factor is reset to initial values.
     */
    'Emulation.resetPageScaleFactor': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables or disables simulating a focused and active page.
     */
    'Emulation.setFocusEmulationEnabled': {
      paramsType: [Protocol.Emulation.SetFocusEmulationEnabledRequest];
      returnType: void;
    };
    /**
     * Automatically render all web contents using a dark theme.
     */
    'Emulation.setAutoDarkModeOverride': {
      paramsType: [Protocol.Emulation.SetAutoDarkModeOverrideRequest?];
      returnType: void;
    };
    /**
     * Enables CPU throttling to emulate slow CPUs.
     */
    'Emulation.setCPUThrottlingRate': {
      paramsType: [Protocol.Emulation.SetCPUThrottlingRateRequest];
      returnType: void;
    };
    /**
     * Sets or clears an override of the default background color of the frame. This override is used
     * if the content does not specify one.
     */
    'Emulation.setDefaultBackgroundColorOverride': {
      paramsType: [Protocol.Emulation.SetDefaultBackgroundColorOverrideRequest?];
      returnType: void;
    };
    /**
     * Overrides the values for env(safe-area-inset-*) and env(safe-area-max-inset-*). Unset values will cause the
     * respective variables to be undefined, even if previously overridden.
     */
    'Emulation.setSafeAreaInsetsOverride': {
      paramsType: [Protocol.Emulation.SetSafeAreaInsetsOverrideRequest];
      returnType: void;
    };
    /**
     * Overrides the values of device screen dimensions (window.screen.width, window.screen.height,
     * window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media
     * query results).
     */
    'Emulation.setDeviceMetricsOverride': {
      paramsType: [Protocol.Emulation.SetDeviceMetricsOverrideRequest];
      returnType: void;
    };
    /**
     * Start reporting the given posture value to the Device Posture API.
     * This override can also be set in setDeviceMetricsOverride().
     */
    'Emulation.setDevicePostureOverride': {
      paramsType: [Protocol.Emulation.SetDevicePostureOverrideRequest];
      returnType: void;
    };
    /**
     * Clears a device posture override set with either setDeviceMetricsOverride()
     * or setDevicePostureOverride() and starts using posture information from the
     * platform again.
     * Does nothing if no override is set.
     */
    'Emulation.clearDevicePostureOverride': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Start using the given display features to pupulate the Viewport Segments API.
     * This override can also be set in setDeviceMetricsOverride().
     */
    'Emulation.setDisplayFeaturesOverride': {
      paramsType: [Protocol.Emulation.SetDisplayFeaturesOverrideRequest];
      returnType: void;
    };
    /**
     * Clears the display features override set with either setDeviceMetricsOverride()
     * or setDisplayFeaturesOverride() and starts using display features from the
     * platform again.
     * Does nothing if no override is set.
     */
    'Emulation.clearDisplayFeaturesOverride': {
      paramsType: [];
      returnType: void;
    };
    'Emulation.setScrollbarsHidden': {
      paramsType: [Protocol.Emulation.SetScrollbarsHiddenRequest];
      returnType: void;
    };
    'Emulation.setDocumentCookieDisabled': {
      paramsType: [Protocol.Emulation.SetDocumentCookieDisabledRequest];
      returnType: void;
    };
    'Emulation.setEmitTouchEventsForMouse': {
      paramsType: [Protocol.Emulation.SetEmitTouchEventsForMouseRequest];
      returnType: void;
    };
    /**
     * Emulates the given media type or media feature for CSS media queries.
     */
    'Emulation.setEmulatedMedia': {
      paramsType: [Protocol.Emulation.SetEmulatedMediaRequest?];
      returnType: void;
    };
    /**
     * Emulates the given vision deficiency.
     */
    'Emulation.setEmulatedVisionDeficiency': {
      paramsType: [Protocol.Emulation.SetEmulatedVisionDeficiencyRequest];
      returnType: void;
    };
    /**
     * Emulates the given OS text scale.
     */
    'Emulation.setEmulatedOSTextScale': {
      paramsType: [Protocol.Emulation.SetEmulatedOSTextScaleRequest?];
      returnType: void;
    };
    /**
     * Overrides the Geolocation Position or Error. Omitting latitude, longitude or
     * accuracy emulates position unavailable.
     */
    'Emulation.setGeolocationOverride': {
      paramsType: [Protocol.Emulation.SetGeolocationOverrideRequest?];
      returnType: void;
    };
    'Emulation.getOverriddenSensorInformation': {
      paramsType: [Protocol.Emulation.GetOverriddenSensorInformationRequest];
      returnType: Protocol.Emulation.GetOverriddenSensorInformationResponse;
    };
    /**
     * Overrides a platform sensor of a given type. If |enabled| is true, calls to
     * Sensor.start() will use a virtual sensor as backend rather than fetching
     * data from a real hardware sensor. Otherwise, existing virtual
     * sensor-backend Sensor objects will fire an error event and new calls to
     * Sensor.start() will attempt to use a real sensor instead.
     */
    'Emulation.setSensorOverrideEnabled': {
      paramsType: [Protocol.Emulation.SetSensorOverrideEnabledRequest];
      returnType: void;
    };
    /**
     * Updates the sensor readings reported by a sensor type previously overridden
     * by setSensorOverrideEnabled.
     */
    'Emulation.setSensorOverrideReadings': {
      paramsType: [Protocol.Emulation.SetSensorOverrideReadingsRequest];
      returnType: void;
    };
    /**
     * Overrides a pressure source of a given type, as used by the Compute
     * Pressure API, so that updates to PressureObserver.observe() are provided
     * via setPressureStateOverride instead of being retrieved from
     * platform-provided telemetry data.
     */
    'Emulation.setPressureSourceOverrideEnabled': {
      paramsType: [Protocol.Emulation.SetPressureSourceOverrideEnabledRequest];
      returnType: void;
    };
    /**
     * TODO: OBSOLETE: To remove when setPressureDataOverride is merged.
     * Provides a given pressure state that will be processed and eventually be
     * delivered to PressureObserver users. |source| must have been previously
     * overridden by setPressureSourceOverrideEnabled.
     */
    'Emulation.setPressureStateOverride': {
      paramsType: [Protocol.Emulation.SetPressureStateOverrideRequest];
      returnType: void;
    };
    /**
     * Provides a given pressure data set that will be processed and eventually be
     * delivered to PressureObserver users. |source| must have been previously
     * overridden by setPressureSourceOverrideEnabled.
     */
    'Emulation.setPressureDataOverride': {
      paramsType: [Protocol.Emulation.SetPressureDataOverrideRequest];
      returnType: void;
    };
    /**
     * Overrides the Idle state.
     */
    'Emulation.setIdleOverride': {
      paramsType: [Protocol.Emulation.SetIdleOverrideRequest];
      returnType: void;
    };
    /**
     * Clears Idle state overrides.
     */
    'Emulation.clearIdleOverride': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Overrides value returned by the javascript navigator object.
     */
    'Emulation.setNavigatorOverrides': {
      paramsType: [Protocol.Emulation.SetNavigatorOverridesRequest];
      returnType: void;
    };
    /**
     * Sets a specified page scale factor.
     */
    'Emulation.setPageScaleFactor': {
      paramsType: [Protocol.Emulation.SetPageScaleFactorRequest];
      returnType: void;
    };
    /**
     * Switches script execution in the page.
     */
    'Emulation.setScriptExecutionDisabled': {
      paramsType: [Protocol.Emulation.SetScriptExecutionDisabledRequest];
      returnType: void;
    };
    /**
     * Enables touch on platforms which do not support them.
     */
    'Emulation.setTouchEmulationEnabled': {
      paramsType: [Protocol.Emulation.SetTouchEmulationEnabledRequest];
      returnType: void;
    };
    /**
     * Turns on virtual time for all frames (replacing real-time with a synthetic time source) and sets
     * the current virtual time policy.  Note this supersedes any previous time budget.
     */
    'Emulation.setVirtualTimePolicy': {
      paramsType: [Protocol.Emulation.SetVirtualTimePolicyRequest];
      returnType: Protocol.Emulation.SetVirtualTimePolicyResponse;
    };
    /**
     * Overrides default host system locale with the specified one.
     */
    'Emulation.setLocaleOverride': {
      paramsType: [Protocol.Emulation.SetLocaleOverrideRequest?];
      returnType: void;
    };
    /**
     * Overrides default host system timezone with the specified one.
     */
    'Emulation.setTimezoneOverride': {
      paramsType: [Protocol.Emulation.SetTimezoneOverrideRequest];
      returnType: void;
    };
    /**
     * Resizes the frame/viewport of the page. Note that this does not affect the frame's container
     * (e.g. browser window). Can be used to produce screenshots of the specified size. Not supported
     * on Android.
     */
    'Emulation.setVisibleSize': {
      paramsType: [Protocol.Emulation.SetVisibleSizeRequest];
      returnType: void;
    };
    'Emulation.setDisabledImageTypes': {
      paramsType: [Protocol.Emulation.SetDisabledImageTypesRequest];
      returnType: void;
    };
    /**
     * Override the value of navigator.connection.saveData
     */
    'Emulation.setDataSaverOverride': {
      paramsType: [Protocol.Emulation.SetDataSaverOverrideRequest?];
      returnType: void;
    };
    'Emulation.setHardwareConcurrencyOverride': {
      paramsType: [Protocol.Emulation.SetHardwareConcurrencyOverrideRequest];
      returnType: void;
    };
    /**
     * Allows overriding user agent with the given string.
     * `userAgentMetadata` must be set for Client Hint headers to be sent.
     */
    'Emulation.setUserAgentOverride': {
      paramsType: [Protocol.Emulation.SetUserAgentOverrideRequest];
      returnType: void;
    };
    /**
     * Allows overriding the automation flag.
     */
    'Emulation.setAutomationOverride': {
      paramsType: [Protocol.Emulation.SetAutomationOverrideRequest];
      returnType: void;
    };
    /**
     * Allows overriding the difference between the small and large viewport sizes, which determine the
     * value of the `svh` and `lvh` unit, respectively. Only supported for top-level frames.
     */
    'Emulation.setSmallViewportHeightDifferenceOverride': {
      paramsType: [Protocol.Emulation.SetSmallViewportHeightDifferenceOverrideRequest];
      returnType: void;
    };
    /**
     * Sends a BeginFrame to the target and returns when the frame was completed. Optionally captures a
     * screenshot from the resulting frame. Requires that the target was created with enabled
     * BeginFrameControl. Designed for use with --run-all-compositor-stages-before-draw, see also
     * https://goo.gle/chrome-headless-rendering for more background.
     */
    'HeadlessExperimental.beginFrame': {
      paramsType: [Protocol.HeadlessExperimental.BeginFrameRequest?];
      returnType: Protocol.HeadlessExperimental.BeginFrameResponse;
    };
    /**
     * Disables headless events for the target.
     */
    'HeadlessExperimental.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables headless events for the target.
     */
    'HeadlessExperimental.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Close the stream, discard any temporary backing storage.
     */
    'IO.close': {
      paramsType: [Protocol.IO.CloseRequest];
      returnType: void;
    };
    /**
     * Read a chunk of the stream
     */
    'IO.read': {
      paramsType: [Protocol.IO.ReadRequest];
      returnType: Protocol.IO.ReadResponse;
    };
    /**
     * Return UUID of Blob object specified by a remote object id.
     */
    'IO.resolveBlob': {
      paramsType: [Protocol.IO.ResolveBlobRequest];
      returnType: Protocol.IO.ResolveBlobResponse;
    };
    'FileSystem.getDirectory': {
      paramsType: [Protocol.FileSystem.GetDirectoryRequest];
      returnType: Protocol.FileSystem.GetDirectoryResponse;
    };
    /**
     * Clears all entries from an object store.
     */
    'IndexedDB.clearObjectStore': {
      paramsType: [Protocol.IndexedDB.ClearObjectStoreRequest];
      returnType: void;
    };
    /**
     * Deletes a database.
     */
    'IndexedDB.deleteDatabase': {
      paramsType: [Protocol.IndexedDB.DeleteDatabaseRequest];
      returnType: void;
    };
    /**
     * Delete a range of entries from an object store
     */
    'IndexedDB.deleteObjectStoreEntries': {
      paramsType: [Protocol.IndexedDB.DeleteObjectStoreEntriesRequest];
      returnType: void;
    };
    /**
     * Disables events from backend.
     */
    'IndexedDB.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables events from backend.
     */
    'IndexedDB.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Requests data from object store or index.
     */
    'IndexedDB.requestData': {
      paramsType: [Protocol.IndexedDB.RequestDataRequest];
      returnType: Protocol.IndexedDB.RequestDataResponse;
    };
    /**
     * Gets metadata of an object store.
     */
    'IndexedDB.getMetadata': {
      paramsType: [Protocol.IndexedDB.GetMetadataRequest];
      returnType: Protocol.IndexedDB.GetMetadataResponse;
    };
    /**
     * Requests database with given name in given frame.
     */
    'IndexedDB.requestDatabase': {
      paramsType: [Protocol.IndexedDB.RequestDatabaseRequest];
      returnType: Protocol.IndexedDB.RequestDatabaseResponse;
    };
    /**
     * Requests database names for given security origin.
     */
    'IndexedDB.requestDatabaseNames': {
      paramsType: [Protocol.IndexedDB.RequestDatabaseNamesRequest?];
      returnType: Protocol.IndexedDB.RequestDatabaseNamesResponse;
    };
    /**
     * Dispatches a drag event into the page.
     */
    'Input.dispatchDragEvent': {
      paramsType: [Protocol.Input.DispatchDragEventRequest];
      returnType: void;
    };
    /**
     * Dispatches a key event to the page.
     */
    'Input.dispatchKeyEvent': {
      paramsType: [Protocol.Input.DispatchKeyEventRequest];
      returnType: void;
    };
    /**
     * This method emulates inserting text that doesn't come from a key press,
     * for example an emoji keyboard or an IME.
     */
    'Input.insertText': {
      paramsType: [Protocol.Input.InsertTextRequest];
      returnType: void;
    };
    /**
     * This method sets the current candidate text for IME.
     * Use imeCommitComposition to commit the final text.
     * Use imeSetComposition with empty string as text to cancel composition.
     */
    'Input.imeSetComposition': {
      paramsType: [Protocol.Input.ImeSetCompositionRequest];
      returnType: void;
    };
    /**
     * Dispatches a mouse event to the page.
     */
    'Input.dispatchMouseEvent': {
      paramsType: [Protocol.Input.DispatchMouseEventRequest];
      returnType: void;
    };
    /**
     * Dispatches a touch event to the page.
     */
    'Input.dispatchTouchEvent': {
      paramsType: [Protocol.Input.DispatchTouchEventRequest];
      returnType: void;
    };
    /**
     * Cancels any active dragging in the page.
     */
    'Input.cancelDragging': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Emulates touch event from the mouse event parameters.
     */
    'Input.emulateTouchFromMouseEvent': {
      paramsType: [Protocol.Input.EmulateTouchFromMouseEventRequest];
      returnType: void;
    };
    /**
     * Ignores input events (useful while auditing page).
     */
    'Input.setIgnoreInputEvents': {
      paramsType: [Protocol.Input.SetIgnoreInputEventsRequest];
      returnType: void;
    };
    /**
     * Prevents default drag and drop behavior and instead emits `Input.dragIntercepted` events.
     * Drag and drop behavior can be directly controlled via `Input.dispatchDragEvent`.
     */
    'Input.setInterceptDrags': {
      paramsType: [Protocol.Input.SetInterceptDragsRequest];
      returnType: void;
    };
    /**
     * Synthesizes a pinch gesture over a time period by issuing appropriate touch events.
     */
    'Input.synthesizePinchGesture': {
      paramsType: [Protocol.Input.SynthesizePinchGestureRequest];
      returnType: void;
    };
    /**
     * Synthesizes a scroll gesture over a time period by issuing appropriate touch events.
     */
    'Input.synthesizeScrollGesture': {
      paramsType: [Protocol.Input.SynthesizeScrollGestureRequest];
      returnType: void;
    };
    /**
     * Synthesizes a tap gesture over a time period by issuing appropriate touch events.
     */
    'Input.synthesizeTapGesture': {
      paramsType: [Protocol.Input.SynthesizeTapGestureRequest];
      returnType: void;
    };
    /**
     * Disables inspector domain notifications.
     */
    'Inspector.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables inspector domain notifications.
     */
    'Inspector.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Provides the reasons why the given layer was composited.
     */
    'LayerTree.compositingReasons': {
      paramsType: [Protocol.LayerTree.CompositingReasonsRequest];
      returnType: Protocol.LayerTree.CompositingReasonsResponse;
    };
    /**
     * Disables compositing tree inspection.
     */
    'LayerTree.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables compositing tree inspection.
     */
    'LayerTree.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Returns the snapshot identifier.
     */
    'LayerTree.loadSnapshot': {
      paramsType: [Protocol.LayerTree.LoadSnapshotRequest];
      returnType: Protocol.LayerTree.LoadSnapshotResponse;
    };
    /**
     * Returns the layer snapshot identifier.
     */
    'LayerTree.makeSnapshot': {
      paramsType: [Protocol.LayerTree.MakeSnapshotRequest];
      returnType: Protocol.LayerTree.MakeSnapshotResponse;
    };
    'LayerTree.profileSnapshot': {
      paramsType: [Protocol.LayerTree.ProfileSnapshotRequest];
      returnType: Protocol.LayerTree.ProfileSnapshotResponse;
    };
    /**
     * Releases layer snapshot captured by the back-end.
     */
    'LayerTree.releaseSnapshot': {
      paramsType: [Protocol.LayerTree.ReleaseSnapshotRequest];
      returnType: void;
    };
    /**
     * Replays the layer snapshot and returns the resulting bitmap.
     */
    'LayerTree.replaySnapshot': {
      paramsType: [Protocol.LayerTree.ReplaySnapshotRequest];
      returnType: Protocol.LayerTree.ReplaySnapshotResponse;
    };
    /**
     * Replays the layer snapshot and returns canvas log.
     */
    'LayerTree.snapshotCommandLog': {
      paramsType: [Protocol.LayerTree.SnapshotCommandLogRequest];
      returnType: Protocol.LayerTree.SnapshotCommandLogResponse;
    };
    /**
     * Clears the log.
     */
    'Log.clear': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Disables log domain, prevents further log entries from being reported to the client.
     */
    'Log.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables log domain, sends the entries collected so far to the client by means of the
     * `entryAdded` notification.
     */
    'Log.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * start violation reporting.
     */
    'Log.startViolationsReport': {
      paramsType: [Protocol.Log.StartViolationsReportRequest];
      returnType: void;
    };
    /**
     * Stop violation reporting.
     */
    'Log.stopViolationsReport': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Retruns current DOM object counters.
     */
    'Memory.getDOMCounters': {
      paramsType: [];
      returnType: Protocol.Memory.GetDOMCountersResponse;
    };
    /**
     * Retruns DOM object counters after preparing renderer for leak detection.
     */
    'Memory.getDOMCountersForLeakDetection': {
      paramsType: [];
      returnType: Protocol.Memory.GetDOMCountersForLeakDetectionResponse;
    };
    /**
     * Prepares for leak detection by terminating workers, stopping spellcheckers,
     * dropping non-essential internal caches, running garbage collections, etc.
     */
    'Memory.prepareForLeakDetection': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Simulate OomIntervention by purging V8 memory.
     */
    'Memory.forciblyPurgeJavaScriptMemory': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enable/disable suppressing memory pressure notifications in all processes.
     */
    'Memory.setPressureNotificationsSuppressed': {
      paramsType: [Protocol.Memory.SetPressureNotificationsSuppressedRequest];
      returnType: void;
    };
    /**
     * Simulate a memory pressure notification in all processes.
     */
    'Memory.simulatePressureNotification': {
      paramsType: [Protocol.Memory.SimulatePressureNotificationRequest];
      returnType: void;
    };
    /**
     * Start collecting native memory profile.
     */
    'Memory.startSampling': {
      paramsType: [Protocol.Memory.StartSamplingRequest?];
      returnType: void;
    };
    /**
     * Stop collecting native memory profile.
     */
    'Memory.stopSampling': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Retrieve native memory allocations profile
     * collected since renderer process startup.
     */
    'Memory.getAllTimeSamplingProfile': {
      paramsType: [];
      returnType: Protocol.Memory.GetAllTimeSamplingProfileResponse;
    };
    /**
     * Retrieve native memory allocations profile
     * collected since browser process startup.
     */
    'Memory.getBrowserSamplingProfile': {
      paramsType: [];
      returnType: Protocol.Memory.GetBrowserSamplingProfileResponse;
    };
    /**
     * Retrieve native memory allocations profile collected since last
     * `startSampling` call.
     */
    'Memory.getSamplingProfile': {
      paramsType: [];
      returnType: Protocol.Memory.GetSamplingProfileResponse;
    };
    /**
     * Sets a list of content encodings that will be accepted. Empty list means no encoding is accepted.
     */
    'Network.setAcceptedEncodings': {
      paramsType: [Protocol.Network.SetAcceptedEncodingsRequest];
      returnType: void;
    };
    /**
     * Clears accepted encodings set by setAcceptedEncodings
     */
    'Network.clearAcceptedEncodingsOverride': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Tells whether clearing browser cache is supported.
     */
    'Network.canClearBrowserCache': {
      paramsType: [];
      returnType: Protocol.Network.CanClearBrowserCacheResponse;
    };
    /**
     * Tells whether clearing browser cookies is supported.
     */
    'Network.canClearBrowserCookies': {
      paramsType: [];
      returnType: Protocol.Network.CanClearBrowserCookiesResponse;
    };
    /**
     * Tells whether emulation of network conditions is supported.
     */
    'Network.canEmulateNetworkConditions': {
      paramsType: [];
      returnType: Protocol.Network.CanEmulateNetworkConditionsResponse;
    };
    /**
     * Clears browser cache.
     */
    'Network.clearBrowserCache': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Clears browser cookies.
     */
    'Network.clearBrowserCookies': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Response to Network.requestIntercepted which either modifies the request to continue with any
     * modifications, or blocks it, or completes it with the provided response bytes. If a network
     * fetch occurs as a result which encounters a redirect an additional Network.requestIntercepted
     * event will be sent with the same InterceptionId.
     * Deprecated, use Fetch.continueRequest, Fetch.fulfillRequest and Fetch.failRequest instead.
     */
    'Network.continueInterceptedRequest': {
      paramsType: [Protocol.Network.ContinueInterceptedRequestRequest];
      returnType: void;
    };
    /**
     * Deletes browser cookies with matching name and url or domain/path/partitionKey pair.
     */
    'Network.deleteCookies': {
      paramsType: [Protocol.Network.DeleteCookiesRequest];
      returnType: void;
    };
    /**
     * Disables network tracking, prevents network events from being sent to the client.
     */
    'Network.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Activates emulation of network conditions.
     */
    'Network.emulateNetworkConditions': {
      paramsType: [Protocol.Network.EmulateNetworkConditionsRequest];
      returnType: void;
    };
    /**
     * Enables network tracking, network events will now be delivered to the client.
     */
    'Network.enable': {
      paramsType: [Protocol.Network.EnableRequest?];
      returnType: void;
    };
    /**
     * Returns all browser cookies. Depending on the backend support, will return detailed cookie
     * information in the `cookies` field.
     * Deprecated. Use Storage.getCookies instead.
     */
    'Network.getAllCookies': {
      paramsType: [];
      returnType: Protocol.Network.GetAllCookiesResponse;
    };
    /**
     * Returns the DER-encoded certificate.
     */
    'Network.getCertificate': {
      paramsType: [Protocol.Network.GetCertificateRequest];
      returnType: Protocol.Network.GetCertificateResponse;
    };
    /**
     * Returns all browser cookies for the current URL. Depending on the backend support, will return
     * detailed cookie information in the `cookies` field.
     */
    'Network.getCookies': {
      paramsType: [Protocol.Network.GetCookiesRequest?];
      returnType: Protocol.Network.GetCookiesResponse;
    };
    /**
     * Returns content served for the given request.
     */
    'Network.getResponseBody': {
      paramsType: [Protocol.Network.GetResponseBodyRequest];
      returnType: Protocol.Network.GetResponseBodyResponse;
    };
    /**
     * Returns post data sent with the request. Returns an error when no data was sent with the request.
     */
    'Network.getRequestPostData': {
      paramsType: [Protocol.Network.GetRequestPostDataRequest];
      returnType: Protocol.Network.GetRequestPostDataResponse;
    };
    /**
     * Returns content served for the given currently intercepted request.
     */
    'Network.getResponseBodyForInterception': {
      paramsType: [Protocol.Network.GetResponseBodyForInterceptionRequest];
      returnType: Protocol.Network.GetResponseBodyForInterceptionResponse;
    };
    /**
     * Returns a handle to the stream representing the response body. Note that after this command,
     * the intercepted request can't be continued as is -- you either need to cancel it or to provide
     * the response body. The stream only supports sequential read, IO.read will fail if the position
     * is specified.
     */
    'Network.takeResponseBodyForInterceptionAsStream': {
      paramsType: [Protocol.Network.TakeResponseBodyForInterceptionAsStreamRequest];
      returnType: Protocol.Network.TakeResponseBodyForInterceptionAsStreamResponse;
    };
    /**
     * This method sends a new XMLHttpRequest which is identical to the original one. The following
     * parameters should be identical: method, url, async, request body, extra headers, withCredentials
     * attribute, user, password.
     */
    'Network.replayXHR': {
      paramsType: [Protocol.Network.ReplayXHRRequest];
      returnType: void;
    };
    /**
     * Searches for given string in response content.
     */
    'Network.searchInResponseBody': {
      paramsType: [Protocol.Network.SearchInResponseBodyRequest];
      returnType: Protocol.Network.SearchInResponseBodyResponse;
    };
    /**
     * Blocks URLs from loading.
     */
    'Network.setBlockedURLs': {
      paramsType: [Protocol.Network.SetBlockedURLsRequest];
      returnType: void;
    };
    /**
     * Toggles ignoring of service worker for each request.
     */
    'Network.setBypassServiceWorker': {
      paramsType: [Protocol.Network.SetBypassServiceWorkerRequest];
      returnType: void;
    };
    /**
     * Toggles ignoring cache for each request. If `true`, cache will not be used.
     */
    'Network.setCacheDisabled': {
      paramsType: [Protocol.Network.SetCacheDisabledRequest];
      returnType: void;
    };
    /**
     * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
     */
    'Network.setCookie': {
      paramsType: [Protocol.Network.SetCookieRequest];
      returnType: Protocol.Network.SetCookieResponse;
    };
    /**
     * Sets given cookies.
     */
    'Network.setCookies': {
      paramsType: [Protocol.Network.SetCookiesRequest];
      returnType: void;
    };
    /**
     * Specifies whether to always send extra HTTP headers with the requests from this page.
     */
    'Network.setExtraHTTPHeaders': {
      paramsType: [Protocol.Network.SetExtraHTTPHeadersRequest];
      returnType: void;
    };
    /**
     * Specifies whether to attach a page script stack id in requests
     */
    'Network.setAttachDebugStack': {
      paramsType: [Protocol.Network.SetAttachDebugStackRequest];
      returnType: void;
    };
    /**
     * Sets the requests to intercept that match the provided patterns and optionally resource types.
     * Deprecated, please use Fetch.enable instead.
     */
    'Network.setRequestInterception': {
      paramsType: [Protocol.Network.SetRequestInterceptionRequest];
      returnType: void;
    };
    /**
     * Allows overriding user agent with the given string.
     */
    'Network.setUserAgentOverride': {
      paramsType: [Protocol.Network.SetUserAgentOverrideRequest];
      returnType: void;
    };
    /**
     * Enables streaming of the response for the given requestId.
     * If enabled, the dataReceived event contains the data that was received during streaming.
     */
    'Network.streamResourceContent': {
      paramsType: [Protocol.Network.StreamResourceContentRequest];
      returnType: Protocol.Network.StreamResourceContentResponse;
    };
    /**
     * Returns information about the COEP/COOP isolation status.
     */
    'Network.getSecurityIsolationStatus': {
      paramsType: [Protocol.Network.GetSecurityIsolationStatusRequest?];
      returnType: Protocol.Network.GetSecurityIsolationStatusResponse;
    };
    /**
     * Enables tracking for the Reporting API, events generated by the Reporting API will now be delivered to the client.
     * Enabling triggers 'reportingApiReportAdded' for all existing reports.
     */
    'Network.enableReportingApi': {
      paramsType: [Protocol.Network.EnableReportingApiRequest];
      returnType: void;
    };
    /**
     * Fetches the resource and returns the content.
     */
    'Network.loadNetworkResource': {
      paramsType: [Protocol.Network.LoadNetworkResourceRequest];
      returnType: Protocol.Network.LoadNetworkResourceResponse;
    };
    /**
     * Sets Controls for third-party cookie access
     * Page reload is required before the new cookie behavior will be observed
     */
    'Network.setCookieControls': {
      paramsType: [Protocol.Network.SetCookieControlsRequest];
      returnType: void;
    };
    /**
     * Disables domain notifications.
     */
    'Overlay.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables domain notifications.
     */
    'Overlay.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * For testing.
     */
    'Overlay.getHighlightObjectForTest': {
      paramsType: [Protocol.Overlay.GetHighlightObjectForTestRequest];
      returnType: Protocol.Overlay.GetHighlightObjectForTestResponse;
    };
    /**
     * For Persistent Grid testing.
     */
    'Overlay.getGridHighlightObjectsForTest': {
      paramsType: [Protocol.Overlay.GetGridHighlightObjectsForTestRequest];
      returnType: Protocol.Overlay.GetGridHighlightObjectsForTestResponse;
    };
    /**
     * For Source Order Viewer testing.
     */
    'Overlay.getSourceOrderHighlightObjectForTest': {
      paramsType: [Protocol.Overlay.GetSourceOrderHighlightObjectForTestRequest];
      returnType: Protocol.Overlay.GetSourceOrderHighlightObjectForTestResponse;
    };
    /**
     * Hides any highlight.
     */
    'Overlay.hideHighlight': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Highlights owner element of the frame with given id.
     * Deprecated: Doesn't work reliably and cannot be fixed due to process
     * separation (the owner node might be in a different process). Determine
     * the owner node in the client and use highlightNode.
     */
    'Overlay.highlightFrame': {
      paramsType: [Protocol.Overlay.HighlightFrameRequest];
      returnType: void;
    };
    /**
     * Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or
     * objectId must be specified.
     */
    'Overlay.highlightNode': {
      paramsType: [Protocol.Overlay.HighlightNodeRequest];
      returnType: void;
    };
    /**
     * Highlights given quad. Coordinates are absolute with respect to the main frame viewport.
     */
    'Overlay.highlightQuad': {
      paramsType: [Protocol.Overlay.HighlightQuadRequest];
      returnType: void;
    };
    /**
     * Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.
     */
    'Overlay.highlightRect': {
      paramsType: [Protocol.Overlay.HighlightRectRequest];
      returnType: void;
    };
    /**
     * Highlights the source order of the children of the DOM node with given id or with the given
     * JavaScript object wrapper. Either nodeId or objectId must be specified.
     */
    'Overlay.highlightSourceOrder': {
      paramsType: [Protocol.Overlay.HighlightSourceOrderRequest];
      returnType: void;
    };
    /**
     * Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted.
     * Backend then generates 'inspectNodeRequested' event upon element selection.
     */
    'Overlay.setInspectMode': {
      paramsType: [Protocol.Overlay.SetInspectModeRequest];
      returnType: void;
    };
    /**
     * Highlights owner element of all frames detected to be ads.
     */
    'Overlay.setShowAdHighlights': {
      paramsType: [Protocol.Overlay.SetShowAdHighlightsRequest];
      returnType: void;
    };
    'Overlay.setPausedInDebuggerMessage': {
      paramsType: [Protocol.Overlay.SetPausedInDebuggerMessageRequest?];
      returnType: void;
    };
    /**
     * Requests that backend shows debug borders on layers
     */
    'Overlay.setShowDebugBorders': {
      paramsType: [Protocol.Overlay.SetShowDebugBordersRequest];
      returnType: void;
    };
    /**
     * Requests that backend shows the FPS counter
     */
    'Overlay.setShowFPSCounter': {
      paramsType: [Protocol.Overlay.SetShowFPSCounterRequest];
      returnType: void;
    };
    /**
     * Highlight multiple elements with the CSS Grid overlay.
     */
    'Overlay.setShowGridOverlays': {
      paramsType: [Protocol.Overlay.SetShowGridOverlaysRequest];
      returnType: void;
    };
    'Overlay.setShowFlexOverlays': {
      paramsType: [Protocol.Overlay.SetShowFlexOverlaysRequest];
      returnType: void;
    };
    'Overlay.setShowScrollSnapOverlays': {
      paramsType: [Protocol.Overlay.SetShowScrollSnapOverlaysRequest];
      returnType: void;
    };
    'Overlay.setShowContainerQueryOverlays': {
      paramsType: [Protocol.Overlay.SetShowContainerQueryOverlaysRequest];
      returnType: void;
    };
    /**
     * Requests that backend shows paint rectangles
     */
    'Overlay.setShowPaintRects': {
      paramsType: [Protocol.Overlay.SetShowPaintRectsRequest];
      returnType: void;
    };
    /**
     * Requests that backend shows layout shift regions
     */
    'Overlay.setShowLayoutShiftRegions': {
      paramsType: [Protocol.Overlay.SetShowLayoutShiftRegionsRequest];
      returnType: void;
    };
    /**
     * Requests that backend shows scroll bottleneck rects
     */
    'Overlay.setShowScrollBottleneckRects': {
      paramsType: [Protocol.Overlay.SetShowScrollBottleneckRectsRequest];
      returnType: void;
    };
    /**
     * Deprecated, no longer has any effect.
     */
    'Overlay.setShowHitTestBorders': {
      paramsType: [Protocol.Overlay.SetShowHitTestBordersRequest];
      returnType: void;
    };
    /**
     * Deprecated, no longer has any effect.
     */
    'Overlay.setShowWebVitals': {
      paramsType: [Protocol.Overlay.SetShowWebVitalsRequest];
      returnType: void;
    };
    /**
     * Paints viewport size upon main frame resize.
     */
    'Overlay.setShowViewportSizeOnResize': {
      paramsType: [Protocol.Overlay.SetShowViewportSizeOnResizeRequest];
      returnType: void;
    };
    /**
     * Add a dual screen device hinge
     */
    'Overlay.setShowHinge': {
      paramsType: [Protocol.Overlay.SetShowHingeRequest?];
      returnType: void;
    };
    /**
     * Show elements in isolation mode with overlays.
     */
    'Overlay.setShowIsolatedElements': {
      paramsType: [Protocol.Overlay.SetShowIsolatedElementsRequest];
      returnType: void;
    };
    /**
     * Show Window Controls Overlay for PWA
     */
    'Overlay.setShowWindowControlsOverlay': {
      paramsType: [Protocol.Overlay.SetShowWindowControlsOverlayRequest?];
      returnType: void;
    };
    /**
     * Deprecated, please use addScriptToEvaluateOnNewDocument instead.
     */
    'Page.addScriptToEvaluateOnLoad': {
      paramsType: [Protocol.Page.AddScriptToEvaluateOnLoadRequest];
      returnType: Protocol.Page.AddScriptToEvaluateOnLoadResponse;
    };
    /**
     * Evaluates given script in every frame upon creation (before loading frame's scripts).
     */
    'Page.addScriptToEvaluateOnNewDocument': {
      paramsType: [Protocol.Page.AddScriptToEvaluateOnNewDocumentRequest];
      returnType: Protocol.Page.AddScriptToEvaluateOnNewDocumentResponse;
    };
    /**
     * Brings page to front (activates tab).
     */
    'Page.bringToFront': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Capture page screenshot.
     */
    'Page.captureScreenshot': {
      paramsType: [Protocol.Page.CaptureScreenshotRequest?];
      returnType: Protocol.Page.CaptureScreenshotResponse;
    };
    /**
     * Returns a snapshot of the page as a string. For MHTML format, the serialization includes
     * iframes, shadow DOM, external resources, and element-inline styles.
     */
    'Page.captureSnapshot': {
      paramsType: [Protocol.Page.CaptureSnapshotRequest?];
      returnType: Protocol.Page.CaptureSnapshotResponse;
    };
    /**
     * Clears the overridden device metrics.
     */
    'Page.clearDeviceMetricsOverride': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Clears the overridden Device Orientation.
     */
    'Page.clearDeviceOrientationOverride': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Clears the overridden Geolocation Position and Error.
     */
    'Page.clearGeolocationOverride': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Creates an isolated world for the given frame.
     */
    'Page.createIsolatedWorld': {
      paramsType: [Protocol.Page.CreateIsolatedWorldRequest];
      returnType: Protocol.Page.CreateIsolatedWorldResponse;
    };
    /**
     * Deletes browser cookie with given name, domain and path.
     */
    'Page.deleteCookie': {
      paramsType: [Protocol.Page.DeleteCookieRequest];
      returnType: void;
    };
    /**
     * Disables page domain notifications.
     */
    'Page.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables page domain notifications.
     */
    'Page.enable': {
      paramsType: [Protocol.Page.EnableRequest?];
      returnType: void;
    };
    /**
     * Gets the processed manifest for this current document.
     *   This API always waits for the manifest to be loaded.
     *   If manifestId is provided, and it does not match the manifest of the
     *     current document, this API errors out.
     *   If there is not a loaded page, this API errors out immediately.
     */
    'Page.getAppManifest': {
      paramsType: [Protocol.Page.GetAppManifestRequest?];
      returnType: Protocol.Page.GetAppManifestResponse;
    };
    'Page.getInstallabilityErrors': {
      paramsType: [];
      returnType: Protocol.Page.GetInstallabilityErrorsResponse;
    };
    /**
     * Deprecated because it's not guaranteed that the returned icon is in fact the one used for PWA installation.
     */
    'Page.getManifestIcons': {
      paramsType: [];
      returnType: Protocol.Page.GetManifestIconsResponse;
    };
    /**
     * Returns the unique (PWA) app id.
     * Only returns values if the feature flag 'WebAppEnableManifestId' is enabled
     */
    'Page.getAppId': {
      paramsType: [];
      returnType: Protocol.Page.GetAppIdResponse;
    };
    'Page.getAdScriptAncestry': {
      paramsType: [Protocol.Page.GetAdScriptAncestryRequest];
      returnType: Protocol.Page.GetAdScriptAncestryResponse;
    };
    /**
     * Returns present frame tree structure.
     */
    'Page.getFrameTree': {
      paramsType: [];
      returnType: Protocol.Page.GetFrameTreeResponse;
    };
    /**
     * Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
     */
    'Page.getLayoutMetrics': {
      paramsType: [];
      returnType: Protocol.Page.GetLayoutMetricsResponse;
    };
    /**
     * Returns navigation history for the current page.
     */
    'Page.getNavigationHistory': {
      paramsType: [];
      returnType: Protocol.Page.GetNavigationHistoryResponse;
    };
    /**
     * Resets navigation history for the current page.
     */
    'Page.resetNavigationHistory': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Returns content of the given resource.
     */
    'Page.getResourceContent': {
      paramsType: [Protocol.Page.GetResourceContentRequest];
      returnType: Protocol.Page.GetResourceContentResponse;
    };
    /**
     * Returns present frame / resource tree structure.
     */
    'Page.getResourceTree': {
      paramsType: [];
      returnType: Protocol.Page.GetResourceTreeResponse;
    };
    /**
     * Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).
     */
    'Page.handleJavaScriptDialog': {
      paramsType: [Protocol.Page.HandleJavaScriptDialogRequest];
      returnType: void;
    };
    /**
     * Navigates current page to the given URL.
     */
    'Page.navigate': {
      paramsType: [Protocol.Page.NavigateRequest];
      returnType: Protocol.Page.NavigateResponse;
    };
    /**
     * Navigates current page to the given history entry.
     */
    'Page.navigateToHistoryEntry': {
      paramsType: [Protocol.Page.NavigateToHistoryEntryRequest];
      returnType: void;
    };
    /**
     * Print page as PDF.
     */
    'Page.printToPDF': {
      paramsType: [Protocol.Page.PrintToPDFRequest?];
      returnType: Protocol.Page.PrintToPDFResponse;
    };
    /**
     * Reloads given page optionally ignoring the cache.
     */
    'Page.reload': {
      paramsType: [Protocol.Page.ReloadRequest?];
      returnType: void;
    };
    /**
     * Deprecated, please use removeScriptToEvaluateOnNewDocument instead.
     */
    'Page.removeScriptToEvaluateOnLoad': {
      paramsType: [Protocol.Page.RemoveScriptToEvaluateOnLoadRequest];
      returnType: void;
    };
    /**
     * Removes given script from the list.
     */
    'Page.removeScriptToEvaluateOnNewDocument': {
      paramsType: [Protocol.Page.RemoveScriptToEvaluateOnNewDocumentRequest];
      returnType: void;
    };
    /**
     * Acknowledges that a screencast frame has been received by the frontend.
     */
    'Page.screencastFrameAck': {
      paramsType: [Protocol.Page.ScreencastFrameAckRequest];
      returnType: void;
    };
    /**
     * Searches for given string in resource content.
     */
    'Page.searchInResource': {
      paramsType: [Protocol.Page.SearchInResourceRequest];
      returnType: Protocol.Page.SearchInResourceResponse;
    };
    /**
     * Enable Chrome's experimental ad filter on all sites.
     */
    'Page.setAdBlockingEnabled': {
      paramsType: [Protocol.Page.SetAdBlockingEnabledRequest];
      returnType: void;
    };
    /**
     * Enable page Content Security Policy by-passing.
     */
    'Page.setBypassCSP': {
      paramsType: [Protocol.Page.SetBypassCSPRequest];
      returnType: void;
    };
    /**
     * Get Permissions Policy state on given frame.
     */
    'Page.getPermissionsPolicyState': {
      paramsType: [Protocol.Page.GetPermissionsPolicyStateRequest];
      returnType: Protocol.Page.GetPermissionsPolicyStateResponse;
    };
    /**
     * Get Origin Trials on given frame.
     */
    'Page.getOriginTrials': {
      paramsType: [Protocol.Page.GetOriginTrialsRequest];
      returnType: Protocol.Page.GetOriginTrialsResponse;
    };
    /**
     * Overrides the values of device screen dimensions (window.screen.width, window.screen.height,
     * window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media
     * query results).
     */
    'Page.setDeviceMetricsOverride': {
      paramsType: [Protocol.Page.SetDeviceMetricsOverrideRequest];
      returnType: void;
    };
    /**
     * Overrides the Device Orientation.
     */
    'Page.setDeviceOrientationOverride': {
      paramsType: [Protocol.Page.SetDeviceOrientationOverrideRequest];
      returnType: void;
    };
    /**
     * Set generic font families.
     */
    'Page.setFontFamilies': {
      paramsType: [Protocol.Page.SetFontFamiliesRequest];
      returnType: void;
    };
    /**
     * Set default font sizes.
     */
    'Page.setFontSizes': {
      paramsType: [Protocol.Page.SetFontSizesRequest];
      returnType: void;
    };
    /**
     * Sets given markup as the document's HTML.
     */
    'Page.setDocumentContent': {
      paramsType: [Protocol.Page.SetDocumentContentRequest];
      returnType: void;
    };
    /**
     * Set the behavior when downloading a file.
     */
    'Page.setDownloadBehavior': {
      paramsType: [Protocol.Page.SetDownloadBehaviorRequest];
      returnType: void;
    };
    /**
     * Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
     * unavailable.
     */
    'Page.setGeolocationOverride': {
      paramsType: [Protocol.Page.SetGeolocationOverrideRequest?];
      returnType: void;
    };
    /**
     * Controls whether page will emit lifecycle events.
     */
    'Page.setLifecycleEventsEnabled': {
      paramsType: [Protocol.Page.SetLifecycleEventsEnabledRequest];
      returnType: void;
    };
    /**
     * Toggles mouse event-based touch event emulation.
     */
    'Page.setTouchEmulationEnabled': {
      paramsType: [Protocol.Page.SetTouchEmulationEnabledRequest];
      returnType: void;
    };
    /**
     * Starts sending each frame using the `screencastFrame` event.
     */
    'Page.startScreencast': {
      paramsType: [Protocol.Page.StartScreencastRequest?];
      returnType: void;
    };
    /**
     * Force the page stop all navigations and pending resource fetches.
     */
    'Page.stopLoading': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Crashes renderer on the IO thread, generates minidumps.
     */
    'Page.crash': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Tries to close page, running its beforeunload hooks, if any.
     */
    'Page.close': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Tries to update the web lifecycle state of the page.
     * It will transition the page to the given state according to:
     * https://github.com/WICG/web-lifecycle/
     */
    'Page.setWebLifecycleState': {
      paramsType: [Protocol.Page.SetWebLifecycleStateRequest];
      returnType: void;
    };
    /**
     * Stops sending each frame in the `screencastFrame`.
     */
    'Page.stopScreencast': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Requests backend to produce compilation cache for the specified scripts.
     * `scripts` are appended to the list of scripts for which the cache
     * would be produced. The list may be reset during page navigation.
     * When script with a matching URL is encountered, the cache is optionally
     * produced upon backend discretion, based on internal heuristics.
     * See also: `Page.compilationCacheProduced`.
     */
    'Page.produceCompilationCache': {
      paramsType: [Protocol.Page.ProduceCompilationCacheRequest];
      returnType: void;
    };
    /**
     * Seeds compilation cache for given url. Compilation cache does not survive
     * cross-process navigation.
     */
    'Page.addCompilationCache': {
      paramsType: [Protocol.Page.AddCompilationCacheRequest];
      returnType: void;
    };
    /**
     * Clears seeded compilation cache.
     */
    'Page.clearCompilationCache': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Sets the Secure Payment Confirmation transaction mode.
     * https://w3c.github.io/secure-payment-confirmation/#sctn-automation-set-spc-transaction-mode
     */
    'Page.setSPCTransactionMode': {
      paramsType: [Protocol.Page.SetSPCTransactionModeRequest];
      returnType: void;
    };
    /**
     * Extensions for Custom Handlers API:
     * https://html.spec.whatwg.org/multipage/system-state.html#rph-automation
     */
    'Page.setRPHRegistrationMode': {
      paramsType: [Protocol.Page.SetRPHRegistrationModeRequest];
      returnType: void;
    };
    /**
     * Generates a report for testing.
     */
    'Page.generateTestReport': {
      paramsType: [Protocol.Page.GenerateTestReportRequest];
      returnType: void;
    };
    /**
     * Pauses page execution. Can be resumed using generic Runtime.runIfWaitingForDebugger.
     */
    'Page.waitForDebugger': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Intercept file chooser requests and transfer control to protocol clients.
     * When file chooser interception is enabled, native file chooser dialog is not shown.
     * Instead, a protocol event `Page.fileChooserOpened` is emitted.
     */
    'Page.setInterceptFileChooserDialog': {
      paramsType: [Protocol.Page.SetInterceptFileChooserDialogRequest];
      returnType: void;
    };
    /**
     * Enable/disable prerendering manually.
     *
     * This command is a short-term solution for https://crbug.com/1440085.
     * See https://docs.google.com/document/d/12HVmFxYj5Jc-eJr5OmWsa2bqTJsbgGLKI6ZIyx0_wpA
     * for more details.
     *
     * TODO(https://crbug.com/1440085): Remove this once Puppeteer supports tab targets.
     */
    'Page.setPrerenderingAllowed': {
      paramsType: [Protocol.Page.SetPrerenderingAllowedRequest];
      returnType: void;
    };
    /**
     * Disable collecting and reporting metrics.
     */
    'Performance.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enable collecting and reporting metrics.
     */
    'Performance.enable': {
      paramsType: [Protocol.Performance.EnableRequest?];
      returnType: void;
    };
    /**
     * Sets time domain to use for collecting and reporting duration metrics.
     * Note that this must be called before enabling metrics collection. Calling
     * this method while metrics collection is enabled returns an error.
     */
    'Performance.setTimeDomain': {
      paramsType: [Protocol.Performance.SetTimeDomainRequest];
      returnType: void;
    };
    /**
     * Retrieve current values of run-time metrics.
     */
    'Performance.getMetrics': {
      paramsType: [];
      returnType: Protocol.Performance.GetMetricsResponse;
    };
    /**
     * Previously buffered events would be reported before method returns.
     * See also: timelineEventAdded
     */
    'PerformanceTimeline.enable': {
      paramsType: [Protocol.PerformanceTimeline.EnableRequest];
      returnType: void;
    };
    /**
     * Disables tracking security state changes.
     */
    'Security.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables tracking security state changes.
     */
    'Security.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enable/disable whether all certificate errors should be ignored.
     */
    'Security.setIgnoreCertificateErrors': {
      paramsType: [Protocol.Security.SetIgnoreCertificateErrorsRequest];
      returnType: void;
    };
    /**
     * Handles a certificate error that fired a certificateError event.
     */
    'Security.handleCertificateError': {
      paramsType: [Protocol.Security.HandleCertificateErrorRequest];
      returnType: void;
    };
    /**
     * Enable/disable overriding certificate errors. If enabled, all certificate error events need to
     * be handled by the DevTools client and should be answered with `handleCertificateError` commands.
     */
    'Security.setOverrideCertificateErrors': {
      paramsType: [Protocol.Security.SetOverrideCertificateErrorsRequest];
      returnType: void;
    };
    'ServiceWorker.deliverPushMessage': {
      paramsType: [Protocol.ServiceWorker.DeliverPushMessageRequest];
      returnType: void;
    };
    'ServiceWorker.disable': {
      paramsType: [];
      returnType: void;
    };
    'ServiceWorker.dispatchSyncEvent': {
      paramsType: [Protocol.ServiceWorker.DispatchSyncEventRequest];
      returnType: void;
    };
    'ServiceWorker.dispatchPeriodicSyncEvent': {
      paramsType: [Protocol.ServiceWorker.DispatchPeriodicSyncEventRequest];
      returnType: void;
    };
    'ServiceWorker.enable': {
      paramsType: [];
      returnType: void;
    };
    'ServiceWorker.setForceUpdateOnPageLoad': {
      paramsType: [Protocol.ServiceWorker.SetForceUpdateOnPageLoadRequest];
      returnType: void;
    };
    'ServiceWorker.skipWaiting': {
      paramsType: [Protocol.ServiceWorker.SkipWaitingRequest];
      returnType: void;
    };
    'ServiceWorker.startWorker': {
      paramsType: [Protocol.ServiceWorker.StartWorkerRequest];
      returnType: void;
    };
    'ServiceWorker.stopAllWorkers': {
      paramsType: [];
      returnType: void;
    };
    'ServiceWorker.stopWorker': {
      paramsType: [Protocol.ServiceWorker.StopWorkerRequest];
      returnType: void;
    };
    'ServiceWorker.unregister': {
      paramsType: [Protocol.ServiceWorker.UnregisterRequest];
      returnType: void;
    };
    'ServiceWorker.updateRegistration': {
      paramsType: [Protocol.ServiceWorker.UpdateRegistrationRequest];
      returnType: void;
    };
    /**
     * Returns a storage key given a frame id.
     */
    'Storage.getStorageKeyForFrame': {
      paramsType: [Protocol.Storage.GetStorageKeyForFrameRequest];
      returnType: Protocol.Storage.GetStorageKeyForFrameResponse;
    };
    /**
     * Clears storage for origin.
     */
    'Storage.clearDataForOrigin': {
      paramsType: [Protocol.Storage.ClearDataForOriginRequest];
      returnType: void;
    };
    /**
     * Clears storage for storage key.
     */
    'Storage.clearDataForStorageKey': {
      paramsType: [Protocol.Storage.ClearDataForStorageKeyRequest];
      returnType: void;
    };
    /**
     * Returns all browser cookies.
     */
    'Storage.getCookies': {
      paramsType: [Protocol.Storage.GetCookiesRequest?];
      returnType: Protocol.Storage.GetCookiesResponse;
    };
    /**
     * Sets given cookies.
     */
    'Storage.setCookies': {
      paramsType: [Protocol.Storage.SetCookiesRequest];
      returnType: void;
    };
    /**
     * Clears cookies.
     */
    'Storage.clearCookies': {
      paramsType: [Protocol.Storage.ClearCookiesRequest?];
      returnType: void;
    };
    /**
     * Returns usage and quota in bytes.
     */
    'Storage.getUsageAndQuota': {
      paramsType: [Protocol.Storage.GetUsageAndQuotaRequest];
      returnType: Protocol.Storage.GetUsageAndQuotaResponse;
    };
    /**
     * Override quota for the specified origin
     */
    'Storage.overrideQuotaForOrigin': {
      paramsType: [Protocol.Storage.OverrideQuotaForOriginRequest];
      returnType: void;
    };
    /**
     * Registers origin to be notified when an update occurs to its cache storage list.
     */
    'Storage.trackCacheStorageForOrigin': {
      paramsType: [Protocol.Storage.TrackCacheStorageForOriginRequest];
      returnType: void;
    };
    /**
     * Registers storage key to be notified when an update occurs to its cache storage list.
     */
    'Storage.trackCacheStorageForStorageKey': {
      paramsType: [Protocol.Storage.TrackCacheStorageForStorageKeyRequest];
      returnType: void;
    };
    /**
     * Registers origin to be notified when an update occurs to its IndexedDB.
     */
    'Storage.trackIndexedDBForOrigin': {
      paramsType: [Protocol.Storage.TrackIndexedDBForOriginRequest];
      returnType: void;
    };
    /**
     * Registers storage key to be notified when an update occurs to its IndexedDB.
     */
    'Storage.trackIndexedDBForStorageKey': {
      paramsType: [Protocol.Storage.TrackIndexedDBForStorageKeyRequest];
      returnType: void;
    };
    /**
     * Unregisters origin from receiving notifications for cache storage.
     */
    'Storage.untrackCacheStorageForOrigin': {
      paramsType: [Protocol.Storage.UntrackCacheStorageForOriginRequest];
      returnType: void;
    };
    /**
     * Unregisters storage key from receiving notifications for cache storage.
     */
    'Storage.untrackCacheStorageForStorageKey': {
      paramsType: [Protocol.Storage.UntrackCacheStorageForStorageKeyRequest];
      returnType: void;
    };
    /**
     * Unregisters origin from receiving notifications for IndexedDB.
     */
    'Storage.untrackIndexedDBForOrigin': {
      paramsType: [Protocol.Storage.UntrackIndexedDBForOriginRequest];
      returnType: void;
    };
    /**
     * Unregisters storage key from receiving notifications for IndexedDB.
     */
    'Storage.untrackIndexedDBForStorageKey': {
      paramsType: [Protocol.Storage.UntrackIndexedDBForStorageKeyRequest];
      returnType: void;
    };
    /**
     * Returns the number of stored Trust Tokens per issuer for the
     * current browsing context.
     */
    'Storage.getTrustTokens': {
      paramsType: [];
      returnType: Protocol.Storage.GetTrustTokensResponse;
    };
    /**
     * Removes all Trust Tokens issued by the provided issuerOrigin.
     * Leaves other stored data, including the issuer's Redemption Records, intact.
     */
    'Storage.clearTrustTokens': {
      paramsType: [Protocol.Storage.ClearTrustTokensRequest];
      returnType: Protocol.Storage.ClearTrustTokensResponse;
    };
    /**
     * Gets details for a named interest group.
     */
    'Storage.getInterestGroupDetails': {
      paramsType: [Protocol.Storage.GetInterestGroupDetailsRequest];
      returnType: Protocol.Storage.GetInterestGroupDetailsResponse;
    };
    /**
     * Enables/Disables issuing of interestGroupAccessed events.
     */
    'Storage.setInterestGroupTracking': {
      paramsType: [Protocol.Storage.SetInterestGroupTrackingRequest];
      returnType: void;
    };
    /**
     * Enables/Disables issuing of interestGroupAuctionEventOccurred and
     * interestGroupAuctionNetworkRequestCreated.
     */
    'Storage.setInterestGroupAuctionTracking': {
      paramsType: [Protocol.Storage.SetInterestGroupAuctionTrackingRequest];
      returnType: void;
    };
    /**
     * Gets metadata for an origin's shared storage.
     */
    'Storage.getSharedStorageMetadata': {
      paramsType: [Protocol.Storage.GetSharedStorageMetadataRequest];
      returnType: Protocol.Storage.GetSharedStorageMetadataResponse;
    };
    /**
     * Gets the entries in an given origin's shared storage.
     */
    'Storage.getSharedStorageEntries': {
      paramsType: [Protocol.Storage.GetSharedStorageEntriesRequest];
      returnType: Protocol.Storage.GetSharedStorageEntriesResponse;
    };
    /**
     * Sets entry with `key` and `value` for a given origin's shared storage.
     */
    'Storage.setSharedStorageEntry': {
      paramsType: [Protocol.Storage.SetSharedStorageEntryRequest];
      returnType: void;
    };
    /**
     * Deletes entry for `key` (if it exists) for a given origin's shared storage.
     */
    'Storage.deleteSharedStorageEntry': {
      paramsType: [Protocol.Storage.DeleteSharedStorageEntryRequest];
      returnType: void;
    };
    /**
     * Clears all entries for a given origin's shared storage.
     */
    'Storage.clearSharedStorageEntries': {
      paramsType: [Protocol.Storage.ClearSharedStorageEntriesRequest];
      returnType: void;
    };
    /**
     * Resets the budget for `ownerOrigin` by clearing all budget withdrawals.
     */
    'Storage.resetSharedStorageBudget': {
      paramsType: [Protocol.Storage.ResetSharedStorageBudgetRequest];
      returnType: void;
    };
    /**
     * Enables/disables issuing of sharedStorageAccessed events.
     */
    'Storage.setSharedStorageTracking': {
      paramsType: [Protocol.Storage.SetSharedStorageTrackingRequest];
      returnType: void;
    };
    /**
     * Set tracking for a storage key's buckets.
     */
    'Storage.setStorageBucketTracking': {
      paramsType: [Protocol.Storage.SetStorageBucketTrackingRequest];
      returnType: void;
    };
    /**
     * Deletes the Storage Bucket with the given storage key and bucket name.
     */
    'Storage.deleteStorageBucket': {
      paramsType: [Protocol.Storage.DeleteStorageBucketRequest];
      returnType: void;
    };
    /**
     * Deletes state for sites identified as potential bounce trackers, immediately.
     */
    'Storage.runBounceTrackingMitigations': {
      paramsType: [];
      returnType: Protocol.Storage.RunBounceTrackingMitigationsResponse;
    };
    /**
     * https://wicg.github.io/attribution-reporting-api/
     */
    'Storage.setAttributionReportingLocalTestingMode': {
      paramsType: [Protocol.Storage.SetAttributionReportingLocalTestingModeRequest];
      returnType: void;
    };
    /**
     * Enables/disables issuing of Attribution Reporting events.
     */
    'Storage.setAttributionReportingTracking': {
      paramsType: [Protocol.Storage.SetAttributionReportingTrackingRequest];
      returnType: void;
    };
    /**
     * Sends all pending Attribution Reports immediately, regardless of their
     * scheduled report time.
     */
    'Storage.sendPendingAttributionReports': {
      paramsType: [];
      returnType: Protocol.Storage.SendPendingAttributionReportsResponse;
    };
    /**
     * Returns the effective Related Website Sets in use by this profile for the browser
     * session. The effective Related Website Sets will not change during a browser session.
     */
    'Storage.getRelatedWebsiteSets': {
      paramsType: [];
      returnType: Protocol.Storage.GetRelatedWebsiteSetsResponse;
    };
    /**
     * Returns the list of URLs from a page and its embedded resources that match
     * existing grace period URL pattern rules.
     * https://developers.google.com/privacy-sandbox/cookies/temporary-exceptions/grace-period
     */
    'Storage.getAffectedUrlsForThirdPartyCookieMetadata': {
      paramsType: [Protocol.Storage.GetAffectedUrlsForThirdPartyCookieMetadataRequest];
      returnType: Protocol.Storage.GetAffectedUrlsForThirdPartyCookieMetadataResponse;
    };
    'Storage.setProtectedAudienceKAnonymity': {
      paramsType: [Protocol.Storage.SetProtectedAudienceKAnonymityRequest];
      returnType: void;
    };
    /**
     * Returns information about the system.
     */
    'SystemInfo.getInfo': {
      paramsType: [];
      returnType: Protocol.SystemInfo.GetInfoResponse;
    };
    /**
     * Returns information about the feature state.
     */
    'SystemInfo.getFeatureState': {
      paramsType: [Protocol.SystemInfo.GetFeatureStateRequest];
      returnType: Protocol.SystemInfo.GetFeatureStateResponse;
    };
    /**
     * Returns information about all running processes.
     */
    'SystemInfo.getProcessInfo': {
      paramsType: [];
      returnType: Protocol.SystemInfo.GetProcessInfoResponse;
    };
    /**
     * Activates (focuses) the target.
     */
    'Target.activateTarget': {
      paramsType: [Protocol.Target.ActivateTargetRequest];
      returnType: void;
    };
    /**
     * Attaches to the target with given id.
     */
    'Target.attachToTarget': {
      paramsType: [Protocol.Target.AttachToTargetRequest];
      returnType: Protocol.Target.AttachToTargetResponse;
    };
    /**
     * Attaches to the browser target, only uses flat sessionId mode.
     */
    'Target.attachToBrowserTarget': {
      paramsType: [];
      returnType: Protocol.Target.AttachToBrowserTargetResponse;
    };
    /**
     * Closes the target. If the target is a page that gets closed too.
     */
    'Target.closeTarget': {
      paramsType: [Protocol.Target.CloseTargetRequest];
      returnType: Protocol.Target.CloseTargetResponse;
    };
    /**
     * Inject object to the target's main frame that provides a communication
     * channel with browser target.
     *
     * Injected object will be available as `window[bindingName]`.
     *
     * The object has the following API:
     * - `binding.send(json)` - a method to send messages over the remote debugging protocol
     * - `binding.onmessage = json => handleMessage(json)` - a callback that will be called for the protocol notifications and command responses.
     */
    'Target.exposeDevToolsProtocol': {
      paramsType: [Protocol.Target.ExposeDevToolsProtocolRequest];
      returnType: void;
    };
    /**
     * Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than
     * one.
     */
    'Target.createBrowserContext': {
      paramsType: [Protocol.Target.CreateBrowserContextRequest?];
      returnType: Protocol.Target.CreateBrowserContextResponse;
    };
    /**
     * Returns all browser contexts created with `Target.createBrowserContext` method.
     */
    'Target.getBrowserContexts': {
      paramsType: [];
      returnType: Protocol.Target.GetBrowserContextsResponse;
    };
    /**
     * Creates a new page.
     */
    'Target.createTarget': {
      paramsType: [Protocol.Target.CreateTargetRequest];
      returnType: Protocol.Target.CreateTargetResponse;
    };
    /**
     * Detaches session with given id.
     */
    'Target.detachFromTarget': {
      paramsType: [Protocol.Target.DetachFromTargetRequest?];
      returnType: void;
    };
    /**
     * Deletes a BrowserContext. All the belonging pages will be closed without calling their
     * beforeunload hooks.
     */
    'Target.disposeBrowserContext': {
      paramsType: [Protocol.Target.DisposeBrowserContextRequest];
      returnType: void;
    };
    /**
     * Returns information about a target.
     */
    'Target.getTargetInfo': {
      paramsType: [Protocol.Target.GetTargetInfoRequest?];
      returnType: Protocol.Target.GetTargetInfoResponse;
    };
    /**
     * Retrieves a list of available targets.
     */
    'Target.getTargets': {
      paramsType: [Protocol.Target.GetTargetsRequest?];
      returnType: Protocol.Target.GetTargetsResponse;
    };
    /**
     * Sends protocol message over session with given id.
     * Consider using flat mode instead; see commands attachToTarget, setAutoAttach,
     * and crbug.com/991325.
     */
    'Target.sendMessageToTarget': {
      paramsType: [Protocol.Target.SendMessageToTargetRequest];
      returnType: void;
    };
    /**
     * Controls whether to automatically attach to new targets which are considered
     * to be directly related to this one (for example, iframes or workers).
     * When turned on, attaches to all existing related targets as well. When turned off,
     * automatically detaches from all currently attached targets.
     * This also clears all targets added by `autoAttachRelated` from the list of targets to watch
     * for creation of related targets.
     * You might want to call this recursively for auto-attached targets to attach
     * to all available targets.
     */
    'Target.setAutoAttach': {
      paramsType: [Protocol.Target.SetAutoAttachRequest];
      returnType: void;
    };
    /**
     * Adds the specified target to the list of targets that will be monitored for any related target
     * creation (such as child frames, child workers and new versions of service worker) and reported
     * through `attachedToTarget`. The specified target is also auto-attached.
     * This cancels the effect of any previous `setAutoAttach` and is also cancelled by subsequent
     * `setAutoAttach`. Only available at the Browser target.
     */
    'Target.autoAttachRelated': {
      paramsType: [Protocol.Target.AutoAttachRelatedRequest];
      returnType: void;
    };
    /**
     * Controls whether to discover available targets and notify via
     * `targetCreated/targetInfoChanged/targetDestroyed` events.
     */
    'Target.setDiscoverTargets': {
      paramsType: [Protocol.Target.SetDiscoverTargetsRequest];
      returnType: void;
    };
    /**
     * Enables target discovery for the specified locations, when `setDiscoverTargets` was set to
     * `true`.
     */
    'Target.setRemoteLocations': {
      paramsType: [Protocol.Target.SetRemoteLocationsRequest];
      returnType: void;
    };
    /**
     * Request browser port binding.
     */
    'Tethering.bind': {
      paramsType: [Protocol.Tethering.BindRequest];
      returnType: void;
    };
    /**
     * Request browser port unbinding.
     */
    'Tethering.unbind': {
      paramsType: [Protocol.Tethering.UnbindRequest];
      returnType: void;
    };
    /**
     * Stop trace events collection.
     */
    'Tracing.end': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Gets supported tracing categories.
     */
    'Tracing.getCategories': {
      paramsType: [];
      returnType: Protocol.Tracing.GetCategoriesResponse;
    };
    /**
     * Record a clock sync marker in the trace.
     */
    'Tracing.recordClockSyncMarker': {
      paramsType: [Protocol.Tracing.RecordClockSyncMarkerRequest];
      returnType: void;
    };
    /**
     * Request a global memory dump.
     */
    'Tracing.requestMemoryDump': {
      paramsType: [Protocol.Tracing.RequestMemoryDumpRequest?];
      returnType: Protocol.Tracing.RequestMemoryDumpResponse;
    };
    /**
     * Start trace events collection.
     */
    'Tracing.start': {
      paramsType: [Protocol.Tracing.StartRequest?];
      returnType: void;
    };
    /**
     * Disables the fetch domain.
     */
    'Fetch.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables issuing of requestPaused events. A request will be paused until client
     * calls one of failRequest, fulfillRequest or continueRequest/continueWithAuth.
     */
    'Fetch.enable': {
      paramsType: [Protocol.Fetch.EnableRequest?];
      returnType: void;
    };
    /**
     * Causes the request to fail with specified reason.
     */
    'Fetch.failRequest': {
      paramsType: [Protocol.Fetch.FailRequestRequest];
      returnType: void;
    };
    /**
     * Provides response to the request.
     */
    'Fetch.fulfillRequest': {
      paramsType: [Protocol.Fetch.FulfillRequestRequest];
      returnType: void;
    };
    /**
     * Continues the request, optionally modifying some of its parameters.
     */
    'Fetch.continueRequest': {
      paramsType: [Protocol.Fetch.ContinueRequestRequest];
      returnType: void;
    };
    /**
     * Continues a request supplying authChallengeResponse following authRequired event.
     */
    'Fetch.continueWithAuth': {
      paramsType: [Protocol.Fetch.ContinueWithAuthRequest];
      returnType: void;
    };
    /**
     * Continues loading of the paused response, optionally modifying the
     * response headers. If either responseCode or headers are modified, all of them
     * must be present.
     */
    'Fetch.continueResponse': {
      paramsType: [Protocol.Fetch.ContinueResponseRequest];
      returnType: void;
    };
    /**
     * Causes the body of the response to be received from the server and
     * returned as a single string. May only be issued for a request that
     * is paused in the Response stage and is mutually exclusive with
     * takeResponseBodyForInterceptionAsStream. Calling other methods that
     * affect the request or disabling fetch domain before body is received
     * results in an undefined behavior.
     * Note that the response body is not available for redirects. Requests
     * paused in the _redirect received_ state may be differentiated by
     * `responseCode` and presence of `location` response header, see
     * comments to `requestPaused` for details.
     */
    'Fetch.getResponseBody': {
      paramsType: [Protocol.Fetch.GetResponseBodyRequest];
      returnType: Protocol.Fetch.GetResponseBodyResponse;
    };
    /**
     * Returns a handle to the stream representing the response body.
     * The request must be paused in the HeadersReceived stage.
     * Note that after this command the request can't be continued
     * as is -- client either needs to cancel it or to provide the
     * response body.
     * The stream only supports sequential read, IO.read will fail if the position
     * is specified.
     * This method is mutually exclusive with getResponseBody.
     * Calling other methods that affect the request or disabling fetch
     * domain before body is received results in an undefined behavior.
     */
    'Fetch.takeResponseBodyAsStream': {
      paramsType: [Protocol.Fetch.TakeResponseBodyAsStreamRequest];
      returnType: Protocol.Fetch.TakeResponseBodyAsStreamResponse;
    };
    /**
     * Enables the WebAudio domain and starts sending context lifetime events.
     */
    'WebAudio.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Disables the WebAudio domain.
     */
    'WebAudio.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Fetch the realtime data from the registered contexts.
     */
    'WebAudio.getRealtimeData': {
      paramsType: [Protocol.WebAudio.GetRealtimeDataRequest];
      returnType: Protocol.WebAudio.GetRealtimeDataResponse;
    };
    /**
     * Enable the WebAuthn domain and start intercepting credential storage and
     * retrieval with a virtual authenticator.
     */
    'WebAuthn.enable': {
      paramsType: [Protocol.WebAuthn.EnableRequest?];
      returnType: void;
    };
    /**
     * Disable the WebAuthn domain.
     */
    'WebAuthn.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Creates and adds a virtual authenticator.
     */
    'WebAuthn.addVirtualAuthenticator': {
      paramsType: [Protocol.WebAuthn.AddVirtualAuthenticatorRequest];
      returnType: Protocol.WebAuthn.AddVirtualAuthenticatorResponse;
    };
    /**
     * Resets parameters isBogusSignature, isBadUV, isBadUP to false if they are not present.
     */
    'WebAuthn.setResponseOverrideBits': {
      paramsType: [Protocol.WebAuthn.SetResponseOverrideBitsRequest];
      returnType: void;
    };
    /**
     * Removes the given authenticator.
     */
    'WebAuthn.removeVirtualAuthenticator': {
      paramsType: [Protocol.WebAuthn.RemoveVirtualAuthenticatorRequest];
      returnType: void;
    };
    /**
     * Adds the credential to the specified authenticator.
     */
    'WebAuthn.addCredential': {
      paramsType: [Protocol.WebAuthn.AddCredentialRequest];
      returnType: void;
    };
    /**
     * Returns a single credential stored in the given virtual authenticator that
     * matches the credential ID.
     */
    'WebAuthn.getCredential': {
      paramsType: [Protocol.WebAuthn.GetCredentialRequest];
      returnType: Protocol.WebAuthn.GetCredentialResponse;
    };
    /**
     * Returns all the credentials stored in the given virtual authenticator.
     */
    'WebAuthn.getCredentials': {
      paramsType: [Protocol.WebAuthn.GetCredentialsRequest];
      returnType: Protocol.WebAuthn.GetCredentialsResponse;
    };
    /**
     * Removes a credential from the authenticator.
     */
    'WebAuthn.removeCredential': {
      paramsType: [Protocol.WebAuthn.RemoveCredentialRequest];
      returnType: void;
    };
    /**
     * Clears all the credentials from the specified device.
     */
    'WebAuthn.clearCredentials': {
      paramsType: [Protocol.WebAuthn.ClearCredentialsRequest];
      returnType: void;
    };
    /**
     * Sets whether User Verification succeeds or fails for an authenticator.
     * The default is true.
     */
    'WebAuthn.setUserVerified': {
      paramsType: [Protocol.WebAuthn.SetUserVerifiedRequest];
      returnType: void;
    };
    /**
     * Sets whether tests of user presence will succeed immediately (if true) or fail to resolve (if false) for an authenticator.
     * The default is true.
     */
    'WebAuthn.setAutomaticPresenceSimulation': {
      paramsType: [Protocol.WebAuthn.SetAutomaticPresenceSimulationRequest];
      returnType: void;
    };
    /**
     * Allows setting credential properties.
     * https://w3c.github.io/webauthn/#sctn-automation-set-credential-properties
     */
    'WebAuthn.setCredentialProperties': {
      paramsType: [Protocol.WebAuthn.SetCredentialPropertiesRequest];
      returnType: void;
    };
    /**
     * Enables the Media domain
     */
    'Media.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Disables the Media domain.
     */
    'Media.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enable events in this domain.
     */
    'DeviceAccess.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Disable events in this domain.
     */
    'DeviceAccess.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Select a device in response to a DeviceAccess.deviceRequestPrompted event.
     */
    'DeviceAccess.selectPrompt': {
      paramsType: [Protocol.DeviceAccess.SelectPromptRequest];
      returnType: void;
    };
    /**
     * Cancel a prompt in response to a DeviceAccess.deviceRequestPrompted event.
     */
    'DeviceAccess.cancelPrompt': {
      paramsType: [Protocol.DeviceAccess.CancelPromptRequest];
      returnType: void;
    };
    'Preload.enable': {
      paramsType: [];
      returnType: void;
    };
    'Preload.disable': {
      paramsType: [];
      returnType: void;
    };
    'FedCm.enable': {
      paramsType: [Protocol.FedCm.EnableRequest?];
      returnType: void;
    };
    'FedCm.disable': {
      paramsType: [];
      returnType: void;
    };
    'FedCm.selectAccount': {
      paramsType: [Protocol.FedCm.SelectAccountRequest];
      returnType: void;
    };
    'FedCm.clickDialogButton': {
      paramsType: [Protocol.FedCm.ClickDialogButtonRequest];
      returnType: void;
    };
    'FedCm.openUrl': {
      paramsType: [Protocol.FedCm.OpenUrlRequest];
      returnType: void;
    };
    'FedCm.dismissDialog': {
      paramsType: [Protocol.FedCm.DismissDialogRequest];
      returnType: void;
    };
    /**
     * Resets the cooldown time, if any, to allow the next FedCM call to show
     * a dialog even if one was recently dismissed by the user.
     */
    'FedCm.resetCooldown': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Returns the following OS state for the given manifest id.
     */
    'PWA.getOsAppState': {
      paramsType: [Protocol.PWA.GetOsAppStateRequest];
      returnType: Protocol.PWA.GetOsAppStateResponse;
    };
    /**
     * Installs the given manifest identity, optionally using the given installUrlOrBundleUrl
     *
     * IWA-specific install description:
     * manifestId corresponds to isolated-app:// + web_package::SignedWebBundleId
     *
     * File installation mode:
     * The installUrlOrBundleUrl can be either file:// or http(s):// pointing
     * to a signed web bundle (.swbn). In this case SignedWebBundleId must correspond to
     * The .swbn file's signing key.
     *
     * Dev proxy installation mode:
     * installUrlOrBundleUrl must be http(s):// that serves dev mode IWA.
     * web_package::SignedWebBundleId must be of type dev proxy.
     *
     * The advantage of dev proxy mode is that all changes to IWA
     * automatically will be reflected in the running app without
     * reinstallation.
     *
     * To generate bundle id for proxy mode:
     * 1. Generate 32 random bytes.
     * 2. Add a specific suffix 0x00 at the end.
     * 3. Encode the entire sequence using Base32 without padding.
     *
     * If Chrome is not in IWA dev
     * mode, the installation will fail, regardless of the state of the allowlist.
     */
    'PWA.install': {
      paramsType: [Protocol.PWA.InstallRequest];
      returnType: void;
    };
    /**
     * Uninstalls the given manifest_id and closes any opened app windows.
     */
    'PWA.uninstall': {
      paramsType: [Protocol.PWA.UninstallRequest];
      returnType: void;
    };
    /**
     * Launches the installed web app, or an url in the same web app instead of the
     * default start url if it is provided. Returns a page Target.TargetID which
     * can be used to attach to via Target.attachToTarget or similar APIs.
     */
    'PWA.launch': {
      paramsType: [Protocol.PWA.LaunchRequest];
      returnType: Protocol.PWA.LaunchResponse;
    };
    /**
     * Opens one or more local files from an installed web app identified by its
     * manifestId. The web app needs to have file handlers registered to process
     * the files. The API returns one or more page Target.TargetIDs which can be
     * used to attach to via Target.attachToTarget or similar APIs.
     * If some files in the parameters cannot be handled by the web app, they will
     * be ignored. If none of the files can be handled, this API returns an error.
     * If no files are provided as the parameter, this API also returns an error.
     *
     * According to the definition of the file handlers in the manifest file, one
     * Target.TargetID may represent a page handling one or more files. The order
     * of the returned Target.TargetIDs is not guaranteed.
     *
     * TODO(crbug.com/339454034): Check the existences of the input files.
     */
    'PWA.launchFilesInApp': {
      paramsType: [Protocol.PWA.LaunchFilesInAppRequest];
      returnType: Protocol.PWA.LaunchFilesInAppResponse;
    };
    /**
     * Opens the current page in its web app identified by the manifest id, needs
     * to be called on a page target. This function returns immediately without
     * waiting for the app to finish loading.
     */
    'PWA.openCurrentPageInApp': {
      paramsType: [Protocol.PWA.OpenCurrentPageInAppRequest];
      returnType: void;
    };
    /**
     * Changes user settings of the web app identified by its manifestId. If the
     * app was not installed, this command returns an error. Unset parameters will
     * be ignored; unrecognized values will cause an error.
     *
     * Unlike the ones defined in the manifest files of the web apps, these
     * settings are provided by the browser and controlled by the users, they
     * impact the way the browser handling the web apps.
     *
     * See the comment of each parameter.
     */
    'PWA.changeAppUserSettings': {
      paramsType: [Protocol.PWA.ChangeAppUserSettingsRequest];
      returnType: void;
    };
    /**
     * Enable the BluetoothEmulation domain.
     */
    'BluetoothEmulation.enable': {
      paramsType: [Protocol.BluetoothEmulation.EnableRequest];
      returnType: void;
    };
    /**
     * Set the state of the simulated central.
     */
    'BluetoothEmulation.setSimulatedCentralState': {
      paramsType: [Protocol.BluetoothEmulation.SetSimulatedCentralStateRequest];
      returnType: void;
    };
    /**
     * Disable the BluetoothEmulation domain.
     */
    'BluetoothEmulation.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Simulates a peripheral with |address|, |name| and |knownServiceUuids|
     * that has already been connected to the system.
     */
    'BluetoothEmulation.simulatePreconnectedPeripheral': {
      paramsType: [Protocol.BluetoothEmulation.SimulatePreconnectedPeripheralRequest];
      returnType: void;
    };
    /**
     * Simulates an advertisement packet described in |entry| being received by
     * the central.
     */
    'BluetoothEmulation.simulateAdvertisement': {
      paramsType: [Protocol.BluetoothEmulation.SimulateAdvertisementRequest];
      returnType: void;
    };
    /**
     * Simulates the response code from the peripheral with |address| for a
     * GATT operation of |type|. The |code| value follows the HCI Error Codes from
     * Bluetooth Core Specification Vol 2 Part D 1.3 List Of Error Codes.
     */
    'BluetoothEmulation.simulateGATTOperationResponse': {
      paramsType: [Protocol.BluetoothEmulation.SimulateGATTOperationResponseRequest];
      returnType: void;
    };
    /**
     * Simulates the response from the characteristic with |characteristicId| for a
     * characteristic operation of |type|. The |code| value follows the Error
     * Codes from Bluetooth Core Specification Vol 3 Part F 3.4.1.1 Error Response.
     * The |data| is expected to exist when simulating a successful read operation
     * response.
     */
    'BluetoothEmulation.simulateCharacteristicOperationResponse': {
      paramsType: [Protocol.BluetoothEmulation.SimulateCharacteristicOperationResponseRequest];
      returnType: void;
    };
    /**
     * Simulates the response from the descriptor with |descriptorId| for a
     * descriptor operation of |type|. The |code| value follows the Error
     * Codes from Bluetooth Core Specification Vol 3 Part F 3.4.1.1 Error Response.
     * The |data| is expected to exist when simulating a successful read operation
     * response.
     */
    'BluetoothEmulation.simulateDescriptorOperationResponse': {
      paramsType: [Protocol.BluetoothEmulation.SimulateDescriptorOperationResponseRequest];
      returnType: void;
    };
    /**
     * Adds a service with |serviceUuid| to the peripheral with |address|.
     */
    'BluetoothEmulation.addService': {
      paramsType: [Protocol.BluetoothEmulation.AddServiceRequest];
      returnType: Protocol.BluetoothEmulation.AddServiceResponse;
    };
    /**
     * Removes the service respresented by |serviceId| from the simulated central.
     */
    'BluetoothEmulation.removeService': {
      paramsType: [Protocol.BluetoothEmulation.RemoveServiceRequest];
      returnType: void;
    };
    /**
     * Adds a characteristic with |characteristicUuid| and |properties| to the
     * service represented by |serviceId|.
     */
    'BluetoothEmulation.addCharacteristic': {
      paramsType: [Protocol.BluetoothEmulation.AddCharacteristicRequest];
      returnType: Protocol.BluetoothEmulation.AddCharacteristicResponse;
    };
    /**
     * Removes the characteristic respresented by |characteristicId| from the
     * simulated central.
     */
    'BluetoothEmulation.removeCharacteristic': {
      paramsType: [Protocol.BluetoothEmulation.RemoveCharacteristicRequest];
      returnType: void;
    };
    /**
     * Adds a descriptor with |descriptorUuid| to the characteristic respresented
     * by |characteristicId|.
     */
    'BluetoothEmulation.addDescriptor': {
      paramsType: [Protocol.BluetoothEmulation.AddDescriptorRequest];
      returnType: Protocol.BluetoothEmulation.AddDescriptorResponse;
    };
    /**
     * Removes the descriptor with |descriptorId| from the simulated central.
     */
    'BluetoothEmulation.removeDescriptor': {
      paramsType: [Protocol.BluetoothEmulation.RemoveDescriptorRequest];
      returnType: void;
    };
    /**
     * Simulates a GATT disconnection from the peripheral with |address|.
     */
    'BluetoothEmulation.simulateGATTDisconnection': {
      paramsType: [Protocol.BluetoothEmulation.SimulateGATTDisconnectionRequest];
      returnType: void;
    };
    /**
     * Continues execution until specific location is reached.
     */
    'Debugger.continueToLocation': {
      paramsType: [Protocol.Debugger.ContinueToLocationRequest];
      returnType: void;
    };
    /**
     * Disables debugger for given page.
     */
    'Debugger.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables debugger for the given page. Clients should not assume that the debugging has been
     * enabled until the result for this command is received.
     */
    'Debugger.enable': {
      paramsType: [Protocol.Debugger.EnableRequest?];
      returnType: Protocol.Debugger.EnableResponse;
    };
    /**
     * Evaluates expression on a given call frame.
     */
    'Debugger.evaluateOnCallFrame': {
      paramsType: [Protocol.Debugger.EvaluateOnCallFrameRequest];
      returnType: Protocol.Debugger.EvaluateOnCallFrameResponse;
    };
    /**
     * Returns possible locations for breakpoint. scriptId in start and end range locations should be
     * the same.
     */
    'Debugger.getPossibleBreakpoints': {
      paramsType: [Protocol.Debugger.GetPossibleBreakpointsRequest];
      returnType: Protocol.Debugger.GetPossibleBreakpointsResponse;
    };
    /**
     * Returns source for the script with given id.
     */
    'Debugger.getScriptSource': {
      paramsType: [Protocol.Debugger.GetScriptSourceRequest];
      returnType: Protocol.Debugger.GetScriptSourceResponse;
    };
    'Debugger.disassembleWasmModule': {
      paramsType: [Protocol.Debugger.DisassembleWasmModuleRequest];
      returnType: Protocol.Debugger.DisassembleWasmModuleResponse;
    };
    /**
     * Disassemble the next chunk of lines for the module corresponding to the
     * stream. If disassembly is complete, this API will invalidate the streamId
     * and return an empty chunk. Any subsequent calls for the now invalid stream
     * will return errors.
     */
    'Debugger.nextWasmDisassemblyChunk': {
      paramsType: [Protocol.Debugger.NextWasmDisassemblyChunkRequest];
      returnType: Protocol.Debugger.NextWasmDisassemblyChunkResponse;
    };
    /**
     * This command is deprecated. Use getScriptSource instead.
     */
    'Debugger.getWasmBytecode': {
      paramsType: [Protocol.Debugger.GetWasmBytecodeRequest];
      returnType: Protocol.Debugger.GetWasmBytecodeResponse;
    };
    /**
     * Returns stack trace with given `stackTraceId`.
     */
    'Debugger.getStackTrace': {
      paramsType: [Protocol.Debugger.GetStackTraceRequest];
      returnType: Protocol.Debugger.GetStackTraceResponse;
    };
    /**
     * Stops on the next JavaScript statement.
     */
    'Debugger.pause': {
      paramsType: [];
      returnType: void;
    };
    'Debugger.pauseOnAsyncCall': {
      paramsType: [Protocol.Debugger.PauseOnAsyncCallRequest];
      returnType: void;
    };
    /**
     * Removes JavaScript breakpoint.
     */
    'Debugger.removeBreakpoint': {
      paramsType: [Protocol.Debugger.RemoveBreakpointRequest];
      returnType: void;
    };
    /**
     * Restarts particular call frame from the beginning. The old, deprecated
     * behavior of `restartFrame` is to stay paused and allow further CDP commands
     * after a restart was scheduled. This can cause problems with restarting, so
     * we now continue execution immediatly after it has been scheduled until we
     * reach the beginning of the restarted frame.
     *
     * To stay back-wards compatible, `restartFrame` now expects a `mode`
     * parameter to be present. If the `mode` parameter is missing, `restartFrame`
     * errors out.
     *
     * The various return values are deprecated and `callFrames` is always empty.
     * Use the call frames from the `Debugger#paused` events instead, that fires
     * once V8 pauses at the beginning of the restarted function.
     */
    'Debugger.restartFrame': {
      paramsType: [Protocol.Debugger.RestartFrameRequest];
      returnType: Protocol.Debugger.RestartFrameResponse;
    };
    /**
     * Resumes JavaScript execution.
     */
    'Debugger.resume': {
      paramsType: [Protocol.Debugger.ResumeRequest?];
      returnType: void;
    };
    /**
     * Searches for given string in script content.
     */
    'Debugger.searchInContent': {
      paramsType: [Protocol.Debugger.SearchInContentRequest];
      returnType: Protocol.Debugger.SearchInContentResponse;
    };
    /**
     * Enables or disables async call stacks tracking.
     */
    'Debugger.setAsyncCallStackDepth': {
      paramsType: [Protocol.Debugger.SetAsyncCallStackDepthRequest];
      returnType: void;
    };
    /**
     * Replace previous blackbox execution contexts with passed ones. Forces backend to skip
     * stepping/pausing in scripts in these execution contexts. VM will try to leave blackboxed script by
     * performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
     */
    'Debugger.setBlackboxExecutionContexts': {
      paramsType: [Protocol.Debugger.SetBlackboxExecutionContextsRequest];
      returnType: void;
    };
    /**
     * Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in
     * scripts with url matching one of the patterns. VM will try to leave blackboxed script by
     * performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
     */
    'Debugger.setBlackboxPatterns': {
      paramsType: [Protocol.Debugger.SetBlackboxPatternsRequest];
      returnType: void;
    };
    /**
     * Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted
     * scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
     * Positions array contains positions where blackbox state is changed. First interval isn't
     * blackboxed. Array should be sorted.
     */
    'Debugger.setBlackboxedRanges': {
      paramsType: [Protocol.Debugger.SetBlackboxedRangesRequest];
      returnType: void;
    };
    /**
     * Sets JavaScript breakpoint at a given location.
     */
    'Debugger.setBreakpoint': {
      paramsType: [Protocol.Debugger.SetBreakpointRequest];
      returnType: Protocol.Debugger.SetBreakpointResponse;
    };
    /**
     * Sets instrumentation breakpoint.
     */
    'Debugger.setInstrumentationBreakpoint': {
      paramsType: [Protocol.Debugger.SetInstrumentationBreakpointRequest];
      returnType: Protocol.Debugger.SetInstrumentationBreakpointResponse;
    };
    /**
     * Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this
     * command is issued, all existing parsed scripts will have breakpoints resolved and returned in
     * `locations` property. Further matching script parsing will result in subsequent
     * `breakpointResolved` events issued. This logical breakpoint will survive page reloads.
     */
    'Debugger.setBreakpointByUrl': {
      paramsType: [Protocol.Debugger.SetBreakpointByUrlRequest];
      returnType: Protocol.Debugger.SetBreakpointByUrlResponse;
    };
    /**
     * Sets JavaScript breakpoint before each call to the given function.
     * If another function was created from the same source as a given one,
     * calling it will also trigger the breakpoint.
     */
    'Debugger.setBreakpointOnFunctionCall': {
      paramsType: [Protocol.Debugger.SetBreakpointOnFunctionCallRequest];
      returnType: Protocol.Debugger.SetBreakpointOnFunctionCallResponse;
    };
    /**
     * Activates / deactivates all breakpoints on the page.
     */
    'Debugger.setBreakpointsActive': {
      paramsType: [Protocol.Debugger.SetBreakpointsActiveRequest];
      returnType: void;
    };
    /**
     * Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions,
     * or caught exceptions, no exceptions. Initial pause on exceptions state is `none`.
     */
    'Debugger.setPauseOnExceptions': {
      paramsType: [Protocol.Debugger.SetPauseOnExceptionsRequest];
      returnType: void;
    };
    /**
     * Changes return value in top frame. Available only at return break position.
     */
    'Debugger.setReturnValue': {
      paramsType: [Protocol.Debugger.SetReturnValueRequest];
      returnType: void;
    };
    /**
     * Edits JavaScript source live.
     *
     * In general, functions that are currently on the stack can not be edited with
     * a single exception: If the edited function is the top-most stack frame and
     * that is the only activation of that function on the stack. In this case
     * the live edit will be successful and a `Debugger.restartFrame` for the
     * top-most function is automatically triggered.
     */
    'Debugger.setScriptSource': {
      paramsType: [Protocol.Debugger.SetScriptSourceRequest];
      returnType: Protocol.Debugger.SetScriptSourceResponse;
    };
    /**
     * Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
     */
    'Debugger.setSkipAllPauses': {
      paramsType: [Protocol.Debugger.SetSkipAllPausesRequest];
      returnType: void;
    };
    /**
     * Changes value of variable in a callframe. Object-based scopes are not supported and must be
     * mutated manually.
     */
    'Debugger.setVariableValue': {
      paramsType: [Protocol.Debugger.SetVariableValueRequest];
      returnType: void;
    };
    /**
     * Steps into the function call.
     */
    'Debugger.stepInto': {
      paramsType: [Protocol.Debugger.StepIntoRequest?];
      returnType: void;
    };
    /**
     * Steps out of the function call.
     */
    'Debugger.stepOut': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Steps over the statement.
     */
    'Debugger.stepOver': {
      paramsType: [Protocol.Debugger.StepOverRequest?];
      returnType: void;
    };
    /**
     * Enables console to refer to the node with given id via $x (see Command Line API for more details
     * $x functions).
     */
    'HeapProfiler.addInspectedHeapObject': {
      paramsType: [Protocol.HeapProfiler.AddInspectedHeapObjectRequest];
      returnType: void;
    };
    'HeapProfiler.collectGarbage': {
      paramsType: [];
      returnType: void;
    };
    'HeapProfiler.disable': {
      paramsType: [];
      returnType: void;
    };
    'HeapProfiler.enable': {
      paramsType: [];
      returnType: void;
    };
    'HeapProfiler.getHeapObjectId': {
      paramsType: [Protocol.HeapProfiler.GetHeapObjectIdRequest];
      returnType: Protocol.HeapProfiler.GetHeapObjectIdResponse;
    };
    'HeapProfiler.getObjectByHeapObjectId': {
      paramsType: [Protocol.HeapProfiler.GetObjectByHeapObjectIdRequest];
      returnType: Protocol.HeapProfiler.GetObjectByHeapObjectIdResponse;
    };
    'HeapProfiler.getSamplingProfile': {
      paramsType: [];
      returnType: Protocol.HeapProfiler.GetSamplingProfileResponse;
    };
    'HeapProfiler.startSampling': {
      paramsType: [Protocol.HeapProfiler.StartSamplingRequest?];
      returnType: void;
    };
    'HeapProfiler.startTrackingHeapObjects': {
      paramsType: [Protocol.HeapProfiler.StartTrackingHeapObjectsRequest?];
      returnType: void;
    };
    'HeapProfiler.stopSampling': {
      paramsType: [];
      returnType: Protocol.HeapProfiler.StopSamplingResponse;
    };
    'HeapProfiler.stopTrackingHeapObjects': {
      paramsType: [Protocol.HeapProfiler.StopTrackingHeapObjectsRequest?];
      returnType: void;
    };
    'HeapProfiler.takeHeapSnapshot': {
      paramsType: [Protocol.HeapProfiler.TakeHeapSnapshotRequest?];
      returnType: void;
    };
    'Profiler.disable': {
      paramsType: [];
      returnType: void;
    };
    'Profiler.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Collect coverage data for the current isolate. The coverage data may be incomplete due to
     * garbage collection.
     */
    'Profiler.getBestEffortCoverage': {
      paramsType: [];
      returnType: Protocol.Profiler.GetBestEffortCoverageResponse;
    };
    /**
     * Changes CPU profiler sampling interval. Must be called before CPU profiles recording started.
     */
    'Profiler.setSamplingInterval': {
      paramsType: [Protocol.Profiler.SetSamplingIntervalRequest];
      returnType: void;
    };
    'Profiler.start': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enable precise code coverage. Coverage data for JavaScript executed before enabling precise code
     * coverage may be incomplete. Enabling prevents running optimized code and resets execution
     * counters.
     */
    'Profiler.startPreciseCoverage': {
      paramsType: [Protocol.Profiler.StartPreciseCoverageRequest?];
      returnType: Protocol.Profiler.StartPreciseCoverageResponse;
    };
    'Profiler.stop': {
      paramsType: [];
      returnType: Protocol.Profiler.StopResponse;
    };
    /**
     * Disable precise code coverage. Disabling releases unnecessary execution count records and allows
     * executing optimized code.
     */
    'Profiler.stopPreciseCoverage': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Collect coverage data for the current isolate, and resets execution counters. Precise code
     * coverage needs to have started.
     */
    'Profiler.takePreciseCoverage': {
      paramsType: [];
      returnType: Protocol.Profiler.TakePreciseCoverageResponse;
    };
    /**
     * Add handler to promise with given promise object id.
     */
    'Runtime.awaitPromise': {
      paramsType: [Protocol.Runtime.AwaitPromiseRequest];
      returnType: Protocol.Runtime.AwaitPromiseResponse;
    };
    /**
     * Calls function with given declaration on the given object. Object group of the result is
     * inherited from the target object.
     */
    'Runtime.callFunctionOn': {
      paramsType: [Protocol.Runtime.CallFunctionOnRequest];
      returnType: Protocol.Runtime.CallFunctionOnResponse;
    };
    /**
     * Compiles expression.
     */
    'Runtime.compileScript': {
      paramsType: [Protocol.Runtime.CompileScriptRequest];
      returnType: Protocol.Runtime.CompileScriptResponse;
    };
    /**
     * Disables reporting of execution contexts creation.
     */
    'Runtime.disable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Discards collected exceptions and console API calls.
     */
    'Runtime.discardConsoleEntries': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Enables reporting of execution contexts creation by means of `executionContextCreated` event.
     * When the reporting gets enabled the event will be sent immediately for each existing execution
     * context.
     */
    'Runtime.enable': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Evaluates expression on global object.
     */
    'Runtime.evaluate': {
      paramsType: [Protocol.Runtime.EvaluateRequest];
      returnType: Protocol.Runtime.EvaluateResponse;
    };
    /**
     * Returns the isolate id.
     */
    'Runtime.getIsolateId': {
      paramsType: [];
      returnType: Protocol.Runtime.GetIsolateIdResponse;
    };
    /**
     * Returns the JavaScript heap usage.
     * It is the total usage of the corresponding isolate not scoped to a particular Runtime.
     */
    'Runtime.getHeapUsage': {
      paramsType: [];
      returnType: Protocol.Runtime.GetHeapUsageResponse;
    };
    /**
     * Returns properties of a given object. Object group of the result is inherited from the target
     * object.
     */
    'Runtime.getProperties': {
      paramsType: [Protocol.Runtime.GetPropertiesRequest];
      returnType: Protocol.Runtime.GetPropertiesResponse;
    };
    /**
     * Returns all let, const and class variables from global scope.
     */
    'Runtime.globalLexicalScopeNames': {
      paramsType: [Protocol.Runtime.GlobalLexicalScopeNamesRequest?];
      returnType: Protocol.Runtime.GlobalLexicalScopeNamesResponse;
    };
    'Runtime.queryObjects': {
      paramsType: [Protocol.Runtime.QueryObjectsRequest];
      returnType: Protocol.Runtime.QueryObjectsResponse;
    };
    /**
     * Releases remote object with given id.
     */
    'Runtime.releaseObject': {
      paramsType: [Protocol.Runtime.ReleaseObjectRequest];
      returnType: void;
    };
    /**
     * Releases all remote objects that belong to a given group.
     */
    'Runtime.releaseObjectGroup': {
      paramsType: [Protocol.Runtime.ReleaseObjectGroupRequest];
      returnType: void;
    };
    /**
     * Tells inspected instance to run if it was waiting for debugger to attach.
     */
    'Runtime.runIfWaitingForDebugger': {
      paramsType: [];
      returnType: void;
    };
    /**
     * Runs script with given id in a given context.
     */
    'Runtime.runScript': {
      paramsType: [Protocol.Runtime.RunScriptRequest];
      returnType: Protocol.Runtime.RunScriptResponse;
    };
    /**
     * Enables or disables async call stacks tracking.
     */
    'Runtime.setAsyncCallStackDepth': {
      paramsType: [Protocol.Runtime.SetAsyncCallStackDepthRequest];
      returnType: void;
    };
    'Runtime.setCustomObjectFormatterEnabled': {
      paramsType: [Protocol.Runtime.SetCustomObjectFormatterEnabledRequest];
      returnType: void;
    };
    'Runtime.setMaxCallStackSizeToCapture': {
      paramsType: [Protocol.Runtime.SetMaxCallStackSizeToCaptureRequest];
      returnType: void;
    };
    /**
     * Terminate current or next JavaScript execution.
     * Will cancel the termination when the outer-most script execution ends.
     */
    'Runtime.terminateExecution': {
      paramsType: [];
      returnType: void;
    };
    /**
     * If executionContextId is empty, adds binding with the given name on the
     * global objects of all inspected contexts, including those created later,
     * bindings survive reloads.
     * Binding function takes exactly one argument, this argument should be string,
     * in case of any other input, function throws an exception.
     * Each binding function call produces Runtime.bindingCalled notification.
     */
    'Runtime.addBinding': {
      paramsType: [Protocol.Runtime.AddBindingRequest];
      returnType: void;
    };
    /**
     * This method does not remove binding function from global object but
     * unsubscribes current runtime agent from Runtime.bindingCalled notifications.
     */
    'Runtime.removeBinding': {
      paramsType: [Protocol.Runtime.RemoveBindingRequest];
      returnType: void;
    };
    /**
     * This method tries to lookup and populate exception details for a
     * JavaScript Error object.
     * Note that the stackTrace portion of the resulting exceptionDetails will
     * only be populated if the Runtime domain was enabled at the time when the
     * Error was thrown.
     */
    'Runtime.getExceptionDetails': {
      paramsType: [Protocol.Runtime.GetExceptionDetailsRequest];
      returnType: Protocol.Runtime.GetExceptionDetailsResponse;
    };
    /**
     * Returns supported domains.
     */
    'Schema.getDomains': {
      paramsType: [];
      returnType: Protocol.Schema.GetDomainsResponse;
    };
  }
}

export default ProtocolMapping;
