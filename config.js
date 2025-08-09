// Configurazione sicura per API keys
// Questo file è sicuro per GitHub - le chiavi API vengono caricate da variabili d'ambiente

class Config {
    constructor() {
        // Chiavi API (caricate da variabili d'ambiente)
        this.apiKeys = {
            claude: '' // Claude AI API key - caricata da variabili d'ambiente
        };

        // Configurazione API endpoints
        this.apiEndpoints = {
            // Claude API per AI assistant
            claude: 'https://api.anthropic.com/v1'
        };

        // Configurazione per deployment
        this.deployment = {
            useLocalStorage: true, // Salva preferenze utente
            enableAnalytics: false, // Disabilita per privacy
            enableErrorReporting: false // Disabilita per privacy
        };
    }

    // Metodo per impostare le chiavi API in modo sicuro
    setApiKey(service, key) {
        if (this.apiKeys.hasOwnProperty(service)) {
            this.apiKeys[service] = key;
            console.log(`✅ Chiave API ${service} configurata`);
        } else {
            console.error(`❌ Servizio ${service} non riconosciuto`);
        }
    }

    // Metodo per ottenere le chiavi API
    getApiKey(service) {
        return this.apiKeys[service] || '';
    }

    // Metodo per verificare se una chiave API è configurata
    hasApiKey(service) {
        return !!(this.apiKeys[service] && this.apiKeys[service].length > 0);
    }

    // Metodo per configurare tutte le chiavi in una volta
    setApiKeys(keys) {
        Object.keys(keys).forEach(service => {
            this.setApiKey(service, keys[service]);
        });
    }
}

// Istanza globale di configurazione
window.AppConfig = new Config();

// Configurazione per l'API Claude (carica automaticamente da variabili d'ambiente)
// Per sviluppo locale: crea un file .env con CLAUDE_API_KEY=your_claude_api_key_here
// Per deployment: imposta la variabile d'ambiente CLAUDE_API_KEY nel tuo servizio hosting

// Carica la chiave API da variabili d'ambiente se disponibili
if (typeof process !== 'undefined' && process.env && process.env.CLAUDE_API_KEY) {
    window.AppConfig.setApiKey('claude', process.env.CLAUDE_API_KEY);
} else if (typeof window !== 'undefined' && window.ENV && window.ENV.CLAUDE_API_KEY) {
    // Per Vercel e altri servizi che espongono variabili d'ambiente al frontend
    window.AppConfig.setApiKey('claude', window.ENV.CLAUDE_API_KEY);
}
