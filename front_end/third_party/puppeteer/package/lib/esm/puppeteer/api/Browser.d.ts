/// <reference types="node" preserve="true" />
/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ChildProcess } from 'node:child_process';
import type { Protocol } from 'devtools-protocol';
import type { ProtocolType } from '../common/ConnectOptions.js';
import type { Cookie, CookieData } from '../common/Cookie.js';
import type { DownloadBehavior } from '../common/DownloadBehavior.js';
import { EventEmitter, type EventType } from '../common/EventEmitter.js';
import { asyncDisposeSymbol, disposeSymbol } from '../util/disposable.js';
import type { BrowserContext } from './BrowserContext.js';
import type { Page } from './Page.js';
import type { Target } from './Target.js';
/**
 * @public
 */
export interface BrowserContextOptions {
    /**
     * Proxy server with optional port to use for all requests.
     * Username and password can be set in `Page.authenticate`.
     */
    proxyServer?: string;
    /**
     * Bypass the proxy for the given list of hosts.
     */
    proxyBypassList?: string[];
    /**
     * Behavior definition for when downloading a file.
     *
     * @remarks
     * If not set, the default behavior will be used.
     */
    downloadBehavior?: DownloadBehavior;
}
/**
 * @internal
 */
export type BrowserCloseCallback = () => Promise<void> | void;
/**
 * @public
 */
export type TargetFilterCallback = (target: Target) => boolean;
/**
 * @internal
 */
export type IsPageTargetCallback = (target: Target) => boolean;
/**
 * @internal
 */
export declare const WEB_PERMISSION_TO_PROTOCOL_PERMISSION: Map<Permission, Protocol.Browser.PermissionType>;
/**
 * @public
 */
export type Permission = 'accelerometer' | 'ambient-light-sensor' | 'background-sync' | 'camera' | 'clipboard-read' | 'clipboard-sanitized-write' | 'clipboard-write' | 'geolocation' | 'gyroscope' | 'idle-detection' | 'keyboard-lock' | 'magnetometer' | 'microphone' | 'midi-sysex' | 'midi' | 'notifications' | 'payment-handler' | 'persistent-storage' | 'pointer-lock';
/**
 * @public
 */
export interface WaitForTargetOptions {
    /**
     * Maximum wait time in milliseconds. Pass `0` to disable the timeout.
     *
     * @defaultValue `30_000`
     */
    timeout?: number;
    /**
     * A signal object that allows you to cancel a waitFor call.
     */
    signal?: AbortSignal;
}
/**
 * All the events a {@link Browser | browser instance} may emit.
 *
 * @public
 */
export declare const enum BrowserEvent {
    /**
     * Emitted when Puppeteer gets disconnected from the browser instance. This
     * might happen because either:
     *
     * - The browser closes/crashes or
     * - {@link Browser.disconnect} was called.
     */
    Disconnected = "disconnected",
    /**
     * Emitted when the URL of a target changes. Contains a {@link Target}
     * instance.
     *
     * @remarks Note that this includes target changes in all browser
     * contexts.
     */
    TargetChanged = "targetchanged",
    /**
     * Emitted when a target is created, for example when a new page is opened by
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/open | window.open}
     * or by {@link Browser.newPage | browser.newPage}
     *
     * Contains a {@link Target} instance.
     *
     * @remarks Note that this includes target creations in all browser
     * contexts.
     */
    TargetCreated = "targetcreated",
    /**
     * Emitted when a target is destroyed, for example when a page is closed.
     * Contains a {@link Target} instance.
     *
     * @remarks Note that this includes target destructions in all browser
     * contexts.
     */
    TargetDestroyed = "targetdestroyed",
    /**
     * @internal
     */
    TargetDiscovered = "targetdiscovered"
}
/**
 * @public
 */
export interface BrowserEvents extends Record<EventType, unknown> {
    [BrowserEvent.Disconnected]: undefined;
    [BrowserEvent.TargetCreated]: Target;
    [BrowserEvent.TargetDestroyed]: Target;
    [BrowserEvent.TargetChanged]: Target;
    /**
     * @internal
     */
    [BrowserEvent.TargetDiscovered]: Protocol.Target.TargetInfo;
}
/**
 * @public
 * @experimental
 */
