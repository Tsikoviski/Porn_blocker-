document.addEventListener('DOMContentLoaded', async () => {
    const whitelistArea = document.getElementById('whitelist');
    const saveBtn = document.getElementById('save');
    const msg = document.getElementById('msg');

    // Load
    const settings = await chrome.runtime.sendMessage({ action: 'getSettings' });
    if (settings && settings.whitelist) {
        whitelistArea.value = settings.whitelist.join('\n');
    }

    // Save
    saveBtn.addEventListener('click', async () => {
        const domains = whitelistArea.value.split('\n').map(d => d.trim()).filter(d => d);
        await chrome.storage.local.set({ whitelist: domains });

        msg.style.display = 'inline';
        setTimeout(() => { msg.style.display = 'none'; }, 2000);
    });
});
