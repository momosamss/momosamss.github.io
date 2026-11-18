// ============================================================
//  TERMINAL INTERACTIF
// ============================================================

const termOutput = document.getElementById('term-output');
const termInput  = document.getElementById('term-input');
const termCard   = document.querySelector('.terminal-card');

// Focus input quand on clique n'importe où dans le terminal
termCard.addEventListener('click', () => termInput.focus());

// Historique des commandes
const history = [];
let histIdx = -1;

// ---- Commandes disponibles ----
const COMMANDS = {

  help: () => `<div class="line-out" style="color:var(--accent);font-weight:600;margin-top:.3rem">📋 Commandes disponibles :</div>
<div class="line-out">  <span style="color:var(--green)">whoami</span>          → à propos de moi</div>
<div class="line-out">  <span style="color:var(--green)">cat missions.txt</span> → missions ALPI</div>
<div class="line-out">  <span style="color:var(--green)">ls skills/</span>       → mes compétences</div>
<div class="line-out">  <span style="color:var(--green)">ls certifications/</span>→ mes certifications</div>
<div class="line-out">  <span style="color:var(--green)">ls projets/</span>      → mes fichiers de projet</div>
<div class="line-out">  <span style="color:var(--green)">cat rapport</span>      → télécharger le rapport de stage</div>
<div class="line-out">  <span style="color:var(--green)">contact</span>          → me contacter</div>
<div class="line-out">  <span style="color:var(--green)">clear</span>            → effacer le terminal</div>`,

  whoami: () => {
    scrollToSection('#about');
    return `<div class="line-out">→ <span style="color:#fff;font-weight:600">Mamadou Samassa</span></div>
<div class="line-out">  Étudiant BTS CIEL 2ème année – Lycée Gaston Crampe</div>
<div class="line-out">  Spécialité : <span style="color:var(--accent2)">Cybersécurité & Réseaux</span></div>
<div class="line-out">  Alternance : <span style="color:var(--green)">Rentrée Septembre 2027</span></div>
<div class="line-out" style="color:var(--muted);font-size:.78rem;margin-top:.2rem">↳ scroll vers <a href="#about" class="term-link">À propos</a></div>`;
  },

  'cat missions.txt': () => {
    scrollToSection('#experience');
    return `<div class="line-out">▸ <a href="#experience" class="term-link">Active Directory</a> – GPO, utilisateurs</div>
<div class="line-out">▸ <a href="#experience" class="term-link">DFS & Stockage</a> – droits NTFS</div>
<div class="line-out">▸ <a href="#experience" class="term-link">Veeam Backup</a> – sauvegardes</div>
<div class="line-out">▸ <a href="#experience" class="term-link">Zabbix</a> – monitoring réseau</div>
<div class="line-out">▸ <a href="#experience" class="term-link">pfSense</a> – firewall, VPN</div>
<div class="line-out">▸ <a href="#experience" class="term-link">Graylog</a> – SIEM, logs</div>
<div class="line-out">▸ <a href="#experience" class="term-link">Portainer</a> – Docker</div>
<div class="line-out">▸ <a href="#experience" class="term-link">Guacamole</a> – accès distant</div>`;
  },

  'ls skills/': () => {
    scrollToSection('#skills');
    return `<div class="line-out"><span style="color:var(--accent)">🔒 Cybersécurité :</span> pfSense · Graylog · TryHackMe · CTF · Passe ton Hack</div>
<div class="line-out"><span style="color:var(--accent)">🖥️ Systèmes :</span> Linux · Windows Server · AD · DFS · DNS/DHCP</div>
<div class="line-out"><span style="color:var(--accent)">🐳 DevOps :</span> Docker · Docker Compose · Portainer · Bash · Git</div>
<div class="line-out"><span style="color:var(--accent)">📊 Monitoring :</span> Zabbix · Veeam · Wireshark · Nmap</div>`;
  },

  skills: () => COMMANDS['ls skills/'](),

  'ls certifications/': () => {
    scrollToSection('#certifications');
    return `<div class="line-out">✅ <a href="#certifications" class="term-link">Cisco – Introduction to Cybersecurity</a></div>
<div class="line-out">✅ <a href="#certifications" class="term-link">Cisco – Networking Basics</a></div>
<div class="line-out">⚡ <a href="#certifications" class="term-link">TryHackMe – Parcours Cybersécurité</a> (65%)</div>
<div class="line-out">🏴 <a href="#certifications" class="term-link">CTF – Passe ton Hack</a></div>
<div class="line-out">📅 <a href="#certifications" class="term-link">CompTIA Security+</a> (préparation 2027)</div>`;
  },

  'ls projets/': () => `<div class="line-out">▸ <a href="TP-VLAN-routage-ACL-Cisco.pdf" download class="term-link term-download">TP-VLAN-routage-ACL-Cisco.pdf</a> <span class="hl">(rapport PDF)</span></div>
<div class="line-out">▸ <a href="tp4-pt-vlan.pkt" download class="term-link term-download">tp4-pt-vlan.pkt</a> <span class="hl">(Packet Tracer VLAN)</span></div>
<div class="line-out">▸ <a href="tp4-pt-vlan-acl.pkt" download class="term-link term-download">tp4-pt-vlan-acl.pkt</a> <span class="hl">(Packet Tracer VLAN + ACL)</span></div>
<div class="line-out">▸ <a href="API-REST-FatFree-PHP-VueJS.pdf" download class="term-link term-download">API-REST-FatFree-PHP-VueJS.pdf</a> <span class="hl">(API REST Fat-Free PHP + Vue.js)</span></div>
<div class="line-out">▸ <a href="rapport-de-stage.odt" download class="term-link term-download">rapport-de-stage.odt</a> <span class="hl">(stage ALPI)</span></div>`,

  'cat rapport': () => {
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = 'rapport-de-stage.odt';
      a.download = 'rapport-de-stage.odt';
      a.click();
    }, 300);
    return `<div class="line-out" style="color:var(--green);">📄 Téléchargement du rapport de stage ALPI...</div>`;
  },

  rapport: () => COMMANDS['cat rapport'](),

  contact: () => {
    scrollToSection('#contact');
    return `<div class="line-out">📧 <a href="mailto:mamadousamassa1962@gmail.com" class="term-link">mamadousamassa1962@gmail.com</a></div>
<div class="line-out">🐙 <a href="https://github.com/momosamss" target="_blank" class="term-link">github.com/momosamss</a></div>
<div class="line-out">💼 <a href="https://www.linkedin.com/in/mamadou-samassa-737402271/" target="_blank" class="term-link">LinkedIn – Mamadou Samassa</a></div>
<div class="line-out" style="color:var(--green);">✅ Disponible en alternance – Rentrée Septembre 2027</div>`;
  },

  'contact --hire-me': () => COMMANDS.contact(),

  clear: () => {
    termOutput.innerHTML = '';
    return null;
  },
};

