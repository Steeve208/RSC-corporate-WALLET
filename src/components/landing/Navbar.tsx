import { useState, useRef, useEffect } from 'react';
import { Globe, Search, ChevronDown, ArrowRight, Building2, Network, Coins, Wallet, QrCode, TrendingUp, Send, GraduationCap, CreditCard, FileText, Briefcase, Code, Book, Wrench, FlaskConical, Map, Info, Shield, Briefcase as BriefcaseIcon, Newspaper, Mail, Check, Rocket } from 'lucide-react';
import { useTranslation, Language } from '../../contexts/I18nContext';

export function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const [activeNav, setActiveNav] = useState('Individuos');
  const [isIndividuosOpen, setIsIndividuosOpen] = useState(false);
  const [isEmpresasOpen, setIsEmpresasOpen] = useState(false);
  const [isInstitucionesOpen, setIsInstitucionesOpen] = useState(false);
  const [isDesarrolladoresOpen, setIsDesarrolladoresOpen] = useState(false);
  const [isEmpresaOpen, setIsEmpresaOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const individuosDropdownRef = useRef<HTMLDivElement>(null);
  const empresasDropdownRef = useRef<HTMLDivElement>(null);
  const institucionesDropdownRef = useRef<HTMLDivElement>(null);
  const desarrolladoresDropdownRef = useRef<HTMLDivElement>(null);
  const empresaDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    t('navbar.individuos'),
    t('navbar.empresas'),
    t('navbar.instituciones'),
    t('navbar.desarrolladores'),
    t('navbar.empresa')
  ];

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: t('languages.en') },
    { code: 'es', name: t('languages.es') },
    { code: 'pt', name: t('languages.pt') },
    { code: 'fr', name: t('languages.fr') },
    { code: 'de', name: t('languages.de') },
    { code: 'it', name: t('languages.it') },
    { code: 'zh', name: t('languages.zh') },
    { code: 'ja', name: t('languages.ja') },
    { code: 'ko', name: t('languages.ko') },
    { code: 'ar', name: t('languages.ar') },
  ];

  const individuosMenuItems = {
    left: [
      { 
        label: t('dropdowns.individuos.items.wallet.title'), 
        description: t('dropdowns.individuos.items.wallet.description'),
        icon: Wallet,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('wallet');
          }
        }
      },
      { 
        label: t('dropdowns.individuos.items.qrPayments.title'), 
        description: t('dropdowns.individuos.items.qrPayments.description'),
        icon: QrCode,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('payments');
          }
        }
      },
      { 
        label: t('dropdowns.individuos.items.staking.title'), 
        description: t('dropdowns.individuos.items.staking.description'),
        icon: TrendingUp,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('staking');
          }
        }
      },
    ],
    right: [
      { 
        label: t('dropdowns.individuos.items.remittances.title'), 
        description: t('dropdowns.individuos.items.remittances.description'),
        icon: Send,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('remittances');
          }
        }
      },
      { 
        label: t('dropdowns.individuos.items.education.title'), 
        description: t('dropdowns.individuos.items.education.description'),
        icon: GraduationCap,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('education');
          }
        }
      },
      { 
        label: 'Token Sale', 
        description: 'Compra wRSK con USDT en BSC',
        icon: Rocket,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('sale');
          }
        }
      },
    ]
  };

  const empresasMenuItems = {
    left: [
      { 
        label: t('dropdowns.empresas.items.businessWallet.title'), 
        description: t('dropdowns.empresas.items.businessWallet.description'),
        icon: Briefcase,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('businessWallet');
          }
        }
      },
      { 
        label: t('dropdowns.empresas.items.payments.title'), 
        description: t('dropdowns.empresas.items.payments.description'),
        icon: CreditCard,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('businessPayments');
          }
        }
      },
      { 
        label: t('dropdowns.empresas.items.api.title'), 
        description: t('dropdowns.empresas.items.api.description'),
        icon: Network,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('businessAPI');
          }
        }
      },
    ],
    right: [
      { 
        label: t('dropdowns.empresas.items.billing.title'), 
        description: t('dropdowns.empresas.items.billing.description'),
        icon: FileText,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('businessBilling');
          }
        }
      },
      { 
        label: t('dropdowns.empresas.items.useCases.title'), 
        description: t('dropdowns.empresas.items.useCases.description'),
        icon: Building2,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('businessUseCases');
          }
        }
      },
    ]
  };

  const desarrolladoresMenuItems = {
    left: [
      { 
        label: t('dropdowns.desarrolladores.items.docs.title'), 
        description: t('dropdowns.desarrolladores.items.docs.description'),
        icon: Book,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('developersDocs');
          }
        }
      },
      { 
        label: t('dropdowns.desarrolladores.items.chain.title'), 
        description: t('dropdowns.desarrolladores.items.chain.description'),
        icon: Network,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('developersChain');
          }
        }
      },
      { 
        label: t('dropdowns.desarrolladores.items.apis.title'), 
        description: t('dropdowns.desarrolladores.items.apis.description'),
        icon: Code,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('developersAPIs');
          }
        }
      },
    ],
    right: [
      { 
        label: t('dropdowns.desarrolladores.items.testnet.title'), 
        description: t('dropdowns.desarrolladores.items.testnet.description'),
        icon: FlaskConical,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('developersTestnet');
          }
        }
      },
      { 
        label: t('dropdowns.desarrolladores.items.roadmap.title'), 
        description: t('dropdowns.desarrolladores.items.roadmap.description'),
        icon: Map,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('developersRoadmap');
          }
        }
      },
    ]
  };

  const empresaMenuItems = {
    left: [
      { 
        label: t('dropdowns.empresa.items.about.title'), 
        description: t('dropdowns.empresa.items.about.description'),
        icon: Info,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('companyAbout');
          }
        }
      },
      { 
        label: t('dropdowns.empresa.items.security.title'), 
        description: t('dropdowns.empresa.items.security.description'),
        icon: Shield,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('companySecurity');
          }
        }
      },
      { 
        label: t('dropdowns.empresa.items.careers.title'), 
        description: t('dropdowns.empresa.items.careers.description'),
        icon: BriefcaseIcon,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('companyCareers');
          }
        }
      },
    ],
    right: [
      { 
        label: t('dropdowns.empresa.items.press.title'), 
        description: t('dropdowns.empresa.items.press.description'),
        icon: Newspaper,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('companyPress');
          }
        }
      },
      { 
        label: t('dropdowns.empresa.items.contact.title'), 
        description: t('dropdowns.empresa.items.contact.description'),
        icon: Mail,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('companyContact');
          }
        }
      },
    ]
  };

  const institucionesMenuItems = {
    left: [
      { 
        label: t('dropdowns.instituciones.items.p2p.title'), 
        description: t('dropdowns.instituciones.items.p2p.description'),
        icon: Network,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('institutionalP2P');
          }
        }
      },
      { 
        label: t('dropdowns.instituciones.items.corporate.title'), 
        description: t('dropdowns.instituciones.items.corporate.description'),
        icon: Building2,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('institutionalCorporate');
          }
        }
      },
    ],
    right: [
      { 
        label: t('dropdowns.instituciones.items.chain.title'), 
        description: t('dropdowns.instituciones.items.chain.description'),
        icon: Network,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('institutionalChain');
          }
        }
      },
      { 
        label: t('dropdowns.instituciones.items.token.title'), 
        description: t('dropdowns.instituciones.items.token.description'),
        icon: Coins,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('institutionalRSK');
          }
        }
      },
    ]
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (individuosDropdownRef.current && !individuosDropdownRef.current.contains(event.target as Node)) {
        setIsIndividuosOpen(false);
      }
      if (empresasDropdownRef.current && !empresasDropdownRef.current.contains(event.target as Node)) {
        setIsEmpresasOpen(false);
      }
      if (institucionesDropdownRef.current && !institucionesDropdownRef.current.contains(event.target as Node)) {
        setIsInstitucionesOpen(false);
      }
      if (desarrolladoresDropdownRef.current && !desarrolladoresDropdownRef.current.contains(event.target as Node)) {
        setIsDesarrolladoresOpen(false);
      }
      if (empresaDropdownRef.current && !empresaDropdownRef.current.contains(event.target as Node)) {
        setIsEmpresaOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    if (isIndividuosOpen || isEmpresasOpen || isInstitucionesOpen || isDesarrolladoresOpen || isEmpresaOpen || isLanguageOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isIndividuosOpen, isEmpresasOpen, isInstitucionesOpen, isDesarrolladoresOpen, isEmpresaOpen, isLanguageOpen]);

  const handleIndividuosClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsIndividuosOpen(!isIndividuosOpen);
    setIsEmpresasOpen(false);
    setIsInstitucionesOpen(false);
    setIsDesarrolladoresOpen(false);
    setIsEmpresaOpen(false);
    setIsLanguageOpen(false);
    setActiveNav(t('navbar.individuos'));
  };

  const handleEmpresasClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEmpresasOpen(!isEmpresasOpen);
    setIsIndividuosOpen(false);
    setIsInstitucionesOpen(false);
    setIsDesarrolladoresOpen(false);
    setIsEmpresaOpen(false);
    setIsLanguageOpen(false);
    setActiveNav(t('navbar.empresas'));
  };

  const handleInstitucionesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInstitucionesOpen(!isInstitucionesOpen);
    setIsIndividuosOpen(false);
    setIsEmpresasOpen(false);
    setIsDesarrolladoresOpen(false);
    setIsEmpresaOpen(false);
    setIsLanguageOpen(false);
    setActiveNav(t('navbar.instituciones'));
  };

  const handleDesarrolladoresClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDesarrolladoresOpen(!isDesarrolladoresOpen);
    setIsIndividuosOpen(false);
    setIsEmpresasOpen(false);
    setIsInstitucionesOpen(false);
    setIsEmpresaOpen(false);
    setIsLanguageOpen(false);
    setActiveNav(t('navbar.desarrolladores'));
  };

  const handleEmpresaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEmpresaOpen(!isEmpresaOpen);
    setIsIndividuosOpen(false);
    setIsEmpresasOpen(false);
    setIsInstitucionesOpen(false);
    setIsDesarrolladoresOpen(false);
    setIsLanguageOpen(false);
    setActiveNav(t('navbar.empresa'));
  };

  const handleLanguageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLanguageOpen(!isLanguageOpen);
    setIsIndividuosOpen(false);
    setIsEmpresasOpen(false);
    setIsInstitucionesOpen(false);
    setIsDesarrolladoresOpen(false);
    setIsEmpresaOpen(false);
  };

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsLanguageOpen(false);
  };

  return (
    <nav className="rsc-navbar">
      <div className="rsc-navbar-container">
        {/* Logo - Left */}
        <div className="rsc-navbar-logo">
          <div className="rsc-logo">
            <div className="rsc-logo-dots">
              <div className="rsc-dot rsc-dot--top"></div>
              <div className="rsc-dot rsc-dot--left"></div>
              <div className="rsc-dot rsc-dot--center"></div>
              <div className="rsc-dot rsc-dot--right"></div>
              <div className="rsc-dot rsc-dot--bottom"></div>
            </div>
            <span className="rsc-logo-text">RSC CHAIN</span>
          </div>
        </div>

        {/* Center Navigation */}
        <div className="rsc-navbar-center">
          {navItems.map((item) => {
            if (item === t('navbar.empresas')) {
              return (
                <div key={item} className="rsc-nav-dropdown" ref={empresasDropdownRef}>
                  <button
                    className={`rsc-nav-button rsc-nav-button--dropdown ${activeNav === item ? 'rsc-nav-button--active' : ''} ${isEmpresasOpen ? 'rsc-nav-button--open' : ''}`}
                    onClick={handleEmpresasClick}
                  >
                    {item}
                    <ChevronDown className="rsc-nav-chevron" size={14} />
                  </button>
                  <div className={`rsc-dropdown-menu rsc-dropdown-menu--institutions ${isEmpresasOpen ? 'rsc-dropdown-menu--open' : ''}`}>
                    <div className="rsc-dropdown-content">
                      {/* Left Column */}
                      <div className="rsc-dropdown-column">
                        {empresasMenuItems.left.map((menuItem, index) => {
                          const Icon = menuItem.icon;
                          return (
                            <a
                              key={index}
                              href={menuItem.href}
                              className="rsc-dropdown-card"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsEmpresasOpen(false);
                                if (menuItem.onClick) {
                                  menuItem.onClick();
                                }
                              }}
                            >
                              <div className="rsc-dropdown-card-icon">
                                <Icon size={20} />
                              </div>
                              <div className="rsc-dropdown-card-content">
                                <h4 className="rsc-dropdown-card-title">{menuItem.label}</h4>
                                <p className="rsc-dropdown-card-description">{menuItem.description}</p>
                              </div>
                              <ArrowRight className="rsc-dropdown-card-arrow" size={16} />
                            </a>
                          );
                        })}
                      </div>

                      {/* Right Column */}
                      <div className="rsc-dropdown-column">
                        {empresasMenuItems.right.map((menuItem, index) => {
                          const Icon = menuItem.icon;
                          return (
                            <a
                              key={index}
                              href={menuItem.href}
                              className="rsc-dropdown-card"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsEmpresasOpen(false);
                                if (menuItem.onClick) {
                                  menuItem.onClick();
                                }
                              }}
                            >
                              <div className="rsc-dropdown-card-icon">
                                <Icon size={20} />
                              </div>
                              <div className="rsc-dropdown-card-content">
                                <h4 className="rsc-dropdown-card-title">{menuItem.label}</h4>
                                <p className="rsc-dropdown-card-description">{menuItem.description}</p>
                              </div>
                              <ArrowRight className="rsc-dropdown-card-arrow" size={16} />
                            </a>
                          );
                        })}
                      </div>

                      {/* Promotional Block */}
                      <div className="rsc-dropdown-promo">
                        <div className="rsc-dropdown-promo-visual">
                          <div className="rsc-dropdown-promo-dots">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div key={i} className="rsc-dropdown-promo-dot"></div>
                            ))}
                          </div>
                        </div>
                        <div className="rsc-dropdown-promo-content">
                          <h3 className="rsc-dropdown-promo-title">{t('dropdowns.empresas.title')}</h3>
                          <p className="rsc-dropdown-promo-text">{t('dropdowns.empresas.subtitle')}</p>
                          <a href="#" className="rsc-dropdown-promo-link">{t('dropdowns.empresas.learnMore')}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (item === t('navbar.individuos')) {
              return (
                <div key={item} className="rsc-nav-dropdown" ref={individuosDropdownRef}>
                  <button
                    className={`rsc-nav-button rsc-nav-button--dropdown ${activeNav === item ? 'rsc-nav-button--active' : ''} ${isIndividuosOpen ? 'rsc-nav-button--open' : ''}`}
                    onClick={handleIndividuosClick}
                  >
                    {item}
                    <ChevronDown className="rsc-nav-chevron" size={14} />
                  </button>
                  <div className={`rsc-dropdown-menu rsc-dropdown-menu--institutions ${isIndividuosOpen ? 'rsc-dropdown-menu--open' : ''}`}>
                    <div className="rsc-dropdown-content">
                      {/* Left Column */}
                      <div className="rsc-dropdown-column">
                        {individuosMenuItems.left.map((menuItem, index) => {
                          const Icon = menuItem.icon;
                          return (
                            <a
                              key={index}
                              href={menuItem.href}
                              className="rsc-dropdown-card"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsIndividuosOpen(false);
                                if (menuItem.onClick) {
                                  menuItem.onClick();
                                }
                              }}
                            >
                              <div className="rsc-dropdown-card-icon">
                                <Icon size={20} />
                              </div>
                              <div className="rsc-dropdown-card-content">
                                <h4 className="rsc-dropdown-card-title">{menuItem.label}</h4>
                                <p className="rsc-dropdown-card-description">{menuItem.description}</p>
                              </div>
                              <ArrowRight className="rsc-dropdown-card-arrow" size={16} />
                            </a>
                          );
                        })}
                      </div>

                      {/* Right Column */}
                      <div className="rsc-dropdown-column">
                        {individuosMenuItems.right.map((menuItem, index) => {
                          const Icon = menuItem.icon;
                          return (
                            <a
                              key={index}
                              href={menuItem.href}
                              className="rsc-dropdown-card"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsIndividuosOpen(false);
                                if (menuItem.onClick) {
                                  menuItem.onClick();
                                }
                              }}
                            >
                              <div className="rsc-dropdown-card-icon">
                                <Icon size={20} />
                              </div>
                              <div className="rsc-dropdown-card-content">
                                <h4 className="rsc-dropdown-card-title">{menuItem.label}</h4>
                                <p className="rsc-dropdown-card-description">{menuItem.description}</p>
                              </div>
                              <ArrowRight className="rsc-dropdown-card-arrow" size={16} />
                            </a>
                          );
                        })}
                      </div>

                      {/* Promotional Block */}
                      <div className="rsc-dropdown-promo">
                        <div className="rsc-dropdown-promo-visual">
                          <div className="rsc-dropdown-promo-dots">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div key={i} className="rsc-dropdown-promo-dot"></div>
                            ))}
                          </div>
                        </div>
                        <div className="rsc-dropdown-promo-content">
                          <h3 className="rsc-dropdown-promo-title">{t('dropdowns.individuos.title')}</h3>
                          <p className="rsc-dropdown-promo-text">{t('dropdowns.individuos.subtitle')}</p>
                          <a href="#" className="rsc-dropdown-promo-link">{t('dropdowns.individuos.learnMore')}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (item === t('navbar.desarrolladores')) {
              return (
                <div key={item} className="rsc-nav-dropdown" ref={desarrolladoresDropdownRef}>
                  <button
                    className={`rsc-nav-button rsc-nav-button--dropdown ${activeNav === item ? 'rsc-nav-button--active' : ''} ${isDesarrolladoresOpen ? 'rsc-nav-button--open' : ''}`}
                    onClick={handleDesarrolladoresClick}
                  >
                    {item}
                    <ChevronDown className="rsc-nav-chevron" size={14} />
                  </button>
                  <div className={`rsc-dropdown-menu rsc-dropdown-menu--institutions ${isDesarrolladoresOpen ? 'rsc-dropdown-menu--open' : ''}`}>
                    <div className="rsc-dropdown-content">
                      {/* Left Column */}
                      <div className="rsc-dropdown-column">
                        {desarrolladoresMenuItems.left.map((menuItem, index) => {
                          const Icon = menuItem.icon;
                          return (
                            <a
                              key={index}
                              href={menuItem.href}
                              className="rsc-dropdown-card"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsDesarrolladoresOpen(false);
                                if (menuItem.onClick) {
                                  menuItem.onClick();
                                }
                              }}
                            >
                              <div className="rsc-dropdown-card-icon">
                                <Icon size={20} />
                              </div>
                              <div className="rsc-dropdown-card-content">
                                <h4 className="rsc-dropdown-card-title">{menuItem.label}</h4>
                                <p className="rsc-dropdown-card-description">{menuItem.description}</p>
                              </div>
                              <ArrowRight className="rsc-dropdown-card-arrow" size={16} />
                            </a>
                          );
                        })}
                      </div>

                      {/* Right Column */}
                      <div className="rsc-dropdown-column">
                        {desarrolladoresMenuItems.right.map((menuItem, index) => {
                          const Icon = menuItem.icon;
                          return (
                            <a
                              key={index}
                              href={menuItem.href}
                              className="rsc-dropdown-card"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsDesarrolladoresOpen(false);
                                if (menuItem.onClick) {
                                  menuItem.onClick();
                                }
                              }}
                            >
                              <div className="rsc-dropdown-card-icon">
                                <Icon size={20} />
                              </div>
                              <div className="rsc-dropdown-card-content">
                                <h4 className="rsc-dropdown-card-title">{menuItem.label}</h4>
                                <p className="rsc-dropdown-card-description">{menuItem.description}</p>
                              </div>
                              <ArrowRight className="rsc-dropdown-card-arrow" size={16} />
                            </a>
                          );
                        })}
                      </div>

                      {/* Promotional Block */}
                      <div className="rsc-dropdown-promo">
                        <div className="rsc-dropdown-promo-visual">
                          <div className="rsc-dropdown-promo-dots">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div key={i} className="rsc-dropdown-promo-dot"></div>
                            ))}
                          </div>
                        </div>
                        <div className="rsc-dropdown-promo-content">
                          <h3 className="rsc-dropdown-promo-title">{t('dropdowns.desarrolladores.title')}</h3>
                          <p className="rsc-dropdown-promo-text">{t('dropdowns.desarrolladores.subtitle')}</p>
                          <a href="#" className="rsc-dropdown-promo-link">{t('dropdowns.desarrolladores.learnMore')}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (item === t('navbar.instituciones')) {
              return (
                <div key={item} className="rsc-nav-dropdown" ref={institucionesDropdownRef}>
                  <button
                    className={`rsc-nav-button rsc-nav-button--dropdown ${activeNav === item ? 'rsc-nav-button--active' : ''} ${isInstitucionesOpen ? 'rsc-nav-button--open' : ''}`}
                    onClick={handleInstitucionesClick}
                  >
                    {item}
                    <ChevronDown className="rsc-nav-chevron" size={14} />
                  </button>
                  <div className={`rsc-dropdown-menu rsc-dropdown-menu--institutions ${isInstitucionesOpen ? 'rsc-dropdown-menu--open' : ''}`}>
                    <div className="rsc-dropdown-content">
                      {/* Left Column */}
                      <div className="rsc-dropdown-column">
                        {institucionesMenuItems.left.map((menuItem, index) => {
                          const Icon = menuItem.icon;
                          return (
                            <a
                              key={index}
                              href={menuItem.href}
                              className="rsc-dropdown-card"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsInstitucionesOpen(false);
                                if (menuItem.onClick) {
                                  menuItem.onClick();
                                }
                              }}
                            >
                              <div className="rsc-dropdown-card-icon">
                                <Icon size={20} />
                              </div>
                              <div className="rsc-dropdown-card-content">
                                <h4 className="rsc-dropdown-card-title">{menuItem.label}</h4>
                                <p className="rsc-dropdown-card-description">{menuItem.description}</p>
                              </div>
                              <ArrowRight className="rsc-dropdown-card-arrow" size={16} />
                            </a>
                          );
                        })}
                      </div>

                      {/* Right Column */}
                      <div className="rsc-dropdown-column">
                        {institucionesMenuItems.right.map((menuItem, index) => {
                          const Icon = menuItem.icon;
                          return (
                            <a
                              key={index}
                              href={menuItem.href}
                              className="rsc-dropdown-card"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsInstitucionesOpen(false);
                                if (menuItem.onClick) {
                                  menuItem.onClick();
                                }
                              }}
                            >
                              <div className="rsc-dropdown-card-icon">
                                <Icon size={20} />
                              </div>
                              <div className="rsc-dropdown-card-content">
                                <h4 className="rsc-dropdown-card-title">{menuItem.label}</h4>
                                <p className="rsc-dropdown-card-description">{menuItem.description}</p>
                              </div>
                              <ArrowRight className="rsc-dropdown-card-arrow" size={16} />
                            </a>
                          );
                        })}
                      </div>

                      {/* Promotional Block */}
                      <div className="rsc-dropdown-promo">
                        <div className="rsc-dropdown-promo-visual">
                          <div className="rsc-dropdown-promo-dots">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div key={i} className="rsc-dropdown-promo-dot"></div>
                            ))}
                          </div>
                        </div>
                        <div className="rsc-dropdown-promo-content">
                          <h3 className="rsc-dropdown-promo-title">{t('dropdowns.instituciones.title')}</h3>
                          <p className="rsc-dropdown-promo-text">{t('dropdowns.instituciones.subtitle')}</p>
                          <a href="#" className="rsc-dropdown-promo-link">{t('dropdowns.instituciones.learnMore')}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (item === t('navbar.empresa')) {
              return (
                <div key={item} className="rsc-nav-dropdown" ref={empresaDropdownRef}>
                  <button
                    className={`rsc-nav-button rsc-nav-button--dropdown ${activeNav === item ? 'rsc-nav-button--active' : ''} ${isEmpresaOpen ? 'rsc-nav-button--open' : ''}`}
                    onClick={handleEmpresaClick}
                  >
                    {item}
                    <ChevronDown className="rsc-nav-chevron" size={14} />
                  </button>
                  <div className={`rsc-dropdown-menu rsc-dropdown-menu--institutions ${isEmpresaOpen ? 'rsc-dropdown-menu--open' : ''}`}>
                    <div className="rsc-dropdown-content">
                      {/* Left Column */}
                      <div className="rsc-dropdown-column">
                        {empresaMenuItems.left.map((menuItem, index) => {
                          const Icon = menuItem.icon;
                          return (
                            <a
                              key={index}
                              href={menuItem.href}
                              className="rsc-dropdown-card"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsEmpresaOpen(false);
                                if (menuItem.onClick) {
                                  menuItem.onClick();
                                }
                              }}
                            >
                              <div className="rsc-dropdown-card-icon">
                                <Icon size={20} />
                              </div>
                              <div className="rsc-dropdown-card-content">
                                <h4 className="rsc-dropdown-card-title">{menuItem.label}</h4>
                                <p className="rsc-dropdown-card-description">{menuItem.description}</p>
                              </div>
                              <ArrowRight className="rsc-dropdown-card-arrow" size={16} />
                            </a>
                          );
                        })}
                      </div>

                      {/* Right Column */}
                      <div className="rsc-dropdown-column">
                        {empresaMenuItems.right.map((menuItem, index) => {
                          const Icon = menuItem.icon;
                          return (
                            <a
                              key={index}
                              href={menuItem.href}
                              className="rsc-dropdown-card"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsEmpresaOpen(false);
                                if (menuItem.onClick) {
                                  menuItem.onClick();
                                }
                              }}
                            >
                              <div className="rsc-dropdown-card-icon">
                                <Icon size={20} />
                              </div>
                              <div className="rsc-dropdown-card-content">
                                <h4 className="rsc-dropdown-card-title">{menuItem.label}</h4>
                                <p className="rsc-dropdown-card-description">{menuItem.description}</p>
                              </div>
                              <ArrowRight className="rsc-dropdown-card-arrow" size={16} />
                            </a>
                          );
                        })}
                      </div>

                      {/* Promotional Block */}
                      <div className="rsc-dropdown-promo">
                        <div className="rsc-dropdown-promo-visual">
                          <div className="rsc-dropdown-promo-dots">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div key={i} className="rsc-dropdown-promo-dot"></div>
                            ))}
                          </div>
                        </div>
                        <div className="rsc-dropdown-promo-content">
                          <h3 className="rsc-dropdown-promo-title">{t('dropdowns.empresa.title')}</h3>
                          <p className="rsc-dropdown-promo-text">{t('dropdowns.empresa.subtitle')}</p>
                          <a href="#" className="rsc-dropdown-promo-link">{t('dropdowns.empresa.learnMore')}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <button
                key={item}
                className={`rsc-nav-button ${activeNav === item ? 'rsc-nav-button--active' : ''}`}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="rsc-navbar-right">
          <div className="rsc-nav-dropdown" ref={languageDropdownRef}>
            <button 
              className={`rsc-icon-button ${isLanguageOpen ? 'rsc-icon-button--active' : ''}`} 
              aria-label="Language"
              onClick={handleLanguageClick}
            >
              <Globe className="rsc-icon" size={18} />
            </button>
            <div className={`rsc-dropdown-menu rsc-dropdown-menu--language ${isLanguageOpen ? 'rsc-dropdown-menu--open' : ''}`}>
              <div className="rsc-dropdown-content rsc-dropdown-content--language">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`rsc-language-item ${language === lang.code ? 'rsc-language-item--active' : ''}`}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <span className="rsc-language-name">{lang.name}</span>
                    {language === lang.code && (
                      <Check className="rsc-language-check" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button className="rsc-icon-button" aria-label="Search">
            <Search className="rsc-icon" size={18} />
          </button>
          <button className="rsc-action-button">
            {t('navbar.descargar')}
          </button>
        </div>
      </div>
    </nav>
  );
}
