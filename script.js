/* FILE: assets/js/script.js */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-quart',
        offset: 100
    });

    // 2. Typewriter Effect
    const typingTextElement = document.querySelector('.typing-text');
    const roles = [
        "Senior Automation Architect",
        "WFM Expert",
        "Python Scripter",
        "Full-Stack Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing if element exists
    if (typingTextElement) {
        setTimeout(type, 1000);
    }

    // 3. Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
        if (cursorBlur) {
            cursorBlur.style.left = e.clientX + 'px';
            cursorBlur.style.top = e.clientY + 'px';
        }
    });

    // Hover effect for cursor
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'transparent';
                cursor.style.backgroundColor = 'rgba(0, 243, 255, 0.3)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'var(--primary-color)';
                cursor.style.backgroundColor = 'transparent';
            }
        });
    });

    // 4. Dynamic Year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 5. Stat Counter Animation
    const stats = document.querySelectorAll('.stat-number');

    // Reuse AOS observation or use IntersectionObserver
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const updateCount = () => {
                    const count = +entry.target.innerText;
                    const increment = target / 200; // Adjust speed

                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 10);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});
