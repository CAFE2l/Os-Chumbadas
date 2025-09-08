// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Dados dos membros (em produção, isso viria do Firestore)
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

// Carregar informações do perfil
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    
    if (userParam && teamMembers[userParam]) {
        const member = teamMembers[userParam];
        document.getElementById('profile-name').textContent = member.name;
        document.getElementById('profile-role').textContent = member.role;
        
        // Preencher serviços
        const servicesContainer = document.getElementById('services-container');
        servicesContainer.innerHTML = '';
        
        member.services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <span class="service-price">R$ ${service.price.toFixed(2)}</span>
                <button class="book-btn" data-service='${JSON.stringify(service)}' data-member='${userParam}'>Agendar Serviço</button>
            `;
            servicesContainer.appendChild(serviceCard);
        });
        
        // Adicionar event listeners aos botões de agendamento
        document.querySelectorAll('.book-btn').forEach(button => {
            button.addEventListener('click', function() {
                const service = JSON.parse(this.getAttribute('data-service'));
                const memberId = this.getAttribute('data-member');
                const memberName = teamMembers[memberId].name;
                
                // Salvar no localStorage para usar no checkout
                localStorage.setItem('selectedService', JSON.stringify(service));
                localStorage.setItem('selectedMember', memberId);
                localStorage.setItem('selectedMemberName', memberName);
                
                // Redirecionar para checkout
                window.location.href = 'checkout.html';
            });
        });
    } else {
        // Redirecionar se não encontrar o usuário
        window.location.href = 'index.html';
    }
});