import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Building2, 
  Shield, 
  Scale, 
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Lock,
  FileCheck,
  Briefcase,
  BarChart3
} from 'lucide-react';
import '../../styles/institutional-p2p-page.css';

export function InstitutionalP2PPage() {
  const { t } = useTranslation();

  return (
    <div className="institutional-p2p-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="institutional-p2p-hero">
        <div className="institutional-p2p-hero-container">
          <div className="institutional-p2p-hero-content">
            <div className="institutional-p2p-hero-icon">
              <Building2 size={64} />
            </div>
            <h1 className="institutional-p2p-hero-title">{t('institutionalP2P.hero.title')}</h1>
            <p className="institutional-p2p-hero-subtitle">{t('institutionalP2P.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* What is Institutional P2P Market */}
      <section className="institutional-p2p-what">
        <div className="institutional-p2p-container">
          <div className="institutional-p2p-section-header">
            <TrendingUp className="institutional-p2p-section-icon" size={48} />
            <h2 className="institutional-p2p-section-title">{t('institutionalP2P.what.title')}</h2>
          </div>
          <div className="institutional-p2p-what-content">
            <p className="institutional-p2p-description">{t('institutionalP2P.what.description')}</p>
            <div className="institutional-p2p-features">
              <div className="institutional-p2p-feature-card">
                <div className="institutional-p2p-feature-icon">
                  <Users size={32} />
                </div>
                <h3 className="institutional-p2p-feature-title">{t('institutionalP2P.what.feature1.title')}</h3>
                <p className="institutional-p2p-feature-description">{t('institutionalP2P.what.feature1.description')}</p>
              </div>
              <div className="institutional-p2p-feature-card">
                <div className="institutional-p2p-feature-icon">
                  <BarChart3 size={32} />
                </div>
                <h3 className="institutional-p2p-feature-title">{t('institutionalP2P.what.feature2.title')}</h3>
                <p className="institutional-p2p-feature-description">{t('institutionalP2P.what.feature2.description')}</p>
              </div>
              <div className="institutional-p2p-feature-card">
                <div className="institutional-p2p-feature-icon">
                  <Lock size={32} />
                </div>
                <h3 className="institutional-p2p-feature-title">{t('institutionalP2P.what.feature3.title')}</h3>
                <p className="institutional-p2p-feature-description">{t('institutionalP2P.what.feature3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Escrow */}
      <section className="institutional-p2p-escrow">
        <div className="institutional-p2p-container">
          <div className="institutional-p2p-section-header">
            <Shield className="institutional-p2p-section-icon" size={48} />
            <h2 className="institutional-p2p-section-title">{t('institutionalP2P.escrow.title')}</h2>
          </div>
          <div className="institutional-p2p-escrow-content">
            <p className="institutional-p2p-description">{t('institutionalP2P.escrow.description')}</p>
            <div className="institutional-p2p-escrow-features">
              <div className="institutional-p2p-escrow-feature">
                <div className="institutional-p2p-escrow-feature-icon">
                  <Lock size={32} />
                </div>
                <div className="institutional-p2p-escrow-feature-content">
                  <h3 className="institutional-p2p-escrow-feature-title">{t('institutionalP2P.escrow.feature1.title')}</h3>
                  <p className="institutional-p2p-escrow-feature-description">{t('institutionalP2P.escrow.feature1.description')}</p>
                </div>
              </div>
              <div className="institutional-p2p-escrow-feature">
                <div className="institutional-p2p-escrow-feature-icon">
                  <FileCheck size={32} />
                </div>
                <div className="institutional-p2p-escrow-feature-content">
                  <h3 className="institutional-p2p-escrow-feature-title">{t('institutionalP2P.escrow.feature2.title')}</h3>
                  <p className="institutional-p2p-escrow-feature-description">{t('institutionalP2P.escrow.feature2.description')}</p>
                </div>
              </div>
              <div className="institutional-p2p-escrow-feature">
                <div className="institutional-p2p-escrow-feature-icon">
                  <CheckCircle size={32} />
                </div>
                <div className="institutional-p2p-escrow-feature-content">
                  <h3 className="institutional-p2p-escrow-feature-title">{t('institutionalP2P.escrow.feature3.title')}</h3>
                  <p className="institutional-p2p-escrow-feature-description">{t('institutionalP2P.escrow.feature3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="institutional-p2p-compliance">
        <div className="institutional-p2p-container">
          <div className="institutional-p2p-section-header">
            <Scale className="institutional-p2p-section-icon" size={48} />
            <h2 className="institutional-p2p-section-title">{t('institutionalP2P.compliance.title')}</h2>
          </div>
          <div className="institutional-p2p-compliance-content">
            <p className="institutional-p2p-description">{t('institutionalP2P.compliance.description')}</p>
            <div className="institutional-p2p-compliance-grid">
              <div className="institutional-p2p-compliance-item">
                <CheckCircle className="institutional-p2p-check-icon" size={24} />
                <span>{t('institutionalP2P.compliance.item1')}</span>
              </div>
              <div className="institutional-p2p-compliance-item">
                <CheckCircle className="institutional-p2p-check-icon" size={24} />
                <span>{t('institutionalP2P.compliance.item2')}</span>
              </div>
              <div className="institutional-p2p-compliance-item">
                <CheckCircle className="institutional-p2p-check-icon" size={24} />
                <span>{t('institutionalP2P.compliance.item3')}</span>
              </div>
              <div className="institutional-p2p-compliance-item">
                <CheckCircle className="institutional-p2p-check-icon" size={24} />
                <span>{t('institutionalP2P.compliance.item4')}</span>
              </div>
              <div className="institutional-p2p-compliance-item">
                <CheckCircle className="institutional-p2p-check-icon" size={24} />
                <span>{t('institutionalP2P.compliance.item5')}</span>
              </div>
              <div className="institutional-p2p-compliance-item">
                <CheckCircle className="institutional-p2p-check-icon" size={24} />
                <span>{t('institutionalP2P.compliance.item6')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="institutional-p2p-cases">
        <div className="institutional-p2p-container">
          <h2 className="institutional-p2p-section-title">{t('institutionalP2P.cases.title')}</h2>
          <div className="institutional-p2p-cases-grid">
            <div className="institutional-p2p-case-card">
              <div className="institutional-p2p-case-icon">
                <Briefcase size={48} />
              </div>
              <h3 className="institutional-p2p-case-title">{t('institutionalP2P.cases.funds.title')}</h3>
              <p className="institutional-p2p-case-description">{t('institutionalP2P.cases.funds.description')}</p>
              <div className="institutional-p2p-case-benefits">
                <div className="institutional-p2p-case-benefit">
                  <CheckCircle className="institutional-p2p-check-icon" size={16} />
                  <span>{t('institutionalP2P.cases.funds.benefit1')}</span>
                </div>
                <div className="institutional-p2p-case-benefit">
                  <CheckCircle className="institutional-p2p-check-icon" size={16} />
                  <span>{t('institutionalP2P.cases.funds.benefit2')}</span>
                </div>
                <div className="institutional-p2p-case-benefit">
                  <CheckCircle className="institutional-p2p-check-icon" size={16} />
                  <span>{t('institutionalP2P.cases.funds.benefit3')}</span>
                </div>
              </div>
            </div>
            <div className="institutional-p2p-case-card">
              <div className="institutional-p2p-case-icon">
                <TrendingUp size={48} />
              </div>
              <h3 className="institutional-p2p-case-title">{t('institutionalP2P.cases.brokers.title')}</h3>
              <p className="institutional-p2p-case-description">{t('institutionalP2P.cases.brokers.description')}</p>
              <div className="institutional-p2p-case-benefits">
                <div className="institutional-p2p-case-benefit">
                  <CheckCircle className="institutional-p2p-check-icon" size={16} />
                  <span>{t('institutionalP2P.cases.brokers.benefit1')}</span>
                </div>
                <div className="institutional-p2p-case-benefit">
                  <CheckCircle className="institutional-p2p-check-icon" size={16} />
                  <span>{t('institutionalP2P.cases.brokers.benefit2')}</span>
                </div>
                <div className="institutional-p2p-case-benefit">
                  <CheckCircle className="institutional-p2p-check-icon" size={16} />
                  <span>{t('institutionalP2P.cases.brokers.benefit3')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="institutional-p2p-cta">
        <div className="institutional-p2p-container">
          <div className="institutional-p2p-cta-content">
            <Building2 className="institutional-p2p-cta-icon" size={64} />
            <h2 className="institutional-p2p-cta-title">{t('institutionalP2P.cta.title')}</h2>
            <p className="institutional-p2p-cta-description">{t('institutionalP2P.cta.description')}</p>
            <a href="#" className="institutional-p2p-cta-button">
              {t('institutionalP2P.cta.button')}
              <ArrowRight className="institutional-p2p-cta-arrow" size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

