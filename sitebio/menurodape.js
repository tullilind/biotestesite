/* ARQUIVO: menurodape.js 
   ESTÚDIO: Ar Solus
   DESCRIÇÃO: Injeta CSS, Fontes, Header, Footer e WIDGET DE CHAT (IA).
   VERSÃO: 6.0 (CORREÇÃO DE SCRIPT DO CHAT)
*/

// --- 1. O CSS (ESTILOS GERAIS + CHAT WIDGET) ---
const biotesteCSS = `
<style>
    /* === RESET E VARIÁVEIS === */
    :root {
        --primary-blue: #0056b3;
        --dark-blue: #003d80;
        --cyan-blue: #0099ff;
        --accent-green: #25d366; /* Verde WhatsApp */
        --white: #ffffff;
        --gray-bg: #f9f9f9;
        --text-dark: #333;
        --text-gray: #666;
        --border-color: #ddd;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
        font-family: 'Open Sans', sans-serif;
        background-color: #fff;
        color: var(--text-dark);
        line-height: 1.6;
        display: flex; flex-direction: column; min-height: 100vh;
    }
    
    h1, h2, h3, h4, h5 { font-family: 'Montserrat', sans-serif; }
    a { text-decoration: none; color: inherit; }
    ul { list-style: none; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

    /* === HEADER === */
    header { background: var(--white); border-bottom: 1px solid var(--border-color); position: relative; z-index: 1000; }
    .top-bar { padding: 15px 0; }
    .header-content { display: flex; justify-content: space-between; align-items: center; }
    .logo img { max-width: 240px; height: auto; display: block; }
    .header-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
    .whatsapp-line { font-size: 0.95rem; font-weight: 700; color: #444; display: flex; align-items: center; gap: 8px; }
    .whatsapp-line i { color: var(--accent-green); font-size: 1.2rem; } 
    .btn-group { display: flex; gap: 15px; }
    .btn-work { color: var(--primary-blue); border: 2px solid var(--primary-blue); padding: 8px 20px; border-radius: 4px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
    .btn-work:hover { background: var(--primary-blue); color: white; }
    .btn-result { background: var(--primary-blue); color: white; padding: 10px 28px; border-radius: 4px; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
    .btn-result:hover { background: var(--dark-blue); }

    /* === MENU === */
    nav { background: var(--primary-blue); margin-top: 10px; }
    .nav-list { display: flex; justify-content: space-between; color: white; }
    .nav-list li { position: relative; }
    .nav-list li > a { display: block; padding: 16px 20px; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .nav-list li > a:hover { background: rgba(0,0,0,0.1); }
    .dropdown-menu { display: none; position: absolute; top: 100%; left: 0; background: var(--primary-blue); min-width: 220px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 1000; border-top: 3px solid var(--accent-green); }
    .nav-list li:hover .dropdown-menu { display: block; }
    .dropdown-menu li a { padding: 14px 20px; font-size: 0.85rem; color: var(--white); font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.1); text-transform: none; display: block; }
    .dropdown-menu li a:hover { background: var(--dark-blue); color: var(--accent-green); padding-left: 25px; transition: 0.2s; }

    /* === FOOTER === */
    footer { background: var(--gray-bg); padding: 60px 0 0 0; color: var(--text-gray); font-size: 0.9rem; margin-top: auto; border-top: 4px solid var(--primary-blue); }
    .footer-grid { display: grid; grid-template-columns: 1.2fr 0.8fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
    .footer-col h4 { color: var(--primary-blue); margin-bottom: 20px; font-size: 1rem; font-weight: 700; border-bottom: 2px solid var(--primary-blue); padding-bottom: 10px; display: inline-block; text-transform: uppercase; }
    .footer-logo-text { font-family: 'Montserrat', sans-serif; font-size: 1.8rem; font-weight: 800; color: #999; letter-spacing: -1px; margin-bottom: 15px; display: block; }
    .contact-list p { margin-bottom: 15px; display: flex; align-items: flex-start; gap: 10px; }
    .contact-list i { color: var(--primary-blue); font-size: 1.1rem; margin-top: 3px; }
    .contact-list strong { color: #333; font-weight: 700; } 
    .footer-links li { margin-bottom: 10px; }
    .footer-links a:hover { color: var(--primary-blue); text-decoration: underline; }
    .footer-box { background: var(--white); padding: 20px; border: 1px solid #ddd; text-align: center; border-radius: 4px; }
    .footer-box h5 { color: var(--primary-blue); font-size: 0.95rem; margin: 10px 0 5px; font-weight: 700; }
    .footer-box a { color: var(--primary-blue); font-weight: bold; text-decoration: underline; }
    .social-icons { margin-top: 20px; display: flex; gap: 10px; }
    .social-icons a { width: 35px; height: 35px; background: var(--white); color: var(--primary-blue); border: 1px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
    .social-icons a:hover { background: var(--primary-blue); color: white; border-color: var(--primary-blue); }
    .copyright { background: #e9e9e9; text-align: center; padding: 20px 10px; font-size: 0.8rem; color: #666; margin-top: 30px; }
    .ar-solus { color: var(--primary-blue); font-weight: bold; margin-left: 5px; }

    /* === WIDGET CHATBOT WHATSAPP === */
    .bioteste-widget { position: fixed; bottom: 30px; right: 30px; z-index: 999999; font-family: 'Open Sans', sans-serif; }
    
    .chat-toggle-btn {
        width: 60px; height: 60px; background-color: var(--accent-green); border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3); cursor: pointer;
        transition: transform 0.3s; animation: pulse-green 2s infinite; position: relative;
    }
    .chat-toggle-btn i { color: white; font-size: 32px; }
    .chat-toggle-btn:hover { transform: scale(1.1); animation: none; }
    .chat-notification {
        position: absolute; top: -5px; right: -5px; background: red; color: white;
        font-size: 11px; font-weight: bold; width: 20px; height: 20px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center; border: 2px solid white;
    }

    .chat-window {
        position: absolute; bottom: 80px; right: 0; width: 350px;
        background: white; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        overflow: hidden; opacity: 0; visibility: hidden; transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); pointer-events: none;
    }
    .chat-window.active { opacity: 1; visibility: visible; transform: translateY(0); pointer-events: all; }

    .chat-header {
        background: var(--primary-blue); padding: 20px; color: white;
        display: flex; align-items: center; gap: 15px;
    }
    .chat-avatar { width: 40px; height: 40px; background: white; border-radius: 50%; padding: 2px; }
    .chat-avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: contain; }
    .chat-info h4 { margin: 0; font-size: 1rem; font-weight: 700; }
    .chat-info p { margin: 0; font-size: 0.75rem; opacity: 0.8; }
    .chat-close { position: absolute; top: 15px; right: 15px; cursor: pointer; color: rgba(255,255,255,0.7); }
    .chat-close:hover { color: white; }

    .chat-body { padding: 20px; background: #f0f2f5; max-height: 400px; overflow-y: auto; }
    
    .msg-bot { display: flex; gap: 10px; margin-bottom: 15px; animation: fadeIn 0.5s; }
    .msg-bot .bubble {
        background: white; padding: 12px 15px; border-radius: 0 15px 15px 15px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 0.9rem; color: #444; max-width: 85%;
    }
    .msg-bot small { display: block; font-size: 0.7rem; color: #999; margin-top: 5px; text-align: right; }

    .chat-options { display: flex; flex-direction: column; gap: 10px; animation: slideUp 0.5s; }
    .chat-btn {
        background: white; border: 1px solid var(--primary-blue); color: var(--primary-blue);
        padding: 10px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer;
        text-align: center; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .chat-btn:hover { background: var(--primary-blue); color: white; }
    .chat-btn i { font-size: 1rem; }
    
    .unit-list { display: flex; flex-direction: column; gap: 8px; animation: slideUp 0.5s; }
    .unit-btn {
        background: white; padding: 12px; border-radius: 8px; cursor: pointer; border: 1px solid #eee;
        display: flex; align-items: center; gap: 12px; transition: 0.2s; text-align: left;
    }
    .unit-btn:hover { background: #f0fff4; border-color: var(--accent-green); }
    .unit-btn i { color: var(--accent-green); font-size: 1.2rem; }
    .unit-info strong { display: block; color: #333; font-size: 0.9rem; }
    .unit-info span { font-size: 0.75rem; color: #777; }

    @keyframes pulse-green { 0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); } 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 768px) {
        .top-bar { padding: 20px 0; }
        .header-content { flex-direction: column; gap: 15px; }
        .header-actions { align-items: center; width: 100%; }
        .btn-group { width: 100%; flex-direction: column; }
        .btn-work, .btn-result { width: 100%; justify-content: center; }
        nav { overflow-x: auto; }
        .nav-list { width: max-content; padding: 0 10px; }
        .footer-grid { grid-template-columns: 1fr; text-align: center; gap: 30px; }
        .footer-col h4 { border-bottom: 2px solid var(--primary-blue); display: inline-block; }
        .contact-list p { justify-content: center; }
        .social-icons { justify-content: center; }
        .chat-window { width: 300px; right: -20px; bottom: 70px; }
    }
</style>
`;

