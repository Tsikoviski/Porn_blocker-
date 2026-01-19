document.addEventListener('DOMContentLoaded', async () => {
    const strictnessSelect = document.getElementById('strictness');
    const optionsBtn = document.getElementById('options-btn');
    const lockBtn = document.getElementById('lock-btn');
    const controlsArea = document.getElementById('controls-area');

    // Modal Elements
    const pinModal = document.getElementById('pin-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const pinInput = document.getElementById('pin-input');
    const pinError = document.getElementById('pin-error');
    const pinConfirm = document.getElementById('pin-confirm');
    const pinCancel = document.getElementById('pin-cancel');

    let currentMode = 'unlock'; // 'setup', 'unlock', 'lock'

    // --- State Management ---
    async function loadState() {
        const settings = await chrome.runtime.sendMessage({ action: 'getSettings' });

        if (settings) {
            strictnessSelect.value = settings.strictness || 'standard';
            const hasPin = !!settings.pinHash;
            const isLocked = settings.isLocked;

            updateUI(hasPin, isLocked);
        }
    }

    function updateUI(hasPin, isLocked) {
        if (!hasPin) {
            // Setup Mode needed
            lockBtn.style.display = 'none';
            showPinModal('setup');
        } else if (isLocked) {
            // Locked Mode
            lockBtn.style.display = 'none';
            controlsArea.style.opacity = '0.5';
            controlsArea.style.pointerEvents = 'none';
            showPinModal('unlock');
        } else {
            // Unlocked Mode
            lockBtn.style.display = 'block';
            controlsArea.style.opacity = '1';
            controlsArea.style.pointerEvents = 'auto';
            pinModal.style.display = 'none';
            lockBtn.textContent = '🔒';
        }
    }

    // --- Modal Logic ---
    function showPinModal(mode) {
        currentMode = mode;
        pinModal.style.display = 'flex';
        pinInput.value = '';
        pinError.style.display = 'none';

        if (mode === 'setup') {
            modalTitle.textContent = 'Set Parental PIN';
            modalDesc.textContent = 'Create a PIN to protect settings';
            pinConfirm.textContent = 'Set PIN';
            pinCancel.style.display = 'none'; // Cannot cancel setup on first run if we want to enforce? Or make optional.
            // Let's make it optional but recommended. For now, assume mandatory to enable feature.
            // Actually, if they close popup, they can browse but not change settings?
        } else if (mode === 'unlock') {
            modalTitle.textContent = 'Locked';
            modalDesc.textContent = 'Enter PIN to unlock settings';
            pinConfirm.textContent = 'Unlock';
            pinCancel.style.display = 'none'; // Can't cancel unlock overlay if we want to block access
        }

        pinInput.focus();
    }

    async function handlePinSubmit() {
        const pin = pinInput.value;
        if (pin.length < 4) {
            showError('PIN must be at least 4 digits');
            return;
        }

        if (currentMode === 'setup') {
            await chrome.runtime.sendMessage({ action: 'setPin', pin });
            loadState();
        } else if (currentMode === 'unlock') {
            const response = await chrome.runtime.sendMessage({ action: 'checkPin', pin });
            if (response.valid) {
                await chrome.runtime.sendMessage({ action: 'setLockState', locked: false });
                loadState();
            } else {
                showError('Incorrect PIN');
            }
        }
    }

    function showError(msg) {
        pinError.textContent = msg;
        pinError.style.display = 'block';
        pinInput.value = '';
    }

    // --- Event Listeners ---

    pinConfirm.addEventListener('click', handlePinSubmit);

    pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handlePinSubmit();
    });

    lockBtn.addEventListener('click', async () => {
        await chrome.runtime.sendMessage({ action: 'setLockState', locked: true });
        loadState();
    });

    strictnessSelect.addEventListener('change', async (e) => {
        const value = e.target.value;
        const result = await chrome.runtime.sendMessage({ action: 'updateStrictness', value });
        if (!result.success) {
            // Should be caught by UI state, but just in case
            alert(result.error);
            loadState(); // Revert UI
        }
    });

    optionsBtn.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });

    // Initialize
    loadState();
});
