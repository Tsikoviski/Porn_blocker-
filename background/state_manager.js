export class StateManager {
    static DEFAULT_SETTINGS = {
        strictness: 'standard', // 'low', 'standard', 'strict'
        whitelist: [],
        notificationsEnabled: true
    };

    static async initializeWithDefaults() {
        const current = await chrome.storage.local.get(null);
        const newSettings = { ...this.DEFAULT_SETTINGS, ...current };
        await chrome.storage.local.set(newSettings);
    }

    static async getSettings() {
        return await chrome.storage.local.get(null);
    }

    static async updateStrictness(value) {
        await chrome.storage.local.set({ strictness: value });
        // In a full implementation, we might update dynamic DNR rules here
    }

    static async addToWhitelist(domain) {
        const { whitelist } = await this.getSettings();
        if (!whitelist.includes(domain)) {
            whitelist.push(domain);
            await chrome.storage.local.set({ whitelist });
        }
    }
}
