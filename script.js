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

// ---------- Contact form (Formspree AJAX) ----------
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const formSubmitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (formSubmitBtn) {
      formSubmitBtn.disabled = true;
      formSubmitBtn.textContent = 'Sending…';
    }
    if (formNote) {
      formNote.textContent = '';
    }

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactForm.reset();
        if (formNote) {
          formNote.textContent = "Message sent — I'll get back to you soon.";
          formNote.style.color = 'var(--forge)';
        }
      } else {
        const data = await response.json().catch(() => null);
        const message = data && data.errors
          ? data.errors.map(err => err.message).join(', ')
          : 'Something went wrong — please try again or reach out via LinkedIn/X instead.';
        if (formNote) {
          formNote.textContent = message;
          formNote.style.color = 'var(--flag)';
        }
      }
    } catch (err) {
      if (formNote) {
        formNote.textContent = 'Network error — please try again or reach out via LinkedIn/X instead.';
        formNote.style.color = 'var(--flag)';
      }
    } finally {
      if (formSubmitBtn) {
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = 'Send message';
      }
    }
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
