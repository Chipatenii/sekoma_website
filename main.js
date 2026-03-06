document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject CSS for animations directly to keep HTML clean
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.5, 0, 0, 1), transform 0.8s cubic-bezier(0.5, 0, 0, 1);
            will-change: opacity, transform;
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // 2. Identify elements to animate based on existing classes and structure
    const animateSelectors = [
        '.hero-gradient > .container',
        '.hero-mini > .container',
        'section > .container > div:first-child', // headers inside sections
        '.card-hover', // all product/service cards
        'section#about .grid > div', // about section blocks
        '#industries .grid > div', // industries cards
        'footer .grid > div' // footer columns
    ];

    // Apply the base hidden class
    animateSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });

    // 3. Add dynamic interactive hover states to buttons (tactile feel)
    const buttonSelectors = [
        'a.bg-sekomaYellow', 
        'a.bg-sekomaGreen', 
        'a.border-2.border-white',
        'a.inline-flex.text-sekomaGreen',
        'a.inline-flex.text-sekomaYellow',
        'button.bg-sekomaYellow',
        'button.bg-sekomaGreen'
    ];
    
    buttonSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            // Only apply if it's not the mobile menu toggle button to protect mobile structure
            if(el.id !== 'menuBtn') {
                el.style.transition = 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease';
                el.addEventListener('mouseenter', () => el.style.transform = 'translateY(-2px) scale(1.02)');
                el.addEventListener('mouseleave', () => el.style.transform = 'translateY(0) scale(1)');
                el.addEventListener('mousedown', () => el.style.transform = 'scale(0.98)');
                el.addEventListener('mouseup', () => el.style.transform = 'translateY(-2px) scale(1.02)');
            }
        });
    });

    // 4. Set up the Intersection Observer to trigger reveals exactly when they scroll into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Ensure it only animates once
            }
        });
    }, observerOptions);

    // Give the DOM a tiny fraction of a second to settle before observing to prevent initial jitter
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach((el) => {
            observer.observe(el);
        });
    }, 50);
});
