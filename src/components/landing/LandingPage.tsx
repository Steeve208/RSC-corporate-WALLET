import { useEffect } from 'react';
import '../../styles/landing.css';
import '../../styles/landing-corporate.css';
import '../../styles/landing-group.css';
import { useScrollAnimation } from './useScrollAnimation';
import { Navbar } from './Navbar';
import { useTranslation } from '../../contexts/I18nContext';
import { ArchitectureStack, EscrowFlow, TechLayers } from './graphics';

type ProductKey = 'reeskova' | 'chain' | 'p2p' | 'escrow' | 'wallet' | 'corporate';
import { ArrowRight, ArrowUpRight, Boxes, Globe2, ShieldCheck, Users } from 'lucide-react';

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

function tList(t: (key: string) => string, base: string, n: number) {
  return Array.from({ length: n }, (_, i) => t(`${base}.${i}`));
}

const SOCIAL = {
  x: 'https://x.com/Reeskcap',
  discord: 'https://discord.gg/KDpJRnaBwB',
  telegram: 'https://t.me/RSCchain',
  github: 'https://github.com/rscchain',
  linkedin: 'https://www.linkedin.com/',
} as const;

const CHAPTERS: {
  key: ProductKey;
  page: AppNavigatePage;
  n: string;
  photo: string;
  href?: string;
}[] = [
  { key: 'reeskova', page: 'institutionalRealEstate', n: '01', photo: '/book/residences.jpg', href: 'https://www.reeskova.com' },
  { key: 'chain', page: 'institutionalChain', n: '02', photo: '/book/servers.jpg' },
  { key: 'p2p', page: 'institutionalP2P', n: '03', photo: '/book/avenue.jpg' },
  { key: 'escrow', page: 'institutionalP2P', n: '04', photo: '/book/interior.jpg', href: 'https://rsccredit.com.br/' },
  { key: 'wallet', page: 'wallet', n: '05', photo: '/book/glass.jpg' },
  { key: 'corporate', page: 'institutionalCorporate', n: '06', photo: '/book/office.jpg' },
];

const AUDIENCES = [
  { key: 'individuals', page: 'wallet' as const },
  { key: 'businesses', page: 'businessWallet' as const },
  { key: 'institutions', page: 'institutionalCorporate' as const },
] as const;

const TIMELINE = ['perception', 'idea', 'platform', 'infrastructure', 'ecosystem'] as const;
const VALUES = ['innovation', 'integrity', 'technology', 'trust', 'execution'] as const;

const PORTRAITS: Record<(typeof VALUES)[number], string> = {
  innovation: '/book/steeve.jpg',
  integrity: '/book/robenson.jpg',
  technology: '/book/etienne.jpg',
  trust: '/book/amarachi.jpg',
  execution: '/book/emmanuel.jpg',
};
const TECH_KEYS = ['identity', 'data', 'cloud', 'chain', 'apis'] as const;
const WHY_KEYS = ['discipline', 'integration', 'horizon'] as const;