// --- 2. O HTML DO HEADER ---
const biotesteHeaderHTML = `
<header>
    <div class="top-bar">
        <div class="container header-content">
            <div class="logo"><a href="index.html"><img src="logo.png" alt="Bioteste Laboratório"></a></div>
            <div class="header-actions">
                <div class="whatsapp-line"><i class="fab fa-whatsapp"></i> WhatsApp: (28) 98803-4796</div>
                <div class="btn-group">
                    <a href="trabalhe-conosco.html" class="btn-work"><i class="fas fa-briefcase"></i> Vagas</a>
                    <a href="http://biotestefw.ddns.com.br:8888/LaboratorioWeb.dll/" target="_blank" class="btn-result"><i class="fas fa-flask"></i> Ver Resultados</a>
                </div>
            </div>
        </div>
    </div>
    <nav>
        <div class="container">
            <ul class="nav-list">
                <li><a href="index.html">Home</a></li>
                <li>
                    <a href="#">A Empresa <i class="fas fa-caret-down" style="font-size:0.8em; margin-left:3px;"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="institucional.html">Sobre Nós</a></li>
                        <li><a href="missao.html">Missão e Valores</a></li>
                        <li><a href="enderecos.html">Nossas Unidades</a></li>
                        <li><a href="coleta.html">Coleta Domiciliar</a></li>
                    </ul>
                </li>
                <li><a href="convenios.html">Convênios</a></li>
                <li><a href="preparo.html">Preparo de Exames</a></li>
                <li><a href="noticias.html">Notícias</a></li>
                <li><a href="ouvidoria.html">Ouvidoria</a></li>
                <li><a href="contato.html">Contato</a></li>
            </ul>
        </div>
    </nav>
</header>
`;

