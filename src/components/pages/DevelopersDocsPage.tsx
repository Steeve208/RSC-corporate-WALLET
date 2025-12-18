import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Book, 
  Rocket, 
  Code, 
  Network,
  Shield,
  FileCode,
  CheckCircle,
  ArrowRight,
  Key,
  Server,
  Activity
} from 'lucide-react';
import '../../styles/developers-docs-page.css';

export function DevelopersDocsPage() {
  const { t } = useTranslation();

  return (
    <div className="developers-docs-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="developers-docs-hero">
        <div className="developers-docs-hero-container">
          <div className="developers-docs-hero-content">
            <div className="developers-docs-hero-icon">
              <Book size={64} />
            </div>
            <h1 className="developers-docs-hero-title">{t('developersDocs.hero.title')}</h1>
            <p className="developers-docs-hero-subtitle">{t('developersDocs.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Getting Started Guide */}
      <section className="developers-docs-getting-started">
        <div className="developers-docs-container">
          <div className="developers-docs-section-header">
            <Rocket className="developers-docs-section-icon" size={48} />
            <h2 className="developers-docs-section-title">{t('developersDocs.gettingStarted.title')}</h2>
          </div>
          <div className="developers-docs-getting-started-content">
            <p className="developers-docs-description">{t('developersDocs.gettingStarted.description')}</p>
            <div className="developers-docs-steps">
              <div className="developers-docs-step">
                <div className="developers-docs-step-number">1</div>
                <div className="developers-docs-step-content">
                  <h3 className="developers-docs-step-title">{t('developersDocs.gettingStarted.step1.title')}</h3>
                  <p className="developers-docs-step-description">{t('developersDocs.gettingStarted.step1.description')}</p>
                </div>
              </div>
              <div className="developers-docs-step">
                <div className="developers-docs-step-number">2</div>
                <div className="developers-docs-step-content">
                  <h3 className="developers-docs-step-title">{t('developersDocs.gettingStarted.step2.title')}</h3>
                  <p className="developers-docs-step-description">{t('developersDocs.gettingStarted.step2.description')}</p>
                </div>
              </div>
              <div className="developers-docs-step">
                <div className="developers-docs-step-number">3</div>
                <div className="developers-docs-step-content">
                  <h3 className="developers-docs-step-title">{t('developersDocs.gettingStarted.step3.title')}</h3>
                  <p className="developers-docs-step-description">{t('developersDocs.gettingStarted.step3.description')}</p>
                </div>
              </div>
              <div className="developers-docs-step">
                <div className="developers-docs-step-number">4</div>
                <div className="developers-docs-step-content">
                  <h3 className="developers-docs-step-title">{t('developersDocs.gettingStarted.step4.title')}</h3>
                  <p className="developers-docs-step-description">{t('developersDocs.gettingStarted.step4.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet API */}
      <section className="developers-docs-wallet-api">
        <div className="developers-docs-container">
          <div className="developers-docs-section-header">
            <Code className="developers-docs-section-icon" size={48} />
            <h2 className="developers-docs-section-title">{t('developersDocs.walletAPI.title')}</h2>
          </div>
          <div className="developers-docs-wallet-api-content">
            <p className="developers-docs-description">{t('developersDocs.walletAPI.description')}</p>
            <div className="developers-docs-api-features">
              <div className="developers-docs-api-feature">
                <div className="developers-docs-api-feature-icon">
                  <Key size={32} />
                </div>
                <div className="developers-docs-api-feature-content">
                  <h3 className="developers-docs-api-feature-title">{t('developersDocs.walletAPI.feature1.title')}</h3>
                  <p className="developers-docs-api-feature-description">{t('developersDocs.walletAPI.feature1.description')}</p>
                </div>
              </div>
              <div className="developers-docs-api-feature">
                <div className="developers-docs-api-feature-icon">
                  <Network size={32} />
                </div>
                <div className="developers-docs-api-feature-content">
                  <h3 className="developers-docs-api-feature-title">{t('developersDocs.walletAPI.feature2.title')}</h3>
                  <p className="developers-docs-api-feature-description">{t('developersDocs.walletAPI.feature2.description')}</p>
                </div>
              </div>
              <div className="developers-docs-api-feature">
                <div className="developers-docs-api-feature-icon">
                  <FileCode size={32} />
                </div>
                <div className="developers-docs-api-feature-content">
                  <h3 className="developers-docs-api-feature-title">{t('developersDocs.walletAPI.feature3.title')}</h3>
                  <p className="developers-docs-api-feature-description">{t('developersDocs.walletAPI.feature3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain RPC */}
      <section className="developers-docs-rpc">
        <div className="developers-docs-container">
          <div className="developers-docs-section-header">
            <Server className="developers-docs-section-icon" size={48} />
            <h2 className="developers-docs-section-title">{t('developersDocs.rpc.title')}</h2>
          </div>
          <div className="developers-docs-rpc-content">
            <p className="developers-docs-description">{t('developersDocs.rpc.description')}</p>
            <div className="developers-docs-rpc-features">
              <div className="developers-docs-rpc-feature-card">
                <div className="developers-docs-rpc-feature-icon">
                  <Server size={32} />
                </div>
                <h3 className="developers-docs-rpc-feature-title">{t('developersDocs.rpc.feature1.title')}</h3>
                <p className="developers-docs-rpc-feature-description">{t('developersDocs.rpc.feature1.description')}</p>
              </div>
              <div className="developers-docs-rpc-feature-card">
                <div className="developers-docs-rpc-feature-icon">
                  <Network size={32} />
                </div>
                <h3 className="developers-docs-rpc-feature-title">{t('developersDocs.rpc.feature2.title')}</h3>
                <p className="developers-docs-rpc-feature-description">{t('developersDocs.rpc.feature2.description')}</p>
              </div>
              <div className="developers-docs-rpc-feature-card">
                <div className="developers-docs-rpc-feature-icon">
                  <Activity size={32} />
                </div>
                <h3 className="developers-docs-rpc-feature-title">{t('developersDocs.rpc.feature3.title')}</h3>
                <p className="developers-docs-rpc-feature-description">{t('developersDocs.rpc.feature3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="developers-docs-security">
        <div className="developers-docs-container">
          <div className="developers-docs-section-header">
            <Shield className="developers-docs-section-icon" size={48} />
            <h2 className="developers-docs-section-title">{t('developersDocs.security.title')}</h2>
          </div>
          <div className="developers-docs-security-content">
            <p className="developers-docs-description">{t('developersDocs.security.description')}</p>
            <div className="developers-docs-security-features">
              <div className="developers-docs-security-feature">
                <CheckCircle className="developers-docs-check-icon" size={24} />
                <div className="developers-docs-security-feature-content">
                  <h3 className="developers-docs-security-feature-title">{t('developersDocs.security.feature1.title')}</h3>
                  <p className="developers-docs-security-feature-description">{t('developersDocs.security.feature1.description')}</p>
                </div>
              </div>
              <div className="developers-docs-security-feature">
                <CheckCircle className="developers-docs-check-icon" size={24} />
                <div className="developers-docs-security-feature-content">
                  <h3 className="developers-docs-security-feature-title">{t('developersDocs.security.feature2.title')}</h3>
                  <p className="developers-docs-security-feature-description">{t('developersDocs.security.feature2.description')}</p>
                </div>
              </div>
              <div className="developers-docs-security-feature">
                <CheckCircle className="developers-docs-check-icon" size={24} />
                <div className="developers-docs-security-feature-content">
                  <h3 className="developers-docs-security-feature-title">{t('developersDocs.security.feature3.title')}</h3>
                  <p className="developers-docs-security-feature-description">{t('developersDocs.security.feature3.description')}</p>
                </div>
              </div>
              <div className="developers-docs-security-feature">
                <CheckCircle className="developers-docs-check-icon" size={24} />
                <div className="developers-docs-security-feature-content">
                  <h3 className="developers-docs-security-feature-title">{t('developersDocs.security.feature4.title')}</h3>
                  <p className="developers-docs-security-feature-description">{t('developersDocs.security.feature4.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="developers-docs-examples">
        <div className="developers-docs-container">
          <h2 className="developers-docs-section-title">{t('developersDocs.examples.title')}</h2>
          <div className="developers-docs-examples-grid">
            <div className="developers-docs-example-card">
              <div className="developers-docs-example-icon">
                <Code size={32} />
              </div>
              <h3 className="developers-docs-example-title">{t('developersDocs.examples.example1.title')}</h3>
              <p className="developers-docs-example-description">{t('developersDocs.examples.example1.description')}</p>
              <a href="#" className="developers-docs-example-link">
                {t('developersDocs.examples.example1.link')}
                <ArrowRight className="developers-docs-example-arrow" size={16} />
              </a>
            </div>
            <div className="developers-docs-example-card">
              <div className="developers-docs-example-icon">
                <Network size={32} />
              </div>
              <h3 className="developers-docs-example-title">{t('developersDocs.examples.example2.title')}</h3>
              <p className="developers-docs-example-description">{t('developersDocs.examples.example2.description')}</p>
              <a href="#" className="developers-docs-example-link">
                {t('developersDocs.examples.example2.link')}
                <ArrowRight className="developers-docs-example-arrow" size={16} />
              </a>
            </div>
            <div className="developers-docs-example-card">
              <div className="developers-docs-example-icon">
                <FileCode size={32} />
              </div>
              <h3 className="developers-docs-example-title">{t('developersDocs.examples.example3.title')}</h3>
              <p className="developers-docs-example-description">{t('developersDocs.examples.example3.description')}</p>
              <a href="#" className="developers-docs-example-link">
                {t('developersDocs.examples.example3.link')}
                <ArrowRight className="developers-docs-example-arrow" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

