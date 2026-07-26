import { useEffect, useRef, useState } from 'react';
import '../../styles/landing.css';
import '../../styles/landing-corporate.css';
import '../../styles/landing-group.css';
import { useScrollAnimation } from './useScrollAnimation';
import { Navbar } from './Navbar';
import { useTranslation } from '../../contexts/I18nContext';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Cloud,
  Code2,
  Database,
  Fingerprint,
  Handshake,
  Landmark,
  Layers,
  Network,
  Shield,
  ShieldCheck,
  Sparkles,
  User,
  Wallet,
} from 'lucide-react';

type AppNavigatePage =
  | 'wallet'
  | 'payments'
  | 'staking'
  | 'education'
  | 'remittances'
  | 'businessWallet'
  | 'businessPayments'
  | 'businessAPI'
  | 'businessUseCases'
  | 'businessBilling'
  | 'institutionalP2P'
  | 'institutionalChain'
  | 'institutionalCorporate'
  | 'institutionalRSK'
  | 'institutionalRealEstate'
  | 'rscWeb'
  | 'developersDocs'
  | 'developersChain'
  | 'developersAPIs'
  | 'developersTestnet'
  | 'developersRoadmap'
  | 'companyAbout'
  | 'companySecurity'
  | 'companyCareers'
  | 'companyContact'
  | 'companyPress'
  | 'companySignDocs';

