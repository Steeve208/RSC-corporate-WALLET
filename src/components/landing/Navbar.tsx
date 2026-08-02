import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Globe, Search, ChevronDown, ArrowRight, Building2, Network, Coins, Wallet, QrCode, TrendingUp, Send, GraduationCap, CreditCard, FileText, Briefcase, Code, Book, FlaskConical, Map, Info, Shield, Briefcase as BriefcaseIcon, Newspaper, Mail, Check, Menu, X, Landmark, PenLine } from 'lucide-react';
import { useTranslation, Language } from '../../contexts/I18nContext';

const NAV_ITEM_KEYS = ['individuos', 'empresas', 'instituciones', 'desarrolladores', 'empresa'] as const;
type NavbarItemKey = (typeof NAV_ITEM_KEYS)[number];
type PromoVariant = NavbarItemKey;

const PROMO_IMAGES: Record<PromoVariant, string> = {
  individuos: '/ecosystem/wallet-v2.jpg',
  empresas: '/ecosystem/corporate.jpg',
  instituciones: '/ecosystem/reeskova-v2.jpg',
  desarrolladores: '/ecosystem/chain.jpg',
  empresa: '/ecosystem/corporate.jpg',
};

function DropdownPromoVisual({
  variant,
  kicker,
  line,
}: {
  variant: PromoVariant;
  kicker: string;
  line: string;
}) {
  return (
    <div
      className={`rsc-dropdown-promo-visual rsc-dropdown-promo-visual--${variant}`}
      style={{ backgroundImage: `url(${PROMO_IMAGES[variant]})` }}
      aria-hidden
    >
      <div className="rsc-dropdown-promo-veil" />
      <div className="rsc-dropdown-promo-caption">
        <span className="rsc-dropdown-promo-kicker">{kicker}</span>
        <span className="rsc-dropdown-promo-line">{line}</span>
      </div>
    </div>
  );
}

