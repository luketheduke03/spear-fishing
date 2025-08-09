// Dati per l'applicazione Pesca Subacquea Ugliano

// Configurazione mappa (coordinate precise da Google Maps)
const MAP_CONFIG = {
    center: [44.120, 15.150], // Centro preciso di Ugliano
    zoom: 13,
    maxZoom: 18,
    minZoom: 10
};

// Punti di pesca con informazioni dettagliate (coordinate corrette sulla costa)
const FISHING_SPOTS = [
    {
        id: 1,
        name: "Muline NW Reef",
        coordinates: [44.137689, 15.067422],
        type: "reef",
        depth: "6-18m",
        bottom: "Scogliere calcaree spezzate, banchi di alghe in primavera",
        targets: [
            {
                name: "Dentice",
                scientific: "Dentex dentex",
                depth: "12-15m",
                time: "prima luce",
                tactic: "Pattuglia il plateau a 12-15m all'alba"
            },
            {
                name: "Sarago",
                scientific: "Diplodus sargus", 
                depth: "6-8m",
                time: "mattino",
                tactic: "6-8m sulla sommità piatta"
            },
            {
                name: "Cernia Bruna",
                scientific: "Epinephelus marginatus",
                depth: "15m",
                time: "alba",
                tactic: "Sotto le sporgenze a 15m"
            }
        ],
        primeTime: "05:15-07:30 (alba +90 min)",
        windRule: "Maestrale (NW) ≤ 10 nodi rende la superficie piatta, vis 20m+",
        access: "Parcheggio a Muline (gratuito), 60m nuoto N-NW fino al bordo",
        equipment: {
            gun: "90-100cm roller",
            bands: "16mm small-ID bands",
            shaft: "7mm tri-cut",
            reel: "30m"
        },
        mainTactic: "Scendi lentamente a 12m, abbraccia la linea d'ombra del gradino, aspetta 45s - i dentici spesso ti seguono nell'ombra.",
        difficulty: "medium",
        visibility: "20m+",
        bestMonths: ["aprile", "maggio", "giugno", "settembre", "ottobre"]
    },
    {
        id: 2,
        name: "Južna Luka Cave",
        coordinates: [44.133019, 15.063004],
        type: "cave",
        depth: "5-12m",
        bottom: "Entrata sabbiosa 5m → grotta fangosa 12m, buia",
        targets: [
            {
                name: "Scorfano",
                scientific: "Scorpaena scrofa",
                depth: "5-12m",
                time: "tramonto",
                tactic: "Immobile sui massi"
            },
            {
                name: "Murena",
                scientific: "Muraena helena",
                depth: "8-12m", 
                time: "giorno",
                tactic: "Tetto della grotta, attiva di notte ma presente di giorno"
            }
        ],
        primeTime: "17:00-19:00 (il tramonto illumina la grotta)",
        windRule: "Protetta dalla Bora; marosi > 1m rendono il surge insopportabile",
        access: "Attrezzatura da spiaggia permessa, 2 min nuoto",
        equipment: {
            gun: "75cm",
            light: "torcia 1000 lm", 
            protection: "guanti (spine!)"
        },
        mainTactic: "Entra in grotta in apnea, flash una volta, scegli lo scorfano più vicino; esci immediatamente per evitare accumulo CO₂.",
        difficulty: "hard",
        visibility: "variabile",
        bestMonths: ["maggio", "giugno", "luglio", "agosto", "settembre"]
    },
    {
        id: 3,
        name: "Mostir Plateau",
        coordinates: [44.134405, 15.102139],
        type: "plateau",
        depth: "8-20m",
        bottom: "Plateau calcareo a 8m, poi gradino verso lingua sabbiosa 20m",
        targets: [
            {
                name: "Ricciola",
                scientific: "Seriola dumerili",
                depth: "8-12m",
                time: "slack tide",
                tactic: "Passa 1-2m sopra il plateau"
            },
            {
                name: "Mero",
                scientific: "Epinephelus aeneus",
                depth: "18-20m",
                time: "slack tide",
                tactic: "18-20m sulla sabbia"
            }
        ],
        primeTime: "Slack tide ±30 min (controlla tabella maree Zadar)",
        windRule: "Evita Bora NE > 12 nodi (crea upwelling, vis scende a 5m)",
        access: "Strada sterrata 300m, parcheggio presso rovine cappella",
        equipment: {
            gun: "110-120cm roller",
            float: "break-away 40m bungee per meri > 20kg"
        },
        mainTactic: "Deriva lungo il bordo, mantieni 1m dal fondo così le ricciole si stagliiano contro la superficie.",
        difficulty: "hard",
        visibility: "5-15m",
        bestMonths: ["giugno", "luglio", "agosto", "settembre"]
    },
    {
        id: 4,
        name: "Lukoran Punta",
        coordinates: [44.094269, 15.179006],
        type: "mixed",
        depth: "4-14m",
        bottom: "4-14m misto Posidonia / roccia",
        targets: [
            {
                name: "Orata",
                scientific: "Sparus aurata",
                depth: "4-10m",
                time: "alba",
                tactic: "Radicano nell'erba marina, taglia 30-50cm"
            },
            {
                name: "Spigola", 
                scientific: "Dicentrarchus labrax",
                depth: "6-14m",
                time: "alba",
                tactic: "Agguato dietro massi"
            }
        ],
        primeTime: "05:30-07:00 (prima dei kayak a noleggio)",
        windRule: "Mattine di vetro con Maestrale, vis 25m",
        access: "Parcheggio centro Lukoran, 200m a piedi N lungo sentiero",
        equipment: {
            gun: "75-90cm",
            suit: "mimetica verde 3.5mm",
            reel: "piccolo mulinello"
        },
        mainTactic: "Lenta strisciata sulla pancia sull'erba marina, guarda i flash dorati; spara 30cm sopra il pesce (rifrazione).",
        difficulty: "easy",
        visibility: "25m",
        bestMonths: ["aprile", "maggio", "giugno", "settembre", "ottobre"]
    },
    {
        id: 5,
        name: "Preko-Ošljak Channel",
        coordinates: [44.075555, 15.210043],
        type: "channel",
        depth: "6-25m",
        bottom: "6m sabbia → 25m pendio canale con massi grandi",
        targets: [
            {
                name: "Aquila di Mare",
                scientific: "Myliobatis aquila",
                depth: "10-15m",
                time: "marea crescente",
                tactic: "Crociera a mezz'acqua 10-15m"
            },
            {
                name: "Dentice",
                scientific: "Dentex dentex",
                depth: "15-25m",
                time: "marea crescente", 
                tactic: "Pattuglia bordi pendio"
            }
        ],
        primeTime: "06:00-08:00 marea crescente porta plancton e pesci esca",
        windRule: "Il canale incanalizza qualsiasi vento - annulla se Maestrale > 12 nodi",
        access: "15 min kayak dalla spiaggia Preko (noleggio €10 / 2h)",
        equipment: {
            gun: "110cm roller + slip-tip per razze",
            float: "50m float line"
        },
        mainTactic: "Rimani sospeso a 10m, guarda ali triangolari scure contro superficie; mira appena davanti al bordo d'attacco.",
        difficulty: "hard",
        visibility: "10-20m",
        bestMonths: ["maggio", "giugno", "luglio", "agosto"]
    },
    {
        id: 6,
        name: "Kali South Rocks",
        coordinates: [44.064462, 15.206330],
        type: "reef",
        depth: "5-15m",
        bottom: "5-15m scogliere basse sulla sabbia",
        targets: [
            {
                name: "Seppia",
                scientific: "Sepia officinalis",
                depth: "5-10m",
                time: "alba",
                tactic: "Coppie sulla sabbia di notte, presenti all'alba"
            },
            {
                name: "Triglia",
                scientific: "Mullus surmuletus",
                depth: "5-12m",
                time: "alba",
                tactic: "Sopra banchi di sabbia"
            }
        ],
        primeTime: "05:45-07:00 (prima del traffico portuale)",
        windRule: "Marosi da SE > 0.5m muovono sabbia, vis scende",
        access: "Molo pubblico 200m a piedi, entrata da scala",
        equipment: {
            gun: "75cm",
            light: "piccola torcia per occhi seppia"
        },
        mainTactic: "Muoviti parallelo alla scogliera, cerca seppie sospese - spara appena dietro l'occhio.",
        difficulty: "easy",
        visibility: "8-15m",
        bestMonths: ["marzo", "aprile", "maggio", "settembre", "ottobre"]
    },
    {
        id: 7,
        name: "Zelena Punta Drop-off",
        coordinates: [44.035259, 15.250331],
        type: "wall",
        depth: "7-22m",
        bottom: "7m scogliera → 22m parete verticale",
        targets: [
            {
                name: "Grongo",
                scientific: "Conger conger",
                depth: "10-20m",
                time: "sera",
                tactic: "Buchi 10-20m"
            },
            {
                name: "Cottora",
                scientific: "Labrus merula",
                depth: "7-15m",
                time: "sera",
                tactic: "Pattuglia parete"
            }
        ],
        primeTime: "18:00-19:30 (parete in ombra, pesci risalgono a nutrirsi)",
        windRule: "Maestrale mantiene la parete calma",
        access: "Spiaggia resort, parcheggio a pagamento, 3 min nuoto alla parete",
        equipment: {
            gun: "100cm",
            reel: "40m",
            light: "torcia per ispezione buchi"
        },
        mainTactic: "Incuneati a 15m, aspetta 60s - testa grongo emerge; tiro stone-tooth.",
        difficulty: "medium",
        visibility: "15-20m",
        bestMonths: ["giugno", "luglio", "agosto", "settembre"]
    },
    {
        id: 8,
        name: "Pavlešina Sand-Weed Edge",
        coordinates: [44.036607, 15.221673],
        type: "mixed",
        depth: "4-12m",
        bottom: "4-12m sabbia con banchi isolati di alghe",
        targets: [
            {
                name: "Cefalo",
                scientific: "Chelon auratus",
                depth: "4-8m",
                time: "alba/sera",
                tactic: "Branchi sopra le alghe"
            },
            {
                name: "Barracuda",
                scientific: "Sphyraena sphyraena",
                depth: "8-10m",
                time: "alba/sera",
                tactic: "8-10m a mezz'acqua"
            }
        ],
        primeTime: "05:30-07:00 & 17:00-18:30",
        windRule: "Qualsiasi mareggiata > 1m riduce vis a 5m",
        access: "Strada asfaltata, parcheggio gratuito, 100m nuoto",
        equipment: {
            gun: "90cm roller",
            line: "fluorocarbon 1.5mm"
        },
        mainTactic: "Sdraiati sul bordo sabbia, lascia che i cefali girino intorno, scegli il più grande.",
        difficulty: "easy",
        visibility: "5-15m",
        bestMonths: ["aprile", "maggio", "giugno", "settembre", "ottobre"]
    }
];

