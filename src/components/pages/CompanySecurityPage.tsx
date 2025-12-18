import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Shield, 
  Lock, 
  CheckCircle,
  Key,
  Eye,
  FileCheck
} from 'lucide-react';
import '../../styles/company-security-page.css';

export function CompanySecurityPage() {
  const { t } = useTranslation();

  return (
    <div className="company-security-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="company-security-hero">
        <div className="company-security-hero-container">
          <div className="company-security-hero-content">
            <div className="company-security-hero-icon">
              <Shield size={64} />
            </div>
            <h1 className="company-security-hero-title">{t('companySecurity.hero.title')}</h1>
            <p className="company-security-hero-subtitle">{t('companySecurity.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Security Model */}
      <section className="company-security-model">
        <div className="company-security-container">
          <div className="company-security-section-header">
            <Shield className="company-security-section-icon" size={48} />
            <h2 className="company-security-section-title">{t('companySecurity.model.title')}</h2>
          </div>
          <div className="company-security-model-content">
            <p className="company-security-description">{t('companySecurity.model.description')}</p>
            <div className="company-security-model-features">
              <div className="company-security-model-feature">
                <div className="company-security-model-feature-icon">
                  <Lock size={32} />
                </div>
                <div className="company-security-model-feature-content">
                  <h3 className="company-security-model-feature-title">{t('companySecurity.model.feature1.title')}</h3>
                  <p className="company-security-model-feature-description">{t('companySecurity.model.feature1.description')}</p>
                </div>
              </div>
              <div className="company-security-model-feature">
                <div className="company-security-model-feature-icon">
                  <Key size={32} />
                </div>
                <div className="company-security-model-feature-content">
                  <h3 className="company-security-model-feature-title">{t('companySecurity.model.feature2.title')}</h3>
                  <p className="company-security-model-feature-description">{t('companySecurity.model.feature2.description')}</p>
                </div>
              </div>
              <div className="company-security-model-feature">
                <div className="company-security-model-feature-icon">
                  <Eye size={32} />
                </div>
                <div className="company-security-model-feature-content">
                  <h3 className="company-security-model-feature-title">{t('companySecurity.model.feature3.title')}</h3>
                  <p className="company-security-model-feature-description">{t('companySecurity.model.feature3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="company-security-responsibilities">
        <div className="company-security-container">
          <div className="company-security-section-header">
            <FileCheck className="company-security-section-icon" size={48} />
            <h2 className="company-security-section-title">{t('companySecurity.responsibilities.title')}</h2>
          </div>
          <div className="company-security-responsibilities-content">
            <p className="company-security-description">{t('companySecurity.responsibilities.description')}</p>
            <div className="company-security-responsibilities-grid">
              <div className="company-security-responsibility-card">
                <CheckCircle className="company-security-check-icon" size={24} />
                <h3 className="company-security-responsibility-title">{t('companySecurity.responsibilities.responsibility1.title')}</h3>
                <p className="company-security-responsibility-description">{t('companySecurity.responsibilities.responsibility1.description')}</p>
              </div>
              <div className="company-security-responsibility-card">
                <CheckCircle className="company-security-check-icon" size={24} />
                <h3 className="company-security-responsibility-title">{t('companySecurity.responsibilities.responsibility2.title')}</h3>
                <p className="company-security-responsibility-description">{t('companySecurity.responsibilities.responsibility2.description')}</p>
              </div>
              <div className="company-security-responsibility-card">
                <CheckCircle className="company-security-check-icon" size={24} />
                <h3 className="company-security-responsibility-title">{t('companySecurity.responsibilities.responsibility3.title')}</h3>
                <p className="company-security-responsibility-description">{t('companySecurity.responsibilities.responsibility3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="company-security-practices">
        <div className="company-security-container">
          <div className="company-security-section-header">
            <CheckCircle className="company-security-section-icon" size={48} />
            <h2 className="company-security-section-title">{t('companySecurity.practices.title')}</h2>
          </div>
          <div className="company-security-practices-content">
            <p className="company-security-description">{t('companySecurity.practices.description')}</p>
            <div className="company-security-practices-list">
              <div className="company-security-practice-item">
                <CheckCircle className="company-security-check-icon" size={20} />
                <span>{t('companySecurity.practices.practice1')}</span>
              </div>
              <div className="company-security-practice-item">
                <CheckCircle className="company-security-check-icon" size={20} />
                <span>{t('companySecurity.practices.practice2')}</span>
              </div>
              <div className="company-security-practice-item">
                <CheckCircle className="company-security-check-icon" size={20} />
                <span>{t('companySecurity.practices.practice3')}</span>
              </div>
              <div className="company-security-practice-item">
                <CheckCircle className="company-security-check-icon" size={20} />
                <span>{t('companySecurity.practices.practice4')}</span>
              </div>
              <div className="company-security-practice-item">
                <CheckCircle className="company-security-check-icon" size={20} />
                <span>{t('companySecurity.practices.practice5')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

