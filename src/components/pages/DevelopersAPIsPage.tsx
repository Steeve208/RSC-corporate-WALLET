import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Code, 
  Wallet, 
  CreditCard,
  FileCode,
  ArrowRight,
  Package,
  CheckCircle,
  Copy,
  ExternalLink,
  Tag
} from 'lucide-react';
import '../../styles/developers-apis-page.css';

export function DevelopersAPIsPage() {
  const { t } = useTranslation();

  return (
    <div className="developers-apis-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="developers-apis-hero">
        <div className="developers-apis-hero-container">
          <div className="developers-apis-hero-content">
            <div className="developers-apis-hero-icon">
              <Code size={64} />
            </div>
            <h1 className="developers-apis-hero-title">{t('developersAPIs.hero.title')}</h1>
            <p className="developers-apis-hero-subtitle">{t('developersAPIs.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* SDK Wallet */}
      <section className="developers-apis-wallet-sdk">
        <div className="developers-apis-container">
          <div className="developers-apis-section-header">
            <Wallet className="developers-apis-section-icon" size={48} />
            <h2 className="developers-apis-section-title">{t('developersAPIs.walletSDK.title')}</h2>
          </div>
          <div className="developers-apis-wallet-sdk-content">
            <p className="developers-apis-description">{t('developersAPIs.walletSDK.description')}</p>
            <div className="developers-apis-sdk-features">
              <div className="developers-apis-sdk-feature">
                <CheckCircle className="developers-apis-check-icon" size={20} />
                <span>{t('developersAPIs.walletSDK.feature1')}</span>
              </div>
              <div className="developers-apis-sdk-feature">
                <CheckCircle className="developers-apis-check-icon" size={20} />
                <span>{t('developersAPIs.walletSDK.feature2')}</span>
              </div>
              <div className="developers-apis-sdk-feature">
                <CheckCircle className="developers-apis-check-icon" size={20} />
                <span>{t('developersAPIs.walletSDK.feature3')}</span>
              </div>
              <div className="developers-apis-sdk-feature">
                <CheckCircle className="developers-apis-check-icon" size={20} />
                <span>{t('developersAPIs.walletSDK.feature4')}</span>
              </div>
            </div>
            <div className="developers-apis-install">
              <h3 className="developers-apis-install-title">{t('developersAPIs.walletSDK.install.title')}</h3>
              <div className="developers-apis-code-block">
                <code>{t('developersAPIs.walletSDK.install.code')}</code>
                <button className="developers-apis-copy-button" title="Copy">
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Payments */}
      <section className="developers-apis-payments-sdk">
        <div className="developers-apis-container">
          <div className="developers-apis-section-header">
            <CreditCard className="developers-apis-section-icon" size={48} />
            <h2 className="developers-apis-section-title">{t('developersAPIs.paymentsSDK.title')}</h2>
          </div>
          <div className="developers-apis-payments-sdk-content">
            <p className="developers-apis-description">{t('developersAPIs.paymentsSDK.description')}</p>
            <div className="developers-apis-sdk-features">
              <div className="developers-apis-sdk-feature">
                <CheckCircle className="developers-apis-check-icon" size={20} />
                <span>{t('developersAPIs.paymentsSDK.feature1')}</span>
              </div>
              <div className="developers-apis-sdk-feature">
                <CheckCircle className="developers-apis-check-icon" size={20} />
                <span>{t('developersAPIs.paymentsSDK.feature2')}</span>
              </div>
              <div className="developers-apis-sdk-feature">
                <CheckCircle className="developers-apis-check-icon" size={20} />
                <span>{t('developersAPIs.paymentsSDK.feature3')}</span>
              </div>
              <div className="developers-apis-sdk-feature">
                <CheckCircle className="developers-apis-check-icon" size={20} />
                <span>{t('developersAPIs.paymentsSDK.feature4')}</span>
              </div>
            </div>
            <div className="developers-apis-install">
              <h3 className="developers-apis-install-title">{t('developersAPIs.paymentsSDK.install.title')}</h3>
              <div className="developers-apis-code-block">
                <code>{t('developersAPIs.paymentsSDK.install.code')}</code>
                <button className="developers-apis-copy-button" title="Copy">
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="developers-apis-examples">
        <div className="developers-apis-container">
          <h2 className="developers-apis-section-title">{t('developersAPIs.examples.title')}</h2>
          <div className="developers-apis-examples-grid">
            <div className="developers-apis-example-card">
              <div className="developers-apis-example-icon">
                <Wallet size={32} />
              </div>
              <h3 className="developers-apis-example-title">{t('developersAPIs.examples.example1.title')}</h3>
              <p className="developers-apis-example-description">{t('developersAPIs.examples.example1.description')}</p>
              <div className="developers-apis-example-code">
                <code>{t('developersAPIs.examples.example1.code')}</code>
              </div>
              <a href="#" className="developers-apis-example-link">
                {t('developersAPIs.examples.example1.link')}
                <ArrowRight className="developers-apis-example-arrow" size={16} />
              </a>
            </div>
            <div className="developers-apis-example-card">
              <div className="developers-apis-example-icon">
                <CreditCard size={32} />
              </div>
              <h3 className="developers-apis-example-title">{t('developersAPIs.examples.example2.title')}</h3>
              <p className="developers-apis-example-description">{t('developersAPIs.examples.example2.description')}</p>
              <div className="developers-apis-example-code">
                <code>{t('developersAPIs.examples.example2.code')}</code>
              </div>
              <a href="#" className="developers-apis-example-link">
                {t('developersAPIs.examples.example2.link')}
                <ArrowRight className="developers-apis-example-arrow" size={16} />
              </a>
            </div>
            <div className="developers-apis-example-card">
              <div className="developers-apis-example-icon">
                <FileCode size={32} />
              </div>
              <h3 className="developers-apis-example-title">{t('developersAPIs.examples.example3.title')}</h3>
              <p className="developers-apis-example-description">{t('developersAPIs.examples.example3.description')}</p>
              <div className="developers-apis-example-code">
                <code>{t('developersAPIs.examples.example3.code')}</code>
              </div>
              <a href="#" className="developers-apis-example-link">
                {t('developersAPIs.examples.example3.link')}
                <ArrowRight className="developers-apis-example-arrow" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Versioning */}
      <section className="developers-apis-versioning">
        <div className="developers-apis-container">
          <div className="developers-apis-section-header">
            <Tag className="developers-apis-section-icon" size={48} />
            <h2 className="developers-apis-section-title">{t('developersAPIs.versioning.title')}</h2>
          </div>
          <div className="developers-apis-versioning-content">
            <p className="developers-apis-description">{t('developersAPIs.versioning.description')}</p>
            <div className="developers-apis-versions">
              <div className="developers-apis-version-card">
                <div className="developers-apis-version-header">
                  <Package className="developers-apis-version-icon" size={24} />
                  <div className="developers-apis-version-info">
                    <h3 className="developers-apis-version-name">{t('developersAPIs.versioning.version1.name')}</h3>
                    <span className="developers-apis-version-tag">{t('developersAPIs.versioning.version1.tag')}</span>
                  </div>
                </div>
                <p className="developers-apis-version-description">{t('developersAPIs.versioning.version1.description')}</p>
                <a href="#" className="developers-apis-version-link">
                  {t('developersAPIs.versioning.version1.link')}
                  <ExternalLink className="developers-apis-version-arrow" size={16} />
                </a>
              </div>
              <div className="developers-apis-version-card">
                <div className="developers-apis-version-header">
                  <Package className="developers-apis-version-icon" size={24} />
                  <div className="developers-apis-version-info">
                    <h3 className="developers-apis-version-name">{t('developersAPIs.versioning.version2.name')}</h3>
                    <span className="developers-apis-version-tag">{t('developersAPIs.versioning.version2.tag')}</span>
                  </div>
                </div>
                <p className="developers-apis-version-description">{t('developersAPIs.versioning.version2.description')}</p>
                <a href="#" className="developers-apis-version-link">
                  {t('developersAPIs.versioning.version2.link')}
                  <ExternalLink className="developers-apis-version-arrow" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