// Dati sui pesci dell'Adriatico
const FISH_DATA = [
    {
        id: 1,
        name: "Dentice",
        scientific: "Dentex dentex",
        difficulty: "hard", 
        minSize: 25,
        imageUrl: "https://fishing-guides-slovenia.com/wp-content/uploads/dentex.webp",
        description: "Predatore elegante dalle carni pregiate. Vive in profondità su fondi rocciosi e si avvicina alla costa all'alba per cacciare.",
        habitat: "Fondi rocciosi 10-50m, scogliere e plateau",
        bestTime: "Alba (05:00-07:30)",
        tactics: [
            "Aspetta immobile sul fondo",
            "Usa l'effetto silhouette contro la superficie",
            "Spara quando si avvicina per curiosità",
            "Evita movimenti bruschi",
            "Preferisce zone con corrente"
        ],
        equipment: "Fucile 100-120cm, mulinello 30-40m",
        seasonality: "Migliore: Aprile-Giugno, Settembre-Ottobre",
        tips: "Il dentice è curioso ma diffidente. Spesso segue il pescatore nell'ombra prima di attaccare."
    },
    {
        id: 2,
        name: "Ricciola", 
        scientific: "Seriola dumerili",
        difficulty: "hard",
        minSize: 60,
        imageUrl: "https://www.chefmagazine.it/wp-content/uploads/2019/03/Ricciola-seriola-lalandi.jpg",
        description: "Grande pelagico velocissimo, può superare i 50kg. Caccia in gruppi e ha un'accelerazione impressionante.",
        habitat: "Acque aperte, bordi di secche 15-40m",
        bestTime: "Prima mattina, slack tide",
        tactics: [
            "Stai sospeso a mezz'acqua",
            "Non muoverti quando si avvicina",
            "Spara quando è perpendicolare",
            "Usa break-away e boa per pesci grandi",
            "Spesso viaggia in gruppo"
        ],
        equipment: "Fucile 110-130cm, break-away 50m, boa",
        seasonality: "Migliore: Giugno-Agosto",
        tips: "La ricciola è imprevedibile. Può passare a distanza o avvicinarsi molto. Preparati sempre al tiro."
    },
    {
        id: 3,
        name: "Cernia Bruna",
        scientific: "Epinephelus marginatus",
        difficulty: "medium",
        minSize: 45,
        imageUrl: "https://www.oceano.org/wp-content/uploads/2020/03/02-M%C3%A9rou-M.-Dagnino.jpg",
        description: "SPECIE PROTETTA - Non catturare! Pesce simbolo del Mediterraneo, in grave pericolo di estinzione.",
        habitat: "Grotte e anfratti rocciosi 5-30m",
        bestTime: "Tutto il giorno",
        tactics: [
            "SOLO OSSERVAZIONE E FOTO",
            "Avvicinati lentamente",
            "Rispetta il suo territorio",
            "Non disturbare durante la riproduzione"
        ],
        equipment: "Solo fotocamera subacquea",
        seasonality: "Presente tutto l'anno",
        tips: "La cernia bruna è PROTETTA. Ammirala e fotografala, ma non catturarla mai!"
    },
    {
        id: 4,
        name: "Sarago",
        scientific: "Diplodus sargus",
        difficulty: "easy",
        minSize: 23,
        imageUrl: "https://www.portofinoamp.it/immagini/SaragomaggiorefotoR.Casale.JPG",
        description: "Pesce comune e combattivo, ottimo per iniziare. Vive in branchi sui fondi rocciosi poco profondi.",
        habitat: "Scogliere 3-15m, praterie di posidonia",
        bestTime: "Mattina presto, sera",
        tactics: [
            "Avvicinamento lento sul fondo",
            "Spesso in gruppo, scegli il più grande",
            "Spara dalla media distanza",
            "Attenzione alle spine dorsali",
            "Preferisce zone con alghe"
        ],
        equipment: "Fucile 75-90cm, mulinello 20m",
        seasonality: "Tutto l'anno, meglio primavera-autunno",
        tips: "Il sarago è perfetto per imparare. Numeroso e non troppo diffidente."
    },
    {
        id: 5,
        name: "Orata",
        scientific: "Sparus aurata",
        difficulty: "medium",
        minSize: 20,
        imageUrl: "https://www.chefmagazine.it/wp-content/uploads/2017/07/Orata_Foto-sub-blog-1180x664.jpg",
        description: "Pesce pregiato dalle carni eccellenti. Spesso confusa con esemplari di allevamento fuggiti.",
        habitat: "Praterie di posidonia, fondali sabbiosi 5-20m",
        bestTime: "Alba, prima del disturbo",
        tactics: [
            "Striscia sulla pancia nell'erba",
            "Movimento molto lento",
            "Compensa la rifrazione sparando alto",
            "Cerca il caratteristico flash dorato",
            "Evita le ore di disturbo turistico"
        ],
        equipment: "Fucile 75-90cm mimetico, mulinello piccolo",
        seasonality: "Migliore: Aprile-Giugno, Settembre-Ottobre", 
        tips: "Distingui le orate selvatiche da quelle d'allevamento: controllare l'opercolo per segni di usura."
    },
    {
        id: 6,
        name: "Spigola",
        scientific: "Dicentrarchus labrax",
        difficulty: "medium",
        minSize: 23,
        imageUrl: "https://cdn.shopify.com/s/files/1/0793/7097/7573/files/pesca-alla-spigola-guida-completa-consigli-suggerimenti-attrezzatura-esche_600x600.jpg?v=1740153408",
        description: "Predatore astuto che caccia in agguato. Frequenta spesso acque salmastre e porti.",
        habitat: "Scogliere, porti, foci 2-25m",
        bestTime: "Alba, tramonto, notte",
        tactics: [
            "Cerca dietro massi e anfratti",
            "Movimento molto lento",
            "Spesso immobile in agguato",
            "Attenzione: può essere nervosa",
            "Preferisce acque mosse"
        ],
        equipment: "Fucile 85-100cm, lenza forte",
        seasonality: "Tutto l'anno, meglio autunno-inverno",
        tips: "La spigola è intelligente e diffidente. Studia l'ambiente prima di avvicinarti."
    },
    {
        id: 7,
        name: "Scorfano",
        scientific: "Scorpaena scrofa",
        difficulty: "easy",
        minSize: 25,
        imageUrl: "https://www.focusjunior.it/content/uploads/2018/07/SCORFANO-ROSSO.jpg",
        description: "Maestro del mimetismo, completamente immobile sui fondali rocciosi. ATTENZIONE ALLE SPINE VELENOSE!",
        habitat: "Fondali rocciosi 5-30m, grotte",
        bestTime: "Tutto il giorno, meglio sera",
        tactics: [
            "Ispeziona ogni roccia con la torcia",
            "Cerca gli occhi che brillano",
            "Completamente immobile, facile da avvicinare",
            "INDOSSA SEMPRE I GUANTI",
            "Spara alla testa per uccisione immediata"
        ],
        equipment: "Fucile 75-90cm, torcia, guanti anti-taglio",
        seasonality: "Tutto l'anno",
        tips: "Lo scorfano è praticamente invisibile. Impara a riconoscere la forma degli occhi."
    },
    {
        id: 8,
        name: "Murena",
        scientific: "Muraena helena",
        difficulty: "hard",
        minSize: 40,
        imageUrl: "https://www.fishi-pedia.com/wp-content/uploads/2021/04/33558447894_22753b3484_o.jpg",
        description: "Predatore notturno dalle mascelle potenti. Vive in tane durante il giorno.",
        habitat: "Grotte, anfratti rocciosi 5-40m",
        bestTime: "Sera, notte",
        tactics: [
            "Ispeziona ogni buco con prudenza",
            "Non mettere mai le mani nelle tane",
            "Spara solo se sei sicuro del tiro",
            "Attenzione al morso anche dopo la cattura",
            "Usa torcia per vedere negli anfratti"
        ],
        equipment: "Fucile 90-110cm, torcia potente, guanti",
        seasonality: "Più attiva estate, presente tutto l'anno",
        tips: "La murena può mordere anche ore dopo la cattura. Massima prudenza sempre!"
    },
    {
        id: 9,
        name: "Seppia",
        scientific: "Sepia officinalis",
        difficulty: "easy",
        minSize: 15,
        imageUrl: "https://www.2000sub.org/img/articoli/seppia/sepia%20officinalis.jpg",
        description: "Mollusco intelligente che cambia colore. Si riproduce in primavera nei fondali sabbiosi.",
        habitat: "Fondali sabbiosi con alghe 3-15m",
        bestTime: "Alba, sera, notte",
        tactics: [
            "Cerca sui fondali sabbiosi",
            "Spesso in coppia durante riproduzione",
            "Usa torcia per far brillare gli occhi",
            "Avvicinamento lento e costante",
            "Spara al corpo, non ai tentacoli"
        ],
        equipment: "Fucile 75-85cm, torcia piccola",
        seasonality: "Migliore: Marzo-Maggio (riproduzione)",
        tips: "Le seppie sono curiose. Se ti muovi lentamente, spesso ti vengono incontro."
    },
    {
        id: 10,
        name: "Barracuda",
        scientific: "Sphyraena sphyraena",
        difficulty: "medium",
        minSize: 30,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Barracuda_laban.jpg",
        description: "Veloce predatore pelagico dai denti affilati. Caccia piccoli pesci in superficie.",
        habitat: "Acque aperte, bordi scogliera 5-25m",
        bestTime: "Alba, sera",
        tactics: [
            "Stai immobile a mezz'acqua",
            "Spesso si avvicina per curiosità",
            "Movimento rapido, preparati al tiro",
            "Mira al centro del corpo",
            "Attenzione ai denti anche da morto"
        ],
        equipment: "Fucile 90-110cm, mulinello robusto",
        seasonality: "Più comune estate, presente tutto l'anno",
        tips: "Il barracuda è curioso ma veloce. Un solo tentativo di tiro di solito."
    },
    {
        id: 11,
        name: "Aquila di Mare",
        scientific: "Myliobatis aquila",
        difficulty: "hard",
        minSize: 80,
        imageUrl: "https://www.acquariodilivorno.it/data/thumb_cache/_data_pagine_img_aquila-di-mare_nxgq9d_jpg_cr_767_500.jpg",
        description: "Grande razza pelagica che si nutre di molluschi. Può raggiungere dimensioni impressionanti e nuota elegantemente.",
        habitat: "Acque aperte, canali profondi 10-40m",
        bestTime: "Marea crescente, slack tide",
        tactics: [
            "Stai sospeso a mezz'acqua",
            "Cerca le ali triangolari scure contro la superficie",
            "Mira appena davanti al bordo d'attacco",
            "Usa slip-tip per penetrazione ottimale",
            "Attenzione alla coda velenosa"
        ],
        equipment: "Fucile 110-130cm, slip-tip, float line 50m",
        seasonality: "Maggio-Agosto, migrazione primaverile",
        tips: "L'aquila di mare è maestosa e veloce. Rispetta sempre le dimensioni minime per la conservazione."
    },
    {
        id: 12,
        name: "Triglia",
        scientific: "Mullus surmuletus",
        difficulty: "easy",
        minSize: 15,
        imageUrl: "https://www.pesceinrete.com/wp-content/uploads/2020/09/Mullus-surmuletus-o-Triglia-di-scoglio.jpg",
        description: "Pesce di fondale con barbigli sensoriali. Vive sui fondali sabbiosi e si nutre di invertebrati.",
        habitat: "Fondali sabbiosi 5-25m, praterie di posidonia",
        bestTime: "Alba, prima del disturbo",
        tactics: [
            "Cerca sui banchi di sabbia",
            "Movimento molto lento sul fondo",
            "Spesso in piccoli gruppi",
            "Spara dalla media distanza",
            "Attenzione ai barbigli sensibili"
        ],
        equipment: "Fucile 75-85cm, mulinello piccolo",
        seasonality: "Tutto l'anno, meglio primavera-autunno",
        tips: "La triglia è un pesce eccellente per principianti. I barbigli indicano la direzione del movimento."
    },
    {
        id: 13,
        name: "Grongo",
        scientific: "Conger conger",
        difficulty: "hard",
        minSize: 58,
        imageUrl: "https://www.colapisci.it/pescitalia/pisces/anguilliformes/congridae/grongo/foto/Conger%20conger-pillon2610.jpg",
        description: "Grande anguilla di mare che vive in tane. Predatore notturno molto forte e combattivo.",
        habitat: "Tane rocciose, pareti verticali 10-50m",
        bestTime: "Sera, notte",
        tactics: [
            "Ispeziona ogni buco con la torcia",
            "Aspetta che la testa emerga dalla tana",
            "Tiro stone-tooth per presa sicura",
            "Attenzione: può essere molto forte",
            "Non mettere mai le mani nelle tane"
        ],
        equipment: "Fucile 100-120cm, torcia potente, stone-tooth",
        seasonality: "Più attivo estate, presente tutto l'anno",
        tips: "Il grongo è un combattente formidabile. Assicurati di avere un tiro perfetto prima di sparare."
    },
    {
        id: 14,
        name: "Cottora",
        scientific: "Labrus merula",
        difficulty: "medium",
        minSize: 20,
        imageUrl: "https://www.fishipedia.it/wp-content/uploads/2020/06/Labrus-merula.jpg",
        description: "Pesce colorato che frequenta le pareti rocciose. Vive in coppia e difende il territorio.",
        habitat: "Pareti rocciose, scogliere 5-30m",
        bestTime: "Sera, quando pattuglia il territorio",
        tactics: [
            "Cerca lungo le pareti rocciose",
            "Spesso in coppia territoriale",
            "Movimento lento e costante",
            "Spara dalla media distanza",
            "Rispetta le coppie riproduttive"
        ],
        equipment: "Fucile 85-100cm, mulinello 25m",
        seasonality: "Tutto l'anno, riproduzione primavera-estate",
        tips: "La cottora è territoriale e curiosa. Se ti muovi lentamente, spesso si avvicina per investigare."
    },
    {
        id: 15,
        name: "Cefalo",
        scientific: "Chelon auratus",
        difficulty: "easy",
        minSize: 20,
        imageUrl: "https://www.dailynautica.com/wp-content/uploads/2018/11/cefalo-Daniele-Bartolucci.jpg",
        description: "Pesce gregario che si nutre di alghe e detriti. Vive in grandi branchi sui fondali misti.",
        habitat: "Fondali misti, praterie di posidonia 3-15m",
        bestTime: "Alba, sera, quando i branchi si muovono",
        tactics: [
            "Sdraiati sul bordo sabbia-alghe",
            "Lascia che i branchi girino intorno",
            "Scegli sempre il pesce più grande",
            "Movimento minimo, massima pazienza",
            "Spesso si avvicinano per curiosità"
        ],
        equipment: "Fucile 75-90cm, mulinello piccolo",
        seasonality: "Tutto l'anno, meglio primavera-autunno",
        tips: "Il cefalo è numeroso e non troppo diffidente. Perfetto per imparare le tecniche di agguato."
    }
];

