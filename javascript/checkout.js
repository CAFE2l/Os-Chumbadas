// Configuração do Firebase (a mesma do profile.js)
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

document.addEventListener('DOMContentLoaded', function() {
    // Carregar informações do serviço selecionado
    const service = JSON.parse(localStorage.getItem('selectedService') || '{}');
    const memberId = localStorage.getItem('selectedMember');
    const memberName = localStorage.getItem('selectedMemberName');
    
    if (!service.id) {
        alert('Nenhum serviço selecionado. Redirecionando...');
        window.location.href = 'index.html';
        return;
    }
    
    // Preencher resumo do pedido
    const orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = `
        <div class="order-item">
            <span>${service.name} por ${memberName}</span>
            <span>R$ ${service.price.toFixed(2)}</span>
        </div>
    `;
    
    document.getElementById('total-price').textContent = `R$ ${service.price.toFixed(2)}`;
    
    // Alternar métodos de pagamento
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.payment-details').forEach(detail => detail.classList.add('hidden'));
            document.getElementById(`${this.dataset.method}-details`).classList.remove('hidden');
        });
    });
    
    // Processar pagamento
    document.getElementById('pay-now').addEventListener('click', function() {
        const paymentMethod = document.querySelector('.payment-method.active').dataset.method;
        const appointmentDate = document.getElementById('appointment-date').value;
        const appointmentTime = document.getElementById('appointment-time').value;
        
        if (!appointmentDate || !appointmentTime) {
            alert('Por favor, selecione data e horário para o agendamento.');
            return;
        }
        
        // Validação básica do cartão se for o método selecionado
        if (paymentMethod === 'credit-card') {
            const cardNumber = document.getElementById('card-number').value;
            const cardName = document.getElementById('card-name').value;
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCvv = document.getElementById('card-cvv').value;
            
            if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
                alert('Por favor, preencha todos os dados do cartão.');
                return;
            }
            
            // Validação simples do número do cartão (apenas para demonstração)
            if (cardNumber.replace(/\s/g, '').length !== 16) {
                alert('Número do cartão inválido. Deve conter 16 dígitos.');
                return;
            }
        }
        
        // Simular processamento do pagamento
        this.textContent = 'Processando...';
        this.disabled = true;
        
        // Em um cenário real, aqui você faria a integração com a API de pagamento
        setTimeout(() => {
            // Salvar agendamento no Firestore
            db.collection('appointments').add({
                service: service.name,
                serviceId: service.id,
                member: memberId,
                memberName: memberName,
                date: appointmentDate,
                time: appointmentTime,
                price: service.price,
                paymentMethod: paymentMethod,
                status: 'confirmed',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert('Pagamento processado com sucesso! Seu agendamento foi confirmado.');
                localStorage.removeItem('selectedService');
                localStorage.removeItem('selectedMember');
                localStorage.removeItem('selectedMemberName');
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Erro ao salvar agendamento:', error);
                alert('Ocorreu um erro ao processar seu agendamento. Tente novamente.');
                this.textContent = 'Pagar Agora';
                this.disabled = false;
            });
        }, 2000);
    });
    
    // Definir data mínima como hoje
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointment-date').setAttribute('min', today);
});