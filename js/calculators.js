/**
 * Volt Ampere — voampere.com
 * calculators.js — all calculation engines
 */

/* ══════════════════════════════════════
   1. OHM'S LAW
   Inputs:  V, I, R  (any two)
   Outputs: the missing one + P
══════════════════════════════════════ */
function calcOhm(changed) {
  const v = parseFloat(document.getElementById('ov')?.value);
  const i = parseFloat(document.getElementById('oi')?.value);
  const r = parseFloat(document.getElementById('or_')?.value);

  if (changed !== 'v' && !isNaN(i) && !isNaN(r))
    document.getElementById('ov').value = (i * r).toFixed(2);
  else if (changed !== 'i' && !isNaN(v) && !isNaN(r) && r !== 0)
    document.getElementById('oi').value = (v / r).toFixed(3);
  else if (changed !== 'r' && !isNaN(v) && !isNaN(i) && i !== 0)
    document.getElementById('or_').value = (v / i).toFixed(2);

  const fv = parseFloat(document.getElementById('ov')?.value);
  const fi = parseFloat(document.getElementById('oi')?.value);
  const fr = parseFloat(document.getElementById('or_')?.value);

  VA.set('orv', isNaN(fv) ? '—' : fv.toFixed(2) + ' V');
  VA.set('ori', isNaN(fi) ? '—' : fi.toFixed(3) + ' A');
  VA.set('orr', isNaN(fr) ? '—' : fr.toFixed(2) + ' Ω');
  VA.set('orp', (!isNaN(fv) && !isNaN(fi)) ? (fv * fi).toFixed(1) + ' W' : '—');
}

/* ══════════════════════════════════════
   2. CABLE / WIRE SIZING
   Standard: IEC 60364
   Inputs:   I (A), L (m), V (V), material
   Outputs:  cross-section (mm²), voltage drop %, breaker rating
══════════════════════════════════════ */
const WIRE = {
  sizes:   [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50],
  cu_amp:  [16,  20,  27, 34, 46, 61, 80, 99, 119],   // IEC ampacity copper
  al_amp:  [13,  16,  21, 27, 36, 48, 63, 78, 94],    // IEC ampacity aluminium
  rho_cu:  0.01786,   // Ω·mm²/m
  rho_al:  0.02800,
};

function calcWire() {
  const I   = VA.val('wi');
  const L   = VA.val('wl', 1);
  const V   = VA.val('wv', 230);
  const mat = document.getElementById('wm')?.value;

  const ampacity = mat === 'cu' ? WIRE.cu_amp : WIRE.al_amp;
  const rho      = mat === 'cu' ? WIRE.rho_cu : WIRE.rho_al;

  let section = WIRE.sizes[WIRE.sizes.length - 1];
  for (let k = 0; k < WIRE.sizes.length; k++) {
    if (ampacity[k] >= I) { section = WIRE.sizes[k]; break; }
  }

  const drop   = (2 * rho * L * I / section / V * 100);
  const cb     = Math.ceil(I * 1.25 / 5) * 5;

  VA.set('wrs', section + ' mm²');
  VA.set('wrd', drop.toFixed(1) + ' %');
  VA.set('wrc', cb + ' A');
  VA.show('wwarn', drop > 3);
}

/* ══════════════════════════════════════
   3. ACTIVE / APPARENT / REACTIVE POWER
   Inputs:  P (W), V (V), cosφ, phase (1 or 3)
   Outputs: I (A), S (VA), Q (VAR)
══════════════════════════════════════ */
function calcPower() {
  const P   = VA.val('pp');
  const V   = VA.val('pv', 1);
  const cos = Math.max(0.01, Math.min(1, VA.val('pc', 0.85)));
  const t   = parseInt(document.getElementById('pt')?.value) || 1;

  const S = P / cos;
  const Q = Math.sqrt(Math.max(0, S * S - P * P));
  const I = t === 3 ? P / (Math.sqrt(3) * V * cos) : P / (V * cos);

  VA.set('pri', I.toFixed(2) + ' A');
  VA.set('prs', Math.round(S) + ' VA');
  VA.set('prq', Math.round(Q) + ' VAR');
}

