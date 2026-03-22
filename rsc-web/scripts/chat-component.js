// ===== COMPONENTE DE CHAT REUTILIZABLE =====
// Este script agrega el chat a cualquier página que lo necesite

class ChatComponent {
  constructor() {
    this.isInitialized = false;
    this.init();
  }

  init() {
    // Solo inicializar si no existe ya un chat
    if (document.getElementById('supportChat')) {
      return;
    }

    this.createChatHTML();
    this.initializeChat();
    this.loadAIAgent();
  }

  createChatHTML() {
    const chatHTML = `
      <!-- Chat de Soporte Avanzado - RSC Chain -->
      <div class="advanced-support-chat" id="supportChat">
        <!-- Overlay de fondo -->
        <div class="chat-overlay"></div>
        
        <!-- Contenedor principal del chat -->
        <div class="chat-container">
          
          <!-- Header del chat -->
          <div class="chat-header">
            <div class="chat-header-left">
              <div class="chat-avatar">
                <div class="avatar-icon">🤖</div>
                <div class="status-indicator online"></div>
              </div>
              <div class="chat-info">
                <h3 class="chat-title">Asistente RSC Chain</h3>
                <div class="chat-status">
                  <span class="status-dot online"></span>
                  <span class="status-text">En línea</span>
                  <span class="response-time">Respuesta en < 30s</span>
                </div>
              </div>
            </div>
            
            <div class="chat-header-right">
              <button class="chat-control-btn" id="minimizeChat" title="Minimizar">
                <span class="btn-icon">−</span>
              </button>
              <button class="chat-control-btn" id="closeChat" title="Cerrar">
                <span class="btn-icon">×</span>
              </button>
            </div>
          </div>
          
          <!-- Área de conversación -->
          <div class="chat-messages" id="chatMessages">
            <!-- Mensaje de bienvenida -->
            <div class="message assistant-message">
              <div class="message-avatar">
                <div class="avatar-icon">🤖</div>
              </div>
              <div class="message-content">
                <div class="message-bubble">
                  <div class="message-text">
                    <p>¡Hola! Soy el asistente inteligente de <strong>RSC Chain</strong>. 🤖</p>
                    <p>Estoy aquí para ayudarte con cualquier consulta sobre nuestra blockchain revolucionaria.</p>
                  </div>
                  <div class="message-time">Ahora</div>
                </div>
              </div>
            </div>
            
            <!-- Categorías de soporte -->
            <div class="message assistant-message">
              <div class="message-avatar">
                <div class="avatar-icon">🤖</div>
              </div>
              <div class="message-content">
                <div class="message-bubble">
                  <div class="message-text">
                    <p><strong>¿En qué puedo ayudarte?</strong></p>
                    <p>Selecciona una categoría o escribe tu consulta:</p>
                  </div>
                  
                  <div class="support-categories">
                    <div class="category-card" data-category="technical">
                      <div class="category-icon">🔧</div>
                      <div class="category-content">
                        <h4>Problemas Técnicos</h4>
                        <p>Errores, bugs, problemas de conexión</p>
                      </div>
                      <div class="category-arrow">→</div>
                    </div>
                    
                    <div class="category-card" data-category="transactions">
                      <div class="category-icon">💰</div>
                      <div class="category-content">
                        <h4>Transacciones</h4>
                        <p>Consultas sobre pagos y transferencias</p>
                      </div>
                      <div class="category-arrow">→</div>
                    </div>
                    
                    <div class="category-card" data-category="mining">
                      <div class="category-icon">⛏️</div>
                      <div class="category-content">
                        <h4>Minería</h4>
                        <p>Configuración y optimización</p>
                      </div>
                      <div class="category-arrow">→</div>
                    </div>
                    
                    <div class="category-card" data-category="staking">
                      <div class="category-icon">🔒</div>
                      <div class="category-content">
                        <h4>Staking</h4>
                        <p>Estrategias y recompensas</p>
                      </div>
                      <div class="category-arrow">→</div>
                    </div>
                    
                    <div class="category-card" data-category="wallet">
                      <div class="category-icon">💼</div>
                      <div class="category-content">
                        <h4>Wallet</h4>
                        <p>Seguridad y gestión</p>
                      </div>
                      <div class="category-arrow">→</div>
                    </div>
                    
                    <div class="category-card" data-category="general">
                      <div class="category-icon">🌐</div>
                      <div class="category-content">
                        <h4>General</h4>
                        <p>Información general sobre RSC Chain</p>
                      </div>
                      <div class="category-arrow">→</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Área de entrada -->
          <div class="chat-input-area">
            <div class="input-container">
              <div class="input-wrapper">
                <input type="text" id="chatInput" placeholder="Escribe tu mensaje..." class="chat-input">
                <div class="input-actions">
                  <button class="action-btn" id="attachFile" title="Adjuntar archivo">
                    <span class="btn-icon">📎</span>
                  </button>
                  <button class="action-btn" id="emojiBtn" title="Emojis">
                    <span class="btn-icon">😊</span>
                  </button>
                </div>
              </div>
              <button class="send-btn" id="sendMessage" disabled>
                <span class="send-icon">→</span>
              </button>
            </div>
            
            <!-- Indicadores de escritura -->
            <div class="typing-indicator" id="typingIndicator">
              <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span class="typing-text">Asistente escribiendo...</span>
            </div>
          </div>
          
          <!-- Panel de emojis -->
          <div class="emoji-panel" id="emojiPanel">
            <div class="emoji-grid">
              <span class="emoji" data-emoji="😊">😊</span>
              <span class="emoji" data-emoji="👍">👍</span>
              <span class="emoji" data-emoji="❤️">❤️</span>
              <span class="emoji" data-emoji="🚀">🚀</span>
              <span class="emoji" data-emoji="💎">💎</span>
              <span class="emoji" data-emoji="⚡">⚡</span>
              <span class="emoji" data-emoji="🔧">🔧</span>
              <span class="emoji" data-emoji="💰">💰</span>
              <span class="emoji" data-emoji="⛏️">⛏️</span>
              <span class="emoji" data-emoji="🔒">🔒</span>
              <span class="emoji" data-emoji="💱">💱</span>
              <span class="emoji" data-emoji="💼">💼</span>
            </div>
          </div>
        </div>
        
        <!-- Botón flotante para abrir chat -->
        <div class="chat-toggle" id="chatToggle">
          <div class="toggle-icon">💬</div>
          <div class="toggle-badge" id="messageBadge">0</div>
        </div>
        
        <!-- Notificaciones del chat -->
        <div class="chat-notification" id="chatNotification">
          <div class="notification-content">
            <span class="notification-icon">🔔</span>
            <span class="notification-text">Nuevo mensaje del asistente</span>
          </div>
        </div>
      </div>
    `;

    // Insertar el chat al final del body
    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  initializeChat() {
    // Inicializar el chat solo si no está ya inicializado
    if (this.isInitialized) {
      return;
    }

    // Crear una instancia del chat avanzado
    if (window.AdvancedSupportChat) {
      new AdvancedSupportChat();
      this.isInitialized = true;
      console.log('Chat inicializado en la página');
    } else {
      console.warn('AdvancedSupportChat no está disponible');
    }
  }

  async loadAIAgent() {
    try {
      // Cargar el script del agente IA si no está ya cargado
      if (typeof window.initializeRSCAIAgent === 'undefined') {
        const script = document.createElement('script');
        script.src = 'scripts/ai-agent-loader.js';
        script.async = true;
        document.head.appendChild(script);
        
        // Esperar a que se cargue
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      // Inicializar el agente IA
      if (typeof window.initializeRSCAIAgent !== 'undefined') {
        await window.initializeRSCAIAgent();
        console.log('🤖 Agente IA cargado en chat component');
      }
      
    } catch (error) {
      console.warn('⚠️ No se pudo cargar el agente IA:', error);
      // El chat seguirá funcionando con respuestas básicas
    }
  }
}

// Inicializar el componente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  new ChatComponent();
});

// Exportar para uso global
window.ChatComponent = ChatComponent; 