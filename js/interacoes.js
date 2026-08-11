// ===== Menu Hamburger =====
function clickMenu() {
    console.log("cliquei");
    let itens = document.getElementById("itens");
    
    if (itens.style.display === "block") {
        itens.style.display = "none";
    } else {
        itens.style.display = "block";
    }
}

// ===== Carrossel (com verificação se o jQuery está carregado) =====
if (typeof $ !== 'undefined') {
    $(document).ready(function() {
        if ($('#destaque').length > 0) {
            $('#destaque').slick({
                dots: true,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: false
            });
            console.log("✅ Carrossel inicializado!");
        } else {
            console.log("⚠️ Elemento #destaque não encontrado na página");
        }
    });
} else {
    console.warn("⚠️ jQuery não carregado - Carrossel não será inicializado");
}

// ===== SISTEMA DE MODAL =====

// Função para abrir o modal
function abrirModal(pacote) {
    console.log("Abrindo modal para:", pacote.titulo);
    
    const modal = document.getElementById('modalReserva');
    const imagem = document.getElementById('pacoteImagem');
    const titulo = document.getElementById('pacoteTitulo');
    const descricao = document.getElementById('pacoteDescricao');
    
    // Preenche os dados do pacote
    if (imagem) imagem.src = pacote.imagem;
    if (titulo) titulo.textContent = pacote.titulo;
    if (descricao) descricao.textContent = pacote.descricao;
    
    // Exibe o modal
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Limpa o formulário
    const form = document.getElementById('formReserva');
    if (form) form.reset();
}

// Função para fechar o modal
function fecharModal() {
    console.log("Fechando modal");
    const modal = document.getElementById('modalReserva');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== INICIALIZAÇÃO PRINCIPAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 DOM carregado - Inicializando sistema...");
    console.log("📦 jQuery disponível?", typeof $ !== 'undefined' ? "✅ Sim" : "❌ Não");
    
    // 1. Dados dos pacotes
    const pacotes = [
        {
            id: 0,
            titulo: "Trilhas de Bike",
            descricao: "Aventure-se pelas melhores trilhas de mountain bike com guias especializados.",
            imagem: "img/mountain-bike.jpg"
        },
        {
            id: 1,
            titulo: "Trilhas em família",
            descricao: "Uma experiência única para toda a família em contato com a natureza.",
            imagem: "img/trilha2.jpg"
        },
        {
            id: 2,
            titulo: "Trekking",
            descricao: "Explore paisagens incríveis em nossas expedições de trekking.",
            imagem: "img/trilha.jpg"
        }
    ];
    
    // 2. Configurar botões de reserva
    console.log("🔧 Configurando botões de reserva...");
    const botoesReserva = document.querySelectorAll('.pac-reserva');
    console.log("📊 Encontrados", botoesReserva.length, "botões de reserva");
    
    if (botoesReserva.length === 0) {
        console.warn("⚠️ Nenhum botão .pac-reserva encontrado!");
    }
    
    botoesReserva.forEach(function(botao, index) {
        console.log("  - Configurando botão", index);
        // Remove qualquer evento anterior
        botao.removeEventListener('click', function() {});
        
        botao.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            console.log("✅ Botão de reserva clicado! Índice:", index);
            
            if (pacotes[index]) {
                abrirModal(pacotes[index]);
            } else {
                console.error("❌ Pacote não encontrado para o índice:", index);
            }
        });
    });
    
    // 3. Fechar modal ao clicar no overlay
    const modal = document.getElementById('modalReserva');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                fecharModal();
            }
        });
    } else {
        console.warn("⚠️ Elemento #modalReserva não encontrado!");
    }
    
    // 4. Fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            fecharModal();
        }
    });
    
    // 5. Configurar formulário
    const formReserva = document.getElementById('formReserva');
    if (formReserva) {
        formReserva.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("📝 Formulário submetido");
            
            const nome = document.getElementById('nomeCompleto').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const data = document.getElementById('dataViagem').value;
            const pessoas = document.getElementById('qtdPessoas').value;
            const observacoes = document.getElementById('observacoes').value.trim();
            
            if (!nome || !email || !telefone || !data || !pessoas) {
                alert('⚠️ Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            const pacoteTitulo = document.getElementById('pacoteTitulo').textContent;
            alert('✅ Reserva confirmada!\n\n' +
                '📋 Pacote: ' + pacoteTitulo + '\n' +
                '👤 Nome: ' + nome + '\n' +
                '📧 E-mail: ' + email + '\n' +
                '📱 Telefone: ' + telefone + '\n' +
                '📅 Data: ' + data + '\n' +
                '👥 Pessoas: ' + pessoas + '\n' +
                '📝 Observações: ' + (observacoes || 'Nenhuma'));
            
            fecharModal();
            
            console.log('Dados da reserva:', {
                pacote: pacoteTitulo,
                nome: nome,
                email: email,
                telefone: telefone,
                data: data,
                pessoas: pessoas,
                observacoes: observacoes
            });
        });
    } else {
        console.warn("⚠️ Formulário #formReserva não encontrado!");
    }
    
    // 6. Máscara de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            this.value = value;
        });
    }
    
    // 7. BOTÃO DE TESTE
    const testBtn = document.createElement('button');
    testBtn.textContent = '🧪 TESTAR MODAL';
    testBtn.style.cssText = 'position:fixed; bottom:10px; right:10px; z-index:9999; background:#ED6D19; color:#fff; border:none; padding:10px 15px; border-radius:5px; cursor:pointer; font-weight:bold; box-shadow: 0 2px 10px rgba(0,0,0,0.3);';
    testBtn.onclick = function() {
        abrirModal({
            titulo: "🧪 TESTE",
            descricao: "Modal funcionando perfeitamente!",
            imagem: "img/mountain-bike.jpg"
        });
    };
    document.body.appendChild(testBtn);
    console.log("✅ Botão de teste adicionado!");
    
    console.log("🎯 Sistema inicializado com sucesso!");
});

// Garantir que os botões sejam configurados mesmo se a página carregar depois
window.addEventListener('load', function() {
    console.log("📄 Página completamente carregada");
});