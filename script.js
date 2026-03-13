// script.js
// Ministerio MELFENP - JavaScript funcional
// Funcionalidades: menú hamburguesa con animación, scroll suave, aparición de secciones al hacer scroll

document.addEventListener('DOMContentLoaded', () => {

    // ────────────────────────────────────────────────
    // 1. Menú hamburguesa + animación de cruz
    // ────────────────────────────────────────────────
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-mobile');
    const body = document.body;

    if (hamburger && navMobile) {
        hamburger.addEventListener('click', () => {
            // Toggle menú
            navMobile.classList.toggle('active');

            // Animación de hamburguesa → cruz
            hamburger.classList.toggle('is-active');

            // Bloquear scroll del body cuando menú está abierto (mejora UX móvil)
            body.classList.toggle('menu-open');

            // Opcional: cerrar menú al hacer clic en un enlace
            const mobileLinks = navMobile.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMobile.classList.remove('active');
                    hamburger.classList.remove('is-active');
                    body.classList.remove('menu-open');
                }, { once: true });
            });
        });

        // Cerrar menú al hacer clic fuera (en overlay o body)
        document.addEventListener('click', (e) => {
            if (
                navMobile.classList.contains('active') &&
                !navMobile.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                navMobile.classList.remove('active');
                hamburger.classList.remove('is-active');
                body.classList.remove('menu-open');
            }
        });
    }

    // ────────────────────────────────────────────────
    // 2. Scroll suave para enlaces con #
    // ────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // altura aproximada del header sticky
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ────────────────────────────────────────────────
    // 3. Aparecer secciones al hacer scroll (fade-in)
    // ────────────────────────────────────────────────
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // una sola vez
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ────────────────────────────────────────────────
    // 4. Cerrar menú móvil al redimensionar a desktop
    // ────────────────────────────────────────────────
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navMobile.classList.remove('active');
            hamburger.classList.remove('is-active');
            body.classList.remove('menu-open');
        }
    });

    // ────────────────────────────────────────────────
    // 5. Opcional: formulario (validación básica frontend)
    // ────────────────────────────────────────────────
    const form = document.querySelector('#contacto form');
    if (form) {
        form.addEventListener('submit', (e) => {
            // Aquí solo validación visual básica (puedes conectar después a backend)
            const requiredFields = form.querySelectorAll('[required]');
            let valid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#dc3545';
                    valid = false;
                } else {
                    field.style.borderColor = '#28a745';
                }
            });

            if (!valid) {
                e.preventDefault();
                alert('Por favor completa todos los campos requeridos.');
            }
            // Si usas Formspree / Netlify Forms / Google Forms → quita el preventDefault
            // e.preventDefault(); // ← comenta esta línea cuando conectes backend
        });
    }

    // ────────────────────────────────────────────────
    // Listo para futuras funcionalidades:
    // - Modal de éxito al enviar formulario
    // - Lazy loading de imágenes
    // - Dark mode toggle
    // - Contador de visitas o likes en recursos
    // ────────────────────────────────────────────────
});