// ---- Utilitaires ----
function scrollToSection(id) {
  const el = document.querySelector(id);
  if (el) setTimeout(() => el.scrollIntoView({ behavior:'smooth', block:'start' }), 400);
}

function printLine(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  termOutput.appendChild(div);
  termOutput.scrollTop = termOutput.scrollHeight;
}

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  // Affiche la commande tapée
  printLine(`<div style="margin-top:.4rem"><span class="line-prompt">mamadou@alpi</span>:<span class="line-cmd">~$ ${escapeHtml(raw)}</span></div>`);

  // Cherche la commande
  const handler = COMMANDS[cmd];
  if (handler) {
    const output = handler();
    if (output) printLine(output);
  } else {
    printLine(`<div class="line-out" style="color:#f87171;">bash: <strong>${escapeHtml(cmd)}</strong>: commande introuvable. Tape <span style="color:var(--green)">help</span>.</div>`);
  }
  termOutput.scrollTop = termOutput.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ---- Écoute clavier ----
termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = termInput.value;
    history.unshift(val);
    histIdx = -1;
    termInput.value = '';
    runCommand(val);
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx < history.length - 1) termInput.value = history[++histIdx];
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx > 0) termInput.value = history[--histIdx];
    else { histIdx = -1; termInput.value = ''; }
  }
  if (e.key === 'Tab') {
    e.preventDefault();
    // Autocomplétion basique
    const partial = termInput.value.toLowerCase();
    const match = Object.keys(COMMANDS).find(k => k.startsWith(partial));
    if (match) termInput.value = match;
  }
});

// Message de bienvenue au démarrage
setTimeout(() => {
  printLine(`<div class="line-out" style="color:var(--muted);">Tape <span style="color:var(--green)">whoami</span> ou <span style="color:var(--green)">help</span> pour commencer.</div>`);
  termInput.focus();
}, 500);

// ============================================================
//  RESTE DU CODE ORIGINAL
// ============================================================

/* ---- Nav scroll effect ---- */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---- Typed text effect ---- */
const roles = [
  'Étudiant BTS CIEL',
  'Administrateur Systèmes & Réseaux',
  'Passionné Cybersécurité',
  'Futur Alternant DevOps',
];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.querySelector('.typed');
function typeLoop() {
  const word = roles[ri];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}
typeLoop();

/* ---- Intersection Observer – fade in sections ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Trigger progress bars inside this element
      e.target.querySelectorAll('[data-width]').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ---- Count-up stats ---- */
function countUp(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const tick = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    if (start < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(el => {
        countUp(el, parseInt(el.dataset.value), 1600);
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.hero-stats');
if (statsRow) statsObserver.observe(statsRow);

/* ---- Active nav link ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
}, { passive: true });

