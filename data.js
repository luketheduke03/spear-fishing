// Dati principali: spot, pesci, regole, planner, checklist, quick-copy GPS.
// Mantieni descrizioni brevi per chiarezza. Tutto in italiano.

window.SF_SPOTS = [
  {
    name: "Muline NW Reef",
    lat: 44.12323, lon: 15.10812,
    bottom: "Lastre calcaree rotte, 6–18 m, kelp in primavera",
    targets: [
      { common: "Dentice", latin: "Dentex dentex", note: "pattuglia 12–15 m all’alba" },
      { common: "Sarago", latin: "Diplodus sargus", note: "6–8 m sul pianoro" },
      { common: "Cernia bruna", latin: "Epinephelus marginatus", note: "sotto gli strapiombi 15 m" }
    ],
    primeTime: "05:15–07:30 (alba +90 min)",
    windRule: "Maestrale ≤ 10 kn: superficie piatta, vis > 20 m",
    access: "Parcheggio a Muline (gratis), 60 m a nuoto N–NW",
    gear: "90–100 cm roller, 16 mm small‑ID, asta 7 mm, mulinello 30 m",
    tactic: "Scendi a 12 m, resta in ombra del ciglio, aspetta 45 s: il dentice spesso ti segue."
  },
  {
    name: "Južna Luka Cave",
    lat: 44.12084, lon: 15.11255,
    bottom: "Bocca sabbia 5 m → fondo limoso 12 m, buio",
    targets: [
      { common: "Scorfano", latin: "Scorpaena scrofa", note: "immobile sui massi" },
      { common: "Murena", latin: "Muraena helena", note: "tetto grotta, diurna presente" }
    ],
    primeTime: "17:00–19:00 (controluce tramonto)",
    windRule: "Protetta da Bora; swell > 1 m crea risacca forte",
    access: "Accesso da spiaggia, 2 min a nuoto",
    gear: "75 cm, torcia 1000 lm, guanti",
    tactic: "Entra in apnea, flash singolo, preleva il più vicino; esci subito (CO₂)."
  },
  {
    name: "Mostir Plateau",
    lat: 44.10471, lon: 15.13470,
    bottom: "Pianoro a 8 m → scalino su lingua di sabbia 20 m",
    targets: [
      { common: "Ricciola", latin: "Seriola dumerili", note: "passa 1–2 m sopra" },
      { common: "Mero", latin: "Epinephelus aeneus", note: "18–20 m sulla sabbia" }
    ],
    primeTime: "Stanca di marea ±30 min (controlla Zadar)",
    windRule: "Evita Bora NE > 12 kn (upwelling, vis 5 m)",
    access: "Strada sterrata 300 m, parcheggio rovine cappella",
    gear: "110–120 cm roller, break‑away + bungee 40 m",
    tactic: "Deriva sul bordo, 1 m dal fondo per silhouette su ricciola."
  },
  {
    name: "Lukoran Punta (Punta Planka)",
    lat: 44.09011, lon: 15.15009,
    bottom: "4–14 m Posidonia/roccia",
    targets: [
      { common: "Orata", latin: "Sparus aurata", note: "scava nella posidonia" },
      { common: "Spigola", latin: "Dicentrarchus labrax", note: "imboscata dietro massi" }
    ],
    primeTime: "05:30–07:00 (prima dei kayak)",
    windRule: "Maestrale: mattina a specchio, vis 25 m",
    access: "Parcheggio Lukoran centro, 200 m a piedi a N",
    gear: "75–90 cm, muta camo verde 3.5 mm, piccolo mulinello",
    tactic: "Striscia lenta sulla posidonia; mira 30 cm sopra (rifrazione)."
  },
  {
    name: "Preko–Ošljak Channel",
    lat: 44.08523, lon: 15.19180,
    bottom: "Sabbia 6 m → pendio canale 25 m con massi",
    targets: [
      { common: "Aquila di mare", latin: "Myliobatis aquila", note: "10–15 m metà acqua" },
      { common: "Dentice", latin: "Dentex dentex", note: "bordo del pendio" }
    ],
    primeTime: "06:00–08:00 marea entrante (plancton e foraggio)",
    windRule: "Il canale amplifica il vento – annulla se Maestrale > 12 kn",
    access: "Kayak 15 min da Preko (nolo €10/2h)",
    gear: "110 cm roller + slip‑tip per razze, sagola 50 m",
    tactic: "Sospendi a 10 m, cerca le ali scure; anticipa il bordo d’attacco."
  },
  {
    name: "Kali South Rocks",
    lat: 44.07965, lon: 15.21013,
    bottom: "Reef bassi 5–15 m su sabbia",
    targets: [
      { common: "Seppia", latin: "Sepia officinalis", note: "coppie su sabbia, alba/notte" },
      { common: "Triglia", latin: "Mullus surmuletus", note: "su sabbia" }
    ],
    primeTime: "05:45–07:00 (prima traffico porto)",
    windRule: "Swell SE > 0.5 m alza sabbia, cala vis",
    access: "Molo pubblico + 200 m a piedi, ingresso da scala",
    gear: "75 cm, piccola torcia per occhi seppia",
    tactic: "Parallelo al reef, cerca seppia in hovering; tiro dietro l’occhio."
  },
  {
    name: "Zelena Punta Drop‑off",
    lat: 44.06410, lon: 15.27005,
    bottom: "Reef 7 m → parete verticale 22 m",
    targets: [
      { common: "Grongo", latin: "Conger conger", note: "tane 10–20 m" },
      { common: "Cottora", latin: "Labrus merula", note: "pattuglia parete" }
    ],
    primeTime: "18:00–19:30 (parete in ombra, pesci in pasto)",
    windRule: "Maestrale mantiene la parete calma",
    access: "Spiaggia resort, parcheggio a pagamento, 3 min a nuoto",
    gear: "100 cm, mulinello 40 m, torcia per ispezione tane",
    tactic: "Incastra il corpo a 15 m, attendi 60 s: emerge la testa del grongo."
  },
  {
    name: "Pavlešina Sand‑Weed Edge",
    lat: 44.06014, lon: 15.29020,
    bottom: "Sabbia 4–12 m con chiazze di alga",
    targets: [
      { common: "Cefalo dorato", latin: "Chelon auratus", note: "banchi sopra l’alga" },
      { common: "Barracuda", latin: "Sphyraena sphyraena", note: "8–10 m in colonna" }
    ],
    primeTime: "05:30–07:00 & 17:00–18:30",
    windRule: "Swell > 1 m riduce vis a 5 m",
    access: "Strada asfaltata, parcheggio libero, 100 m a nuoto",
    gear: "90 cm roller, fluorocarbon 1.5 mm",
    tactic: "Sdraiati sul bordo sabbia/erba, lascia girare i cefali, scegli il più grande."
  }
];

