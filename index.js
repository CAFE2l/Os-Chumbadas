// Dados dos membros e serviços
const teamMembers = {
    fabao: {
        name: "Fabão",
        role: "Designer UX/UI & Designer Gráfico",
        services: [
            { id: 1, name: "Design de Logo", description: "Criação de logo profissional para seu negócio", price: 150.00 },
            { id: 2, name: "Identidade Visual", description: "Desenvolvimento de identidade visual completa", price: 450.00 },
            { id: 3, name: "UI/UX Design", description: "Design de interface e experiência do usuário", price: 800.00 }
        ]
    },
    joao: {
        name: "João",
        role: "Técnico em Informática",
        services: [
            { id: 4, name: "Manutenção de Computadores", description: "Reparo e manutenção de hardware e software", price: 120.00 },
            { id: 5, name: "Formatação e Instalação", description: "Formatação e instalação de sistemas operacionais", price: 100.00 },
            { id: 6, name: "Remoção de Vírus", description: "Limpeza completa de vírus e malware", price: 80.00 }
        ]
    },
    victor: {
        name: "Victor - kkj",
        role: "Programador Linux & Back-end",
        services: [
            { id: 7, name: "Desenvolvimento Back-end", description: "Criação de APIs e sistemas server-side", price: 1200.00 },
            { id: 8, name: "Scripts em Linux", description: "Automação de tarefas com scripts personalizados", price: 300.00 },
            { id: 9, name: "Otimização de Servidores", description: "Configuração e otimização de servidores Linux", price: 500.00 }
        ]
    },
    cafe: {
        name: "CAFÉ",
        role: "Desenvolvedor Full-Stack",
        services: [
            { id: 10, name: "Desenvolvimento Web", description: "Criação de sites e aplicações web completas", price: 1500.00 },
            { id: 11, name: "Aplicativos Mobile", description: "Desenvolvimento de aplicativos iOS e Android", price: 2000.00 },
            { id: 12, name: "Consultoria em TI", description: "Consultoria especializada em tecnologia", price: 200.00 }
        ]
    }
};

// Variáveis globais
let currentMember = null;
let currentService = null;
let currentStep = 1;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initProgressBars();
    initContactForm();
    initNavigation();
    initProfileButtons();
    initModals();
    initCheckout();
});

// Inicializar animações de aparecimento ao rolar
function initAnimations() {
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
}

// Inicializar barras de progresso
function initProgressBars() {
    document.querySelectorAll('.progress').forEach(progress => {
        const width = progress.getAttribute('data-width');
        setTimeout(() => {
            progress.style.width = width;
        }, 100);
    });
}

// Inicializar formulário de contato
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
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
}

// Inicializar navegação suave
function initNavigation() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inicializar botões de perfil
function initProfileButtons() {
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            openProfileModal(memberId);
        });
    });
}

// Inicializar modais
function initModals() {
    // Fechar modais
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    // Fechar modal clicando fora dele
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModals();
            }
        });
    });
}

// Inicializar checkout
function initCheckout() {
    // Payment method selection
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(m => {
                m.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
    
    // Checkout navigation
    document.querySelector('.btn-next').addEventListener('click', nextStep);
    document.querySelector('.btn-prev').addEventListener('click', prevStep);
    document.querySelector('.btn-complete').addEventListener('click', completePayment);
    document.getElementById('close-checkout').addEventListener('click', closeModals);
}

// Abrir modal de perfil
function openProfileModal(memberId) {
    const member = teamMembers[memberId];
    if (!member) return;
    
    currentMember = memberId;
    
    document.getElementById('modal-member-name').textContent = member.name;
    document.getElementById('modal-member-role').textContent = member.role;
    
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = '';
    
    member.services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <span class="service-price">R$ ${service.price.toFixed(2)}</span>
            <button class="book-btn" data-service-id="${service.id}">Agendar Serviço</button>
        `;
        servicesContainer.appendChild(serviceCard);
    });
    
    // Adicionar event listeners para os botões de agendamento
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceId = parseInt(this.getAttribute('data-service-id'));
            const service = teamMembers[memberId].services.find(s => s.id === serviceId);
            
            if (service) {
                closeModals();
                setTimeout(() => {
                    openCheckoutModal(memberId, service);
                }, 300);
            }
        });
    });
    
    document.getElementById('profile-modal').classList.add('active');
}

// Abrir modal de checkout
function openCheckoutModal(memberId, service) {
    currentService = service;
    
    // Preencher informações do resumo
    document.getElementById('summary-service').textContent = service.name;
    document.getElementById('summary-provider').textContent = teamMembers[memberId].name;
    document.getElementById('summary-price').textContent = `R$ ${service.price.toFixed(2)}`;
    
    const total = service.price + 5; // Adicionando taxa fictícia
    document.getElementById('summary-total').textContent = `R$ ${total.toFixed(2)}`;
    
    // Resetar o checkout para o primeiro passo
    currentStep = 1;
    updateCheckoutSteps();
    
    document.getElementById('checkout-modal').classList.add('active');
}

// Fechar todos os modais
function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Avançar para o próximo passo do checkout
function nextStep() {
    if (currentStep === 1) {
        // Validar formulário de pagamento
        const cardNumber = document.getElementById('card-number').value;
        const cardName = document.getElementById('card-name').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;
        
        if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
            alert('Por favor, preencha todos os campos de pagamento.');
            return;
        }
    }
    
    currentStep++;
    updateCheckoutSteps();
}

// Voltar para o passo anterior do checkout
function prevStep() {
    currentStep--;
    updateCheckoutSteps();
}

// Atualizar a exibição dos passos do checkout
function updateCheckoutSteps() {
    // Atualizar indicadores de passo
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
    
    // Mostrar o formulário apropriado
    document.querySelectorAll('.checkout-form').forEach(form => {
        form.classList.remove('active');
    });
    
    if (currentStep === 1) {
        document.getElementById('payment-form').classList.add('active');
        document.querySelector('.btn-prev').style.visibility = 'hidden';
    } else if (currentStep === 2) {
        document.getElementById('summary-form').classList.add('active');
        document.querySelector('.btn-prev').style.visibility = 'visible';
    } else if (currentStep === 3) {
        document.getElementById('confirmation').classList.add('active');
        document.querySelector('.btn-prev').style.visibility = 'hidden';
        document.querySelector('.btn-next').style.visibility = 'hidden';
        document.querySelector('.btn-complete').style.visibility = 'hidden';
    }
}

// Completar o pagamento
function completePayment() {
    // Simular processamento do pagamento
    const completeBtn = document.querySelector('.btn-complete');
    const originalText = completeBtn.textContent;
    
    completeBtn.textContent = 'Processando...';
    completeBtn.disabled = true;
    
    setTimeout(() => {
        currentStep++;
        updateCheckoutSteps();
        completeBtn.textContent = originalText;
        completeBtn.disabled = false;
    }, 2000);
}