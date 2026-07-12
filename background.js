// background.js — service worker.
// The panel is hidden by default. Clicking the toolbar icon toggles it
// by sending a message to the content script in the active tab.

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.id) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "xts-toggle-panel" });
  } catch (e) {
    // Content script may not be present (e.g. non-X page or tab not yet
    // loaded). Silently ignore.
  }
});
