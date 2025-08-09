// script.js – UI semplice, commentata. Mantieni <200 righe.

// Helper rapidi
const qs = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

// Navigazione sezioni
function initNav() {
  qsa('.nav button').forEach((btn) => {
    btn.addEventListener('click', () => showView(btn.dataset.target));
  });
}
function showView(id) {
  qsa('.view').forEach((v) => v.classList.remove('active'));
  const el = qs(`#${id}`);
  if (el) el.classList.add('active');
}

// Mappa con Leaflet, marker e popup
let map;
function initMap() {
  const { center } = window.SF_CONFIG;
  map = L.map('map').setView([center.lat, center.lon], center.zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const bounds = [];
  window.SF_SPOTS.forEach((s) => {
    const m = L.marker([s.lat, s.lon]).addTo(map);
    const html = [
      `<strong>${s.name}</strong>`,
      `Fondale: ${s.bottom}`,
      `Specie: ${s.targets.map(t => t.common).join(', ')}`,
      `Orario top: ${s.primeTime}`,
      `Vento: ${s.windRule}`,
      `Accesso: ${s.access}`,
      `Setup: ${s.gear}`,
      `<em>Tattica:</em> ${s.tactic}`
    ].join('<br/>');
    m.bindPopup(html);
    bounds.push([s.lat, s.lon]);
  });
  if (bounds.length) map.fitBounds(bounds, { padding: [20, 20] });

  // Quick-copy GPS
  qs('#gpsBlock').value = window.SF_GPS_QUICK_COPY;
  qs('#copyGps').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(qs('#gpsBlock').value);
      qs('#copyStatus').textContent = 'Copiato!';
      setTimeout(() => (qs('#copyStatus').textContent = ''), 1500);
    } catch (e) {
      qs('#copyStatus').textContent = 'Copia non riuscita';
    }
  });
}

// Render pesci
function renderFish() {
  const wrap = qs('#fishGrid');
  wrap.innerHTML = '';
  window.SF_FISH.forEach((f) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${f.name} <small style="color:#94a3b8">(${f.latin})</small></h3>
      <p>${f.desc}</p>
      <p><strong>Tattiche:</strong> ${f.tips}</p>
    `;
    wrap.appendChild(card);
  });
}

// Regole, Planner, Checklist
function renderRules() {
  const t = qs('#rulesTable');
  t.innerHTML = '<thead><tr><th>Specie</th><th>Min. (cm)</th><th>Note</th></tr></thead>';
  const tb = document.createElement('tbody');
  window.SF_RULES.forEach((r) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.species}</td><td>${r.minCm}</td><td>${r.notes}</td>`;
    tb.appendChild(tr);
  });
  t.appendChild(tb);
}
function renderPlanner() {
  const t = qs('#plannerTable');
  t.innerHTML = '<thead><tr><th>Orario</th><th>Azione</th></tr></thead>';
  const tb = document.createElement('tbody');
  window.SF_PLANNER.forEach((r) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.time}</td><td>${r.action}</td>`;
    tb.appendChild(tr);
  });
  t.appendChild(tb);
  const ul = qs('#checklist');
  ul.innerHTML = '';
  window.SF_CHECKLIST.forEach((c) => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${c.url}" target="_blank" rel="noopener">${c.label}</a>`;
    ul.appendChild(li);
  });
}

// Meteo: Open‑Meteo (tempo) + Marine (onde) + sole
async function fetchWeatherMarine() {
  const { center, tideUrl, autoRefreshMinutes, eiUrl } = window.SF_CONFIG;
  // Link EI e maree
  qs('#eiLink').href = eiUrl;
  qs('#tideLink').href = tideUrl;

  const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${center.lat}&longitude=${center.lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&daily=sunrise,sunset&timezone=auto`;
  const seaUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${center.lat}&longitude=${center.lon}&hourly=wave_height,wind_wave_height,wind_wave_direction,wind_wave_period&timezone=auto`;

  try {
    const [wxRes, seaRes] = await Promise.all([fetch(wxUrl), fetch(seaUrl)]);
    const wx = await wxRes.json();
    const sea = await seaRes.json();

    // Meteo attuale
    const cw = wx.current || {};
    qs('#wxNow').innerHTML = `
      <div>Temp: <strong>${cw.temperature_2m ?? '—'}°C</strong></div>
      <div>Vento: <strong>${cw.wind_speed_10m ?? '—'} kn</strong> da ${degToCompass(cw.wind_direction_10m)}</div>
      <div>Codice meteo: ${cw.weather_code ?? '—'}</div>
    `;

    // Onde prossime 6 ore (se disponibili)
    const h = sea.hourly || {};
    const idxNow = findCurrentHourIndex(h.time);
    let waveHtml = '—';
    if (idxNow >= 0) {
      const hours = [];
      for (let i = idxNow; i < Math.min(idxNow + 6, h.time.length); i++) {
        const t = h.time[i].slice(11, 16);
        const wh = h.wave_height?.[i];
        const per = h.wind_wave_period?.[i];
        const dir = degToCompass(h.wind_wave_direction?.[i]);
        hours.push(`${t}: ${fmt(wh, ' m')} • ${fmt(per, ' s')} • ${dir}`);
      }
      waveHtml = `<pre style="white-space:pre-wrap;">${hours.join('\n')}</pre>`;
    }
    qs('#waves').innerHTML = waveHtml;

    // Sole (oggi)
    const sr = wx.daily?.sunrise?.[0]?.slice(11, 16) ?? '—';
    const ss = wx.daily?.sunset?.[0]?.slice(11, 16) ?? '—';
    qs('#sun').innerHTML = `Alba: <strong>${sr}</strong> • Tramonto: <strong>${ss}</strong>`;

    // Aggiornamento
    const now = new Date();
    qs('#lastUpdate').textContent = `Aggiornato alle ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • auto ogni ${autoRefreshMinutes}′`;
  } catch (e) {
    qs('#wxNow').textContent = 'Errore nel recupero meteo';
    qs('#waves').textContent = '';
  }
}

function degToCompass(deg) {
  if (deg == null) return '—';
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(((deg % 360) / 22.5)) % 16];
}
function findCurrentHourIndex(times) {
  if (!times || !times.length) return -1;
  const nowIso = new Date().toISOString().slice(0, 13);
  return times.findIndex((t) => t.slice(0, 13) === nowIso);
}
function fmt(v, unit) { return v == null ? '—' : `${v}${unit}`; }

// Inizializzazione
window.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMap();
  renderFish();
  renderRules();
  renderPlanner();

  // Meteo
  fetchWeatherMarine();
  qs('#refreshWeather').addEventListener('click', fetchWeatherMarine);
  setInterval(fetchWeatherMarine, (window.SF_CONFIG.autoRefreshMinutes || 15) * 60 * 1000);
});