// --- 3. O HTML DO FOOTER ---
const biotesteFooterHTML = `
<footer>
    <div class="container">
        <div class="footer-grid">
            <div class="footer-col">
                <span class="footer-logo-text">Bioteste</span>
                <p style="margin-bottom:20px; font-size:0.85rem;">Laboratório de Análises Clínicas.<br>Excelência e confiança.</p>
                <div class="contact-list">
                    <p><i class="fab fa-whatsapp"></i> <span><strong>(28) 98803-4796</strong><br>Matriz / Central</span></p>
                    <p><i class="fab fa-whatsapp"></i> <span><strong>(28) 99965-8828</strong><br>Unidade Av. Jones</span></p>
                    <p><i class="fab fa-whatsapp"></i> <span><strong>(28) 99936-0839</strong><br>Unidade Alto Novo Parque</span></p>
                    <p><i class="fab fa-whatsapp"></i> <span><strong>(28) 99252-8708</strong><br>Unidade Jerônimo Monteiro</span></p>
                    <p><i class="fab fa-whatsapp"></i> <span><strong>(28) 98816-0143</strong><br>Unidade Rio Novo do Sul</span></p>
                </div>
            </div>
            <div class="footer-col">
                <h4>Navegação</h4>
                <ul class="footer-links">
                    <li><a href="index.html">Início</a></li>
                    <li><a href="enderecos.html">Endereços</a></li>
                    <li><a href="convenios.html">Convênios</a></li>
                    <li><a href="preparo.html">Instruções de Coleta</a></li>
                    <li><a href="certificacoes.html">Certificações</a></li>
                    <li><a href="trabalhe-conosco.html">Trabalhe Conosco</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Serviços</h4>
                <div class="footer-box">
                    <i class="fas fa-home fa-2x" style="color:#0056b3; margin-bottom:10px;"></i>
                    <h5>COLETA DOMICILIAR</h5>
                    <p style="font-size: 0.85rem;">Agende sua coleta sem sair de casa.</p>
                    <a href="coleta.html">Saiba Mais</a>
                </div>
                <div style="margin-top:20px; text-align:center;">
                    <a href="http://biotestefw.ddns.com.br:8888/LaboratorioWeb.dll/" target="_blank" style="color:#0056b3; text-decoration:underline;">
                        <i class="fas fa-lock"></i> Acesso Resultados
                    </a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Contato</h4>
                <div style="margin-bottom: 20px;">
                    <strong style="display:block; color:#333;">OUVIDORIA</strong>
                    <a href="ouvidoria.html" style="color:#0056b3;">Enviar mensagem</a>
                </div>
                <h4>Redes Sociais</h4>
                <div class="social-icons">
                    <a href="https://www.facebook.com/people/Laborat%C3%B3rio-Bioteste/61572762844383/#" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/laboratoriobioteste/" target="_blank"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </div>
    <div class="copyright">
        <div class="container">
            <p>&copy; 2025 Laboratório Bioteste. Todos os direitos reservados.</p>
            <span class="ar-solus">Desenvolvido pela Ar Solus</span>
        </div>
    </div>
</footer>
`;