// Regole dimensioni minime e stagioni chiuse
const SIZE_LIMITS = [
    { species: "Dentex dentex", minSize: 25, notes: "Vulnerabile - evita riproduttori > 3kg" },
    { species: "Sparus aurata", minSize: 20, notes: "Fuggitivi allevamento comuni - controlla opercolo" },
    { species: "Dicentrarchus labrax", minSize: 23, notes: "Chiusura notturna in alcuni porti" },
    { species: "Epinephelus marginatus", minSize: 45, notes: "IN PERICOLO - rilascia se avvistata" },
    { species: "Conger conger", minSize: 58, notes: "Specie profondità - decompressione se > 15m" },
    { species: "Scorpaena scrofa", minSize: 25, notes: "Maneggia con guanti anti-taglio" },
    { species: "Myliobatis aquila", minSize: 80, notes: "Razza protetta - rispetta dimensioni minime" },
    { species: "Mullus surmuletus", minSize: 15, notes: "Barbigli sensibili - maneggia con cura" },
    { species: "Labrus merula", minSize: 20, notes: "Specie territoriale - rispetta coppie riproduttive" },
    { species: "Chelon auratus", minSize: 20, notes: "Pesce gregario - scegli sempre il più grande" },
    { species: "Seriola dumerili", minSize: 60, notes: "Pelagico veloce - usa break-away per pesci grandi" },
    { species: "Diplodus sargus", minSize: 23, notes: "Comune e combattivo - ottimo per principianti" },
    { species: "Muraena helena", minSize: 40, notes: "Predatore notturno - attenzione al morso" },
    { species: "Sepia officinalis", minSize: 15, notes: "Mollusco intelligente - spara al corpo" },
    { species: "Sphyraena sphyraena", minSize: 30, notes: "Predatore veloce - attenzione ai denti" }
];

