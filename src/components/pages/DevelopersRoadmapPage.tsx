import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Map, 
  Code, 
  GitBranch,
  Calendar,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Clock,
  Lightbulb,
  Github,
  Wrench
} from 'lucide-react';
import '../../styles/developers-roadmap-page.css';

export function DevelopersRoadmapPage() {
  const { t } = useTranslation();

  return (
    <div className="developers-roadmap-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="developers-roadmap-hero">
        <div className="developers-roadmap-hero-container">
          <div className="developers-roadmap-hero-content">
            <div className="developers-roadmap-hero-icon">
              <Map size={64} />
            </div>
            <h1 className="developers-roadmap-hero-title">{t('developersRoadmap.hero.title')}</h1>
            <p className="developers-roadmap-hero-subtitle">{t('developersRoadmap.hero.subtitle')}</p>
            <a href={t('developersRoadmap.hero.githubLink')} target="_blank" rel="noopener noreferrer" className="developers-roadmap-hero-cta">
              {t('developersRoadmap.hero.cta')}
              <ExternalLink className="developers-roadmap-hero-cta-icon" size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Roadmap Sections */}
      <section className="developers-roadmap-sections">
        <div className="developers-roadmap-container">
          {/* Now Section */}
          <div className="developers-roadmap-section">
            <div className="developers-roadmap-section-header">
              <div className="developers-roadmap-section-badge developers-roadmap-badge-now">
                <CheckCircle size={20} />
                <span>{t('developersRoadmap.now.label')}</span>
              </div>
              <h2 className="developers-roadmap-section-title">{t('developersRoadmap.now.title')}</h2>
              <p className="developers-roadmap-section-description">{t('developersRoadmap.now.description')}</p>
            </div>
            <div className="developers-roadmap-items">
              {[1, 2, 3].map((item) => (
                <div key={item} className="developers-roadmap-item">
                  <div className="developers-roadmap-item-header">
                    <h3 className="developers-roadmap-item-title">{t(`developersRoadmap.now.items.item${item}.title`)}</h3>
                    <div className="developers-roadmap-item-meta">
                      <span className="developers-roadmap-item-version">{t(`developersRoadmap.now.items.item${item}.version`)}</span>
                      <span className="developers-roadmap-item-date">{t(`developersRoadmap.now.items.item${item}.date`)}</span>
                    </div>
                  </div>
                  <p className="developers-roadmap-item-description">{t(`developersRoadmap.now.items.item${item}.description`)}</p>
                  <a 
                    href={t(`developersRoadmap.now.items.item${item}.githubLink`)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="developers-roadmap-item-link"
                  >
                    <Github size={16} />
                    <span>{t('developersRoadmap.viewOnGitHub')}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Next Section */}
          <div className="developers-roadmap-section">
            <div className="developers-roadmap-section-header">
              <div className="developers-roadmap-section-badge developers-roadmap-badge-next">
                <Clock size={20} />
                <span>{t('developersRoadmap.next.label')}</span>
              </div>
              <h2 className="developers-roadmap-section-title">{t('developersRoadmap.next.title')}</h2>
              <p className="developers-roadmap-section-description">{t('developersRoadmap.next.description')}</p>
            </div>
            <div className="developers-roadmap-items">
              {[1, 2, 3].map((item) => (
                <div key={item} className="developers-roadmap-item">
                  <div className="developers-roadmap-item-header">
                    <h3 className="developers-roadmap-item-title">{t(`developersRoadmap.next.items.item${item}.title`)}</h3>
                    <div className="developers-roadmap-item-meta">
                      <span className="developers-roadmap-item-version">{t(`developersRoadmap.next.items.item${item}.version`)}</span>
                      <span className="developers-roadmap-item-date">{t(`developersRoadmap.next.items.item${item}.date`)}</span>
                    </div>
                  </div>
                  <p className="developers-roadmap-item-description">{t(`developersRoadmap.next.items.item${item}.description`)}</p>
                  <a 
                    href={t(`developersRoadmap.next.items.item${item}.githubLink`)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="developers-roadmap-item-link"
                  >
                    <Github size={16} />
                    <span>{t('developersRoadmap.viewOnGitHub')}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Later Section */}
          <div className="developers-roadmap-section">
            <div className="developers-roadmap-section-header">
              <div className="developers-roadmap-section-badge developers-roadmap-badge-later">
                <Lightbulb size={20} />
                <span>{t('developersRoadmap.later.label')}</span>
              </div>
              <h2 className="developers-roadmap-section-title">{t('developersRoadmap.later.title')}</h2>
              <p className="developers-roadmap-section-description">{t('developersRoadmap.later.description')}</p>
            </div>
            <div className="developers-roadmap-items">
              {[1, 2, 3].map((item) => (
                <div key={item} className="developers-roadmap-item">
                  <div className="developers-roadmap-item-header">
                    <h3 className="developers-roadmap-item-title">{t(`developersRoadmap.later.items.item${item}.title`)}</h3>
                    <div className="developers-roadmap-item-meta">
                      <span className="developers-roadmap-item-version">{t(`developersRoadmap.later.items.item${item}.version`)}</span>
                      <span className="developers-roadmap-item-date">{t(`developersRoadmap.later.items.item${item}.date`)}</span>
                    </div>
                  </div>
                  <p className="developers-roadmap-item-description">{t(`developersRoadmap.later.items.item${item}.description`)}</p>
                  <a 
                    href={t(`developersRoadmap.later.items.item${item}.githubLink`)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="developers-roadmap-item-link"
                  >
                    <Github size={16} />
                    <span>{t('developersRoadmap.viewOnGitHub')}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="developers-roadmap-cta">
        <div className="developers-roadmap-container">
          <div className="developers-roadmap-cta-content">
            <Code className="developers-roadmap-cta-icon" size={64} />
            <h2 className="developers-roadmap-cta-title">{t('developersRoadmap.cta.title')}</h2>
            <p className="developers-roadmap-cta-description">{t('developersRoadmap.cta.description')}</p>
            <div className="developers-roadmap-cta-buttons">
              <a href={t('developersRoadmap.cta.contributeLink')} target="_blank" rel="noopener noreferrer" className="developers-roadmap-cta-button developers-roadmap-cta-button-primary">
                {t('developersRoadmap.cta.contribute')}
                <Github className="developers-roadmap-cta-button-icon" size={20} />
              </a>
              <a href={t('developersRoadmap.cta.buildLink')} target="_blank" rel="noopener noreferrer" className="developers-roadmap-cta-button developers-roadmap-cta-button-secondary">
                {t('developersRoadmap.cta.build')}
                <ArrowRight className="developers-roadmap-cta-button-icon" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

