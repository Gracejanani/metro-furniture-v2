export const LOADER_COMPLETE_EVENT = "metro:loader-complete";
export const MOBILE_LOADER_MS = 4000;
export const MAX_LOADER_MS = 12000;

export function dispatchLoaderComplete() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LOADER_COMPLETE_EVENT));
  }
}

export function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}
