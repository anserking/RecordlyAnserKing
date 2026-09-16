/**
 * Focus-mode-aware toast wrapper.
 *
 * Import `toast` from this module instead of directly from `"sonner"`.
 * All calls are silently suppressed while focus mode is active so that
 * Recordly does not interrupt the user's focus session with notifications.
 *
 * The API surface mirrors the subset of sonner's `toast` that is used
 * across this codebase: the base call plus `.success`, `.error`, `.info`,
 * `.warning`, `.loading`, `.promise`, and `.dismiss`.
 */

import { toast as sonnerToast } from "sonner";
import { isFocusModeEnabled } from "./focusMode";

type SonnerToast = typeof sonnerToast;

function noop(): string {
	// Return a stable dummy ID so callers that pass the ID to toast.dismiss()
	// don't break when the toast was suppressed.
	return "focus-mode-suppressed";
}

function maybeToast(...args: Parameters<SonnerToast>): ReturnType<SonnerToast> {
	if (isFocusModeEnabled()) {
		return noop() as ReturnType<SonnerToast>;
	}
	return sonnerToast(...args);
}

maybeToast.success = ((...args: Parameters<SonnerToast["success"]>) => {
	if (isFocusModeEnabled()) return noop();
	return sonnerToast.success(...args);
}) as SonnerToast["success"];

maybeToast.error = ((...args: Parameters<SonnerToast["error"]>) => {
	if (isFocusModeEnabled()) return noop();
	return sonnerToast.error(...args);
}) as SonnerToast["error"];

maybeToast.info = ((...args: Parameters<SonnerToast["info"]>) => {
	if (isFocusModeEnabled()) return noop();
	return sonnerToast.info(...args);
}) as SonnerToast["info"];

maybeToast.warning = ((...args: Parameters<SonnerToast["warning"]>) => {
	if (isFocusModeEnabled()) return noop();
	return sonnerToast.warning(...args);
}) as SonnerToast["warning"];

maybeToast.loading = ((...args: Parameters<SonnerToast["loading"]>) => {
	if (isFocusModeEnabled()) return noop();
	return sonnerToast.loading(...args);
}) as SonnerToast["loading"];

maybeToast.promise = ((...args: Parameters<SonnerToast["promise"]>) => {
	if (isFocusModeEnabled()) return noop();
	return sonnerToast.promise(...args);
}) as SonnerToast["promise"];

maybeToast.dismiss = sonnerToast.dismiss;
maybeToast.custom = sonnerToast.custom;
maybeToast.message = sonnerToast.message;

/** Focus-mode-aware drop-in replacement for sonner's `toast`. */
export const toast = maybeToast;
