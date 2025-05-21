/*
 * Darwish Bin Karam School Website
 * Main JavaScript File
 * © 2025 - All rights reserved
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Language switcher
    const langToggle = document.getElementById('langToggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const html = document.documentElement;
            const currentLang = html.getAttribute('lang');
            const currentDir = html.getAttribute('dir');
            
            if (currentLang === 'ar') {
                // Switch to English
                html.setAttribute('lang', 'en');
                html.setAttribute('dir', 'ltr');
                langToggle.textContent = 'العربية';
                
                // Update page content to English
                updatePageContent('en');
            } else {
                // Switch to Arabic
                html.setAttribute('lang', 'ar');
                html.setAttribute('dir', 'rtl');
                langToggle.textContent = 'English';
                
                // Update page content to Arabic
                updatePageContent('ar');
            }
        });
    }
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset previous error states
            resetErrors();
            
            // Validate name
            if (!nameInput.value.trim()) {
                displayError(nameInput, 'الاسم مطلوب');
                isValid = false;
            }
            
            // Validate email
            if (!validateEmail(emailInput.value)) {
                displayError(emailInput, 'البريد الإلكتروني غير صالح');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                displayError(messageInput, 'الرسالة مطلوبة');
                isValid = false;
            }
            
            // If valid, show success message (in real application, would submit to server)
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا.';
                
                contactForm.reset();
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Curriculum tabs functionality
    const levelTabs = document.querySelectorAll('.level-tab');
    const levelContents = document.querySelectorAll('.level-content');
    
    if (levelTabs.length > 0 && levelContents.length > 0) {
        levelTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                levelTabs.forEach(t => t.classList.remove('active'));
                levelContents.forEach(c => c.style.display = 'none');
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding content
                const targetId = tab.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
            });
        });
        
        // Activate first tab by default
        if (levelTabs[0]) {
            levelTabs[0].click();
        }
    }
});

// Helper Functions

// Email validation
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Display form error
function displayError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    formGroup.classList.add('has-error');
    formGroup.appendChild(errorElement);
}

// Reset form errors
function resetErrors() {
    const formGroups = document.querySelectorAll('.form-group');
    const errorMessages = document.querySelectorAll('.error-message');
    
    formGroups.forEach(group => group.classList.remove('has-error'));
    errorMessages.forEach(error => error.remove());
}

// Update page content based on language
function updatePageContent(language) {
    // This function would ideally update all text content on the page
    // For a real implementation, this would use translations stored in a 
    // separate file or database. For this example, we'll keep it simple.
    
    // Example of how to update navigation in real implementation
    if (language === 'en') {
        updateElement('.logo a', 'Darwish Bin Karam School');
        updateNavigation('en');
    } else {
        updateElement('.logo a', 'مدرسة درويش بن كرم');
        updateNavigation('ar');
    }
}

// Update navigation items
function updateNavigation(language) {
    const navItems = {
        'en': ['Home', 'About', 'Curriculum', 'News', 'Contact'],
        'ar': ['الرئيسية', 'عن المدرسة', 'المناهج', 'الأخبار والفعاليات', 'اتصل بنا']
    };
    
    const navLinks = document.querySelectorAll('nav ul li a');
    if (navLinks.length === navItems[language].length) {
        navLinks.forEach((link, index) => {
            link.textContent = navItems[language][index];
        });
    }
}

// Helper to update element content
function updateElement(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = content;
    }
}
