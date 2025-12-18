import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  FlaskConical, 
  Droplet, 
  Search,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Info
} from 'lucide-react';
import '../../styles/developers-testnet-page.css';

export function DevelopersTestnetPage() {
  const { t } = useTranslation();

  return (
    <div className="developers-testnet-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="developers-testnet-hero">
        <div className="developers-testnet-hero-container">
          <div className="developers-testnet-hero-content">
            <div className="developers-testnet-hero-icon">
              <FlaskConical size={64} />
            </div>
            <h1 className="developers-testnet-hero-title">{t('developersTestnet.hero.title')}</h1>
            <p className="developers-testnet-hero-subtitle">{t('developersTestnet.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* What is Testnet */}
      <section className="developers-testnet-what">
        <div className="developers-testnet-container">
          <div className="developers-testnet-section-header">
            <FlaskConical className="developers-testnet-section-icon" size={48} />
            <h2 className="developers-testnet-section-title">{t('developersTestnet.what.title')}</h2>
          </div>
          <div className="developers-testnet-what-content">
            <p className="developers-testnet-description">{t('developersTestnet.what.description')}</p>
            <div className="developers-testnet-benefits">
              <div className="developers-testnet-benefit-card">
                <div className="developers-testnet-benefit-icon">
                  <CheckCircle size={32} />
                </div>
                <h3 className="developers-testnet-benefit-title">{t('developersTestnet.what.benefit1.title')}</h3>
                <p className="developers-testnet-benefit-description">{t('developersTestnet.what.benefit1.description')}</p>
              </div>
              <div className="developers-testnet-benefit-card">
                <div className="developers-testnet-benefit-icon">
                  <CheckCircle size={32} />
                </div>
                <h3 className="developers-testnet-benefit-title">{t('developersTestnet.what.benefit2.title')}</h3>
                <p className="developers-testnet-benefit-description">{t('developersTestnet.what.benefit2.description')}</p>
              </div>
              <div className="developers-testnet-benefit-card">
                <div className="developers-testnet-benefit-icon">
                  <CheckCircle size={32} />
                </div>
                <h3 className="developers-testnet-benefit-title">{t('developersTestnet.what.benefit3.title')}</h3>
                <p className="developers-testnet-benefit-description">{t('developersTestnet.what.benefit3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faucet */}
      <section className="developers-testnet-faucet">
        <div className="developers-testnet-container">
          <div className="developers-testnet-section-header">
            <Droplet className="developers-testnet-section-icon" size={48} />
            <h2 className="developers-testnet-section-title">{t('developersTestnet.faucet.title')}</h2>
          </div>
          <div className="developers-testnet-faucet-content">
            <p className="developers-testnet-description">{t('developersTestnet.faucet.description')}</p>
            <div className="developers-testnet-faucet-card">
              <div className="developers-testnet-faucet-icon">
                <Droplet size={48} />
              </div>
              <h3 className="developers-testnet-faucet-title">{t('developersTestnet.faucet.card.title')}</h3>
              <p className="developers-testnet-faucet-description">{t('developersTestnet.faucet.card.description')}</p>
              <div className="developers-testnet-faucet-info">
                <div className="developers-testnet-faucet-info-item">
                  <Info className="developers-testnet-info-icon" size={20} />
                  <span>{t('developersTestnet.faucet.card.info1')}</span>
                </div>
                <div className="developers-testnet-faucet-info-item">
                  <Info className="developers-testnet-info-icon" size={20} />
                  <span>{t('developersTestnet.faucet.card.info2')}</span>
                </div>
              </div>
              <a href="#" className="developers-testnet-faucet-button">
                {t('developersTestnet.faucet.card.button')}
                <ArrowRight className="developers-testnet-faucet-arrow" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Explorer */}
      <section className="developers-testnet-explorer">
        <div className="developers-testnet-container">
          <div className="developers-testnet-section-header">
            <Search className="developers-testnet-section-icon" size={48} />
            <h2 className="developers-testnet-section-title">{t('developersTestnet.explorer.title')}</h2>
          </div>
          <div className="developers-testnet-explorer-content">
            <p className="developers-testnet-description">{t('developersTestnet.explorer.description')}</p>
            <div className="developers-testnet-explorer-card">
              <div className="developers-testnet-explorer-icon">
                <Search size={48} />
              </div>
              <h3 className="developers-testnet-explorer-title">{t('developersTestnet.explorer.card.title')}</h3>
              <p className="developers-testnet-explorer-description">{t('developersTestnet.explorer.card.description')}</p>
              <div className="developers-testnet-explorer-features">
                <div className="developers-testnet-explorer-feature">
                  <CheckCircle className="developers-testnet-check-icon" size={16} />
                  <span>{t('developersTestnet.explorer.card.feature1')}</span>
                </div>
                <div className="developers-testnet-explorer-feature">
                  <CheckCircle className="developers-testnet-check-icon" size={16} />
                  <span>{t('developersTestnet.explorer.card.feature2')}</span>
                </div>
                <div className="developers-testnet-explorer-feature">
                  <CheckCircle className="developers-testnet-check-icon" size={16} />
                  <span>{t('developersTestnet.explorer.card.feature3')}</span>
                </div>
              </div>
              <a href="#" className="developers-testnet-explorer-button">
                {t('developersTestnet.explorer.card.button')}
                <ExternalLink className="developers-testnet-explorer-arrow" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="developers-testnet-limitations">
        <div className="developers-testnet-container">
          <div className="developers-testnet-section-header">
            <AlertTriangle className="developers-testnet-section-icon" size={48} />
            <h2 className="developers-testnet-section-title">{t('developersTestnet.limitations.title')}</h2>
          </div>
          <div className="developers-testnet-limitations-content">
            <p className="developers-testnet-description">{t('developersTestnet.limitations.description')}</p>
            <div className="developers-testnet-limitations-grid">
              <div className="developers-testnet-limitation-card">
                <AlertTriangle className="developers-testnet-limitation-icon" size={32} />
                <h3 className="developers-testnet-limitation-title">{t('developersTestnet.limitations.limitation1.title')}</h3>
                <p className="developers-testnet-limitation-description">{t('developersTestnet.limitations.limitation1.description')}</p>
              </div>
              <div className="developers-testnet-limitation-card">
                <AlertTriangle className="developers-testnet-limitation-icon" size={32} />
                <h3 className="developers-testnet-limitation-title">{t('developersTestnet.limitations.limitation2.title')}</h3>
                <p className="developers-testnet-limitation-description">{t('developersTestnet.limitations.limitation2.description')}</p>
              </div>
              <div className="developers-testnet-limitation-card">
                <AlertTriangle className="developers-testnet-limitation-icon" size={32} />
                <h3 className="developers-testnet-limitation-title">{t('developersTestnet.limitations.limitation3.title')}</h3>
                <p className="developers-testnet-limitation-description">{t('developersTestnet.limitations.limitation3.description')}</p>
              </div>
              <div className="developers-testnet-limitation-card">
                <AlertTriangle className="developers-testnet-limitation-icon" size={32} />
                <h3 className="developers-testnet-limitation-title">{t('developersTestnet.limitations.limitation4.title')}</h3>
                <p className="developers-testnet-limitation-description">{t('developersTestnet.limitations.limitation4.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

