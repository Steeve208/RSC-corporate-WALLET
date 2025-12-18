import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Store, 
  Monitor, 
  Globe, 
  Send, 
  CheckCircle,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react';
import '../../styles/business-usecases-page.css';

export function BusinessUseCasesPage() {
  const { t } = useTranslation();

  return (
    <div className="business-usecases-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="business-usecases-hero">
        <div className="business-usecases-hero-container">
          <div className="business-usecases-hero-content">
            <h1 className="business-usecases-hero-title">{t('businessUseCases.hero.title')}</h1>
            <p className="business-usecases-hero-subtitle">{t('businessUseCases.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Retail */}
      <section className="business-usecases-retail">
        <div className="business-usecases-container">
          <div className="business-usecases-case">
            <div className="business-usecases-case-visual">
              <Store className="business-usecases-case-icon-large" size={80} />
            </div>
            <div className="business-usecases-case-content">
              <h2 className="business-usecases-case-title">{t('businessUseCases.retail.title')}</h2>
              <p className="business-usecases-case-description">{t('businessUseCases.retail.description')}</p>
              <div className="business-usecases-benefits">
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.retail.benefit1')}</span>
                </div>
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.retail.benefit2')}</span>
                </div>
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.retail.benefit3')}</span>
                </div>
              </div>
              <div className="business-usecases-example">
                <h3 className="business-usecases-example-title">{t('businessUseCases.retail.example.title')}</h3>
                <p className="business-usecases-example-text">{t('businessUseCases.retail.example.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Services */}
      <section className="business-usecases-digital">
        <div className="business-usecases-container">
          <div className="business-usecases-case business-usecases-case--reverse">
            <div className="business-usecases-case-visual">
              <Monitor className="business-usecases-case-icon-large" size={80} />
            </div>
            <div className="business-usecases-case-content">
              <h2 className="business-usecases-case-title">{t('businessUseCases.digital.title')}</h2>
              <p className="business-usecases-case-description">{t('businessUseCases.digital.description')}</p>
              <div className="business-usecases-benefits">
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.digital.benefit1')}</span>
                </div>
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.digital.benefit2')}</span>
                </div>
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.digital.benefit3')}</span>
                </div>
              </div>
              <div className="business-usecases-example">
                <h3 className="business-usecases-example-title">{t('businessUseCases.digital.example.title')}</h3>
                <p className="business-usecases-example-text">{t('businessUseCases.digital.example.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Platforms */}
      <section className="business-usecases-platforms">
        <div className="business-usecases-container">
          <div className="business-usecases-case">
            <div className="business-usecases-case-visual">
              <Globe className="business-usecases-case-icon-large" size={80} />
            </div>
            <div className="business-usecases-case-content">
              <h2 className="business-usecases-case-title">{t('businessUseCases.platforms.title')}</h2>
              <p className="business-usecases-case-description">{t('businessUseCases.platforms.description')}</p>
              <div className="business-usecases-benefits">
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.platforms.benefit1')}</span>
                </div>
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.platforms.benefit2')}</span>
                </div>
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.platforms.benefit3')}</span>
                </div>
              </div>
              <div className="business-usecases-example">
                <h3 className="business-usecases-example-title">{t('businessUseCases.platforms.example.title')}</h3>
                <p className="business-usecases-example-text">{t('businessUseCases.platforms.example.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remittances */}
      <section className="business-usecases-remittances">
        <div className="business-usecases-container">
          <div className="business-usecases-case business-usecases-case--reverse">
            <div className="business-usecases-case-visual">
              <Send className="business-usecases-case-icon-large" size={80} />
            </div>
            <div className="business-usecases-case-content">
              <h2 className="business-usecases-case-title">{t('businessUseCases.remittances.title')}</h2>
              <p className="business-usecases-case-description">{t('businessUseCases.remittances.description')}</p>
              <div className="business-usecases-benefits">
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.remittances.benefit1')}</span>
                </div>
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.remittances.benefit2')}</span>
                </div>
                <div className="business-usecases-benefit">
                  <CheckCircle className="business-usecases-check-icon" size={20} />
                  <span>{t('businessUseCases.remittances.benefit3')}</span>
                </div>
              </div>
              <div className="business-usecases-example">
                <h3 className="business-usecases-example-title">{t('businessUseCases.remittances.example.title')}</h3>
                <p className="business-usecases-example-text">{t('businessUseCases.remittances.example.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Examples */}
      <section className="business-usecases-examples">
        <div className="business-usecases-container">
          <h2 className="business-usecases-section-title">{t('businessUseCases.examples.title')}</h2>
          <div className="business-usecases-examples-grid">
            <div className="business-usecases-example-card">
              <div className="business-usecases-example-card-icon">
                <Store size={32} />
              </div>
              <h3 className="business-usecases-example-card-title">{t('businessUseCases.examples.example1.title')}</h3>
              <p className="business-usecases-example-card-description">{t('businessUseCases.examples.example1.description')}</p>
              <div className="business-usecases-example-card-metrics">
                <div className="business-usecases-metric">
                  <TrendingUp className="business-usecases-metric-icon" size={20} />
                  <span>{t('businessUseCases.examples.example1.metric1')}</span>
                </div>
                <div className="business-usecases-metric">
                  <DollarSign className="business-usecases-metric-icon" size={20} />
                  <span>{t('businessUseCases.examples.example1.metric2')}</span>
                </div>
              </div>
            </div>
            <div className="business-usecases-example-card">
              <div className="business-usecases-example-card-icon">
                <Monitor size={32} />
              </div>
              <h3 className="business-usecases-example-card-title">{t('businessUseCases.examples.example2.title')}</h3>
              <p className="business-usecases-example-card-description">{t('businessUseCases.examples.example2.description')}</p>
              <div className="business-usecases-example-card-metrics">
                <div className="business-usecases-metric">
                  <Users className="business-usecases-metric-icon" size={20} />
                  <span>{t('businessUseCases.examples.example2.metric1')}</span>
                </div>
                <div className="business-usecases-metric">
                  <Clock className="business-usecases-metric-icon" size={20} />
                  <span>{t('businessUseCases.examples.example2.metric2')}</span>
                </div>
              </div>
            </div>
            <div className="business-usecases-example-card">
              <div className="business-usecases-example-card-icon">
                <Globe size={32} />
              </div>
              <h3 className="business-usecases-example-card-title">{t('businessUseCases.examples.example3.title')}</h3>
              <p className="business-usecases-example-card-description">{t('businessUseCases.examples.example3.description')}</p>
              <div className="business-usecases-example-card-metrics">
                <div className="business-usecases-metric">
                  <TrendingUp className="business-usecases-metric-icon" size={20} />
                  <span>{t('businessUseCases.examples.example3.metric1')}</span>
                </div>
                <div className="business-usecases-metric">
                  <Shield className="business-usecases-metric-icon" size={20} />
                  <span>{t('businessUseCases.examples.example3.metric2')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

