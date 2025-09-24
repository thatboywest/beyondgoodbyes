// navbar.js - Responsive navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icon between hamburger and X
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.className = 'fas fa-bars text-xl';
        } else {
            menuIcon.className = 'fas fa-times text-xl';
        }
    });
    
    // Close mobile menu when clicking on menu links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuIcon.className = 'fas fa-bars text-xl';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            menuIcon.className = 'fas fa-bars text-xl';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) { // md breakpoint
            mobileMenu.classList.add('hidden');
            menuIcon.className = 'fas fa-bars text-xl';
        }
    });
    
    // Smooth scrolling for anchor links
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
});

function toggleFAQ(id) {
            const answer = document.getElementById(`answer-${id}`);
            const toggle = document.getElementById(`toggle-${id}`);
            const icon = toggle.querySelector('i');
            
            // Close all other FAQs
            for (let i = 1; i <= 5; i++) {
                if (i !== id) {
                    const otherAnswer = document.getElementById(`answer-${i}`);
                    const otherToggle = document.getElementById(`toggle-${i}`);
                    const otherIcon = otherToggle.querySelector('i');
                    
                    otherAnswer.classList.remove('open');
                    otherToggle.classList.remove('rotated');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            }
            
            // Toggle current FAQ
            if (answer.classList.contains('open')) {
                answer.classList.remove('open');
                toggle.classList.remove('rotated');
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                answer.classList.add('open');
                toggle.classList.add('rotated');
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        }



        