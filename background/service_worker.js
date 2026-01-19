import { StateManager } from './state_manager.js';

// Initialize state on install
chrome.runtime.onInstalled.addListener(async () => {
  await StateManager.initializeWithDefaults();
  console.log('PureGuard: Installed and initialized.');
});

// Listener for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    StateManager.getSettings().then(sendResponse);
    return true; // Keep channel open for async response
  }

  if (request.action === 'updateStrictness') {
    StateManager.updateStrictness(request.value)
      .then(() => sendResponse({ success: true }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (request.action === 'setPin') {
    StateManager.setPin(request.pin)
      .then(() => sendResponse({ success: true }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (request.action === 'checkPin') {
    StateManager.checkPin(request.pin).then((isValid) => {
      sendResponse({ valid: isValid });
    });
    return true;
  }

  if (request.action === 'setLockState') {
    StateManager.setLockState(request.locked).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});
