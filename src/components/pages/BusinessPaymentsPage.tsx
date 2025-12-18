import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  CreditCard, 
  QrCode, 
  Zap, 
  TrendingDown, 
  Wallet, 
  Store,
  ArrowRight,
  Mail,
  CheckCircle,
  Smartphone,
  Clock,
  DollarSign
} from 'lucide-react';
import '../../styles/business-payments-page.css';

export function BusinessPaymentsPage() {
  const { t } = useTranslation();

  return (
    <div className="business-payments-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="business-payments-hero">
        <div className="business-payments-hero-container">
          <div className="business-payments-hero-content">
            <div className="business-payments-hero-icon">
              <CreditCard size={64} />
            </div>
            <h1 className="business-payments-hero-title">{t('businessPayments.hero.title')}</h1>
            <p className="business-payments-hero-subtitle">{t('businessPayments.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* QR Collections */}
      <section className="business-payments-qr">
        <div className="business-payments-container">
          <div className="business-payments-section-header">
            <QrCode className="business-payments-section-icon" size={48} />
            <h2 className="business-payments-section-title">{t('businessPayments.qr.title')}</h2>
          </div>
          <div className="business-payments-qr-content">
            <div className="business-payments-qr-text">
              <p className="business-payments-description">{t('businessPayments.qr.description')}</p>
              <div className="business-payments-features">
                <div className="business-payments-feature">
                  <CheckCircle className="business-payments-check-icon" size={20} />
                  <span>{t('businessPayments.qr.feature1')}</span>
                </div>
                <div className="business-payments-feature">
                  <CheckCircle className="business-payments-check-icon" size={20} />
                  <span>{t('businessPayments.qr.feature2')}</span>
                </div>
                <div className="business-payments-feature">
                  <CheckCircle className="business-payments-check-icon" size={20} />
                  <span>{t('businessPayments.qr.feature3')}</span>
                </div>
              </div>
            </div>
            <div className="business-payments-qr-visual">
              <div className="business-payments-qr-mockup">
                <QrCode className="business-payments-qr-icon" size={120} />
                <div className="business-payments-qr-label">{t('businessPayments.qr.visual.label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fast Payments */}
      <section className="business-payments-fast">
        <div className="business-payments-container">
          <div className="business-payments-section-header">
            <Zap className="business-payments-section-icon" size={48} />
            <h2 className="business-payments-section-title">{t('businessPayments.fast.title')}</h2>
          </div>
          <div className="business-payments-fast-content">
            <p className="business-payments-description">{t('businessPayments.fast.description')}</p>
            <div className="business-payments-fast-grid">
              <div className="business-payments-fast-card">
                <Clock className="business-payments-fast-icon" size={32} />
                <h3 className="business-payments-fast-title">{t('businessPayments.fast.benefit1.title')}</h3>
                <p className="business-payments-fast-description">{t('businessPayments.fast.benefit1.description')}</p>
              </div>
              <div className="business-payments-fast-card">
                <DollarSign className="business-payments-fast-icon" size={32} />
                <h3 className="business-payments-fast-title">{t('businessPayments.fast.benefit2.title')}</h3>
                <p className="business-payments-fast-description">{t('businessPayments.fast.benefit2.description')}</p>
              </div>
              <div className="business-payments-fast-card">
                <Smartphone className="business-payments-fast-icon" size={32} />
                <h3 className="business-payments-fast-title">{t('businessPayments.fast.benefit3.title')}</h3>
                <p className="business-payments-fast-description">{t('businessPayments.fast.benefit3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Less Friction than Banks */}
      <section className="business-payments-friction">
        <div className="business-payments-container">
          <div className="business-payments-section-header">
            <TrendingDown className="business-payments-section-icon" size={48} />
            <h2 className="business-payments-section-title">{t('businessPayments.friction.title')}</h2>
          </div>
          <div className="business-payments-friction-content">
            <p className="business-payments-description">{t('businessPayments.friction.description')}</p>
            <div className="business-payments-comparison">
              <div className="business-payments-comparison-card business-payments-comparison-card--bad">
                <h3 className="business-payments-comparison-title">{t('businessPayments.friction.banks.title')}</h3>
                <ul className="business-payments-comparison-list">
                  <li>{t('businessPayments.friction.banks.point1')}</li>
                  <li>{t('businessPayments.friction.banks.point2')}</li>
                  <li>{t('businessPayments.friction.banks.point3')}</li>
                  <li>{t('businessPayments.friction.banks.point4')}</li>
                </ul>
              </div>
              <div className="business-payments-comparison-card business-payments-comparison-card--good">
                <h3 className="business-payments-comparison-title">{t('businessPayments.friction.rsc.title')}</h3>
                <ul className="business-payments-comparison-list">
                  <li>{t('businessPayments.friction.rsc.point1')}</li>
                  <li>{t('businessPayments.friction.rsc.point2')}</li>
                  <li>{t('businessPayments.friction.rsc.point3')}</li>
                  <li>{t('businessPayments.friction.rsc.point4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSC Wallet Integration */}
      <section className="business-payments-integration">
        <div className="business-payments-container">
          <div className="business-payments-section-header">
            <Wallet className="business-payments-section-icon" size={48} />
            <h2 className="business-payments-section-title">{t('businessPayments.integration.title')}</h2>
          </div>
          <div className="business-payments-integration-content">
            <p className="business-payments-description">{t('businessPayments.integration.description')}</p>
            <div className="business-payments-integration-features">
              <div className="business-payments-integration-feature">
                <div className="business-payments-integration-feature-icon">
                  <Wallet size={32} />
                </div>
                <div className="business-payments-integration-feature-content">
                  <h3 className="business-payments-integration-feature-title">{t('businessPayments.integration.feature1.title')}</h3>
                  <p className="business-payments-integration-feature-description">{t('businessPayments.integration.feature1.description')}</p>
                </div>
              </div>
              <div className="business-payments-integration-feature">
                <div className="business-payments-integration-feature-icon">
                  <CreditCard size={32} />
                </div>
                <div className="business-payments-integration-feature-content">
                  <h3 className="business-payments-integration-feature-title">{t('businessPayments.integration.feature2.title')}</h3>
                  <p className="business-payments-integration-feature-description">{t('businessPayments.integration.feature2.description')}</p>
                </div>
              </div>
              <div className="business-payments-integration-feature">
                <div className="business-payments-integration-feature-icon">
                  <QrCode size={32} />
                </div>
                <div className="business-payments-integration-feature-content">
                  <h3 className="business-payments-integration-feature-title">{t('businessPayments.integration.feature3.title')}</h3>
                  <p className="business-payments-integration-feature-description">{t('businessPayments.integration.feature3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Cases */}
      <section className="business-payments-cases">
        <div className="business-payments-container">
          <h2 className="business-payments-section-title">{t('businessPayments.cases.title')}</h2>
          <div className="business-payments-cases-grid">
            <div className="business-payments-case-card">
              <div className="business-payments-case-icon">
                <Store size={40} />
              </div>
              <h3 className="business-payments-case-title">{t('businessPayments.cases.case1.title')}</h3>
              <p className="business-payments-case-description">{t('businessPayments.cases.case1.description')}</p>
              <div className="business-payments-case-result">
                <span className="business-payments-case-result-label">{t('businessPayments.cases.case1.result')}</span>
              </div>
            </div>
            <div className="business-payments-case-card">
              <div className="business-payments-case-icon">
                <Smartphone size={40} />
              </div>
              <h3 className="business-payments-case-title">{t('businessPayments.cases.case2.title')}</h3>
              <p className="business-payments-case-description">{t('businessPayments.cases.case2.description')}</p>
              <div className="business-payments-case-result">
                <span className="business-payments-case-result-label">{t('businessPayments.cases.case2.result')}</span>
              </div>
            </div>
            <div className="business-payments-case-card">
              <div className="business-payments-case-icon">
                <CreditCard size={40} />
              </div>
              <h3 className="business-payments-case-title">{t('businessPayments.cases.case3.title')}</h3>
              <p className="business-payments-case-description">{t('businessPayments.cases.case3.description')}</p>
              <div className="business-payments-case-result">
                <span className="business-payments-case-result-label">{t('businessPayments.cases.case3.result')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="business-payments-cta">
        <div className="business-payments-container">
          <div className="business-payments-cta-content">
            <CreditCard className="business-payments-cta-icon" size={64} />
            <h2 className="business-payments-cta-title">{t('businessPayments.cta.title')}</h2>
            <p className="business-payments-cta-description">{t('businessPayments.cta.description')}</p>
            <div className="business-payments-cta-buttons">
              <button className="business-payments-cta-button business-payments-cta-button--primary">
                {t('businessPayments.cta.buttonStart')}
                <ArrowRight className="business-payments-cta-arrow" size={20} />
              </button>
              <button className="business-payments-cta-button business-payments-cta-button--secondary">
                <Mail className="business-payments-cta-icon-small" size={18} />
                {t('businessPayments.cta.buttonContact')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

