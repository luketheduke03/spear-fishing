// Configurazione sicura per API keys
// Non committare questo file su GitHub!

class Config {
    constructor() {
        // Chiavi API (sostituisci con le tue chiavi reali)
        this.apiKeys = {
            openweather: '', // Lascia vuoto per usare Open-Meteo gratuito
            weatherapi: '', // Opzionale
            openai: '', // Per AI assistant (opzionale)
            claude: '' // Claude AI API key
        };

        // Configurazione API endpoints
        this.apiEndpoints = {
            // Open-Meteo (completamente gratuito, no API key richiesta)
            openMeteo: 'https://api.open-meteo.com/v1/forecast',
            
            // OpenWeatherMap (se hai una chiave API)
            openWeather: 'https://api.openweathermap.org/data/2.5',
            
            // WeatherAPI (se hai una chiave API)
            weatherApi: 'https://api.weatherapi.com/v1',
            
            // Claude API
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

// Esempio di configurazione (sostituisci con le tue chiavi)
// window.AppConfig.setApiKeys({
//     openweather: 'your_openweather_key_here',
//     weatherapi: 'your_weatherapi_key_here',
//     openai: 'your_openai_key_here'
// });

// Per deployment su Vercel o altri servizi, usa variabili d'ambiente:
if (typeof process !== 'undefined' && process.env) {
    window.AppConfig.setApiKeys({
        openweather: process.env.OPENWEATHER_API_KEY || '',
        weatherapi: process.env.WEATHERAPI_KEY || '',
        openai: process.env.OPENAI_API_KEY || '',
        claude: process.env.CLAUDE_API_KEY || ''
    });
}
