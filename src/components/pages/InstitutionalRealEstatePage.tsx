import { useEffect, useState, type CSSProperties } from 'react';
import { useTranslation } from '../../contexts/I18nContext';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LineChart,
  MapPin,
  BedDouble,
  Maximize2,
  Users,
  Briefcase,
  Cpu,
  Database,
  Cloud,
  Link2,
  BarChart3,
  Lock,
  ChevronRight,
  Home,
  Hammer,
  TrendingUp,
} from 'lucide-react';
import '../../styles/institutional-real-estate-page.css';

function go(page: string) {
  const w = window as Window & { navigateToPage?: (p: string) => void };
  w.navigateToPage?.(page);
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function InstitutionalRealEstatePage() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activePin, setActivePin] = useState(1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Reeskova | The Future of Real Estate';
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? '';
    meta?.setAttribute(
      'content',
      'Discover properties, connect with trusted professionals, and invest smarter through Reeskova, the next-generation real estate marketplace powered by Reesk\'Cap Coorp.'
    );
    return () => {
      document.title = prev;
      if (meta && prevDesc) meta.setAttribute('content', prevDesc);
    };
  }, []);

  const navLinks = ['buy', 'sell', 'rent', 'invest', 'developers', 'about'] as const;

  return (
    <div className="reeskova">
      {/* Reeskova navbar — light premium */}
      <header className={`rk-nav ${scrolled ? 'rk-nav--solid' : ''}`}>
        <div className="rk-nav__inner">
          <button type="button" className="rk-nav__brand" onClick={() => scrollTo('rk-hero')}>
            <span className="rk-nav__mark" aria-hidden />
            <span>REESKOVA</span>
          </button>

          <nav className="rk-nav__links" aria-label="Reeskova">
            {navLinks.map((key) => (
              <a
                key={key}
                href={`#rk-${key === 'about' ? 'group' : key === 'invest' ? 'invest' : key === 'developers' ? 'audience' : key === 'buy' ? 'properties' : 'why'}`}
                onClick={(e) => {
                  e.preventDefault();
                  const map: Record<string, string> = {
                    buy: 'rk-properties',
                    sell: 'rk-audience',
                    rent: 'rk-properties',
                    invest: 'rk-invest',
                    developers: 'rk-audience',
                    about: 'rk-group',
                  };
                  scrollTo(map[key]);
                }}
              >
                {t(`institutionalRealEstate.nav.${key}`)}
              </a>
            ))}
          </nav>

          <div className="rk-nav__actions">
            <button type="button" className="rk-btn rk-btn--ghost" onClick={() => go('landing')}>
              {t('institutionalRealEstate.nav.signIn')}
            </button>
            <button type="button" className="rk-btn rk-btn--soft" onClick={() => go('companyContact')}>
              {t('institutionalRealEstate.nav.dashboard')}
            </button>
            <button type="button" className="rk-btn rk-btn--gold" onClick={() => go('companyContact')}>
              {t('institutionalRealEstate.nav.getStarted')}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="rk-hero" className="rk-hero">
        <div className="rk-hero__glow" aria-hidden />
        <div className="rk-container rk-hero__grid">
          <div className="rk-hero__copy rk-fade-up">
            <p className="rk-eyebrow">{t('institutionalRealEstate.hero.eyebrow')}</p>
            <h1>
              {t('institutionalRealEstate.hero.line1')}
              <br />
              {t('institutionalRealEstate.hero.line2')}
              <br />
              <em>{t('institutionalRealEstate.hero.line3')}</em>
            </h1>
            <p className="rk-hero__sub">{t('institutionalRealEstate.hero.subtitle')}</p>
            <div className="rk-hero__actions">
              <button type="button" className="rk-btn rk-btn--primary" onClick={() => scrollTo('rk-properties')}>
                {t('institutionalRealEstate.hero.ctaExplore')}
                <ArrowRight size={18} aria-hidden />
              </button>
              <button type="button" className="rk-btn rk-btn--outline" onClick={() => go('companyContact')}>
                {t('institutionalRealEstate.hero.ctaAgent')}
              </button>
            </div>
          </div>

          <aside className="rk-hero__visual rk-fade-up rk-fade-up--delay" aria-hidden>
            <div className="rk-stage">
              <div className="rk-stage__city">
                <div className="rk-stage__skyline">
                  {[40, 62, 48, 78, 55, 70, 44, 88, 52, 66].map((h, i) => (
                    <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />
                  ))}
                </div>
                <div className="rk-stage__map">
                  <div className="rk-stage__grid" />
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`rk-pin ${activePin === n ? 'rk-pin--on' : ''}`}
                      style={{ '--x': `${18 + n * 14}%`, '--y': `${28 + (n % 3) * 18}%` } as CSSProperties}
                      onMouseEnter={() => setActivePin(n)}
                      aria-label={`Pin ${n}`}
                    />
                  ))}
                </div>
              </div>

              <div className="rk-float rk-float--dash">
                <span>{t('institutionalRealEstate.hero.floatDash')}</span>
                <strong>+12.4%</strong>
                <small>{t('institutionalRealEstate.hero.floatGrowth')}</small>
              </div>
              <div className="rk-float rk-float--prop">
                <MapPin size={14} />
                <div>
                  <strong>{t('institutionalRealEstate.hero.floatCity')}</strong>
                  <small>{t('institutionalRealEstate.hero.floatPrice')}</small>
                </div>
              </div>
              <div className="rk-float rk-float--ai">
                <Sparkles size={14} />
                {t('institutionalRealEstate.hero.floatAi')}
              </div>
            </div>
          </aside>
        </div>

        <div className="rk-stats">
          <div className="rk-container rk-stats__row">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="rk-stats__item">
                <strong className="rk-num">{t(`institutionalRealEstate.stats.s${n}.value`)}</strong>
                <span>{t(`institutionalRealEstate.stats.s${n}.label`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="rk-why" className="rk-section">
        <div className="rk-container">
          <header className="rk-head">
            <p className="rk-eyebrow">{t('institutionalRealEstate.why.eyebrow')}</p>
            <h2>{t('institutionalRealEstate.why.title')}</h2>
            <p>{t('institutionalRealEstate.why.subtitle')}</p>
          </header>
          <div className="rk-why-grid">
            {(
              [
                { k: 'ai', Icon: Sparkles },
                { k: 'verified', Icon: ShieldCheck },
                { k: 'secure', Icon: Lock },
                { k: 'smart', Icon: LineChart },
              ] as const
            ).map(({ k, Icon }) => (
              <article key={k} className="rk-card rk-card--hover">
                <div className="rk-card__icon">
                  <Icon size={22} aria-hidden />
                </div>
                <h3>{t(`institutionalRealEstate.why.${k}.title`)}</h3>
                <p>{t(`institutionalRealEstate.why.${k}.text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="rk-map" className="rk-section rk-section--soft">
        <div className="rk-container">
          <header className="rk-head">
            <p className="rk-eyebrow">{t('institutionalRealEstate.map.eyebrow')}</p>
            <h2>{t('institutionalRealEstate.map.title')}</h2>
            <p>{t('institutionalRealEstate.map.subtitle')}</p>
          </header>
          <div className="rk-map">
            <div className="rk-map__filters">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={activePin === n ? 'is-on' : ''}
                  onClick={() => setActivePin(n)}
                >
                  {t(`institutionalRealEstate.map.filter${n}`)}
                </button>
              ))}
            </div>
            <div className="rk-map__canvas" aria-hidden>
              <div className="rk-map__orbits" />
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <span
                  key={n}
                  className={`rk-map__pin ${activePin === ((n % 4) + 1) ? 'is-on' : ''}`}
                  style={{
                    left: `${12 + (n * 11) % 78}%`,
                    top: `${18 + (n * 17) % 62}%`,
                  }}
                  onMouseEnter={() => setActivePin((n % 4) + 1)}
                />
              ))}
              <div className="rk-map__card">
                <strong>{t(`institutionalRealEstate.map.pin${activePin}.title`)}</strong>
                <span>{t(`institutionalRealEstate.map.pin${activePin}.meta`)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section id="rk-properties" className="rk-section">
        <div className="rk-container">
          <header className="rk-head rk-head--row">
            <div>
              <p className="rk-eyebrow">{t('institutionalRealEstate.featured.eyebrow')}</p>
              <h2>{t('institutionalRealEstate.featured.title')}</h2>
            </div>
            <button type="button" className="rk-link" onClick={() => go('companyContact')}>
              {t('institutionalRealEstate.featured.viewAll')}
              <ChevronRight size={16} aria-hidden />
            </button>
          </header>
          <div className="rk-prop-grid">
            {[1, 2, 3, 4].map((n) => (
              <article key={n} className="rk-prop">
                <div className={`rk-prop__media rk-prop__media--${n}`}>
                  <span>{t('institutionalRealEstate.featured.badge')}</span>
                </div>
                <div className="rk-prop__body">
                  <p className="rk-prop__price rk-num">{t(`institutionalRealEstate.featured.p${n}.price`)}</p>
                  <h3>{t(`institutionalRealEstate.featured.p${n}.title`)}</h3>
                  <p className="rk-prop__city">
                    <MapPin size={14} aria-hidden />
                    {t(`institutionalRealEstate.featured.p${n}.city`)}
                  </p>
                  <div className="rk-prop__meta">
                    <span>
                      <BedDouble size={14} aria-hidden />
                      {t(`institutionalRealEstate.featured.p${n}.beds`)}
                    </span>
                    <span>
                      <Maximize2 size={14} aria-hidden />
                      {t(`institutionalRealEstate.featured.p${n}.area`)}
                    </span>
                  </div>
                  <button type="button" className="rk-btn rk-btn--soft rk-btn--block" onClick={() => go('companyContact')}>
                    {t('institutionalRealEstate.featured.cta')}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="rk-section rk-section--soft">
        <div className="rk-container">
          <header className="rk-head">
            <p className="rk-eyebrow">{t('institutionalRealEstate.how.eyebrow')}</p>
            <h2>{t('institutionalRealEstate.how.title')}</h2>
            <p>{t('institutionalRealEstate.how.subtitle')}</p>
          </header>
          <ol className="rk-steps">
            {[1, 2, 3, 4, 5].map((n) => (
              <li key={n}>
                <span className="rk-num">{String(n).padStart(2, '0')}</span>
                <h3>{t(`institutionalRealEstate.how.s${n}.title`)}</h3>
                <p>{t(`institutionalRealEstate.how.s${n}.text`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* AUDIENCE */}
      <section id="rk-audience" className="rk-section">
        <div className="rk-container">
          <header className="rk-head">
            <p className="rk-eyebrow">{t('institutionalRealEstate.audience.eyebrow')}</p>
            <h2>{t('institutionalRealEstate.audience.title')}</h2>
            <p>{t('institutionalRealEstate.audience.subtitle')}</p>
          </header>
          <div className="rk-audience">
            {(
              [
                { k: 'buyers', Icon: Home },
                { k: 'agents', Icon: Briefcase },
                { k: 'developers', Icon: Hammer },
              ] as const
            ).map(({ k, Icon }) => (
              <article key={k} className="rk-audience__card">
                <Icon size={26} aria-hidden />
                <h3>{t(`institutionalRealEstate.audience.${k}.title`)}</h3>
                <p>{t(`institutionalRealEstate.audience.${k}.text`)}</p>
                <ul>
                  {[1, 2, 3].map((n) => (
                    <li key={n}>{t(`institutionalRealEstate.audience.${k}.b${n}`)}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INVEST */}
      <section id="rk-invest" className="rk-invest">
        <div className="rk-container rk-invest__grid">
          <div>
            <p className="rk-eyebrow rk-eyebrow--light">{t('institutionalRealEstate.invest.eyebrow')}</p>
            <h2>{t('institutionalRealEstate.invest.title')}</h2>
            <p>{t('institutionalRealEstate.invest.subtitle')}</p>
            <div className="rk-invest__metrics">
              {[1, 2, 3].map((n) => (
                <div key={n}>
                  <strong className="rk-num">{t(`institutionalRealEstate.invest.m${n}.value`)}</strong>
                  <span>{t(`institutionalRealEstate.invest.m${n}.label`)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rk-invest__chart" aria-hidden>
            <div className="rk-invest__bars">
              {[42, 55, 48, 68, 61, 78, 72, 88, 80, 94].map((h, i) => (
                <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>
            <div className="rk-invest__legend">
              <TrendingUp size={16} />
              {t('institutionalRealEstate.invest.chartLabel')}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY + REESK'CAP COORP */}
      <section id="rk-tech" className="rk-section">
        <div className="rk-container">
          <header className="rk-head">
            <p className="rk-eyebrow">{t('institutionalRealEstate.tech.eyebrow')}</p>
            <h2>
              {t('institutionalRealEstate.tech.title')}
              <br />
              <span className="rk-accent-text">{t('institutionalRealEstate.tech.titleAccent')}</span>
            </h2>
            <p>{t('institutionalRealEstate.tech.subtitle')}</p>
          </header>
          <div className="rk-tech-grid">
            {(
              [
                { k: 'ai', Icon: Cpu },
                { k: 'data', Icon: Database },
                { k: 'cloud', Icon: Cloud },
                { k: 'chain', Icon: Link2 },
                { k: 'analytics', Icon: BarChart3 },
                { k: 'escrow', Icon: Lock },
              ] as const
            ).map(({ k, Icon }) => (
              <article key={k} className="rk-tech">
                <Icon size={20} aria-hidden />
                <h3>{t(`institutionalRealEstate.tech.${k}.title`)}</h3>
                <p>{t(`institutionalRealEstate.tech.${k}.text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rk-group" className="rk-section rk-section--soft">
        <div className="rk-container rk-group">
          <div>
            <p className="rk-eyebrow">{t('institutionalRealEstate.group.eyebrow')}</p>
            <h2>{t('institutionalRealEstate.group.title')}</h2>
            <p className="rk-group__lead">{t('institutionalRealEstate.group.lead')}</p>
            <p>{t('institutionalRealEstate.group.text')}</p>
          </div>
          <div className="rk-group__stack">
            {[1, 2, 3, 4].map((n) => (
              <article key={n} className={`rk-group__item ${n === 1 ? 'is-active' : ''}`}>
                <strong>{t(`institutionalRealEstate.group.p${n}.name`)}</strong>
                <span>{t(`institutionalRealEstate.group.p${n}.role`)}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="rk-section">
        <div className="rk-container">
          <header className="rk-head">
            <p className="rk-eyebrow">{t('institutionalRealEstate.testimonials.eyebrow')}</p>
            <h2>{t('institutionalRealEstate.testimonials.title')}</h2>
          </header>
          <div className="rk-quotes">
            {[1, 2, 3].map((n) => (
              <blockquote key={n} className="rk-quote">
                <p>“{t(`institutionalRealEstate.testimonials.t${n}.quote`)}”</p>
                <footer>
                  <strong>{t(`institutionalRealEstate.testimonials.t${n}.name`)}</strong>
                  <span>{t(`institutionalRealEstate.testimonials.t${n}.role`)}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rk-cta">
        <div className="rk-container rk-cta__inner">
          <h2>
            {t('institutionalRealEstate.cta.line1')}
            <br />
            {t('institutionalRealEstate.cta.line2')}
          </h2>
          <button type="button" className="rk-btn rk-btn--gold rk-btn--lg" onClick={() => go('companyContact')}>
            {t('institutionalRealEstate.cta.button')}
            <ArrowRight size={18} aria-hidden />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="rk-footer">
        <div className="rk-container rk-footer__grid">
          <div>
            <div className="rk-nav__brand rk-footer__brand">
              <span className="rk-nav__mark" aria-hidden />
              <span>REESKOVA</span>
            </div>
            <p>{t('institutionalRealEstate.footer.tagline')}</p>
          </div>
          <div>
            <h4>{t('institutionalRealEstate.footer.product')}</h4>
            <button type="button" onClick={() => scrollTo('rk-properties')}>{t('institutionalRealEstate.footer.marketplace')}</button>
            <button type="button" onClick={() => scrollTo('rk-group')}>{t('institutionalRealEstate.footer.about')}</button>
            <button type="button" onClick={() => go('companyContact')}>{t('institutionalRealEstate.footer.contact')}</button>
          </div>
          <div>
            <h4>{t('institutionalRealEstate.footer.company')}</h4>
            <button type="button" onClick={() => go('companyAbout')}>{t('institutionalRealEstate.footer.reeskCapCoorp')}</button>
            <button type="button" onClick={() => go('companyCareers')}>{t('institutionalRealEstate.footer.careers')}</button>
            <button type="button" onClick={() => go('landing')}>{t('institutionalRealEstate.footer.privacy')}</button>
            <button type="button" onClick={() => go('landing')}>{t('institutionalRealEstate.footer.terms')}</button>
          </div>
          <div>
            <h4>{t('institutionalRealEstate.footer.social')}</h4>
            <div className="rk-footer__social">
              <a href="https://x.com/Reeskcap" target="_blank" rel="noopener noreferrer">X</a>
              <a href="https://t.me/RSCchain" target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href="https://discord.gg/KDpJRnaBwB" target="_blank" rel="noopener noreferrer">Discord</a>
              <a href="https://github.com/rscchain" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
        <div className="rk-container rk-footer__bottom">
          <span>{t('institutionalRealEstate.footer.copyright')}</span>
          <button type="button" className="rk-link" onClick={() => go('landing')}>
            {t('institutionalRealEstate.footer.backToRsc')}
            <Users size={14} aria-hidden />
          </button>
        </div>
      </footer>
    </div>
  );
}
