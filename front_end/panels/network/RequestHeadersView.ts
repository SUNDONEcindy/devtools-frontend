// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable @devtools/no-lit-render-outside-of-view */
import '../../ui/kit/kit.js';

import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Persistence from '../../models/persistence/persistence.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as NetworkForward from '../../panels/network/forward/forward.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as Input from '../../ui/components/input/input.js';
import * as LegacyWrapper from '../../ui/components/legacy_wrapper/legacy_wrapper.js';
import * as RenderCoordinator from '../../ui/components/render_coordinator/render_coordinator.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as Sources from '../sources/sources.js';

import * as NetworkComponents from './components/components.js';

const RAW_HEADER_CUTOFF = 3000;
const {render, html} = Lit;

const UIStrings = {
  /**
   * @description Text in Request Headers View of the Network panel
   */
  fromDiskCache: '(from disk cache)',
  /**
   * @description Text in Request Headers View of the Network panel
   */
  fromMemoryCache: '(from memory cache)',
  /**
   * @description Text in Request Headers View of the Network panel
   */
  fromEarlyHints: '(from early hints)',
  /**
   * @description Text in Request Headers View of the Network panel
   */
  fromPrefetchCache: '(from prefetch cache)',
  /**
   * @description Text in Request Headers View of the Network panel
   */
  fromServiceWorker: '(from `service worker`)',
  /**
   * @description Text in Request Headers View of the Network panel
   */
  fromSignedexchange: '(from signed-exchange)',
  /**
   * @description Section header for a list of the main aspects of a http request
   */
  general: 'General',
  /**
   * @description Label for a checkbox to switch between raw and parsed headers
   */
  raw: 'Raw',
  /**
   * @description Text in Request Headers View of the Network panel
   */
  referrerPolicy: 'Referrer Policy',
  /**
   * @description Text in Network Log View Columns of the Network panel
   */
  remoteAddress: 'Remote Address',
  /**
   * @description Text in Request Headers View of the Network panel
   */
  requestHeaders: 'Request Headers',
  /**
   * @description The HTTP method of a request
   */
  requestMethod: 'Request Method',
  /**
   * @description The URL of a request
   */
  requestUrl: 'Request URL',
  /**
   * @description A context menu item in the Network Log View Columns of the Network panel
   */
  responseHeaders: 'Response headers',
  /**
   * @description A context menu item in the Network Log View Columns of the Network panel
   */
  earlyHintsHeaders: 'Early hints headers',
  /**
   * @description Title text for a link to the Sources panel to the file containing the header override definitions
   */
  revealHeaderOverrides: 'Reveal header override definitions',
  /**
   * @description Text to show more content
   */
  showMore: 'Show more',
  /**
   * @description HTTP response code
   */
  statusCode: 'Status Code',
} as const;
const str_ = i18n.i18n.registerUIStrings('panels/network/RequestHeadersView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);

export class RequestHeadersView extends LegacyWrapper.LegacyWrapper.WrappableComponent {
  #request: Readonly<SDK.NetworkRequest.NetworkRequest>;
  readonly #shadow = this.attachShadow({mode: 'open'});
  #showResponseHeadersText = false;
  #showRequestHeadersText = false;
  #showResponseHeadersTextFull = false;
  #showRequestHeadersTextFull = false;
  #toReveal?: {section: NetworkForward.UIRequestLocation.UIHeaderSection, header?: string} = undefined;
  readonly #workspace = Workspace.Workspace.WorkspaceImpl.instance();

  constructor(request: SDK.NetworkRequest.NetworkRequest) {
    super();
    this.#request = request;
    this.setAttribute('jslog', `${VisualLogging.pane('headers').track({resize: true})}`);
  }

  override wasShown(): void {
    super.wasShown();
    this.#request.addEventListener(SDK.NetworkRequest.Events.REMOTE_ADDRESS_CHANGED, this.#refreshHeadersView, this);
    this.#request.addEventListener(SDK.NetworkRequest.Events.FINISHED_LOADING, this.#refreshHeadersView, this);
    this.#request.addEventListener(SDK.NetworkRequest.Events.REQUEST_HEADERS_CHANGED, this.#refreshHeadersView, this);
    this.#request.addEventListener(
        SDK.NetworkRequest.Events.RESPONSE_HEADERS_CHANGED, this.#resetAndRefreshHeadersView, this);
    this.#toReveal = undefined;
    this.#refreshHeadersView();
  }

  override willHide(): void {
    super.willHide();
    this.#request.removeEventListener(SDK.NetworkRequest.Events.REMOTE_ADDRESS_CHANGED, this.#refreshHeadersView, this);
    this.#request.removeEventListener(SDK.NetworkRequest.Events.FINISHED_LOADING, this.#refreshHeadersView, this);
    this.#request.removeEventListener(
        SDK.NetworkRequest.Events.REQUEST_HEADERS_CHANGED, this.#refreshHeadersView, this);
    this.#request.removeEventListener(
        SDK.NetworkRequest.Events.RESPONSE_HEADERS_CHANGED, this.#resetAndRefreshHeadersView, this);
  }

  #resetAndRefreshHeadersView(): void {
    this.#request.deleteAssociatedData(NetworkComponents.ResponseHeaderSection.RESPONSE_HEADER_SECTION_DATA_KEY);
    void this.render();
  }

  #refreshHeadersView(): void {
    void this.render();
  }

  revealHeader(section: NetworkForward.UIRequestLocation.UIHeaderSection, header?: string): void {
    this.#toReveal = {section, header};
    void this.render();
  }

  connectedCallback(): void {
    this.#workspace.addEventListener(
        Workspace.Workspace.Events.UISourceCodeAdded, this.#uiSourceCodeAddedOrRemoved, this);
    this.#workspace.addEventListener(
        Workspace.Workspace.Events.UISourceCodeRemoved, this.#uiSourceCodeAddedOrRemoved, this);
    Common.Settings.Settings.instance()
        .moduleSetting('persistence-network-overrides-enabled')
        .addChangeListener(this.render, this);
  }

  disconnectedCallback(): void {
    this.#workspace.removeEventListener(
        Workspace.Workspace.Events.UISourceCodeAdded, this.#uiSourceCodeAddedOrRemoved, this);
    this.#workspace.removeEventListener(
        Workspace.Workspace.Events.UISourceCodeRemoved, this.#uiSourceCodeAddedOrRemoved, this);
    Common.Settings.Settings.instance()
        .moduleSetting('persistence-network-overrides-enabled')
        .removeChangeListener(this.render, this);
  }

  #uiSourceCodeAddedOrRemoved(event: Common.EventTarget.EventTargetEvent<Workspace.UISourceCode.UISourceCode>): void {
    if (this.#getHeaderOverridesFileUrl() === event.data.url()) {
      void this.render();
    }
  }

  override async render(): Promise<void> {
    if (!this.#request) {
      return;
    }

    return await RenderCoordinator.write(() => {
      // Disabled until https://crbug.com/1079231 is fixed.
      // clang-format off
      render(html`
        <style>${NetworkComponents.RequestHeaderSection.requestHeadersViewStyles}</style>
        <style>${Input.checkboxStyles}</style>
        ${this.#renderGeneralSection()}
        ${this.#renderEarlyHintsHeaders()}
        ${this.#renderResponseHeaders()}
        ${this.#renderRequestHeaders()}
      `, this.#shadow, {host: this});

      // clang-format on
    });
  }

  #renderEarlyHintsHeaders(): Lit.LitTemplate {
    if (!this.#request || !this.#request.earlyHintsHeaders || this.#request.earlyHintsHeaders.length === 0) {
      return Lit.nothing;
    }

    const toggleShowRaw = (): void => {
      this.#showResponseHeadersText = !this.#showResponseHeadersText;
      void this.render();
    };

    // Disabled until https://crbug.com/1079231 is fixed.
    return renderCategory({
      onToggleRawHeaders: toggleShowRaw,
      name: 'early-hints-headers',
      title: i18nString(UIStrings.earlyHintsHeaders),
      headerCount: this.#request.earlyHintsHeaders.length,
      checked: undefined,
      additionalContent: undefined,
      forceOpen: this.#toReveal?.section === NetworkForward.UIRequestLocation.UIHeaderSection.EARLY_HINTS,
      loggingContext: 'early-hints-headers',
      contents: this.#showResponseHeadersText ? this.#renderRawHeaders(this.#request.responseHeadersText, true) : html`
          <devtools-early-hints-header-section .data=${{
        request: this.#request,
        toReveal: this.#toReveal,
      } as NetworkComponents.ResponseHeaderSection.ResponseHeaderSectionData}></devtools-early-hints-header-section>
        `
    });
  }

  #renderResponseHeaders(): Lit.LitTemplate {
    if (!this.#request) {
      return Lit.nothing;
    }

    const toggleShowRaw = (): void => {
      this.#showResponseHeadersText = !this.#showResponseHeadersText;
      void this.render();
    };

    return renderCategory({
      onToggleRawHeaders: toggleShowRaw,
      name: 'response-headers',
      title: i18nString(UIStrings.responseHeaders),
      headerCount: this.#request.sortedResponseHeaders.length,
      checked: this.#request.responseHeadersText ? this.#showResponseHeadersText : undefined,
      additionalContent: this.#renderHeaderOverridesLink(),
      forceOpen: this.#toReveal?.section === NetworkForward.UIRequestLocation.UIHeaderSection.RESPONSE,
      loggingContext: 'response-headers',
      contents: this.#showResponseHeadersText ?
          this.#renderRawHeaders(this.#request.responseHeadersText, true) :
          html`
          <devtools-response-header-section .data=${{
            request: this.#request,
            toReveal: this.#toReveal,
          } as NetworkComponents.ResponseHeaderSection.ResponseHeaderSectionData} jslog=${
              VisualLogging.section('response-headers')}></devtools-response-header-section>
        `
    });
  }

  #renderHeaderOverridesLink(): Lit.LitTemplate {
    if (!this.#workspace.uiSourceCodeForURL(this.#getHeaderOverridesFileUrl())) {
      return Lit.nothing;
    }

    const overridesSetting: Common.Settings.Setting<boolean> =
        Common.Settings.Settings.instance().moduleSetting('persistence-network-overrides-enabled');
    // Disabled until https://crbug.com/1079231 is fixed.
    // clang-format off
    const fileIcon = html`
      <devtools-icon name="document" class=${'medium' + overridesSetting.get() ? 'inline-icon dot purple': 'inline-icon'}>
      </devtools-icon>`;
    // clang-format on

    const revealHeadersFile = (event: Event): void => {
      event.preventDefault();
      const uiSourceCode = this.#workspace.uiSourceCodeForURL(this.#getHeaderOverridesFileUrl());
      if (uiSourceCode) {
        Sources.SourcesPanel.SourcesPanel.instance().showUISourceCode(uiSourceCode);
        void Sources.SourcesPanel.SourcesPanel.instance().revealInNavigator(uiSourceCode);
      }
    };

    // Disabled until https://crbug.com/1079231 is fixed.
    // clang-format off
    return html`
      <devtools-link
          href="https://goo.gle/devtools-override"
          class="link devtools-link"
          jslogcontext="devtools-override"
      >
        <devtools-icon name="help" class="inline-icon medium">
        </devtools-icon>
      </devtools-link>
      <devtools-link
          @click=${revealHeadersFile}
          class="link devtools-link"
          title=${UIStrings.revealHeaderOverrides}
          jslogcontext="reveal-header-overrides"
      >
        ${fileIcon}${Persistence.NetworkPersistenceManager.HEADERS_FILENAME}
      </devtools-link>
    `;
    // clang-format on
  }

  #getHeaderOverridesFileUrl(): Platform.DevToolsPath.UrlString {
    if (!this.#request) {
      return Platform.DevToolsPath.EmptyUrlString;
    }
    const fileUrl = Persistence.NetworkPersistenceManager.NetworkPersistenceManager.instance().fileUrlFromNetworkUrl(
        this.#request.url(), /* ignoreInactive */ true);
    return fileUrl.substring(0, fileUrl.lastIndexOf('/')) + '/' +
        Persistence.NetworkPersistenceManager.HEADERS_FILENAME as Platform.DevToolsPath.UrlString;
  }

  #renderRequestHeaders(): Lit.LitTemplate {
    if (!this.#request) {
      return Lit.nothing;
    }
    const requestHeadersText = this.#request.requestHeadersText();

    const toggleShowRaw = (): void => {
      this.#showRequestHeadersText = !this.#showRequestHeadersText;
      void this.render();
    };

    return renderCategory({
      onToggleRawHeaders: toggleShowRaw,
      name: 'request-headers',
      title: i18nString(UIStrings.requestHeaders),
      headerCount: this.#request.requestHeaders().length,
      checked: requestHeadersText ? this.#showRequestHeadersText : undefined,
      forceOpen: this.#toReveal?.section === NetworkForward.UIRequestLocation.UIHeaderSection.REQUEST,
      loggingContext: 'request-headers',
      contents: (this.#showRequestHeadersText && requestHeadersText) ?
          this.#renderRawHeaders(requestHeadersText, false) :
          html`
          <devtools-widget .widgetConfig=${
              UI.Widget.widgetConfig(NetworkComponents.RequestHeaderSection.RequestHeaderSection, {
                request: this.#request,
                toReveal: this.#toReveal,
              })} jslog=${VisualLogging.section('request-headers')}></devtools-widget>`
    });
  }

  #renderRawHeaders(rawHeadersText: string, forResponseHeaders: boolean): Lit.TemplateResult {
    const trimmed = rawHeadersText.trim();
    const showFull = forResponseHeaders ? this.#showResponseHeadersTextFull : this.#showRequestHeadersTextFull;
    const isShortened = !showFull && trimmed.length > RAW_HEADER_CUTOFF;

    const showMore = (): void => {
      if (forResponseHeaders) {
        this.#showResponseHeadersTextFull = true;
      } else {
        this.#showRequestHeadersTextFull = true;
      }
      void this.render();
    };

    const onContextMenuOpen = (event: Event): void => {
      const showFull = forResponseHeaders ? this.#showResponseHeadersTextFull : this.#showRequestHeadersTextFull;
      if (!showFull) {
        const contextMenu = new UI.ContextMenu.ContextMenu(event);
        const section = contextMenu.newSection();
        section.appendItem(i18nString(UIStrings.showMore), showMore, {jslogContext: 'show-more'});
        void contextMenu.show();
      }
    };

    // Disabled until https://crbug.com/1079231 is fixed.
    // clang-format off
    return html`
      <div
        class="row raw-headers-row"
        @contextmenu=${(event: Event) => {
          if (isShortened) {
            onContextMenuOpen(event);
          }
        }}
      >
        <div class="raw-headers">
          ${isShortened ? trimmed.substring(0, RAW_HEADER_CUTOFF) : trimmed}
        </div>
        ${isShortened
          ? html`
              <devtools-button
                .size=${Buttons.Button.Size.SMALL}
                .variant=${Buttons.Button.Variant.OUTLINED}
                @click=${showMore}
                jslog=${VisualLogging.action('raw-headers-show-more').track({
                  click: true,
                })}
                >${i18nString(UIStrings.showMore)}</devtools-button
              >
            `
          : Lit.nothing}
      </div>
    `;
    // clang-format on
  }

  #renderGeneralSection(): Lit.LitTemplate {
    if (!this.#request) {
      return Lit.nothing;
    }

    const statusClasses = ['status'];
    if (this.#request.statusCode < 300 || this.#request.statusCode === 304) {
      statusClasses.push('green-circle');
    } else if (this.#request.statusCode < 400) {
      statusClasses.push('yellow-circle');
    } else {
      statusClasses.push('red-circle');
    }

    let comment = '';
    if (this.#request.cachedInMemory()) {
      comment = i18nString(UIStrings.fromMemoryCache);
    } else if (this.#request.fromEarlyHints()) {
      comment = i18nString(UIStrings.fromEarlyHints);
    } else if (this.#request.fetchedViaServiceWorker) {
      comment = i18nString(UIStrings.fromServiceWorker);
    } else if (this.#request.redirectSourceSignedExchangeInfoHasNoErrors()) {
      comment = i18nString(UIStrings.fromSignedexchange);
    } else if (this.#request.fromPrefetchCache()) {
      comment = i18nString(UIStrings.fromPrefetchCache);
    } else if (this.#request.cached()) {
      comment = i18nString(UIStrings.fromDiskCache);
    }

    if (comment) {
      statusClasses.push('status-with-comment');
    }

    const statusText = [this.#request.statusCode, this.#request.getInferredStatusText(), comment].join(' ');

    return renderCategory({
      name: 'general',
      title: i18nString(UIStrings.general),
      forceOpen: this.#toReveal?.section === NetworkForward.UIRequestLocation.UIHeaderSection.GENERAL,
      loggingContext: 'general',
      // clang-format off
          contents: html`<div jslog=${VisualLogging.section('general')}>
        ${this.#renderGeneralRow(i18nString(UIStrings.requestUrl), this.#request.url(), 'request-url')}
        ${this.#request.statusCode? this.#renderGeneralRow(i18nString(UIStrings.requestMethod),
            this.#request.requestMethod, 'request-method') : Lit.nothing}
        ${this.#request.statusCode? this.#renderGeneralRow(i18nString(UIStrings.statusCode),
            statusText, 'status-code', statusClasses) : Lit.nothing}
        ${this.#request.remoteAddress()? this.#renderGeneralRow(i18nString(UIStrings.remoteAddress),
            this.#request.remoteAddress(), 'remote-address') : Lit.nothing}
        ${this.#request.referrerPolicy()? this.#renderGeneralRow(i18nString(UIStrings.referrerPolicy),
            String(this.#request.referrerPolicy()), 'referrer-policy') : Lit.nothing}
      </div>`});
    // clang-format on
  }

  #renderGeneralRow(name: Common.UIString.LocalizedString, value: string, id: string, classNames?: string[]):
      Lit.LitTemplate {
    const isHighlighted = this.#toReveal?.section === NetworkForward.UIRequestLocation.UIHeaderSection.GENERAL &&
        name.toLowerCase() === this.#toReveal?.header?.toLowerCase();
    return html`
      <div class="row ${isHighlighted ? 'header-highlight' : ''}">
        <div class="header-name">${name}</div>
        <div
          id=${id}
          class="header-value ${classNames?.join(' ')}"
          @copy=${() => Host.userMetrics.actionTaken(Host.UserMetrics.Action.NetworkPanelCopyValue)}
        >${value}</div>
      </div>
    `;
  }

  getHeaderElementById(id: string): Element|null {
    const categories = this.#shadow.querySelectorAll('devtools-request-headers-category');
    for (const category of categories) {
      const element = category.querySelector(`#${id}`);
      if (element) {
        return element;
      }
    }
    return null;
  }
}

function renderCategory(data: {
  name: string,
  title: Common.UIString.LocalizedString,
  contents: Lit.LitTemplate,
  loggingContext: string,
  headerCount?: number,
  checked?: boolean,
  additionalContent?: Lit.LitTemplate,
  forceOpen?: boolean,
  onToggleRawHeaders?: () => void,
}): Lit.LitTemplate {
  const expandedSetting =
      Common.Settings.Settings.instance().createSetting('request-info-' + data.name + '-category-expanded', true);

  const isOpen = (expandedSetting ? expandedSetting.get() : true) || data.forceOpen;
  // Disabled until https://crbug.com/1079231 is fixed.
  // clang-format off
  return html`
      <details ?open=${isOpen} @toggle=${onToggle} aria-label=${data.title}>
        <summary
          class="header"
          @keydown=${onSummaryKeyDown}
          jslog=${VisualLogging.sectionHeader().track({click: true}).context(data.loggingContext)}
        >
          <div class="header-grid-container">
            <div>
              ${data.title}${data.headerCount !== undefined ?
                html`<span class="header-count"> (${data.headerCount})</span>` :
                Lit.nothing
              }
            </div>
            <div class="hide-when-closed">
              ${data.checked !== undefined ? html`
                <devtools-checkbox .checked=${data.checked} @change=${data.onToggleRawHeaders}
                         jslog=${VisualLogging.toggle('raw-headers').track({change: true})}>
                  ${i18nString(UIStrings.raw)}
              </devtools-checkbox>` : Lit.nothing}
            </div>
            <div class="hide-when-closed">${data.additionalContent}</div>
          </div>
        </summary>
        ${data.contents}
      </details>
    `;
  // clang-format on

  function onSummaryKeyDown(event: KeyboardEvent): void {
    if (!event.target) {
      return;
    }
    const summaryElement = event.target as HTMLElement;
    const detailsElement = summaryElement.parentElement as HTMLDetailsElement;
    if (!detailsElement) {
      throw new Error('<details> element is not found for a <summary> element');
    }
    switch (event.key) {
      case 'ArrowLeft':
        detailsElement.open = false;
        break;
      case 'ArrowRight':
        detailsElement.open = true;
        break;
    }
  }

  function onToggle(event: Event): void {
    expandedSetting?.set((event.target as HTMLDetailsElement).open);
  }
}

customElements.define('devtools-request-headers', RequestHeadersView);

declare global {
  interface HTMLElementTagNameMap {
    'devtools-request-headers': RequestHeadersView;
  }
}
