import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Code, 
  ShoppingCart, 
  Smartphone, 
  CreditCard, 
  Workflow, 
  Shield, 
  Book,
  ArrowRight,
  CheckCircle,
  Lock,
  Key,
  Eye,
  FileText
} from 'lucide-react';
import '../../styles/business-api-page.css';

export function BusinessAPIPage() {
  const { t } = useTranslation();

  return (
    <div className="business-api-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="business-api-hero">
        <div className="business-api-hero-container">
          <div className="business-api-hero-content">
            <div className="business-api-hero-icon">
              <Code size={64} />
            </div>
            <h1 className="business-api-hero-title">{t('businessAPI.hero.title')}</h1>
            <p className="business-api-hero-subtitle">{t('businessAPI.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* What APIs Allow */}
      <section className="business-api-what">
        <div className="business-api-container">
          <h2 className="business-api-section-title">{t('businessAPI.what.title')}</h2>
          <div className="business-api-what-content">
            <p className="business-api-description">{t('businessAPI.what.description')}</p>
            <div className="business-api-capabilities">
              <div className="business-api-capability-card">
                <div className="business-api-capability-icon">
                  <CreditCard size={32} />
                </div>
                <h3 className="business-api-capability-title">{t('businessAPI.what.capability1.title')}</h3>
                <p className="business-api-capability-description">{t('businessAPI.what.capability1.description')}</p>
              </div>
              <div className="business-api-capability-card">
                <div className="business-api-capability-icon">
                  <Workflow size={32} />
                </div>
                <h3 className="business-api-capability-title">{t('businessAPI.what.capability2.title')}</h3>
                <p className="business-api-capability-description">{t('businessAPI.what.capability2.description')}</p>
              </div>
              <div className="business-api-capability-card">
                <div className="business-api-capability-icon">
                  <FileText size={32} />
                </div>
                <h3 className="business-api-capability-title">{t('businessAPI.what.capability3.title')}</h3>
                <p className="business-api-capability-description">{t('businessAPI.what.capability3.description')}</p>
              </div>
              <div className="business-api-capability-card">
                <div className="business-api-capability-icon">
                  <Shield size={32} />
                </div>
                <h3 className="business-api-capability-title">{t('businessAPI.what.capability4.title')}</h3>
                <p className="business-api-capability-description">{t('businessAPI.what.capability4.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="business-api-cases">
        <div className="business-api-container">
          <h2 className="business-api-section-title">{t('businessAPI.cases.title')}</h2>
          <div className="business-api-cases-grid">
            <div className="business-api-case-card">
              <div className="business-api-case-icon">
                <ShoppingCart size={40} />
              </div>
              <h3 className="business-api-case-title">{t('businessAPI.cases.ecommerce.title')}</h3>
              <p className="business-api-case-description">{t('businessAPI.cases.ecommerce.description')}</p>
              <div className="business-api-case-features">
                <div className="business-api-case-feature">
                  <CheckCircle className="business-api-check-icon" size={16} />
                  <span>{t('businessAPI.cases.ecommerce.feature1')}</span>
                </div>
                <div className="business-api-case-feature">
                  <CheckCircle className="business-api-check-icon" size={16} />
                  <span>{t('businessAPI.cases.ecommerce.feature2')}</span>
                </div>
                <div className="business-api-case-feature">
                  <CheckCircle className="business-api-check-icon" size={16} />
                  <span>{t('businessAPI.cases.ecommerce.feature3')}</span>
                </div>
              </div>
            </div>
            <div className="business-api-case-card">
              <div className="business-api-case-icon">
                <Smartphone size={40} />
              </div>
              <h3 className="business-api-case-title">{t('businessAPI.cases.apps.title')}</h3>
              <p className="business-api-case-description">{t('businessAPI.cases.apps.description')}</p>
              <div className="business-api-case-features">
                <div className="business-api-case-feature">
                  <CheckCircle className="business-api-check-icon" size={16} />
                  <span>{t('businessAPI.cases.apps.feature1')}</span>
                </div>
                <div className="business-api-case-feature">
                  <CheckCircle className="business-api-check-icon" size={16} />
                  <span>{t('businessAPI.cases.apps.feature2')}</span>
                </div>
                <div className="business-api-case-feature">
                  <CheckCircle className="business-api-check-icon" size={16} />
                  <span>{t('businessAPI.cases.apps.feature3')}</span>
                </div>
              </div>
            </div>
            <div className="business-api-case-card">
              <div className="business-api-case-icon">
                <CreditCard size={40} />
              </div>
              <h3 className="business-api-case-title">{t('businessAPI.cases.pos.title')}</h3>
              <p className="business-api-case-description">{t('businessAPI.cases.pos.description')}</p>
              <div className="business-api-case-features">
                <div className="business-api-case-feature">
                  <CheckCircle className="business-api-check-icon" size={16} />
                  <span>{t('businessAPI.cases.pos.feature1')}</span>
                </div>
                <div className="business-api-case-feature">
                  <CheckCircle className="business-api-check-icon" size={16} />
                  <span>{t('businessAPI.cases.pos.feature2')}</span>
                </div>
                <div className="business-api-case-feature">
                  <CheckCircle className="business-api-check-icon" size={16} />
                  <span>{t('businessAPI.cases.pos.feature3')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Flow */}
      <section className="business-api-flow">
        <div className="business-api-container">
          <div className="business-api-section-header">
            <Workflow className="business-api-section-icon" size={48} />
            <h2 className="business-api-section-title">{t('businessAPI.flow.title')}</h2>
          </div>
          <div className="business-api-flow-content">
            <p className="business-api-description">{t('businessAPI.flow.description')}</p>
            <div className="business-api-flow-diagram">
              <div className="business-api-flow-step">
                <div className="business-api-flow-step-number">1</div>
                <div className="business-api-flow-step-content">
                  <h3 className="business-api-flow-step-title">{t('businessAPI.flow.step1.title')}</h3>
                  <p className="business-api-flow-step-description">{t('businessAPI.flow.step1.description')}</p>
                </div>
                <div className="business-api-flow-arrow">→</div>
              </div>
              <div className="business-api-flow-step">
                <div className="business-api-flow-step-number">2</div>
                <div className="business-api-flow-step-content">
                  <h3 className="business-api-flow-step-title">{t('businessAPI.flow.step2.title')}</h3>
                  <p className="business-api-flow-step-description">{t('businessAPI.flow.step2.description')}</p>
                </div>
                <div className="business-api-flow-arrow">→</div>
              </div>
              <div className="business-api-flow-step">
                <div className="business-api-flow-step-number">3</div>
                <div className="business-api-flow-step-content">
                  <h3 className="business-api-flow-step-title">{t('businessAPI.flow.step3.title')}</h3>
                  <p className="business-api-flow-step-description">{t('businessAPI.flow.step3.description')}</p>
                </div>
                <div className="business-api-flow-arrow">→</div>
              </div>
              <div className="business-api-flow-step">
                <div className="business-api-flow-step-number">4</div>
                <div className="business-api-flow-step-content">
                  <h3 className="business-api-flow-step-title">{t('businessAPI.flow.step4.title')}</h3>
                  <p className="business-api-flow-step-description">{t('businessAPI.flow.step4.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="business-api-security">
        <div className="business-api-container">
          <div className="business-api-section-header">
            <Shield className="business-api-section-icon" size={48} />
            <h2 className="business-api-section-title">{t('businessAPI.security.title')}</h2>
          </div>
          <div className="business-api-security-content">
            <p className="business-api-description">{t('businessAPI.security.description')}</p>
            <div className="business-api-security-features">
              <div className="business-api-security-feature">
                <div className="business-api-security-feature-icon">
                  <Key size={32} />
                </div>
                <div className="business-api-security-feature-content">
                  <h3 className="business-api-security-feature-title">{t('businessAPI.security.feature1.title')}</h3>
                  <p className="business-api-security-feature-description">{t('businessAPI.security.feature1.description')}</p>
                </div>
              </div>
              <div className="business-api-security-feature">
                <div className="business-api-security-feature-icon">
                  <Lock size={32} />
                </div>
                <div className="business-api-security-feature-content">
                  <h3 className="business-api-security-feature-title">{t('businessAPI.security.feature2.title')}</h3>
                  <p className="business-api-security-feature-description">{t('businessAPI.security.feature2.description')}</p>
                </div>
              </div>
              <div className="business-api-security-feature">
                <div className="business-api-security-feature-icon">
                  <Eye size={32} />
                </div>
                <div className="business-api-security-feature-content">
                  <h3 className="business-api-security-feature-title">{t('businessAPI.security.feature3.title')}</h3>
                  <p className="business-api-security-feature-description">{t('businessAPI.security.feature3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Docs Link */}
      <section className="business-api-docs">
        <div className="business-api-container">
          <div className="business-api-docs-content">
            <Book className="business-api-docs-icon" size={64} />
            <h2 className="business-api-docs-title">{t('businessAPI.docs.title')}</h2>
            <p className="business-api-docs-description">{t('businessAPI.docs.description')}</p>
            <a href="#" className="business-api-docs-link">
              {t('businessAPI.docs.link')}
              <ArrowRight className="business-api-docs-arrow" size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

