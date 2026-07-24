// AISettings.js
//
// Emma BYOAI Settings
//
// This file stores and retrieves the user's AI configuration.
//
// RULES:
// - Does NOT call any AI.
// - Does NOT make decisions.
// - Does NOT know about Emma.
// - Only manages configuration.



class AISettings {

    static STORAGE_KEY = "ai_settings";

    // =================================
    // SAVE
    // =================================

    static async save(settings = {}) {

        const config = {

            provider: settings.provider || "openai",

            model: settings.model || "gpt-5.5",

            apiKey: settings.apiKey || ""

        };

        await chrome.storage.local.set({

            [this.STORAGE_KEY]: config

        });

        console.log("💾 AI Settings Saved");

        return config;

    }

    // =================================
    // LOAD
    // =================================

    static async load() {

        const result =

            await chrome.storage.local.get(
                this.STORAGE_KEY
            );

        if (!result[this.STORAGE_KEY]) {

            return {

                provider: "openai",

                model: "gpt-5.5",

                apiKey: ""

            };

        }

        return result[this.STORAGE_KEY];

    }

    // =================================
    // UPDATE
    // =================================

    static async update(values = {}) {

        const current =
            await this.load();

        const updated = {

            ...current,

            ...values

        };

        await this.save(updated);

        return updated;

    }

    // =================================
    // CLEAR
    // =================================

    static async clear() {

        await chrome.storage.local.remove(

            this.STORAGE_KEY

        );

        console.log(
            "🗑️ AI Settings Cleared"
        );

    }

    // =================================
    // PROVIDER
    // =================================

    static async getProvider() {

        const settings =
            await this.load();

        return settings.provider;

    }

    // =================================
    // MODEL
    // =================================

    static async getModel() {

        const settings =
            await this.load();

        return settings.model;

    }

    // =================================
    // API KEY
    // =================================

    static async getApiKey() {

        const settings =
            await this.load();

        return settings.apiKey;

    }

    // =================================
    // VALIDATION
    // =================================

    static async isConfigured() {

        const settings =
            await this.load();

        return (

            settings.provider &&
            settings.model &&
            settings.apiKey &&
            settings.apiKey.trim().length > 0

        );

    }

}

export default AISettings;