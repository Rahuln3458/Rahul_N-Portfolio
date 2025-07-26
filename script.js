// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initTypingEffect();
    initProjectFilter();
    initScrollSpy();
    initScrollAnimation();
    initBackToTop();
    initContactForm();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            // Toggle the 'open' class on the menu button
            this.classList.toggle('open');
            // Toggle the 'active' class on the navigation links
            navLinks.classList.toggle('active');
        });

        // Close menu when a nav link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement) {
        // Add "I am a " as prefix, and words without leading/trailing spaces
        const prefix = '';
        const words = ['Student', 'Web Developer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = prefix + words[wordIndex];
            if (isDeleting) {
                typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1000;
            } 
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
    }
}

// Project Filtering
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Add animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Scroll Spy for Navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Scroll Animation for Elements
function initScrollAnimation() {
    // Add scroll animation to skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const skillSection = document.querySelector('#skills');
    
    if (skillBars.length && skillSection) {
        const animateSkills = function() {
            const sectionTop = skillSection.offsetTop;
            const sectionHeight = skillSection.clientHeight;
            
            if (pageYOffset > sectionTop - window.innerHeight / 2 && 
                pageYOffset < sectionTop + sectionHeight) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                // Remove event listener after animation
                window.removeEventListener('scroll', animateSkills);
            }
        };
        
        window.addEventListener('scroll', animateSkills);
    }
    
    // Add fade-in animation to sections
    const animateSections = document.querySelectorAll('section');
    
    if (animateSections.length) {
        const fadeIn = function() {
            animateSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset > sectionTop - window.innerHeight / 1.3 && 
                    pageYOffset < sectionTop + sectionHeight) {
                    section.classList.add('fade-in');
                }
            });
        };
        
        window.addEventListener('scroll', fadeIn);
        // Trigger once on load
        fadeIn();
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                // For this demo, we'll just show an alert
                alert('Thank you for your message! In a real application, this would be sent to a server.');
                
                // Reset the form
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
}