export interface DebugInfo {
    pendingProtocolErrors: Error[];
}
/**
 * {@link Browser} represents a browser instance that is either:
 *
 * - connected to via {@link Puppeteer.connect} or
 * - launched by {@link PuppeteerNode.launch}.
 *
 * {@link Browser} {@link EventEmitter.emit | emits} various events which are
 * documented in the {@link BrowserEvent} enum.
 *
 * @example Using a {@link Browser} to create a {@link Page}:
 *
 * ```ts
 * import puppeteer from 'puppeteer';
 *
 * const browser = await puppeteer.launch();
 * const page = await browser.newPage();
 * await page.goto('https://example.com');
 * await browser.close();
 * ```
 *
 * @example Disconnecting from and reconnecting to a {@link Browser}:
 *
 * ```ts
 * import puppeteer from 'puppeteer';
 *
 * const browser = await puppeteer.launch();
 * // Store the endpoint to be able to reconnect to the browser.
 * const browserWSEndpoint = browser.wsEndpoint();
 * // Disconnect puppeteer from the browser.
 * await browser.disconnect();
 *
 * // Use the endpoint to reestablish a connection
 * const browser2 = await puppeteer.connect({browserWSEndpoint});
 * // Close the browser.
 * await browser2.close();
 * ```
 *
 * @public
 */
