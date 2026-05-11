/**
 * Volt Ampere — voampere.com
 * main.js — shared utilities: theme, nav, helpers
 */

/* ══════════════════════════════════════
   THEME MANAGER
   ══════════════════════════════════════ */
const Theme = {
  KEY: 'va-theme',

  init() {
    const saved   = localStorage.getItem(this.KEY);
    const sysDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
    const theme   = saved || (sysDark ? 'dark' : 'light');
    this.apply(theme);
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem(this.KEY, theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.apply(current === 'dark' ? 'light' : 'dark');
  }
};

/* ══════════════════════════════════════
   NAV — active link highlight
   ══════════════════════════════════════ */
function initNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.va-nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === path || href.endsWith('/' + path) || (path === 'index.html' && href.endsWith('../index.html')))) {
      a.classList.add('active');
    }
  });
}

/* ══════════════════════════════════════
   NUMBER HELPERS
   ══════════════════════════════════════ */
const VA = {
  /** Parse a float from an input element, fallback to 0 */
  val(id, fallback = 0) {
    return parseFloat(document.getElementById(id)?.value) || fallback;
  },

  /** Set text content of an element */
  set(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  },

  /** Show or hide an element */
  show(id, visible) {
    const el = document.getElementById(id);
    if (el) el.style.display = visible ? 'block' : 'none';
  },

  /** Round to N decimals */
  round(n, decimals = 2) {
    return parseFloat(n.toFixed(decimals));
  },

  /** Format number nicely */
  fmt(n, unit = '', decimals = 2) {
    if (isNaN(n) || !isFinite(n)) return '—';
    return n.toFixed(decimals) + (unit ? ' ' + unit : '');
  },

  /** Copy text to clipboard */
  copy(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.innerText.split('\n')[0]; // only the value
    navigator.clipboard.writeText(text).then(() => {
      const originalText = el.innerText;
      el.innerText = '✅ تم النسخ';
      setTimeout(() => el.innerText = originalText, 1500);
    });
  }
};

/* ══════════════════════════════════════
   TABS MANAGER
   ══════════════════════════════════════ */
function initTabs(panels, onSwitch) {
  return function switchTab(name, btn, colorClass) {
    panels.forEach(p => {
      const el = document.getElementById('p-' + p);
      if (el) el.style.display = p === name ? '' : 'none';
    });
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('ar', 'ab'));
    if (btn) btn.classList.add(colorClass === 'r' ? 'ar' : 'ab');
    if (typeof onSwitch === 'function') onSwitch(name);
  };
}

/* ══════════════════════════════════════
   VA CALCULATOR FILTERS (HOME PAGE)
   ══════════════════════════════════════ */
function filterCalculators() {
  const query = document.getElementById('global-search')?.value.toLowerCase() || '';
  const cards = document.querySelectorAll('.ccard');
  
  cards.forEach(card => {
    const title = card.querySelector('.ccard-title')?.innerText.toLowerCase() || '';
    const desc = card.querySelector('.ccard-desc')?.innerText.toLowerCase() || '';
    const visible = title.includes(query) || desc.includes(query);
    card.style.display = visible ? '' : 'none';
  });
}

function filterDomain(domain, el) {
  const queryInput = document.getElementById('global-search');
  if (queryInput) queryInput.value = '';

  document.querySelectorAll('.dpill').forEach(p => p.classList.remove('on'));
  if (el) el.classList.add('on');
  document.querySelectorAll('.ccard').forEach(card => {
    card.style.display = (domain === 'all' || card.dataset.d === domain) ? '' : 'none';
  });
}

/* ══════════════════════════════════════
   BOOT
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  initNav();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then(reg => {
        console.log('Volt Ampere SW Ready');
      }).catch(err => console.log('SW Fail:', err));
    });
  }
});
