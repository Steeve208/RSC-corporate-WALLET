import { useState } from 'react';
import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  BookOpen, 
  Wallet, 
  Shield, 
  Key, 
  PlayCircle, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  Lock,
  Eye
} from 'lucide-react';
import '../../styles/education-page.css';

export function EducationPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="education-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="education-hero">
        <div className="education-hero-container">
          <div className="education-hero-content">
            <div className="education-hero-icon">
              <BookOpen size={64} />
            </div>
            <h1 className="education-hero-title">{t('education.hero.title')}</h1>
            <p className="education-hero-subtitle">{t('education.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* What is a Wallet */}
      <section className="education-wallet">
        <div className="education-container">
          <div className="education-section-header">
            <Wallet className="education-section-icon" size={48} />
            <h2 className="education-section-title">{t('education.wallet.title')}</h2>
          </div>
          <div className="education-content">
            <p className="education-description">{t('education.wallet.description')}</p>
            <div className="education-features">
              <div className="education-feature">
                <CheckCircle className="education-check-icon" size={20} />
                <span>{t('education.wallet.feature1')}</span>
              </div>
              <div className="education-feature">
                <CheckCircle className="education-check-icon" size={20} />
                <span>{t('education.wallet.feature2')}</span>
              </div>
              <div className="education-feature">
                <CheckCircle className="education-check-icon" size={20} />
                <span>{t('education.wallet.feature3')}</span>
              </div>
              <div className="education-feature">
                <CheckCircle className="education-check-icon" size={20} />
                <span>{t('education.wallet.feature4')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Non-Custodial */}
      <section className="education-noncustodial">
        <div className="education-container">
          <div className="education-section-header">
            <Shield className="education-section-icon" size={48} />
            <h2 className="education-section-title">{t('education.noncustodial.title')}</h2>
          </div>
          <div className="education-content">
            <p className="education-description">{t('education.noncustodial.description')}</p>
            <div className="education-comparison">
              <div className="education-comparison-card education-comparison-card--bad">
                <h3 className="education-comparison-title">{t('education.noncustodial.custodial.title')}</h3>
                <ul className="education-comparison-list">
                  <li>{t('education.noncustodial.custodial.point1')}</li>
                  <li>{t('education.noncustodial.custodial.point2')}</li>
                  <li>{t('education.noncustodial.custodial.point3')}</li>
                </ul>
              </div>
              <div className="education-comparison-card education-comparison-card--good">
                <h3 className="education-comparison-title">{t('education.noncustodial.noncustodial.title')}</h3>
                <ul className="education-comparison-list">
                  <li>{t('education.noncustodial.noncustodial.point1')}</li>
                  <li>{t('education.noncustodial.noncustodial.point2')}</li>
                  <li>{t('education.noncustodial.noncustodial.point3')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Protect Your Seed */}
      <section className="education-seed">
        <div className="education-container">
          <div className="education-section-header">
            <Key className="education-section-icon" size={48} />
            <h2 className="education-section-title">{t('education.seed.title')}</h2>
          </div>
          <div className="education-content">
            <div className="education-alert">
              <AlertTriangle className="education-alert-icon" size={24} />
              <p className="education-alert-text">{t('education.seed.warning')}</p>
            </div>
            <div className="education-steps">
              <div className="education-step">
                <div className="education-step-number">1</div>
                <div className="education-step-content">
                  <h3 className="education-step-title">{t('education.seed.step1.title')}</h3>
                  <p className="education-step-description">{t('education.seed.step1.description')}</p>
                </div>
              </div>
              <div className="education-step">
                <div className="education-step-number">2</div>
                <div className="education-step-content">
                  <h3 className="education-step-title">{t('education.seed.step2.title')}</h3>
                  <p className="education-step-description">{t('education.seed.step2.description')}</p>
                </div>
              </div>
              <div className="education-step">
                <div className="education-step-number">3</div>
                <div className="education-step-content">
                  <h3 className="education-step-title">{t('education.seed.step3.title')}</h3>
                  <p className="education-step-description">{t('education.seed.step3.description')}</p>
                </div>
              </div>
              <div className="education-step">
                <div className="education-step-number">4</div>
                <div className="education-step-content">
                  <h3 className="education-step-title">{t('education.seed.step4.title')}</h3>
                  <p className="education-step-description">{t('education.seed.step4.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Steps in RSC */}
      <section className="education-firststeps">
        <div className="education-container">
          <div className="education-section-header">
            <PlayCircle className="education-section-icon" size={48} />
            <h2 className="education-section-title">{t('education.firstSteps.title')}</h2>
          </div>
          <div className="education-content">
            <div className="education-guide">
              <div className="education-guide-item">
                <div className="education-guide-icon">
                  <Wallet size={32} />
                </div>
                <div className="education-guide-content">
                  <h3 className="education-guide-title">{t('education.firstSteps.step1.title')}</h3>
                  <p className="education-guide-description">{t('education.firstSteps.step1.description')}</p>
                </div>
              </div>
              <div className="education-guide-item">
                <div className="education-guide-icon">
                  <Key size={32} />
                </div>
                <div className="education-guide-content">
                  <h3 className="education-guide-title">{t('education.firstSteps.step2.title')}</h3>
                  <p className="education-guide-description">{t('education.firstSteps.step2.description')}</p>
                </div>
              </div>
              <div className="education-guide-item">
                <div className="education-guide-icon">
                  <Lock size={32} />
                </div>
                <div className="education-guide-content">
                  <h3 className="education-guide-title">{t('education.firstSteps.step3.title')}</h3>
                  <p className="education-guide-description">{t('education.firstSteps.step3.description')}</p>
                </div>
              </div>
              <div className="education-guide-item">
                <div className="education-guide-icon">
                  <Eye size={32} />
                </div>
                <div className="education-guide-content">
                  <h3 className="education-guide-title">{t('education.firstSteps.step4.title')}</h3>
                  <p className="education-guide-description">{t('education.firstSteps.step4.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="education-faq">
        <div className="education-container">
          <div className="education-section-header">
            <HelpCircle className="education-section-icon" size={48} />
            <h2 className="education-section-title">{t('education.faq.title')}</h2>
          </div>
          <div className="education-faq-list">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="education-faq-item">
                <button
                  className="education-faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{t(`education.faq.q${index}.question`)}</span>
                  {openFaq === index ? (
                    <ChevronUp className="education-faq-icon" size={20} />
                  ) : (
                    <ChevronDown className="education-faq-icon" size={20} />
                  )}
                </button>
                {openFaq === index && (
                  <div className="education-faq-answer">
                    <p>{t(`education.faq.q${index}.answer`)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

