/* 
  Legendary Portfolio - JavaScript
  Features: Typing Effect, Mobile Menu, Sticky Nav, Animations
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Initialize AOS (Animate On Scroll) ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // --- 2. Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active'); // Optional: Animate hamburger icon
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- 3. Sticky Navbar & Active Link ---
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- 4. Typing Effect ---
    const roles = [
        "Enterprise Software Developer",
        "WFM Specialist",
        "AI & Process Automation Expert",
        "Data Analytics Pro",
        "PHP/SQL Wizard"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeElement = document.getElementById('typewriter');
    const typeSpeed = 100;
    const backSpeed = 50;
    const pauseTime = 2000;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typeElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? backSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }
    
    // Start typing
    type();

    // --- 5. Animated Counter Stats ---
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    // Use Intersection Observer for better performance
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                stats.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); 
                    
                    let current = 0;
                    const updateCount = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.ceil(current) + "+";
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target + "+";
                        }
                    };
                    updateCount();
                });
                hasAnimatedStats = true;
                statsObserver.disconnect();
            }
        });
    });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- 6. Dynamic Copyright Year ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- 7. Vanilla-Tilt Init ---
    // (Already initialized in HTML script tag if using CDN, but good to have fallback/custom config)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.05
        });
    }

});
