// ===== MINING PLATFORM LAYOUT LOGIC =====

(function() {
    'use strict';
    
    // Initialize layout when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeLayout();
        setupEventListeners();
        setActivePage();
        
        // Cargar datos desde localStorage inmediatamente (para mostrar algo rápido)
        const cachedData = loadUserDataFromStorage();
        if (cachedData) {
            console.log('⚡ Cargando datos en caché inmediatamente...');
            updateUserDisplay({
                username: cachedData.username,
                email: cachedData.email,
                balance: cachedData.balance
            });
        }
        
        // Esperar a que los sistemas de autenticación estén listos antes de actualizar desde backend
        waitForAuthSystems().then(() => {
            // Actualizar desde backend en segundo plano
            loadUserData(true); // forceRefresh = true para obtener datos frescos
        }).catch(() => {
            // Si falla, intentar de todos modos después de un delay
            setTimeout(() => {
                loadUserData(true);
            }, 2000);
        });
        
        // Actualizar balance desde el backend cada 30 segundos (para mantenerlo actualizado en tiempo real)
        setInterval(() => {
            console.log('🔄 Actualizando balance desde backend...');
            loadUserData(true); // Siempre forzar actualización para obtener balance actualizado
        }, 30000);
    });
    
    async function waitForAuthSystems() {
        const MAX_WAIT = 5000; // 5 segundos máximo
        const CHECK_INTERVAL = 100;
        const maxAttempts = MAX_WAIT / CHECK_INTERVAL;
        let attempts = 0;
        
        return new Promise((resolve, reject) => {
            const checkInterval = setInterval(() => {
                attempts++;
                
                // Verificar si backend API está disponible
                const backendReady = window.miningBackendAPI !== undefined;
                
                // Verificar si supabase está disponible
                const supabaseReady = window.supabaseIntegration !== undefined || 
                                     window.miningSupabaseAdapter !== undefined;
                
                // Si al menos uno está listo, continuar
                if (backendReady || supabaseReady) {
                    clearInterval(checkInterval);
                    console.log('✅ Sistemas de autenticación listos');
                    resolve();
                    return;
                }
                
                // Si se agotó el tiempo, continuar de todos modos
                if (attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                    console.warn('⚠️ Timeout esperando sistemas de autenticación, continuando...');
                    resolve();
                }
            }, CHECK_INTERVAL);
        });
    }
    
    function initializeLayout() {
        console.log('🔧 Initializing Mining Platform Layout...');
        
        // Set current page in breadcrumbs
        const currentPage = getCurrentPageName();
        const breadcrumbCurrent = document.getElementById('currentPage');
        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = formatPageName(currentPage);
        }
        
        // Set active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    function setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebarToggleDesktop = document.getElementById('sidebarToggleDesktop');
        const sidebar = document.getElementById('miningSidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
            });
        }
        
        if (sidebarToggleDesktop) {
            sidebarToggleDesktop.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
        }
        
        // User menu dropdown
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userMenuDropdown = document.getElementById('userMenuBtn')?.closest('.user-menu-dropdown');
        
        if (userMenuBtn && userMenuDropdown) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userMenuDropdown.classList.toggle('active');
            });
            
            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!userMenuDropdown.contains(e.target)) {
                    userMenuDropdown.classList.remove('active');
                }
            });
        }
        
        // Notification panel
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPanel = document.getElementById('notificationPanel');
        const closeNotifications = document.getElementById('closeNotifications');
        
        if (notificationBtn && notificationPanel) {
            notificationBtn.addEventListener('click', () => {
                notificationPanel.classList.toggle('active');
            });
        }
        
        if (closeNotifications && notificationPanel) {
            closeNotifications.addEventListener('click', () => {
                notificationPanel.classList.remove('active');
            });
        }
        
        // Global search (Ctrl+K)
        const globalSearch = document.getElementById('globalSearch');
        if (globalSearch) {
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    globalSearch.focus();
                }
            });
        }
        
        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                (async () => {
                    const confirmed = await window.miningNotifications?.confirm(
                        '¿Estás seguro de que deseas cerrar sesión?',
                        { title: 'Cerrar Sesión', type: 'warning' }
                    );
                    if (confirmed) {
                        // Limpiar datos del usuario del localStorage
                        localStorage.removeItem('mining_user_profile');
                        console.log('🧹 Datos del usuario eliminados del localStorage');
                        
                        // Limpiar datos del dashboard del localStorage
                        localStorage.removeItem('mining_dashboard_data');
                        console.log('🧹 Datos del dashboard eliminados del localStorage');
                        
                        // Limpiar token del backend
                        if (window.miningBackendAPI) {
                            window.miningBackendAPI.clearToken();
                        }
                        
                        // Limpiar datos de Supabase si existe
                        if (window.supabaseIntegration?.user) {
                            window.supabaseIntegration.user.isAuthenticated = false;
                        }
                        
                        // Redirigir a home
                        window.location.href = '../../index.html';
                    }
                })();
            });
        }
    }
    
    function setActivePage() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop().replace('.html', '');
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }
    
    function getCurrentPageName() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        return filename || 'dashboard';
    }
    
    function formatPageName(pageName) {
        const names = {
            'dashboard': 'Dashboard',
            'control': 'Mining Control',
            'analytics': 'Analytics',
            'earnings': 'Earnings',
            'transactions': 'Transactions',
            'pools': 'Pool Management',
            'referrals': 'Referrals',
            'events': 'Events',
            'settings': 'Settings',
            'api': 'API & Integrations',
            'support': 'Support'
        };
        return names[pageName] || pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }
    
    // Función para guardar datos del usuario en localStorage
    function saveUserDataToStorage(userData) {
        try {
            const dataToSave = {
                username: userData.username,
                email: userData.email,
                balance: parseFloat(userData.balance || 0),
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('mining_user_profile', JSON.stringify(dataToSave));
            console.log('💾 Datos del usuario guardados en localStorage:', dataToSave);
        } catch (error) {
            console.error('❌ Error guardando datos en localStorage:', error);
        }
    }
    
    // Función para cargar datos del usuario desde localStorage
    function loadUserDataFromStorage() {
        try {
            const stored = localStorage.getItem('mining_user_profile');
            if (stored) {
                const userData = JSON.parse(stored);
                console.log('📦 Datos del usuario cargados desde localStorage:', userData);
                return userData;
            }
        } catch (error) {
            console.error('❌ Error cargando datos desde localStorage:', error);
        }
        return null;
    }
    
    async function loadUserData(forceRefresh = false) {
        try {
            console.log('🔄 Cargando datos del usuario...', forceRefresh ? '(forzando actualización)' : '');
            
            // Si no es una actualización forzada, cargar primero desde localStorage para mostrar datos rápidamente
            if (!forceRefresh) {
                const cachedData = loadUserDataFromStorage();
                if (cachedData) {
                    console.log('⚡ Mostrando datos en caché mientras se actualiza...');
                    updateUserDisplay({
                        username: cachedData.username,
                        email: cachedData.email,
                        balance: cachedData.balance
                    });
                }
            }
            
            // Luego actualizar desde el backend en segundo plano
            if (window.miningBackendAPI) {
                // Asegurarse de que el token esté cargado
                if (!window.miningBackendAPI.token) {
                    window.miningBackendAPI.loadToken();
                }
                
                if (window.miningBackendAPI.isAuthenticated()) {
                    try {
                        console.log('📡 Obteniendo perfil actualizado desde backend API...');
                        const profileResponse = await window.miningBackendAPI.getProfile();
                        
                        if (profileResponse.success && profileResponse.data?.user) {
                            const user = profileResponse.data.user;
                            const userData = {
                                username: user.username,
                                email: user.email,
                                balance: parseFloat(user.balance || 0)
                            };
                            
                            console.log('✅ Datos del usuario actualizados desde backend:', userData);
                            
                            // Guardar en localStorage para persistencia
                            saveUserDataToStorage(userData);
                            
                            // Actualizar display
                            updateUserDisplay(userData);
                            return;
                        } else {
                            console.warn('⚠️ Respuesta del backend sin datos de usuario:', profileResponse);
                        }
                    } catch (error) {
                        console.error('❌ Error cargando perfil desde backend API:', error);
                        // Si hay error pero tenemos datos en caché, mantenerlos
                        if (!forceRefresh) {
                            console.log('ℹ️ Manteniendo datos en caché debido a error del backend');
                        }
                    }
                } else {
                    console.warn('⚠️ Backend API no autenticado');
                }
            } else {
                console.warn('⚠️ Backend API no disponible');
            }
            
            // Fallback: intentar desde Supabase adapter
            if (window.miningSupabaseAdapter && window.miningSupabaseAdapter.initialized) {
                try {
                    const userData = await window.miningSupabaseAdapter.getUserData();
                    if (userData) {
                        updateUserDisplay({
                            username: userData.username,
                            email: userData.email,
                            balance: parseFloat(userData.balance || 0)
                        });
                        return;
                    }
                } catch (error) {
                    console.warn('Error cargando datos desde Supabase adapter:', error);
                }
            }
            
            // Fallback: intentar desde supabaseIntegration
            if (window.supabaseIntegration && window.supabaseIntegration.user) {
                const user = window.supabaseIntegration.user;
                updateUserDisplay({
                    username: user.username,
                    email: user.email,
                    balance: parseFloat(user.balance || 0)
                });
                return;
            }
            
            // Fallback: localStorage
            const userData = localStorage.getItem('userData');
            if (userData) {
                try {
                    const user = JSON.parse(userData);
                    updateUserDisplay({
                        username: user.username,
                        email: user.email,
                        balance: parseFloat(user.balance || 0)
                    });
                } catch (e) {
                    console.error('Error parsing user data:', e);
                }
            }
        } catch (error) {
            console.error('Error cargando datos del usuario:', error);
        }
    }
    
    function updateUserDisplay(user) {
        console.log('🔄 Actualizando display del usuario:', user);
        
        // Determinar el nombre a mostrar (prioridad: username > email > 'Usuario')
        const userName = user.username || (user.email ? user.email.split('@')[0] : 'Usuario');
        
        // Actualizar nombre de usuario en sidebar, topbar y menú móvil
        const userNameElements = document.querySelectorAll('#userName, #userNameSmall, #mobileUserName');
        let updatedCount = 0;
        userNameElements.forEach(el => {
            if (el) {
                el.textContent = userName;
                updatedCount++;
            }
        });
        console.log(`✅ Actualizado nombre de usuario en ${updatedCount} elementos: "${userName}"`);
        
        // Actualizar balance si está disponible
        if (user.balance !== undefined && user.balance !== null) {
            const balanceValue = parseFloat(user.balance || 0);
            const balanceElements = document.querySelectorAll('#userBalance, #mobileUserBalance');
            let balanceUpdatedCount = 0;
            balanceElements.forEach(el => {
                if (el) {
                    el.textContent = `${balanceValue.toFixed(6)} RSC`;
                    balanceUpdatedCount++;
                }
            });
            console.log(`✅ Actualizado balance en ${balanceUpdatedCount} elementos: ${balanceValue.toFixed(6)} RSC`);
        } else {
            console.warn('⚠️ Balance no disponible en datos del usuario');
        }
    }
    
    // Export functions for use in other scripts
    window.miningLayout = {
        getCurrentPage: getCurrentPageName,
        formatPageName: formatPageName,
        updateUserDisplay: updateUserDisplay,
        loadUserData: loadUserData // Exportar para que pueda ser llamado desde otros scripts
    };
    
    // Forzar actualización de datos después de que todo esté listo
    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('🔄 Forzando actualización de datos del usuario después de carga completa...');
            loadUserData(true); // Forzar actualización desde backend
        }, 2000);
    });
    
    console.log('✅ Mining Platform Layout initialized');
})();