export function LandingPage() {
  const { t, language } = useTranslation();
  useScrollAnimation();

  useEffect(() => {
    document.documentElement.style.setProperty('--rg-serif', "'Cormorant Garamond', Georgia, serif");
  }, []);

  const stackLayers = [
    {
      id: 'products',
      label: t('landing.group.stackLayers.products.label'),
      items: tList(t, 'landing.group.stackLayers.products.items', 4),
    },
    {
      id: 'rails',
      label: t('landing.group.stackLayers.rails.label'),
      items: tList(t, 'landing.group.stackLayers.rails.items', 3),
    },
    {
      id: 'chain',
      label: t('landing.group.stackLayers.chain.label'),
      items: tList(t, 'landing.group.stackLayers.chain.items', 3),
    },
  ];

  const techLayers = TECH_KEYS.map((key) => ({
    title: t(`landing.group.techLayers.${key}.title`),
    description: t(`landing.group.techLayers.${key}.description`),
  }));

  const escrowSteps = [1, 2, 3].map((n) => ({
    title: t(`landing.group.escrowFlow.step${n}.title`),
    description: t(`landing.group.escrowFlow.step${n}.description`),
  }));

  return (
    <div key={language} className="vaulto-landing vaulto-landing--corporate vaulto-landing--group">
      <Navbar />

      <section className="rg-hero" aria-labelledby="rg-hero-title">
        <div className="rg-hero__inner">
          <div className="rg-hero__copy">
            <p className="rg-kicker">{t('landing.group.heroKicker')}</p>
            <h1 id="rg-hero-title" className="rg-hero__title">
              {t('landing.group.heroTitle')}
            </h1>
            <p className="rg-hero__lead">{t('landing.group.heroLead')}</p>
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
            <p className="rg-hero__aux">{t('landing.group.heroAux')}</p>
          </div>
          <aside className="rg-hero__plate">
            <img
              className="rg-hero__photo"
              src="/book/facade.jpg"
              alt={t('landing.group.photoAlt')}
            />
          </aside>
          <div className="rg-hero__map" aria-label={t('landing.group.equationLabel')}>
            <p className="rg-kicker">{t('landing.group.equationLabel')}</p>
            <ol className="rg-hero__equation">
              {tList(t, 'landing.group.equation', 8).map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ol>
            <p className="rg-hero__plate-note">{t('landing.group.equationNote')}</p>
          </div>
        </div>
      </section>

      <section className="rg-manifesto animate-on-scroll" aria-labelledby="rg-manifesto-title">
        <p className="rg-kicker">{t('landing.group.brand')}</p>
        <h2 id="rg-manifesto-title" className="rg-manifesto__title">
          {t('landing.group.manifestoTitle')}
        </h2>
        <p className="rg-manifesto__body">{t('landing.group.manifestoBody')}</p>
      </section>

      <section id="ecosystem" className="rg-portfolio" aria-labelledby="rg-eco-title">
        <header className="rg-section-head rg-section-head--pad">
          <p className="rg-kicker">{t('landing.group.ecoEyebrow')}</p>
          <h2 id="rg-eco-title">{t('landing.group.ecoTitle')}</h2>
          <p className="rg-section-sub">{t('landing.group.ecoSubtitle')}</p>
        </header>

        <div id="products">
          {CHAPTERS.map((item, i) => (
            <article
              key={item.key}
              className={`rg-chapter${i % 2 === 1 ? ' rg-chapter--flip' : ''} animate-on-scroll`}
              aria-labelledby={`rg-chapter-${item.key}`}
            >
              <img
                className="rg-chapter__photo"
                src={item.photo}
                alt={t('landing.group.photoAlt')}
              />
              <div className="rg-chapter__copy">
                <p className="rg-chapter__num">
                  {item.n} · {t('landing.group.productLabel')}
                </p>
                <h3 id={`rg-chapter-${item.key}`}>{t(`landing.group.products.${item.key}.name`)}</h3>
                <p className="rg-chapter__positioning">
                  {t(`landing.group.products.${item.key}.positioning`)}
                </p>
                <p>{t(`landing.group.products.${item.key}.p1`)}</p>
                <p>{t(`landing.group.products.${item.key}.p2`)}</p>
                <p>{t(`landing.group.products.${item.key}.p3`)}</p>
                <ul className="rg-chapter__points">
                  {tList(t, `landing.group.products.${item.key}.points`, 3).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {item.key === 'escrow' && <EscrowFlow steps={escrowSteps} />}
                {item.href ? (
                  <a
                    className="rg-btn rg-btn--primary"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('landing.group.learnMore')}
                    <ArrowUpRight size={18} strokeWidth={2} aria-hidden />
                  </a>
                ) : (
                  <button
                    type="button"
                    className="rg-btn rg-btn--primary"
                    onClick={() => navigateToPage(item.page)}
                  >
                    {t('landing.group.learnMore')}
                    <ArrowUpRight size={18} strokeWidth={2} aria-hidden />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="connects" className="rg-connect animate-on-scroll" aria-labelledby="rg-connect-title">
        <header className="rg-section-head">
          <p className="rg-kicker">{t('landing.group.connectEyebrow')}</p>
          <h2 id="rg-connect-title">{t('landing.group.connectTitle')}</h2>
          <p className="rg-prose">{t('landing.group.connectBody')}</p>
        </header>
        <ArchitectureStack layers={stackLayers} ariaLabel={t('landing.group.connectTitle')} />
      </section>

      <section id="technology" className="rg-tech animate-on-scroll" aria-labelledby="rg-tech-title">
        <header className="rg-section-head">
          <p className="rg-kicker">{t('landing.group.techEyebrow')}</p>
          <h2 id="rg-tech-title">{t('landing.group.techTitle')}</h2>
          <p className="rg-prose">{t('landing.group.techIntro')}</p>
          <p className="rg-prose">{t('landing.group.techIntro2')}</p>
        </header>
        <TechLayers layers={techLayers} />
      </section>

      <section id="why" className="rg-why animate-on-scroll" aria-labelledby="rg-why-title">
        <header className="rg-section-head rg-section-head--light">
          <p className="rg-kicker rg-kicker--light">{t('landing.group.whyEyebrow')}</p>
          <h2 id="rg-why-title" className="rg-why__title">
            {t('landing.group.whyTitle')}
          </h2>
        </header>
        <div className="rg-why__theses">
          {WHY_KEYS.map((key) => (
            <article key={key} className="rg-why__thesis">
              <h3>{t(`landing.group.whyTheses.${key}.title`)}</h3>
              <p>{t(`landing.group.whyTheses.${key}.body`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="audiences" className="rg-audience animate-on-scroll" aria-labelledby="rg-audience-title">
        <header className="rg-section-head">
          <p className="rg-kicker">{t('landing.group.audienceEyebrow')}</p>
          <h2 id="rg-audience-title">{t('landing.group.audienceTitle')}</h2>
          <p className="rg-section-sub">{t('landing.group.audienceSubtitle')}</p>
        </header>
        <div className="rg-audience__list">
          {AUDIENCES.map(({ key, page }, i) => (
            <article key={key} className={`rg-audience__block rg-audience__block--${i}`}>
              <h3>{t(`landing.group.audiences.${key}.title`)}</h3>
              <p>{t(`landing.group.audiences.${key}.p1`)}</p>
              <p>{t(`landing.group.audiences.${key}.p2`)}</p>
              <p className="rg-audience__products">{t(`landing.group.audiences.${key}.products`)}</p>
              <button type="button" className="rg-btn rg-btn--outline" onClick={() => navigateToPage(page)}>
                {t(`landing.group.audiences.${key}.cta`)}
                <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="timeline" className="rg-timeline animate-on-scroll" aria-labelledby="rg-timeline-title">
        <header className="rg-section-head">
          <p className="rg-kicker">{t('landing.group.timelineEyebrow')}</p>
          <h2 id="rg-timeline-title">{t('landing.group.timelineTitle')}</h2>
          <p className="rg-section-sub">{t('landing.group.timelineSubtitle')}</p>
        </header>
        <ol className="rg-timeline__track">
          {TIMELINE.map((key) => (
            <li key={key} className="rg-timeline__item">
              <span className="rg-timeline__dot" aria-hidden />
              <span className="rg-timeline__label">{t(`landing.group.timeline.${key}.label`)}</span>
              <span className="rg-timeline__note">{t(`landing.group.timeline.${key}.note`)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="leadership" className="rg-values animate-on-scroll" aria-labelledby="rg-values-title">
        <header className="rg-section-head">
          <p className="rg-kicker">{t('landing.group.valuesEyebrow')}</p>
          <h2 id="rg-values-title">{t('landing.group.valuesTitle')}</h2>
          <p className="rg-section-sub">{t('landing.group.valuesSubtitle')}</p>
        </header>
        <ul className="rg-values__list">
          {VALUES.map((key) => (
            <li key={key} className={`rg-values__row${key === 'innovation' ? ' rg-values__row--lead' : ''}`}>
              <img
                className="rg-values__portrait"
                src={PORTRAITS[key]}
                alt=""
              />
              <h3>{t(`landing.group.values.${key}.title`)}</h3>
              <p>{t(`landing.group.values.${key}.body`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="news" className="rg-news animate-on-scroll" aria-labelledby="rg-news-title">
        <header className="rg-section-head">
          <p className="rg-kicker">{t('landing.group.newsEyebrow')}</p>
          <h2 id="rg-news-title">{t('landing.group.newsTitle')}</h2>
        </header>
        <div className="rg-news__list">
          {[1, 2, 3].map((n) => (
            <article key={n} className="rg-news__item">
              <p className="rg-news__meta">
                <time>{t(`landing.group.news.n${n}.date`)}</time>
                <span aria-hidden>·</span>
                <span>{t(`landing.group.news.n${n}.meta`)}</span>
              </p>
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

      <section className="rg-team" aria-label={t('landing.group.teamAlt')}>
        <div className="rg-team__photo">
          <img
            className="rg-team__img"
            src="/book/skyline.jpg"
            alt={t('landing.group.photoAlt')}
            width={1021}
            height={494}
            loading="lazy"
            decoding="async"
          />
          <div className="rg-team__bar">
          <div className="rg-team__brand">
            <span className="rg-team__brand-name">{t('landing.group.brand')}</span>
            <span className="rg-team__brand-tag">{t('landing.group.teamTagline')}</span>
          </div>
          <ul className="rg-team__pillars">
            <li>
              <Boxes size={22} strokeWidth={1.6} aria-hidden />
              <span>{t('landing.group.teamPillars.growth')}</span>
            </li>
            <li>
              <Globe2 size={22} strokeWidth={1.6} aria-hidden />
              <span>{t('landing.group.teamPillars.impact')}</span>
            </li>
            <li>
              <ShieldCheck size={22} strokeWidth={1.6} aria-hidden />
              <span>{t('landing.group.teamPillars.secure')}</span>
            </li>
            <li>
              <Users size={22} strokeWidth={1.6} aria-hidden />
              <span>{t('landing.group.teamPillars.together')}</span>
            </li>
          </ul>
          </div>
        </div>
      </section>

      <section className="rg-cta" aria-labelledby="rg-cta-title">
        <div className="rg-cta__inner">
          <h2 id="rg-cta-title">{t('landing.group.ctaTitle')}</h2>
          <p>{t('landing.group.ctaBody')}</p>
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

      <footer className="rg-footer">
        <div className="rg-footer__inner">
          <div className="rg-footer__brand">
            <span className="rg-footer__logo">{t('landing.group.brand')}</span>
            <p>{t('landing.group.footerTagline')}</p>
            <div className="rg-footer__social">
              <a href={SOCIAL.discord} target="_blank" rel="noopener noreferrer">
                Discord
              </a>
              <a href={SOCIAL.x} target="_blank" rel="noopener noreferrer">
                X
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>

          <div className="rg-footer__col">
            <h4>{t('landing.group.footer.products')}</h4>
            <button type="button" onClick={() => navigateToPage('institutionalRealEstate')}>
              {t('landing.group.products.reeskova.name')}
            </button>
            <button type="button" onClick={() => navigateToPage('wallet')}>
              {t('landing.group.products.wallet.name')}
            </button>
            <button type="button" onClick={() => navigateToPage('institutionalP2P')}>
              {t('landing.group.products.escrow.name')}
            </button>
            <button type="button" onClick={() => navigateToPage('institutionalP2P')}>
              {t('landing.group.products.p2p.name')}
            </button>
            <button type="button" onClick={() => navigateToPage('institutionalChain')}>
              {t('landing.group.products.chain.name')}
            </button>
            <button type="button" onClick={() => navigateToPage('institutionalCorporate')}>
              {t('landing.group.products.corporate.name')}
            </button>
          </div>

          <div className="rg-footer__col">
            <h4>{t('landing.group.footer.company')}</h4>
            <button type="button" onClick={() => navigateToPage('companyAbout')}>
              {t('landing.group.footer.about')}
            </button>
            <button type="button" onClick={() => navigateToPage('companyCareers')}>
              {t('landing.group.footer.careers')}
            </button>
            <button type="button" onClick={() => navigateToPage('companyPress')}>
              {t('landing.group.footer.press')}
            </button>
            <button type="button" onClick={() => navigateToPage('companySecurity')}>
              {t('landing.group.footer.legal')}
            </button>
          </div>

          <div className="rg-footer__col">
            <h4>{t('landing.group.footer.developers')}</h4>
            <button type="button" onClick={() => navigateToPage('developersAPIs')}>
              {t('landing.group.footer.api')}
            </button>
            <button type="button" onClick={() => navigateToPage('developersDocs')}>
              {t('landing.group.footer.docs')}
            </button>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
              {t('landing.group.footer.github')}
            </a>
          </div>

          <div className="rg-footer__col">
            <h4>{t('landing.group.footer.community')}</h4>
            <a href={SOCIAL.discord} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
            <a href={SOCIAL.x} target="_blank" rel="noopener noreferrer">
              X
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="rg-footer__bottom">
          <p>{t('landing.group.footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
