import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Briefcase, 
  Users, 
  CreditCard, 
  FileText, 
  Store, 
  Rocket,
  ArrowRight,
  Mail,
  Shield,
  CheckCircle,
  BarChart3,
  Settings,
  UserCheck,
  Lock
} from 'lucide-react';
import '../../styles/business-wallet-page.css';

export function BusinessWalletPage() {
  const { t } = useTranslation();

  return (
    <div className="business-wallet-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="business-wallet-hero">
        <div className="business-wallet-hero-container">
          <div className="business-wallet-hero-content">
            <div className="business-wallet-hero-icon">
              <Briefcase size={64} />
            </div>
            <h1 className="business-wallet-hero-title">{t('businessWallet.hero.title')}</h1>
            <p className="business-wallet-hero-subtitle">{t('businessWallet.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Designed for Business */}
      <section className="business-wallet-designed">
        <div className="business-wallet-container">
          <h2 className="business-wallet-section-title">{t('businessWallet.designed.title')}</h2>
          <div className="business-wallet-designed-content">
            <div className="business-wallet-designed-text">
              <p className="business-wallet-designed-description">{t('businessWallet.designed.description')}</p>
              <div className="business-wallet-features">
                <div className="business-wallet-feature">
                  <CheckCircle className="business-wallet-check-icon" size={20} />
                  <span>{t('businessWallet.designed.feature1')}</span>
                </div>
                <div className="business-wallet-feature">
                  <CheckCircle className="business-wallet-check-icon" size={20} />
                  <span>{t('businessWallet.designed.feature2')}</span>
                </div>
                <div className="business-wallet-feature">
                  <CheckCircle className="business-wallet-check-icon" size={20} />
                  <span>{t('businessWallet.designed.feature3')}</span>
                </div>
                <div className="business-wallet-feature">
                  <CheckCircle className="business-wallet-check-icon" size={20} />
                  <span>{t('businessWallet.designed.feature4')}</span>
                </div>
              </div>
            </div>
            <div className="business-wallet-designed-visual">
              <div className="business-wallet-visual-card">
                <Briefcase className="business-wallet-visual-icon" size={80} />
                <div className="business-wallet-visual-label">{t('businessWallet.designed.visual.label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-User (Roles) */}
      <section className="business-wallet-multiuser">
        <div className="business-wallet-container">
          <div className="business-wallet-section-header">
            <Users className="business-wallet-section-icon" size={48} />
            <h2 className="business-wallet-section-title">{t('businessWallet.multiuser.title')}</h2>
          </div>
          <div className="business-wallet-multiuser-content">
            <p className="business-wallet-description">{t('businessWallet.multiuser.description')}</p>
            <div className="business-wallet-roles-grid">
              <div className="business-wallet-role-card">
                <div className="business-wallet-role-icon">
                  <Shield size={32} />
                </div>
                <h3 className="business-wallet-role-title">{t('businessWallet.multiuser.roles.admin.title')}</h3>
                <p className="business-wallet-role-description">{t('businessWallet.multiuser.roles.admin.description')}</p>
                <ul className="business-wallet-role-permissions">
                  <li>{t('businessWallet.multiuser.roles.admin.permission1')}</li>
                  <li>{t('businessWallet.multiuser.roles.admin.permission2')}</li>
                  <li>{t('businessWallet.multiuser.roles.admin.permission3')}</li>
                </ul>
              </div>
              <div className="business-wallet-role-card">
                <div className="business-wallet-role-icon">
                  <UserCheck size={32} />
                </div>
                <h3 className="business-wallet-role-title">{t('businessWallet.multiuser.roles.manager.title')}</h3>
                <p className="business-wallet-role-description">{t('businessWallet.multiuser.roles.manager.description')}</p>
                <ul className="business-wallet-role-permissions">
                  <li>{t('businessWallet.multiuser.roles.manager.permission1')}</li>
                  <li>{t('businessWallet.multiuser.roles.manager.permission2')}</li>
                  <li>{t('businessWallet.multiuser.roles.manager.permission3')}</li>
                </ul>
              </div>
              <div className="business-wallet-role-card">
                <div className="business-wallet-role-icon">
                  <CreditCard size={32} />
                </div>
                <h3 className="business-wallet-role-title">{t('businessWallet.multiuser.roles.operator.title')}</h3>
                <p className="business-wallet-role-description">{t('businessWallet.multiuser.roles.operator.description')}</p>
                <ul className="business-wallet-role-permissions">
                  <li>{t('businessWallet.multiuser.roles.operator.permission1')}</li>
                  <li>{t('businessWallet.multiuser.roles.operator.permission2')}</li>
                  <li>{t('businessWallet.multiuser.roles.operator.permission3')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Control */}
      <section className="business-wallet-payments">
        <div className="business-wallet-container">
          <div className="business-wallet-section-header">
            <CreditCard className="business-wallet-section-icon" size={48} />
            <h2 className="business-wallet-section-title">{t('businessWallet.payments.title')}</h2>
          </div>
          <div className="business-wallet-payments-content">
            <p className="business-wallet-description">{t('businessWallet.payments.description')}</p>
            <div className="business-wallet-payment-features">
              <div className="business-wallet-payment-feature">
                <div className="business-wallet-payment-feature-icon">
                  <Lock size={24} />
                </div>
                <div className="business-wallet-payment-feature-content">
                  <h3 className="business-wallet-payment-feature-title">{t('businessWallet.payments.feature1.title')}</h3>
                  <p className="business-wallet-payment-feature-description">{t('businessWallet.payments.feature1.description')}</p>
                </div>
              </div>
              <div className="business-wallet-payment-feature">
                <div className="business-wallet-payment-feature-icon">
                  <Settings size={24} />
                </div>
                <div className="business-wallet-payment-feature-content">
                  <h3 className="business-wallet-payment-feature-title">{t('businessWallet.payments.feature2.title')}</h3>
                  <p className="business-wallet-payment-feature-description">{t('businessWallet.payments.feature2.description')}</p>
                </div>
              </div>
              <div className="business-wallet-payment-feature">
                <div className="business-wallet-payment-feature-icon">
                  <CheckCircle size={24} />
                </div>
                <div className="business-wallet-payment-feature-content">
                  <h3 className="business-wallet-payment-feature-title">{t('businessWallet.payments.feature3.title')}</h3>
                  <p className="business-wallet-payment-feature-description">{t('businessWallet.payments.feature3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History & Reports */}
      <section className="business-wallet-reports">
        <div className="business-wallet-container">
          <div className="business-wallet-section-header">
            <FileText className="business-wallet-section-icon" size={48} />
            <h2 className="business-wallet-section-title">{t('businessWallet.reports.title')}</h2>
          </div>
          <div className="business-wallet-reports-content">
            <p className="business-wallet-description">{t('businessWallet.reports.description')}</p>
            <div className="business-wallet-reports-grid">
              <div className="business-wallet-report-card">
                <BarChart3 className="business-wallet-report-icon" size={32} />
                <h3 className="business-wallet-report-title">{t('businessWallet.reports.report1.title')}</h3>
                <p className="business-wallet-report-description">{t('businessWallet.reports.report1.description')}</p>
              </div>
              <div className="business-wallet-report-card">
                <FileText className="business-wallet-report-icon" size={32} />
                <h3 className="business-wallet-report-title">{t('businessWallet.reports.report2.title')}</h3>
                <p className="business-wallet-report-description">{t('businessWallet.reports.report2.description')}</p>
              </div>
              <div className="business-wallet-report-card">
                <CreditCard className="business-wallet-report-icon" size={32} />
                <h3 className="business-wallet-report-title">{t('businessWallet.reports.report3.title')}</h3>
                <p className="business-wallet-report-description">{t('businessWallet.reports.report3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="business-wallet-cases">
        <div className="business-wallet-container">
          <h2 className="business-wallet-section-title">{t('businessWallet.cases.title')}</h2>
          <div className="business-wallet-cases-grid">
            <div className="business-wallet-case-card">
              <div className="business-wallet-case-icon">
                <Store size={40} />
              </div>
              <h3 className="business-wallet-case-title">{t('businessWallet.cases.merchants.title')}</h3>
              <p className="business-wallet-case-description">{t('businessWallet.cases.merchants.description')}</p>
              <div className="business-wallet-case-benefits">
                <div className="business-wallet-case-benefit">
                  <CheckCircle className="business-wallet-check-icon" size={16} />
                  <span>{t('businessWallet.cases.merchants.benefit1')}</span>
                </div>
                <div className="business-wallet-case-benefit">
                  <CheckCircle className="business-wallet-check-icon" size={16} />
                  <span>{t('businessWallet.cases.merchants.benefit2')}</span>
                </div>
                <div className="business-wallet-case-benefit">
                  <CheckCircle className="business-wallet-check-icon" size={16} />
                  <span>{t('businessWallet.cases.merchants.benefit3')}</span>
                </div>
              </div>
            </div>
            <div className="business-wallet-case-card">
              <div className="business-wallet-case-icon">
                <Rocket size={40} />
              </div>
              <h3 className="business-wallet-case-title">{t('businessWallet.cases.startups.title')}</h3>
              <p className="business-wallet-case-description">{t('businessWallet.cases.startups.description')}</p>
              <div className="business-wallet-case-benefits">
                <div className="business-wallet-case-benefit">
                  <CheckCircle className="business-wallet-check-icon" size={16} />
                  <span>{t('businessWallet.cases.startups.benefit1')}</span>
                </div>
                <div className="business-wallet-case-benefit">
                  <CheckCircle className="business-wallet-check-icon" size={16} />
                  <span>{t('businessWallet.cases.startups.benefit2')}</span>
                </div>
                <div className="business-wallet-case-benefit">
                  <CheckCircle className="business-wallet-check-icon" size={16} />
                  <span>{t('businessWallet.cases.startups.benefit3')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="business-wallet-cta">
        <div className="business-wallet-container">
          <div className="business-wallet-cta-content">
            <Mail className="business-wallet-cta-icon" size={64} />
            <h2 className="business-wallet-cta-title">{t('businessWallet.cta.title')}</h2>
            <p className="business-wallet-cta-description">{t('businessWallet.cta.description')}</p>
            <div className="business-wallet-cta-buttons">
              <button className="business-wallet-cta-button business-wallet-cta-button--primary">
                {t('businessWallet.cta.buttonContact')}
                <ArrowRight className="business-wallet-cta-arrow" size={20} />
              </button>
              <button className="business-wallet-cta-button business-wallet-cta-button--secondary">
                {t('businessWallet.cta.buttonRequest')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

