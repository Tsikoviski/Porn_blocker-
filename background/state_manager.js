export class StateManager {
    static DEFAULT_SETTINGS = {
        strictness: 'standard', // 'low', 'standard', 'strict'
        whitelist: [],
        notificationsEnabled: true,
        pinHash: null,
        isLocked: true // Default to locked if PIN is set
    };

    static async initializeWithDefaults() {
        const current = await chrome.storage.local.get(null);
        // Ensure new defaults are applied to existing settings
        const newSettings = { ...this.DEFAULT_SETTINGS, ...current };
        // If no PIN is set, isLocked should be false initially (until setup)
        if (!newSettings.pinHash) {
            newSettings.isLocked = false;
        }
        await chrome.storage.local.set(newSettings);
    }

    static async getSettings() {
        return await chrome.storage.local.get(null);
    }

    static async updateStrictness(value) {
        const settings = await this.getSettings();
        if (settings.isLocked && settings.pinHash) {
            throw new Error('Settings are locked');
        }
        await chrome.storage.local.set({ strictness: value });
        // In a full implementation, we might update dynamic DNR rules here
    }

    static async addToWhitelist(domain) {
        const settings = await this.getSettings();
        if (settings.isLocked && settings.pinHash) {
            throw new Error('Settings are locked');
        }

        const { whitelist } = settings;
        if (!whitelist.includes(domain)) {
            whitelist.push(domain);
            await chrome.storage.local.set({ whitelist });
        }
    }

    static async setPin(pin) {
        const hash = await this.hashPin(pin);
        await chrome.storage.local.set({ pinHash: hash, isLocked: false });
    }

    static async checkPin(pin) {
        const settings = await this.getSettings();
        if (!settings.pinHash) return true; // No PIN set

        const hash = await this.hashPin(pin);
        return hash === settings.pinHash;
    }

    static async setLockState(locked) {
        await chrome.storage.local.set({ isLocked: locked });
    }

    // Simple SHA-256 hash
    static async hashPin(pin) {
        const msgBuffer = new TextEncoder().encode(pin);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
}
