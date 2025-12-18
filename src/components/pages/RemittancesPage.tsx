import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Globe, 
  Zap,
  DollarSign,
  Shield,
  CheckCircle,
  Users,
  Clock,
  ArrowRight,
  Wallet
} from 'lucide-react';
import '../../styles/remittances-page.css';

export function RemittancesPage() {
  const { t } = useTranslation();

  return (
    <div className="remittances-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="remittances-hero">
        <div className="remittances-hero-container">
          <div className="remittances-hero-content">
            <div className="remittances-hero-icon">
              <Globe size={64} />
            </div>
            <h1 className="remittances-hero-title">{t('remittances.hero.title')}</h1>
            <p className="remittances-hero-subtitle">{t('remittances.hero.subtitle')}</p>
            <a href="#" className="remittances-hero-cta">
              {t('remittances.hero.cta')}
              <ArrowRight className="remittances-hero-cta-icon" size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* What It Allows */}
      <section className="remittances-allows">
        <div className="remittances-container">
          <h2 className="remittances-section-title">{t('remittances.allows.title')}</h2>
          <div className="remittances-allows-grid">
            <div className="remittances-allows-card">
              <div className="remittances-allows-icon">
                <Users size={32} />
              </div>
              <h3 className="remittances-allows-card-title">{t('remittances.allows.feature1.title')}</h3>
              <p className="remittances-allows-card-description">{t('remittances.allows.feature1.description')}</p>
            </div>
            <div className="remittances-allows-card">
              <div className="remittances-allows-icon">
                <Zap size={32} />
              </div>
              <h3 className="remittances-allows-card-title">{t('remittances.allows.feature2.title')}</h3>
              <p className="remittances-allows-card-description">{t('remittances.allows.feature2.description')}</p>
            </div>
            <div className="remittances-allows-card">
              <div className="remittances-allows-icon">
                <DollarSign size={32} />
              </div>
              <h3 className="remittances-allows-card-title">{t('remittances.allows.feature3.title')}</h3>
              <p className="remittances-allows-card-description">{t('remittances.allows.feature3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="remittances-how">
        <div className="remittances-container">
          <h2 className="remittances-section-title">{t('remittances.how.title')}</h2>
          <div className="remittances-how-steps">
            <div className="remittances-how-step">
              <div className="remittances-how-step-number">1</div>
              <div className="remittances-how-step-content">
                <h3 className="remittances-how-step-title">{t('remittances.how.step1.title')}</h3>
                <p className="remittances-how-step-description">{t('remittances.how.step1.description')}</p>
              </div>
            </div>
            <div className="remittances-how-step">
              <div className="remittances-how-step-number">2</div>
              <div className="remittances-how-step-content">
                <h3 className="remittances-how-step-title">{t('remittances.how.step2.title')}</h3>
                <p className="remittances-how-step-description">{t('remittances.how.step2.description')}</p>
              </div>
            </div>
            <div className="remittances-how-step">
              <div className="remittances-how-step-number">3</div>
              <div className="remittances-how-step-content">
                <h3 className="remittances-how-step-title">{t('remittances.how.step3.title')}</h3>
                <p className="remittances-how-step-description">{t('remittances.how.step3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Cases */}
      <section className="remittances-cases">
        <div className="remittances-container">
          <h2 className="remittances-section-title">{t('remittances.cases.title')}</h2>
          <div className="remittances-cases-grid">
            <div className="remittances-case-card">
              <div className="remittances-case-icon">
                <Users size={32} />
              </div>
              <h3 className="remittances-case-title">{t('remittances.cases.case1.title')}</h3>
              <p className="remittances-case-description">{t('remittances.cases.case1.description')}</p>
            </div>
            <div className="remittances-case-card">
              <div className="remittances-case-icon">
                <DollarSign size={32} />
              </div>
              <h3 className="remittances-case-title">{t('remittances.cases.case2.title')}</h3>
              <p className="remittances-case-description">{t('remittances.cases.case2.description')}</p>
            </div>
            <div className="remittances-case-card">
              <div className="remittances-case-icon">
                <Clock size={32} />
              </div>
              <h3 className="remittances-case-title">{t('remittances.cases.case3.title')}</h3>
              <p className="remittances-case-description">{t('remittances.cases.case3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="remittances-security">
        <div className="remittances-container">
          <div className="remittances-security-header">
            <Shield className="remittances-security-icon" size={48} />
            <h2 className="remittances-section-title">{t('remittances.security.title')}</h2>
          </div>
          <div className="remittances-security-features">
            <div className="remittances-security-feature">
              <CheckCircle className="remittances-security-check" size={24} />
              <div className="remittances-security-feature-content">
                <h3 className="remittances-security-feature-title">{t('remittances.security.feature1.title')}</h3>
                <p className="remittances-security-feature-description">{t('remittances.security.feature1.description')}</p>
              </div>
            </div>
            <div className="remittances-security-feature">
              <CheckCircle className="remittances-security-check" size={24} />
              <div className="remittances-security-feature-content">
                <h3 className="remittances-security-feature-title">{t('remittances.security.feature2.title')}</h3>
                <p className="remittances-security-feature-description">{t('remittances.security.feature2.description')}</p>
              </div>
            </div>
            <div className="remittances-security-feature">
              <CheckCircle className="remittances-security-check" size={24} />
              <div className="remittances-security-feature-content">
                <h3 className="remittances-security-feature-title">{t('remittances.security.feature3.title')}</h3>
                <p className="remittances-security-feature-description">{t('remittances.security.feature3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="remittances-cta">
        <div className="remittances-container">
          <div className="remittances-cta-content">
            <Wallet className="remittances-cta-icon" size={64} />
            <h2 className="remittances-cta-title">{t('remittances.cta.title')}</h2>
            <p className="remittances-cta-description">{t('remittances.cta.description')}</p>
            <a href="#" className="remittances-cta-button">
              {t('remittances.cta.button')}
              <ArrowRight className="remittances-cta-button-icon" size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

