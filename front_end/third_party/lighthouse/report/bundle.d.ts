declare var Q: {
    new (e: any, t: any): {
        _document: any;
        _lighthouseChannel: string;
        _componentCache: Map<any, any>;
        rootEl: any;
        _swappableSections: WeakMap<object, any>;
        _onSwap: () => void;
        _onSwapHook: () => void;
        createElement(e: any, t: any): any;
        createElementNS(e: any, t: any, n: any): any;
        createSVGElement(e: any, t: any): any;
        createFragment(): any;
        createTextNode(e: any): any;
        createChildOf(e: any, t: any, n: any): any;
        createComponent(e: any): any;
        clearComponentCache(): void;
        convertMarkdownLinkSnippets(e: any, t?: {}): any;
        safelySetHref(e: any, t: any): void;
        safelySetBlobHref(e: any, t: any): void;
        convertMarkdownCodeSnippets(e: any): any;
        setLighthouseChannel(e: any): void;
        document(): any;
        isDevTools(): boolean;
        find(e: any, t?: any): any;
        maybeFind(e: any, t?: any): any;
        findAll(e: any, t: any): any[];
        fireEventOn(e: any, t: any, n: any): void;
        saveFile(e: any, t: any): void;
        registerSwappableSections(e: any, t: any): void;
        swapSectionIfPossible(e: any): void;
    };
};
declare var te: {
    new (e: any): {
        _dom: any;
        _opts: {};
        renderReport(e: any, t: any, n: any): any;
        _renderReportTopbar(e: any): any;
        _renderReportHeader(): any;
        _renderReportFooter(e: any): any;
        _renderMetaBlock(e: any, t: any): void;
        _renderReportWarnings(e: any): any;
        _renderScoreGauges(e: any, t: any, n: any): any[];
        _renderReport(e: any): any;
    };
};
declare var ne: {
    new (e: any, t?: {}): {
        _dom: any;
        _opts: {};
        _topbar: {
            _reportUIFeatures: any;
            _dom: any;
            _dropDownMenu: {
                _dom: any;
                onDocumentKeyDown(e: any): void;
                onToggleClick(e: any): void;
                onToggleKeydown(e: any): void;
                onMenuFocusOut(e: any): void;
                onMenuKeydown(e: any): void;
                _getNextMenuItem(e: any): any;
                _getNextSelectableNode(e: any, t: any): any;
                _getPreviousMenuItem(e: any): any;
                setup(e: any): void;
                _toggleEl: any;
                _menuEl: any;
                close(): void;
                open(e: any): void;
            };
            _copyAttempt: boolean;
            onDropDownMenuClick(e: any): void;
            onKeyUp(e: any): void;
            onCopy(e: any): void;
            collapseAllDetails(): void;
            enable(e: any): void;
            lhr: any;
            onCopyButtonClick(): void;
            expandAllDetails(): void;
            _print(): void;
            resetUIState(): void;
            _getScrollParent(e: any): any;
            _setUpCollapseDetailsAfterPrinting(): void;
            _setupStickyHeader(): void;
            topbarEl: any;
            categoriesEl: any;
            stickyHeaderEl: any;
            highlightEl: any;
            _updateStickyHeader(): void;
        };
        _tablesHandledFor3p: WeakSet<object>;
        onMediaQueryChange(e: any): void;
        initFeatures(e: any): void;
        json: any;
        _fullPageScreenshot: any;
        addButton(e: any): any;
        resetUIState(): void;
        getReportHtml(): any;
        saveAsGist(): void;
        _enableFireworks(): void;
        _setupMediaQueryListeners(): void;
        _resetUIState(): void;
        _setupThirdPartyFilter(): void;
        _setupElementScreenshotOverlay(e: any): void;
        _getThirdPartyRows(e: any, t: any): any[];
        _saveFile(e: any): void;
    };
};
declare namespace zt {
    export { At as registerLocaleData };
    export { Lt as hasLocale };
}
declare function St(o: any, e?: {}): HTMLElement;
declare function Ct(o: any, e: any): {
    lhr: any;
    missingIcuMessageIds: any[];
};
declare function At(o: any, e: any): void;
declare function Lt(o: any): boolean;
export { Q as DOM, te as ReportRenderer, ne as ReportUIFeatures, zt as format, St as renderReport, Ct as swapLocale };