// --- 4. WIDGET CHATBOT HTML ---
const chatWidgetHTML = `
<div class="bioteste-widget">
    <div class="chat-window" id="chatWindow">
        <div class="chat-header">
            <div class="chat-avatar"><img src="logo.png" alt="Bot"></div>
            <div class="chat-info">
                <h4>Atendente Virtual</h4>
                <p>Laboratório Bioteste</p>
            </div>
            <div class="chat-close" onclick="toggleChat()"><i class="fas fa-times"></i></div>
        </div>
        <div class="chat-body" id="chatBody">
            </div>
    </div>
    <div class="chat-toggle-btn" onclick="toggleChat()">
        <i class="fab fa-whatsapp"></i>
        <div class="chat-notification">1</div>
    </div>
</div>
`;

// --- 5. INICIALIZAÇÃO GERAL ---
document.addEventListener("DOMContentLoaded", function() {
    const head = document.head;
    const body = document.body;

    // A. Injeta Fontes e Ícones
    if (!document.getElementById('bioteste-fonts')) {
        const fontsLink = document.createElement('link');
        fontsLink.id = 'bioteste-fonts';
        fontsLink.rel = 'stylesheet';
        fontsLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap';
        head.appendChild(fontsLink);
        
        const iconsLink = document.createElement('link');
        iconsLink.rel = 'stylesheet';
        iconsLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        head.appendChild(iconsLink);
    }

    // B. Injeta CSS
    head.insertAdjacentHTML("beforeend", biotesteCSS);

    // C. Injeta Header
    const headerPlaceholder = document.getElementById("bioteste-header");
    if (headerPlaceholder) headerPlaceholder.innerHTML = biotesteHeaderHTML;

    // D. Injeta Footer
    const footerPlaceholder = document.getElementById("bioteste-footer");
    if (footerPlaceholder) footerPlaceholder.innerHTML = biotesteFooterHTML;

    // E. Injeta Widget Chat
    body.insertAdjacentHTML("beforeend", chatWidgetHTML);

    // F. Lógica do Chat (DEFINIDA NO ESCOPO GLOBAL PARA NÃO DAR ERRO)
    window.isChatOpen = false;

    window.toggleChat = function() {
        const chatWindow = document.getElementById('chatWindow');
        const notif = document.querySelector('.chat-notification');
        
        window.isChatOpen = !window.isChatOpen;
        
        if (window.isChatOpen) {
            chatWindow.classList.add('active');
            notif.style.display = 'none';
            showMainMenu();
        } else {
            chatWindow.classList.remove('active');
        }
    };

    window.showMainMenu = function() {
        const body = document.getElementById('chatBody');
        body.innerHTML = `
            <div class="msg-bot">
                <div class="bubble">
                    Olá! Sou a assistente virtual do Bioteste. Como posso ajudar você hoje? 💙
                    <small>Agora</small>
                </div>
            </div>
            <div class="chat-options">
                <div class="chat-btn" onclick="showUnits()">
                    <i class="fab fa-whatsapp"></i> Falar com uma Unidade
                </div>
                <div class="chat-btn" onclick="openSurvey()">
                    <i class="fas fa-star"></i> Pesquisa de Qualidade
                </div>
            </div>
        `;
    };

    window.showUnits = function() {
        const body = document.getElementById('chatBody');
        body.innerHTML = `
            <div class="msg-bot">
                <div class="bubble">
                    Por favor, escolha a unidade mais próxima para falar no WhatsApp:
                </div>
            </div>
            <div class="unit-list">
                <div class="unit-btn" onclick="openWa('5528988034796')">
                    <i class="fab fa-whatsapp"></i>
                    <div class="unit-info"><strong>Matriz / Central</strong><span>Cachoeiro</span></div>
                </div>
                <div class="unit-btn" onclick="openWa('5528999658828')">
                    <i class="fab fa-whatsapp"></i>
                    <div class="unit-info"><strong>Av. Jones dos Santos</strong><span>Cachoeiro</span></div>
                </div>
                <div class="unit-btn" onclick="openWa('5528999360839')">
                    <i class="fab fa-whatsapp"></i>
                    <div class="unit-info"><strong>Alto Novo Parque</strong><span>Cachoeiro</span></div>
                </div>
                <div class="unit-btn" onclick="openWa('5528992528708')">
                    <i class="fab fa-whatsapp"></i>
                    <div class="unit-info"><strong>Jerônimo Monteiro</strong><span>Centro</span></div>
                </div>
                <div class="unit-btn" onclick="openWa('5528988160143')">
                    <i class="fab fa-whatsapp"></i>
                    <div class="unit-info"><strong>Rio Novo do Sul</strong><span>Centro</span></div>
                </div>
                <div class="chat-btn" onclick="showMainMenu()" style="margin-top:10px;">
                    <i class="fas fa-arrow-left"></i> Voltar
                </div>
            </div>
        `;
    };

    window.openWa = function(phone) {
        window.open(`https://wa.me/${phone}`, '_blank');
    };

    window.openSurvey = function() {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSegOMbAwW5SL9tHqNMcqHaVjDAYK0wYw2Snlh7ymAVC-R92KQ/viewform', '_blank');
    };
});