/* ══════════════════════════════════════
   4. ELECTRICITY COST — ARAB COUNTRIES
   Inputs:  country rate ($/kWh), P (W), hours/day, days/month
   Outputs: kWh/month, cost/month ($), cost/year ($)
══════════════════════════════════════ */
const ARAB_TARIFFS = {
  'sa':  { label: 'السعودية',  rate: 0.048 },
  'kw':  { label: 'الكويت',    rate: 0.030 },
  'ae':  { label: 'الإمارات',  rate: 0.042 },
  'qa':  { label: 'قطر',       rate: 0.035 },
  'bh':  { label: 'البحرين',   rate: 0.031 },
  'om':  { label: 'عُمان',     rate: 0.060 },
  'eg':  { label: 'مصر',       rate: 0.080 },
  'ma':  { label: 'المغرب',    rate: 0.105 },
  'tn':  { label: 'تونس',      rate: 0.072 },
  'dz':  { label: 'الجزائر',   rate: 0.055 },
  'jo':  { label: 'الأردن',    rate: 0.092 },
  'lb':  { label: 'لبنان',     rate: 0.060 },
  'ly':  { label: 'ليبيا',     rate: 0.020 },
  'iq':  { label: 'العراق',    rate: 0.030 },
  'sy':  { label: 'سوريا',     rate: 0.025 },
  'ye':  { label: 'اليمن',     rate: 0.045 },
  'custom': { label: 'مخصص', rate: 0 },
};

function calcCost() {
  const sel      = document.getElementById('cc');
  const key      = sel?.value || 'tn';
  const isCustom = key === 'custom';

  VA.show('custom-rate-wrap', isCustom);

  const rate = isCustom
    ? VA.val('cr', 0.08)
    : (ARAB_TARIFFS[key]?.rate || 0.08);

  const P   = VA.val('cp');
  const H   = VA.val('ch');
  const D   = VA.val('cd', 30);
  const kwh = P * H * D / 1000;

  VA.set('crk', kwh.toFixed(1));
  VA.set('crc', (kwh * rate).toFixed(2));
  VA.set('cry', (kwh * rate * 12).toFixed(2));
}

/* ══════════════════════════════════════
   5. RESISTOR COLOUR CODE (4-band)
   Inputs:  band 1, 2, 3 (multiplier)
   Output:  resistance value
══════════════════════════════════════ */
function calcColorCode() {
  const b1   = parseInt(document.getElementById('cb1')?.value || 0);
  const b2   = parseInt(document.getElementById('cb2')?.value || 0);
  const mult = Math.pow(10, parseInt(document.getElementById('cb3')?.value || 0));
  const val  = (b1 * 10 + b2) * mult;

  let display;
  if      (val >= 1_000_000) display = (val / 1_000_000).toFixed(2) + ' MΩ';
  else if (val >= 1_000)     display = (val / 1_000).toFixed(2) + ' kΩ';
  else                       display = val + ' Ω';

  VA.set('color-result', display);
}

/* ══════════════════════════════════════
   6. MOTOR CURRENT (3-phase)
   Inputs:  P (kW), V (V), cosφ, η
   Output:  rated current (A), starting current (A)
══════════════════════════════════════ */
function calcMotor() {
  const P_kw = VA.val('mp');
  const V    = VA.val('mv', 400);
  const cos  = Math.max(0.01, VA.val('mc', 0.85));
  const eta  = Math.max(0.01, VA.val('me', 0.92));
  const ksi  = VA.val('mks', 6.5);   // starting current multiplier

  const P  = P_kw * 1000;
  const In = P / (Math.sqrt(3) * V * cos * eta);
  const Is = In * ksi;

  VA.set('mr-in', In.toFixed(2) + ' A');
  VA.set('mr-is', Is.toFixed(1) + ' A');
  VA.set('mr-cb', Math.ceil(In * 1.25 / 5) * 5 + ' A');
}

/* ══════════════════════════════════════
   7. POWER FACTOR CORRECTION
   Inputs:  P (kW), cosφ1, cosφ2
   Output:  required capacitor Qc (kVAR)
══════════════════════════════════════ */
function calcPFC() {
  const P    = VA.val('pfp');
  const cos1 = Math.max(0.01, VA.val('pfc1', 0.7));
  const cos2 = Math.max(0.01, VA.val('pfc2', 0.95));

  const tan1 = Math.tan(Math.acos(cos1));
  const tan2 = Math.tan(Math.acos(cos2));
  const Qc   = P * (tan1 - tan2);

  VA.set('pf-qc', Qc.toFixed(2) + ' kVAR');
}
