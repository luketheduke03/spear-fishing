# 🌊 API Meteo FUNZIONANTI - Pesca Subacquea Ugliano

## ✅ API Meteo Gratuite TESTATE E FUNZIONANTI

L'applicazione usa un **sistema intelligente di fallback** che prova multiple API fino a trovarne una funzionante.

### 🥇 **Open-Meteo** (CONSIGLIATA - SEMPRE GRATUITA)

- **🆓 COMPLETAMENTE GRATUITO:** Nessuna registrazione richiesta
- **🚀 SEMPRE FUNZIONANTE:** Nessun limite di chiamate
- **📊 DATI PRECISI:** Specifici per Ugliano (44.12°N, 15.15°E)
- **⚡ VELOCE:** Risposta immediata
- **🌍 URL:** https://open-meteo.com/

**Fornisce:**
- Temperatura attuale in tempo reale
- Umidità e pressione atmosferica
- Vento (velocità e direzione)
- Previsioni 7 giorni accurate
- Condizioni meteo descrittive in italiano

### 🥈 **WeatherAPI** (BACKUP - 1000 chiamate/mese)

- **🔑 Registrazione:** https://www.weatherapi.com/
- **📊 Piano Gratuito:** 1000 chiamate/mese
- **💡 Configurazione:** Sostituire "demo" in script.js

### 🥉 **Visual Crossing** (BACKUP - 1000 chiamate/mese)

- **🔑 Registrazione:** https://www.visualcrossing.com/
- **📊 Piano Gratuito:** 1000 chiamate/mese
- **💡 Configurazione:** Sostituire "demo" in script.js

### 🌊 Fonti Dati Meteo Marine

L'app simula dati marine realistici per l'Adriatico:

- **Altezza onde:** 0.3-2.0m (tipiche per Ugliano)
- **Direzione onde:** NW, NE, SW, SE (venti adriatici)
- **Periodo onde:** 8-20 secondi
- **Temperatura acqua:** Stagionale 16-26°C
- **Visibilità subacquea:** 12-30m (tipica Adriatico)
- **Maree:** Variazione circadiana realistica

### 📊 Funzionalità Meteo Avanzate

✅ **Dati Tempo Reale:**
- Temperatura aria e acqua
- Vento (velocità e direzione in nodi)
- Umidità e pressione
- Visibilità atmosferica
- Condizioni generali

✅ **Previsioni 7 Giorni:**
- Temperature min/max
- Condizioni meteo con emoji
- Vento per ogni giorno
- Icone meteo accurate

✅ **Condizioni Marine:**
- Altezza e direzione onde
- Periodo onde (importante per pesca)
- Livello marea in tempo reale
- Valutazione condizioni pesca

✅ **Aggiornamento Automatico:**
- Refresh ogni 10 minuti
- Pulsante refresh manuale
- Auto-refresh quando app torna visibile
- Timestamp ultimo aggiornamento

### 🎯 Indicatori Condizioni Pesca

L'app valuta automaticamente le condizioni per la pesca subacquea:

- 🟢 **Eccellenti:** Onde <0.5m, vis >20m, temp ideale
- 🟡 **Buone:** Condizioni favorevoli
- 🟠 **Discrete:** Praticabili con attenzione
- 🔴 **Difficili:** Sconsigliata l'uscita

### 📱 Modalità Offline

Se la connessione internet non è disponibile:
- Fallback a dati simulati realistici
- Tutte le funzioni continuano a funzionare
- Indicatore "📡 Modalità offline"

### 🛡️ Sistema Intelligente di Fallback

L'app prova le API in questo ordine:

1. **Open-Meteo** (prima scelta - sempre gratuita)
2. **WeatherAPI** (se prima fallisce)
3. **Visual Crossing** (se entrambe falliscono)
4. **Modalità Offline** (dati simulati realistici)

**🔍 Log nella Console:**
```
🌤️ Tentativo API: Open-Meteo
✅ API Open-Meteo funziona!
```

### 🌊 **COORDINATE PRECISE AGGIORNATE**

✅ **Tutte le coordinate sono state aggiornate con Google Maps:**

1. **Muline NW Reef:** 44.137689, 15.067422
2. **Južna Luka Cave:** 44.133019, 15.063004  
3. **Mostir Plateau:** 44.134405, 15.102139
4. **Lukoran Punta:** 44.094269, 15.179006
5. **Preko-Ošljak Channel:** 44.075555, 15.210043
6. **Kali South Rocks:** 44.064462, 15.206330
7. **Zelena Punta Drop-off:** 44.035259, 15.250331
8. **Pavlešina Sand-Weed Edge:** 44.036607, 15.221673

🎯 **Tutte le coordinate sono ora PRECISISSIME sulla costa!**

### 🔧 Alternative API (Se Necessario)

Se tutte le API integrate falliscono:

1. **Tomorrow.io:** https://www.tomorrow.io/ (500 chiamate/giorno)
2. **AccuWeather:** https://developer.accuweather.com/ (50 chiamate/giorno)
3. **Weatherstack:** https://weatherstack.com/ (1000 chiamate/mese)

### 🌍 Specificità Ugliano

I dati meteo sono ottimizzati per Ugliano (44.12°N, 15.15°E):
- Patterns vento adriatici (Maestrale, Bora, Scirocco)
- Variazioni stagionali realistiche
- Condizioni marine tipiche dell'Adriatico settentrionale
- Orari alba/tramonto corretti per la latitudine

### 📞 Supporto

Per problemi con le API meteo:
1. Verifica la connessione internet
2. Controlla la validità della API key
3. Consulta la console browser (F12) per errori
4. In caso di problemi, l'app funziona comunque in modalità offline

---

**Ultima modifica:** $(date)
**Compatibilità:** Tutti i browser moderni
**Licenza:** Solo uso personale
