// Script principale per l'applicazione Pesca Subacquea Ugliano

class UglianoSpearfishingApp {
    constructor() {
        this.currentSection = 'mappa';
        this.map = null;
        this.markers = [];
        this.currentFilter = 'all';
        this.currentFishFilter = 'all';
        this.weatherData = null;
        this.isLoading = false;
        this.lastWeatherUpdate = null;
        
        this.init();
    }

    // Inizializzazione dell'app
    init() {
        this.showLoadingScreen();
        
        // Setup eventi dopo caricamento DOM
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.initializeMap();
            this.loadFishingSpots();
            this.loadFishData();
            this.loadWeatherData();
            this.setupAIChat();
            this.setupAutoRefresh();
            this.hideLoadingScreen();
        });

        // Se DOM già caricato
        if (document.readyState === 'loading') {
            // DOM non ancora caricato
        } else {
            // DOM già caricato
            this.setupEventListeners();
            this.initializeMap();
            this.loadFishingSpots();
            this.loadFishData();
            this.loadWeatherData();
            this.setupAIChat();
            this.setupAutoRefresh();
            this.hideLoadingScreen();
        }
    }

    // Mostra schermata di caricamento
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    // Nasconde schermata di caricamento
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 2000); // Mostra loading per 2 secondi
    }

    // Setup listener eventi
    setupEventListeners() {
        // Navigation listeners (sia desktop che mobile)
        const navLinks = document.querySelectorAll('.nav-link, .bottom-nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
            });
        });

        // Menu toggle (desktop)
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');
        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', () => {
                mainNav.classList.toggle('open');
                document.querySelector('.main-content').classList.toggle('nav-open');
            });
        }

        // Filter listeners - spots
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setActiveFilter(btn, filterBtns);
                const filter = btn.dataset.filter;
                this.filterSpots(filter);
            });
        });

        // Filter listeners - fish
        const fishFilterBtns = document.querySelectorAll('.fish-filter-btn');
        fishFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setActiveFilter(btn, fishFilterBtns);
                const filter = btn.dataset.fishFilter;
                this.filterFish(filter);
            });
        });

        // Fish search
        const fishSearch = document.getElementById('fishSearch');
        if (fishSearch) {
            fishSearch.addEventListener('input', (e) => {
                this.searchFish(e.target.value);
            });
        }

        // AI Chat listeners
        const sendButton = document.getElementById('sendMessage');
        const chatInput = document.getElementById('chatInput');
        
        if (sendButton) {
            sendButton.addEventListener('click', () => {
                this.sendAIMessage();
            });
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendAIMessage();
                }
            });
        }

        // Quick question buttons
        const quickBtns = document.querySelectorAll('.quick-btn');
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                this.sendAIMessage(question);
            });
        });

        // Resize handler per mappa
        window.addEventListener('resize', () => {
            if (this.map) {
                setTimeout(() => {
                    this.map.invalidateSize();
                }, 100);
            }
        });

        // Gestione errori globali
        window.addEventListener('error', (e) => {
            console.error('Errore globale:', e.error);
            this.showErrorMessage('Si è verificato un errore imprevisto. Ricarica la pagina.');
        });

        // Gestione errori di rete
        window.addEventListener('offline', () => {
            this.showErrorMessage('Connessione internet persa. Alcune funzioni potrebbero non funzionare.');
        });

        window.addEventListener('online', () => {
            this.hideErrorMessage();
            if (this.currentSection === 'meteo') {
                this.loadWeatherData();
            }
        });
    }

    // Mostra messaggio di errore
    showErrorMessage(message) {
        // Rimuovi messaggi di errore esistenti
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                background: #ef4444;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1001;
                font-size: 14px;
                max-width: 90%;
                text-align: center;
            ">
                ⚠️ ${message}
            </div>
        `;
        document.body.appendChild(errorDiv);

        // Auto-rimuovi dopo 5 secondi
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Nasconde messaggio di errore
    hideErrorMessage() {
        const errorMessage = document.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Gestione navigazione sezioni
    showSection(sectionName) {
        // Validazione sezione
        const validSections = ['mappa', 'meteo', 'pesci', 'formazione'];
        if (!validSections.includes(sectionName)) {
            console.error('Sezione non valida:', sectionName);
            return;
        }

        // Nasconde tutte le sezioni
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Mostra sezione richiesta
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Aggiorna navigation
        const navLinks = document.querySelectorAll('.nav-link, .bottom-nav-item');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionName) {
                link.classList.add('active');
            }
        });

        // Aggiorna stato corrente
        this.currentSection = sectionName;

        // Azioni specifiche per sezione
        if (sectionName === 'mappa' && this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 100);
        }

        // Chiudi menu mobile se aperto
        const mainNav = document.getElementById('mainNav');
        if (mainNav && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            document.querySelector('.main-content').classList.remove('nav-open');
        }

        // Aggiorna URL senza ricaricare la pagina
        if (history.pushState) {
            history.pushState(null, null, `#${sectionName}`);
        }
    }

    // Imposta filtro attivo
    setActiveFilter(activeBtn, allBtns) {
        if (!activeBtn || !allBtns) return;
        
        allBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    // Inizializza mappa Leaflet
    initializeMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) {
            console.error('Container mappa non trovato');
            return;
        }

        try {
            // Crea mappa centrata su Ugliano
            this.map = L.map('map').setView(MAP_CONFIG.center, MAP_CONFIG.zoom);

            // Creiamo layer multipli per una mappa più precisa
            const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: MAP_CONFIG.maxZoom,
                minZoom: MAP_CONFIG.minZoom
            });

            // Layer satellitare più preciso
            const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                maxZoom: MAP_CONFIG.maxZoom,
                minZoom: MAP_CONFIG.minZoom
            });

            // Layer ibrido (OpenStreetMap + etichette)
            const hybridLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
                attribution: 'Map tiles by Stamen Design, CC BY 3.0 &mdash; Map data &copy; OpenStreetMap contributors',
                maxZoom: MAP_CONFIG.maxZoom,
                minZoom: MAP_CONFIG.minZoom
            });

            // Aggiungi il layer satellitare come predefinito per maggiore precisione
            satelliteLayer.addTo(this.map);

            // Control per cambiare layer
            const baseMaps = {
                "🛰️ Satellitare": satelliteLayer,
                "🗺️ Stradale": osmLayer,
                "🌍 Ibrida": hybridLayer
            };

            L.control.layers(baseMaps).addTo(this.map);

            // Stile personalizzato per marker
            this.createCustomMarkerIcons();

            // Aggiungi controllo scala
            L.control.scale({
                imperial: false,
                metric: true,
                position: 'bottomleft'
            }).addTo(this.map);

            // Aggiungi controllo fullscreen
            if (L.Control.Fullscreen) {
                L.Control.Fullscreen.addTo(this.map);
            }

            console.log('✅ Mappa inizializzata con successo');
        } catch (error) {
            console.error('❌ Errore inizializzazione mappa:', error);
            this.showErrorMessage('Errore nel caricamento della mappa. Ricarica la pagina.');
        }
    }

    // Crea icone personalizzate per i marker
    createCustomMarkerIcons() {
        try {
            this.markerIcons = {
                reef: this.createMarkerIcon('🐠', '#1e40af'),
                cave: this.createMarkerIcon('🕳️', '#7c3aed'),
                plateau: this.createMarkerIcon('🌊', '#0d9488'),
                channel: this.createMarkerIcon('🌀', '#059669'),
                mixed: this.createMarkerIcon('🐟', '#ea580c'),
                wall: this.createMarkerIcon('🧱', '#dc2626')
            };
        } catch (error) {
            console.error('Errore creazione icone marker:', error);
            // Fallback a icone semplici
            this.markerIcons = {
                reef: L.divIcon({ html: '🐠', className: 'simple-marker' }),
                cave: L.divIcon({ html: '🕳️', className: 'simple-marker' }),
                plateau: L.divIcon({ html: '🌊', className: 'simple-marker' }),
                channel: L.divIcon({ html: '🌀', className: 'simple-marker' }),
                mixed: L.divIcon({ html: '🐟', className: 'simple-marker' }),
                wall: L.divIcon({ html: '🧱', className: 'simple-marker' })
            };
        }
    }

    // Crea icona marker personalizzata
    createMarkerIcon(emoji, color) {
        return L.divIcon({
            html: `<div style="
                background: ${color};
                color: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                border: 3px solid white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            ">${emoji}</div>`,
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });
    }

    // Carica punti di pesca sulla mappa
    loadFishingSpots() {
        if (!this.map) {
            console.error('Mappa non inizializzata');
            return;
        }

        try {
            this.markers = [];
            
            FISHING_SPOTS.forEach(spot => {
                // Validazione coordinate
                if (!this.isValidCoordinate(spot.coordinates)) {
                    console.warn('Coordinate non valide per spot:', spot.name);
                    return;
                }

                const icon = this.markerIcons[spot.type] || this.markerIcons.mixed;
                
                const marker = L.marker(spot.coordinates, { icon: icon })
                    .addTo(this.map)
                    .bindPopup(this.createSpotPopup(spot));

                marker.spotData = spot;
                this.markers.push(marker);
            });

            // Carica anche lista spot
            this.loadSpotsList();
            
            console.log(`✅ Caricati ${this.markers.length} punti di pesca`);
        } catch (error) {
            console.error('Errore caricamento spots:', error);
            this.showErrorMessage('Errore nel caricamento dei punti di pesca.');
        }
    }

    // Valida coordinate
    isValidCoordinate(coords) {
        return Array.isArray(coords) && 
               coords.length === 2 && 
               typeof coords[0] === 'number' && 
               typeof coords[1] === 'number' &&
               coords[0] >= -90 && coords[0] <= 90 &&
               coords[1] >= -180 && coords[1] <= 180;
    }

    // Crea popup per punto di pesca
    createSpotPopup(spot) {
        if (!spot || !spot.targets) {
            return '<div>Informazioni non disponibili</div>';
        }

        const targets = spot.targets.map(target => 
            `<span class="target-tag">${target.name}</span>`
        ).join('');

        return `
            <div class="spot-popup">
                <h3>${spot.name || 'Nome non disponibile'}</h3>
                <p><strong>Profondità:</strong> ${spot.depth || 'N/A'}</p>
                <p><strong>Tipo:</strong> ${spot.type || 'N/A'}</p>
                <p><strong>Orario ottimale:</strong> ${spot.primeTime || 'N/A'}</p>
                <div class="popup-targets">
                    <strong>Pesci:</strong><br>
                    ${targets || 'Nessun pesce specificato'}
                </div>
                <p><strong>Tattica:</strong> ${spot.mainTactic || 'N/A'}</p>
                <p><strong>Accesso:</strong> ${spot.access || 'N/A'}</p>
            </div>
        `;
    }

    // Carica lista spots nel DOM
    loadSpotsList() {
        const container = document.getElementById('spotsList');
        if (!container) {
            console.error('Container lista spots non trovato');
            return;
        }

        try {
            container.innerHTML = '';

            FISHING_SPOTS.forEach(spot => {
                const spotCard = this.createSpotCard(spot);
                container.appendChild(spotCard);
            });
        } catch (error) {
            console.error('Errore caricamento lista spots:', error);
            container.innerHTML = '<p style="color: #ef4444; text-align: center;">Errore nel caricamento dei punti di pesca</p>';
        }
    }

    // Crea card per spot
    createSpotCard(spot) {
        if (!spot) {
            console.error('Spot non valido per creazione card');
            return document.createElement('div');
        }

        const card = document.createElement('div');
        card.className = 'spot-card';
        card.dataset.type = spot.type || 'mixed';
        card.dataset.difficulty = spot.difficulty || 'medium';

        const targets = (spot.targets || []).map(target => 
            `<span class="target-tag">${target.name}</span>`
        ).join('');

        const typeIcons = {
            reef: 'fas fa-mountain',
            cave: 'fas fa-cave',
            plateau: 'fas fa-water',
            channel: 'fas fa-stream',
            mixed: 'fas fa-layer-group',
            wall: 'fas fa-border-style'
        };

        card.innerHTML = `
            <div class="spot-header">
                <div class="spot-icon">
                    <i class="${typeIcons[spot.type] || 'fas fa-map-marker-alt'}"></i>
                </div>
                <div>
                    <h3 class="spot-name">${spot.name || 'Nome non disponibile'}</h3>
                    <span class="spot-type">${spot.type || 'mixed'}</span>
                </div>
            </div>
            <div class="spot-details">
                <div class="detail-row">
                    <i class="fas fa-ruler-vertical detail-icon"></i>
                    <span>Profondità: ${spot.depth || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <i class="fas fa-clock detail-icon"></i>
                    <span>${spot.primeTime || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <i class="fas fa-wind detail-icon"></i>
                    <span>${spot.windRule || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <i class="fas fa-car detail-icon"></i>
                    <span>${spot.access || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <i class="fas fa-eye detail-icon"></i>
                    <span>Visibilità: ${spot.visibility || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <i class="fas fa-bullseye detail-icon"></i>
                    <span>${spot.mainTactic || 'N/A'}</span>
                </div>
                <div class="targets-list">
                    ${targets || 'Nessun pesce specificato'}
                </div>
            </div>
        `;

        // Click per centrare mappa
        card.addEventListener('click', () => {
            this.centerMapOnSpot(spot);
        });

        return card;
    }

    // Centra mappa su spot
    centerMapOnSpot(spot) {
        if (!this.map || !spot) return;
        
        // Cambia a sezione mappa se non già attiva
        if (this.currentSection !== 'mappa') {
            this.showSection('mappa');
        }

        // Centra e zoom su spot
        this.map.setView(spot.coordinates, 15);

        // Trova marker e apri popup
        const marker = this.markers.find(m => m.spotData && m.spotData.id === spot.id);
        if (marker) {
            marker.openPopup();
        }
    }

    // Filtra spots per tipo
    filterSpots(type) {
        if (!type) return;
        
        this.currentFilter = type;

        try {
            // Filtra markers
            this.markers.forEach(marker => {
                if (!marker || !marker.spotData) return;
                
                const spot = marker.spotData;
                if (type === 'all' || spot.type === type) {
                    marker.addTo(this.map);
                } else {
                    this.map.removeLayer(marker);
                }
            });

            // Filtra cards
            const spotCards = document.querySelectorAll('.spot-card');
            spotCards.forEach(card => {
                if (type === 'all' || card.dataset.type === type) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        } catch (error) {
            console.error('Errore filtro spots:', error);
        }
    }

    // Carica dati pesci
    loadFishData() {
        try {
            this.displayFishList(FISH_DATA);
        } catch (error) {
            console.error('Errore caricamento dati pesci:', error);
            this.showErrorMessage('Errore nel caricamento dei dati sui pesci.');
        }
    }

    // Mostra lista pesci
    displayFishList(fishList) {
        const container = document.getElementById('fishList');
        if (!container) return;

        try {
            container.innerHTML = '';

            if (!Array.isArray(fishList) || fishList.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #64748b;">Nessun pesce trovato</p>';
                return;
            }

            fishList.forEach(fish => {
                const fishCard = this.createFishCard(fish);
                container.appendChild(fishCard);
            });
        } catch (error) {
            console.error('Errore visualizzazione lista pesci:', error);
            container.innerHTML = '<p style="color: #ef4444; text-align: center;">Errore nella visualizzazione dei pesci</p>';
        }
    }

    // Crea card pesce con immagini reali
    createFishCard(fish) {
        if (!fish) {
            console.error('Dati pesce non validi');
            return document.createElement('div');
        }

        const card = document.createElement('div');
        card.className = 'fish-card';
        card.dataset.difficulty = fish.difficulty || 'medium';

        const difficultyLabels = {
            easy: 'Facile',
            medium: 'Medio', 
            hard: 'Difficile'
        };

        const difficultyColors = {
            easy: '#10b981',
            medium: '#f59e0b',
            hard: '#ef4444'
        };

        const tactics = (fish.tactics || []).map(tactic => `<li>${tactic}</li>`).join('');

        // Immagini reali dei pesci dell'Adriatico con fallback robusto
        const fishEmojis = {
            'Dentice': '🐟',
            'Ricciola': '🐠',
            'Cernia Bruna': '🐙',
            'Sarago': '🐟',
            'Orata': '🐠',
            'Spigola': '🐟',
            'Scorfano': '🦂',
            'Murena': '🐍',
            'Seppia': '🐙',
            'Barracuda': '🦈',
            'Aquila di Mare': '🦅',
            'Triglia': '🐟',
            'Grongo': '🐍',
            'Cottora': '🐠',
            'Cefalo': '🐟'
        };

        const fishEmoji = fishEmojis[fish.name] || '🐟';
        
        const fishImage = fish.imageUrl ? 
            `<img src="${fish.imageUrl}" alt="${fish.name}" class="fish-photo" loading="lazy" 
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                  onload="this.nextElementSibling.style.display='none';">
             <div class="fish-fallback-icon" style="display:none; font-size: 4rem;">${fishEmoji}</div>` :
            `<div class="fish-fallback-icon" style="font-size: 4rem;">${fishEmoji}</div>`;

        card.innerHTML = `
            <div class="fish-image">
                ${fishImage}
                <div class="fish-difficulty" style="background: ${difficultyColors[fish.difficulty] || difficultyColors.medium}">
                    ${difficultyLabels[fish.difficulty] || difficultyLabels.medium}
                </div>
            </div>
            <div class="fish-content">
                <h3 class="fish-name">${fish.name || 'Nome non disponibile'}</h3>
                <p class="fish-scientific">${fish.scientific || 'N/A'}</p>
                <p class="fish-description">${fish.description || 'Descrizione non disponibile'}</p>
                
                <div class="fish-tactics">
                    <h4><i class="fas fa-crosshairs"></i> Tecniche di Cattura:</h4>
                    <ul>${tactics || '<li>Nessuna tecnica specificata</li>'}</ul>
                </div>
                
                <div class="fish-specs">
                    <span class="fish-size">Min: ${fish.minSize || 'N/A'}cm</span>
                    <span>${fish.seasonality || 'N/A'}</span>
                </div>
            </div>
        `;

        return card;
    }

    // Filtra pesci per difficoltà
    filterFish(difficulty) {
        if (!difficulty) return;
        
        this.currentFishFilter = difficulty;
        try {
            const filteredFish = DataUtils.filterFishByDifficulty(difficulty);
            this.displayFishList(filteredFish);
        } catch (error) {
            console.error('Errore filtro pesci:', error);
        }
    }

    // Cerca pesci
    searchFish(query) {
        if (!query || typeof query !== 'string') {
            this.filterFish(this.currentFishFilter);
            return;
        }

        try {
            const searchResults = DataUtils.searchFish(query);
            this.displayFishList(searchResults);
        } catch (error) {
            console.error('Errore ricerca pesci:', error);
        }
    }

    // Carica dati meteo reali
    async loadWeatherData() {
        if (this.isLoading) {
            console.log('Caricamento meteo già in corso...');
            return;
        }

        this.isLoading = true;
        console.log('🌊 Caricamento dati meteo in tempo reale...');
        
        try {
            // Coordinte di Ugliano per API meteo
            const UGLJAN_COORDS = {
                lat: 44.12,
                lon: 15.15
            };

            // Carica dati in parallelo
            await Promise.all([
                this.loadCurrentWeather(UGLJAN_COORDS),
                this.loadWeatherForecast(UGLJAN_COORDS), 
                this.loadMarineConditions(UGLJAN_COORDS),
                this.loadOptimalTimes()
            ]);

            this.lastWeatherUpdate = new Date();
            this.updateWeatherStatus(true);
            console.log('✅ Dati meteo caricati con successo');
        } catch (error) {
            console.error('❌ Errore caricamento meteo:', error);
            this.showErrorMessage('Errore nel caricamento dei dati meteo. Modalità offline attivata.');
            
            // Fallback ai dati simulati
            this.loadCurrentWeatherSimulated();
            this.loadWeatherForecastSimulated();
            this.loadMarineConditionsSimulated();
            this.loadOptimalTimes();
            
            this.updateWeatherStatus(false);
        } finally {
            this.isLoading = false;
        }
    }

    // Aggiorna status meteo
    updateWeatherStatus(isOnline) {
        const statusIndicator = document.getElementById('weatherStatus');
        const lastUpdate = document.getElementById('lastUpdate');
        
        if (statusIndicator && lastUpdate) {
            const icon = statusIndicator.querySelector('i');
            if (icon) {
                icon.className = isOnline ? 'fas fa-circle' : 'fas fa-circle offline';
            }
            
            if (this.lastWeatherUpdate) {
                lastUpdate.textContent = this.lastWeatherUpdate.toLocaleTimeString('it-IT');
            } else {
                lastUpdate.textContent = '--';
            }
        }
    }

    // Carica meteo corrente da API multiple (sistema robusto)
    async loadCurrentWeather(coords) {
        const container = document.getElementById('currentWeather');
        if (!container) return;

        try {
            // Prova multiple API fino a trovarne una funzionante
            const weatherData = await this.fetchWeatherFromMultipleAPIs(coords);
            
            if (!weatherData) {
                throw new Error('Tutte le API meteo non disponibili');
            }

            // Converte vento da m/s a nodi
            const windKnots = Math.round(weatherData.windSpeed * 1.944);
            const windDirection = this.getWindDirection(weatherData.windDirection);

            container.innerHTML = `
                <div class="weather-item">
                    <div class="weather-value">${Math.round(weatherData.temperature)}°C</div>
                    <div class="weather-label">Temperatura</div>
                </div>
                <div class="weather-item">
                    <div class="weather-value">${windKnots}</div>
                    <div class="weather-label">Vento (${windDirection}) kn</div>
                </div>
                <div class="weather-item">
                    <div class="weather-value">${weatherData.humidity}%</div>
                    <div class="weather-label">Umidità</div>
                </div>
                <div class="weather-item">
                    <div class="weather-value">${Math.round(weatherData.pressure)}</div>
                    <div class="weather-label">Pressione hPa</div>
                </div>
                <div class="weather-item">
                    <div class="weather-value">${weatherData.visibility}km</div>
                    <div class="weather-label">Visibilità</div>
                </div>
                <div class="weather-item">
                    <div class="weather-value">${weatherData.description}</div>
                    <div class="weather-label">Condizioni</div>
                </div>
            `;

            // Aggiungi timestamp ultimo aggiornamento e fonte API
            const lastUpdate = new Date().toLocaleTimeString('it-IT');
            container.innerHTML += `
                <div class="weather-update">
                    <small>🕒 Aggiornato: ${lastUpdate} | 📡 ${weatherData.source}</small>
                </div>
            `;

        } catch (error) {
            console.error('Errore meteo corrente:', error);
            this.loadCurrentWeatherSimulated();
        }
    }

    // Carica meteo corrente simulato (fallback)
    loadCurrentWeatherSimulated() {
        const container = document.getElementById('currentWeather');
        if (!container) return;

        const currentWeather = {
            temperature: 22,
            wind: 8,
            windDirection: 'NW',
            humidity: 65,
            pressure: 1015,
            visibility: 20
        };

        container.innerHTML = `
            <div class="weather-item">
                <div class="weather-value">${currentWeather.temperature}°C</div>
                <div class="weather-label">Temperatura</div>
            </div>
            <div class="weather-item">
                <div class="weather-value">${currentWeather.wind}</div>
                <div class="weather-label">Vento (${currentWeather.windDirection}) kn</div>
            </div>
            <div class="weather-item">
                <div class="weather-value">${currentWeather.humidity}%</div>
                <div class="weather-label">Umidità</div>
            </div>
            <div class="weather-item">
                <div class="weather-value">${currentWeather.pressure}</div>
                <div class="weather-label">Pressione hPa</div>
            </div>
            <div class="weather-item">
                <div class="weather-value">${currentWeather.visibility}km</div>
                <div class="weather-label">Visibilità</div>
            </div>
            <div class="weather-update">
                <small>📡 Modalità offline</small>
            </div>
        `;
    }

    async fetchWeatherFromMultipleAPIs(coords) {
        // Lista di API meteo gratuite in ordine di preferenza
        const weatherAPIs = [
            {
                name: 'Open-Meteo',
                url: `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_direction_10m,weather_code&timezone=Europe/Rome`,
                parser: this.parseOpenMeteoData.bind(this)
            },
            {
                name: 'WeatherAPI',
                url: `https://api.weatherapi.com/v1/current.json?key=${window.AppConfig?.getApiKey('weatherapi') || 'demo'}&q=${coords.lat},${coords.lon}&lang=it`,
                parser: this.parseWeatherAPIData.bind(this)
            },
            {
                name: 'Visual Crossing',
                url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${coords.lat},${coords.lon}/today?unitGroup=metric&key=demo&contentType=json`,
                parser: this.parseVisualCrossingData.bind(this)
            }
        ];

        // Prova ogni API in sequenza
        for (const api of weatherAPIs) {
            try {
                console.log(`🌤️ Tentativo API: ${api.name}`);
                
                const response = await fetch(api.url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    timeout: 10000 // 10 secondi timeout
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();
                const weatherData = api.parser(data);
                
                if (weatherData) {
                    console.log(`✅ API ${api.name} funziona!`);
                    weatherData.source = api.name;
                    return weatherData;
                }
            } catch (error) {
                console.warn(`❌ API ${api.name} fallita:`, error.message);
                continue;
            }
        }

        return null; // Tutte le API hanno fallito
    }

    // Parser per Open-Meteo (GRATUITO, no registrazione)
    parseOpenMeteoData(data) {
        try {
            const current = data.current;
            return {
                temperature: current.temperature_2m,
                humidity: current.relative_humidity_2m,
                pressure: current.pressure_msl,
                windSpeed: current.wind_speed_10m / 3.6, // converte km/h a m/s
                windDirection: current.wind_direction_10m,
                visibility: 15, // stima media per Adriatico
                description: this.getWeatherDescription(current.weather_code)
            };
        } catch (error) {
            console.error('Errore parsing Open-Meteo:', error);
            return null;
        }
    }

    // Parser per WeatherAPI (1000 chiamate/mese gratis)
    parseWeatherAPIData(data) {
        try {
            const current = data.current;
            return {
                temperature: current.temp_c,
                humidity: current.humidity,
                pressure: current.pressure_mb,
                windSpeed: current.wind_kph / 3.6, // converte km/h a m/s
                windDirection: current.wind_degree,
                visibility: current.vis_km,
                description: current.condition.text
            };
        } catch (error) {
            console.error('Errore parsing WeatherAPI:', error);
            return null;
        }
    }

    // Parser per Visual Crossing (1000 chiamate/mese gratis)
    parseVisualCrossingData(data) {
        try {
            const current = data.days[0];
            return {
                temperature: current.temp,
                humidity: current.humidity,
                pressure: current.pressure,
                windSpeed: current.windspeed / 3.6, // converte km/h a m/s
                windDirection: current.winddir,
                visibility: current.visibility || 15,
                description: current.conditions
            };
        } catch (error) {
            console.error('Errore parsing Visual Crossing:', error);
            return null;
        }
    }

    // Converte codice meteo Open-Meteo in descrizione italiana
    getWeatherDescription(weatherCode) {
        const descriptions = {
            0: 'Sereno',
            1: 'Poco nuvoloso',
            2: 'Parzialmente nuvoloso', 
            3: 'Nuvoloso',
            45: 'Nebbia',
            48: 'Nebbia con brina',
            51: 'Pioviggine leggera',
            53: 'Pioviggine moderata',
            55: 'Pioviggine intensa',
            61: 'Pioggia leggera',
            63: 'Pioggia moderata',
            65: 'Pioggia intensa',
            80: 'Rovesci leggeri',
            81: 'Rovesci moderati',
            82: 'Rovesci intensi',
            95: 'Temporale',
            96: 'Temporale con grandine leggera',
            99: 'Temporale con grandine intensa'
        };
        return descriptions[weatherCode] || 'Condizioni variabili';
    }

    // Converte gradi in direzione vento
    getWindDirection(degrees) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        return directions[Math.round(degrees / 22.5) % 16];
    }

    // Converte codice meteo in emoji
    getWeatherIcon(weatherCode, description) {
        const iconMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '🌤️', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return iconMap[weatherCode] || '🌤️';
    }

    // Carica previsioni settimanali da API multiple
    async loadWeatherForecast(coords) {
        const container = document.getElementById('weatherForecast');
        if (!container) return;

        try {
            // Usa Open-Meteo per previsioni 7 giorni (completamente gratuito)
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe/Rome&forecast_days=7`
            );

            if (!response.ok) {
                throw new Error('API previsioni non disponibile');
            }

            const data = await response.json();

            // Processa previsioni da Open-Meteo
            const dailyForecasts = this.processOpenMeteoForecast(data);

            container.innerHTML = dailyForecasts.map(day => `
                <div class="forecast-day">
                    <div class="forecast-date">${day.day}</div>
                    <div class="forecast-icon">${day.icon}</div>
                    <div class="forecast-temps">
                        <span class="temp-max">${day.max}°</span>
                        <span class="temp-min">${day.min}°</span>
                    </div>
                    <div class="forecast-wind">
                        <small>${day.wind} kn ${day.windDir}</small>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Errore previsioni:', error);
            this.loadWeatherForecastSimulated();
        }
    }

    // Processa previsioni Open-Meteo
    processOpenMeteoForecast(data) {
        const days = ['Oggi', 'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven'];
        const daily = data.daily;

        return daily.time.slice(0, 7).map((date, index) => {
            const weatherCode = daily.weather_code[index];
            const windSpeedKmh = daily.wind_speed_10m_max[index];
            const windDirection = daily.wind_direction_10m_dominant[index];

            return {
                day: days[index] || new Date(date).toLocaleDateString('it-IT', { weekday: 'short' }),
                icon: this.getWeatherIconFromCode(weatherCode),
                max: Math.round(daily.temperature_2m_max[index]),
                min: Math.round(daily.temperature_2m_min[index]),
                wind: Math.round(windSpeedKmh * 0.54), // converte km/h a nodi
                windDir: this.getWindDirection(windDirection)
            };
        });
    }

    // Converte codice meteo in emoji
    getWeatherIconFromCode(weatherCode) {
        const iconMap = {
            0: '☀️',    // Sereno
            1: '🌤️',    // Poco nuvoloso
            2: '⛅',    // Parzialmente nuvoloso
            3: '☁️',    // Nuvoloso
            45: '🌫️',   // Nebbia
            48: '🌫️',   // Nebbia con brina
            51: '🌦️',   // Pioviggine leggera
            53: '🌦️',   // Pioviggine moderata
            55: '🌧️',   // Pioviggine intensa
            61: '🌧️',   // Pioggia leggera
            63: '🌧️',   // Pioggia moderata
            65: '🌧️',   // Pioggia intensa
            80: '🌦️',   // Rovesci leggeri
            81: '🌧️',   // Rovesci moderati
            82: '⛈️',   // Rovesci intensi
            95: '⛈️',   // Temporale
            96: '⛈️',   // Temporale con grandine leggera
            99: '⛈️'    // Temporale con grandine intensa
        };
        return iconMap[weatherCode] || '🌤️';
    }

    // Raggruppa previsioni per giorno
    groupForecastByDay(forecasts) {
        const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
        const today = new Date();
        const dailyData = {};

        forecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayKey = date.toDateString();

            if (!dailyData[dayKey]) {
                dailyData[dayKey] = {
                    temps: [],
                    weather: forecast.weather[0],
                    wind: forecast.wind,
                    date: date
                };
            }

            dailyData[dayKey].temps.push(forecast.main.temp);
        });

        return Object.values(dailyData).slice(0, 7).map((dayData, index) => {
            const isToday = index === 0;
            return {
                day: isToday ? 'Oggi' : days[dayData.date.getDay()],
                icon: this.getWeatherIcon(dayData.weather.icon, dayData.weather.description),
                max: Math.round(Math.max(...dayData.temps)),
                min: Math.round(Math.min(...dayData.temps)),
                wind: Math.round(dayData.wind.speed * 1.944),
                windDir: this.getWindDirection(dayData.wind.deg)
            };
        });
    }

    // Carica previsioni simulate (fallback)
    loadWeatherForecastSimulated() {
        const container = document.getElementById('weatherForecast');
        if (!container) return;

        const forecast = [
            { day: 'Oggi', icon: '☀️', max: 24, min: 18, wind: '8 kn NW' },
            { day: 'Dom', icon: '🌤️', max: 22, min: 16, wind: '12 kn NW' },
            { day: 'Lun', icon: '☀️', max: 25, min: 19, wind: '6 kn NE' },
            { day: 'Mar', icon: '🌤️', max: 23, min: 17, wind: '10 kn NW' },
            { day: 'Mer', icon: '⛅', max: 21, min: 15, wind: '15 kn SW' },
            { day: 'Gio', icon: '🌧️', max: 19, min: 14, wind: '20 kn SW' },
            { day: 'Ven', icon: '🌤️', max: 22, min: 16, wind: '8 kn NW' }
        ];

        container.innerHTML = forecast.map(day => `
            <div class="forecast-day">
                <div class="forecast-date">${day.day}</div>
                <div class="forecast-icon">${day.icon}</div>
                <div class="forecast-temps">
                    <span class="temp-max">${day.max}°</span>
                    <span class="temp-min">${day.min}°</span>
                </div>
                <div class="forecast-wind">
                    <small>${day.wind}</small>
                </div>
            </div>
        `).join('');
    }

    // Carica condizioni marine avanzate stile Windfinder
    async loadMarineConditions(coords) {
        const container = document.getElementById('marineData');
        if (!container) return;

        try {
            // Simula dati marine realistici per Adriatico
            const marineData = await this.getAdriaticMarineData(coords);

            container.innerHTML = `
                <div class="marine-item">
                    <div class="marine-value">${marineData.waveHeight}m</div>
                    <div class="marine-label">Altezza Onde</div>
                </div>
                <div class="marine-item">
                    <div class="marine-value">${marineData.waveDirection}</div>
                    <div class="marine-label">Direzione Onde</div>
                </div>
                <div class="marine-item">
                    <div class="marine-value">${marineData.wavePeriod}s</div>
                    <div class="marine-label">Periodo Onde</div>
                </div>
                <div class="marine-item">
                    <div class="marine-value">${marineData.tideLevel}m</div>
                    <div class="marine-label">Marea</div>
                </div>
                <div class="marine-item">
                    <div class="marine-value">${marineData.waterTemp}°C</div>
                    <div class="marine-label">Temp. Acqua</div>
                </div>
                <div class="marine-item">
                    <div class="marine-value">${marineData.visibility}m</div>
                    <div class="marine-label">Visibilità Subacquea</div>
                </div>
            `;

            // Aggiungi indicatori per la pesca
            const fishingConditions = this.evaluateFishingConditions(marineData);
            container.innerHTML += `
                <div class="fishing-conditions">
                    <h4>🎣 Condizioni Pesca:</h4>
                    <div class="condition-indicator ${fishingConditions.class}">
                        ${fishingConditions.icon} ${fishingConditions.text}
                    </div>
                </div>
            `;

        } catch (error) {
            console.error('Errore condizioni marine:', error);
            this.loadMarineConditionsSimulated();
        }
    }

    // Ottieni dati marine realistici per l'Adriatico
    async getAdriaticMarineData(coords) {
        // Simula dati realistici per Ugliano basati su patterns adriatici
        const now = new Date();
        const hour = now.getHours();
        const season = this.getCurrentSeason();

        // Variazioni stagionali e circadiane
        const baseWaveHeight = season === 'summer' ? 0.3 : 0.8;
        const baseWaterTemp = season === 'summer' ? 24 : season === 'winter' ? 16 : 20;
        
        // Variazione giornaliera delle onde (più calme al mattino)
        const hourlyWaveFactor = hour < 6 ? 0.5 : hour < 12 ? 0.7 : hour < 18 ? 1.0 : 0.8;
        
        return {
            waveHeight: +(baseWaveHeight * hourlyWaveFactor + Math.random() * 0.3).toFixed(1),
            waveDirection: ['NW', 'NE', 'SW', 'SE'][Math.floor(Math.random() * 4)],
            wavePeriod: Math.floor(8 + Math.random() * 12), // 8-20 secondi
            tideLevel: +((Math.sin(hour * Math.PI / 12) * 0.4).toFixed(1)), // Variazione circadiana
            waterTemp: Math.floor(baseWaterTemp + Math.random() * 3),
            visibility: Math.floor(12 + Math.random() * 18), // 12-30m tipico Adriatico
            seaState: this.getSeaState(baseWaveHeight * hourlyWaveFactor)
        };
    }

    // Valuta condizioni per la pesca
    evaluateFishingConditions(marineData) {
        let score = 0;
        
        // Onde: migliori sotto 1m
        if (marineData.waveHeight < 0.5) score += 3;
        else if (marineData.waveHeight < 1.0) score += 2;
        else if (marineData.waveHeight < 1.5) score += 1;

        // Visibilità: migliore sopra 20m
        if (marineData.visibility > 20) score += 2;
        else if (marineData.visibility > 15) score += 1;

        // Temperatura acqua: ideale 22-26°C
        if (marineData.waterTemp >= 22 && marineData.waterTemp <= 26) score += 1;

        if (score >= 5) return { class: 'excellent', icon: '🟢', text: 'Eccellenti' };
        if (score >= 3) return { class: 'good', icon: '🟡', text: 'Buone' };
        if (score >= 1) return { class: 'fair', icon: '🟠', text: 'Discrete' };
        return { class: 'poor', icon: '🔴', text: 'Difficili' };
    }

    // Ottieni stagione corrente
    getCurrentSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'autumn';
        return 'winter';
    }

    // Stato del mare
    getSeaState(waveHeight) {
        if (waveHeight < 0.5) return 'Calmo';
        if (waveHeight < 1.0) return 'Poco Mosso';
        if (waveHeight < 2.0) return 'Mosso';
        return 'Molto Mosso';
    }

    // Carica condizioni marine avanzate stile Windfinder
    async loadMarineConditions(coords) {
        const container = document.getElementById('marineData');
        if (!container) return;

        try {
            // Simula dati marine realistici per Adriatico
            const marineData = await this.getAdriaticMarineData(coords);

            container.innerHTML = `
                <div class="marine-item">
                    <div class="marine-value">${marineData.waveHeight}m</div>
                    <div class="marine-label">Altezza Onde</div>
                </div>
                <div class="marine-item">
                    <div class="marine-value">${marineData.waveDirection}</div>
                    <div class="marine-label">Direzione Onde</div>
                </div>
                <div class="marine-item">
                    <div class="marine-value">${marineData.wavePeriod}s</div>
                    <div class="marine-label">Periodo Onde</div>
                </div>
                <div class="marine-item">
                    <div class="marine-value">${marineData.tideLevel}m</div>
                    <div class="marine-label">Marea</div>
                </div>
                <div class="marine-item">
                    <div class="marine-value">${marineData.waterTemp}°C</div>
                    <div class="marine-label">Temp. Acqua</div>
                </div>
                <div class="marine-item">
                    <div class="marine-value">${marineData.visibility}m</div>
                    <div class="marine-label">Visibilità Subacquea</div>
                </div>
            `;

            // Aggiungi indicatori per la pesca
            const fishingConditions = this.evaluateFishingConditions(marineData);
            container.innerHTML += `
                <div class="fishing-conditions">
                    <h4>🎣 Condizioni Pesca:</h4>
                    <div class="condition-indicator ${fishingConditions.class}">
                        ${fishingConditions.icon} ${fishingConditions.text}
                    </div>
                </div>
            `;

        } catch (error) {
            console.error('Errore condizioni marine:', error);
            this.loadMarineConditionsSimulated();
        }
    }

    // Ottieni dati marine realistici per l'Adriatico
    async getAdriaticMarineData(coords) {
        // Simula dati realistici per Ugliano basati su patterns adriatici
        const now = new Date();
        const hour = now.getHours();
        const season = this.getCurrentSeason();

        // Variazioni stagionali e circadiane
        const baseWaveHeight = season === 'summer' ? 0.3 : 0.8;
        const baseWaterTemp = season === 'summer' ? 24 : season === 'winter' ? 16 : 20;
        
        // Variazione giornaliera delle onde (più calme al mattino)
        const hourlyWaveFactor = hour < 6 ? 0.5 : hour < 12 ? 0.7 : hour < 18 ? 1.0 : 0.8;
        
        return {
            waveHeight: +(baseWaveHeight * hourlyWaveFactor + Math.random() * 0.3).toFixed(1),
            waveDirection: ['NW', 'NE', 'SW', 'SE'][Math.floor(Math.random() * 4)],
            wavePeriod: Math.floor(8 + Math.random() * 12), // 8-20 secondi
            tideLevel: +((Math.sin(hour * Math.PI / 12) * 0.4).toFixed(1)), // Variazione circadiana
            waterTemp: Math.floor(baseWaterTemp + Math.random() * 3),
            visibility: Math.floor(12 + Math.random() * 18), // 12-30m tipico Adriatico
            seaState: this.getSeaState(baseWaveHeight * hourlyWaveFactor)
        };
    }

    // Valuta condizioni per la pesca
    evaluateFishingConditions(marineData) {
        let score = 0;
        
        // Onde: migliori sotto 1m
        if (marineData.waveHeight < 0.5) score += 3;
        else if (marineData.waveHeight < 1.0) score += 2;
        else if (marineData.waveHeight < 1.5) score += 1;

        // Visibilità: migliore sopra 20m
        if (marineData.visibility > 20) score += 2;
        else if (marineData.visibility > 15) score += 1;

        // Temperatura acqua: ideale 22-26°C
        if (marineData.waterTemp >= 22 && marineData.waterTemp <= 26) score += 1;

        if (score >= 5) return { class: 'excellent', icon: '🟢', text: 'Eccellenti' };
        if (score >= 3) return { class: 'good', icon: '🟡', text: 'Buone' };
        if (score >= 1) return { class: 'fair', icon: '🟠', text: 'Discrete' };
        return { class: 'poor', icon: '🔴', text: 'Difficili' };
    }

    // Ottieni stagione corrente
    getCurrentSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'autumn';
        return 'winter';
    }

    // Stato del mare
    getSeaState(waveHeight) {
        if (waveHeight < 0.5) return 'Calmo';
        if (waveHeight < 1.0) return 'Poco Mosso';
        if (waveHeight < 2.0) return 'Mosso';
        return 'Molto Mosso';
    }

    // Condizioni marine simulate (fallback)
    loadMarineConditionsSimulated() {
        const container = document.getElementById('marineData');
        if (!container) return;

        const marineData = {
            waveHeight: 0.8,
            waveDirection: 'NW',
            wavePeriod: 12,
            tideLevel: '+0.2',
            waterTemp: 24,
            visibility: 18
        };

        container.innerHTML = `
            <div class="marine-item">
                <div class="marine-value">${marineData.waveHeight}m</div>
                <div class="marine-label">Altezza Onde</div>
            </div>
            <div class="marine-item">
                <div class="marine-value">${marineData.waveDirection}</div>
                <div class="marine-label">Direzione Onde</div>
            </div>
            <div class="marine-item">
                <div class="marine-value">${marineData.wavePeriod}s</div>
                <div class="marine-label">Periodo Onde</div>
            </div>
            <div class="marine-item">
                <div class="marine-value">${marineData.tideLevel}m</div>
                <div class="marine-label">Marea</div>
            </div>
            <div class="marine-item">
                <div class="marine-value">${marineData.waterTemp}°C</div>
                <div class="marine-label">Temp. Acqua</div>
            </div>
            <div class="marine-item">
                <div class="marine-value">${marineData.visibility}m</div>
                <div class="marine-label">Visibilità Sub</div>
            </div>
            <div class="fishing-conditions">
                <h4>🎣 Condizioni Pesca:</h4>
                <div class="condition-indicator good">
                    🟡 Buone
                </div>
            </div>
        `;
    }

    // Carica orari ottimali
    loadOptimalTimes() {
        const container = document.getElementById('optimalTimes');
        if (!container) return;

        const optimalTimes = [
            { period: 'Alba', range: '05:30 - 07:30', activity: 'Caccia principale', icon: '🌅' },
            { period: 'Mattina', range: '07:30 - 10:00', activity: 'Pesca ricreativa', icon: '🌄' },
            { period: 'Sera', range: '17:00 - 19:30', activity: 'Seconda sessione', icon: '🌇' },
            { period: 'Notte', range: '20:00 - 22:00', activity: 'Solo esperti', icon: '🌙' }
        ];

        container.innerHTML = optimalTimes.map(time => `
            <div class="time-card">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${time.icon}</div>
                <div class="time-period">${time.period}</div>
                <div class="time-range">${time.range}</div>
                <div class="time-activity">${time.activity}</div>
            </div>
        `).join('');
    }

    // Setup auto-refresh meteo
    setupAutoRefresh() {
        // Refresh automatico ogni 10 minuti
        setInterval(() => {
            if (this.currentSection === 'meteo') {
                console.log('🔄 Auto-refresh dati meteo...');
                this.loadWeatherData();
            }
        }, 10 * 60 * 1000); // 10 minuti

        // Refresh quando diventa visibile la sezione meteo
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.currentSection === 'meteo') {
                this.loadWeatherData();
            }
        });
    }

    // Refresh manuale dei dati meteo
    async refreshWeatherData() {
        const sections = ['currentWeather', 'weatherForecast', 'marineData'];
        
        // Mostra indicatori di caricamento
        sections.forEach(sectionId => {
            const container = document.getElementById(sectionId);
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <div class="loading-spinner"></div>
                        <p>Aggiornamento dati...</p>
                    </div>
                `;
            }
        });

        // Ricarica dati
        await this.loadWeatherData();
    }

    // Setup chat AI
    setupAIChat() {
        // Chat già inizializzata in HTML
        // Qui gestiamo solo la logica di invio messaggi
    }

    // Invia messaggio AI
    sendAIMessage(message = null) {
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');
        
        if (!chatInput || !chatMessages) return;

        const messageText = message || chatInput.value.trim();
        if (!messageText) return;

        // Aggiungi messaggio utente
        this.addChatMessage(messageText, 'user');

        // Simula risposta AI (ora async)
        setTimeout(async () => {
            const response = await this.generateAIResponse(messageText);
            this.addChatMessage(response.content, 'ai', response.title);
        }, 1000);

        // Reset input
        if (!message) {
            chatInput.value = '';
        }
    }

    // Aggiungi messaggio alla chat
    addChatMessage(content, sender, title = null) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;

        const avatar = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        let titleHtml = '';
        if (title && sender === 'ai') {
            titleHtml = `<h4 style="color: #1e40af; margin-bottom: 0.5rem;">${title}</h4>`;
        }

        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                ${titleHtml}
                ${this.formatAIContent(content)}
            </div>
        `;

        chatMessages.appendChild(messageDiv);

        // Scroll in basso
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Formatta contenuto AI
    formatAIContent(content) {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/^\s*-\s+/gm, '• ');
    }

    // Genera risposta AI (con supporto API esterna se configurata)
    async generateAIResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Prova prima con Claude API se configurata
        if (window.AppConfig && window.AppConfig.hasApiKey('claude')) {
            try {
                const apiResponse = await this.callClaudeAPI(message);
                if (apiResponse) return apiResponse;
            } catch (error) {
                console.log('Claude API fallita, provo OpenAI:', error.message);
            }
        }

        // Fallback a OpenAI se Claude non disponibile
        if (window.AppConfig && window.AppConfig.hasApiKey('openai')) {
            try {
                const apiResponse = await this.callOpenAIAPI(message);
                if (apiResponse) return apiResponse;
            } catch (error) {
                console.log('Fallback a risposte predefinite:', error.message);
            }
        }

        // Risposte predefinite come fallback
        if (lowerMessage.includes('apnea') || lowerMessage.includes('respirazione')) {
            return AI_RESPONSES.apnea;
        }
        
        if (lowerMessage.includes('dentici') || lowerMessage.includes('dentice')) {
            return AI_RESPONSES.dentici;
        }
        
        if (lowerMessage.includes('grotte') || lowerMessage.includes('grotta')) {
            return AI_RESPONSES.grotte;
        }
        
        if (lowerMessage.includes('meteo') || lowerMessage.includes('tempo') || lowerMessage.includes('vento')) {
            return AI_RESPONSES.meteo;
        }

        // Risposta generica
        return {
            title: "Assistente Pesca Subacquea",
            content: `
            Grazie per la tua domanda! Ecco alcune informazioni utili:

            **Per domande specifiche, prova a chiedere:**
            • Come migliorare l'apnea?
            • Migliore setup per dentici?
            • Come pescare nelle grotte?
            • Leggere condizioni meteo?

            **Punti di pesca consigliati oggi:**
            • Muline NW Reef - ottimo per dentici all'alba
            • Lukoran Punta - perfetto per principianti
            • Kali South Rocks - ideale per seppie

            Hai qualche domanda più specifica? Sono qui per aiutarti!
            `
        };
    }

    // Chiama API Claude se configurata
    async callClaudeAPI(message) {
        const apiKey = window.AppConfig.getApiKey('claude');
        if (!apiKey) return null;

        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-3-sonnet-20240229',
                    max_tokens: 800,
                    messages: [{
                        role: 'user',
                        content: `Sei un esperto maestro di pesca subacquea e apnea per la zona di Ugliano, Croazia. Hai 30+ anni di esperienza nell'Adriatico settentrionale.

EXPERTISE AREAS:
- Tecniche di respirazione e apnea avanzate
- Tattiche di pesca con fucile subacqueo per ogni specie
- Lettura delle condizioni marine e meteo adriatiche
- Sicurezza in apnea e prevenzione incidenti
- Equipment setup e configurazioni fucile
- Comportamento dei pesci dell'Adriatico
- Punti di pesca specifici di Ugliano

SPECIALIZZAZIONI TECNICHE:
- Controllo respiratorio: preparazione, iperossigenazione controllata, recovery
- Tecniche di tiro: lead, compensazione, distanza ottimale
- Fucili: roller, pneumatico, arbalete, setup custom
- Apnea profonda: equalizzazione, Frenzel, pressurizzazione
- Tattiche specie-specifiche per dentici, ricciole, cernie

Rispondi con consigli PRATICI e DETTAGLIATI basati sulla tua esperienza reale. Includi sempre aspetti di SICUREZZA.

DOMANDA: ${message}`
                    }]
                })
            });

            if (!response.ok) throw new Error('Claude API call failed');

            const data = await response.json();
            return {
                title: "🏊‍♂️ Maestro di Pesca Subacquea - Ugliano Expert",
                content: data.content[0].text
            };
        } catch (error) {
            console.error('Errore chiamata Claude:', error);
            return null;
        }
    }

    // Chiama API OpenAI se configurata
    async callOpenAIAPI(message) {
        const apiKey = window.AppConfig.getApiKey('openai');
        if (!apiKey) return null;

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{
                        role: 'system',
                        content: 'Sei un esperto di pesca subacquea per la zona di Ugliano in Croazia. Fornisci consigli pratici, sicuri e specifici per questa zona dell\'Adriatico.'
                    }, {
                        role: 'user',
                        content: message
                    }],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            if (!response.ok) throw new Error('API call failed');

            const data = await response.json();
            return {
                title: "AI Assistant - Ugliano Spearfishing",
                content: data.choices[0].message.content
            };
        } catch (error) {
            console.error('Errore chiamata OpenAI:', error);
            return null;
        }
    }
}

// Inizializza app quando DOM è pronto
const app = new UglianoSpearfishingApp();

// Funzioni utility globali
window.UglianoApp = {
    // Centra mappa su coordinate
    centerMap: function(lat, lng, zoom = 15) {
        if (app.map) {
            app.map.setView([lat, lng], zoom);
        }
    },

    // Mostra informazioni spot
    showSpotInfo: function(spotId) {
        const spot = DataUtils.getSpotById(spotId);
        if (spot) {
            app.centerMapOnSpot(spot);
        }
    },

    // Cerca pesce
    searchFish: function(query) {
        app.searchFish(query);
        app.showSection('pesci');
    },

    // Invia domanda AI
    askAI: function(question) {
        app.showSection('formazione');
        setTimeout(() => {
            app.sendAIMessage(question);
        }, 500);
    }
};

// Export per moduli (se necessario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UglianoSpearfishingApp;
}