// Checklist decisioni quotidiane
const DAILY_CHECKLIST = [
    { parameter: "Vento e mareggiate", tool: "Windy - Ugljan" },
    { parameter: "Marea e correnti", tool: "EasyTide - Zadar" },
    { parameter: "Temp acqua / vis", tool: "Previsioni Adriatico" },
    { parameter: "UV e alba", tool: "TimeAndDate - Preko" },
    { parameter: "Avvisi ufficiali", tool: "gov.hr fisheries" }
];

// Pianificatore giornaliero
const DAILY_PLANNER = [
    { time: "04:30", action: "Controlla Windy (< 12 nodi Maestrale)" },
    { time: "05:00", action: "Parti da casa - arriva al punto 20 min prima dell'alba" },
    { time: "05:15", action: "Metti boa e bandiera, carica fucile" },
    { time: "05:30-07:30", action: "Finestra principale di caccia" },
    { time: "07:30", action: "Registra catture, spostati al secondo punto" },
    { time: "11:00-16:00", action: "NO pesca - turisti, luce scarsa" },
    { time: "17:00-19:30", action: "Caccia serale, rientra prima crepuscolo nautico" },
    { time: "20:00", action: "Carica traccia GPS, disinfetta e metti ghiaccio ai pesci" }
];

// Kit ultra-leggero
const ULTRA_LIGHT_KIT = [
    "Muta open-cell 3.5mm mimetica (verde/marrone)",
    "Roller 90cm + asta tahitiana 7mm di ricambio", 
    "Sagola galleggiante 40m + bandiera Alpha rossa/bianca",
    "Maschera basso volume + snorkel 75cm",
    "Cintura zavorra 1kg (alluminio)",
    "Guanti + stringfish dyneema",
    "Righello pesci pieghevole (fino 60cm)",
    "Dry bag con licenza + ID + €20 per caffè dopo immersione"
];

