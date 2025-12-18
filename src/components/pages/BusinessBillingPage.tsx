import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  FileText, 
  Download, 
  Calendar,
  CheckCircle,
  FileSpreadsheet,
  Receipt,
  Eye,
  ArrowRight,
  Wallet,
  Code,
  Sparkles
} from 'lucide-react';
import '../../styles/business-billing-page.css';

export function BusinessBillingPage() {
  const { t } = useTranslation();

  return (
    <div className="business-billing-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="business-billing-hero">
        <div className="business-billing-hero-container">
          <div className="business-billing-hero-content">
            <div className="business-billing-hero-icon">
              <FileText size={64} />
            </div>
            <h1 className="business-billing-hero-title">{t('businessBilling.hero.title')}</h1>
            <p className="business-billing-hero-subtitle">{t('businessBilling.hero.subtitle')}</p>
            <a href="#" className="business-billing-hero-cta">
              {t('businessBilling.hero.cta')}
              <ArrowRight className="business-billing-hero-cta-icon" size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="business-billing-features">
        <div className="business-billing-container">
          <h2 className="business-billing-section-title">{t('businessBilling.features.title')}</h2>
          <div className="business-billing-features-grid">
            <div className="business-billing-feature-card">
              <div className="business-billing-feature-icon">
                <Receipt size={32} />
              </div>
              <h3 className="business-billing-feature-title">{t('businessBilling.features.feature1.title')}</h3>
              <p className="business-billing-feature-description">{t('businessBilling.features.feature1.description')}</p>
            </div>
            <div className="business-billing-feature-card">
              <div className="business-billing-feature-icon">
                <Download size={32} />
              </div>
              <h3 className="business-billing-feature-title">{t('businessBilling.features.feature2.title')}</h3>
              <p className="business-billing-feature-description">{t('businessBilling.features.feature2.description')}</p>
            </div>
            <div className="business-billing-feature-card">
              <div className="business-billing-feature-icon">
                <Calendar size={32} />
              </div>
              <h3 className="business-billing-feature-title">{t('businessBilling.features.feature3.title')}</h3>
              <p className="business-billing-feature-description">{t('businessBilling.features.feature3.description')}</p>
            </div>
            <div className="business-billing-feature-card">
              <div className="business-billing-feature-icon">
                <FileSpreadsheet size={32} />
              </div>
              <h3 className="business-billing-feature-title">{t('businessBilling.features.feature4.title')}</h3>
              <p className="business-billing-feature-description">{t('businessBilling.features.feature4.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="business-billing-cases">
        <div className="business-billing-container">
          <h2 className="business-billing-section-title">{t('businessBilling.cases.title')}</h2>
          <div className="business-billing-cases-grid">
            <div className="business-billing-case-card">
              <div className="business-billing-case-icon">
                <FileText size={32} />
              </div>
              <h3 className="business-billing-case-title">{t('businessBilling.cases.case1.title')}</h3>
              <p className="business-billing-case-description">{t('businessBilling.cases.case1.description')}</p>
            </div>
            <div className="business-billing-case-card">
              <div className="business-billing-case-icon">
                <Receipt size={32} />
              </div>
              <h3 className="business-billing-case-title">{t('businessBilling.cases.case2.title')}</h3>
              <p className="business-billing-case-description">{t('businessBilling.cases.case2.description')}</p>
            </div>
            <div className="business-billing-case-card">
              <div className="business-billing-case-icon">
                <Eye size={32} />
              </div>
              <h3 className="business-billing-case-title">{t('businessBilling.cases.case3.title')}</h3>
              <p className="business-billing-case-description">{t('businessBilling.cases.case3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="business-billing-integration">
        <div className="business-billing-container">
          <h2 className="business-billing-section-title">{t('businessBilling.integration.title')}</h2>
          <div className="business-billing-integration-grid">
            <div className="business-billing-integration-card">
              <div className="business-billing-integration-icon">
                <Wallet size={48} />
              </div>
              <h3 className="business-billing-integration-title">{t('businessBilling.integration.wallet.title')}</h3>
              <p className="business-billing-integration-description">{t('businessBilling.integration.wallet.description')}</p>
              <div className="business-billing-integration-features">
                <div className="business-billing-integration-feature">
                  <CheckCircle className="business-billing-check-icon" size={20} />
                  <span>{t('businessBilling.integration.wallet.feature1')}</span>
                </div>
                <div className="business-billing-integration-feature">
                  <CheckCircle className="business-billing-check-icon" size={20} />
                  <span>{t('businessBilling.integration.wallet.feature2')}</span>
                </div>
                <div className="business-billing-integration-feature">
                  <CheckCircle className="business-billing-check-icon" size={20} />
                  <span>{t('businessBilling.integration.wallet.feature3')}</span>
                </div>
              </div>
            </div>
            <div className="business-billing-integration-card">
              <div className="business-billing-integration-icon">
                <Code size={48} />
              </div>
              <h3 className="business-billing-integration-title">{t('businessBilling.integration.api.title')}</h3>
              <p className="business-billing-integration-description">{t('businessBilling.integration.api.description')}</p>
              <div className="business-billing-integration-features">
                <div className="business-billing-integration-feature">
                  <CheckCircle className="business-billing-check-icon" size={20} />
                  <span>{t('businessBilling.integration.api.feature1')}</span>
                </div>
                <div className="business-billing-integration-feature">
                  <CheckCircle className="business-billing-check-icon" size={20} />
                  <span>{t('businessBilling.integration.api.feature2')}</span>
                </div>
                <div className="business-billing-integration-feature">
                  <CheckCircle className="business-billing-check-icon" size={20} />
                  <span>{t('businessBilling.integration.api.feature3')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision CTA */}
      <section className="business-billing-future">
        <div className="business-billing-container">
          <div className="business-billing-future-content">
            <Sparkles className="business-billing-future-icon" size={64} />
            <h2 className="business-billing-future-title">{t('businessBilling.future.title')}</h2>
            <p className="business-billing-future-description">{t('businessBilling.future.description')}</p>
            <div className="business-billing-future-features">
              <div className="business-billing-future-feature">
                <CheckCircle className="business-billing-check-icon" size={24} />
                <span>{t('businessBilling.future.feature1')}</span>
              </div>
              <div className="business-billing-future-feature">
                <CheckCircle className="business-billing-check-icon" size={24} />
                <span>{t('businessBilling.future.feature2')}</span>
              </div>
              <div className="business-billing-future-feature">
                <CheckCircle className="business-billing-check-icon" size={24} />
                <span>{t('businessBilling.future.feature3')}</span>
              </div>
            </div>
            <a href="#" className="business-billing-future-cta">
              {t('businessBilling.future.cta')}
              <ArrowRight className="business-billing-future-cta-icon" size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

