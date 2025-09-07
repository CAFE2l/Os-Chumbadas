// Script para animação de aparecimento ao rolar
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Inicializar barras de progresso
    document.querySelectorAll('.progress').forEach(progress => {
        const width = progress.getAttribute('data-width');
        // Usando setTimeout para garantir que a transição seja visível
        setTimeout(() => {
            progress.style.width = width;
        }, 100);
    });
    
    // Adicionar evento de submit ao formulário
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio do formulário
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Adicionar smooth scrolling para links de navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ... (código existente) ...

// Adicionar no final do arquivo:

// Carregar serviços na seção de perfis
document.addEventListener('DOMContentLoaded', function() {
    // ... (código existente) ...
    
    // Carregar serviços na seção de perfis
    const servicesContainer = document.querySelector('.services-container');
    if (servicesContainer) {
        // Em produção, esses dados viriam do Firestore
        const featuredServices = [
            { member: 'fabao', name: 'Design de Logo', description: 'Criação de logo profissional', price: 150.00 },
            { member: 'joao', name: 'Manutenção de Computadores', description: 'Reparo e manutenção', price: 120.00 },
            { member: 'victor', name: 'Desenvolvimento Back-end', description: 'Criação de APIs', price: 1200.00 },
            { member: 'cafe', name: 'Desenvolvimento Web', description: 'Sites e aplicações web', price: 1500.00 }
        ];
        
        featuredServices.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card fade-in';
            serviceCard.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <span class="service-price">R$ ${service.price.toFixed(2)}</span>
                <a href="profile.html?user=${service.member}" class="book-btn">Ver Detalhes</a>
            `;
            servicesContainer.appendChild(serviceCard);
        });
    }
    
    // Observar elementos com classe fade-in (já existente)
    // ...
});