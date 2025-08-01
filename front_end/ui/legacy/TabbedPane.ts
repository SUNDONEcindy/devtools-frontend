/*
 * Copyright (C) 2010 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* eslint-disable rulesdir/no-imperative-dom-api */

import './Toolbar.js';

import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as IconButton from '../components/icon_button/icon_button.js';

import * as ARIAUtils from './ARIAUtils.js';
import {ContextMenu} from './ContextMenu.js';
import {Constraints, Size} from './Geometry.js';
import tabbedPaneStyles from './tabbedPane.css.js';
import type {Toolbar} from './Toolbar.js';
import {Tooltip} from './Tooltip.js';
import {installDragHandle, invokeOnceAfterBatchUpdate} from './UIUtils.js';
import {VBox, type Widget} from './Widget.js';
import {Events as ZoomManagerEvents, ZoomManager} from './ZoomManager.js';

const UIStrings = {
  /**
   *@description The aria label for the button to open more tabs at the right tabbed pane in Elements tools
   */
  moreTabs: 'More tabs',
  /**
   *@description Text in Tabbed Pane
   *@example {tab} PH1
   */
  closeS: 'Close {PH1}',
  /**
   *@description Text to close something
   */
  close: 'Close',
  /**
   *@description Text on a menu option to close other drawers when right click on a drawer title
   */
  closeOthers: 'Close others',
  /**
   *@description Text on a menu option to close the drawer to the right when right click on a drawer title
   */
  closeTabsToTheRight: 'Close tabs to the right',
  /**
   *@description Text on a menu option to close all the drawers except Console when right click on a drawer title
   */
  closeAll: 'Close all',
  /**
   *@description Indicates that a tab contains a preview feature (i.e., a beta / experimental feature).
   */
  previewFeature: 'Preview feature',
  /**
   * @description Text to move a tab forwar.
   */
  moveTabRight: 'Move right',
  /**
   * @description Text to move a tab backward.
   */
  moveTabLeft: 'Move left',
} as const;
const str_ = i18n.i18n.registerUIStrings('ui/legacy/TabbedPane.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class TabbedPane extends Common.ObjectWrapper.eventMixin<EventTypes, typeof VBox>(VBox) {
  private readonly headerElementInternal: HTMLElement;
  private readonly headerContentsElement: HTMLElement;
  tabSlider: HTMLDivElement;
  readonly tabsElement: HTMLElement;
  private readonly contentElementInternal: HTMLElement;
  private tabs: TabbedPaneTab[];
  private readonly tabsHistory: TabbedPaneTab[];
  tabsById: Map<string, TabbedPaneTab>;
  private currentTabLocked: boolean;
  private autoSelectFirstItemOnShow: boolean;
  private triggerDropDownTimeout: number|null;
  private dropDownButton: HTMLDivElement;
  private currentDevicePixelRatio: number;
  private shrinkableTabs?: boolean;
  private verticalTabLayout?: boolean;
  private closeableTabs?: boolean;
  private delegate?: TabbedPaneTabDelegate;
  private currentTab?: TabbedPaneTab;
  private sliderEnabled?: boolean;
  private placeholderElement?: Element;
  private focusedPlaceholderElement?: Element;
  private placeholderContainerElement?: HTMLElement;
  private lastSelectedOverflowTab?: TabbedPaneTab;
  private measuredDropDownButtonWidth?: number;
  private leftToolbarInternal?: Toolbar;
  private rightToolbarInternal?: Toolbar;
  allowTabReorder?: boolean;
  private automaticReorder?: boolean;

  constructor(element?: HTMLElement) {
    super(element, {useShadowDom: true});
    this.registerRequiredCSS(tabbedPaneStyles);
    this.element.classList.add('tabbed-pane');
    this.contentElement.classList.add('tabbed-pane-shadow');
    this.contentElement.tabIndex = -1;
    this.setDefaultFocusedElement(this.contentElement);
    this.headerElementInternal = this.contentElement.createChild('div', 'tabbed-pane-header');
    this.headerContentsElement = this.headerElementInternal.createChild('div', 'tabbed-pane-header-contents');
    this.tabSlider = document.createElement('div');
    this.tabSlider.classList.add('tabbed-pane-tab-slider');
    this.tabsElement = this.headerContentsElement.createChild('div', 'tabbed-pane-header-tabs');
    this.tabsElement.setAttribute('role', 'tablist');
    this.tabsElement.addEventListener('keydown', this.keyDown.bind(this), false);
    this.contentElementInternal = this.contentElement.createChild('div', 'tabbed-pane-content');
    this.contentElementInternal.createChild('slot');
    this.tabs = [];
    this.tabsHistory = [];
    this.tabsById = new Map();
    this.currentTabLocked = false;
    this.autoSelectFirstItemOnShow = true;

    this.triggerDropDownTimeout = null;
    this.dropDownButton = this.createDropDownButton();
    this.currentDevicePixelRatio = window.devicePixelRatio;
    ZoomManager.instance().addEventListener(ZoomManagerEvents.ZOOM_CHANGED, this.zoomChanged, this);
    this.makeTabSlider();
  }

  setAccessibleName(name: string): void {
    ARIAUtils.setLabel(this.tabsElement, name);
  }

  setCurrentTabLocked(locked: boolean): void {
    this.currentTabLocked = locked;
    this.headerElementInternal.classList.toggle('locked', this.currentTabLocked);
  }

  setAutoSelectFirstItemOnShow(autoSelect: boolean): void {
    this.autoSelectFirstItemOnShow = autoSelect;
  }

  get visibleView(): Widget|null {
    return this.currentTab ? this.currentTab.view : null;
  }

  tabIds(): string[] {
    return this.tabs.map(tab => tab.id);
  }

  tabIndex(tabId: string): number {
    return this.tabs.findIndex(tab => tab.id === tabId);
  }

  tabViews(): Widget[] {
    return this.tabs.map(tab => tab.view);
  }

  tabView(tabId: string): Widget|null {
    const tab = this.tabsById.get(tabId);
    return tab ? tab.view : null;
  }

  get selectedTabId(): string|null {
    return this.currentTab ? this.currentTab.id : null;
  }

  setShrinkableTabs(shrinkableTabs: boolean): void {
    this.shrinkableTabs = shrinkableTabs;
  }

  makeVerticalTabLayout(): void {
    this.verticalTabLayout = true;
    this.setTabSlider(false);
    this.contentElement.classList.add('vertical-tab-layout');
    this.invalidateConstraints();
  }

  setCloseableTabs(closeableTabs: boolean): void {
    this.closeableTabs = closeableTabs;
  }

  override focus(): void {
    if (this.visibleView) {
      this.visibleView.focus();
    } else {
      this.contentElement.focus();
    }
  }

  focusSelectedTabHeader(): void {
    const selectedTab = this.currentTab;
    if (selectedTab) {
      selectedTab.tabElement.focus();
    }
  }

  headerElement(): Element {
    return this.headerElementInternal;
  }

  tabbedPaneContentElement(): Element {
    return this.contentElementInternal;
  }

  setTabDelegate(delegate: TabbedPaneTabDelegate): void {
    const tabs = this.tabs.slice();
    for (let i = 0; i < tabs.length; ++i) {
      tabs[i].setDelegate(delegate);
    }
    this.delegate = delegate;
  }

  appendTab(
      id: string, tabTitle: string, view: Widget, tabTooltip?: string, userGesture?: boolean, isCloseable?: boolean,
      isPreviewFeature?: boolean, index?: number, jslogContext?: string): void {
    const closeable = typeof isCloseable === 'boolean' ? isCloseable : Boolean(this.closeableTabs);
    const tab =
        new TabbedPaneTab(this, id, tabTitle, closeable, Boolean(isPreviewFeature), view, tabTooltip, jslogContext);
    tab.setDelegate((this.delegate as TabbedPaneTabDelegate));
    console.assert(!this.tabsById.has(id), `Tabbed pane already contains a tab with id '${id}'`);
    this.tabsById.set(id, tab);
    tab.tabElement.tabIndex = -1;
    tab.tabElement.setAttribute(
        'jslog', `${VisualLogging.panelTabHeader().track({click: true, drag: true}).context(tab.jslogContext)}`);
    if (index !== undefined) {
      this.tabs.splice(index, 0, tab);
    } else {
      this.tabs.push(tab);
    }
    this.tabsHistory.push(tab);
    if (this.tabsHistory[0] === tab && this.isShowing()) {
      this.selectTab(tab.id, userGesture);
    }
    this.updateTabElements();
  }

  closeTab(id: string, userGesture?: boolean): void {
    this.closeTabs([id], userGesture);
  }

  closeTabs(ids: string[], userGesture?: boolean): void {
    if (ids.length === 0) {
      return;
    }

    const focused = this.hasFocus();
    for (let i = 0; i < ids.length; ++i) {
      this.innerCloseTab(ids[i], userGesture);
    }
    this.updateTabElements();
    if (this.tabsHistory.length) {
      this.selectTab(this.tabsHistory[0].id, false);
    }
    if (focused) {
      this.focus();
    }
  }

  private innerCloseTab(id: string, userGesture?: boolean): true|undefined {
    const tab = this.tabsById.get(id);
    if (!tab) {
      return;
    }
    if (userGesture && !tab.closeable) {
      return;
    }
    if (this.currentTab && this.currentTab.id === id) {
      this.hideCurrentTab();
    }

    this.tabsById.delete(id);

    this.tabsHistory.splice(this.tabsHistory.indexOf(tab), 1);
    this.tabs.splice(this.tabs.indexOf(tab), 1);
    if (tab.shown) {
      this.hideTabElement(tab);
    }

    const eventData: EventData = {prevTabId: undefined, tabId: id, view: tab.view, isUserGesture: userGesture};
    this.dispatchEventToListeners(Events.TabClosed, eventData);
    return true;
  }

  hasTab(tabId: string): boolean {
    return this.tabsById.has(tabId);
  }

  otherTabs(id: string): string[] {
    const result = [];
    for (let i = 0; i < this.tabs.length; ++i) {
      if (this.tabs[i].id !== id) {
        result.push(this.tabs[i].id);
      }
    }
    return result;
  }

  tabsToTheRight(id: string): string[] {
    let index = -1;
    for (let i = 0; i < this.tabs.length; ++i) {
      if (this.tabs[i].id === id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return [];
    }
    return this.tabs.slice(index + 1).map(function(tab) {
      return tab.id;
    });
  }

  private viewHasFocus(): boolean {
    if (this.visibleView?.hasFocus()) {
      return true;
    }
    const root = this.contentElement.getComponentRoot();
    return root instanceof Document && this.contentElement === root.activeElement;
  }

  selectTab(id: string, userGesture?: boolean, forceFocus?: boolean): boolean {
    if (this.currentTabLocked) {
      return false;
    }
    const focused = this.viewHasFocus();
    const tab = this.tabsById.get(id);
    if (!tab) {
      return false;
    }

    const eventData: EventData = {
      prevTabId: this.currentTab ? this.currentTab.id : undefined,
      tabId: id,
      view: tab.view,
      isUserGesture: userGesture,
    };
    this.dispatchEventToListeners(Events.TabInvoked, eventData);
    if (this.currentTab && this.currentTab.id === id) {
      return true;
    }

    this.suspendInvalidations();
    this.hideCurrentTab();
    this.showTab(tab);
    this.resumeInvalidations();
    this.currentTab = tab;

    this.tabsHistory.splice(this.tabsHistory.indexOf(tab), 1);
    this.tabsHistory.splice(0, 0, tab);

    this.updateTabElements();
    if (focused || forceFocus) {
      this.focus();
    }

    this.dispatchEventToListeners(Events.TabSelected, eventData);
    return true;
  }

  selectNextTab(): void {
    const index = this.tabs.indexOf((this.currentTab as TabbedPaneTab));
    const nextIndex = Platform.NumberUtilities.mod(index + 1, this.tabs.length);
    this.selectTab(this.tabs[nextIndex].id, true);
  }

  selectPrevTab(): void {
    const index = this.tabs.indexOf((this.currentTab as TabbedPaneTab));
    const nextIndex = Platform.NumberUtilities.mod(index - 1, this.tabs.length);
    this.selectTab(this.tabs[nextIndex].id, true);
  }

  getTabIndex(id: string): number {
    const index = this.tabs.indexOf((this.tabsById.get(id) as TabbedPaneTab));
    return index;
  }

  moveTabBackward(id: string, index: number): void {
    this.insertBefore((this.tabsById.get(id) as TabbedPaneTab), index - 1);
    this.updateTabSlider();
  }

  moveTabForward(id: string, index: number): void {
    this.insertBefore((this.tabsById.get(id) as TabbedPaneTab), index + 2);
    this.updateTabSlider();
  }

  lastOpenedTabIds(tabsCount: number): string[] {
    function tabToTabId(tab: TabbedPaneTab): string {
      return tab.id;
    }

    return this.tabsHistory.slice(0, tabsCount).map(tabToTabId);
  }

  setTabIcon(id: string, icon: IconButton.Icon.Icon|null): void {
    const tab = this.tabsById.get(id);
    if (!tab) {
      return;
    }
    tab.setIcon(icon);
    this.updateTabElements();
  }

  setTrailingTabIcon(id: string, icon: IconButton.Icon.Icon|null): void {
    const tab = this.tabsById.get(id);
    if (!tab) {
      return;
    }
    tab.setSuffixElement(icon);
  }

  setSuffixElement(id: string, suffixElement: HTMLElement|null): void {
    const tab = this.tabsById.get(id);
    if (!tab) {
      return;
    }
    tab.setSuffixElement(suffixElement);
    this.updateTabElements();
  }

  setBadge(id: string, content: string|null): void {
    const badge = document.createElement('span');
    badge.textContent = content;
    badge.classList.add('badge');
    this.setSuffixElement(id, content ? badge : null);
  }

  setTabEnabled(id: string, enabled: boolean): void {
    const tab = this.tabsById.get(id);
    if (tab) {
      tab.tabElement.classList.toggle('disabled', !enabled);
    }
  }

  tabIsDisabled(id: string): boolean {
    return !this.tabIsEnabled(id);
  }

  tabIsEnabled(id: string): boolean {
    const tab = this.tabsById.get(id);
    const disabled = tab?.tabElement.classList.contains('disabled') ?? false;
    return !disabled;
  }

  private zoomChanged(): void {
    this.clearMeasuredWidths();
    if (this.isShowing()) {
      this.updateTabElements();
    }
  }

  private clearMeasuredWidths(): void {
    for (let i = 0; i < this.tabs.length; ++i) {
      delete this.tabs[i].measuredWidth;
    }
  }

  changeTabTitle(id: string, tabTitle: string, tabTooltip?: string): void {
    const tab = this.tabsById.get(id);
    if (tab && tabTooltip !== undefined) {
      tab.tooltip = tabTooltip;
    }
    if (tab && tab.title !== tabTitle) {
      tab.title = tabTitle;
      ARIAUtils.setLabel(tab.tabElement, tabTitle);
      this.updateTabElements();
    }
  }

  changeTabView(id: string, view: Widget): void {
    const tab = this.tabsById.get(id);
    if (!tab || tab.view === view) {
      return;
    }

    this.suspendInvalidations();
    const isSelected = this.currentTab && this.currentTab.id === id;
    const shouldFocus = tab.view.hasFocus();
    if (isSelected) {
      this.hideTab(tab);
    }
    tab.view = view;
    if (isSelected) {
      this.showTab(tab);
    }
    if (shouldFocus) {
      tab.view.focus();
    }
    this.resumeInvalidations();
  }

  override onResize(): void {
    if (this.currentDevicePixelRatio !== window.devicePixelRatio) {
      // Force recalculation of all tab widths on a DPI change
      this.clearMeasuredWidths();
      this.currentDevicePixelRatio = window.devicePixelRatio;
    }
    this.updateTabElements();
  }

  headerResized(): void {
    this.updateTabElements();
  }

  override wasShown(): void {
    const effectiveTab = this.currentTab || this.tabsHistory[0];
    if (effectiveTab && this.autoSelectFirstItemOnShow) {
      this.selectTab(effectiveTab.id);
    }
    this.updateTabElements();
    this.dispatchEventToListeners(Events.PaneVisibilityChanged, {isVisible: true});
  }

  override wasHidden(): void {
    this.dispatchEventToListeners(Events.PaneVisibilityChanged, {isVisible: false});
  }

  makeTabSlider(): void {
    if (this.verticalTabLayout) {
      return;
    }
    this.setTabSlider(true);
  }

  private setTabSlider(enable: boolean): void {
    this.sliderEnabled = enable;
    this.tabSlider.classList.toggle('enabled', enable);
  }

  override calculateConstraints(): Constraints {
    let constraints = super.calculateConstraints();
    const minContentConstraints = new Constraints(new Size(0, 0), new Size(50, 50));
    constraints = constraints.widthToMax(minContentConstraints).heightToMax(minContentConstraints);
    if (this.verticalTabLayout) {
      constraints = constraints.addWidth(new Constraints(new Size(120, 0)));
    } else {
      constraints = constraints.addHeight(new Constraints(new Size(0, 30)));
    }
    return constraints;
  }

  private updateTabElements(): void {
    invokeOnceAfterBatchUpdate(this, this.innerUpdateTabElements);
  }

  setPlaceholderElement(element: Element, focusedElement?: Element): void {
    this.placeholderElement = element;
    if (focusedElement) {
      this.focusedPlaceholderElement = focusedElement;
    }
    if (this.placeholderContainerElement) {
      this.placeholderContainerElement.removeChildren();
      this.placeholderContainerElement.appendChild(element);
    }
  }

  async waitForTabElementUpdate(): Promise<void> {
    this.innerUpdateTabElements();
  }

  private innerUpdateTabElements(): void {
    if (!this.isShowing()) {
      return;
    }

    if (!this.tabs.length) {
      this.contentElementInternal.classList.add('has-no-tabs');
      if (this.placeholderElement && !this.placeholderContainerElement) {
        this.placeholderContainerElement =
            this.contentElementInternal.createChild('div', 'tabbed-pane-placeholder fill');
        this.placeholderContainerElement.appendChild(this.placeholderElement);
        if (this.focusedPlaceholderElement) {
          this.setDefaultFocusedElement(this.focusedPlaceholderElement);
        }
      }
    } else {
      this.contentElementInternal.classList.remove('has-no-tabs');
      if (this.placeholderContainerElement) {
        this.placeholderContainerElement.remove();
        this.setDefaultFocusedElement(this.contentElement);
        delete this.placeholderContainerElement;
      }
    }

    this.measureDropDownButton();
    this.adjustToolbarWidth();
    this.updateWidths();
    this.updateTabsDropDown();
    this.updateTabSlider();
  }

  private adjustToolbarWidth(): void {
    if (!this.rightToolbarInternal || !this.measuredDropDownButtonWidth) {
      return;
    }
    const leftToolbarWidth = this.leftToolbarInternal?.getBoundingClientRect().width ?? 0;
    const rightToolbarWidth = this.rightToolbarInternal.getBoundingClientRect().width;
    const totalWidth = this.headerElementInternal.getBoundingClientRect().width;
    if (!this.rightToolbarInternal.hasCompactLayout() &&
        totalWidth - rightToolbarWidth - leftToolbarWidth < this.measuredDropDownButtonWidth + 10) {
      this.rightToolbarInternal.setCompactLayout(true);
    } else if (
        this.rightToolbarInternal.hasCompactLayout() &&
        // Estimate the right toolbar size in non-compact mode as 2 times its compact size.
        totalWidth - 2 * rightToolbarWidth - leftToolbarWidth > this.measuredDropDownButtonWidth + 10) {
      this.rightToolbarInternal.setCompactLayout(false);
    }
  }

  private showTabElement(index: number, tab: TabbedPaneTab): void {
    if (index >= this.tabsElement.children.length) {
      this.tabsElement.appendChild(tab.tabElement);
    } else {
      this.tabsElement.insertBefore(tab.tabElement, this.tabsElement.children[index]);
    }
    tab.shown = true;
  }

  private hideTabElement(tab: TabbedPaneTab): void {
    this.tabsElement.removeChild(tab.tabElement);
    tab.shown = false;
  }

  private createDropDownButton(): HTMLDivElement {
    const dropDownContainer = document.createElement('div');
    dropDownContainer.classList.add('tabbed-pane-header-tabs-drop-down-container');
    dropDownContainer.setAttribute('jslog', `${VisualLogging.dropDown('more-tabs').track({click: true})}`);
    const chevronIcon = IconButton.Icon.create('chevron-double-right', 'chevron-icon');
    const moreTabsString = i18nString(UIStrings.moreTabs);
    dropDownContainer.title = moreTabsString;
    ARIAUtils.markAsMenuButton(dropDownContainer);
    ARIAUtils.setLabel(dropDownContainer, moreTabsString);
    ARIAUtils.setExpanded(dropDownContainer, false);
    dropDownContainer.tabIndex = 0;
    dropDownContainer.appendChild(chevronIcon);
    dropDownContainer.addEventListener('click', this.dropDownClicked.bind(this));
    dropDownContainer.addEventListener('keydown', this.dropDownKeydown.bind(this));
    dropDownContainer.addEventListener('mousedown', event => {
      if (event.button !== 0 || this.triggerDropDownTimeout) {
        return;
      }
      this.triggerDropDownTimeout = window.setTimeout(this.dropDownClicked.bind(this, event), 200);
    });
    return dropDownContainer;
  }

  private dropDownClicked(event: MouseEvent): void {
    if (event.button !== 0) {
      return;
    }
    if (this.triggerDropDownTimeout) {
      clearTimeout(this.triggerDropDownTimeout);
      this.triggerDropDownTimeout = null;
    }
    const rect = this.dropDownButton.getBoundingClientRect();
    const menu = new ContextMenu(event, {
      x: rect.left,
      y: rect.bottom,
      onSoftMenuClosed: () => {
        ARIAUtils.setExpanded(this.dropDownButton, false);
      },
    });
    for (const tab of this.tabs) {
      if (tab.shown) {
        continue;
      }
      if (this.numberOfTabsShown() === 0 && this.tabsHistory[0] === tab) {
        menu.defaultSection().appendCheckboxItem(
            tab.title, this.dropDownMenuItemSelected.bind(this, tab), {checked: true, jslogContext: tab.jslogContext});
      } else {
        menu.defaultSection().appendItem(
            tab.title, this.dropDownMenuItemSelected.bind(this, tab), {jslogContext: tab.jslogContext});
      }
    }
    void menu.show().then(() => ARIAUtils.setExpanded(this.dropDownButton, menu.isHostedMenuOpen()));
  }

  private dropDownKeydown(event: KeyboardEvent): void {
    if (Platform.KeyboardUtilities.isEnterOrSpaceKey(event)) {
      this.dropDownButton.click();
      event.consume(true);
    }
  }

  private dropDownMenuItemSelected(tab: TabbedPaneTab): void {
    this.lastSelectedOverflowTab = tab;
    this.selectTab(tab.id, true, true);
  }

  private totalWidth(): number {
    return this.headerContentsElement.getBoundingClientRect().width;
  }

  private numberOfTabsShown(): number {
    let numTabsShown = 0;
    for (const tab of this.tabs) {
      if (tab.shown) {
        numTabsShown++;
      }
    }
    return numTabsShown;
  }

  private updateTabsDropDown(): void {
    const tabsToShowIndexes =
        this.tabsToShowIndexes(this.tabs, this.tabsHistory, this.totalWidth(), this.measuredDropDownButtonWidth || 0);
    if (this.lastSelectedOverflowTab && this.numberOfTabsShown() !== tabsToShowIndexes.length) {
      delete this.lastSelectedOverflowTab;
      this.updateTabsDropDown();
      return;
    }

    for (let i = 0; i < this.tabs.length; ++i) {
      if (this.tabs[i].shown && tabsToShowIndexes.indexOf(i) === -1) {
        this.hideTabElement(this.tabs[i]);
      }
    }
    for (let i = 0; i < tabsToShowIndexes.length; ++i) {
      const tab = this.tabs[tabsToShowIndexes[i]];
      if (!tab.shown) {
        this.showTabElement(i, tab);
      }
    }

    this.maybeShowDropDown(tabsToShowIndexes.length !== this.tabs.length);
  }

  private maybeShowDropDown(hasMoreTabs: boolean): void {
    if (hasMoreTabs && !this.dropDownButton.parentElement) {
      this.headerContentsElement.appendChild(this.dropDownButton);
    } else if (!hasMoreTabs && this.dropDownButton.parentElement) {
      this.headerContentsElement.removeChild(this.dropDownButton);
    }
  }

  private measureDropDownButton(): void {
    if (this.measuredDropDownButtonWidth) {
      return;
    }
    this.dropDownButton.classList.add('measuring');
    this.headerContentsElement.appendChild(this.dropDownButton);
    this.measuredDropDownButtonWidth = this.dropDownButton.getBoundingClientRect().width;
    this.headerContentsElement.removeChild(this.dropDownButton);
    this.dropDownButton.classList.remove('measuring');
  }

  private updateWidths(): void {
    const measuredWidths = this.measureWidths();
    const maxWidth =
        this.shrinkableTabs ? this.calculateMaxWidth(measuredWidths.slice(), this.totalWidth()) : Number.MAX_VALUE;

    let i = 0;
    for (const tab of this.tabs) {
      tab.setWidth(this.verticalTabLayout ? -1 : Math.min(maxWidth, measuredWidths[i++]));
    }
  }

  private measureWidths(): number[] {
    // Add all elements to measure into this.tabsElement
    this.tabsElement.style.setProperty('width', '2000px');
    const measuringTabElements = new Map<HTMLElement, TabbedPaneTab>();
    for (const tab of this.tabs) {
      if (typeof tab.measuredWidth === 'number') {
        continue;
      }
      const measuringTabElement = tab.createTabElement(/* measure */ true);
      measuringTabElements.set(measuringTabElement, tab);
      this.tabsElement.appendChild(measuringTabElement);
    }

    // Perform measurement
    for (const [measuringTabElement, tab] of measuringTabElements) {
      const width = measuringTabElement.getBoundingClientRect().width;
      tab.measuredWidth = Math.ceil(width);
    }

    // Nuke elements from the UI
    for (const measuringTabElement of measuringTabElements.keys()) {
      measuringTabElement.remove();
    }

    // Combine the results.
    const measuredWidths = [];
    for (const tab of this.tabs) {
      measuredWidths.push(tab.measuredWidth || 0);
    }
    this.tabsElement.style.removeProperty('width');

    return measuredWidths;
  }

  private calculateMaxWidth(measuredWidths: number[], totalWidth: number): number {
    if (!measuredWidths.length) {
      return 0;
    }

    measuredWidths.sort(function(x, y) {
      return x - y;
    });

    let totalMeasuredWidth = 0;
    for (let i = 0; i < measuredWidths.length; ++i) {
      totalMeasuredWidth += measuredWidths[i];
    }

    if (totalWidth >= totalMeasuredWidth) {
      return measuredWidths[measuredWidths.length - 1];
    }

    let totalExtraWidth = 0;
    for (let i = measuredWidths.length - 1; i > 0; --i) {
      const extraWidth = measuredWidths[i] - measuredWidths[i - 1];
      totalExtraWidth += (measuredWidths.length - i) * extraWidth;

      if (totalWidth + totalExtraWidth >= totalMeasuredWidth) {
        return measuredWidths[i - 1] +
            (totalWidth + totalExtraWidth - totalMeasuredWidth) / (measuredWidths.length - i);
      }
    }

    return totalWidth / measuredWidths.length;
  }

  private tabsToShowIndexes(
      tabsOrdered: TabbedPaneTab[], tabsHistory: TabbedPaneTab[], totalWidth: number,
      measuredDropDownButtonWidth: number): number[] {
    const tabsToShowIndexes = [];

    let totalTabsWidth = 0;
    const tabCount = tabsOrdered.length;
    const tabsToLookAt = tabsOrdered.slice(0);
    if (this.currentTab !== undefined) {
      tabsToLookAt.unshift(tabsToLookAt.splice(tabsToLookAt.indexOf(this.currentTab), 1)[0]);
    }
    if (this.lastSelectedOverflowTab !== undefined) {
      tabsToLookAt.unshift(tabsToLookAt.splice(tabsToLookAt.indexOf(this.lastSelectedOverflowTab), 1)[0]);
    }
    for (let i = 0; i < tabCount; ++i) {
      const tab = this.automaticReorder ? tabsHistory[i] : tabsToLookAt[i];
      totalTabsWidth += tab.width();
      let minimalRequiredWidth = totalTabsWidth;
      if (i !== tabCount - 1) {
        minimalRequiredWidth += measuredDropDownButtonWidth;
      }
      if (!this.verticalTabLayout && minimalRequiredWidth > totalWidth) {
        break;
      }
      tabsToShowIndexes.push(tabsOrdered.indexOf(tab));
    }

    tabsToShowIndexes.sort(function(x, y) {
      return x - y;
    });

    return tabsToShowIndexes;
  }

  private hideCurrentTab(): void {
    if (!this.currentTab) {
      return;
    }

    this.hideTab(this.currentTab);
    delete this.currentTab;
  }

  private showTab(tab: TabbedPaneTab): void {
    tab.tabElement.tabIndex = 0;
    tab.tabElement.classList.add('selected');
    ARIAUtils.setSelected(tab.tabElement, true);
    tab.view.show(this.element);
    this.updateTabSlider();
  }

  updateTabSlider(): void {
    if (!this.sliderEnabled) {
      return;
    }
    if (!this.currentTab) {
      this.tabSlider.style.width = '0';
      return;
    }
    let left = 0;
    for (let i = 0; i < this.tabs.length && this.currentTab !== this.tabs[i]; i++) {
      if (this.tabs[i].shown) {
        left += this.tabs[i].measuredWidth || 0;
      }
    }
    const sliderWidth = this.currentTab.shown ? this.currentTab.measuredWidth : this.dropDownButton.offsetWidth;
    const scaleFactor = window.devicePixelRatio >= 1.5 ? ' scaleY(0.75)' : '';
    this.tabSlider.style.transform = 'translateX(' + left + 'px)' + scaleFactor;
    this.tabSlider.style.width = sliderWidth + 'px';

    if (this.tabSlider.parentElement !== this.headerContentsElement) {
      this.headerContentsElement.appendChild(this.tabSlider);
    }
  }

  private hideTab(tab: TabbedPaneTab): void {
    tab.tabElement.removeAttribute('tabIndex');
    tab.tabElement.classList.remove('selected');
    tab.tabElement.tabIndex = -1;
    tab.tabElement.setAttribute('aria-selected', 'false');
    tab.view.detach();
  }

  override elementsToRestoreScrollPositionsFor(): Element[] {
    return [this.contentElementInternal];
  }

  insertBefore(tab: TabbedPaneTab, index: number): void {
    this.tabsElement.insertBefore(tab.tabElement, this.tabsElement.childNodes[index]);
    const oldIndex = this.tabs.indexOf(tab);
    this.tabs.splice(oldIndex, 1);
    if (oldIndex < index) {
      --index;
    }
    this.tabs.splice(index, 0, tab);

    const eventData: EventData = {prevTabId: undefined, tabId: tab.id, view: tab.view, isUserGesture: undefined};
    this.dispatchEventToListeners(Events.TabOrderChanged, eventData);
  }

  leftToolbar(): Toolbar {
    if (!this.leftToolbarInternal) {
      this.leftToolbarInternal = document.createElement('devtools-toolbar');
      this.leftToolbarInternal.classList.add('tabbed-pane-left-toolbar');
      this.headerElementInternal.insertBefore(this.leftToolbarInternal, this.headerElementInternal.firstChild);
    }
    return this.leftToolbarInternal;
  }

  rightToolbar(): Toolbar {
    if (!this.rightToolbarInternal) {
      this.rightToolbarInternal = document.createElement('devtools-toolbar');
      this.rightToolbarInternal.classList.add('tabbed-pane-right-toolbar');
      this.headerElementInternal.appendChild(this.rightToolbarInternal);
    }
    return this.rightToolbarInternal;
  }

  setAllowTabReorder(allow: boolean, automatic?: boolean): void {
    this.allowTabReorder = allow;
    this.automaticReorder = automatic;
  }

  private keyDown(event: KeyboardEvent): void {
    if (!this.currentTab) {
      return;
    }
    let nextTabElement: (Element|null)|null = null;
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        nextTabElement = this.currentTab.tabElement.previousElementSibling;
        if (!nextTabElement && !this.dropDownButton.parentElement) {
          nextTabElement = this.currentTab.tabElement.parentElement ?
              this.currentTab.tabElement.parentElement.lastElementChild :
              null;
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        nextTabElement = this.currentTab.tabElement.nextElementSibling;
        if (!nextTabElement && !this.dropDownButton.parentElement) {
          nextTabElement = this.currentTab.tabElement.parentElement ?
              this.currentTab.tabElement.parentElement.firstElementChild :
              null;
        }
        break;
      case 'Enter':
      case ' ':
        this.currentTab.view.focus();
        return;
      default:
        return;
    }
    if (!nextTabElement) {
      this.dropDownButton.click();
      return;
    }
    const tab = this.tabs.find(tab => tab.tabElement === nextTabElement);
    if (tab) {
      this.selectTab(tab.id, true);
    }
    (nextTabElement as HTMLElement).focus();
  }
}
export interface EventData {
  prevTabId?: string;
  tabId: string;
  view?: Widget;
  isUserGesture?: boolean;
}

export enum Events {
  /* eslint-disable @typescript-eslint/naming-convention -- Used by web_tests. */
  TabInvoked = 'TabInvoked',
  TabSelected = 'TabSelected',
  TabClosed = 'TabClosed',
  TabOrderChanged = 'TabOrderChanged',
  PaneVisibilityChanged = 'PaneVisibilityChanged',
  /* eslint-enable @typescript-eslint/naming-convention */
}

export interface EventTypes {
  [Events.TabInvoked]: EventData;
  [Events.TabSelected]: EventData;
  [Events.TabClosed]: EventData;
  [Events.TabOrderChanged]: EventData;
  [Events.PaneVisibilityChanged]: {isVisible: boolean};
}

export class TabbedPaneTab {
  closeable: boolean;
  previewFeature = false;
  private readonly tabbedPane: TabbedPane;
  idInternal: string;
  private titleInternal: string;
  private tooltipInternal: string|undefined;
  private viewInternal: Widget;
  shown: boolean;
  measuredWidth!: number|undefined;
  private tabElementInternal!: HTMLElement|undefined;
  private icon: IconButton.Icon.Icon|null = null;
  private suffixElement: HTMLElement|null = null;
  private widthInternal?: number;
  private delegate?: TabbedPaneTabDelegate;
  private titleElement?: HTMLElement;
  private dragStartX?: number;
  private jslogContextInternal?: string;
  constructor(
      tabbedPane: TabbedPane, id: string, title: string, closeable: boolean, previewFeature: boolean, view: Widget,
      tooltip?: string, jslogContext?: string) {
    this.closeable = closeable;
    this.previewFeature = previewFeature;
    this.tabbedPane = tabbedPane;
    this.idInternal = id;
    this.titleInternal = title;
    this.tooltipInternal = tooltip;
    this.viewInternal = view;
    this.shown = false;
    this.jslogContextInternal = jslogContext;
  }

  get id(): string {
    return this.idInternal;
  }

  get title(): string {
    return this.titleInternal;
  }

  set title(title: string) {
    if (title === this.titleInternal) {
      return;
    }
    this.titleInternal = title;
    if (this.titleElement) {
      this.titleElement.textContent = title;
      const closeIconContainer = this.tabElementInternal?.querySelector('.close-button');
      closeIconContainer?.setAttribute('title', i18nString(UIStrings.closeS, {PH1: title}));
      closeIconContainer?.setAttribute('aria-label', i18nString(UIStrings.closeS, {PH1: title}));
    }
    delete this.measuredWidth;
  }

  get jslogContext(): string {
    return this.jslogContextInternal ?? (this.idInternal === 'console-view' ? 'console' : this.idInternal);
  }

  isCloseable(): boolean {
    return this.closeable;
  }

  setIcon(icon: IconButton.Icon.Icon|null): void {
    this.icon = icon;
    if (this.tabElementInternal && this.titleElement) {
      this.createIconElement(this.tabElementInternal, this.titleElement, false);
    }
    delete this.measuredWidth;
  }

  setSuffixElement(suffixElement: HTMLElement|null): void {
    this.suffixElement = suffixElement;
    if (this.tabElementInternal && this.titleElement) {
      this.createSuffixElement(this.tabElementInternal, this.titleElement, false);
    }
    delete this.measuredWidth;
  }

  toggleClass(className: string, force?: boolean): boolean {
    const element = this.tabElement;
    const hasClass = element.classList.contains(className);
    if (hasClass === force) {
      return false;
    }
    element.classList.toggle(className, force);
    delete this.measuredWidth;
    return true;
  }

  get view(): Widget {
    return this.viewInternal;
  }

  set view(view: Widget) {
    this.viewInternal = view;
  }

  get tooltip(): string|undefined {
    return this.tooltipInternal;
  }

  set tooltip(tooltip: string|undefined) {
    this.tooltipInternal = tooltip;
    if (this.titleElement) {
      Tooltip.install(this.titleElement, tooltip || '');
    }
  }

  get tabElement(): HTMLElement {
    if (!this.tabElementInternal) {
      this.tabElementInternal = this.createTabElement(false);
    }

    return this.tabElementInternal;
  }

  width(): number {
    return this.widthInternal || 0;
  }

  setWidth(width: number): void {
    this.tabElement.style.width = width === -1 ? '' : (width + 'px');
    this.widthInternal = width;
  }

  setDelegate(delegate: TabbedPaneTabDelegate): void {
    this.delegate = delegate;
  }

  private createIconElement(tabElement: Element, titleElement: Element, measuring: boolean): void {
    const iconElement = tabIcons.get(tabElement);
    if (iconElement) {
      iconElement.remove();
      tabIcons.delete(tabElement);
    }
    if (!this.icon) {
      return;
    }

    const iconContainer = document.createElement('span');
    iconContainer.classList.add('tabbed-pane-header-tab-icon');
    const iconNode = measuring ? this.createMeasureClone(this.icon) : this.icon;
    iconContainer.appendChild(iconNode);
    titleElement.insertAdjacentElement('beforebegin', iconContainer);
    tabIcons.set(tabElement, iconContainer);
  }

  private createSuffixElement(tabElement: Element, titleElement: Element, measuring: boolean): void {
    const tabSuffixElement = tabSuffixElements.get(tabElement);
    if (tabSuffixElement) {
      tabSuffixElement.remove();
      tabSuffixElements.delete(tabElement);
    }
    if (!this.suffixElement) {
      return;
    }

    const suffixElementContainer = document.createElement('span');
    suffixElementContainer.classList.add('tabbed-pane-header-tab-suffix-element');
    const suffixElement = measuring ? this.suffixElement.cloneNode() : this.suffixElement;
    suffixElementContainer.appendChild(suffixElement);
    titleElement.insertAdjacentElement('afterend', suffixElementContainer);
    tabSuffixElements.set(tabElement, suffixElementContainer);
  }

  private createMeasureClone(original: IconButton.Icon.Icon): Element {
    // Cloning doesn't work for the icon component because the shadow
    // root isn't copied, but it is sufficient to create a div styled
    // to be the same size.
    const fakeClone = document.createElement('div');
    fakeClone.style.width = original.style.width;
    fakeClone.style.height = original.style.height;
    return fakeClone;
  }

  createTabElement(measuring: boolean): HTMLElement {
    const tabElement = document.createElement('div');
    tabElement.classList.add('tabbed-pane-header-tab');
    tabElement.id = 'tab-' + this.idInternal;
    ARIAUtils.markAsTab(tabElement);
    ARIAUtils.setSelected(tabElement, false);
    ARIAUtils.setLabel(tabElement, this.title);

    const titleElement = tabElement.createChild('span', 'tabbed-pane-header-tab-title');
    titleElement.textContent = this.title;
    Tooltip.install(titleElement, this.tooltip || '');
    this.createIconElement(tabElement, titleElement, measuring);
    this.createSuffixElement(tabElement, titleElement, measuring);
    if (!measuring) {
      this.titleElement = titleElement;
    }

    if (this.previewFeature) {
      const previewIcon = this.createPreviewIcon();
      tabElement.appendChild(previewIcon);
      tabElement.classList.add('preview');
    }

    if (this.closeable) {
      const closeIcon = this.createCloseIconButton();
      tabElement.appendChild(closeIcon);
      tabElement.classList.add('closeable');
    }

    if (measuring) {
      tabElement.classList.add('measuring');
    } else {
      tabElement.addEventListener('click', this.tabClicked.bind(this), false);
      tabElement.addEventListener('keydown', this.tabKeyDown.bind(this), false);
      tabElement.addEventListener('auxclick', this.tabClicked.bind(this), false);
      tabElement.addEventListener('mousedown', this.tabMouseDown.bind(this), false);
      tabElement.addEventListener('mouseup', this.tabMouseUp.bind(this), false);

      tabElement.addEventListener('contextmenu', this.tabContextMenu.bind(this), false);
      if (this.tabbedPane.allowTabReorder) {
        installDragHandle(
            tabElement, this.startTabDragging.bind(this), this.tabDragging.bind(this), this.endTabDragging.bind(this),
            null, null, 200);
      }
    }

    return tabElement as HTMLElement;
  }

  private createCloseIconButton(): Buttons.Button.Button {
    const closeButton = new Buttons.Button.Button();
    closeButton.data = {
      variant: Buttons.Button.Variant.ICON,
      size: Buttons.Button.Size.MICRO,
      iconName: 'cross',
      title: i18nString(UIStrings.closeS, {PH1: this.title}),
    };
    closeButton.classList.add('close-button', 'tabbed-pane-close-button');
    closeButton.setAttribute('jslog', `${VisualLogging.close().track({click: true})}`);

    closeButton.setAttribute('aria-label', i18nString(UIStrings.closeS, {PH1: this.title}));
    return closeButton;
  }

  private createPreviewIcon(): HTMLDivElement {
    const previewIcon = document.createElement('div');
    previewIcon.classList.add('preview-icon');
    const closeIcon = new IconButton.Icon.Icon();
    closeIcon.data = {
      iconName: 'experiment',
      color: 'var(--override-tabbed-pane-preview-icon-color)',
      height: '14px',
      width: '14px',
    };
    previewIcon.appendChild(closeIcon);
    previewIcon.setAttribute('title', i18nString(UIStrings.previewFeature));
    previewIcon.setAttribute('aria-label', i18nString(UIStrings.previewFeature));
    return previewIcon;
  }

  private isCloseIconClicked(element: HTMLElement): boolean {
    return element?.classList.contains('tabbed-pane-close-button') ||
        element?.parentElement?.classList.contains('tabbed-pane-close-button') || false;
  }

  private tabKeyDown(ev: Event): void {
    const event = ev as KeyboardEvent;
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (this.isCloseIconClicked(event.target as HTMLElement)) {
          this.closeTabs([this.id]);
          ev.consume(true);
          return;
        }
    }
  }

  private tabClicked(event: MouseEvent): void {
    const middleButton = event.button === 1;
    const shouldClose = this.closeable && (middleButton || this.isCloseIconClicked(event.target as HTMLElement));
    if (!shouldClose) {
      this.tabbedPane.focus();
      return;
    }
    this.closeTabs([this.id]);
    event.consume(true);
  }

  private tabMouseDown(event: MouseEvent): void {
    if (this.isCloseIconClicked(event.target as HTMLElement) || event.button !== 0) {
      return;
    }
    this.tabbedPane.selectTab(this.id, true);
  }

  private tabMouseUp(event: MouseEvent): void {
    // This is needed to prevent middle-click pasting on linux when tabs are clicked.
    if (event.button === 1) {
      event.consume(true);
    }
  }

  private closeTabs(ids: string[]): void {
    if (this.delegate) {
      this.delegate.closeTabs(this.tabbedPane, ids);
      return;
    }
    this.tabbedPane.closeTabs(ids, true);
  }

  private tabContextMenu(event: Event): void {
    function close(this: TabbedPaneTab): void {
      this.closeTabs([this.id]);
    }

    function closeOthers(this: TabbedPaneTab): void {
      this.closeTabs(this.tabbedPane.otherTabs(this.id));
    }

    function closeAll(this: TabbedPaneTab): void {
      this.closeTabs(this.tabbedPane.tabIds());
    }

    function closeToTheRight(this: TabbedPaneTab): void {
      this.closeTabs(this.tabbedPane.tabsToTheRight(this.id));
    }

    function moveTabForward(this: TabbedPaneTab, tabIndex: number): void {
      this.tabbedPane.moveTabForward(this.id, tabIndex);
    }

    function moveTabBackward(this: TabbedPaneTab, tabIndex: number): void {
      this.tabbedPane.moveTabBackward(this.id, tabIndex);
    }

    const contextMenu = new ContextMenu(event);
    if (this.closeable) {
      contextMenu.defaultSection().appendItem(i18nString(UIStrings.close), close.bind(this), {jslogContext: 'close'});
      contextMenu.defaultSection().appendItem(
          i18nString(UIStrings.closeOthers), closeOthers.bind(this), {jslogContext: 'close-others'});
      contextMenu.defaultSection().appendItem(
          i18nString(UIStrings.closeTabsToTheRight), closeToTheRight.bind(this),
          {jslogContext: 'close-tabs-to-the-right'});
      contextMenu.defaultSection().appendItem(
          i18nString(UIStrings.closeAll), closeAll.bind(this), {jslogContext: 'close-all'});
    }
    if (this.delegate) {
      this.delegate.onContextMenu(this.id, contextMenu);
    }
    const tabIndex = this.tabbedPane.getTabIndex(this.id);
    if (tabIndex > 0) {
      contextMenu.defaultSection().appendItem(
          i18nString(UIStrings.moveTabLeft), moveTabBackward.bind(this, tabIndex), {jslogContext: 'move-tab-backward'});
    }
    if (tabIndex < this.tabbedPane.tabsElement.childNodes.length - 1) {
      contextMenu.defaultSection().appendItem(
          i18nString(UIStrings.moveTabRight), moveTabForward.bind(this, tabIndex), {jslogContext: 'move-tab-forward'});
    }
    void contextMenu.show();
  }

  private startTabDragging(event: MouseEvent): boolean {
    if (this.isCloseIconClicked(event.target as HTMLElement)) {
      return false;
    }
    this.dragStartX = event.pageX;
    if (this.tabElementInternal) {
      this.tabElementInternal.classList.add('dragging');
    }
    this.tabbedPane.tabSlider.remove();
    return true;
  }

  private tabDragging(event: MouseEvent): void {
    const tabElements = this.tabbedPane.tabsElement.childNodes;
    for (let i = 0; i < tabElements.length; ++i) {
      let tabElement: HTMLElement = (tabElements[i] as HTMLElement);
      if (!this.tabElementInternal || tabElement === this.tabElementInternal) {
        continue;
      }

      const intersects = tabElement.offsetLeft + tabElement.clientWidth > this.tabElementInternal.offsetLeft &&
          this.tabElementInternal.offsetLeft + this.tabElementInternal.clientWidth > tabElement.offsetLeft;
      if (!intersects) {
        continue;
      }

      const dragStartX = (this.dragStartX as number);
      if (Math.abs(event.pageX - dragStartX) < tabElement.clientWidth / 2 + 5) {
        break;
      }

      if (event.pageX - dragStartX > 0) {
        tabElement = (tabElement.nextSibling as HTMLElement);
        ++i;
      }

      const oldOffsetLeft = this.tabElementInternal.offsetLeft;
      this.tabbedPane.insertBefore(this, i);
      this.dragStartX = dragStartX + this.tabElementInternal.offsetLeft - oldOffsetLeft;
      break;
    }

    const dragStartX = (this.dragStartX as number);
    const tabElement = (this.tabElementInternal as HTMLElement);
    if (!tabElement.previousSibling && event.pageX - dragStartX < 0) {
      tabElement.style.setProperty('left', '0px');
      return;
    }
    if (!tabElement.nextSibling && event.pageX - dragStartX > 0) {
      tabElement.style.setProperty('left', '0px');
      return;
    }

    tabElement.style.setProperty('left', (event.pageX - dragStartX) + 'px');
  }

  private endTabDragging(_event: Event): void {
    const tabElement = (this.tabElementInternal as HTMLElement);
    tabElement.classList.remove('dragging');
    tabElement.style.removeProperty('left');
    delete this.dragStartX;
    this.tabbedPane.updateTabSlider();
  }
}

const tabIcons = new WeakMap<Element, Element>();
const tabSuffixElements = new WeakMap<Element, Element>();

export interface TabbedPaneTabDelegate {
  closeTabs(tabbedPane: TabbedPane, ids: string[]): void;
  onContextMenu(tabId: string, contextMenu: ContextMenu): void;
}