// Messaggi AI predefiniti per la formazione
const AI_RESPONSES = {
    "apnea": {
        title: "🫁 Tecniche Avanzate di Apnea per Pesca Subacquea",
        content: `
        **🎯 PREPARAZIONE RESPIRATORIA (3-5 minuti):**
        
        1. **Fase di Rilassamento:**
           - Galleggia supino, braccia aperte a 45°
           - Rilassa progressivamente: piedi → gambe → tronco → braccia → viso
           - Respiri naturali, non forzati
           - Frequenza cardiaca sotto 60 bpm
        
        2. **Ventilazione Controllata:**
           - 20-30 respiri: inspira 3s, trattieni 1s, espira 4s
           - Diaframmatica pura, espansione addominale
           - Evita iperossigenazione (max 3-4 respiri profondi)
           - Pause progressive: 15s → 20s → 30s
        
        **⚡ ULTIMA RESPIRAZIONE - Tecnica Competition:**
        - Inspira lentamente 80% capacità polmonare (15-20s)
        - Piccola contrazione diaframmatica (packing leggero)
        - Volto completamente rilassato, lingua morbida
        - Heartrate under 50bpm prima dell'immersione
        
        **🏊‍♂️ DISCESA TECNICA:**
        - Duck-dive esplosivo: braccia, testa, tronco in sequenza
        - Gambe dritte e unite, pinne fuori dall'acqua
        - Compensazione preventiva: ogni 1-2m fino a 10m
        - Equalizzazione Frenzel: lingua come pistone
        
        **🎣 IN PESCA - Tecniche Avanzate:**
        - Apnea statica sul fondo: posizione neutra, micro-movimenti
        - Controllo heartbeat: 30-40 bpm in agguato
        - Micro-compensazioni senza movimento testa
        - Gestione CO2: accepta la prima contrazione diaframmatica
        
        **⚠️ SICUREZZA CRITICA:**
        - SEMPRE con compagno esperto (one-up, one-down)
        - Surface interval: minimo 2:1 ratio (apnea:recupero)
        - Signs ipossici: tunnel vision, tingling, confusion → EMERGI
        - Depth limit personale: mai oltre il 80% del PB
        - Recovery breathing: 3 respiri hook, poi naturale
        
        **🌊 CONDIZIONI ADRIATICO:**
        - Vis <10m: limita profondità a 8-10m massimo
        - Onde >0.5m: evita apnee >30s per safety
        - Temp <20°C: prewarming 10min, wetsuit 5mm+
        - Corrente: mai contro corrente in apnea profonda
        `
    },
    "dentici": {
        title: "🐟 Tattica Avanzata Dentici - Adriatico Setup",
        content: `
        **🎯 SETUP TECNICO SPECIALIZZATO:**
        
        **Fucile Configuration:**
        - Roller 110-120cm: Sten 11mm bands, double 16mm
        - Asta 7.5mm tahitiana singola barb (no triple)
        - Mulinello Beuchat Hero: 40m sagola 1.5mm
        - Punta: Single flopper, no slip-tip (massima retention)
        
        **🏊‍♂️ POSIZIONAMENTO STRATEGICO:**
        - Profondità target: 12-18m su drop-off
        - Timing: 30min prima alba + 90min post-alba
        - Posizione: bordo plateau, schiena verso profondità
        - Corrente: leggera (0.2-0.5kt), mai frontale
        
        **🕰️ TIMING PERFETTO UGLIANO:**
        - **05:00-05:30:** Posizionamento e prep
        - **05:30-06:15:** Prima finestra (dentici grandi)
        - **06:15-07:00:** Seconda chance (dentici medi)
        - **07:00+:** Stop - troppo traffico turistico
        
        **🎯 TECNICA DI CACCIA AVANZATA:**
        
        1. **Approach Stealth:**
           - Discesa head-first lungo parete rocciosa
           - Stop a 15m, assetto neutro perfetto
           - Zero movimento per 60-90 secondi
           - Respirazione ultra-controllata (25-30 bpm)
        
        2. **Positioning Master:**
           - Corpo parallelo al fondo, fucile lungo fianco
           - Occhi scansionano 180° lentamente
           - Usa ombra naturale della scogliera
           - Mai controluce - dentice vede tutto
        
        3. **Recognition Pattern:**
           - Dentice approach: nuotata lenta, zigzag
           - Distanza critica: 4-6m (sweet spot)
           - Body language: laterale = curioso, frontale = sospetto
           - Size matters: >3kg solo mattina presto
        
        4. **Shot Technique:**
           - Lead calculation: 20-30cm avanti corpo
           - Target zone: appena dietro opercolo
           - Trigger squeeze: lento e costante (2s)
           - Follow through: mantieni mira post-shot
        
        **🏊‍♂️ COMPORTAMENTO SPECIE:**
        - Dentici viaggiano spesso in coppia
        - Primo tiro = unica chance (non tornano)
        - Grandi esemplari: più cauti, distanza maggiore
        - Pattern: ispezionano pescatore prima dell'approach
        
        **⚠️ ERRORI FATALI DA EVITARE:**
        - Movimento improvviso = game over
        - Guardare direttamente il pesce = fuga
        - Caricare fucile in vista del dentice
        - Sparare in corsa o con fretta
        - Inseguire dopo miss shot
        
        **🌊 HOTSPOTS SPECIFICI UGLIANO:**
        - **Muline NW:** Best 05:30-06:30, depth 14-16m
        - **Mostir Drop:** Slack tide ±30min, depth 18-20m  
        - **Preko Channel:** Marea crescente, corrente 0.3kt
        - **Lukoran Deep:** Backup spot, meno pressure
        `
    },
    "grotte": {
        title: "Pesca Sicura nelle Grotte",
        content: `
        **Sicurezza Prima di Tutto:**
        
        ⚠️ **Regole Fondamentali:**
        - Mai oltre 3m dall'uscita
        - Sempre torcia principale + backup
        - Apnea max 30-40 secondi
        - Compagno sempre in superficie
        
        **Attrezzatura Grotte:**
        
        🔦 **Illuminazione:** 1000+ lumen
        🧤 **Protezione:** Guanti anti-taglio
        🎯 **Fucile:** 75-85cm maneggievole
        🎭 **Maschera:** Anti-appannamento
        
        **Tecniche:**
        
        1. **Entrata:**
           - Ispeziona prima dall'esterno
           - Entra lentamente
           - Flash una sola volta
        
        2. **Caccia:**
           - Cerca scorfani sui massi
           - Murene negli anfratti
           - Movimento minimo
           - Tiro preciso e veloce
        
        3. **Uscita:**
           - Esci immediatamente dopo tiro
           - Non cercare pesci feriti dentro
           - Recupera sempre fuori
        
        **Grotte Migliori Ugliano:**
        - Južna Luka: sera, scorfani
        - Kali Rocks: alba, seppie
        `
    },
    "meteo": {
        title: "Leggere le Condizioni Meteo",
        content: `
        **Fattori Chiave:**
        
        🌊 **Vento:**
        - Maestrale (NW): Ideale <12 nodi
        - Bora (NE): Evita >10 nodi
        - Scirocco (SE): Mescola acqua
        - Libeccio (SW): Onde lunghe
        
        **Visibilità:**
        
        ✅ **Ottima (20m+):**
        - Maestrale leggero 2-3 giorni
        - Mare calmo
        - Alta pressione
        
        ⚠️ **Scarsa (<10m):**
        - Vento forte recente
        - Pioggia abbondante
        - Bassa pressione
        
        **Maree Adriatico:**
        - Escursione: 30-80cm
        - Slack tide: migliori condizioni
        - Marea crescente: porta pesce
        - Tabelle: usa Zadar come riferimento
        
        **App Consigliate:**
        - Windy: vento e onde
        - Tide Chart: maree
        - Adriatic Sea: temperatura
        
        **Decisioni:**
        - Vento <12 nodi: GO
        - Vis >15m: perfetto
        - Marea slack ±30min: ideale per grandi pesci
        `
    }
};

