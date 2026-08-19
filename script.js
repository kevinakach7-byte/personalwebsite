// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll('section, .exhibit-card');
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => revealObserver.observe(el));

// ---------- Contact form (placeholder — no backend wired) ----------
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = 'Form captured locally — connect a service like Formspree to actually send this.';
    formNote.style.color = 'var(--accent)';
  });
}

// ---------- CPL live ledger ----------
async function loadCplStats() {
  const statusEl = document.getElementById('cplStatus');
  const teamsEl = document.getElementById('cplTeams');
  const matchesEl = document.getElementById('cplMatches');
  const leaderEl = document.getElementById('cplLeader');

  if (!statusEl) return;

  try {
    const res = await fetch('https://api.clawforgepremierleague.com/standings', { mode: 'cors' });
    if (!res.ok) throw new Error('Bad response');
    const data = await res.json();

    const standings = Array.isArray(data) ? data : (data.standings || []);

    statusEl.textContent = 'Online';
    teamsEl.textContent = standings.length || '—';
    leaderEl.textContent = standings[0]?.team || standings[0]?.name || '—';

    const totalMatches = standings.reduce((sum, t) => sum + (t.played || t.matches_played || 0), 0);
    matchesEl.textContent = totalMatches ? Math.round(totalMatches / 2) : '—';
  } catch (err) {
    statusEl.textContent = 'Offline';
    teamsEl.textContent = '—';
    matchesEl.textContent = '—';
    leaderEl.textContent = '—';
  }

  [statusEl, teamsEl, matchesEl, leaderEl].forEach(el => el.classList.remove('loading'));
}

loadCplStats();