function navigateToPage(page: AppNavigatePage) {
  const w = window as Window & { navigateToPage?: (p: AppNavigatePage) => void };
  w.navigateToPage?.(page);
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const SOCIAL = {
  x: 'https://x.com/Reeskcap',
  discord: 'https://discord.gg/KDpJRnaBwB',
  telegram: 'https://t.me/RSCchain',
  github: 'https://github.com/rscchain',
  linkedin: 'https://www.linkedin.com/',
} as const;

const ORBIT_PRODUCTS = [
  { key: 'reeskova', page: 'institutionalRealEstate' as const, angle: -90, image: '/ecosystem/reeskova-v2.jpg', Icon: Landmark },
  { key: 'chain', page: 'institutionalChain' as const, angle: -30, image: '/ecosystem/chain.jpg', Icon: Network },
  { key: 'wallet', page: 'wallet' as const, angle: 30, image: '/ecosystem/wallet-v2.jpg', Icon: Wallet },
  { key: 'p2p', page: 'institutionalP2P' as const, angle: 90, image: '/ecosystem/p2p.jpg', Icon: Handshake },
  { key: 'escrow', page: 'institutionalP2P' as const, angle: 150, image: '/ecosystem/escrow.jpg', Icon: ShieldCheck },
  { key: 'corporate', page: 'institutionalCorporate' as const, angle: 210, image: '/ecosystem/corporate.jpg', Icon: Building2 },
] as const;

const ECOSYSTEM = [
  { key: 'reeskova', page: 'institutionalRealEstate' as const, tone: 'navy' },
  { key: 'chain', page: 'institutionalChain' as const, tone: 'surface' },
  { key: 'p2p', page: 'institutionalP2P' as const, tone: 'navy' },
  { key: 'escrow', page: 'institutionalP2P' as const, tone: 'surface' },
  { key: 'wallet', page: 'wallet' as const, tone: 'navy' },
  { key: 'corporate', page: 'institutionalCorporate' as const, tone: 'surface' },
] as const;

const TECH = [
  { key: 'blockchain', icon: Network },
  { key: 'ai', icon: Sparkles },
  { key: 'cloud', icon: Cloud },
  { key: 'security', icon: Shield },
  { key: 'analytics', icon: Database },
  { key: 'apis', icon: Code2 },
  { key: 'open', icon: Layers },
] as const;

const AUDIENCES = [
  { key: 'individuals', icon: User, page: 'wallet' as const },
  { key: 'businesses', icon: Building2, page: 'businessWallet' as const },
  { key: 'institutions', icon: Landmark, page: 'institutionalCorporate' as const },
] as const;

const TIMELINE = ['reeskova', 'wallet', 'escrow', 'p2p', 'chain', 'ai', 'global'] as const;
const VALUES = ['innovation', 'integrity', 'technology', 'trust', 'execution'] as const;
const STATS = ['products', 'integrated', 'infra', 'scalable', 'availability'] as const;

export function LandingPage() {
  const { t, language } = useTranslation();
  const [activeOrbit, setActiveOrbit] = useState<string | null>('reeskova');
  const [orbitPaused, setOrbitPaused] = useState(false);
  const orbitIdx = useRef(0);
  useScrollAnimation();

  useEffect(() => {
    if (orbitPaused) return;
    const id = window.setInterval(() => {
      orbitIdx.current = (orbitIdx.current + 1) % ORBIT_PRODUCTS.length;
      setActiveOrbit(ORBIT_PRODUCTS[orbitIdx.current].key);
    }, 3200);
    return () => window.clearInterval(id);
  }, [orbitPaused]);

  const activeProduct = ORBIT_PRODUCTS.find((p) => p.key === activeOrbit) ?? ORBIT_PRODUCTS[0];

  return (
    <div key={language} className="vaulto-landing vaulto-landing--corporate vaulto-landing--group">
      <Navbar />

      {/* Hero */}
      <section className="rg-hero" aria-labelledby="rg-hero-title">
        <div className="rg-hero__atmosphere" aria-hidden>
          <div className="rg-hero__mesh" />
          <div className="rg-hero__glow rg-hero__glow--a" />
          <div className="rg-hero__glow rg-hero__glow--b" />
          <div className="rg-hero__glow rg-hero__glow--c" />
          <div className="rg-hero__particles">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className={`rg-particle rg-particle--${(i % 8) + 1}`} />
            ))}
          </div>
        </div>

        <div className="rg-hero__inner">
          <div className="rg-hero__copy">
            <p className="rg-hero__brand">{t('landing.group.brand')}</p>
            <h1 id="rg-hero-title" className="rg-hero__title">
              {t('landing.group.heroTitle')}
            </h1>
            <p className="rg-hero__subtitle">{t('landing.group.heroSubtitle')}</p>
            <div className="rg-hero__actions">
              <button
                type="button"
                className="rg-btn rg-btn--primary"
                onClick={() => scrollToSection('ecosystem')}
              >
                {t('landing.group.ctaEcosystem')}
                <ArrowRight size={18} strokeWidth={2} aria-hidden />
              </button>
              <button
                type="button"
                className="rg-btn rg-btn--outline"
                onClick={() => scrollToSection('products')}
              >
                {t('landing.group.ctaProducts')}
              </button>
            </div>
          </div>

          <div
            className={`rg-orbit${orbitPaused ? ' is-paused' : ''}`}
            aria-label={t('landing.group.orbitAria')}
            onMouseEnter={() => setOrbitPaused(true)}
            onMouseLeave={() => setOrbitPaused(false)}
          >
            <div className="rg-orbit__depth" aria-hidden>
              <span className="rg-orbit__blob rg-orbit__blob--1" />
              <span className="rg-orbit__blob rg-orbit__blob--2" />
              <span className="rg-orbit__blob rg-orbit__blob--3" />
            </div>

            <div className="rg-orbit__stage">
              <svg className="rg-orbit__lines" viewBox="0 0 420 420" aria-hidden>
                <defs>
                  <linearGradient id="rgSpokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.05" />
                    <stop offset="50%" stopColor="#D4A017" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.05" />
                  </linearGradient>
                  <filter id="rgGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="210" cy="210" r="155" className="rg-orbit__ring rg-orbit__ring--outer" />
                <circle cx="210" cy="210" r="118" className="rg-orbit__ring" />
                <circle cx="210" cy="210" r="78" className="rg-orbit__ring rg-orbit__ring--inner" />
                {ORBIT_PRODUCTS.map((p) => {
                  const rad = ((p.angle - 90) * Math.PI) / 180;
                  const x = 210 + Math.cos(rad) * 118;
                  const y = 210 + Math.sin(rad) * 118;
                  const active = activeOrbit === p.key;
                  return (
                    <g key={p.key}>
                      <line
                        x1="210"
                        y1="210"
                        x2={x}
                        y2={y}
                        className={`rg-orbit__spoke${active ? ' is-active' : ''}`}
                      />
                      {active && (
                        <circle
                          className="rg-orbit__pulse-dot"
                          r="3.5"
                          filter="url(#rgGlow)"
                        >
                          <animateMotion
                            dur="2.4s"
                            repeatCount="indefinite"
                            path={`M210,210 L${x},${y}`}
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              <div className="rg-orbit__core" aria-hidden>
                <span className="rg-orbit__core-pulse" />
                <span className="rg-orbit__core-pulse rg-orbit__core-pulse--delay" />
                <span className="rg-orbit__core-sphere">
                  <span className="rg-orbit__core-shine" />
                  <span className="rg-orbit__core-label">{t('landing.group.brand')}</span>
                </span>
              </div>

              {ORBIT_PRODUCTS.map((p) => {
                const Icon = p.Icon;
                const active = activeOrbit === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    className={`rg-orbit__node rg-orbit__node--${p.key}${active ? ' is-active' : ''}`}
                    style={{ ['--a' as string]: `${p.angle}deg` }}
                    onMouseEnter={() => {
                      setOrbitPaused(true);
                      setActiveOrbit(p.key);
                      orbitIdx.current = ORBIT_PRODUCTS.findIndex((x) => x.key === p.key);
                    }}
                    onFocus={() => {
                      setOrbitPaused(true);
                      setActiveOrbit(p.key);
                    }}
                    onClick={() => navigateToPage(p.page)}
                    aria-pressed={active}
                  >
                    <span
                      className="rg-orbit__node-media"
                      style={{ backgroundImage: `url(${p.image})` }}
                      aria-hidden
                    />
                    <span className="rg-orbit__node-body">
                      <span className="rg-orbit__node-icon" aria-hidden>
                        <Icon size={14} strokeWidth={2.25} />
                      </span>
                      <span className="rg-orbit__node-label">{t(`landing.group.products.${p.key}.name`)}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="rg-orbit__spotlight"
              aria-live="polite"
              onClick={() => navigateToPage(activeProduct.page)}
            >
              <div
                className="rg-orbit__spotlight-media"
                style={{ backgroundImage: `url(${activeProduct.image})` }}
              />
              <div className="rg-orbit__spotlight-copy">
                <p className="rg-orbit__spotlight-kicker">{t('landing.group.brand')}</p>
                <h3>{t(`landing.group.products.${activeProduct.key}.name`)}</h3>
                <p>{t(`landing.group.products.${activeProduct.key}.blurb`)}</p>
                <span className="rg-orbit__spotlight-cta">
                  {t('landing.group.learnMore')}
                  <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden />
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="rg-manifesto animate-on-scroll" aria-labelledby="rg-manifesto-title">
        <h2 id="rg-manifesto-title" className="rg-manifesto__title">
          <span>{t('landing.group.manifestoLine1')}</span>
          <span className="rg-manifesto__accent">{t('landing.group.manifestoLine2')}</span>
        </h2>
      </section>

      {/* Ecosystem full-bleed */}
      <section id="ecosystem" className="rg-eco" aria-labelledby="rg-eco-title">
        <header className="rg-section-head rg-section-head--pad">
          <p className="rg-eyebrow">{t('landing.group.ecoEyebrow')}</p>
          <h2 id="rg-eco-title">{t('landing.group.ecoTitle')}</h2>
          <p className="rg-section-sub">{t('landing.group.ecoSubtitle')}</p>
        </header>

        <div id="products">
          {ECOSYSTEM.map((item, i) => (
            <article
              key={item.key}
              className={`rg-product rg-product--${item.tone} animate-on-scroll`}
              aria-labelledby={`rg-product-${item.key}`}
            >
              <div className="rg-product__inner">
                <div className={`rg-product__visual rg-product__visual--${item.key}`}>
                  <div className="rg-product__visual-glow" />
                  <span className="rg-product__visual-mark">
                    {t(`landing.group.products.${item.key}.name`)}
                  </span>
                </div>
                <div className="rg-product__copy">
                  <p className="rg-eyebrow">{`${String(i + 1).padStart(2, '0')} · ${t('landing.group.productLabel')}`}</p>
                  <h3 id={`rg-product-${item.key}`}>{t(`landing.group.products.${item.key}.name`)}</h3>
                  <p className="rg-product__tagline">{t(`landing.group.products.${item.key}.tagline`)}</p>
                  <p className="rg-product__desc">{t(`landing.group.products.${item.key}.description`)}</p>
                  <button
                    type="button"
                    className="rg-btn rg-btn--primary"
                    onClick={() => navigateToPage(item.page)}
                  >
                    {t('landing.group.learnMore')}
                    <ArrowUpRight size={18} strokeWidth={2} aria-hidden />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How everything connects */}
      <section id="connects" className="rg-connect animate-on-scroll" aria-labelledby="rg-connect-title">
        <header className="rg-section-head">
          <p className="rg-eyebrow">{t('landing.group.connectEyebrow')}</p>
          <h2 id="rg-connect-title">{t('landing.group.connectTitle')}</h2>
          <p className="rg-section-sub">{t('landing.group.connectSubtitle')}</p>
        </header>

        <div className="rg-diagram" role="img" aria-label={t('landing.group.connectTitle')}>
          <div className="rg-diagram__node rg-diagram__node--root">
            {t('landing.group.brand')}
          </div>
          <div className="rg-diagram__row rg-diagram__row--mid">
            <button type="button" className="rg-diagram__node" onClick={() => navigateToPage('institutionalRealEstate')}>
              {t('landing.group.products.reeskova.name')}
            </button>
            <button type="button" className="rg-diagram__node" onClick={() => navigateToPage('institutionalChain')}>
              {t('landing.group.products.chain.name')}
            </button>
            <button type="button" className="rg-diagram__node" onClick={() => navigateToPage('institutionalCorporate')}>
              {t('landing.group.products.corporate.name')}
            </button>
          </div>
          <div className="rg-diagram__row">
            <button type="button" className="rg-diagram__node" onClick={() => navigateToPage('wallet')}>
              {t('landing.group.products.wallet.name')}
            </button>
            <button type="button" className="rg-diagram__node" onClick={() => navigateToPage('institutionalP2P')}>
              {t('landing.group.products.escrow.name')}
            </button>
          </div>
          <div className="rg-diagram__row">
            <button type="button" className="rg-diagram__node rg-diagram__node--accent" onClick={() => navigateToPage('institutionalP2P')}>
              {t('landing.group.products.p2p.name')}
            </button>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="rg-tech animate-on-scroll" aria-labelledby="rg-tech-title">
        <header className="rg-section-head">
          <p className="rg-eyebrow">{t('landing.group.techEyebrow')}</p>
          <h2 id="rg-tech-title">{t('landing.group.techTitle')}</h2>
          <p className="rg-section-sub">{t('landing.group.techSubtitle')}</p>
        </header>
        <ul className="rg-tech__grid">
          {TECH.map(({ key, icon: Icon }) => (
            <li key={key} className="rg-tech__card">
              <span className="rg-tech__icon" aria-hidden>
                <Icon size={22} strokeWidth={2} />
              </span>
              <h3>{t(`landing.group.tech.${key}.title`)}</h3>
              <p>{t(`landing.group.tech.${key}.description`)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Why RSC — numbers only */}
      <section id="why" className="rg-why animate-on-scroll" aria-labelledby="rg-why-title">
        <header className="rg-section-head rg-section-head--light">
          <p className="rg-eyebrow rg-eyebrow--light">{t('landing.group.whyEyebrow')}</p>
          <h2 id="rg-why-title" className="rg-why__title">{t('landing.group.whyTitle')}</h2>
        </header>
        <div className="rg-why__grid">
          {STATS.map((key) => (
            <div key={key} className="rg-why__item">
              <span className="rg-why__value">{t(`landing.group.stats.${key}.value`)}</span>
              <span className="rg-why__label">{t(`landing.group.stats.${key}.label`)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* For everyone */}
      <section id="audiences" className="rg-audience animate-on-scroll" aria-labelledby="rg-audience-title">
        <header className="rg-section-head">
          <p className="rg-eyebrow">{t('landing.group.audienceEyebrow')}</p>
          <h2 id="rg-audience-title">{t('landing.group.audienceTitle')}</h2>
          <p className="rg-section-sub">{t('landing.group.audienceSubtitle')}</p>
        </header>
        <div className="rg-audience__grid">
          {AUDIENCES.map(({ key, icon: Icon, page }) => (
            <article key={key} className="rg-audience__card">
              <div className={`rg-audience__art rg-audience__art--${key}`} aria-hidden>
                <Icon size={36} strokeWidth={1.5} />
              </div>
              <h3>{t(`landing.group.audiences.${key}.title`)}</h3>
              <p>{t(`landing.group.audiences.${key}.description`)}</p>
              <button type="button" className="rg-btn rg-btn--outline" onClick={() => navigateToPage(page)}>
                {t(`landing.group.audiences.${key}.cta`)}
                <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="rg-timeline animate-on-scroll" aria-labelledby="rg-timeline-title">
        <header className="rg-section-head">
          <p className="rg-eyebrow">{t('landing.group.timelineEyebrow')}</p>
          <h2 id="rg-timeline-title">{t('landing.group.timelineTitle')}</h2>
          <p className="rg-section-sub">{t('landing.group.timelineSubtitle')}</p>
        </header>
        <ol className="rg-timeline__track">
          {TIMELINE.map((key, i) => (
            <li key={key} className="rg-timeline__item">
              <span className="rg-timeline__dot" aria-hidden />
              {i === 0 && <span className="rg-timeline__year">{t('landing.group.timelineYear')}</span>}
              <span className="rg-timeline__label">{t(`landing.group.timeline.${key}`)}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Leadership values */}
      <section id="leadership" className="rg-values animate-on-scroll" aria-labelledby="rg-values-title">
        <header className="rg-section-head">
          <p className="rg-eyebrow">{t('landing.group.valuesEyebrow')}</p>
          <h2 id="rg-values-title">{t('landing.group.valuesTitle')}</h2>
          <p className="rg-section-sub">{t('landing.group.valuesSubtitle')}</p>
        </header>
        <ul className="rg-values__grid">
          {VALUES.map((key) => (
            <li key={key} className="rg-values__card">
              <Fingerprint size={22} strokeWidth={2} aria-hidden />
              <h3>{t(`landing.group.values.${key}`)}</h3>
            </li>
          ))}
        </ul>
      </section>

      {/* News */}
      <section id="news" className="rg-news animate-on-scroll" aria-labelledby="rg-news-title">
        <header className="rg-section-head">
          <p className="rg-eyebrow">{t('landing.group.newsEyebrow')}</p>
          <h2 id="rg-news-title">{t('landing.group.newsTitle')}</h2>
        </header>
        <div className="rg-news__grid">
          {[1, 2, 3].map((n) => (
            <article key={n} className="rg-news__card">
              <p className="rg-news__meta">{t(`landing.group.news.n${n}.meta`)}</p>
              <h3>{t(`landing.group.news.n${n}.title`)}</h3>
              <p>{t(`landing.group.news.n${n}.excerpt`)}</p>
              <button type="button" className="rg-link" onClick={() => navigateToPage('companyPress')}>
                {t('landing.group.newsRead')}
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rg-cta" aria-labelledby="rg-cta-title">
        <div className="rg-cta__inner">
          <h2 id="rg-cta-title">{t('landing.group.ctaTitle')}</h2>
          <p>{t('landing.group.ctaSubtitle')}</p>
          <button
            type="button"
            className="rg-btn rg-btn--gold"
            onClick={() => scrollToSection('ecosystem')}
          >
            {t('landing.group.ctaFinal')}
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="rg-footer">
        <div className="rg-footer__inner">
          <div className="rg-footer__brand">
            <span className="rg-footer__logo">{t('landing.group.brand')}</span>
            <p>{t('landing.group.footerTagline')}</p>
            <div className="rg-footer__social">
              <a href={SOCIAL.discord} target="_blank" rel="noopener noreferrer">Discord</a>
              <a href={SOCIAL.x} target="_blank" rel="noopener noreferrer">X</a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>

          <div className="rg-footer__col">
            <h4>{t('landing.group.footer.products')}</h4>
            <button type="button" onClick={() => navigateToPage('institutionalRealEstate')}>{t('landing.group.products.reeskova.name')}</button>
            <button type="button" onClick={() => navigateToPage('wallet')}>{t('landing.group.products.wallet.name')}</button>
            <button type="button" onClick={() => navigateToPage('institutionalP2P')}>{t('landing.group.products.escrow.name')}</button>
            <button type="button" onClick={() => navigateToPage('institutionalP2P')}>{t('landing.group.products.p2p.name')}</button>
            <button type="button" onClick={() => navigateToPage('institutionalChain')}>{t('landing.group.products.chain.name')}</button>
            <button type="button" onClick={() => navigateToPage('institutionalCorporate')}>{t('landing.group.products.corporate.name')}</button>
          </div>

          <div className="rg-footer__col">
            <h4>{t('landing.group.footer.company')}</h4>
            <button type="button" onClick={() => navigateToPage('companyAbout')}>{t('landing.group.footer.about')}</button>
            <button type="button" onClick={() => navigateToPage('companyCareers')}>{t('landing.group.footer.careers')}</button>
            <button type="button" onClick={() => navigateToPage('companyPress')}>{t('landing.group.footer.press')}</button>
            <button type="button" onClick={() => navigateToPage('companySecurity')}>{t('landing.group.footer.legal')}</button>
          </div>

          <div className="rg-footer__col">
            <h4>{t('landing.group.footer.developers')}</h4>
            <button type="button" onClick={() => navigateToPage('developersAPIs')}>{t('landing.group.footer.api')}</button>
            <button type="button" onClick={() => navigateToPage('developersDocs')}>{t('landing.group.footer.docs')}</button>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">{t('landing.group.footer.github')}</a>
          </div>

          <div className="rg-footer__col">
            <h4>{t('landing.group.footer.community')}</h4>
            <a href={SOCIAL.discord} target="_blank" rel="noopener noreferrer">Discord</a>
            <a href={SOCIAL.x} target="_blank" rel="noopener noreferrer">X</a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="rg-footer__bottom">
          <p>{t('landing.group.footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
