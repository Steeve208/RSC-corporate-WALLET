import { useTranslation } from '../../contexts/I18nContext';
import { Wallet, ArrowUpRight, ArrowDownLeft, QrCode, Activity } from 'lucide-react';

export function HeroAnimatedVisual() {
  const { t } = useTranslation();

  return (
    <div className="rsc-hero-animated-stage" aria-hidden="true">
      <div className="rsc-hero-animated-orbit" />
      <div className="rsc-hero-animated-nodes">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="rsc-hero-animated-node"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}
      </div>

      <div className="rsc-hero-mock-browser">
        <div className="rsc-hero-mock-browser__chrome">
          <span className="rsc-hero-mock-browser__dot" />
          <span className="rsc-hero-mock-browser__dot" />
          <span className="rsc-hero-mock-browser__dot" />
        </div>
        <div className="rsc-hero-mock-browser__url">
          <span className="rsc-hero-mock-browser__lock" />
          <span className="rsc-hero-mock-browser__url-text">{t('landing.heroAnimated.urlPreview')}</span>
        </div>

        <div className="rsc-hero-mock-wallet">
          <header className="rsc-hero-mock-wallet__top">
            <div className="rsc-hero-mock-wallet__brand">
              <Activity className="rsc-hero-mock-wallet__brand-icon" size={18} strokeWidth={2.2} />
              <span>RSC</span>
            </div>
            <QrCode className="rsc-hero-mock-wallet__qr" size={20} strokeWidth={2} />
          </header>

          <nav className="rsc-hero-mock-wallet__nav" aria-hidden="true">
            <span className="rsc-hero-mock-nav-item rsc-hero-mock-nav-item--1">{t('navbar.individuos')}</span>
            <span className="rsc-hero-mock-nav-item rsc-hero-mock-nav-item--2">{t('navbar.empresas')}</span>
            <span className="rsc-hero-mock-nav-item rsc-hero-mock-nav-item--3">{t('navbar.instituciones')}</span>
          </nav>

          <div className="rsc-hero-mock-wallet__panel">
            <p className="rsc-hero-mock-wallet__label">{t('landing.heroAnimated.balanceLabel')}</p>
            <p className="rsc-hero-mock-wallet__balance">
              <span className="rsc-hero-mock-wallet__balance-num">12,458.00</span>
              <span className="rsc-hero-mock-wallet__balance-unit"> RSC</span>
            </p>
            <div className="rsc-hero-mock-wallet__actions">
              <span className="rsc-hero-mock-pill">
                <ArrowUpRight size={14} />
                {t('landing.heroAnimated.actionSend')}
              </span>
              <span className="rsc-hero-mock-pill rsc-hero-mock-pill--muted">
                <ArrowDownLeft size={14} />
                {t('landing.heroAnimated.actionReceive')}
              </span>
            </div>
          </div>

          <div className="rsc-hero-mock-wallet__footer">
            <Wallet size={16} />
            <span>{t('landing.heroAnimated.footerHint')}</span>
          </div>
        </div>
      </div>

      <div className="rsc-hero-animated-flow" />
    </div>
  );
}
