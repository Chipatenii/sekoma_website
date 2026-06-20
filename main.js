document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setupMobileMenu();
    setupCookieConsent();
    setupRevealMotion(prefersReducedMotion);
    setupButtonMotion(prefersReducedMotion);
});

function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (!menuBtn || !mobileMenu || !menuIcon) {
        return;
    }

    const menuLinks = Array.from(mobileMenu.querySelectorAll('a, button'));

    function setMenuState(isOpen) {
        mobileMenu.classList.toggle('open', isOpen);
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        mobileMenu.inert = !isOpen;
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';

        menuLinks.forEach((link) => {
            if (isOpen) {
                link.removeAttribute('tabindex');
            } else {
                link.setAttribute('tabindex', '-1');
            }
        });
    }

    window.closeMobileMenu = () => setMenuState(false);
    setMenuState(false);

    menuBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        setMenuState(!mobileMenu.classList.contains('open'));
    });

    document.addEventListener('click', (event) => {
        if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            setMenuState(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuState(false);
        }
    });
}

function setupCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');

    if (!cookieConsent || !acceptBtn || !declineBtn) {
        return;
    }

    const cookieChoice = localStorage.getItem('sekoma_cookie_consent');

    function showBanner() {
        cookieConsent.hidden = false;
        requestAnimationFrame(() => {
            cookieConsent.classList.add('cookie-card--visible');
            document.body.classList.add('cookie-open');
        });
    }

    function hideBanner(choice) {
        localStorage.setItem('sekoma_cookie_consent', choice);
        cookieConsent.classList.remove('cookie-card--visible');
        document.body.classList.remove('cookie-open');

        window.setTimeout(() => {
            cookieConsent.hidden = true;
        }, 260);
    }

    if (!cookieChoice) {
        window.setTimeout(showBanner, 700);
    }

    acceptBtn.addEventListener('click', () => hideBanner('accepted'));
    declineBtn.addEventListener('click', () => hideBanner('declined'));
}

function setupRevealMotion(prefersReducedMotion) {
    const animateSelectors = [
        '.hero-gradient > .container',
        '.hero-mini > .container',
        'section > .container > div:first-child',
        '.card-hover',
        '.panel-card',
        '.value-card',
        '.value-chain-item',
        'section#about .grid > div',
        '#industries .grid > div',
        '.policy-content',
        'footer .grid > div',
    ];

    const animatedElements = Array.from(
        new Set(animateSelectors.flatMap((selector) => Array.from(document.querySelectorAll(selector))))
    );

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        animatedElements.forEach((element) => element.classList.add('active'));
        return;
    }

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight * 1.15 && rect.bottom > 0;
    };

    const activateVisibleElements = () => {
        animatedElements.forEach((element) => {
            if (!element.classList.contains('active') && isInViewport(element)) {
                element.classList.add('active');
                observer.unobserve(element);
            }
        });
    };

    const observer = new IntersectionObserver((entries, entryObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entryObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px 15% 0px',
        threshold: 0.08,
    });

    animatedElements.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.transitionDelay = `${Math.min(index % 5, 4) * 55}ms`;

        if (isInViewport(element)) {
            element.classList.add('active');
        } else {
            observer.observe(element);
        }
    });

    window.addEventListener('load', activateVisibleElements, { once: true });
    window.setTimeout(activateVisibleElements, 300);
}

function setupButtonMotion(prefersReducedMotion) {
    if (prefersReducedMotion) {
        return;
    }

    const buttonSelectors = [
        'a.bg-sekomaYellow',
        'a.bg-sekomaGreen',
        'a.border-2.border-white',
        'a.inline-flex.text-sekomaGreen',
        'a.inline-flex.text-sekomaYellow',
        'button.bg-sekomaYellow',
        'button.bg-sekomaGreen',
    ];

    document.querySelectorAll(buttonSelectors.join(',')).forEach((element) => {
        if (element.id !== 'menuBtn') {
            element.classList.add('button-lift');
        }
    });
}