export function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const [activeNavKey, setActiveNavKey] = useState<NavbarItemKey>('individuos');
  const [isIndividuosOpen, setIsIndividuosOpen] = useState(false);
  const [isEmpresasOpen, setIsEmpresasOpen] = useState(false);
  const [isInstitucionesOpen, setIsInstitucionesOpen] = useState(false);
  const [isDesarrolladoresOpen, setIsDesarrolladoresOpen] = useState(false);
  const [isEmpresaOpen, setIsEmpresaOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const individuosDropdownDesktopRef = useRef<HTMLDivElement>(null);
  const individuosDropdownMobileRef = useRef<HTMLDivElement>(null);
  const empresasDropdownDesktopRef = useRef<HTMLDivElement>(null);
  const empresasDropdownMobileRef = useRef<HTMLDivElement>(null);
  const institucionesDropdownDesktopRef = useRef<HTMLDivElement>(null);
  const institucionesDropdownMobileRef = useRef<HTMLDivElement>(null);
  const desarrolladoresDropdownDesktopRef = useRef<HTMLDivElement>(null);
  const desarrolladoresDropdownMobileRef = useRef<HTMLDivElement>(null);
  const empresaDropdownDesktopRef = useRef<HTMLDivElement>(null);
  const empresaDropdownMobileRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: t('languages.en') },
    { code: 'es', name: t('languages.es') },
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
      { 
        label: t('dropdowns.empresa.items.signDocs.title'), 
        description: t('dropdowns.empresa.items.signDocs.description'),
        icon: PenLine,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('companySignDocs');
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
      {
        label: t('dropdowns.instituciones.items.realEstate.title'),
        description: t('dropdowns.instituciones.items.realEstate.description'),
        icon: Landmark,
        href: '#',
        onClick: () => {
          if ((window as any).navigateToPage) {
            (window as any).navigateToPage('institutionalRealEstate');
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

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar al clic fuera: refs separados escritorio/móvil (un solo ref apuntaba al último nodo y el mega menú de escritorio no pasaba contains()).
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideIndividuos =
        individuosDropdownDesktopRef.current?.contains(target) ||
        individuosDropdownMobileRef.current?.contains(target);
      const insideEmpresas =
        empresasDropdownDesktopRef.current?.contains(target) ||
        empresasDropdownMobileRef.current?.contains(target);
      const insideInstituciones =
        institucionesDropdownDesktopRef.current?.contains(target) ||
        institucionesDropdownMobileRef.current?.contains(target);
      const insideDesarrolladores =
        desarrolladoresDropdownDesktopRef.current?.contains(target) ||
        desarrolladoresDropdownMobileRef.current?.contains(target);
      const insideEmpresa =
        empresaDropdownDesktopRef.current?.contains(target) ||
        empresaDropdownMobileRef.current?.contains(target);

      if (isIndividuosOpen && !insideIndividuos) setIsIndividuosOpen(false);
      if (isEmpresasOpen && !insideEmpresas) setIsEmpresasOpen(false);
      if (isInstitucionesOpen && !insideInstituciones) setIsInstitucionesOpen(false);
      if (isDesarrolladoresOpen && !insideDesarrolladores) setIsDesarrolladoresOpen(false);
      if (isEmpresaOpen && !insideEmpresa) setIsEmpresaOpen(false);
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(target)) {
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

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const handleIndividuosClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsIndividuosOpen(!isIndividuosOpen);
    setIsEmpresasOpen(false);
    setIsInstitucionesOpen(false);
    setIsDesarrolladoresOpen(false);
    setIsEmpresaOpen(false);
    setIsLanguageOpen(false);
    setActiveNavKey('individuos');
  };

  const handleEmpresasClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEmpresasOpen(!isEmpresasOpen);
    setIsIndividuosOpen(false);
    setIsInstitucionesOpen(false);
    setIsDesarrolladoresOpen(false);
    setIsEmpresaOpen(false);
    setIsLanguageOpen(false);
    setActiveNavKey('empresas');
  };

  const handleInstitucionesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInstitucionesOpen(!isInstitucionesOpen);
    setIsIndividuosOpen(false);
    setIsEmpresasOpen(false);
    setIsDesarrolladoresOpen(false);
    setIsEmpresaOpen(false);
    setIsLanguageOpen(false);
    setActiveNavKey('instituciones');
  };

  const handleDesarrolladoresClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDesarrolladoresOpen(!isDesarrolladoresOpen);
    setIsIndividuosOpen(false);
    setIsEmpresasOpen(false);
    setIsInstitucionesOpen(false);
    setIsEmpresaOpen(false);
    setIsLanguageOpen(false);
    setActiveNavKey('desarrolladores');
  };

  const handleEmpresaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEmpresaOpen(!isEmpresaOpen);
    setIsIndividuosOpen(false);
    setIsEmpresasOpen(false);
    setIsInstitucionesOpen(false);
    setIsDesarrolladoresOpen(false);
    setIsLanguageOpen(false);
    setActiveNavKey('empresa');
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

  const mobileMenu = (
    <>
      {isMobileMenuOpen && (
        <div
          className="rsc-mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden
        />
      )}

      <div
        className={`rsc-mobile-menu ${isMobileMenuOpen ? 'rsc-mobile-menu--open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="rsc-mobile-menu-content">
          <div className="rsc-mobile-menu-section">
            <div className="rsc-mobile-menu-nav">
              {NAV_ITEM_KEYS.map((navKey) => {
                const item = t(`navbar.${navKey}`);
                if (navKey === 'empresas') {
                  return (
                    <div key={navKey} className="rsc-mobile-nav-item" ref={empresasDropdownMobileRef}>
                      <button
                        className={`rsc-mobile-nav-button ${isEmpresasOpen ? 'rsc-mobile-nav-button--open' : ''}`}
                        onClick={handleEmpresasClick}
                      >
                        {item}
                        <ChevronDown className="rsc-mobile-nav-chevron" size={18} />
                      </button>
                      {isEmpresasOpen && (
                        <div className="rsc-mobile-dropdown">
                          {[...empresasMenuItems.left, ...empresasMenuItems.right].map((menuItem, index) => {
                            const Icon = menuItem.icon;
                            return (
                              <a
                                key={index}
                                href={menuItem.href}
                                className="rsc-mobile-dropdown-item"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsEmpresasOpen(false);
                                  setIsMobileMenuOpen(false);
                                  if (menuItem.onClick) {
                                    menuItem.onClick();
                                  }
                                }}
                              >
                                <Icon size={20} className="rsc-mobile-dropdown-icon" />
                                <div className="rsc-mobile-dropdown-content">
                                  <span className="rsc-mobile-dropdown-title">{menuItem.label}</span>
                                  <span className="rsc-mobile-dropdown-desc">{menuItem.description}</span>
                                </div>
                                <ArrowRight size={16} />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                if (navKey === 'individuos') {
                  return (
                    <div key={navKey} className="rsc-mobile-nav-item" ref={individuosDropdownMobileRef}>
                      <button
                        className={`rsc-mobile-nav-button ${isIndividuosOpen ? 'rsc-mobile-nav-button--open' : ''}`}
                        onClick={handleIndividuosClick}
                      >
                        {item}
                        <ChevronDown className="rsc-mobile-nav-chevron" size={18} />
                      </button>
                      {isIndividuosOpen && (
                        <div className="rsc-mobile-dropdown">
                          {[...individuosMenuItems.left, ...individuosMenuItems.right].map((menuItem, index) => {
                            const Icon = menuItem.icon;
                            return (
                              <a
                                key={index}
                                href={menuItem.href}
                                className="rsc-mobile-dropdown-item"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsIndividuosOpen(false);
                                  setIsMobileMenuOpen(false);
                                  if (menuItem.onClick) {
                                    menuItem.onClick();
                                  }
                                }}
                              >
                                <Icon size={20} className="rsc-mobile-dropdown-icon" />
                                <div className="rsc-mobile-dropdown-content">
                                  <span className="rsc-mobile-dropdown-title">{menuItem.label}</span>
                                  <span className="rsc-mobile-dropdown-desc">{menuItem.description}</span>
                                </div>
                                <ArrowRight size={16} />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                if (navKey === 'desarrolladores') {
                  return (
                    <div key={navKey} className="rsc-mobile-nav-item" ref={desarrolladoresDropdownMobileRef}>
                      <button
                        className={`rsc-mobile-nav-button ${isDesarrolladoresOpen ? 'rsc-mobile-nav-button--open' : ''}`}
                        onClick={handleDesarrolladoresClick}
                      >
                        {item}
                        <ChevronDown className="rsc-mobile-nav-chevron" size={18} />
                      </button>
                      {isDesarrolladoresOpen && (
                        <div className="rsc-mobile-dropdown">
                          {[...desarrolladoresMenuItems.left, ...desarrolladoresMenuItems.right].map((menuItem, index) => {
                            const Icon = menuItem.icon;
                            return (
                              <a
                                key={index}
                                href={menuItem.href}
                                className="rsc-mobile-dropdown-item"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsDesarrolladoresOpen(false);
                                  setIsMobileMenuOpen(false);
                                  if (menuItem.onClick) {
                                    menuItem.onClick();
                                  }
                                }}
                              >
                                <Icon size={20} className="rsc-mobile-dropdown-icon" />
                                <div className="rsc-mobile-dropdown-content">
                                  <span className="rsc-mobile-dropdown-title">{menuItem.label}</span>
                                  <span className="rsc-mobile-dropdown-desc">{menuItem.description}</span>
                                </div>
                                <ArrowRight size={16} />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                if (navKey === 'instituciones') {
                  return (
                    <div key={navKey} className="rsc-mobile-nav-item" ref={institucionesDropdownMobileRef}>
                      <button
                        className={`rsc-mobile-nav-button ${isInstitucionesOpen ? 'rsc-mobile-nav-button--open' : ''}`}
                        onClick={handleInstitucionesClick}
                      >
                        {item}
                        <ChevronDown className="rsc-mobile-nav-chevron" size={18} />
                      </button>
                      {isInstitucionesOpen && (
                        <div className="rsc-mobile-dropdown">
                          {[...institucionesMenuItems.left, ...institucionesMenuItems.right].map((menuItem, index) => {
                            const Icon = menuItem.icon;
                            return (
                              <a
                                key={index}
                                href={menuItem.href}
                                className="rsc-mobile-dropdown-item"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setIsInstitucionesOpen(false);
                                  setIsMobileMenuOpen(false);
                                  if (menuItem.onClick) {
                                    menuItem.onClick();
                                  }
                                }}
                              >
                                <Icon size={20} className="rsc-mobile-dropdown-icon" />
                                <div className="rsc-mobile-dropdown-content">
                                  <span className="rsc-mobile-dropdown-title">{menuItem.label}</span>
                                  <span className="rsc-mobile-dropdown-desc">{menuItem.description}</span>
                                </div>
                                <ArrowRight size={16} />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                if (navKey === 'empresa') {
                  return (
                    <div key={navKey} className="rsc-mobile-nav-item" ref={empresaDropdownMobileRef}>
                      <button
                        className={`rsc-mobile-nav-button ${isEmpresaOpen ? 'rsc-mobile-nav-button--open' : ''}`}
                        onClick={handleEmpresaClick}
                      >
                        {item}
                        <ChevronDown className="rsc-mobile-nav-chevron" size={18} />
                      </button>
                      {isEmpresaOpen && (
                        <div className="rsc-mobile-dropdown">
                          {[...empresaMenuItems.left, ...empresaMenuItems.right].map((menuItem, index) => {
                            const Icon = menuItem.icon;
                            return (
                              <a
                                key={index}
                                href={menuItem.href}
                                className="rsc-mobile-dropdown-item"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsEmpresaOpen(false);
                                  setIsMobileMenuOpen(false);
                                  if (menuItem.onClick) {
                                    menuItem.onClick();
                                  }
                                }}
                              >
                                <Icon size={20} className="rsc-mobile-dropdown-icon" />
                                <div className="rsc-mobile-dropdown-content">
                                  <span className="rsc-mobile-dropdown-title">{menuItem.label}</span>
                                  <span className="rsc-mobile-dropdown-desc">{menuItem.description}</span>
                                </div>
                                <ArrowRight size={16} />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <button
                    key={navKey}
                    className="rsc-mobile-nav-button"
                    onClick={() => {
                      setActiveNavKey(navKey);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rsc-mobile-menu-section rsc-mobile-menu-actions">
            <div className="rsc-mobile-menu-divider"></div>

            <div className="rsc-mobile-action-item">
              <button
                className="rsc-mobile-action-button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <Globe size={20} />
                <span>Idioma / Language</span>
                <ChevronDown className={`rsc-mobile-nav-chevron ${isLanguageOpen ? 'rsc-mobile-nav-chevron--open' : ''}`} size={18} />
              </button>
              {isLanguageOpen && (
                <div className="rsc-mobile-language-menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`rsc-mobile-language-item ${language === lang.code ? 'rsc-mobile-language-item--active' : ''}`}
                      onClick={() => {
                        handleLanguageSelect(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <span>{lang.name}</span>
                      {language === lang.code && <Check size={16} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="rsc-mobile-action-button">
              <Search size={20} />
              <span>Buscar / Search</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
    <nav className={`rsc-navbar ${navScrolled ? 'rsc-navbar--scrolled' : ''} ${isMobileMenuOpen ? 'rsc-navbar--menu-open' : ''}`}>
      <div className="rsc-navbar-container">
        {/* Logo - Left */}
        <div className="rsc-navbar-logo">
          <button
            type="button"
            className="rsc-logo"
            onClick={() => {
              if ((window as any).navigateToPage) {
                (window as any).navigateToPage('landing');
              }
            }}
            aria-label="RSC Group home"
          >
            <div className="rsc-logo-dots">
              <div className="rsc-dot rsc-dot--top"></div>
              <div className="rsc-dot rsc-dot--left"></div>
              <div className="rsc-dot rsc-dot--center"></div>
              <div className="rsc-dot rsc-dot--right"></div>
              <div className="rsc-dot rsc-dot--bottom"></div>
            </div>
            <span className="rsc-logo-text">RSC GROUP</span>
          </button>
        </div>

        {/* Desktop Center Navigation */}
        <div className="rsc-navbar-center">
          {NAV_ITEM_KEYS.map((navKey) => {
            const item = t(`navbar.${navKey}`);
                if (navKey === 'empresas') {
                  return (
                <div key={navKey} className="rsc-nav-dropdown" ref={empresasDropdownDesktopRef}>
                  <button
                    className={`rsc-nav-button rsc-nav-button--dropdown ${activeNavKey === navKey ? 'rsc-nav-button--active' : ''} ${isEmpresasOpen ? 'rsc-nav-button--open' : ''}`}
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
                                setIsMobileMenuOpen(false);
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
                                setIsMobileMenuOpen(false);
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
                        <DropdownPromoVisual variant="empresas" kicker={t('dropdowns.empresas.promoKicker')} line={t('dropdowns.empresas.promoLine')} />
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
                if (navKey === 'individuos') {
                  return (
                <div key={navKey} className="rsc-nav-dropdown" ref={individuosDropdownDesktopRef}>
                  <button
                    className={`rsc-nav-button rsc-nav-button--dropdown ${activeNavKey === navKey ? 'rsc-nav-button--active' : ''} ${isIndividuosOpen ? 'rsc-nav-button--open' : ''}`}
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
                                setIsMobileMenuOpen(false);
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
                                setIsMobileMenuOpen(false);
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
                        <DropdownPromoVisual variant="individuos" kicker={t('dropdowns.individuos.promoKicker')} line={t('dropdowns.individuos.promoLine')} />
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
                if (navKey === 'desarrolladores') {
                  return (
                <div key={navKey} className="rsc-nav-dropdown" ref={desarrolladoresDropdownDesktopRef}>
                  <button
                    className={`rsc-nav-button rsc-nav-button--dropdown ${activeNavKey === navKey ? 'rsc-nav-button--active' : ''} ${isDesarrolladoresOpen ? 'rsc-nav-button--open' : ''}`}
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
                                setIsMobileMenuOpen(false);
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
                                setIsMobileMenuOpen(false);
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
                        <DropdownPromoVisual variant="desarrolladores" kicker={t('dropdowns.desarrolladores.promoKicker')} line={t('dropdowns.desarrolladores.promoLine')} />
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
            if (navKey === 'instituciones') {
              return (
                <div key={navKey} className="rsc-nav-dropdown" ref={institucionesDropdownDesktopRef}>
                  <button
                    className={`rsc-nav-button rsc-nav-button--dropdown ${activeNavKey === navKey ? 'rsc-nav-button--active' : ''} ${isInstitucionesOpen ? 'rsc-nav-button--open' : ''}`}
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
                                setIsMobileMenuOpen(false);
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
                                setIsMobileMenuOpen(false);
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
                        <DropdownPromoVisual variant="instituciones" kicker={t('dropdowns.instituciones.promoKicker')} line={t('dropdowns.instituciones.promoLine')} />
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
            if (navKey === 'empresa') {
              return (
                <div key={navKey} className="rsc-nav-dropdown" ref={empresaDropdownDesktopRef}>
                  <button
                    className={`rsc-nav-button rsc-nav-button--dropdown ${activeNavKey === navKey ? 'rsc-nav-button--active' : ''} ${isEmpresaOpen ? 'rsc-nav-button--open' : ''}`}
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
                                setIsMobileMenuOpen(false);
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
                                setIsMobileMenuOpen(false);
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
                        <DropdownPromoVisual variant="empresa" kicker={t('dropdowns.empresa.promoKicker')} line={t('dropdowns.empresa.promoLine')} />
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
                key={navKey}
                className={`rsc-nav-button ${activeNavKey === navKey ? 'rsc-nav-button--active' : ''}`}
                onClick={() => setActiveNavKey(navKey)}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Desktop Right Actions */}
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
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="rsc-mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
    {typeof document !== 'undefined' && createPortal(mobileMenu, document.body)}
    </>
  );
}
