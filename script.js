document.addEventListener('DOMContentLoaded', () => {
    // Scroll observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Anchor links: allow native CSS smooth scroll, just close mobile menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (mobileNav && mobileNav.classList.contains('open')) {
                mobileNav.classList.remove('open');
                mobileMenuBtn.classList.remove('open');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            mobileMenuBtn.classList.toggle('open');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // About Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active to clicked
                btn.classList.add('active');
                const target = document.getElementById('tab-' + btn.getAttribute('data-tab'));
                if (target) target.classList.add('active');
            });
        });
    }

    // Login Form Logic
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Lista oficial de usuários e senhas autorizados
        const validUsers = {
            "pedroc": "16072014",
            "rachelp": "5101974",
            "vitork": "22032014",
            "brunoa": "19101984",
            "marcosm": "21082013",
            "natalien": "26091995",
            "osmars": "30081996",
            "paulav": "14111990",
            "pedroa": "19012015",
            "victorian": "23092005",
            "rafaelar": "14071989",
            "renanm": "16051987",
            "evaldoa": "20081970",
            "fábiog": "01051997",
            "fabiog": "01051997",
            "arthurs": "14042016",
            "alessandroc": "03011969",
            "daianas": "25082010",
            "daniels": "08032013",
            "felipek": "29102017",
            "rodrigos": "27062014",
            "matheusc": "12011993",
            "ademirc": "12011965",
            "katiac": "29041964",
            "thiagoc": "16061994",
            "julianab": "12011998"
        };

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usernameInput = document.getElementById('username').value.trim().toLowerCase();
            const passwordInput = document.getElementById('password').value.trim();
            const errorDiv = document.getElementById('loginError');

            // Normaliza usuário (remove acentos se necessário)
            const normalizedUser = usernameInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            const isValidUser = validUsers[usernameInput] || validUsers[normalizedUser];
            const expectedPassword = isValidUser;

            // Valida a senha
            let isPasswordCorrect = (passwordInput === expectedPassword);
            if (!isPasswordCorrect && usernameInput === 'rachelp' && passwordInput === '05101974') {
                isPasswordCorrect = true;
            }

            if (isValidUser && isPasswordCorrect) {
                // Sucesso no login, redireciona para a plataforma
                if (errorDiv) errorDiv.style.display = 'none';
                window.location.href = 'plataforma.html';
            } else {
                // Erro de login
                if (errorDiv) {
                    errorDiv.style.display = 'block';
                } else {
                    alert('Usuário ou senha incorretos.');
                }
            }
        });
    }
});