// Funzioni helper per manipolazione dati
const DataUtils = {
    // Filtra punti per tipo
    filterSpotsByType: function(type) {
        if (type === 'all') return FISHING_SPOTS;
        return FISHING_SPOTS.filter(spot => spot.type === type);
    },
    
    // Filtra pesci per difficoltà
    filterFishByDifficulty: function(difficulty) {
        if (difficulty === 'all') return FISH_DATA;
        return FISH_DATA.filter(fish => fish.difficulty === difficulty);
    },
    
    // Cerca pesci per nome
    searchFish: function(query) {
        const lowercaseQuery = query.toLowerCase();
        return FISH_DATA.filter(fish => 
            fish.name.toLowerCase().includes(lowercaseQuery) ||
            fish.scientific.toLowerCase().includes(lowercaseQuery)
        );
    },
    
    // Ottieni punto per ID
    getSpotById: function(id) {
        return FISHING_SPOTS.find(spot => spot.id === id);
    },
    
    // Ottieni pesce per ID
    getFishById: function(id) {
        return FISH_DATA.find(fish => fish.id === id);
    },
    
    // Ottieni punti per stagione
    getSpotsByMonth: function(month) {
        return FISHING_SPOTS.filter(spot => 
            spot.bestMonths && spot.bestMonths.includes(month.toLowerCase())
        );
    }
};

// Esporta per uso globale
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MAP_CONFIG,
        FISHING_SPOTS,
        FISH_DATA,
        SIZE_LIMITS,
        DAILY_CHECKLIST,
        DAILY_PLANNER,
        ULTRA_LIGHT_KIT,
        AI_RESPONSES,
        DataUtils
    };
}
