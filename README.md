# Spear Fishing App - Ugliano

Un'applicazione web per la pesca subacquea che mostra punti di pesca, condizioni meteo marine e assistente AI.

## 🚀 Funzionalità

- **Mappa Interattiva**: Visualizza punti di pesca con coordinate precise
- **Condizioni Meteo**: Dati meteo in tempo reale e previsioni
- **Condizioni Marine**: Stato del mare e condizioni per la pesca
- **Assistente AI**: Chat con Claude AI per consigli di pesca
- **Design Responsive**: Funziona su desktop e mobile

## 🛠️ Installazione

### Prerequisiti
- Node.js (versione 14 o superiore)
- Git

### Setup Locale

1. **Clona il repository**
   ```bash
   git clone https://github.com/lucarossit/spear-fishing.git
   cd spear-fishing
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le API keys**
   ```bash
   # Copia il file di esempio
   cp env.example .env
   
   # Modifica .env con le tue chiavi API
   nano .env
   ```

4. **Avvia l'applicazione**
   ```bash
   npm start
   ```

5. **Apri nel browser**
   ```
   http://localhost:3000
   ```

## 🔑 Configurazione API

### Claude AI API
L'applicazione richiede una chiave API di Claude AI per le funzionalità di chat:

1. Vai su [Anthropic Console](https://console.anthropic.com/)
2. Crea un account e genera una chiave API
3. Aggiungi la chiave nel file `.env`:
   ```
   CLAUDE_API_KEY=your_actual_api_key_here
   ```

### Variabili d'Ambiente
- `CLAUDE_API_KEY`: Chiave API per Claude AI (richiesto)

## 🚀 Deployment

### Vercel (Raccomandato)
1. Pusha il codice su GitHub
2. Connetti il repository a Vercel
3. Configura le variabili d'ambiente nel dashboard Vercel
4. Deploy automatico ad ogni push

### Altri Servizi
L'applicazione funziona su qualsiasi servizio che supporti Node.js e variabili d'ambiente.

## 📁 Struttura Progetto

```
spear-fishing/
├── index.html          # Pagina principale
├── script.js           # Logica applicazione
├── style.css           # Stili CSS
├── config.js           # Configurazione sicura
├── data.js             # Dati punti di pesca e pesci
├── server.js           # Server Node.js
├── package.json        # Dipendenze e script
├── .env.example        # Esempio configurazione
├── .gitignore          # File da ignorare in Git
└── README.md           # Questo file
```

## 🔒 Sicurezza

- **API Keys**: Non vengono mai committate su GitHub
- **Variabili d'Ambiente**: Configurate tramite file `.env` locale
- **Gitignore**: File sensibili esclusi automaticamente

## 🌟 Caratteristiche Tecniche

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Mappe**: Leaflet.js con layer multipli
- **AI**: Claude AI API per assistente intelligente
- **Responsive**: Design mobile-first
- **PWA**: Progressive Web App support

## 📱 Utilizzo

1. **Navigazione**: Usa i menu per spostarti tra le sezioni
2. **Mappa**: Zoom e pan per esplorare i punti di pesca
3. **Filtri**: Filtra punti per tipo e pesci per difficoltà
4. **Meteo**: Controlla condizioni attuali e previsioni
5. **AI Chat**: Chiedi consigli all'assistente AI

## 🤝 Contributi

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per dettagli.

## 📞 Supporto

Per supporto o domande:
- Apri una issue su GitHub
- Contatta il team di sviluppo

---

**Nota**: Assicurati di non committare mai file `.env` con chiavi API reali su GitHub!
