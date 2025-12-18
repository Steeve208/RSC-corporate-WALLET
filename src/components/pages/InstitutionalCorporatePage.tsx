import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Building2, 
  Users, 
  Server, 
  Plug,
  Headphones,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Shield,
  Settings,
  MessageSquare
} from 'lucide-react';
import '../../styles/institutional-corporate-page.css';

export function InstitutionalCorporatePage() {
  const { t } = useTranslation();

  return (
    <div className="institutional-corporate-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="institutional-corporate-hero">
        <div className="institutional-corporate-hero-container">
          <div className="institutional-corporate-hero-content">
            <div className="institutional-corporate-hero-icon">
              <Building2 size={64} />
            </div>
            <h1 className="institutional-corporate-hero-title">{t('institutionalCorporate.hero.title')}</h1>
            <p className="institutional-corporate-hero-subtitle">{t('institutionalCorporate.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Blockchain Consulting */}
      <section className="institutional-corporate-consulting">
        <div className="institutional-corporate-container">
          <div className="institutional-corporate-section-header">
            <Briefcase className="institutional-corporate-section-icon" size={48} />
            <h2 className="institutional-corporate-section-title">{t('institutionalCorporate.consulting.title')}</h2>
          </div>
          <div className="institutional-corporate-consulting-content">
            <p className="institutional-corporate-description">{t('institutionalCorporate.consulting.description')}</p>
            <div className="institutional-corporate-services">
              <div className="institutional-corporate-service-card">
                <div className="institutional-corporate-service-icon">
                  <Users size={32} />
                </div>
                <h3 className="institutional-corporate-service-title">{t('institutionalCorporate.consulting.service1.title')}</h3>
                <p className="institutional-corporate-service-description">{t('institutionalCorporate.consulting.service1.description')}</p>
              </div>
              <div className="institutional-corporate-service-card">
                <div className="institutional-corporate-service-icon">
                  <Shield size={32} />
                </div>
                <h3 className="institutional-corporate-service-title">{t('institutionalCorporate.consulting.service2.title')}</h3>
                <p className="institutional-corporate-service-description">{t('institutionalCorporate.consulting.service2.description')}</p>
              </div>
              <div className="institutional-corporate-service-card">
                <div className="institutional-corporate-service-icon">
                  <Settings size={32} />
                </div>
                <h3 className="institutional-corporate-service-title">{t('institutionalCorporate.consulting.service3.title')}</h3>
                <p className="institutional-corporate-service-description">{t('institutionalCorporate.consulting.service3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Infrastructure */}
      <section className="institutional-corporate-infrastructure">
        <div className="institutional-corporate-container">
          <div className="institutional-corporate-section-header">
            <Server className="institutional-corporate-section-icon" size={48} />
            <h2 className="institutional-corporate-section-title">{t('institutionalCorporate.infrastructure.title')}</h2>
          </div>
          <div className="institutional-corporate-infrastructure-content">
            <p className="institutional-corporate-description">{t('institutionalCorporate.infrastructure.description')}</p>
            <div className="institutional-corporate-infrastructure-features">
              <div className="institutional-corporate-infrastructure-feature">
                <div className="institutional-corporate-infrastructure-feature-icon">
                  <Server size={32} />
                </div>
                <div className="institutional-corporate-infrastructure-feature-content">
                  <h3 className="institutional-corporate-infrastructure-feature-title">{t('institutionalCorporate.infrastructure.feature1.title')}</h3>
                  <p className="institutional-corporate-infrastructure-feature-description">{t('institutionalCorporate.infrastructure.feature1.description')}</p>
                </div>
              </div>
              <div className="institutional-corporate-infrastructure-feature">
                <div className="institutional-corporate-infrastructure-feature-icon">
                  <Shield size={32} />
                </div>
                <div className="institutional-corporate-infrastructure-feature-content">
                  <h3 className="institutional-corporate-infrastructure-feature-title">{t('institutionalCorporate.infrastructure.feature2.title')}</h3>
                  <p className="institutional-corporate-infrastructure-feature-description">{t('institutionalCorporate.infrastructure.feature2.description')}</p>
                </div>
              </div>
              <div className="institutional-corporate-infrastructure-feature">
                <div className="institutional-corporate-infrastructure-feature-icon">
                  <Settings size={32} />
                </div>
                <div className="institutional-corporate-infrastructure-feature-content">
                  <h3 className="institutional-corporate-infrastructure-feature-title">{t('institutionalCorporate.infrastructure.feature3.title')}</h3>
                  <p className="institutional-corporate-infrastructure-feature-description">{t('institutionalCorporate.infrastructure.feature3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Integrations */}
      <section className="institutional-corporate-integrations">
        <div className="institutional-corporate-container">
          <div className="institutional-corporate-section-header">
            <Plug className="institutional-corporate-section-icon" size={48} />
            <h2 className="institutional-corporate-section-title">{t('institutionalCorporate.integrations.title')}</h2>
          </div>
          <div className="institutional-corporate-integrations-content">
            <p className="institutional-corporate-description">{t('institutionalCorporate.integrations.description')}</p>
            <div className="institutional-corporate-integrations-grid">
              <div className="institutional-corporate-integration-card">
                <div className="institutional-corporate-integration-icon">
                  <Plug size={32} />
                </div>
                <h3 className="institutional-corporate-integration-title">{t('institutionalCorporate.integrations.integration1.title')}</h3>
                <p className="institutional-corporate-integration-description">{t('institutionalCorporate.integrations.integration1.description')}</p>
                <div className="institutional-corporate-integration-benefits">
                  <div className="institutional-corporate-integration-benefit">
                    <CheckCircle className="institutional-corporate-check-icon" size={16} />
                    <span>{t('institutionalCorporate.integrations.integration1.benefit1')}</span>
                  </div>
                  <div className="institutional-corporate-integration-benefit">
                    <CheckCircle className="institutional-corporate-check-icon" size={16} />
                    <span>{t('institutionalCorporate.integrations.integration1.benefit2')}</span>
                  </div>
                </div>
              </div>
              <div className="institutional-corporate-integration-card">
                <div className="institutional-corporate-integration-icon">
                  <Settings size={32} />
                </div>
                <h3 className="institutional-corporate-integration-title">{t('institutionalCorporate.integrations.integration2.title')}</h3>
                <p className="institutional-corporate-integration-description">{t('institutionalCorporate.integrations.integration2.description')}</p>
                <div className="institutional-corporate-integration-benefits">
                  <div className="institutional-corporate-integration-benefit">
                    <CheckCircle className="institutional-corporate-check-icon" size={16} />
                    <span>{t('institutionalCorporate.integrations.integration2.benefit1')}</span>
                  </div>
                  <div className="institutional-corporate-integration-benefit">
                    <CheckCircle className="institutional-corporate-check-icon" size={16} />
                    <span>{t('institutionalCorporate.integrations.integration2.benefit2')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Support */}
      <section className="institutional-corporate-support">
        <div className="institutional-corporate-container">
          <div className="institutional-corporate-section-header">
            <Headphones className="institutional-corporate-section-icon" size={48} />
            <h2 className="institutional-corporate-section-title">{t('institutionalCorporate.support.title')}</h2>
          </div>
          <div className="institutional-corporate-support-content">
            <p className="institutional-corporate-description">{t('institutionalCorporate.support.description')}</p>
            <div className="institutional-corporate-support-features">
              <div className="institutional-corporate-support-feature">
                <CheckCircle className="institutional-corporate-check-icon" size={24} />
                <div className="institutional-corporate-support-feature-content">
                  <h3 className="institutional-corporate-support-feature-title">{t('institutionalCorporate.support.feature1.title')}</h3>
                  <p className="institutional-corporate-support-feature-description">{t('institutionalCorporate.support.feature1.description')}</p>
                </div>
              </div>
              <div className="institutional-corporate-support-feature">
                <CheckCircle className="institutional-corporate-check-icon" size={24} />
                <div className="institutional-corporate-support-feature-content">
                  <h3 className="institutional-corporate-support-feature-title">{t('institutionalCorporate.support.feature2.title')}</h3>
                  <p className="institutional-corporate-support-feature-description">{t('institutionalCorporate.support.feature2.description')}</p>
                </div>
              </div>
              <div className="institutional-corporate-support-feature">
                <CheckCircle className="institutional-corporate-check-icon" size={24} />
                <div className="institutional-corporate-support-feature-content">
                  <h3 className="institutional-corporate-support-feature-title">{t('institutionalCorporate.support.feature3.title')}</h3>
                  <p className="institutional-corporate-support-feature-description">{t('institutionalCorporate.support.feature3.description')}</p>
                </div>
              </div>
              <div className="institutional-corporate-support-feature">
                <CheckCircle className="institutional-corporate-check-icon" size={24} />
                <div className="institutional-corporate-support-feature-content">
                  <h3 className="institutional-corporate-support-feature-title">{t('institutionalCorporate.support.feature4.title')}</h3>
                  <p className="institutional-corporate-support-feature-description">{t('institutionalCorporate.support.feature4.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="institutional-corporate-cta">
        <div className="institutional-corporate-container">
          <div className="institutional-corporate-cta-content">
            <MessageSquare className="institutional-corporate-cta-icon" size={64} />
            <h2 className="institutional-corporate-cta-title">{t('institutionalCorporate.cta.title')}</h2>
            <p className="institutional-corporate-cta-description">{t('institutionalCorporate.cta.description')}</p>
            <a href="#" className="institutional-corporate-cta-button">
              {t('institutionalCorporate.cta.button')}
              <ArrowRight className="institutional-corporate-cta-arrow" size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

