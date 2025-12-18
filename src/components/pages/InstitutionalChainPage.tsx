import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Network, 
  Layers, 
  Users, 
  Zap,
  TrendingUp,
  Building2,
  CheckCircle,
  ArrowRight,
  Book,
  Handshake,
  Cpu,
  Activity,
  Shield
} from 'lucide-react';
import '../../styles/institutional-chain-page.css';

export function InstitutionalChainPage() {
  const { t } = useTranslation();

  return (
    <div className="institutional-chain-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="institutional-chain-hero">
        <div className="institutional-chain-hero-container">
          <div className="institutional-chain-hero-content">
            <div className="institutional-chain-hero-icon">
              <Network size={64} />
            </div>
            <h1 className="institutional-chain-hero-title">{t('institutionalChain.hero.title')}</h1>
            <p className="institutional-chain-hero-subtitle">{t('institutionalChain.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* What is RSC Chain */}
      <section className="institutional-chain-what">
        <div className="institutional-chain-container">
          <div className="institutional-chain-section-header">
            <Network className="institutional-chain-section-icon" size={48} />
            <h2 className="institutional-chain-section-title">{t('institutionalChain.what.title')}</h2>
          </div>
          <div className="institutional-chain-what-content">
            <p className="institutional-chain-description">{t('institutionalChain.what.description')}</p>
            <div className="institutional-chain-features">
              <div className="institutional-chain-feature-card">
                <div className="institutional-chain-feature-icon">
                  <Zap size={32} />
                </div>
                <h3 className="institutional-chain-feature-title">{t('institutionalChain.what.feature1.title')}</h3>
                <p className="institutional-chain-feature-description">{t('institutionalChain.what.feature1.description')}</p>
              </div>
              <div className="institutional-chain-feature-card">
                <div className="institutional-chain-feature-icon">
                  <Shield size={32} />
                </div>
                <h3 className="institutional-chain-feature-title">{t('institutionalChain.what.feature2.title')}</h3>
                <p className="institutional-chain-feature-description">{t('institutionalChain.what.feature2.description')}</p>
              </div>
              <div className="institutional-chain-feature-card">
                <div className="institutional-chain-feature-icon">
                  <TrendingUp size={32} />
                </div>
                <h3 className="institutional-chain-feature-title">{t('institutionalChain.what.feature3.title')}</h3>
                <p className="institutional-chain-feature-description">{t('institutionalChain.what.feature3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="institutional-chain-architecture">
        <div className="institutional-chain-container">
          <div className="institutional-chain-section-header">
            <Layers className="institutional-chain-section-icon" size={48} />
            <h2 className="institutional-chain-section-title">{t('institutionalChain.architecture.title')}</h2>
          </div>
          <div className="institutional-chain-architecture-content">
            <p className="institutional-chain-description">{t('institutionalChain.architecture.description')}</p>
            <div className="institutional-chain-architecture-layers">
              <div className="institutional-chain-layer">
                <div className="institutional-chain-layer-number">1</div>
                <div className="institutional-chain-layer-content">
                  <h3 className="institutional-chain-layer-title">{t('institutionalChain.architecture.layer1.title')}</h3>
                  <p className="institutional-chain-layer-description">{t('institutionalChain.architecture.layer1.description')}</p>
                </div>
              </div>
              <div className="institutional-chain-layer">
                <div className="institutional-chain-layer-number">2</div>
                <div className="institutional-chain-layer-content">
                  <h3 className="institutional-chain-layer-title">{t('institutionalChain.architecture.layer2.title')}</h3>
                  <p className="institutional-chain-layer-description">{t('institutionalChain.architecture.layer2.description')}</p>
                </div>
              </div>
              <div className="institutional-chain-layer">
                <div className="institutional-chain-layer-number">3</div>
                <div className="institutional-chain-layer-content">
                  <h3 className="institutional-chain-layer-title">{t('institutionalChain.architecture.layer3.title')}</h3>
                  <p className="institutional-chain-layer-description">{t('institutionalChain.architecture.layer3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consensus */}
      <section className="institutional-chain-consensus">
        <div className="institutional-chain-container">
          <div className="institutional-chain-section-header">
            <Users className="institutional-chain-section-icon" size={48} />
            <h2 className="institutional-chain-section-title">{t('institutionalChain.consensus.title')}</h2>
          </div>
          <div className="institutional-chain-consensus-content">
            <p className="institutional-chain-description">{t('institutionalChain.consensus.description')}</p>
            <div className="institutional-chain-consensus-features">
              <div className="institutional-chain-consensus-feature">
                <div className="institutional-chain-consensus-feature-icon">
                  <Cpu size={32} />
                </div>
                <div className="institutional-chain-consensus-feature-content">
                  <h3 className="institutional-chain-consensus-feature-title">{t('institutionalChain.consensus.feature1.title')}</h3>
                  <p className="institutional-chain-consensus-feature-description">{t('institutionalChain.consensus.feature1.description')}</p>
                </div>
              </div>
              <div className="institutional-chain-consensus-feature">
                <div className="institutional-chain-consensus-feature-icon">
                  <Activity size={32} />
                </div>
                <div className="institutional-chain-consensus-feature-content">
                  <h3 className="institutional-chain-consensus-feature-title">{t('institutionalChain.consensus.feature2.title')}</h3>
                  <p className="institutional-chain-consensus-feature-description">{t('institutionalChain.consensus.feature2.description')}</p>
                </div>
              </div>
              <div className="institutional-chain-consensus-feature">
                <div className="institutional-chain-consensus-feature-icon">
                  <Shield size={32} />
                </div>
                <div className="institutional-chain-consensus-feature-content">
                  <h3 className="institutional-chain-consensus-feature-title">{t('institutionalChain.consensus.feature3.title')}</h3>
                  <p className="institutional-chain-consensus-feature-description">{t('institutionalChain.consensus.feature3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scalability */}
      <section className="institutional-chain-scalability">
        <div className="institutional-chain-container">
          <div className="institutional-chain-section-header">
            <TrendingUp className="institutional-chain-section-icon" size={48} />
            <h2 className="institutional-chain-section-title">{t('institutionalChain.scalability.title')}</h2>
          </div>
          <div className="institutional-chain-scalability-content">
            <p className="institutional-chain-description">{t('institutionalChain.scalability.description')}</p>
            <div className="institutional-chain-scalability-metrics">
              <div className="institutional-chain-metric-card">
                <div className="institutional-chain-metric-value">{t('institutionalChain.scalability.metric1.value')}</div>
                <div className="institutional-chain-metric-label">{t('institutionalChain.scalability.metric1.label')}</div>
              </div>
              <div className="institutional-chain-metric-card">
                <div className="institutional-chain-metric-value">{t('institutionalChain.scalability.metric2.value')}</div>
                <div className="institutional-chain-metric-label">{t('institutionalChain.scalability.metric2.label')}</div>
              </div>
              <div className="institutional-chain-metric-card">
                <div className="institutional-chain-metric-value">{t('institutionalChain.scalability.metric3.value')}</div>
                <div className="institutional-chain-metric-label">{t('institutionalChain.scalability.metric3.label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Use Cases */}
      <section className="institutional-chain-cases">
        <div className="institutional-chain-container">
          <h2 className="institutional-chain-section-title">{t('institutionalChain.cases.title')}</h2>
          <div className="institutional-chain-cases-grid">
            <div className="institutional-chain-case-card">
              <div className="institutional-chain-case-icon">
                <Building2 size={48} />
              </div>
              <h3 className="institutional-chain-case-title">{t('institutionalChain.cases.case1.title')}</h3>
              <p className="institutional-chain-case-description">{t('institutionalChain.cases.case1.description')}</p>
              <div className="institutional-chain-case-benefits">
                <div className="institutional-chain-case-benefit">
                  <CheckCircle className="institutional-chain-check-icon" size={16} />
                  <span>{t('institutionalChain.cases.case1.benefit1')}</span>
                </div>
                <div className="institutional-chain-case-benefit">
                  <CheckCircle className="institutional-chain-check-icon" size={16} />
                  <span>{t('institutionalChain.cases.case1.benefit2')}</span>
                </div>
                <div className="institutional-chain-case-benefit">
                  <CheckCircle className="institutional-chain-check-icon" size={16} />
                  <span>{t('institutionalChain.cases.case1.benefit3')}</span>
                </div>
              </div>
            </div>
            <div className="institutional-chain-case-card">
              <div className="institutional-chain-case-icon">
                <Network size={48} />
              </div>
              <h3 className="institutional-chain-case-title">{t('institutionalChain.cases.case2.title')}</h3>
              <p className="institutional-chain-case-description">{t('institutionalChain.cases.case2.description')}</p>
              <div className="institutional-chain-case-benefits">
                <div className="institutional-chain-case-benefit">
                  <CheckCircle className="institutional-chain-check-icon" size={16} />
                  <span>{t('institutionalChain.cases.case2.benefit1')}</span>
                </div>
                <div className="institutional-chain-case-benefit">
                  <CheckCircle className="institutional-chain-check-icon" size={16} />
                  <span>{t('institutionalChain.cases.case2.benefit2')}</span>
                </div>
                <div className="institutional-chain-case-benefit">
                  <CheckCircle className="institutional-chain-check-icon" size={16} />
                  <span>{t('institutionalChain.cases.case2.benefit3')}</span>
                </div>
              </div>
            </div>
            <div className="institutional-chain-case-card">
              <div className="institutional-chain-case-icon">
                <TrendingUp size={48} />
              </div>
              <h3 className="institutional-chain-case-title">{t('institutionalChain.cases.case3.title')}</h3>
              <p className="institutional-chain-case-description">{t('institutionalChain.cases.case3.description')}</p>
              <div className="institutional-chain-case-benefits">
                <div className="institutional-chain-case-benefit">
                  <CheckCircle className="institutional-chain-check-icon" size={16} />
                  <span>{t('institutionalChain.cases.case3.benefit1')}</span>
                </div>
                <div className="institutional-chain-case-benefit">
                  <CheckCircle className="institutional-chain-check-icon" size={16} />
                  <span>{t('institutionalChain.cases.case3.benefit2')}</span>
                </div>
                <div className="institutional-chain-case-benefit">
                  <CheckCircle className="institutional-chain-check-icon" size={16} />
                  <span>{t('institutionalChain.cases.case3.benefit3')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="institutional-chain-cta">
        <div className="institutional-chain-container">
          <div className="institutional-chain-cta-content">
            <div className="institutional-chain-cta-buttons">
              <a href="#" className="institutional-chain-cta-button institutional-chain-cta-button--primary">
                <Book className="institutional-chain-cta-button-icon" size={20} />
                {t('institutionalChain.cta.docs')}
                <ArrowRight className="institutional-chain-cta-arrow" size={20} />
              </a>
              <a href="#" className="institutional-chain-cta-button institutional-chain-cta-button--secondary">
                <Handshake className="institutional-chain-cta-button-icon" size={20} />
                {t('institutionalChain.cta.partnership')}
                <ArrowRight className="institutional-chain-cta-arrow" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

