// Handle mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    // Mobile dropdown handling
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 1200) {
                e.preventDefault();
                const content = trigger.nextElementSibling;
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
                trigger.querySelector('i').style.transform = 
                    content.style.display === 'block' ? 'rotate(-180deg)' : 'rotate(0)';
            }
        });
    });

    // Smooth scroll for navigation links with blink effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
            target.classList.add('blink');
            setTimeout(() => {
                target.classList.remove('blink');
            }, 3000); // Remove the blink effect after 3 seconds
        });
    });
});

// Navbar scroll effect
// window.addEventListener('scroll', function() {
//     const navbar = document.querySelector('.navbar');
//     if (window.scrollY > 50) {
//         navbar.style.background = 'rgba(255, 255, 255, 0.95)';
//         navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
//     } else {
//         navbar.style.background = 'white';
//         navbar.style.boxShadow = 'none';
//     }
// });

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Enhanced scroll animations
const scrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', scrollAnimations);

// Remove the Navbar scroll effect code completely
// Smooth navbar background transition
// const navbar = document.querySelector('.navbar');
// let lastScroll = 0;

// window.addEventListener('scroll', () => {
//     const currentScroll = window.pageYOffset;
    
//     if (currentScroll <= 0) {
//         navbar.classList.remove('scrolled');
//     }
//     if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
//         navbar.classList.add('scrolled');
//     }
    
//     lastScroll = currentScroll;
// });