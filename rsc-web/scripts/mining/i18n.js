// ===== INTERNATIONALIZATION (i18n) SYSTEM =====
// Sistema de traducción multiidioma para la plataforma de minería

(function() {
    'use strict';
    
    // Idiomas disponibles
    const availableLanguages = {
        'es': {
            code: 'es',
            name: 'Español',
            flag: '🇪🇸',
            nativeName: 'Español'
        },
        'en': {
            code: 'en',
            name: 'English',
            flag: '🇺🇸',
            nativeName: 'English'
        },
        'pt': {
            code: 'pt',
            name: 'Português',
            flag: '🇧🇷',
            nativeName: 'Português'
        },
        'fr': {
            code: 'fr',
            name: 'Français',
            flag: '🇫🇷',
            nativeName: 'Français'
        },
        'de': {
            code: 'de',
            name: 'Deutsch',
            flag: '🇩🇪',
            nativeName: 'Deutsch'
        },
        'it': {
            code: 'it',
            name: 'Italiano',
            flag: '🇮🇹',
            nativeName: 'Italiano'
        },
        'zh': {
            code: 'zh',
            name: '中文',
            flag: '🇨🇳',
            nativeName: '中文'
        },
        'ja': {
            code: 'ja',
            name: '日本語',
            flag: '🇯🇵',
            nativeName: '日本語'
        },
        'ru': {
            code: 'ru',
            name: 'Русский',
            flag: '🇷🇺',
            nativeName: 'Русский'
        },
        'ar': {
            code: 'ar',
            name: 'العربية',
            flag: '🇸🇦',
            nativeName: 'العربية'
        }
    };
    
    // Traducciones
    const translations = {
        es: {
            // Navegación
            'dashboard': 'Dashboard',
            'mining_control': 'Mining Control',
            'analytics': 'Analytics',
            'earnings': 'Earnings',
            'transactions': 'Transactions',
            'pool_management': 'Pool Management',
            'referrals': 'Referrals',
            'events': 'Events',
            'settings': 'Settings',
            'api': 'API & Integrations',
            'support': 'Support',
            'back_to_home': 'Back to Home',
            
            // Topbar
            'search': 'Search... (Ctrl+K)',
            'connected': 'Connected',
            'notifications': 'Notifications',
            'profile_settings': 'Profile Settings',
            'api_keys': 'API Keys',
            'logout': 'Logout',
            
            // Común
            'loading': 'Cargando...',
            'error': 'Error',
            'success': 'Éxito',
            'cancel': 'Cancelar',
            'save': 'Guardar',
            'delete': 'Eliminar',
            'edit': 'Editar',
            'close': 'Cerrar',
            
            // Eventos
            'active_events': 'Active Events',
            'upcoming_events': 'Upcoming Events',
            'past_events': 'Past Events',
            'activate_event': 'Activate Event',
            'coming_soon': 'Coming Soon',
            'event_ended': 'Event Ended',
            'no_active_events': 'No active events at the moment',
            'no_upcoming_events': 'No upcoming events',
            'no_past_events': 'No past events',
            
            // Snow Mining Event
            'level': 'Nivel',
            'energy': 'Energía',
            'items': 'Items',
            'earned': 'Ganado',
            'streak': 'Streak',
            'active_powerups': 'Power-ups Activos',
            'no_powerups': 'Ningún power-up activo',
            'daily_missions': 'Misiones Diarias',
            'statistics': 'Estadísticas',
            'back_to_events': 'Volver a Eventos',
            
            // Dashboard
            'dashboard_subtitle': 'Vista general de tu actividad de minería',
            'start_mining': 'Iniciar Minería',
            'current_hashrate': 'Hashrate Actual',
            'average': 'Promedio',
            'total_balance': 'Balance Total',
            'available': 'Disponible',
            'today_earnings': 'Ganancias Hoy',
            'today': 'Hoy',
            'active_time': 'Tiempo Activo',
            'current_session': 'Sesión actual',
            'active': 'Activo',
            'hashrate_performance': 'Rendimiento de Hashrate',
            'earnings_chart': 'Ganancias',
            'recent_activity': 'Actividad Reciente',
            'no_activity': 'No hay actividad reciente',
            'view_all': 'Ver Todo',
            'mining_status': 'Estado de Minería',
            'stopped': 'Detenido',
            'running': 'En Ejecución',
            'paused': 'Pausado',
            'quick_actions': 'Acciones Rápidas',
            'mining_control_btn': 'Control de Minería',
            'view_analytics': 'Ver Analytics',
            'manage_pools': 'Gestionar Pools',
            'view_all_transactions': 'Ver todas',
            'mining_started': 'Minería iniciada',
            'reward_received': 'Recompensa recibida',
            'minutes_ago': 'Hace {n} minutos',
            'hours_ago': 'Hace {n} horas',
            'ago': 'Hace'
        },
        en: {
            'dashboard': 'Dashboard',
            'mining_control': 'Mining Control',
            'analytics': 'Analytics',
            'earnings': 'Earnings',
            'transactions': 'Transactions',
            'pool_management': 'Pool Management',
            'referrals': 'Referrals',
            'events': 'Events',
            'settings': 'Settings',
            'api': 'API & Integrations',
            'support': 'Support',
            'back_to_home': 'Back to Home',
            'search': 'Search... (Ctrl+K)',
            'connected': 'Connected',
            'notifications': 'Notifications',
            'profile_settings': 'Profile Settings',
            'api_keys': 'API Keys',
            'logout': 'Logout',
            'loading': 'Loading...',
            'error': 'Error',
            'success': 'Success',
            'cancel': 'Cancel',
            'save': 'Save',
            'delete': 'Delete',
            'edit': 'Edit',
            'close': 'Close',
            'active_events': 'Active Events',
            'upcoming_events': 'Upcoming Events',
            'past_events': 'Past Events',
            'activate_event': 'Activate Event',
            'coming_soon': 'Coming Soon',
            'event_ended': 'Event Ended',
            'no_active_events': 'No active events at the moment',
            'no_upcoming_events': 'No upcoming events',
            'no_past_events': 'No past events',
            'level': 'Level',
            'energy': 'Energy',
            'items': 'Items',
            'earned': 'Earned',
            'streak': 'Streak',
            'active_powerups': 'Active Power-ups',
            'no_powerups': 'No active power-ups',
            'daily_missions': 'Daily Missions',
            'statistics': 'Statistics',
            'back_to_events': 'Back to Events',
            
            // Dashboard
            'dashboard_subtitle': 'Overview of your mining activity',
            'start_mining': 'Start Mining',
            'current_hashrate': 'Current Hashrate',
            'average': 'Average',
            'total_balance': 'Total Balance',
            'available': 'Available',
            'today_earnings': 'Today\'s Earnings',
            'today': 'Today',
            'active_time': 'Active Time',
            'current_session': 'Current Session',
            'active': 'Active',
            'hashrate_performance': 'Hashrate Performance',
            'earnings_chart': 'Earnings',
            'recent_activity': 'Recent Activity',
            'no_activity': 'No recent activity',
            'view_all': 'View All',
            'mining_status': 'Mining Status',
            'stopped': 'Stopped',
            'running': 'Running',
            'paused': 'Paused',
            'quick_actions': 'Quick Actions',
            'mining_control_btn': 'Mining Control',
            'view_analytics': 'View Analytics',
            'manage_pools': 'Manage Pools',
            'view_all_transactions': 'View All',
            'mining_started': 'Mining started',
            'reward_received': 'Reward received',
            'minutes_ago': '{n} minutes ago',
            'hours_ago': '{n} hours ago',
            'ago': 'ago'
        },
        pt: {
            'dashboard': 'Painel',
            'mining_control': 'Controle de Mineração',
            'analytics': 'Análises',
            'earnings': 'Ganhos',
            'transactions': 'Transações',
            'pool_management': 'Gerenciamento de Pool',
            'referrals': 'Indicações',
            'events': 'Eventos',
            'settings': 'Configurações',
            'api': 'API e Integrações',
            'support': 'Suporte',
            'back_to_home': 'Voltar ao Início',
            'search': 'Pesquisar... (Ctrl+K)',
            'connected': 'Conectado',
            'notifications': 'Notificações',
            'profile_settings': 'Configurações do Perfil',
            'api_keys': 'Chaves API',
            'logout': 'Sair',
            'loading': 'Carregando...',
            'error': 'Erro',
            'success': 'Sucesso',
            'cancel': 'Cancelar',
            'save': 'Salvar',
            'delete': 'Excluir',
            'edit': 'Editar',
            'close': 'Fechar',
            'active_events': 'Eventos Ativos',
            'upcoming_events': 'Próximos Eventos',
            'past_events': 'Eventos Passados',
            'activate_event': 'Ativar Evento',
            'coming_soon': 'Em Breve',
            'event_ended': 'Evento Encerrado',
            'no_active_events': 'Nenhum evento ativo no momento',
            'no_upcoming_events': 'Nenhum evento próximo',
            'no_past_events': 'Nenhum evento passado',
            'level': 'Nível',
            'energy': 'Energia',
            'items': 'Itens',
            'earned': 'Ganho',
            'streak': 'Sequência',
            'active_powerups': 'Power-ups Ativos',
            'no_powerups': 'Nenhum power-up ativo',
            'daily_missions': 'Missões Diárias',
            'statistics': 'Estatísticas',
            'back_to_events': 'Voltar aos Eventos',
            
            // Dashboard
            'dashboard_subtitle': 'Visão geral da sua atividade de mineração',
            'start_mining': 'Iniciar Mineração',
            'current_hashrate': 'Hashrate Atual',
            'average': 'Média',
            'total_balance': 'Saldo Total',
            'available': 'Disponível',
            'today_earnings': 'Ganhos Hoje',
            'today': 'Hoje',
            'active_time': 'Tempo Ativo',
            'current_session': 'Sessão atual',
            'active': 'Ativo',
            'hashrate_performance': 'Desempenho do Hashrate',
            'earnings_chart': 'Ganhos',
            'recent_activity': 'Atividade Recente',
            'no_activity': 'Não há atividade recente',
            'view_all': 'Ver Tudo',
            'mining_status': 'Status da Mineração',
            'stopped': 'Parado',
            'running': 'Em Execução',
            'paused': 'Pausado',
            'quick_actions': 'Ações Rápidas',
            'mining_control_btn': 'Controle de Mineração',
            'view_analytics': 'Ver Análises',
            'manage_pools': 'Gerenciar Pools',
            'view_all_transactions': 'Ver Todas',
            'mining_started': 'Mineração iniciada',
            'reward_received': 'Recompensa recebida',
            'minutes_ago': 'Há {n} minutos',
            'hours_ago': 'Há {n} horas',
            'ago': 'atrás'
        },
        fr: {
            'dashboard': 'Tableau de bord',
            'mining_control': 'Contrôle du minage',
            'analytics': 'Analyses',
            'earnings': 'Gains',
            'transactions': 'Transactions',
            'pool_management': 'Gestion du pool',
            'referrals': 'Parrainage',
            'events': 'Événements',
            'settings': 'Paramètres',
            'api': 'API et intégrations',
            'support': 'Support',
            'back_to_home': 'Retour à l\'accueil',
            'search': 'Rechercher... (Ctrl+K)',
            'connected': 'Connecté',
            'notifications': 'Notifications',
            'profile_settings': 'Paramètres du profil',
            'api_keys': 'Clés API',
            'logout': 'Déconnexion',
            'loading': 'Chargement...',
            'error': 'Erreur',
            'success': 'Succès',
            'cancel': 'Annuler',
            'save': 'Enregistrer',
            'delete': 'Supprimer',
            'edit': 'Modifier',
            'close': 'Fermer',
            'active_events': 'Événements actifs',
            'upcoming_events': 'Événements à venir',
            'past_events': 'Événements passés',
            'activate_event': 'Activer l\'événement',
            'coming_soon': 'Bientôt disponible',
            'event_ended': 'Événement terminé',
            'no_active_events': 'Aucun événement actif pour le moment',
            'no_upcoming_events': 'Aucun événement à venir',
            'no_past_events': 'Aucun événement passé',
            'level': 'Niveau',
            'energy': 'Énergie',
            'items': 'Objets',
            'earned': 'Gagné',
            'streak': 'Série',
            'active_powerups': 'Power-ups actifs',
            'no_powerups': 'Aucun power-up actif',
            'daily_missions': 'Missions quotidiennes',
            'statistics': 'Statistiques',
            'back_to_events': 'Retour aux événements',
            
            // Dashboard
            'dashboard_subtitle': 'Vue d\'ensemble de votre activité de minage',
            'start_mining': 'Démarrer le minage',
            'current_hashrate': 'Hashrate actuel',
            'average': 'Moyenne',
            'total_balance': 'Solde total',
            'available': 'Disponible',
            'today_earnings': 'Gains d\'aujourd\'hui',
            'today': 'Aujourd\'hui',
            'active_time': 'Temps actif',
            'current_session': 'Session actuelle',
            'active': 'Actif',
            'hashrate_performance': 'Performance du hashrate',
            'earnings_chart': 'Gains',
            'recent_activity': 'Activité récente',
            'no_activity': 'Aucune activité récente',
            'view_all': 'Voir tout',
            'mining_status': 'État du minage',
            'stopped': 'Arrêté',
            'running': 'En cours',
            'paused': 'En pause',
            'quick_actions': 'Actions rapides',
            'mining_control_btn': 'Contrôle du minage',
            'view_analytics': 'Voir les analyses',
            'manage_pools': 'Gérer les pools',
            'view_all_transactions': 'Voir tout',
            'mining_started': 'Minage démarré',
            'reward_received': 'Récompense reçue',
            'minutes_ago': 'Il y a {n} minutes',
            'hours_ago': 'Il y a {n} heures',
            'ago': 'il y a'
        },
        de: {
            'dashboard': 'Dashboard',
            'mining_control': 'Mining-Steuerung',
            'analytics': 'Analysen',
            'earnings': 'Einnahmen',
            'transactions': 'Transaktionen',
            'pool_management': 'Pool-Verwaltung',
            'referrals': 'Empfehlungen',
            'events': 'Ereignisse',
            'settings': 'Einstellungen',
            'api': 'API & Integrationen',
            'support': 'Support',
            'back_to_home': 'Zurück zur Startseite',
            'search': 'Suchen... (Strg+K)',
            'connected': 'Verbunden',
            'notifications': 'Benachrichtigungen',
            'profile_settings': 'Profileinstellungen',
            'api_keys': 'API-Schlüssel',
            'logout': 'Abmelden',
            'loading': 'Laden...',
            'error': 'Fehler',
            'success': 'Erfolg',
            'cancel': 'Abbrechen',
            'save': 'Speichern',
            'delete': 'Löschen',
            'edit': 'Bearbeiten',
            'close': 'Schließen',
            'active_events': 'Aktive Ereignisse',
            'upcoming_events': 'Bevorstehende Ereignisse',
            'past_events': 'Vergangene Ereignisse',
            'activate_event': 'Ereignis aktivieren',
            'coming_soon': 'Demnächst',
            'event_ended': 'Ereignis beendet',
            'no_active_events': 'Derzeit keine aktiven Ereignisse',
            'no_upcoming_events': 'Keine bevorstehenden Ereignisse',
            'no_past_events': 'Keine vergangenen Ereignisse',
            'level': 'Stufe',
            'energy': 'Energie',
            'items': 'Gegenstände',
            'earned': 'Verdient',
            'streak': 'Serie',
            'active_powerups': 'Aktive Power-ups',
            'no_powerups': 'Keine aktiven Power-ups',
            'daily_missions': 'Tägliche Missionen',
            'statistics': 'Statistiken',
            'back_to_events': 'Zurück zu Ereignissen',
            
            // Dashboard
            'dashboard_subtitle': 'Übersicht Ihrer Mining-Aktivität',
            'start_mining': 'Mining starten',
            'current_hashrate': 'Aktuelle Hashrate',
            'average': 'Durchschnitt',
            'total_balance': 'Gesamtguthaben',
            'available': 'Verfügbar',
            'today_earnings': 'Heutige Einnahmen',
            'today': 'Heute',
            'active_time': 'Aktive Zeit',
            'current_session': 'Aktuelle Sitzung',
            'active': 'Aktiv',
            'hashrate_performance': 'Hashrate-Leistung',
            'earnings_chart': 'Einnahmen',
            'recent_activity': 'Letzte Aktivität',
            'no_activity': 'Keine aktuelle Aktivität',
            'view_all': 'Alle anzeigen',
            'mining_status': 'Mining-Status',
            'stopped': 'Gestoppt',
            'running': 'Läuft',
            'paused': 'Pausiert',
            'quick_actions': 'Schnellaktionen',
            'mining_control_btn': 'Mining-Steuerung',
            'view_analytics': 'Analysen anzeigen',
            'manage_pools': 'Pools verwalten',
            'view_all_transactions': 'Alle anzeigen',
            'mining_started': 'Mining gestartet',
            'reward_received': 'Belohnung erhalten',
            'minutes_ago': 'vor {n} Minuten',
            'hours_ago': 'vor {n} Stunden',
            'ago': 'vor'
        },
        it: {
            'dashboard': 'Dashboard',
            'mining_control': 'Controllo Mining',
            'analytics': 'Analisi',
            'earnings': 'Guadagni',
            'transactions': 'Transazioni',
            'pool_management': 'Gestione Pool',
            'referrals': 'Referral',
            'events': 'Eventi',
            'settings': 'Impostazioni',
            'api': 'API e Integrazioni',
            'support': 'Supporto',
            'back_to_home': 'Torna alla Home',
            'search': 'Cerca... (Ctrl+K)',
            'connected': 'Connesso',
            'notifications': 'Notifiche',
            'profile_settings': 'Impostazioni Profilo',
            'api_keys': 'Chiavi API',
            'logout': 'Esci',
            'loading': 'Caricamento...',
            'error': 'Errore',
            'success': 'Successo',
            'cancel': 'Annulla',
            'save': 'Salva',
            'delete': 'Elimina',
            'edit': 'Modifica',
            'close': 'Chiudi',
            'active_events': 'Eventi Attivi',
            'upcoming_events': 'Prossimi Eventi',
            'past_events': 'Eventi Passati',
            'activate_event': 'Attiva Evento',
            'coming_soon': 'Prossimamente',
            'event_ended': 'Evento Terminato',
            'no_active_events': 'Nessun evento attivo al momento',
            'no_upcoming_events': 'Nessun evento imminente',
            'no_past_events': 'Nessun evento passato',
            'level': 'Livello',
            'energy': 'Energia',
            'items': 'Oggetti',
            'earned': 'Guadagnato',
            'streak': 'Serie',
            'active_powerups': 'Power-up Attivi',
            'no_powerups': 'Nessun power-up attivo',
            'daily_missions': 'Missioni Giornaliere',
            'statistics': 'Statistiche',
            'back_to_events': 'Torna agli Eventi',
            
            // Dashboard
            'dashboard_subtitle': 'Panoramica della tua attività di mining',
            'start_mining': 'Avvia Mining',
            'current_hashrate': 'Hashrate Attuale',
            'average': 'Media',
            'total_balance': 'Saldo Totale',
            'available': 'Disponibile',
            'today_earnings': 'Guadagni di Oggi',
            'today': 'Oggi',
            'active_time': 'Tempo Attivo',
            'current_session': 'Sessione corrente',
            'active': 'Attivo',
            'hashrate_performance': 'Prestazioni Hashrate',
            'earnings_chart': 'Guadagni',
            'recent_activity': 'Attività Recente',
            'no_activity': 'Nessuna attività recente',
            'view_all': 'Vedi Tutto',
            'mining_status': 'Stato Mining',
            'stopped': 'Fermato',
            'running': 'In Esecuzione',
            'paused': 'In Pausa',
            'quick_actions': 'Azioni Rapide',
            'mining_control_btn': 'Controllo Mining',
            'view_analytics': 'Vedi Analisi',
            'manage_pools': 'Gestisci Pool',
            'view_all_transactions': 'Vedi Tutto',
            'mining_started': 'Mining avviato',
            'reward_received': 'Ricompensa ricevuta',
            'minutes_ago': '{n} minuti fa',
            'hours_ago': '{n} ore fa',
            'ago': 'fa'
        },
        zh: {
            'dashboard': '仪表板',
            'mining_control': '挖矿控制',
            'analytics': '分析',
            'earnings': '收益',
            'transactions': '交易',
            'pool_management': '矿池管理',
            'referrals': '推荐',
            'events': '活动',
            'settings': '设置',
            'api': 'API 和集成',
            'support': '支持',
            'back_to_home': '返回首页',
            'search': '搜索... (Ctrl+K)',
            'connected': '已连接',
            'notifications': '通知',
            'profile_settings': '个人资料设置',
            'api_keys': 'API 密钥',
            'logout': '登出',
            'loading': '加载中...',
            'error': '错误',
            'success': '成功',
            'cancel': '取消',
            'save': '保存',
            'delete': '删除',
            'edit': '编辑',
            'close': '关闭',
            'active_events': '进行中的活动',
            'upcoming_events': '即将举行的活动',
            'past_events': '过去的活动',
            'activate_event': '激活活动',
            'coming_soon': '即将推出',
            'event_ended': '活动已结束',
            'no_active_events': '目前没有进行中的活动',
            'no_upcoming_events': '没有即将举行的活动',
            'no_past_events': '没有过去的活动',
            'level': '等级',
            'energy': '能量',
            'items': '物品',
            'earned': '已获得',
            'streak': '连胜',
            'active_powerups': '激活的能量提升',
            'no_powerups': '没有激活的能量提升',
            'daily_missions': '每日任务',
            'statistics': '统计',
            'back_to_events': '返回活动',
            
            // Dashboard
            'dashboard_subtitle': '您的挖矿活动概览',
            'start_mining': '开始挖矿',
            'current_hashrate': '当前算力',
            'average': '平均',
            'total_balance': '总余额',
            'available': '可用',
            'today_earnings': '今日收益',
            'today': '今天',
            'active_time': '活跃时间',
            'current_session': '当前会话',
            'active': '活跃',
            'hashrate_performance': '算力表现',
            'earnings_chart': '收益',
            'recent_activity': '最近活动',
            'no_activity': '没有最近活动',
            'view_all': '查看全部',
            'mining_status': '挖矿状态',
            'stopped': '已停止',
            'running': '运行中',
            'paused': '已暂停',
            'quick_actions': '快速操作',
            'mining_control_btn': '挖矿控制',
            'view_analytics': '查看分析',
            'manage_pools': '管理矿池',
            'view_all_transactions': '查看全部',
            'mining_started': '挖矿已开始',
            'reward_received': '收到奖励',
            'minutes_ago': '{n} 分钟前',
            'hours_ago': '{n} 小时前',
            'ago': '前'
        },
        ja: {
            'dashboard': 'ダッシュボード',
            'mining_control': 'マイニング制御',
            'analytics': '分析',
            'earnings': '収益',
            'transactions': '取引',
            'pool_management': 'プール管理',
            'referrals': '紹介',
            'events': 'イベント',
            'settings': '設定',
            'api': 'API と統合',
            'support': 'サポート',
            'back_to_home': 'ホームに戻る',
            'search': '検索... (Ctrl+K)',
            'connected': '接続済み',
            'notifications': '通知',
            'profile_settings': 'プロフィール設定',
            'api_keys': 'API キー',
            'logout': 'ログアウト',
            'loading': '読み込み中...',
            'error': 'エラー',
            'success': '成功',
            'cancel': 'キャンセル',
            'save': '保存',
            'delete': '削除',
            'edit': '編集',
            'close': '閉じる',
            'active_events': 'アクティブなイベント',
            'upcoming_events': '今後のイベント',
            'past_events': '過去のイベント',
            'activate_event': 'イベントを有効化',
            'coming_soon': '近日公開',
            'event_ended': 'イベント終了',
            'no_active_events': '現在アクティブなイベントはありません',
            'no_upcoming_events': '今後のイベントはありません',
            'no_past_events': '過去のイベントはありません',
            'level': 'レベル',
            'energy': 'エネルギー',
            'items': 'アイテム',
            'earned': '獲得',
            'streak': '連勝',
            'active_powerups': 'アクティブなパワーアップ',
            'no_powerups': 'アクティブなパワーアップなし',
            'daily_missions': 'デイリーミッション',
            'statistics': '統計',
            'back_to_events': 'イベントに戻る',
            
            // Dashboard
            'dashboard_subtitle': 'マイニング活動の概要',
            'start_mining': 'マイニング開始',
            'current_hashrate': '現在のハッシュレート',
            'average': '平均',
            'total_balance': '総残高',
            'available': '利用可能',
            'today_earnings': '今日の収益',
            'today': '今日',
            'active_time': 'アクティブ時間',
            'current_session': '現在のセッション',
            'active': 'アクティブ',
            'hashrate_performance': 'ハッシュレートパフォーマンス',
            'earnings_chart': '収益',
            'recent_activity': '最近の活動',
            'no_activity': '最近の活動なし',
            'view_all': 'すべて表示',
            'mining_status': 'マイニングステータス',
            'stopped': '停止',
            'running': '実行中',
            'paused': '一時停止',
            'quick_actions': 'クイックアクション',
            'mining_control_btn': 'マイニング制御',
            'view_analytics': '分析を表示',
            'manage_pools': 'プールを管理',
            'view_all_transactions': 'すべて表示',
            'mining_started': 'マイニング開始',
            'reward_received': '報酬を受信',
            'minutes_ago': '{n} 分前',
            'hours_ago': '{n} 時間前',
            'ago': '前'
        },
        ru: {
            'dashboard': 'Панель управления',
            'mining_control': 'Управление майнингом',
            'analytics': 'Аналитика',
            'earnings': 'Заработок',
            'transactions': 'Транзакции',
            'pool_management': 'Управление пулом',
            'referrals': 'Рефералы',
            'events': 'События',
            'settings': 'Настройки',
            'api': 'API и интеграции',
            'support': 'Поддержка',
            'back_to_home': 'Вернуться на главную',
            'search': 'Поиск... (Ctrl+K)',
            'connected': 'Подключено',
            'notifications': 'Уведомления',
            'profile_settings': 'Настройки профиля',
            'api_keys': 'API ключи',
            'logout': 'Выйти',
            'loading': 'Загрузка...',
            'error': 'Ошибка',
            'success': 'Успех',
            'cancel': 'Отмена',
            'save': 'Сохранить',
            'delete': 'Удалить',
            'edit': 'Редактировать',
            'close': 'Закрыть',
            'active_events': 'Активные события',
            'upcoming_events': 'Предстоящие события',
            'past_events': 'Прошедшие события',
            'activate_event': 'Активировать событие',
            'coming_soon': 'Скоро',
            'event_ended': 'Событие завершено',
            'no_active_events': 'В данный момент нет активных событий',
            'no_upcoming_events': 'Нет предстоящих событий',
            'no_past_events': 'Нет прошедших событий',
            'level': 'Уровень',
            'energy': 'Энергия',
            'items': 'Предметы',
            'earned': 'Заработано',
            'streak': 'Серия',
            'active_powerups': 'Активные усиления',
            'no_powerups': 'Нет активных усилений',
            'daily_missions': 'Ежедневные миссии',
            'statistics': 'Статистика',
            'back_to_events': 'Вернуться к событиям',
            
            // Dashboard
            'dashboard_subtitle': 'Обзор вашей майнинг-активности',
            'start_mining': 'Начать майнинг',
            'current_hashrate': 'Текущий хешрейт',
            'average': 'Средний',
            'total_balance': 'Общий баланс',
            'available': 'Доступно',
            'today_earnings': 'Заработок сегодня',
            'today': 'Сегодня',
            'active_time': 'Активное время',
            'current_session': 'Текущая сессия',
            'active': 'Активен',
            'hashrate_performance': 'Производительность хешрейта',
            'earnings_chart': 'Заработок',
            'recent_activity': 'Недавняя активность',
            'no_activity': 'Нет недавней активности',
            'view_all': 'Посмотреть все',
            'mining_status': 'Статус майнинга',
            'stopped': 'Остановлен',
            'running': 'Работает',
            'paused': 'Приостановлен',
            'quick_actions': 'Быстрые действия',
            'mining_control_btn': 'Управление майнингом',
            'view_analytics': 'Просмотр аналитики',
            'manage_pools': 'Управление пулами',
            'view_all_transactions': 'Показать все',
            'mining_started': 'Майнинг запущен',
            'reward_received': 'Награда получена',
            'minutes_ago': '{n} минут назад',
            'hours_ago': '{n} часов назад',
            'ago': 'назад'
        },
        ar: {
            'dashboard': 'لوحة التحكم',
            'mining_control': 'التحكم في التعدين',
            'analytics': 'التحليلات',
            'earnings': 'الأرباح',
            'transactions': 'المعاملات',
            'pool_management': 'إدارة المجمع',
            'referrals': 'الإحالات',
            'events': 'الأحداث',
            'settings': 'الإعدادات',
            'api': 'واجهة برمجة التطبيقات والتكامل',
            'support': 'الدعم',
            'back_to_home': 'العودة إلى الصفحة الرئيسية',
            'search': 'بحث... (Ctrl+K)',
            'connected': 'متصل',
            'notifications': 'الإشعارات',
            'profile_settings': 'إعدادات الملف الشخصي',
            'api_keys': 'مفاتيح API',
            'logout': 'تسجيل الخروج',
            'loading': 'جاري التحميل...',
            'error': 'خطأ',
            'success': 'نجاح',
            'cancel': 'إلغاء',
            'save': 'حفظ',
            'delete': 'حذف',
            'edit': 'تعديل',
            'close': 'إغلاق',
            'active_events': 'الأحداث النشطة',
            'upcoming_events': 'الأحداث القادمة',
            'past_events': 'الأحداث السابقة',
            'activate_event': 'تفعيل الحدث',
            'coming_soon': 'قريباً',
            'event_ended': 'انتهى الحدث',
            'no_active_events': 'لا توجد أحداث نشطة في الوقت الحالي',
            'no_upcoming_events': 'لا توجد أحداث قادمة',
            'no_past_events': 'لا توجد أحداث سابقة',
            'level': 'المستوى',
            'energy': 'الطاقة',
            'items': 'العناصر',
            'earned': 'المكسب',
            'streak': 'السلسلة',
            'active_powerups': 'تعزيزات نشطة',
            'no_powerups': 'لا توجد تعزيزات نشطة',
            'daily_missions': 'المهام اليومية',
            'statistics': 'الإحصائيات',
            'back_to_events': 'العودة إلى الأحداث',
            
            // Dashboard
            'dashboard_subtitle': 'نظرة عامة على نشاط التعدين الخاص بك',
            'start_mining': 'بدء التعدين',
            'current_hashrate': 'معدل الهاش الحالي',
            'average': 'المتوسط',
            'total_balance': 'الرصيد الإجمالي',
            'available': 'متاح',
            'today_earnings': 'أرباح اليوم',
            'today': 'اليوم',
            'active_time': 'الوقت النشط',
            'current_session': 'الجلسة الحالية',
            'active': 'نشط',
            'hashrate_performance': 'أداء معدل الهاش',
            'earnings_chart': 'الأرباح',
            'recent_activity': 'النشاط الأخير',
            'no_activity': 'لا يوجد نشاط حديث',
            'view_all': 'عرض الكل',
            'mining_status': 'حالة التعدين',
            'stopped': 'متوقف',
            'running': 'قيد التشغيل',
            'paused': 'متوقف مؤقتاً',
            'quick_actions': 'إجراءات سريعة',
            'mining_control_btn': 'التحكم في التعدين',
            'view_analytics': 'عرض التحليلات',
            'manage_pools': 'إدارة المجمعات',
            'view_all_transactions': 'عرض الكل',
            'mining_started': 'تم بدء التعدين',
            'reward_received': 'تم استلام المكافأة',
            'minutes_ago': 'منذ {n} دقائق',
            'hours_ago': 'منذ {n} ساعات',
            'ago': 'منذ'
        }
    };
    
    // Idioma actual
    let currentLanguage = 'en';
    
    // Obtener idioma guardado o detectar del navegador
    function getStoredLanguage() {
        const stored = localStorage.getItem('rsc_language');
        if (stored && availableLanguages[stored]) {
            return stored;
        }
        
        // Detectar idioma del navegador
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];
        
        if (availableLanguages[langCode]) {
            return langCode;
        }
        
        return 'es'; // Default
    }
    
    // Inicializar idioma
    function initLanguage() {
        currentLanguage = getStoredLanguage();
        applyLanguage(currentLanguage);
        updateLanguageSelector();
    }
    
    // Mapeo de texto común a claves de traducción (para traducción automática)
    const commonTextMap = {
        'Dashboard': 'dashboard',
        'Mining Control': 'mining_control',
        'Analytics': 'analytics',
        'Earnings': 'earnings',
        'Transactions': 'transactions',
        'Pool Management': 'pool_management',
        'Referrals': 'referrals',
        'Events': 'events',
        'Settings': 'settings',
        'API & Integrations': 'api',
        'Support': 'support',
        'Back to Home': 'back_to_home',
        'Profile Settings': 'profile_settings',
        'API Keys': 'api_keys',
        'Logout': 'logout',
        'Connected': 'connected',
        'Search... (Ctrl+K)': 'search'
    };
    
    // Traducir elementos comunes automáticamente
    function translateCommonElements(langCode) {
        let count = 0;
        
        // Traducir elementos del sidebar
        document.querySelectorAll('.nav-link span, .sidebar-home-link span').forEach(element => {
            const text = element.textContent.trim();
            if (commonTextMap[text]) {
                const translation = translations[langCode]?.[commonTextMap[text]] || translations['es']?.[commonTextMap[text]];
                if (translation && translation !== text) {
                    element.textContent = translation;
                    count++;
                }
            }
        });
        
        // Traducir elementos del topbar
        document.querySelectorAll('.topbar-actions span, .user-menu-dropdown-content span').forEach(element => {
            const text = element.textContent.trim();
            if (commonTextMap[text]) {
                const translation = translations[langCode]?.[commonTextMap[text]] || translations['es']?.[commonTextMap[text]];
                if (translation && translation !== text) {
                    element.textContent = translation;
                    count++;
                }
            }
        });
        
        // Traducir inputs de búsqueda
        document.querySelectorAll('input[type="text"][placeholder], input[type="search"][placeholder]').forEach(input => {
            const placeholder = input.placeholder;
            if (commonTextMap[placeholder]) {
                const translation = translations[langCode]?.[commonTextMap[placeholder]] || translations['es']?.[commonTextMap[placeholder]];
                if (translation && translation !== placeholder) {
                    input.placeholder = translation;
                    count++;
                }
            }
        });
        
        // Traducir breadcrumbs
        document.querySelectorAll('.breadcrumbs a, .breadcrumb-current').forEach(element => {
            const text = element.textContent.trim();
            if (commonTextMap[text]) {
                const translation = translations[langCode]?.[commonTextMap[text]] || translations['es']?.[commonTextMap[text]];
                if (translation && translation !== text) {
                    element.textContent = translation;
                    count++;
                }
            }
        });
        
        return count;
    }
    
    // Aplicar idioma
    function applyLanguage(langCode) {
        if (!availableLanguages[langCode] || !translations[langCode]) {
            console.warn('⚠️ Language not available:', langCode);
            return;
        }
        
        console.log('🌐 Applying language:', langCode);
        
        currentLanguage = langCode;
        localStorage.setItem('rsc_language', langCode);
        
        // Actualizar atributo lang del HTML
        document.documentElement.lang = langCode;
        
        // Traducir elementos comunes automáticamente
        const commonCount = translateCommonElements(langCode);
        console.log('🔄 Auto-translated', commonCount, 'common elements');
        
        // Aplicar traducciones a elementos con data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        console.log('📋 Found', elements.length, 'elements with data-i18n');
        
        let translatedCount = 0;
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (!key) return;
            
            const translation = translations[langCode]?.[key] || translations['es']?.[key] || key;
            
            try {
                if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'search')) {
                    element.placeholder = translation;
                    translatedCount++;
                } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                    translatedCount++;
                } else if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                    // Para enlaces y botones, actualizar solo el texto, no el HTML completo
                    const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                    if (textNode) {
                        textNode.textContent = translation;
                    } else {
                        // Si no hay nodo de texto, buscar span dentro
                        const span = element.querySelector('span[data-i18n]');
                        if (!span) {
                            element.textContent = translation;
                        }
                    }
                    translatedCount++;
                } else {
                    // Para otros elementos, reemplazar todo el contenido de texto
                    // Pero preservar elementos hijos que no sean texto
                    const hasChildren = element.children.length > 0;
                    if (hasChildren) {
                        // Si tiene hijos, actualizar solo el texto directo
                        const textNodes = Array.from(element.childNodes).filter(node => 
                            node.nodeType === Node.TEXT_NODE && node.textContent.trim()
                        );
                        if (textNodes.length > 0) {
                            textNodes[0].textContent = translation;
                        } else {
                            // Buscar span o elemento hijo para actualizar
                            const childSpan = element.querySelector('span:not([data-i18n])');
                            if (childSpan && !childSpan.hasAttribute('data-i18n')) {
                                childSpan.textContent = translation;
                            } else {
                                element.textContent = translation;
                            }
                        }
                    } else {
                        element.textContent = translation;
                    }
                    translatedCount++;
                }
            } catch (error) {
                console.warn('⚠️ Error translating element:', key, error);
            }
        });
        
        // Aplicar traducciones a elementos con data-i18n-html
        const htmlElements = document.querySelectorAll('[data-i18n-html]');
        htmlElements.forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            if (!key) return;
            
            const translation = translations[langCode]?.[key] || translations['es']?.[key] || key;
            try {
                element.innerHTML = translation;
                translatedCount++;
            } catch (error) {
                console.warn('⚠️ Error translating HTML element:', key, error);
            }
        });
        
        // Disparar evento de cambio de idioma
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: langCode } 
        }));
        
        console.log('✅ Language changed to:', langCode);
        console.log('📝 Translated', translatedCount + commonCount, 'elements total');
    }
    
    // Obtener traducción
    function t(key, lang = null) {
        const langCode = lang || currentLanguage;
        return translations[langCode]?.[key] || translations['es']?.[key] || key;
    }
    
    // Cambiar idioma
    function changeLanguage(langCode) {
        console.log('🔄 Changing language to:', langCode);
        
        if (!availableLanguages[langCode]) {
            console.error('❌ Invalid language code:', langCode);
            return;
        }
        
        // Cerrar dropdown
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
        
        // Aplicar idioma
        applyLanguage(langCode);
        
        // Actualizar selector
        updateLanguageSelector();
        
        console.log('✅ Language change completed');
    }
    
    // Actualizar selector de idioma
    function updateLanguageSelector() {
        const selector = document.getElementById('languageSelector');
        const currentLang = availableLanguages[currentLanguage];
        
        if (selector) {
            const icon = selector.querySelector('.language-icon');
            if (icon) {
                icon.textContent = currentLang.flag;
            }
        }
        
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) {
            // Marcar idioma actual
            dropdown.querySelectorAll('.language-option').forEach(option => {
                if (option.dataset.lang === currentLanguage) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
        }
    }
    
    // Crear selector de idiomas
    function createLanguageSelector() {
        const topbarActions = document.querySelector('.topbar-actions');
        if (!topbarActions) {
            console.warn('Topbar actions not found');
            return;
        }
        
        // Verificar si ya existe
        if (document.getElementById('languageSelector')) {
            return;
        }
        
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        languageSelector.id = 'languageSelector';
        
        const currentLang = availableLanguages[currentLanguage];
        
        languageSelector.innerHTML = `
            <button class="language-btn" id="languageBtn" aria-label="Select Language">
                <i class="fas fa-globe language-icon">${currentLang.flag}</i>
            </button>
            <div class="language-dropdown" id="languageDropdown">
                ${Object.values(availableLanguages).map(lang => `
                    <div class="language-option ${lang.code === currentLanguage ? 'active' : ''}" 
                         data-lang="${lang.code}">
                        <span class="language-flag">${lang.flag}</span>
                        <span class="language-name">${lang.nativeName}</span>
                        <span class="language-code">${lang.code.toUpperCase()}</span>
                        ${lang.code === currentLanguage ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                `).join('')}
            </div>
        `;
        
        // Insertar antes del botón de notificaciones
        const notificationBtn = document.getElementById('notificationBtn');
        if (notificationBtn) {
            topbarActions.insertBefore(languageSelector, notificationBtn);
        } else {
            topbarActions.appendChild(languageSelector);
        }
        
        // Event listener para toggle del dropdown
        const languageBtn = document.getElementById('languageBtn');
        if (languageBtn) {
            languageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = document.getElementById('languageDropdown');
                if (dropdown) {
                    dropdown.classList.toggle('show');
                }
            });
        }
        
        // Event listeners para opciones de idioma
        const languageOptions = languageSelector.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const langCode = option.dataset.lang;
                if (langCode) {
                    changeLanguage(langCode);
                }
            });
        });
        
        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('languageDropdown');
            if (dropdown && !languageSelector.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
    
    // Agregar atributos data-i18n automáticamente a elementos comunes
    function autoAddDataI18n() {
        // Sidebar navigation
        document.querySelectorAll('.nav-link span').forEach(span => {
            const text = span.textContent.trim();
            if (commonTextMap[text] && !span.hasAttribute('data-i18n')) {
                span.setAttribute('data-i18n', commonTextMap[text]);
            }
        });
        
        // Topbar elements
        document.querySelectorAll('.topbar-actions span, .user-menu-dropdown-content span').forEach(span => {
            const text = span.textContent.trim();
            if (commonTextMap[text] && !span.hasAttribute('data-i18n')) {
                span.setAttribute('data-i18n', commonTextMap[text]);
            }
        });
        
        // Search inputs
        document.querySelectorAll('input[type="text"][placeholder], input[type="search"][placeholder]').forEach(input => {
            const placeholder = input.placeholder;
            if (commonTextMap[placeholder] && !input.hasAttribute('data-i18n')) {
                input.setAttribute('data-i18n', commonTextMap[placeholder]);
            }
        });
        
        // Breadcrumbs
        document.querySelectorAll('.breadcrumbs a, .breadcrumb-current').forEach(element => {
            const text = element.textContent.trim();
            if (commonTextMap[text] && !element.hasAttribute('data-i18n')) {
                element.setAttribute('data-i18n', commonTextMap[text]);
            }
        });
        
        // Sidebar home link
        document.querySelectorAll('.sidebar-home-link span').forEach(span => {
            const text = span.textContent.trim();
            if (commonTextMap[text] && !span.hasAttribute('data-i18n')) {
                span.setAttribute('data-i18n', commonTextMap[text]);
            }
        });
    }
    
    // Inicializar cuando el DOM esté listo
    function initializeI18n() {
        console.log('🚀 Initializing i18n system...');
        
        // Agregar atributos data-i18n automáticamente
        autoAddDataI18n();
        
        initLanguage();
        createLanguageSelector();
        
        // Re-aplicar traducciones después de un breve delay para asegurar que todos los elementos estén cargados
        setTimeout(() => {
            console.log('🔄 Re-applying translations...');
            autoAddDataI18n(); // Agregar atributos nuevamente por si hay elementos dinámicos
            applyLanguage(currentLanguage);
        }, 500);
        
        // También re-aplicar después de que otros scripts carguen
        setTimeout(() => {
            autoAddDataI18n();
            applyLanguage(currentLanguage);
        }, 1500);
        
        // Escuchar cambios en el DOM para agregar atributos a nuevos elementos
        const observer = new MutationObserver(() => {
            autoAddDataI18n();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeI18n);
    } else {
        setTimeout(initializeI18n, 100);
    }
    
    // También escuchar cambios dinámicos del DOM
    let observerInitialized = false;
    function initObserver() {
        if (observerInitialized) return;
        observerInitialized = true;
        
        const observer = new MutationObserver(() => {
            // Re-aplicar traducciones a nuevos elementos
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (!key) return;
                
                const translation = translations[currentLanguage]?.[key] || translations['es']?.[key] || key;
                
                try {
                    if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'search')) {
                        if (element.placeholder !== translation) {
                            element.placeholder = translation;
                        }
                    } else if (element.textContent.trim() && element.textContent !== translation) {
                        // Solo actualizar si el contenido es diferente
                        const currentText = element.textContent.trim();
                        if (currentText && currentText !== translation) {
                            element.textContent = translation;
                        }
                    }
                } catch (error) {
                    // Silently ignore errors
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Inicializar observer después de un delay
    setTimeout(initObserver, 1000);
    
    // Exportar API global
    window.miningI18n = {
        changeLanguage: changeLanguage,
        getLanguage: () => currentLanguage,
        t: t,
        availableLanguages: availableLanguages,
        translations: translations
    };
    
    console.log('✅ i18n system initialized');
})();

