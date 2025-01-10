document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // More robust initialization check
    if (!menuToggle || !navLinks) {
        console.warn('Navigation elements not found');
        return;
    }

    // Initialize menu state
    let isMenuOpen = false;

    // Enhanced toggle with error handling
    menuToggle.addEventListener('click', (e) => {
        try {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = isMenuOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        } catch (error) {
            console.error('Error toggling menu:', error);
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            isMenuOpen = false;
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });

    // Handle touch events for mobile
    menuToggle.addEventListener('touchend', (e) => {
        e.preventDefault();
        menuToggle.click();
    });

    // Mobile menu elements
    const dropdowns = document.querySelectorAll('.dropdown');

    // Handle dropdowns
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const link = trigger.getAttribute('href');
        
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Always prevent default first
            
            if (window.innerWidth <= 1200) {
                // Mobile behavior
                dropdown.classList.toggle('active');
                const icon = trigger.querySelector('i');
                icon.style.transform = dropdown.classList.contains('active') ? 'rotate(-180deg)' : '';
            } else {
                // Desktop behavior - only navigate if dropdown is already open
                if (dropdown.classList.contains('active')) {
                    window.location.href = link;
                }
            }
        });

        // Handle direct link clicks inside dropdown
        dropdown.querySelectorAll('.dropdown-content a').forEach(item => {
            item.addEventListener('click', (e) => {
                if (window.innerWidth <= 1200) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
                dropdown.classList.remove('active');
            });
        });
    });

    // Handle navigation links
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default for same-page links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Close mobile menu
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    isMenuOpen = false;
                    document.body.style.overflow = '';
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 1200) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                isMenuOpen = false;
                document.body.style.overflow = '';
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        }, 250);
    });

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

    // Fix links on all pages
    const links = document.querySelectorAll('a[href*="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
            
            // Handle page transitions for internal links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Update touch device handling
    if (window.matchMedia('(hover: none)').matches) {
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            
            trigger.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const isActive = dropdown.classList.contains('active');
                
                // Close all other dropdowns
                dropdowns.forEach(d => d.classList.remove('active'));
                
                if (!isActive) {
                    dropdown.classList.add('active');
                    e.stopPropagation();
                } else if (trigger.getAttribute('href')) {
                    window.location.href = trigger.getAttribute('href');
                }
            }, { passive: false });
        });

        // Close dropdowns when touching outside
        document.addEventListener('touchstart', (e) => {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    }
});

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