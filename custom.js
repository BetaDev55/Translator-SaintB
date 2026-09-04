// ============================================
// Translator SaintB Legcord - v3.2
// Bugfix: Composer, Send, Toolbar buttons
// ============================================

(function() {
    // Función para inyectar CSS cuando el DOM esté listo
    function injectStyles() {
        try {
            const tpStyles = document.createElement("style");
            tpStyles.id = "translatorplus-styles";
            tpStyles.textContent = `
                /* Translator SaintB Icons */
                .tp-icon-languages {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                .tp-icon-languages svg {
                    width: 16px;
                    height: 16px;
                }

                /* Botones Translator SaintB */
                .tp-composer-btn, .tp-msg-translate-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    color: #b5bac1;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }
                .tp-composer-btn:hover, .tp-msg-translate-btn:hover {
                    background: linear-gradient(135deg, rgba(88, 101, 242, 0.3) 0%, rgba(114, 137, 218, 0.3) 100%);
                    color: #7289da;
                    transform: scale(1.15);
                    box-shadow: 0 0 12px rgba(88, 101, 242, 0.4);
                }
                .tp-composer-btn:hover svg, .tp-msg-translate-btn:hover svg {
                    animation: tp-icon-bounce 0.5s ease infinite;
                }
                .tp-composer-btn:hover svg text, .tp-msg-translate-btn:hover svg text {
                    fill: #7289da;
                }
                .tp-composer-btn:active, .tp-msg-translate-btn:active {
                    transform: scale(0.95);
                }
                .tp-composer-btn svg text, .tp-msg-translate-btn svg text {
                    fill: currentColor;
                    transition: fill 0.2s ease;
                }
                .tp-composer-btn {
                    font-size: 16px;
                    padding: 6px 8px;
                    margin-right: 4px;
                }
                .tp-msg-translate-btn {
                    font-size: 14px;
                    padding: 6px;
                }
                
                @keyframes tp-icon-bounce {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    25% { transform: translateY(-2px) rotate(-5deg); }
                    75% { transform: translateY(1px) rotate(5deg); }
                }

                /* Settings Modal */
                .tp-settings-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: tp-fade-in 0.2s ease;
                }
                .tp-settings-content {
                    background: linear-gradient(180deg, #2a2d32 0%, #1e1f22 100%);
                    border-radius: 16px;
                    padding: 0;
                    min-width: 440px;
                    max-width: 480px;
                    width: 100%;
                    box-shadow: 
                        0 24px 48px rgba(0, 0, 0, 0.5),
                        0 0 0 1px rgba(255, 255, 255, 0.05),
                        inset 0 1px 0 rgba(255, 255, 255, 0.05);
                    overflow: hidden;
                    animation: tp-slide-in 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .tp-settings-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 24px;
                    background: linear-gradient(180deg, rgba(88, 101, 242, 0.1) 0%, transparent 100%);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .tp-settings-header-left {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                .tp-settings-header-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #5865f2 0%, #4752c4 100%);
                    color: #fff;
                    box-shadow: 0 4px 12px rgba(88, 101, 242, 0.4);
                }
                .tp-settings-title-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                .tp-settings-title {
                    font-size: 17px;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: -0.01em;
                }
                .tp-settings-subtitle {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 15px;
                    font-weight: 600;
                    color: #b5c2f8;
                    text-shadow: 0 0 12px rgba(88, 101, 242, 0.4);
                    max-width: 280px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .tp-server-icon {
                    display: inline-flex;
                    align-items: center;
                    color: #7289da;
                    flex-shrink: 0;
                }
                .tp-settings-close {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 8px;
                    color: #8e9297;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.15s ease;
                }
                .tp-settings-close:hover {
                    background: rgba(240, 71, 71, 0.15);
                    color: #f04747;
                }
                .tp-settings-section {
                    padding: 20px 24px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                }
                .tp-settings-section:last-child {
                    border-bottom: none;
                }
                .tp-settings-section-title {
                    font-size: 11px;
                    font-weight: 700;
                    color: #72767d;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .tp-settings-section-title::before {
                    content: '';
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: #5865f2;
                }
                .tp-settings-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 14px;
                    margin: 0 -14px;
                    border-radius: 8px;
                    transition: background 0.15s ease;
                }
                .tp-settings-row:hover {
                    background: rgba(255, 255, 255, 0.03);
                }
                .tp-settings-label {
                    font-size: 14px;
                    font-weight: 500;
                    color: #dbdee1;
                }
                
                /* Toggle Switch - Modern Style */
                .tp-toggle {
                    position: relative;
                    width: 44px;
                    height: 24px;
                    background: #4f545c;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    border: none;
                    outline: none;
                }
                .tp-toggle.on {
                    background: linear-gradient(135deg, #5865f2 0%, #4752c4 100%);
                    box-shadow: 0 2px 8px rgba(88, 101, 242, 0.4);
                }
                .tp-toggle input[type="checkbox"] {
                    position: absolute;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    margin: 0;
                    top: 0;
                    left: 0;
                    z-index: 1;
                }
                .tp-toggle-thumb {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    width: 18px;
                    height: 18px;
                    background: #fff;
                    border-radius: 50%;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
                .tp-toggle.on .tp-toggle-thumb {
                    transform: translateX(20px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                }
                
                /* Custom Dropdown - Discord Style */
                .tp-select-wrap {
                    position: relative;
                    display: inline-flex;
                }
                .tp-select-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(180deg, #2f3136 0%, #28292d 100%);
                    border: 1px solid #36393f;
                    border-radius: 6px;
                    padding: 8px 32px 8px 12px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #fff;
                    cursor: pointer;
                    outline: none;
                    transition: all 0.15s ease;
                    min-width: 120px;
                    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06) inset;
                    font-family: inherit;
                }
                .tp-select-btn:hover {
                    border-color: #5865f2;
                    background: linear-gradient(180deg, #36393f 0%, #2f3136 100%);
                }
                .tp-select-btn:focus {
                    border-color: #5865f2;
                    box-shadow: 0 0 0 3px rgba(88, 101, 242, 0.25);
                }
                .tp-select-value {
                    flex: 1;
                    text-align: left;
                }
                .tp-select-arrow {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    color: #8e9297;
                    transition: color 0.15s ease;
                }
                .tp-select-wrap:hover .tp-select-arrow {
                    color: #5865f2;
                }
                
                /* Dropdown Menu */
                .tp-dropdown {
                    position: absolute;
                    top: calc(100% + 4px);
                    left: 0;
                    right: 0;
                    background: linear-gradient(180deg, #2f3136 0%, #28292d 100%);
                    border: 1px solid #36393f;
                    border-radius: 8px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
                    z-index: 1000;
                    overflow: hidden;
                    padding: 4px 0;
                    min-width: 100%;
                }
                .tp-dropdown-option {
                    padding: 10px 12px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #b5bac1;
                    cursor: pointer;
                    transition: all 0.1s ease;
                    margin: 0 4px;
                    border-radius: 4px;
                }
                .tp-dropdown-option:hover {
                    background: rgba(88, 101, 242, 0.2);
                    color: #fff;
                }
                .tp-dropdown-option.selected {
                    background: rgba(88, 101, 242, 0.3);
                    color: #dee0fc;
                }
                
                /* Animations */
                @keyframes tp-fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes tp-slide-in {
                    from { opacity: 0; transform: scale(0.95) translateY(-20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                
                /* Translation Animation - Word by Word */
                .tp-translation {
                    margin-top: 4px;
                    padding-left: 8px;
                    border-left: 2px solid #5865f2;
                }
                .tp-translated-main {
                    color: #fff;
                    font-size: 1.05em;
                    font-weight: 600;
                    margin-bottom: 3px;
                    text-shadow: 0 0 10px rgba(88, 101, 242, 0.4);
                }
                .tp-original-quoted {
                    font-style: italic;
                    font-size: 0.85em;
                    color: #8e9297;
                }
                .tp-word {
                    display: inline;
                    opacity: 0;
                    color: #7289da;
                    animation: tp-word-appear 0.3s ease forwards;
                }
                @keyframes tp-word-appear {
                    0% {
                        opacity: 0;
                        color: #7289da;
                        text-shadow: 0 0 12px rgba(114, 137, 218, 0.9);
                    }
                    50% {
                        color: #7289da;
                        text-shadow: 0 0 12px rgba(114, 137, 218, 0.7);
                    }
                    100% {
                        opacity: 1;
                        color: #fff;
                        text-shadow: 0 0 10px rgba(88, 101, 242, 0.4);
                    }
                }
                
                /* Scrollbar personalizada */
                .tp-settings-content::-webkit-scrollbar {
                    width: 8px;
                }
                .tp-settings-content::-webkit-scrollbar-track {
                    background: transparent;
                }
                .tp-settings-content::-webkit-scrollbar-thumb {
                    background: #36393f;
                    border-radius: 4px;
                }
                .tp-settings-content::-webkit-scrollbar-thumb:hover {
                    background: #4f545c;
                }
            `;
            (document.head || document.documentElement).appendChild(tpStyles);
            console.log("[Translator SaintB] CSS inyectado correctamente");
        } catch(e) {
            console.error("[Translator SaintB] Error al inyectar CSS:", e.message);
        }
    }

    // Intentar inyectar inmediatamente o esperar al DOM
    if (document.head || document.documentElement) {
        injectStyles();
    } else {
        document.addEventListener('DOMContentLoaded', injectStyles);
    }

    console.log("[Translator SaintB] Iniciando v3.2...");

    // ==================== ESTADO ====================
    const state = {
        settings: {
            defaultReceived: {
                inputLang: "auto",
                outputLang: "es",
                autoTranslate: false
            },
            defaultSent: {
                inputLang: "es",
                outputLang: "en",
                autoTranslate: true,
                translateBeforeSend: true
            }
        },
        channelSettings: {},
        // Persistencia con DataStore
        DATASTORE_KEY: "translatorplus-channel-settings",
        translationCache: new Map(),
        pendingOutgoingTranslations: new Map(), // Para animaciones de outgoing
        maxCacheSize: 1000,
        translateQueue: [],
        isProcessingQueue: false,
        lastTranslateTime: 0,
        translateThrottle: 300,
        FluxDispatcher: null,
        MessageActions: null,
        UserStore: null,
        GuildStore: null,
        MessageStore: null,
        activeChannelId: null,
        DataStore: null,
        uiLang: "en",
        uiTranslations: {},
        uiStringsTranslated: false
    };

    // Helper para obtener guildId actual desde la URL
    function getActiveGuildId() {
        // URL: /channels/{guildId}/{channelId}
        const match = window.location.pathname.match(/\/channels\/(\d+)\/\d+/);
        return match ? match[1] : null;
    }

    // ==================== UI STRINGS (i18n) ====================
    const uiStrings = {
        modalTitle: "Translator",
        receivedMessages: "RECEIVED MESSAGES",
        sentMessages: "SENT MESSAGES",
        autoTranslate: "Auto translate",
        translateBeforeSend: "Translate before sending",
        translateTo: "Translate to",
        messageLanguage: "Message language",
        close: "Close"
    };

    // Detectar idioma de Discord
    function detectDiscordLocale() {
        try {
            // Intentar DiscordLocale primero
            let discordLocale = window.DiscordLocale;
            
            // Intentar Vencord settings
            if (!discordLocale) {
                discordLocale = window.Vencord?.Settings?.settings?.locale;
            }
            
            // Fallback a navigator.language
            if (!discordLocale) {
                discordLocale = navigator.language;
            }
            
            if (discordLocale) {
                // Discord usa formatos como "en", "es-ES", "pt-BR"
                // Normalizar a código de 2 letras para Google Translate
                const lang = discordLocale.toLowerCase().split('-')[0].substring(0, 2);
                if (lang && lang.length === 2) {
                    return lang;
                }
            }
        } catch(e) {}
        return "en";
    }

    // Traducir todas las UI strings (una por una)
    async function translateUIStrings(targetLang) {
        if (targetLang === "en") {
            state.uiTranslations = { ...uiStrings };
            state.uiStringsTranslated = true;
            return;
        }

        // Ya traducidas?
        if (state.uiTranslations[targetLang]) {
            return;
        }

        const translatedObj = {};

        // Traducir cada string individualmente
        for (const key of Object.keys(uiStrings)) {
            try {
                const text = uiStrings[key];
                const url = "https://translate.googleapis.com/translate_a/single?" +
                    "client=gtx&sl=auto&tl=" + targetLang + "&dt=t&q=" + encodeURIComponent(text);

                const response = await fetch(url);
                if (!response.ok) throw new Error("HTTP " + response.status);
                const data = await response.json();

                if (data[0] && data[0][0] && data[0][0][0]) {
                    translatedObj[key] = data[0][0][0];
                } else {
                    translatedObj[key] = uiStrings[key];
                }
            } catch(e) {
                console.error("[Translator SaintB] Error translating UI string:", key, e.message);
                translatedObj[key] = uiStrings[key];
            }
        }

        state.uiTranslations[targetLang] = translatedObj;
        state.uiStringsTranslated = true;
        console.log("[Translator SaintB] UI strings translated to:", targetLang);
    }

    // Obtener string traducido
    function t(key) {
        if (state.uiLang === "en") return uiStrings[key] || key;
        return state.uiTranslations[state.uiLang]?.[key] || uiStrings[key] || key;
    }

    // ==================== LOGGING ====================
    function tpLog(action, msgId, data) {
        const prefix = "[Translator SaintB][" + action + "]";
        if (msgId) {
            console.log(prefix, "id=" + msgId, typeof data === 'object' ? JSON.stringify(data) : data);
        } else {
            console.log(prefix, typeof data === 'object' ? JSON.stringify(data) : data);
        }
    }

    // ==================== PERSISTENCIA CON DATASTORE ====================
    async function loadChannelSettings() {
        try {
            if (!state.DataStore) {
                state.DataStore = window.Vencord?.Api?.DataStore;
            }
            if (!state.DataStore) {
                tpLog("TP-CHANNEL-SETTINGS", null, { action: "DATASTORE_NOT_AVAILABLE" });
                return;
            }
            const data = await state.DataStore.get(state.DATASTORE_KEY);
            if (data && typeof data === 'object') {
                state.channelSettings = data;
                tpLog("TP-CHANNEL-SETTINGS", null, { action: "LOAD", channels: Object.keys(state.channelSettings).length });
            } else {
                tpLog("TP-CHANNEL-SETTINGS", null, { action: "NO_SAVED_DATA" });
            }
        } catch (err) {
            tpLog("TP-CHANNEL-SETTINGS", null, { action: "LOAD_ERROR", error: err.message });
        }
    }

    async function saveChannelSettings() {
        try {
            if (!state.DataStore) {
                state.DataStore = window.Vencord?.Api?.DataStore;
            }
            if (!state.DataStore) {
                tpLog("TP-CHANNEL-SETTINGS", null, { action: "DATASTORE_NOT_AVAILABLE" });
                return;
            }
            await state.DataStore.set(state.DATASTORE_KEY, state.channelSettings);
            tpLog("TP-CHANNEL-SETTINGS", null, { action: "SAVE", channels: Object.keys(state.channelSettings).length });
        } catch (err) {
            tpLog("TP-CHANNEL-SETTINGS", null, { action: "SAVE_ERROR", error: err.message });
        }
    }

    // Función para obtener configuración de un canal (síncrona, usa cache en memoria)
    function getChannelSettings(channelId) {
        if (!channelId) return state.settings;
        if (!state.channelSettings[channelId]) {
            state.channelSettings[channelId] = {
                received: { ...state.settings.defaultReceived },
                sent: { ...state.settings.defaultSent }
            };
        }
        return state.channelSettings[channelId];
    }

    // Función para guardar configuración de un canal (async)
    async function setChannelSettings(channelId, newSettings) {
        if (!channelId) return;
        const current = state.channelSettings[channelId] || {
            received: { ...state.settings.defaultReceived },
            sent: { ...state.settings.defaultSent }
        };
        state.channelSettings[channelId] = {
            received: { ...current.received, ...newSettings.received },
            sent: { ...current.sent, ...newSettings.sent }
        };
        await saveChannelSettings();
    }

    // Antigua función de localStorage (eliminada)
    function saveSettings() {
        // Ya no se usa - migrado a DataStore
    }

    function loadSettings() {
        // Ya no se usa - migrado a DataStore
    }

    function isLocalStorageAvailable() {
        return false; // Forzar uso de DataStore
    }

    // ==================== UTILIDADES ====================
    function getActiveChannelId() {
        // Normal channels: /channels/{guildId}/{channelId}
        const normalMatch = window.location.pathname.match(/\/channels\/\d+\/(\d+)/);
        if (normalMatch) return normalMatch[1];
        // DMs: /channels/@me/{userId}
        const dmMatch = window.location.pathname.match(/\/channels\/@me\/(\d+)/);
        if (dmMatch) return dmMatch[1];
        return null;
    }

    function getChannelSettings(channelId) {
        if (!channelId) return state.settings;
        if (!state.channelSettings[channelId]) {
            state.channelSettings[channelId] = {
                received: { ...state.settings.defaultReceived },
                sent: { ...state.settings.defaultSent }
            };
            // No guardar automáticamente - solo cuando el usuario cambia algo
        }
        return state.channelSettings[channelId];
    }

    function waitForVencord(callback, maxAttempts = 100) {
        let attempts = 0;
        const interval = setInterval(function() {
            attempts++;
            state.FluxDispatcher = window.Vencord?.Webpack?.Common?.FluxDispatcher;
            state.MessageActions = window.Vencord?.Webpack?.Common?.MessageActions;
            state.UserStore = window.Vencord?.Webpack?.Common?.UserStore;
            state.GuildStore = window.Vencord?.Webpack?.Common?.GuildStore;
            state.MessageStore = window.Vencord?.Webpack?.Common?.MessageStore;

            if (state.FluxDispatcher && state.MessageActions) {
                clearInterval(interval);
                callback();
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                console.error("[Translator SaintB] Vencord no cargó");
            }
        }, 100);
    }

    // ==================== API DE TRADUCCIÓN ====================
    async function translate(text, targetLang, sourceLang = "auto") {
        if (!text || !text.trim()) return null;

        const url = "https://translate.googleapis.com/translate_a/single?" +
            "client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURIComponent(text);

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("HTTP " + response.status);
            const data = await response.json();
            if (data && data[0]) {
                let translatedText = "";
                for (let i = 0; i < data[0].length; i++) {
                    translatedText += data[0][i][0];
                }
                return { text: translatedText, detectedLang: data[2] };
            }
            return null;
        } catch (err) {
            console.error("[Translator SaintB] Error translate:", err);
            return null;
        }
    }

    // ==================== COLA DE TRADUCCIÓN ====================
    function processQueue() {
        if (state.isProcessingQueue || state.translateQueue.length === 0) return;

        state.isProcessingQueue = true;
        const now = Date.now();
        const timeSinceLast = now - state.lastTranslateTime;
        const waitTime = timeSinceLast < state.translateThrottle ? state.translateThrottle - timeSinceLast : 0;

        setTimeout(function() {
            const item = state.translateQueue.shift();
            state.lastTranslateTime = Date.now();

            tpLog("QUEUE", item.msgId, { stage: "PROCESSING", remaining: state.translateQueue.length });

            translate(item.text, item.targetLang, item.sourceLang)
                .then(function(result) {
                    if (result && result.text) {
                        const cacheKey = item.cacheKey;
                        state.translationCache.set(cacheKey, {
                            original: item.text,
                            translated: result.text,
                            targetLang: item.targetLang
                        });
                        tpLog("CACHE", item.msgId, { action: "STORE", cacheKey: cacheKey });

                        if (item.msgEl && document.body.contains(item.msgEl)) {
                            showTranslation(item.msgEl, item.msgId, result.text, item.text);
                        }
                    }
                    state.isProcessingQueue = false;
                    processQueue();
                })
                .catch(function(err) {
                    tpLog("ERROR", item.msgId, { reason: err.message });
                    state.isProcessingQueue = false;
                    processQueue();
                });
        }, waitTime);
    }

    function enqueueTranslation(msgId, msgEl, text, targetLang, sourceLang, cacheKey) {
        if (state.translationCache.has(cacheKey)) {
            const cached = state.translationCache.get(cacheKey);
            tpLog("CACHE", msgId, { action: "HIT", cacheKey: cacheKey });
            if (document.body.contains(msgEl)) {
                showTranslation(msgEl, msgId, cached.translated, cached.original);
            }
            return;
        }

        tpLog("CACHE", msgId, { action: "MISS", cacheKey: cacheKey });

        state.translateQueue.push({
            msgId: msgId, msgEl: msgEl, text: text,
            targetLang: targetLang, sourceLang: sourceLang, cacheKey: cacheKey
        });

        tpLog("QUEUE", msgId, { stage: "ENQUEUED", queueLength: state.translateQueue.length });
        processQueue();
    }

    // ==================== RENDERIZADO ====================
    function showTranslation(msgEl, msgId, translatedText, originalText) {
        tpLog("RENDER", msgId, { stage: "START", originalText: originalText ? originalText.substring(0, 20) : null });
        let contentEl = null;
        const messageContentEl = msgEl.querySelector('.messageContent_c19a55');
        if (messageContentEl && !messageContentEl.classList.contains('repliedTextContent_c19a55')) {
            contentEl = messageContentEl;
        }
        if (!contentEl) {
            const allContentEls = msgEl.querySelectorAll('[class*="markup"]');
            for (const el of allContentEls) {
                if (el.closest('[class*="reply"]')) continue;
                if (el.closest('[class*="repliedTextContent"]')) continue;
                contentEl = el;
                break;
            }
        }
        if (!contentEl) {
            tpLog("RENDER", msgId, { stage: "NO_CONTENT_EL" });
            return;
        }

        tpLog("RENDER", msgId, { stage: "CONTENT_EL_FOUND" });

        const existingWrapper = msgEl.querySelector('.tp-translation');
        if (existingWrapper) existingWrapper.remove();

        // Ocultar el mensaje original de Discord
        contentEl.style.display = 'none';

        // Wrapper principal
        const wrapper = document.createElement("div");
        wrapper.className = "tp-translation";

        // Primera línea: traducción (protagonista) con animación
        const translatedEl = document.createElement("div");
        translatedEl.className = "tp-translated-main";
        const words = translatedText.split(' ');
        const wordCount = words.length;
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'tp-word';
            wordSpan.textContent = word + (index < wordCount - 1 ? ' ' : '');
            wordSpan.style.animationDelay = (index * 50) + 'ms';
            translatedEl.appendChild(wordSpan);
        });
        wrapper.appendChild(translatedEl);

        // Segunda línea: original citado (igual que antes la traducción)
        const originalEl = document.createElement("div");
        originalEl.className = "tp-original-quoted";
        originalEl.textContent = "> *" + (originalText || '') + "*";
        wrapper.appendChild(originalEl);

        const parent = contentEl.parentElement;
        if (parent) {
            parent.insertBefore(wrapper, contentEl.nextSibling);
            tpLog("RENDER", msgId, { stage: "INSERTED", parentClass: parent.className.substring(0, 30) });
        }
    }

    // ==================== CONFIGURACIÓN UI (MODAL) ====================
    function openSettingsModal(channelId) {
        const chSettings = getChannelSettings(channelId);

        const modal = document.createElement("div");
        modal.className = "tp-settings-modal";

        const content = document.createElement("div");
        content.className = "tp-settings-content";

        const header = document.createElement("div");
        header.className = "tp-settings-header";

        const headerLeft = document.createElement("div");
        headerLeft.className = "tp-settings-header-left";

        const headerIcon = document.createElement("span");
        headerIcon.className = "tp-settings-header-icon";
        headerIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-2"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`;

        const titleWrap = document.createElement("div");
        titleWrap.className = "tp-settings-title-wrap";

        const titleMain = document.createElement("span");
        titleMain.className = "tp-settings-title";
        titleMain.textContent = t("modalTitle");

        // Obtener nombre del servidor
        let serverName = "DM";
        let showServerIcon = false;
        const guildId = getActiveGuildId();
        if (guildId && state.GuildStore && state.GuildStore.getGuild) {
            const guild = state.GuildStore.getGuild(guildId);
            if (guild && guild.name) {
                serverName = guild.name;
                showServerIcon = true;
            }
        }

        const titleSub = document.createElement("div");
        titleSub.className = "tp-settings-subtitle";
        
        // Icono de servidor (antes del nombre)
        if (showServerIcon) {
            const serverIcon = document.createElement("span");
            serverIcon.className = "tp-server-icon";
            serverIcon.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
            titleSub.appendChild(serverIcon);
        }
        
        const serverNameEl = document.createElement("span");
        serverNameEl.textContent = serverName;
        titleSub.appendChild(serverNameEl);

        titleWrap.appendChild(titleMain);
        titleWrap.appendChild(titleSub);
        headerLeft.appendChild(headerIcon);
        headerLeft.appendChild(titleWrap);
        header.appendChild(headerLeft);

        const closeBtn = document.createElement("button");
        closeBtn.className = "tp-settings-close";
        closeBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        closeBtn.onclick = function() { modal.remove(); };
        header.appendChild(closeBtn);
        content.appendChild(header);

        const receivedSection = createSettingsSection(t("receivedMessages"), chSettings.received, "received", channelId);
        content.appendChild(receivedSection);

        const sentSection = createSettingsSection(t("sentMessages"), chSettings.sent, "sent", channelId);
        content.appendChild(sentSection);

        modal.appendChild(content);
        console.log("Translator SaintB: About to append modal to body. modal=", modal);
        console.log("Translator SaintB: modal content children=", content.children.length);
        document.body.appendChild(modal);
        console.log("Translator SaintB: Modal should be visible now!");

        modal.addEventListener("click", function(e) {
            if (e.target === modal) modal.remove();
        });
    }

    function createSettingsSection(title, settings, type, channelId) {
        const section = document.createElement("div");
        section.className = "tp-settings-section";

        const titleEl = document.createElement("div");
        titleEl.className = "tp-settings-section-title";
        titleEl.textContent = title;
        section.appendChild(titleEl);

        const autoRow = createToggleRow(t("autoTranslate"), settings.autoTranslate, async function(checked) {
            getChannelSettings(channelId)[type].autoTranslate = checked;
            await setChannelSettings(channelId, getChannelSettings(channelId));
        });
        section.appendChild(autoRow);

        if (type === "sent") {
            const beforeSendRow = createToggleRow(t("translateBeforeSend"), settings.translateBeforeSend, async function(checked) {
                getChannelSettings(channelId)[type].translateBeforeSend = checked;
                await setChannelSettings(channelId, getChannelSettings(channelId));
            });
            section.appendChild(beforeSendRow);
        }

        const outputRow = createSelectRow(t("translateTo"), settings.outputLang, ["es", "en", "ru", "pt", "fr", "de", "ja", "ko", "zh"], async function(value) {
            getChannelSettings(channelId)[type].outputLang = value;
            await setChannelSettings(channelId, getChannelSettings(channelId));
        });
        section.appendChild(outputRow);

        const inputRow = createSelectRow(t("messageLanguage"), settings.inputLang, ["auto", "es", "en", "ru", "pt", "fr", "de", "ja", "ko", "zh"], async function(value) {
            getChannelSettings(channelId)[type].inputLang = value;
            await setChannelSettings(channelId, getChannelSettings(channelId));
        });
        section.appendChild(inputRow);

        return section;
    }

    function createToggleRow(label, checked, onChange) {
        const row = document.createElement("div");
        row.className = "tp-settings-row";

        const labelEl = document.createElement("span");
        labelEl.className = "tp-settings-label";
        labelEl.textContent = label;

        const toggleWrapper = document.createElement("div");
        toggleWrapper.className = "tp-toggle" + (checked ? " on" : "");

        const toggleThumb = document.createElement("div");
        toggleThumb.className = "tp-toggle-thumb";

        const toggle = document.createElement("input");
        toggle.type = "checkbox";
        toggle.checked = checked;
        toggle.onchange = function() {
            const isChecked = toggle.checked;
            toggleWrapper.className = "tp-toggle" + (isChecked ? " on" : "");
            onChange(isChecked);
        };

        toggleWrapper.appendChild(toggleThumb);
        toggleWrapper.appendChild(toggle);
        row.appendChild(labelEl);
        row.appendChild(toggleWrapper);

        return row;
    }

    function createSelectRow(label, value, options, onChange) {
        const row = document.createElement("div");
        row.className = "tp-settings-row";

        const labelEl = document.createElement("span");
        labelEl.className = "tp-settings-label";
        labelEl.textContent = label;

        // Custom dropdown en lugar de <select> nativo
        const selectWrapper = document.createElement("div");
        selectWrapper.className = "tp-select-wrap";

        const selectBtn = document.createElement("button");
        selectBtn.className = "tp-select-btn";
        
        const selectValue = document.createElement("span");
        selectValue.className = "tp-select-value";
        selectValue.textContent = value === "auto" ? "Auto" : getLanguageName(value);
        
        const selectArrow = document.createElement("span");
        selectArrow.className = "tp-select-arrow";
        selectArrow.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        
        selectBtn.appendChild(selectValue);
        selectBtn.appendChild(selectArrow);
        selectWrapper.appendChild(selectBtn);

        // Dropdown menu
        const dropdown = document.createElement("div");
        dropdown.className = "tp-dropdown";
        dropdown.style.display = "none";

        options.forEach(function(opt) {
            const optEl = document.createElement("div");
            optEl.className = "tp-dropdown-option";
            optEl.dataset.value = opt;
            optEl.textContent = opt === "auto" ? "Auto" : getLanguageName(opt);
            if (opt === value) optEl.classList.add("selected");
            optEl.addEventListener("click", function(e) {
                e.stopPropagation();
                // Update selected
                dropdown.querySelectorAll(".tp-dropdown-option").forEach(o => o.classList.remove("selected"));
                optEl.classList.add("selected");
                selectValue.textContent = opt === "auto" ? "Auto" : getLanguageName(opt);
                dropdown.style.display = "none";
                onChange(opt);
            });
            dropdown.appendChild(optEl);
        });

        selectWrapper.appendChild(dropdown);

        // Toggle dropdown on click
        selectBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            const isOpen = dropdown.style.display === "block";
            dropdown.style.display = isOpen ? "none" : "block";
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function closeDropdown(e) {
            if (!selectWrapper.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });

        row.appendChild(labelEl);
        row.appendChild(selectWrapper);

        return row;
    }

    function getLanguageName(code) {
        const names = {
            "auto": "Auto", "es": "Español", "en": "English", "ru": "Русский",
            "pt": "Português", "fr": "Français", "de": "Deutsch", "ja": "日本語",
            "ko": "한국어", "zh": "中文"
        };
        return names[code] || code;
    }

    // ==================== BOTÓN EN EL COMPOSITOR ====================
    let composerObserver = null;
    const initializedComposers = new WeakSet();

    function addComposerButton() {
        tpLog("COMPOSER", null, { action: "INIT" });

        // Usar MutationObserver para detectar cuando aparece el compositor
        const observeComposer = function() {
            if (composerObserver) {
                composerObserver.disconnect();
            }

            composerObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    // Ignorar nodos de solo texto
                    if (mutation.target.nodeType === 3) return;

                    // Verificar si el nodo o sus hijos contienen botones del compositor
                    const container = findComposerContainer(mutation.target);
                    if (container && !hasComposerButton(container)) {
                        insertComposerButton(container);
                    }

                    // También verificar nodos añadidos directamente
                    if (mutation.addedNodes) {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType !== 1) return;

                            // Ignorar si el nodo añadido es nuestro propio botón
                            if (node.dataset?.translatorplusComposerButton) return;

                            const container = findComposerContainer(node);
                            if (container && !hasComposerButton(container)) {
                                insertComposerButton(container);
                            }

                            // Verificar hijos del nodo, ignorando nuestro botón
                            const children = node.querySelectorAll?.('[class*="channelTextArea"], [class*="chatInput"]');
                            if (children && children.length > 0) {
                                const parent = children[0].closest('[class*="channelTextArea"]') || children[0].closest('[class*="chatInput"]');
                                if (parent && !hasComposerButton(parent)) {
                                    insertComposerButton(parent);
                                }
                            }
                        });
                    }
                });
            });

            // Observar el elemento principal de Discord
            const mainElement = document.querySelector('#app') || document.body;
            composerObserver.observe(mainElement, { childList: true, subtree: true });
            tpLog("COMPOSER", null, { action: "OBSERVING", target: mainElement.className.substring(0, 30) });
        };

        // Intentar insertar inmediatamente si el compositor ya existe
        const tryImmediateInsert = function() {
            const containers = document.querySelectorAll('[class*="channelTextArea"], [class*="chatInput"], [class*="composer"]');
            tpLog("COMPOSER", null, { action: "TRY_IMMEDIATE", containersFound: containers.length });
            for (const c of containers) {
                const parent = c.closest('[class*="channelTextArea"]') || c.closest('[class*="chatInput"]') || c;
                if (parent && !hasComposerButton(parent)) {
                    insertComposerButton(parent);
                }
            }
        };

        observeComposer();
        tryImmediateInsert();
    }

    function hasComposerButton(container) {
        if (!container) return true;
        // Verificar marca data
        if (container.querySelector('[data-translatorplus-composer-button="true"]')) return true;
        // Verificar WeakSet
        if (initializedComposers.has(container)) return true;
        return false;
    }

    function findComposerContainer(element) {
        // Buscar el contenedor del compositor
        let current = element;
        while (current && current !== document.body) {
            const className = current.className || '';
            if (typeof className === 'string') {
                if (className.includes('channelTextArea') ||
                    className.includes('chatInput') ||
                    className.includes('composer') ||
                    className.includes('inputArea')) {
                    return current;
                }
            }
            current = current.parentElement;
        }
        return null;
    }

    function insertComposerButton(container) {
        if (!container || hasComposerButton(container)) {
            tpLog("COMPOSER", null, { action: "SKIPPED_ALREADY_EXISTS" });
            return;
        }

        tpLog("COMPOSER", null, {
            action: "COMPOSER_CONTAINER_FOUND",
            containerClass: container.className.substring(0, 60)
        });

        // Buscar el contenedor de botones derechos DENTRO del compositor
        // La estructura real es: .inner__74017 > .buttons__74017
        let buttonsContainer = container.querySelector('[class*="buttons__74017"]');

        if (!buttonsContainer) {
            // Fallback: buscar otros contenedores de botones conocidos
            buttonsContainer = container.querySelector('[class*="buttonsRight"]') ||
                           container.querySelector('[class*="actionButtons"]') ||
                           container.querySelector('[class*="toolbar"]');
        }

        if (!buttonsContainer) {
            tpLog("COMPOSER", null, { action: "BUTTONS_CONTAINER_NOT_FOUND" });
            return;
        }

        tpLog("COMPOSER", null, {
            action: "BUTTONS_CONTAINER_FOUND",
            buttonsContainerTag: buttonsContainer.tagName,
            buttonsContainerClass: buttonsContainer.className.substring(0, 60),
            childCount: buttonsContainer.children.length,
            childrenClasses: Array.from(buttonsContainer.children).slice(0, 5).map(c => c.className?.substring(0, 30)).join(', ')
        });

        tpLog("COMPOSER", null, {
            action: "INSERTING",
            targetClass: buttonsContainer.className.substring(0, 40)
        });

        // Crear botón con marca ANTES de insertar
        const btn = document.createElement("button");
        btn.className = "tp-composer-btn";
        btn.dataset.translatorplusComposerButton = "true";
        btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="1" y="15" font-size="14" font-weight="bold" fill="currentColor" font-family="sans-serif">A</text><text x="12" y="16" font-size="12" fill="currentColor" font-family="sans-serif">文</text></svg>`;
        btn.title = "Configurar Translator";
        btn.style.cssText = `
            background: transparent; border: none; cursor: pointer;
            padding: 6px 8px; margin-right: 4px;
            display: inline-flex; align-items: center; justify-content: center;
            border-radius: 4px; color: var(--interactive-normal, #b5bac1);
            transition: background 0.15s ease, color 0.15s ease;
        `;

        btn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Translator SaintB: COMPOSER BUTTON CLICKED");
            const channelId = getActiveChannelId();
            console.log("Translator SaintB: channelId=" + channelId + " path=" + window.location.pathname);
            if (channelId) {
                console.log("Translator SaintB: calling openSettingsModal");
                openSettingsModal(channelId);
            } else {
                console.log("Translator SaintB: no channelId");
            }
        }, true); // capture: true

        btn.addEventListener("mouseenter", function() { 
            btn.style.background = "var(--background-modifier-hover, rgba(79, 84, 92, 0.3))";
            btn.style.color = "var(--interactive-hover, #f2f3f5)";
        });
        btn.addEventListener("mouseleave", function() { 
            btn.style.background = "transparent";
            btn.style.color = "var(--interactive-normal, #b5bac1)";
        });

        // Insertar como PRIMER HIJO del contenedor de botones derechos (.buttons__74017)
        buttonsContainer.prepend(btn);
        console.log("Translator SaintB: Button prepended to", buttonsContainer.className);

        // Marcar en WeakSet DESPUÉS de insertar
        initializedComposers.add(container);

        tpLog("COMPOSER", null, { action: "INSERTED", position: "first" });

        // POST_INSERT_CHECK
        requestAnimationFrame(function() {
            const insertedBtn = buttonsContainer.querySelector('[data-translatorplus-composer-button="true"]');
            if (!insertedBtn) {
                tpLog("COMPOSER", null, { action: "REMOVED_AFTER_INSERT" });
                return;
            }

            const styles = window.getComputedStyle(insertedBtn);
            const rect = insertedBtn.getBoundingClientRect();

            tpLog("COMPOSER", null, {
                action: "POST_INSERT_CHECK",
                parentClass: buttonsContainer.className.substring(0, 40),
                display: styles.display,
                visibility: styles.visibility,
                opacity: styles.opacity,
                width: styles.width,
                height: styles.height,
                rectWidth: rect.width,
                rectHeight: rect.height,
                rectX: rect.x,
                rectY: rect.y,
                isConnected: insertedBtn.isConnected,
                firstChildInContainer: buttonsContainer.firstChild?.className?.substring(0, 40)
            });
        });
    }

    // ==================== BOTÓN EN LA TOOLBAR DE ACCIONES DEL MENSAJE ====================
    function addMessageTranslateButton(msgEl, msgId, channelId) {
        if (!msgEl) {
            tpLog("MSGBUTTON", msgId, { action: "SKIP", reason: "no element" });
            return;
        }

        // Buscar el toolbar de acciones: buttons__[hash] con aria-label conteniendo "Acciones"
        const actionToolbar = msgEl.querySelector('[aria-label*="Acciones"][role="group"]');

        if (!actionToolbar) {
            tpLog("MSGBUTTON", msgId, { action: "ACTION_TOOLBAR_NOT_RENDERED" });
            return;
        }

        // Dentro del toolbar está buttonsInner__[hash]
        const actionInner = actionToolbar.querySelector('[class*="buttonsInner__"]');

        if (!actionInner) {
            tpLog("MSGBUTTON", msgId, { action: "ACTION_INNER_NOT_FOUND" });
            return;
        }

        // Verificar si ya existe botón SOLO dentro del toolbar (no en reactions)
        const existingBtn = actionInner.querySelector('[data-translatorplus-message-button="true"]');
        if (existingBtn) {
            tpLog("TP-HOVER-INSERT", msgId, {
                toolbarFound: true,
                buttonsInnerFound: true,
                nativeButtonCount: actionInner.children.length - 1,
                translateButtonPresent: true
            });
            tpLog("MSGBUTTON", msgId, { action: "ALREADY_EXISTS_IN_TOOLBAR" });
            return;
        }

        tpLog("MSGBUTTON", msgId, { action: "ACTION_TOOLBAR_FOUND", toolbarClass: actionToolbar.className.substring(0, 40) });
        tpLog("MSGBUTTON", msgId, { action: "ACTION_INNER_FOUND", innerClass: actionInner.className.substring(0, 40) });
        tpLog("MSGBUTTON", msgId, { action: "INSERTING_IN_ACTION_TOOLBAR" });

        // Obtener si el mensaje es un reply ANTES de crear el botón
        let isReply = false;
        if (state.MessageStore && channelId && msgId) {
            const msgObj = state.MessageStore.getMessage(channelId, msgId);
            isReply = !!msgObj?.messageReference;
        }

        // Crear botón con marca ANTES de insertar
        const btn = document.createElement("button");
        btn.className = "tp-msg-translate-btn";
        btn.dataset.translatorplusMessageButton = "true";
        btn.dataset.tpChannelId = channelId;
        btn.dataset.tpMessageId = msgId;
        btn.dataset.tpIsReply = isReply ? "true" : "false";
        btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="1" y="15" font-size="14" font-weight="bold" fill="currentColor" font-family="sans-serif">A</text><text x="12" y="16" font-size="12" fill="currentColor" font-family="sans-serif">文</text></svg>`;
        btn.title = "Translate";
        btn.style.cssText = `
            background: transparent; border: none; cursor: pointer;
            padding: 6px; display: flex; align-items: center; justify-content: center;
            border-radius: 4px; color: var(--interactive-normal, #b5bac1);
            transition: background 0.15s ease, color 0.15s ease;
        `;

        // Handler con capture phase para evitar que React lo intercepte
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            const btnChannelId = btn.dataset.tpChannelId;
            const btnMessageId = btn.dataset.tpMessageId;
            const btnIsReply = btn.dataset.tpIsReply === "true";

            tpLog("TP-REPLY-DEBUG", btnMessageId, {
                action: "CLICK",
                channelId: btnChannelId,
                messageId: btnMessageId,
                buttonClass: btn.className,
                isReply: btnIsReply
            });

            // Obtener mensaje usando los IDs guardados
            const message = state.MessageStore?.getMessage(btnChannelId, btnMessageId);

            tpLog("TP-REPLY-DEBUG", btnMessageId, {
                action: "MESSAGE",
                found: !!message,
                messageId: message?.id,
                content: message?.content ?? null,
                isReply: !!message?.messageReference,
                referencedMessageId: message?.messageReference?.messageId ?? null
            });

            // Obtener el elemento del mensaje para render
            const msgElement = document.querySelector(`[data-list-item-id*="${btnMessageId}"]`);

            tpLog("TP-REPLY-PIPELINE", btnMessageId, {
                channelId: btnChannelId,
                messageId: btnMessageId,
                isReply: !!message?.messageReference,
                translatingCurrentMessage: true
            });

            // Usar la función existente con los IDs correctos
            translateSingleMessage(btnMessageId, btnChannelId, msgElement);
        }, true); // capture: true

        btn.addEventListener("mouseenter", function() { 
            btn.style.background = "var(--background-modifier-hover, rgba(79, 84, 92, 0.3))";
            btn.style.color = "var(--interactive-hover, #f2f3f5)";
        });
        btn.addEventListener("mouseleave", function() { 
            btn.style.background = "transparent";
            btn.style.color = "var(--interactive-normal, #b5bac1)";
        });

        // Buscar si hay botón de regalo para insertar antes de él
        const giftBtn = actionInner.querySelector('[class*="giftInput"]') ||
                        actionInner.querySelector('[aria-label*="gift" i]') ||
                        actionInner.querySelector('[class*="appLauncher"]');

        if (giftBtn) {
            giftBtn.before(btn);
            tpLog("MSGBUTTON", msgId, { action: "INSERTED_IN_ACTION_TOOLBAR", position: "before_gift" });
        } else {
            actionInner.prepend(btn);
            tpLog("MSGBUTTON", msgId, { action: "INSERTED_IN_ACTION_TOOLBAR", position: "prepend" });
        }

        // Log final de confirmación
        tpLog("TP-HOVER-INSERT", msgId, {
            toolbarFound: true,
            buttonsInnerFound: true,
            nativeButtonCount: actionInner.children.length - 1,
            translateButtonPresent: true
        });

        // POST_INSERT_CHECK: verificar posición y visibilidad
        requestAnimationFrame(function() {
            const btnCheck = actionInner.querySelector('[data-translatorplus-message-button="true"]');
            if (!btnCheck) {
                tpLog("MSGBUTTON", msgId, { action: "REMOVED_BY_HOST_RENDER" });
                return;
            }

            const styles = window.getComputedStyle(btnCheck);
            const rect = btnCheck.getBoundingClientRect();
            const parent = btnCheck.parentElement;

            tpLog("MSGBUTTON", msgId, {
                action: "POST_INSERT_CHECK",
                parentTag: parent?.tagName,
                parentClass: parent?.className?.substring(0, 40),
                indexInParent: Array.from(parent?.children || []).indexOf(btnCheck),
                childCount: parent?.children?.length,
                firstChildClass: parent?.firstChild?.className?.substring(0, 40),
                nextSiblingClass: btnCheck.nextSibling?.className?.substring(0, 40),
                display: styles.display,
                visibility: styles.visibility,
                opacity: styles.opacity,
                width: styles.width,
                height: styles.height,
                rectWidth: Math.round(rect.width),
                rectHeight: Math.round(rect.height),
                rectX: Math.round(rect.x),
                rectY: Math.round(rect.y),
                isConnected: btnCheck.isConnected
            });

            if (btnCheck.isConnected && rect.width > 0 && rect.height > 0) {
                tpLog("MSGBUTTON", msgId, { action: "PERSISTED_AFTER_RENDER" });
            } else if (btnCheck.isConnected && (rect.width === 0 || rect.height === 0)) {
                tpLog("MSGBUTTON", msgId, { action: "INVISIBLE_DIMENSIONS", rectWidth: rect.width, rectHeight: rect.height });
            }
        });
    }

    // ==================== BOTÓN EN REACCIONES DEL MENSAJE ====================
    function addMessageTranslateButtonToReactions(msgEl, msgId, channelId) {
        if (!msgEl) {
            tpLog("MSGBUTTON][REACTIONS", msgId, { action: "SKIP", reason: "no element" });
            return;
        }

        // Buscar el contenedor de reacciones
        const reactionsContainer = msgEl.querySelector('[class*="reactions__"]');

        if (!reactionsContainer) {
            tpLog("MSGBUTTON][REACTIONS", msgId, { action: "CONTAINER_NOT_FOUND" });
            return;
        }

        // Verificar si ya existe botón en reactions (no en todo msgEl)
        if (reactionsContainer.querySelector('[data-translatorplus-message-button="true"]')) {
            tpLog("MSGBUTTON][REACTIONS", msgId, { action: "ALREADY_EXISTS" });
            return;
        }

        tpLog("MSGBUTTON][REACTIONS", msgId, { action: "CONTAINER_FOUND", containerClass: reactionsContainer.className.substring(0, 40) });

        // Obtener si el mensaje es un reply
        let isReply = false;
        if (state.MessageStore && channelId && msgId) {
            const msgObj = state.MessageStore.getMessage(channelId, msgId);
            isReply = !!msgObj?.messageReference;
        }

        // Crear botón
        const btn = document.createElement("button");
        btn.className = "tp-msg-translate-btn";
        btn.dataset.translatorplusMessageButton = "true";
        btn.dataset.tpChannelId = channelId;
        btn.dataset.tpMessageId = msgId;
        btn.dataset.tpIsReply = isReply ? "true" : "false";
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="1" y="15" font-size="14" font-weight="bold" fill="currentColor" font-family="sans-serif">A</text><text x="12" y="16" font-size="12" fill="currentColor" font-family="sans-serif">文</text></svg>`;
        btn.title = "Translate";
        btn.style.cssText = `
            background: transparent; border: none; cursor: pointer;
            padding: 4px; display: flex; align-items: center; justify-content: center;
            border-radius: 4px; color: var(--interactive-normal, #b5bac1);
            transition: background 0.15s ease, color 0.15s ease;
        `;

        btn.addEventListener("mouseenter", function() { 
            btn.style.background = "var(--background-modifier-hover, rgba(79, 84, 92, 0.3))";
            btn.style.color = "var(--interactive-hover, #f2f3f5)";
        });
        btn.addEventListener("mouseleave", function() { 
            btn.style.background = "transparent";
            btn.style.color = "var(--interactive-normal, #b5bac1)";
        });

        // Mismo handler que el de la barra de acciones (con capture: true)
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            const btnChannelId = btn.dataset.tpChannelId;
            const btnMessageId = btn.dataset.tpMessageId;
            const btnIsReply = btn.dataset.tpIsReply === "true";

            tpLog("TP-REPLY-DEBUG", btnMessageId, {
                action: "CLICK",
                channelId: btnChannelId,
                messageId: btnMessageId,
                buttonClass: btn.className,
                isReply: btnIsReply
            });

            const message = state.MessageStore?.getMessage(btnChannelId, btnMessageId);

            tpLog("TP-REPLY-DEBUG", btnMessageId, {
                action: "MESSAGE",
                found: !!message,
                messageId: message?.id,
                content: message?.content ?? null,
                isReply: !!message?.messageReference,
                referencedMessageId: message?.messageReference?.messageId ?? null
            });

            const msgElement = document.querySelector(`[data-list-item-id*="${btnMessageId}"]`);

            tpLog("TP-REPLY-PIPELINE", btnMessageId, {
                channelId: btnChannelId,
                messageId: btnMessageId,
                isReply: !!message?.messageReference,
                translatingCurrentMessage: true
            });

            translateSingleMessage(btnMessageId, btnChannelId, msgElement);
        }, true); // capture: true

        btn.addEventListener("mouseenter", function() { 
            btn.style.background = "var(--background-modifier-hover, rgba(79, 84, 92, 0.3))";
            btn.style.color = "var(--interactive-hover, #f2f3f5)";
        });
        btn.addEventListener("mouseleave", function() { 
            btn.style.background = "transparent";
            btn.style.color = "var(--interactive-normal, #b5bac1)";
        });

        reactionsContainer.prepend(btn);
        tpLog("MSGBUTTON][REACTIONS", msgId, { action: "INSERTING" });
        tpLog("MSGBUTTON][REACTIONS", msgId, { action: "INSERTED" });

        // POST_INSERT_CHECK
        requestAnimationFrame(function() {
            const btnCheck = reactionsContainer.querySelector('[data-translatorplus-message-button="true"]');
            if (!btnCheck) {
                tpLog("MSGBUTTON][REACTIONS", msgId, { action: "REMOVED_BY_HOST_RENDER" });
                return;
            }
            const rect = btnCheck.getBoundingClientRect();
            const parent = btnCheck.parentElement;
            tpLog("MSGBUTTON][REACTIONS", msgId, {
                action: "POST_INSERT_CHECK",
                parentClass: parent?.className?.substring(0, 40),
                isConnected: btnCheck.isConnected,
                rectWidth: Math.round(rect.width),
                rectHeight: Math.round(rect.height)
            });
        });
    }

    function translateSingleMessage(msgId, channelId, msgEl) {
        tpLog("TRANSLATE_MSG", msgId, { channelId: channelId });

        let messageObj = null;
        let text = "";

        if (state.MessageStore && channelId && msgId) {
            messageObj = state.MessageStore.getMessage(channelId, msgId);
        }

        // =============================================
        // DIAGNÓSTICO TP-REPLY-CHECK
        // =============================================
        tpLog("TP-REPLY-CHECK", msgId, {
            channelId: channelId,
            isReply: !!messageObj?.messageReference,
            referencedMessageId: messageObj?.messageReference?.messageId ?? null,
            content: messageObj?.content ?? null,
            contentLength: messageObj?.content?.length ?? 0,
            messageObjExists: !!messageObj
        });
        // =============================================

        if (messageObj && messageObj.content) {
            text = messageObj.content;
        } else if (msgEl) {
            const contentEl = msgEl.querySelector('.messageContent_c19a55');
            if (contentEl && !contentEl.classList.contains('repliedTextContent_c19a55')) {
                text = contentEl.textContent?.trim() || "";
            }
        }

        if (!text) {
            tpLog("TRANSLATE_MSG", msgId, { reason: "NO_TEXT" });
            return;
        }

        const chSettings = getChannelSettings(channelId);
        const cacheKey = channelId + ":" + msgId + ":" + chSettings.received.outputLang;

        enqueueTranslation(msgId, msgEl, text, chSettings.received.outputLang, chSettings.received.inputLang, cacheKey);
    }

    // ==================== OUTGOING: INTERCEPTAR ENVÍO (CORREGIDO) ====================
    function patchSendMessage() {
        const MessageActions = state.MessageActions;
        if (!MessageActions) return;

        const originalSend = MessageActions.sendMessage.bind(MessageActions);

        // Wrapper async para permitir await
        async function patchedSend(channelId, message, ...args) {
            const chSettings = getChannelSettings(channelId);

            if (chSettings.sent.translateBeforeSend && chSettings.sent.autoTranslate && message?.content) {
                const originalContent = message.content;
                tpLog("OUTGOING", null, { stage: "TRANSLATING", original: originalContent.substring(0, 30) });

                try {
                    const result = await translate(originalContent, chSettings.sent.outputLang, chSettings.sent.inputLang);
                    if (result && result.text) {
                        // Construir el texto final: traducción BOLD primero, original citado
                        const finalText = "**" + result.text + "**\n> *" + originalContent + "*";
                        tpLog("OUTGOING", null, {
                            stage: "FINAL_TEXT",
                            finalText: finalText.substring(0, 50)
                        });

                        // Crear una copia del mensaje con el contenido final
                        const translatedMessage = { ...message, content: finalText };
                        return originalSend(channelId, translatedMessage, ...args);
                    }
                } catch (err) {
                    tpLog("OUTGOING", null, { stage: "ERROR", error: err.message });
                }

                // Si falla o no hay resultado, enviar original
                return originalSend(channelId, message, ...args);
            }

            return originalSend(channelId, message, ...args);
        }

        MessageActions.sendMessage = patchedSend;
        console.log("[Translator SaintB] SendMessage parcheado!");
    }

    // ==================== INCOMING: TRADUCCIÓN AUTOMÁTICA ====================
    function setupIncomingHandler() {
        state.FluxDispatcher.subscribe("MESSAGE_CREATE", function(data) {
            if (!data.message) return;

            const channelId = data.channelId;
            const msgId = data.message.id;
            const message = data.message;

            // Ignorar mensajes propios (outgoing se maneja en patchSendMessage)
            const currentUser = state.UserStore?.getCurrentUser?.();
            if (currentUser && message.author?.id === currentUser.id) {
                return;
            }

            const chSettings = getChannelSettings(channelId);
            if (!chSettings.received.autoTranslate) return;

            if (message.content) {
                const cacheKey = channelId + ":" + msgId + ":" + chSettings.received.outputLang;
                const msgEl = document.querySelector(`[data-list-item-id*="${msgId}"]`);

                enqueueTranslation(
                    msgId, msgEl, message.content,
                    chSettings.received.outputLang,
                    chSettings.received.inputLang,
                    cacheKey
                );
            }
        });
    }

    // ==================== TRADUCIR TODO LO VISIBLE ====================
    function translateAllVisible() {
        const channelId = getActiveChannelId();
        if (!channelId) return;

        const chSettings = getChannelSettings(channelId);
        const visibleMessages = document.querySelectorAll('[class*="messageListItem__"]');

        tpLog("BULK", null, { visibleCount: visibleMessages.length, channelId: channelId });

        visibleMessages.forEach(function(msgEl) {
            const listItemId = msgEl.dataset?.listItemId || '';
            const parts = listItemId.split('__');
            const msgId = parts[parts.length - 1];
            if (!msgId) return;

            const cacheKey = channelId + ":" + msgId + ":" + chSettings.received.outputLang;
            if (state.translationCache.has(cacheKey)) {
                const cached = state.translationCache.get(cacheKey);
                showTranslation(msgEl, msgId, cached.translated, cached.original);
                return;
            }

            let text = "";
            const contentEl = msgEl.querySelector('.messageContent_c19a55');
            if (contentEl && !contentEl.classList.contains('repliedTextContent_c19a55')) {
                text = contentEl.textContent?.trim() || "";
            }
            if (!text) return;

            enqueueTranslation(msgId, msgEl, text, chSettings.received.outputLang, chSettings.received.inputLang, cacheKey);
        });
    }

    // ==================== KEYBIND ====================
    function setupKeybind() {
        document.addEventListener("keydown", function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === "T") {
                e.preventDefault();
                translateAllVisible();
            }
        });
        console.log("[Translator SaintB] Keybind: Ctrl+Shift+T = Traducir todo lo visible");
    }

    // ==================== MESSAGE OBSERVER ====================
    let messageObserver = null;

    function setupMessageObserver() {
        tpLog("MSGOBSERVER", null, { action: "SETUP_START", url: window.location.pathname });
        if (messageObserver) {
            messageObserver.disconnect();
        }

        // Buscar el contenedor de mensajes con múltiples selectores
        const findChatContainer = function() {
            // Buscar por data-list-id que contenga chat-messages
            const byDataListId = document.querySelector('[data-list-id*="chat-messages"]');
            if (byDataListId) {
                return { el: byDataListId, method: "data-list-id" };
            }

            // Buscar por clase scrollerInner (Discord usa hash obfuscation)
            const scrollers = document.querySelectorAll('[class*="scrollerInner"]');
            for (const s of scrollers) {
                // Debe tener hijos que sean messageListItem
                if (s.querySelector('[class*="messageListItem"]')) {
                    return { el: s, method: "scrollerInner" };
                }
            }

            // Buscar por clase messagesContainer
            const messagesContainer = document.querySelector('[class*="messagesContainer"]');
            if (messagesContainer) {
                return { el: messagesContainer, method: "messagesContainer" };
            }

            // Buscar cualquier elemento que contenga mensajes
            const allElements = document.querySelectorAll('[class*="messageListItem"]');
            if (allElements.length > 0) {
                const parent = allElements[0].parentElement;
                if (parent) {
                    return { el: parent, method: "messageListItemParent" };
                }
            }

            return null;
        };

        messageObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType !== 1) return;

                    // Procesar el nodo directamente si es un mensaje
                    if (node.dataset?.listItemId?.includes('chat-messages')) {
                        tpLog("MSGOBSERVER", null, { action: "NODE_DETECTED", listItemId: node.dataset.listItemId.substring(0, 50) });
                        processMessageNode(node);
                    }

                    // O procesar mensajes dentro del nodo (filtrando dividers)
                    const messages = node.querySelectorAll?.('[data-list-item-id*="chat-messages"]');
                    if (messages && messages.length > 0) {
                        tpLog("MSGOBSERVER", null, { action: "BATCH_DETECTED", count: messages.length });
                        messages.forEach(function(msg) {
                            const listItemId = msg.dataset?.listItemId || '';
                            // Ignorar dividers
                            if (listItemId.includes('divider')) {
                                return;
                            }
                            processMessageNode(msg);
                        });
                    }

                    // Detectar si se añadió el contenedor de reacciones a un mensaje existente
                    if (node.classList?.contains('reactions__')) {
                        const msgListItem = node.closest('[data-list-item-id*="chat-messages"]');
                        if (msgListItem) {
                            const listItemId = msgListItem.dataset?.listItemId || '';
                            const parts = listItemId.split('__');
                            const msgId = parts[parts.length - 1];
                            const channelMatch = listItemId.match(/chat-messages-(\d+)-/);
                            const channelId = channelMatch ? channelMatch[1] : getActiveChannelId();
                            tpLog("MSGOBSERVER", null, { action: "REACTIONS_CONTAINER_APPEARED", listItemId: listItemId.substring(0, 50) });
                            addMessageTranslateButtonToReactions(msgListItem, msgId, channelId);
                        }
                    }

                    // Detectar si se añadió el toolbar de acciones (buttons__) a un mensaje existente
                    if (node.classList?.contains('buttons__') && node.getAttribute('aria-label')?.includes('Acciones')) {
                        const msgListItem = node.closest('[data-list-item-id*="chat-messages"]');
                        if (msgListItem) {
                            tpLog("MSGOBSERVER", null, { action: "ACTION_TOOLBAR_APPEARED", listItemId: msgListItem.dataset.listItemId?.substring(0, 50) });
                            processMessageNode(msgListItem);
                        }
                    }

                    // También verificar si hay action toolbars dentro de nodos añadidos
                    const actionToolbars = node.querySelectorAll?.('[aria-label*="Acciones"][role="group"]');
                    if (actionToolbars && actionToolbars.length > 0) {
                        actionToolbars.forEach(function(toolbar) {
                            const msgListItem = toolbar.closest('[data-list-item-id*="chat-messages"]');
                            if (msgListItem) {
                                tpLog("MSGOBSERVER", null, { action: "ACTION_TOOLBAR_APPEARED", listItemId: msgListItem.dataset.listItemId?.substring(0, 50) });
                                processMessageNode(msgListItem);
                            }
                        });
                    }

                    // También verificar si hay reactions containers dentro de nodos añadidos
                    const reactionsInNode = node.querySelectorAll?.('[class*="reactions__"]');
                    if (reactionsInNode && reactionsInNode.length > 0) {
                        reactionsInNode.forEach(function(reactionsEl) {
                            const msgListItem = reactionsEl.closest('[data-list-item-id*="chat-messages"]');
                            if (msgListItem) {
                                const listItemId = msgListItem.dataset?.listItemId || '';
                                const parts = listItemId.split('__');
                                const msgId = parts[parts.length - 1];
                                const channelMatch = listItemId.match(/chat-messages-(\d+)-/);
                                const channelId = channelMatch ? channelMatch[1] : getActiveChannelId();
                                tpLog("MSGOBSERVER", null, { action: "REACTIONS_CONTAINER_APPEARED", listItemId: listItemId.substring(0, 50) });
                                addMessageTranslateButtonToReactions(msgListItem, msgId, channelId);
                            }
                        });
                    }
                });
            });
        });

        const containerInfo = findChatContainer();

        if (containerInfo) {
            messageObserver.observe(containerInfo.el, { childList: true, subtree: true });
            tpLog("MSGOBSERVER", null, {
                action: "CONTAINER_FOUND",
                method: containerInfo.method,
                tagName: containerInfo.el.tagName,
                className: containerInfo.el.className.substring(0, 40),
                childCount: containerInfo.el.children.length
            });
            tpLog("MSGOBSERVER", null, { action: "OBSERVING" });

            // =============================================
            // INITIAL_SCAN: Procesar mensajes existentes
            // =============================================
            const existingMessages = containerInfo.el.querySelectorAll('[data-list-item-id*="chat-messages"]');
            tpLog("MSGOBSERVER", null, { action: "INITIAL_SCAN", count: existingMessages.length });

            existingMessages.forEach(function(msgEl) {
                const listItemId = msgEl.dataset?.listItemId || '';

                // Ignorar dividers (contienen "divider" en el listItemId)
                if (listItemId.includes('divider')) {
                    return;
                }

                const parts = listItemId.split('__');
                const msgId = parts[parts.length - 1];
                const channelMatch = listItemId.match(/chat-messages-(\d+)-/);
                const channelId = channelMatch ? channelMatch[1] : getActiveChannelId();

                tpLog("MSGOBSERVER", null, { action: "INITIAL_NODE", listItemId: listItemId.substring(0, 50) });

                // Toolbar de acciones (hover)
                processMessageNode(msgEl);

                // Contenedor de reacciones (permanente)
                addMessageTranslateButtonToReactions(msgEl, msgId, channelId);
            });

            // =============================================
            // DIAGNÓSTICO DE HOVER (solo para inspección)
            // =============================================
            containerInfo.el.addEventListener("pointerover", function(e) {
                const target = e.target.closest('[data-list-item-id*="chat-messages"]');
                if (!target) return;

                const listItemId = target.dataset.listItemId || '';
                if (listItemId.includes('divider')) return;

                const parts = listItemId.split('__');
                const msgId = parts[parts.length - 1];
                const channelMatch = listItemId.match(/chat-messages-(\d+)-/);
                const channelId = channelMatch ? channelMatch[1] : 'unknown';

                tpLog("MSGBUTTON", msgId, {
                    action: "HOVER_DIAGNOSTIC",
                    channelId: channelId,
                    listItemId: listItemId.substring(0, 60)
                });

                // Buscar TODOS los elementos con role="group" o que contengan botones
                const groups = target.querySelectorAll('[role="group"]');
                groups.forEach(function(group, i) {
                    const rect = group.getBoundingClientRect();
                    const styles = window.getComputedStyle(group);
                    tpLog("MSGBUTTON", msgId, {
                        action: "HOVER_CANDIDATE",
                        index: i,
                        role: "group",
                        class: group.className.substring(0, 50),
                        rectX: Math.round(rect.x),
                        rectY: Math.round(rect.y),
                        rectWidth: Math.round(rect.width),
                        rectHeight: Math.round(rect.height),
                        display: styles.display,
                        visibility: styles.visibility,
                        childCount: group.children.length
                    });
                });

                // Buscar botones con aria-label o title
                const allButtons = target.querySelectorAll('button, [role="button"], [aria-label]');
                const buttons = [];
                allButtons.forEach(function(btn) {
                    const rect = btn.getBoundingClientRect();
                    if (rect.width === 0 || rect.height === 0) return; // Skip invisible
                    const styles = window.getComputedStyle(btn);
                    buttons.push({
                        tag: btn.tagName,
                        class: btn.className.substring(0, 30),
                        ariaLabel: btn.getAttribute('aria-label'),
                        title: btn.getAttribute('title'),
                        role: btn.getAttribute('role'),
                        text: btn.textContent?.trim().substring(0, 10),
                        rectX: Math.round(rect.x),
                        rectY: Math.round(rect.y),
                        display: styles.display,
                        visibility: styles.visibility
                    });
                });

                if (buttons.length > 0) {
                    tpLog("MSGBUTTON", msgId, {
                        action: "HOVER_BUTTONS",
                        count: buttons.length,
                        buttons: buttons
                    });
                }

                // Buscar elementos con clases que contengan "action" o "reaction" o "button"
                const actionCandidates = target.querySelectorAll('[class*="action"], [class*="reaction"], [class*="button"]');
                actionCandidates.forEach(function(el, i) {
                    const rect = el.getBoundingClientRect();
                    if (rect.width === 0 || rect.height === 0) return;
                    tpLog("MSGBUTTON", msgId, {
                        action: "HOVER_ACTION_CANDIDATE",
                        index: i,
                        class: el.className.substring(0, 50),
                        tag: el.tagName,
                        rectX: Math.round(rect.x),
                        rectY: Math.round(rect.y),
                        rectWidth: Math.round(rect.width),
                        rectHeight: Math.round(rect.height),
                        childCount: el.children.length,
                        firstChildClass: el.firstElementChild?.className?.substring ? el.firstElementChild.className.substring(0, 30) : null
                    });
                });

                // Listar TODOS los hijos directos del message wrapper
                tpLog("MSGBUTTON", msgId, {
                    action: "HOVER_DIRECT_CHILDREN",
                    count: target.children.length,
                    children: Array.from(target.children).map(function(c) {
                        return c.tagName + '.' + c.className.substring(0, 30);
                    })
                });

            }, true); // true = capture phase

        } else {
            tpLog("MSGOBSERVER", null, { action: "NO_CONTAINER_FOUND" });
            // Intentar de nuevo después de un delay
            setTimeout(setupMessageObserver, 1000);
        }
    }

    function processMessageNode(msgEl) {
        const listItemId = msgEl.dataset?.listItemId || '';

        // Extraer snowflakes usando regex - el último es el messageId
        const snowflakes = listItemId.match(/\d+/g);
        if (!snowflakes || snowflakes.length < 2) {
            tpLog("PROCESS_NODE", null, { action: "NO_MSG_ID", reason: "snowflakes not found", listItemId: listItemId.substring(0, 50) });
            return;
        }

        // El último snowflake es el messageId
        const msgId = snowflakes[snowflakes.length - 1];
        // El penúltimo es el channelId
        const channelId = snowflakes[snowflakes.length - 2];

        tpLog("PROCESS_NODE", msgId, { action: "PROCESSING", channelId: channelId, listItemId: listItemId.substring(0, 50) });
        tpLog("MSGBUTTON", msgId, { action: "MESSAGE_DETECTED", channelId: channelId });

        // Toolbar de acciones (hover)
        addMessageTranslateButton(msgEl, msgId, channelId);

        // Contenedor de reacciones (permanente)
        addMessageTranslateButtonToReactions(msgEl, msgId, channelId);
    }

    // ==================== INICIALIZACIÓN ====================
    function init() {
        console.log("[Translator SaintB] Plugin iniciado!");

        // Cargar settings persistidos desde DataStore
        loadChannelSettings();

        state.activeChannelId = getActiveChannelId();

        tpLog("TP-HOVER-LIFECYCLE", null, { event: "INIT", channelId: state.activeChannelId });

        patchSendMessage();
        setupIncomingHandler();
        addComposerButton();
        setupKeybind();
        setupMessageObserver();

        // Detectar cambios de canal usando popstate y polling suave
        let lastUrl = window.location.pathname;
        setInterval(function() {
            const currentChannelId = getActiveChannelId();
            const currentPath = window.location.pathname;
            if (currentPath !== lastUrl) {
                lastUrl = currentPath;
                tpLog("TP-HOVER-LIFECYCLE", null, { event: "URL_CHANGED", channelId: currentChannelId, path: currentPath });
            }
            if (currentChannelId && currentChannelId !== state.activeChannelId) {
                tpLog("TP-HOVER-LIFECYCLE", null, { event: "CHANNEL_CHANGE", oldChannelId: state.activeChannelId, newChannelId: currentChannelId });
                state.activeChannelId = currentChannelId;
                // Re-setup del observer para el nuevo canal
                setupMessageObserver();
                // Re-setup del composer button
                addComposerButton();
                tpLog("TP-HOVER-LIFECYCLE", null, { event: "OBSERVER_REFRESHED", channelId: currentChannelId });
            }
        }, 2000);
    }

    // ==================== INICIO ====================
    waitForVencord(async function() {
        console.log("[Translator SaintB] FluxDispatcher encontrado!");
        
        // Detectar idioma de Discord y traducir UI
        const discordLang = detectDiscordLocale();
        state.uiLang = discordLang;
        await translateUIStrings(discordLang);
        
        init();
    });

})();