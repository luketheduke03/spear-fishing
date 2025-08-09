# Configurazione API Keys - Ugliano Spearfishing App

## 🔒 Sicurezza delle API Keys

Le chiavi API sono **sensibili** e non devono mai essere committate su GitHub o condivise pubblicamente.

## 📋 Setup Locale (Sviluppo)

### 1. Configura le chiavi API

Apri il file `config.js` e aggiungi le tue chiavi API:

```javascript
// In config.js, alla fine del file:
window.AppConfig.setApiKeys({
    claude: 'your_claude_api_key_here',
    openweather: 'your_openweather_key_here',
    weatherapi: 'your_weatherapi_key_here', 
    openai: 'your_openai_key_here'
});
```

### 2. API Supportate

#### 🌤️ **OpenWeatherMap** (Opzionale)
- **Cosa fa**: Migliora i dati meteo
- **Gratuito**: 1000 chiamate/giorno
- **Registrazione**: https://openweathermap.org/api
- **Nota**: L'app usa Open-Meteo gratuito come backup

#### 🌊 **WeatherAPI** (Opzionale)  
- **Cosa fa**: Dati meteo alternativi
- **Gratuito**: 1 milione chiamate/mese
- **Registrazione**: https://www.weatherapi.com/
- **Nota**: Solo se OpenWeatherMap non funziona

#### 🧠 **Claude AI** (Raccomandato)
- **Cosa fa**: AI assistant esperto di pesca subacquea e apnea
- **Costo**: ~$0.008 per conversazione (migliore qualità)
- **Registrazione**: https://console.anthropic.com/
- **Nota**: Expertise specializzato per spearfishing e freediving

#### 🤖 **OpenAI** (Fallback)
- **Cosa fa**: AI assistant alternativo
- **Costo**: ~$0.002 per conversazione
- **Registrazione**: https://openai.com/api/
- **Nota**: Usato solo se Claude non disponibile

## 🚀 Deploy su Vercel/Netlify

### 1. Variabili d'Ambiente

Nel pannello di controllo del tuo provider, aggiungi:

```
OPENWEATHER_API_KEY = your_key_here
WEATHERAPI_KEY = your_key_here  
OPENAI_API_KEY = your_key_here
```

### 2. File da NON committare

Il file `.gitignore` è già configurato per escludere:
- `.env`
- `config.local.js` 
- `*.key`

## 🔧 Test Locale

1. **Avvia il server:**
   ```bash
   cd "path/to/Spear Fishing"
   python3 -m http.server 8080
   ```

2. **Apri nel browser:**
   ```
   http://localhost:8080
   ```

3. **Testa le funzioni:**
   - Sezione Meteo → dovrebbe caricare dati reali
   - Sezione AI → prova a fare una domanda
   - Controlla console per eventuali errori

## ⚠️ Importante

- **MAI** committare chiavi API su GitHub
- **Usa sempre** variabili d'ambiente per production
- **L'app funziona** anche senza API keys (modalità offline)
- **Le chiavi API** sono solo per migliorare l'esperienza

## 📞 API Gratuite Utilizzate

L'app funziona principalmente con API **completamente gratuite**:

- **Open-Meteo**: Dati meteo senza registrazione
- **Leaflet/OpenStreetMap**: Mappe gratuite
- **Responses predefinite**: AI locale senza costi

Le chiavi API sono solo per **funzionalità avanzate opzionali**!
