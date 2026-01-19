document.addEventListener('DOMContentLoaded', async () => {
    const whitelistArea = document.getElementById('whitelist');
    const saveBtn = document.getElementById('save');
    const msg = document.getElementById('msg');

    // Lock Elements
    const lockOverlay = document.getElementById('lock-overlay');
    const pinInput = document.getElementById('pin-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const pinError = document.getElementById('pin-error');

    // Load State
    await checkLockState();

    async function checkLockState() {
        const settings = await chrome.runtime.sendMessage({ action: 'getSettings' });
        if (settings) {
            if (settings.whitelist) {
                whitelistArea.value = settings.whitelist.join('\n');
            }

            // If locked and PIN is set, show lock screen
            if (settings.isLocked && settings.pinHash) {
                lockOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            } else {
                lockOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    }

    // Unlock Logic
    async function handleUnlock() {
        const pin = pinInput.value;
        const response = await chrome.runtime.sendMessage({ action: 'checkPin', pin });

        if (response.valid) {
            await chrome.runtime.sendMessage({ action: 'setLockState', locked: false });
            lockOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            pinError.style.display = 'block';
            pinInput.value = '';
        }
    }

    unlockBtn.addEventListener('click', handleUnlock);
    pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUnlock();
    });

    // Save
    saveBtn.addEventListener('click', async () => {
        const domains = whitelistArea.value.split('\n').map(d => d.trim()).filter(d => d);
        // Verify PIN again or check lock state before saving?
        // The background script also checks lock state, so this catches it.
        try {
            await chrome.storage.local.set({ whitelist: domains });
            msg.style.display = 'inline';
            msg.textContent = 'Saved!';
            msg.style.color = 'green';
            setTimeout(() => { msg.style.display = 'none'; }, 2000);
        } catch (err) {
            msg.style.display = 'inline';
            msg.textContent = 'Error: Settings are locked';
            msg.style.color = 'red';
        }
    });
});
