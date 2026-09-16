/**
 * Renderer-side focus-mode state.
 *
 * This module holds a single mutable reference to the current focus-mode
 * enabled flag. It is updated by the `useFocusMode` hook (which syncs from
 * the main process) and read synchronously by the `toast` wrapper to decide
 * whether to suppress notifications.
 *
 * Keeping state here — rather than only in React — avoids having to thread
 * the flag through every component that might show a toast.
 */

let _focusModeEnabled = false;

/** Returns true when focus mode is currently active. */
export function isFocusModeEnabled(): boolean {
	return _focusModeEnabled;
}

/**
 * Called by `useFocusMode` whenever the main-process broadcasts a state change.
 * Not intended for direct use outside of the hook.
 */
export function setFocusModeEnabledRef(enabled: boolean): void {
	_focusModeEnabled = enabled;
}