window.SF_GPS_QUICK_COPY = [
  "44.12323,15.10812  Muline NW Reef",
  "44.12084,15.11255  Južna Luka Cave",
  "44.10471,15.13470  Mostir Plateau",
  "44.09011,15.15009  Lukoran Punta",
  "44.08523,15.19180  Preko-Ošljak Channel",
  "44.07965,15.21013  Kali South Rocks",
  "44.06410,15.27005  Zelena Punta Drop-off",
  "44.06014,15.29020  Pavlešina Sand-Weed Edge"
].join("\n");

window.SF_FISH = [
  { name: "Dentice", latin: "Dentex dentex", desc: "Predatore prudente, pattuglia cigli e drop-off all’alba.", tips: "Appostamento in ombra 12–15 m, attesa 40–60 s, tiro deciso su testa." },
  { name: "Sarago", latin: "Diplodus sargus", desc: "In branco su pianori e scogli bassi.", tips: "Avvicinamento lento dal basso profilo; tiro rapido a distanza breve." },
  { name: "Cernia bruna", latin: "Epinephelus marginatus", desc: "Stanziale in tane, specie protetta in molte aree.", tips: "Osserva senza disturbare; spesso da rilasciare se individuata." },
  { name: "Scorfano", latin: "Scorpaena scrofa", desc: "Mimetismo estremo, spine velenose.", tips: "Illumina con torcia, punta tra occhio e testa. Usa guanti." },
  { name: "Murena", latin: "Muraena helena", desc: "Notturna, in fessure e tetti di grotta.", tips: "Attenzione a dita e sagolino; ferma la testa prima di recupero." },
  { name: "Ricciola", latin: "Seriola dumerili", desc: "Pelagica veloce, spesso in passaggio su cigli.", tips: "Mantieni profilo alto per silhouette, mira leggermente avanti." },
  { name: "Mero", latin: "Epinephelus aeneus", desc: "Su sabbie profonde vicino a rocce.", tips: "Allineo calmo e tiro potente; usa break-away se > 20 kg." },
  { name: "Orata", latin: "Sparus aurata", desc: "Tra posidonia e roccia, diffidente.", tips: "Striscia lenta, evita rumori; anticipo su tiro per rifrazione." },
  { name: "Spigola", latin: "Dicentrarchus labrax", desc: "A ridosso di massi e canaloni.", tips: "Appostamento in ombra dietro copertura, tiro rapido." },
  { name: "Aquila di mare", latin: "Myliobatis aquila", desc: "Pattuglia metà colonna in canali.", tips: "Slip-tip, anticipa bordo d’attacco, recupero con sagola lunga." },
  { name: "Seppia", latin: "Sepia officinalis", desc: "All’alba su sabbia, hovering evidente.", tips: "Illumina occhi, tiro dietro l’occhio, attenzione al getto d’inchiostro." },
  { name: "Triglia", latin: "Mullus surmuletus", desc: "Su sabbia, cerca cibo col barbiglio.", tips: "Tiro preciso e vicino; evita sollevare sabbia." },
  { name: "Grongo", latin: "Conger conger", desc: "In tane su pareti e massi.", tips: "Aspetta fuori tana, colpo su testa; recupero deciso." },
  { name: "Cottora", latin: "Labrus merula", desc: "Labridae costiero, curioso.", tips: "Appostamento su parete, non muoverti; tiro quando si avvicina." },
  { name: "Cefalo dorato", latin: "Chelon auratus", desc: "In banchi su bordi alga/sabbia.", tips: "Resta immobile a terra, seleziona il più grande." },
  { name: "Barracuda", latin: "Sphyraena sphyraena", desc: "Agguati e inseguimenti in mezz’acqua.", tips: "Non inseguire: attendi il passaggio, tiro anteriore." }
];

