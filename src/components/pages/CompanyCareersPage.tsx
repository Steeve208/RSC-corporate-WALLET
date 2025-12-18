import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Briefcase, 
  Users, 
  Mail,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react';
import '../../styles/company-careers-page.css';

export function CompanyCareersPage() {
  const { t } = useTranslation();

  return (
    <div className="company-careers-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="company-careers-hero">
        <div className="company-careers-hero-container">
          <div className="company-careers-hero-content">
            <div className="company-careers-hero-icon">
              <Briefcase size={64} />
            </div>
            <h1 className="company-careers-hero-title">{t('companyCareers.hero.title')}</h1>
            <p className="company-careers-hero-subtitle">{t('companyCareers.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="company-careers-positions">
        <div className="company-careers-container">
          <h2 className="company-careers-section-title">{t('companyCareers.positions.title')}</h2>
          <div className="company-careers-positions-grid">
            <div className="company-careers-position-card">
              <h3 className="company-careers-position-title">{t('companyCareers.positions.position1.title')}</h3>
              <div className="company-careers-position-meta">
                <div className="company-careers-position-meta-item">
                  <MapPin className="company-careers-meta-icon" size={16} />
                  <span>{t('companyCareers.positions.position1.location')}</span>
                </div>
                <div className="company-careers-position-meta-item">
                  <Clock className="company-careers-meta-icon" size={16} />
                  <span>{t('companyCareers.positions.position1.type')}</span>
                </div>
              </div>
              <p className="company-careers-position-description">{t('companyCareers.positions.position1.description')}</p>
              <a href="#" className="company-careers-position-link">
                {t('companyCareers.positions.position1.link')}
                <ArrowRight className="company-careers-position-arrow" size={16} />
              </a>
            </div>
            <div className="company-careers-position-card">
              <h3 className="company-careers-position-title">{t('companyCareers.positions.position2.title')}</h3>
              <div className="company-careers-position-meta">
                <div className="company-careers-position-meta-item">
                  <MapPin className="company-careers-meta-icon" size={16} />
                  <span>{t('companyCareers.positions.position2.location')}</span>
                </div>
                <div className="company-careers-position-meta-item">
                  <Clock className="company-careers-meta-icon" size={16} />
                  <span>{t('companyCareers.positions.position2.type')}</span>
                </div>
              </div>
              <p className="company-careers-position-description">{t('companyCareers.positions.position2.description')}</p>
              <a href="#" className="company-careers-position-link">
                {t('companyCareers.positions.position2.link')}
                <ArrowRight className="company-careers-position-arrow" size={16} />
              </a>
            </div>
            <div className="company-careers-position-card">
              <h3 className="company-careers-position-title">{t('companyCareers.positions.position3.title')}</h3>
              <div className="company-careers-position-meta">
                <div className="company-careers-position-meta-item">
                  <MapPin className="company-careers-meta-icon" size={16} />
                  <span>{t('companyCareers.positions.position3.location')}</span>
                </div>
                <div className="company-careers-position-meta-item">
                  <Clock className="company-careers-meta-icon" size={16} />
                  <span>{t('companyCareers.positions.position3.type')}</span>
                </div>
              </div>
              <p className="company-careers-position-description">{t('companyCareers.positions.position3.description')}</p>
              <a href="#" className="company-careers-position-link">
                {t('companyCareers.positions.position3.link')}
                <ArrowRight className="company-careers-position-arrow" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="company-careers-culture">
        <div className="company-careers-container">
          <div className="company-careers-section-header">
            <Users className="company-careers-section-icon" size={48} />
            <h2 className="company-careers-section-title">{t('companyCareers.culture.title')}</h2>
          </div>
          <div className="company-careers-culture-content">
            <p className="company-careers-description">{t('companyCareers.culture.description')}</p>
            <div className="company-careers-culture-values">
              <div className="company-careers-value-card">
                <h3 className="company-careers-value-title">{t('companyCareers.culture.value1.title')}</h3>
                <p className="company-careers-value-description">{t('companyCareers.culture.value1.description')}</p>
              </div>
              <div className="company-careers-value-card">
                <h3 className="company-careers-value-title">{t('companyCareers.culture.value2.title')}</h3>
                <p className="company-careers-value-description">{t('companyCareers.culture.value2.description')}</p>
              </div>
              <div className="company-careers-value-card">
                <h3 className="company-careers-value-title">{t('companyCareers.culture.value3.title')}</h3>
                <p className="company-careers-value-description">{t('companyCareers.culture.value3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="company-careers-contact">
        <div className="company-careers-container">
          <div className="company-careers-contact-content">
            <Mail className="company-careers-contact-icon" size={64} />
            <h2 className="company-careers-contact-title">{t('companyCareers.contact.title')}</h2>
            <p className="company-careers-contact-description">{t('companyCareers.contact.description')}</p>
            <a href={`mailto:${t('companyCareers.contact.email')}`} className="company-careers-contact-email">
              {t('companyCareers.contact.email')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

