// =============================================
// MENU HAMBURGUESA - MOBILE
// =============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animación del hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translate(-5px, 6px)' 
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translate(-5px, -6px)' 
            : 'none';
    });

    // Cerrar menú al hacer click en un link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animar elementos al scroll
document.querySelectorAll('.monumento-card, .turismo-card, .galeria-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// =============================================
// SMOOTH SCROLL
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =============================================
// NAVBAR BACKGROUND ON SCROLL
// =============================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    }
});

// =============================================
// GALERÍA INTERACTIVA
// =============================================

const galeriaItems = document.querySelectorAll('.galeria-item');

galeriaItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        galeriaItems.forEach(img => {
            if (img !== this) {
                img.style.opacity = '0.5';
                img.style.transform = 'scale(0.95)';
            }
        });
    });

    item.addEventListener('mouseleave', function() {
        galeriaItems.forEach(img => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
    });
});

// =============================================
// CONTADOR DE VISITAS (OPCIONAL)
// =============================================

function initVisitCounter() {
    let visits = localStorage.getItem('olvera-visits');
    if (!visits) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem('olvera-visits', visits);
    console.log(`Visitantes a esta página: ${visits}`);
}

initVisitCounter();

// =============================================
// PRELOAD DE IMÁGENES
// =============================================

function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
    });
}

window.addEventListener('load', preloadImages);

// =============================================
// MODAL PARA GALERÍA (OPCIONAL)
// =============================================

function initGaleriaModal() {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    galeriaItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const h4 = this.querySelector('h4');
            
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease-out;
            `;
            
            const content = document.createElement('div');
            content.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                position: relative;
            `;
            
            const imgClone = img.cloneNode(true);
            imgClone.style.cssText = `
                width: 100%;
                height: auto;
                border-radius: 10px;
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 3rem;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            closeBtn.addEventListener('mouseover', () => {
                closeBtn.style.color = '#d4a574';
            });
            
            closeBtn.addEventListener('mouseout', () => {
                closeBtn.style.color = 'white';
            });
            
            closeBtn.addEventListener('click', () => {
                modal.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => modal.remove(), 300);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => modal.remove(), 300);
                }
            });
            
            content.appendChild(closeBtn);
            content.appendChild(imgClone);
            modal.appendChild(content);
            document.body.appendChild(modal);
        });
    });
}

// Agregar animaciones al CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

initGaleriaModal();

// =============================================
// EFECTO PARALLAX (OPCIONAL)
// =============================================

function initParallax() {
    const scrollElements = document.querySelectorAll('.hero-background, .panoramica-card, .historia-image');
    
    window.addEventListener('scroll', () => {
        scrollElements.forEach(element => {
            let scrollPosition = window.pageYOffset;
            element.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    });
}

// Descomenta la siguiente línea para activar parallax
// initParallax();

// =============================================
// VALIDACIÓN DE FORMULARIO DE CONTACTO (SI LO HAY)
// =============================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('[name="name"]').value;
        const email = this.querySelector('[name="email"]').value;
        const message = this.querySelector('[name="message"]').value;
        
        // Validación simple
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Por favor, rellena todos los campos');
            return;
        }
        
        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un email válido');
            return;
        }
        
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
        this.reset();
    });
}

// =============================================
// INICIALIZAR EFECTOS AL CARGAR LA PÁGINA
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Página de Olvera cargada correctamente');
    
    // Animar elementos al cargar
    const elements = document.querySelectorAll('.section-title');
    elements.forEach((element, index) => {
        element.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
    });
});
