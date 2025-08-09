// Proxy server per Ugliano Spearfishing App
// Risolve problemi CORS con API Anthropic Claude

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per CORS e parsing JSON
app.use(cors({
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://[::]:8000'],
    credentials: true
}));
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Route principale per servire l'app
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Proxy per API Claude - risolve problemi CORS
app.post('/api/claude', async (req, res) => {
    try {
        // Ottieni API key da variabili d'ambiente
        const apiKey = process.env.CLAUDE_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ 
                error: 'Claude API key non configurata. Aggiungi CLAUDE_API_KEY nel file .env' 
            });
        }

        // Log della richiesta per debug
        console.log('📨 Richiesta ricevuta per Claude API');
        console.log('🔑 API Key configurata:', apiKey ? '✅' : '❌');

        // Inoltra richiesta ad Anthropic API
        const response = await axios.post('https://api.anthropic.com/v1/messages', req.body, {
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            },
            timeout: 30000 // 30 secondi timeout
        });

        console.log('✅ Risposta ricevuta da Claude API');
        
        // Inoltra risposta al client
        res.json(response.data);

    } catch (error) {
        console.error('❌ Errore nella chiamata a Claude API:', error.message);
        
        // Gestione errori dettagliata
        if (error.response) {
            // Errore dalla API di Anthropic
            res.status(error.response.status).json({
                error: `Errore API Claude: ${error.response.status}`,
                details: error.response.data,
                message: error.message
            });
        } else if (error.request) {
            // Errore di rete
            res.status(500).json({
                error: 'Errore di connessione alla API Claude',
                message: 'Verifica la tua connessione internet e riprova'
            });
        } else {
            // Altri errori
            res.status(500).json({
                error: 'Errore interno del server',
                message: error.message
            });
        }
    }
});

// Route per verificare lo stato del server
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        claude_api_key: process.env.CLAUDE_API_KEY ? '✅ Configurata' : '❌ Mancante',
        cors_enabled: true,
        server: 'Ugliano Spearfishing Proxy Server'
    });
});

// Gestione errori globale
app.use((err, req, res, next) => {
    console.error('❌ Errore server:', err);
    res.status(500).json({
        error: 'Errore interno del server',
        message: err.message
    });
});

// Avvia server
app.listen(PORT, () => {
    console.log('🚀 Server proxy avviato!');
    console.log(`📍 Porta: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`🔑 Claude API Key: ${process.env.CLAUDE_API_KEY ? '✅ Configurata' : '❌ Mancante'}`);
    console.log('📱 App disponibile su: http://localhost:3000');
    console.log('🔧 Per sviluppo: http://localhost:3000 (con proxy) o http://localhost:8000 (senza proxy)');
});

module.exports = app;
