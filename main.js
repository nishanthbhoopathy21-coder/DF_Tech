/* ── main.js — DF Technologies ── */

// Footer year
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Sticky nav border on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
    });
});

// ── Copy email to clipboard
const copyBtn = document.getElementById('copy-email-btn');
const copyFeedback = document.getElementById('copy-feedback');

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const email = copyBtn.dataset.email;
        navigator.clipboard.writeText(email).then(() => {
            copyFeedback.hidden = false;
            copyBtn.textContent = '✓ Copied!';
            setTimeout(() => {
                copyFeedback.hidden = true;
                copyBtn.textContent = 'Copy Email Address';
            }, 2500);
        }).catch(() => {
            // Fallback for older browsers
            const el = document.createElement('textarea');
            el.value = email;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            copyFeedback.hidden = false;
            setTimeout(() => { copyFeedback.hidden = true; }, 2500);
        });
    });
}

// ── Scroll-reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
    entries => entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
        }
    }),
    { threshold: 0.1 }
);

revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    revealObserver.observe(el);
});