export declare abstract class Browser extends EventEmitter<BrowserEvents> {
    /**
     * @internal
     */
    constructor();
    /**
     * Gets the associated
     * {@link https://nodejs.org/api/child_process.html#class-childprocess | ChildProcess}.
     *
     * @returns `null` if this instance was connected to via
     * {@link Puppeteer.connect}.
     */
    abstract process(): ChildProcess | null;
    /**
     * Creates a new {@link BrowserContext | browser context}.
     *
     * This won't share cookies/cache with other {@link BrowserContext | browser contexts}.
     *
     * @example
     *
     * ```ts
     * import puppeteer from 'puppeteer';
     *
     * const browser = await puppeteer.launch();
     * // Create a new browser context.
     * const context = await browser.createBrowserContext();
     * // Create a new page in a pristine context.
     * const page = await context.newPage();
     * // Do stuff
     * await page.goto('https://example.com');
     * ```
     */
    abstract createBrowserContext(options?: BrowserContextOptions): Promise<BrowserContext>;
    /**
     * Gets a list of open {@link BrowserContext | browser contexts}.
     *
     * In a newly-created {@link Browser | browser}, this will return a single
     * instance of {@link BrowserContext}.
     */
    abstract browserContexts(): BrowserContext[];
    /**
     * Gets the default {@link BrowserContext | browser context}.
     *
     * @remarks The default {@link BrowserContext | browser context} cannot be
     * closed.
     */
    abstract defaultBrowserContext(): BrowserContext;
    /**
     * Gets the WebSocket URL to connect to this {@link Browser | browser}.
     *
     * This is usually used with {@link Puppeteer.connect}.
     *
     * You can find the debugger URL (`webSocketDebuggerUrl`) from
     * `http://HOST:PORT/json/version`.
     *
     * See {@link https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target | browser endpoint}
     * for more information.
     *
     * @remarks The format is always `ws://HOST:PORT/devtools/browser/<id>`.
     */
    abstract wsEndpoint(): string;
    /**
     * Creates a new {@link Page | page} in the
     * {@link Browser.defaultBrowserContext | default browser context}.
     */
    abstract newPage(): Promise<Page>;
    /**
     * Gets all active {@link Target | targets}.
     *
     * In case of multiple {@link BrowserContext | browser contexts}, this returns
     * all {@link Target | targets} in all
     * {@link BrowserContext | browser contexts}.
     */
    abstract targets(): Target[];
    /**
     * Gets the {@link Target | target} associated with the
     * {@link Browser.defaultBrowserContext | default browser context}).
     */
    abstract target(): Target;
    /**
     * Waits until a {@link Target | target} matching the given `predicate`
     * appears and returns it.
     *
     * This will look all open {@link BrowserContext | browser contexts}.
     *
     * @example Finding a target for a page opened via `window.open`:
     *
     * ```ts
     * await page.evaluate(() => window.open('https://www.example.com/'));
     * const newWindowTarget = await browser.waitForTarget(
     *   target => target.url() === 'https://www.example.com/',
     * );
     * ```
     */
    waitForTarget(predicate: (x: Target) => boolean | Promise<boolean>, options?: WaitForTargetOptions): Promise<Target>;
    /**
     * Gets a list of all open {@link Page | pages} inside this {@link Browser}.
     *
     * If there are multiple {@link BrowserContext | browser contexts}, this
     * returns all {@link Page | pages} in all
     * {@link BrowserContext | browser contexts}.
     *
     * @remarks Non-visible {@link Page | pages}, such as `"background_page"`,
     * will not be listed here. You can find them using {@link Target.page}.
     */
    pages(): Promise<Page[]>;
    /**
     * Gets a string representing this {@link Browser | browser's} name and
     * version.
     *
     * For headless browser, this is similar to `"HeadlessChrome/61.0.3153.0"`. For
     * non-headless or new-headless, this is similar to `"Chrome/61.0.3153.0"`. For
     * Firefox, it is similar to `"Firefox/116.0a1"`.
     *
     * The format of {@link Browser.version} might change with future releases of
     * browsers.
     */
    abstract version(): Promise<string>;
    /**
     * Gets this {@link Browser | browser's} original user agent.
     *
     * {@link Page | Pages} can override the user agent with
     * {@link Page.setUserAgent}.
     *
     */
    abstract userAgent(): Promise<string>;
    /**
     * Closes this {@link Browser | browser} and all associated
     * {@link Page | pages}.
     */
    abstract close(): Promise<void>;
    /**
     * Disconnects Puppeteer from this {@link Browser | browser}, but leaves the
     * process running.
     */
    abstract disconnect(): Promise<void>;
    /**
     * Returns all cookies in the default {@link BrowserContext}.
     *
     * @remarks
     *
     * Shortcut for
     * {@link BrowserContext.cookies | browser.defaultBrowserContext().cookies()}.
     */
    cookies(): Promise<Cookie[]>;
    /**
     * Sets cookies in the default {@link BrowserContext}.
     *
     * @remarks
     *
     * Shortcut for
     * {@link BrowserContext.setCookie | browser.defaultBrowserContext().setCookie()}.
     */
    setCookie(...cookies: CookieData[]): Promise<void>;
    /**
     * Removes cookies from the default {@link BrowserContext}.
     *
     * @remarks
     *
     * Shortcut for
     * {@link BrowserContext.deleteCookie | browser.defaultBrowserContext().deleteCookie()}.
     */
    deleteCookie(...cookies: Cookie[]): Promise<void>;
    /**
     * Installs an extension and returns the ID. In Chrome, this is only
     * available if the browser was created using `pipe: true` and the
     * `--enable-unsafe-extension-debugging` flag is set.
     */
    abstract installExtension(path: string): Promise<string>;
    /**
     * Uninstalls an extension. In Chrome, this is only available if the browser
     * was created using `pipe: true` and the
     * `--enable-unsafe-extension-debugging` flag is set.
     */
    abstract uninstallExtension(id: string): Promise<void>;
    /**
     * Whether Puppeteer is connected to this {@link Browser | browser}.
     *
     * @deprecated Use {@link Browser | Browser.connected}.
     */
    isConnected(): boolean;
    /**
     * Whether Puppeteer is connected to this {@link Browser | browser}.
     */
    abstract get connected(): boolean;
    /** @internal */
    [disposeSymbol](): void;
    /** @internal */
    [asyncDisposeSymbol](): Promise<void>;
    /**
     * @internal
     */
    abstract get protocol(): ProtocolType;
    /**
     * Get debug information from Puppeteer.
     *
     * @remarks
     *
     * Currently, includes pending protocol calls. In the future, we might add more info.
     *
     * @public
     * @experimental
     */
    abstract get debugInfo(): DebugInfo;
    /**
     * @internal
     */
    abstract isNetworkEnabled(): boolean;
}
//# sourceMappingURL=Browser.d.ts.map