import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Info, 
  Eye, 
  Target,
  Heart,
  ArrowRight
} from 'lucide-react';
import '../../styles/company-about-page.css';

export function CompanyAboutPage() {
  const { t } = useTranslation();

  return (
    <div className="company-about-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="company-about-hero">
        <div className="company-about-hero-container">
          <div className="company-about-hero-content">
            <div className="company-about-hero-icon">
              <Info size={64} />
            </div>
            <h1 className="company-about-hero-title">{t('companyAbout.hero.title')}</h1>
            <p className="company-about-hero-subtitle">{t('companyAbout.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="company-about-vision">
        <div className="company-about-container">
          <div className="company-about-section-header">
            <Eye className="company-about-section-icon" size={48} />
            <h2 className="company-about-section-title">{t('companyAbout.vision.title')}</h2>
          </div>
          <div className="company-about-vision-content">
            <p className="company-about-description">{t('companyAbout.vision.description')}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="company-about-mission">
        <div className="company-about-container">
          <div className="company-about-section-header">
            <Target className="company-about-section-icon" size={48} />
            <h2 className="company-about-section-title">{t('companyAbout.mission.title')}</h2>
          </div>
          <div className="company-about-mission-content">
            <p className="company-about-description">{t('companyAbout.mission.description')}</p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="company-about-philosophy">
        <div className="company-about-container">
          <div className="company-about-section-header">
            <Heart className="company-about-section-icon" size={48} />
            <h2 className="company-about-section-title">{t('companyAbout.philosophy.title')}</h2>
          </div>
          <div className="company-about-philosophy-content">
            <p className="company-about-description">{t('companyAbout.philosophy.description')}</p>
            <div className="company-about-philosophy-principles">
              <div className="company-about-principle-card">
                <h3 className="company-about-principle-title">{t('companyAbout.philosophy.principle1.title')}</h3>
                <p className="company-about-principle-description">{t('companyAbout.philosophy.principle1.description')}</p>
              </div>
              <div className="company-about-principle-card">
                <h3 className="company-about-principle-title">{t('companyAbout.philosophy.principle2.title')}</h3>
                <p className="company-about-principle-description">{t('companyAbout.philosophy.principle2.description')}</p>
              </div>
              <div className="company-about-principle-card">
                <h3 className="company-about-principle-title">{t('companyAbout.philosophy.principle3.title')}</h3>
                <p className="company-about-principle-description">{t('companyAbout.philosophy.principle3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