window.SF_RULES = [
  { species: "Dentex dentex", minCm: 25, notes: "Vulnerabile – evitare breeder > 3 kg" },
  { species: "Sparus aurata", minCm: 20, notes: "Possibili fuggitivi di allevamento – controlla opercolo" },
  { species: "Dicentrarchus labrax", minCm: 23, notes: "Chiusura notturna in alcuni porti" },
  { species: "Epinephelus marginatus", minCm: 45, notes: "ENDANGERED – rilascia se avvistata" },
  { species: "Conger conger", minCm: 58, notes: "Specie di profondità – sfiata se > 15 m" },
  { species: "Scorpaena scrofa", minCm: 25, notes: "Spine – usa guanti antitaglio" }
];

window.SF_PLANNER = [
  { time: "04:30", action: "Controlla Windy (Maestrale < 12 kn)" },
  { time: "05:00", action: "Parti – arrivo 20 min prima dell’alba" },
  { time: "05:15", action: "Boa & bandiera, carica fucile" },
  { time: "05:30–07:30", action: "Finestra di caccia principale" },
  { time: "07:30", action: "Registra catture, spostati al 2º spot" },
  { time: "11:00–16:00", action: "No pesca – turisti, luce pessima" },
  { time: "17:00–19:30", action: "Sessione serale, rientra prima del crepuscolo nautico" },
  { time: "20:00", action: "Upload traccia GPS, disinfezione & ghiaccio" }
];

window.SF_CHECKLIST = [
  { label: "Wind & swell – Windy (Ugljan)", url: "https://www.windy.com/?44.090,15.200,12" },
  { label: "Tide & current – Zadar", url: "https://www.tidetimes.org.uk/zadar-tide-times" },
  { label: "Water temp / vis – Adriatic forecast", url: "https://www.meteo.hr/en/more_adriatic.php?section=more_adriatic" },
  { label: "UV & sunrise – Preko", url: "https://www.timeanddate.com/sun/croatia/preko" },
  { label: "Avvisi ufficiali – pesca", url: "https://ribarstvo.mps.hr" }
];


