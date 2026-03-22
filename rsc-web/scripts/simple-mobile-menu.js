/* ===== SIMPLE MOBILE MENU JAVASCRIPT ===== */
/* Controla el menú hamburguesa simple y funcional */

class SimpleMobileMenu {
  constructor() {
    this.menuBtn = document.getElementById('mobileMenuBtn');
    this.menu = document.getElementById('mobileMenu');
    this.closeBtn = document.getElementById('mobileMenuClose');
    this.overlay = document.querySelector('.mobile-menu-overlay');
    this.navLinks = document.querySelectorAll('.mobile-nav-link');
    
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    console.log('🍔 Simple Mobile Menu initialized');
  }
  
  setupEventListeners() {
    // Botón hamburguesa
    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMenu();
      });
    }
    
    // Botón cerrar
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeMenu();
      });
    }
    
    // Overlay para cerrar
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeMenu();
      });
    }
    
    // Enlaces de navegación
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
    
    // Cerrar al redimensionar ventana
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1023 && this.isOpen) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    if (this.isOpen) return;
    
    this.isOpen = true;
    
    // Añadir clases activas
    this.menuBtn.classList.add('active');
    this.menu.classList.add('active');
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    // Focus en el primer enlace
    setTimeout(() => {
      if (this.navLinks.length > 0) {
        this.navLinks[0].focus();
      }
    }, 300);
  }
  
  closeMenu() {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    
    // Remover clases activas
    this.menuBtn.classList.remove('active');
    this.menu.classList.remove('active');
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
    
    // Focus en el botón hamburguesa
    setTimeout(() => {
      this.menuBtn.focus();
    }, 300);
  }
  
  // Método público para cerrar desde otros scripts
  forceClose() {
    this.closeMenu();
  }
  
  // Método público para verificar si está abierto
  isMenuOpen() {
    return this.isOpen;
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.simpleMobileMenu = new SimpleMobileMenu();
});

// Exportar para uso global
window.SimpleMobileMenu = SimpleMobileMenu;
