import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  QrCode, 
  Send, 
  Users, 
  Store, 
  Shield, 
  CheckCircle, 
  Zap,
  ArrowRight,
  Smartphone,
  Wallet
} from 'lucide-react';
import '../../styles/payments-page.css';

export function PaymentsPage() {
  const { t } = useTranslation();

  return (
    <div className="payments-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="payments-hero">
        <div className="payments-hero-container">
          <div className="payments-hero-content">
            <div className="payments-hero-icon">
              <QrCode size={64} />
            </div>
            <h1 className="payments-hero-title">{t('payments.hero.title')}</h1>
            <p className="payments-hero-subtitle">{t('payments.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* What are RSC Payments */}
      <section className="payments-what">
        <div className="payments-container">
          <h2 className="payments-section-title">{t('payments.what.title')}</h2>
          <div className="payments-what-content">
            <div className="payments-what-text">
              <p className="payments-what-description">{t('payments.what.description')}</p>
              <ul className="payments-what-list">
                <li>
                  <CheckCircle className="payments-check-icon" size={20} />
                  <span>{t('payments.what.benefit1')}</span>
                </li>
                <li>
                  <CheckCircle className="payments-check-icon" size={20} />
                  <span>{t('payments.what.benefit2')}</span>
                </li>
                <li>
                  <CheckCircle className="payments-check-icon" size={20} />
                  <span>{t('payments.what.benefit3')}</span>
                </li>
                <li>
                  <CheckCircle className="payments-check-icon" size={20} />
                  <span>{t('payments.what.benefit4')}</span>
                </li>
              </ul>
            </div>
            <div className="payments-what-visual">
              <div className="payments-qr-mockup">
                <QrCode className="payments-qr-icon" size={120} />
                <div className="payments-qr-label">{t('payments.what.qrLabel')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Payments */}
      <section className="payments-qr">
        <div className="payments-container">
          <div className="payments-feature-card">
            <div className="payments-feature-icon">
              <QrCode size={40} />
            </div>
            <h3 className="payments-feature-title">{t('payments.qr.title')}</h3>
            <p className="payments-feature-description">{t('payments.qr.description')}</p>
            <div className="payments-feature-steps">
              <div className="payments-feature-step">
                <div className="payments-step-number">1</div>
                <div className="payments-step-text">{t('payments.qr.step1')}</div>
              </div>
              <div className="payments-feature-step">
                <div className="payments-step-number">2</div>
                <div className="payments-step-text">{t('payments.qr.step2')}</div>
              </div>
              <div className="payments-feature-step">
                <div className="payments-step-number">3</div>
                <div className="payments-step-text">{t('payments.qr.step3')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Transfer */}
      <section className="payments-instant">
        <div className="payments-container">
          <div className="payments-feature-card payments-feature-card--reverse">
            <div className="payments-feature-icon">
              <Zap size={40} />
            </div>
            <h3 className="payments-feature-title">{t('payments.instant.title')}</h3>
            <p className="payments-feature-description">{t('payments.instant.description')}</p>
            <div className="payments-instant-benefits">
              <div className="payments-instant-benefit">
                <Zap className="payments-benefit-icon" size={24} />
                <span>{t('payments.instant.benefit1')}</span>
              </div>
              <div className="payments-instant-benefit">
                <Zap className="payments-benefit-icon" size={24} />
                <span>{t('payments.instant.benefit2')}</span>
              </div>
              <div className="payments-instant-benefit">
                <Zap className="payments-benefit-icon" size={24} />
                <span>{t('payments.instant.benefit3')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="payments-cases">
        <div className="payments-container">
          <h2 className="payments-section-title">{t('payments.cases.title')}</h2>
          <div className="payments-cases-grid">
            <div className="payments-case-card">
              <div className="payments-case-icon">
                <Users size={32} />
              </div>
              <h3 className="payments-case-title">{t('payments.cases.friends.title')}</h3>
              <p className="payments-case-description">{t('payments.cases.friends.description')}</p>
              <div className="payments-case-example">
                <div className="payments-case-scenario">
                  <span className="payments-case-label">{t('payments.cases.friends.example')}</span>
                </div>
              </div>
            </div>
            <div className="payments-case-card">
              <div className="payments-case-icon">
                <Store size={32} />
              </div>
              <h3 className="payments-case-title">{t('payments.cases.merchants.title')}</h3>
              <p className="payments-case-description">{t('payments.cases.merchants.description')}</p>
              <div className="payments-case-example">
                <div className="payments-case-scenario">
                  <span className="payments-case-label">{t('payments.cases.merchants.example')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="payments-security">
        <div className="payments-container">
          <div className="payments-security-content">
            <div className="payments-security-visual">
              <Shield className="payments-security-icon-large" size={80} />
            </div>
            <div className="payments-security-text">
              <h2 className="payments-section-title">{t('payments.security.title')}</h2>
              <p className="payments-security-description">{t('payments.security.description')}</p>
              <div className="payments-security-features">
                <div className="payments-security-feature">
                  <CheckCircle className="payments-check-icon" size={20} />
                  <span>{t('payments.security.feature1')}</span>
                </div>
                <div className="payments-security-feature">
                  <CheckCircle className="payments-check-icon" size={20} />
                  <span>{t('payments.security.feature2')}</span>
                </div>
                <div className="payments-security-feature">
                  <CheckCircle className="payments-check-icon" size={20} />
                  <span>{t('payments.security.feature3')}</span>
                </div>
                <div className="payments-security-feature">
                  <CheckCircle className="payments-check-icon" size={20} />
                  <span>{t('payments.security.feature4')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="payments-cta">
        <div className="payments-container">
          <div className="payments-cta-content">
            <Wallet className="payments-cta-icon" size={64} />
            <h2 className="payments-cta-title">{t('payments.cta.title')}</h2>
            <p className="payments-cta-description">{t('payments.cta.description')}</p>
            <button className="payments-cta-button">
              {t('payments.cta.button')}
              <ArrowRight className="payments-cta-arrow" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

