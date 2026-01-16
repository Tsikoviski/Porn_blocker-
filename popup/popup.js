import { StateManager } from '../background/state_manager.js';

// Note: Direct import of background module works in some bundlers/envs, 
// but in standard extensions popup context is separate. 
// We usually communicate via runtime.sendMessage.
// However, since we are designing modular code, we can share utility classes if bundled.
// For raw extension, we'll use messaging for state updates to ensure background sync.

document.addEventListener('DOMContentLoaded', async () => {
    const strictnessSelect = document.getElementById('strictness');
    const optionsBtn = document.getElementById('options-btn');
    const statusText = document.getElementById('status-text');

    // Load initial state
    const settings = await chrome.runtime.sendMessage({ action: 'getSettings' });

    if (settings) {
        strictnessSelect.value = settings.strictness || 'standard';
    }

    strictnessSelect.addEventListener('change', async (e) => {
        const value = e.target.value;
        await chrome.runtime.sendMessage({ action: 'updateStrictness', value });
        // Optional: Trigger re-scan of active tab
    });

    optionsBtn.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });
});
