import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Coins, 
  Network, 
  TrendingUp,
  Building2,
  CheckCircle,
  ArrowRight,
  Book,
  Map,
  DollarSign,
  Activity,
  Shield
} from 'lucide-react';
import '../../styles/institutional-rsk-page.css';

export function InstitutionalRSKPage() {
  const { t } = useTranslation();

  return (
    <div className="institutional-rsk-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="institutional-rsk-hero">
        <div className="institutional-rsk-hero-container">
          <div className="institutional-rsk-hero-content">
            <div className="institutional-rsk-hero-icon">
              <Coins size={64} />
            </div>
            <h1 className="institutional-rsk-hero-title">{t('institutionalRSK.hero.title')}</h1>
            <p className="institutional-rsk-hero-subtitle">{t('institutionalRSK.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* What is RSK */}
      <section className="institutional-rsk-what">
        <div className="institutional-rsk-container">
          <div className="institutional-rsk-section-header">
            <Coins className="institutional-rsk-section-icon" size={48} />
            <h2 className="institutional-rsk-section-title">{t('institutionalRSK.what.title')}</h2>
          </div>
          <div className="institutional-rsk-what-content">
            <p className="institutional-rsk-description">{t('institutionalRSK.what.description')}</p>
            <div className="institutional-rsk-features">
              <div className="institutional-rsk-feature-card">
                <div className="institutional-rsk-feature-icon">
                  <Shield size={32} />
                </div>
                <h3 className="institutional-rsk-feature-title">{t('institutionalRSK.what.feature1.title')}</h3>
                <p className="institutional-rsk-feature-description">{t('institutionalRSK.what.feature1.description')}</p>
              </div>
              <div className="institutional-rsk-feature-card">
                <div className="institutional-rsk-feature-icon">
                  <Network size={32} />
                </div>
                <h3 className="institutional-rsk-feature-title">{t('institutionalRSK.what.feature2.title')}</h3>
                <p className="institutional-rsk-feature-description">{t('institutionalRSK.what.feature2.description')}</p>
              </div>
              <div className="institutional-rsk-feature-card">
                <div className="institutional-rsk-feature-icon">
                  <Activity size={32} />
                </div>
                <h3 className="institutional-rsk-feature-title">{t('institutionalRSK.what.feature3.title')}</h3>
                <p className="institutional-rsk-feature-description">{t('institutionalRSK.what.feature3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role in Ecosystem */}
      <section className="institutional-rsk-role">
        <div className="institutional-rsk-container">
          <div className="institutional-rsk-section-header">
            <Network className="institutional-rsk-section-icon" size={48} />
            <h2 className="institutional-rsk-section-title">{t('institutionalRSK.role.title')}</h2>
          </div>
          <div className="institutional-rsk-role-content">
            <p className="institutional-rsk-description">{t('institutionalRSK.role.description')}</p>
            <div className="institutional-rsk-role-features">
              <div className="institutional-rsk-role-feature">
                <div className="institutional-rsk-role-feature-icon">
                  <DollarSign size={32} />
                </div>
                <div className="institutional-rsk-role-feature-content">
                  <h3 className="institutional-rsk-role-feature-title">{t('institutionalRSK.role.feature1.title')}</h3>
                  <p className="institutional-rsk-role-feature-description">{t('institutionalRSK.role.feature1.description')}</p>
                </div>
              </div>
              <div className="institutional-rsk-role-feature">
                <div className="institutional-rsk-role-feature-icon">
                  <Shield size={32} />
                </div>
                <div className="institutional-rsk-role-feature-content">
                  <h3 className="institutional-rsk-role-feature-title">{t('institutionalRSK.role.feature2.title')}</h3>
                  <p className="institutional-rsk-role-feature-description">{t('institutionalRSK.role.feature2.description')}</p>
                </div>
              </div>
              <div className="institutional-rsk-role-feature">
                <div className="institutional-rsk-role-feature-icon">
                  <TrendingUp size={32} />
                </div>
                <div className="institutional-rsk-role-feature-content">
                  <h3 className="institutional-rsk-role-feature-title">{t('institutionalRSK.role.feature3.title')}</h3>
                  <p className="institutional-rsk-role-feature-description">{t('institutionalRSK.role.feature3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supply & Utility */}
      <section className="institutional-rsk-supply">
        <div className="institutional-rsk-container">
          <div className="institutional-rsk-section-header">
            <TrendingUp className="institutional-rsk-section-icon" size={48} />
            <h2 className="institutional-rsk-section-title">{t('institutionalRSK.supply.title')}</h2>
          </div>
          <div className="institutional-rsk-supply-content">
            <p className="institutional-rsk-description">{t('institutionalRSK.supply.description')}</p>
            <div className="institutional-rsk-supply-grid">
              <div className="institutional-rsk-supply-card">
                <div className="institutional-rsk-supply-icon">
                  <Coins size={40} />
                </div>
                <h3 className="institutional-rsk-supply-title">{t('institutionalRSK.supply.supply.title')}</h3>
                <div className="institutional-rsk-supply-metrics">
                  <div className="institutional-rsk-supply-metric">
                    <span className="institutional-rsk-supply-metric-label">{t('institutionalRSK.supply.supply.metric1.label')}</span>
                    <span className="institutional-rsk-supply-metric-value">{t('institutionalRSK.supply.supply.metric1.value')}</span>
                  </div>
                  <div className="institutional-rsk-supply-metric">
                    <span className="institutional-rsk-supply-metric-label">{t('institutionalRSK.supply.supply.metric2.label')}</span>
                    <span className="institutional-rsk-supply-metric-value">{t('institutionalRSK.supply.supply.metric2.value')}</span>
                  </div>
                </div>
              </div>
              <div className="institutional-rsk-supply-card">
                <div className="institutional-rsk-supply-icon">
                  <Activity size={40} />
                </div>
                <h3 className="institutional-rsk-supply-title">{t('institutionalRSK.supply.utility.title')}</h3>
                <div className="institutional-rsk-supply-utilities">
                  <div className="institutional-rsk-supply-utility">
                    <CheckCircle className="institutional-rsk-check-icon" size={16} />
                    <span>{t('institutionalRSK.supply.utility.utility1')}</span>
                  </div>
                  <div className="institutional-rsk-supply-utility">
                    <CheckCircle className="institutional-rsk-check-icon" size={16} />
                    <span>{t('institutionalRSK.supply.utility.utility2')}</span>
                  </div>
                  <div className="institutional-rsk-supply-utility">
                    <CheckCircle className="institutional-rsk-check-icon" size={16} />
                    <span>{t('institutionalRSK.supply.utility.utility3')}</span>
                  </div>
                  <div className="institutional-rsk-supply-utility">
                    <CheckCircle className="institutional-rsk-check-icon" size={16} />
                    <span>{t('institutionalRSK.supply.utility.utility4')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Use Cases */}
      <section className="institutional-rsk-cases">
        <div className="institutional-rsk-container">
          <h2 className="institutional-rsk-section-title">{t('institutionalRSK.cases.title')}</h2>
          <div className="institutional-rsk-cases-grid">
            <div className="institutional-rsk-case-card">
              <div className="institutional-rsk-case-icon">
                <Building2 size={48} />
              </div>
              <h3 className="institutional-rsk-case-title">{t('institutionalRSK.cases.case1.title')}</h3>
              <p className="institutional-rsk-case-description">{t('institutionalRSK.cases.case1.description')}</p>
              <div className="institutional-rsk-case-benefits">
                <div className="institutional-rsk-case-benefit">
                  <CheckCircle className="institutional-rsk-check-icon" size={16} />
                  <span>{t('institutionalRSK.cases.case1.benefit1')}</span>
                </div>
                <div className="institutional-rsk-case-benefit">
                  <CheckCircle className="institutional-rsk-check-icon" size={16} />
                  <span>{t('institutionalRSK.cases.case1.benefit2')}</span>
                </div>
              </div>
            </div>
            <div className="institutional-rsk-case-card">
              <div className="institutional-rsk-case-icon">
                <Network size={48} />
              </div>
              <h3 className="institutional-rsk-case-title">{t('institutionalRSK.cases.case2.title')}</h3>
              <p className="institutional-rsk-case-description">{t('institutionalRSK.cases.case2.description')}</p>
              <div className="institutional-rsk-case-benefits">
                <div className="institutional-rsk-case-benefit">
                  <CheckCircle className="institutional-rsk-check-icon" size={16} />
                  <span>{t('institutionalRSK.cases.case2.benefit1')}</span>
                </div>
                <div className="institutional-rsk-case-benefit">
                  <CheckCircle className="institutional-rsk-check-icon" size={16} />
                  <span>{t('institutionalRSK.cases.case2.benefit2')}</span>
                </div>
              </div>
            </div>
            <div className="institutional-rsk-case-card">
              <div className="institutional-rsk-case-icon">
                <TrendingUp size={48} />
              </div>
              <h3 className="institutional-rsk-case-title">{t('institutionalRSK.cases.case3.title')}</h3>
              <p className="institutional-rsk-case-description">{t('institutionalRSK.cases.case3.description')}</p>
              <div className="institutional-rsk-case-benefits">
                <div className="institutional-rsk-case-benefit">
                  <CheckCircle className="institutional-rsk-check-icon" size={16} />
                  <span>{t('institutionalRSK.cases.case3.benefit1')}</span>
                </div>
                <div className="institutional-rsk-case-benefit">
                  <CheckCircle className="institutional-rsk-check-icon" size={16} />
                  <span>{t('institutionalRSK.cases.case3.benefit2')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap / Docs */}
      <section className="institutional-rsk-docs">
        <div className="institutional-rsk-container">
          <div className="institutional-rsk-docs-content">
            <div className="institutional-rsk-docs-buttons">
              <a href="#" className="institutional-rsk-docs-button institutional-rsk-docs-button--primary">
                <Map className="institutional-rsk-docs-button-icon" size={20} />
                {t('institutionalRSK.docs.roadmap')}
                <ArrowRight className="institutional-rsk-docs-arrow" size={20} />
              </a>
              <a href="#" className="institutional-rsk-docs-button institutional-rsk-docs-button--secondary">
                <Book className="institutional-rsk-docs-button-icon" size={20} />
                {t('institutionalRSK.docs.documentation')}
                <ArrowRight className="institutional-rsk-docs-arrow" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

