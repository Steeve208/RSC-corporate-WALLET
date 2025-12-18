import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Send, 
  ArrowDownLeft, 
  Wallet, 
  TrendingUp, 
  QrCode, 
  Shield, 
  Key, 
  Fingerprint, 
  Eye,
  Check,
  Download,
  ArrowRight,
  Lock,
  Smartphone
} from 'lucide-react';
import '../../styles/wallet-page.css';

export function WalletPage() {
  const { t } = useTranslation();

  return (
    <div className="wallet-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="wallet-hero">
        <div className="wallet-hero-container">
          <div className="wallet-hero-content">
            <h1 className="wallet-hero-title">{t('wallet.hero.title')}</h1>
            <p className="wallet-hero-subtitle">{t('wallet.hero.subtitle')}</p>
            <div className="wallet-hero-cta">
              <button className="wallet-cta-primary">
                {t('wallet.hero.ctaDownload')}
              </button>
              <button className="wallet-cta-secondary">
                {t('wallet.hero.ctaCreate')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="wallet-features">
        <div className="wallet-container">
          <h2 className="wallet-section-title">{t('wallet.features.title')}</h2>
          <div className="wallet-features-grid">
            <div className="wallet-feature-card">
              <div className="wallet-feature-icon">
                <Send className="wallet-icon" size={32} />
              </div>
              <h3 className="wallet-feature-title">{t('wallet.features.sendReceive.title')}</h3>
              <p className="wallet-feature-description">{t('wallet.features.sendReceive.description')}</p>
            </div>
            <div className="wallet-feature-card">
              <div className="wallet-feature-icon">
                <Wallet className="wallet-icon" size={32} />
              </div>
              <h3 className="wallet-feature-title">{t('wallet.features.balance.title')}</h3>
              <p className="wallet-feature-description">{t('wallet.features.balance.description')}</p>
            </div>
            <div className="wallet-feature-card">
              <div className="wallet-feature-icon">
                <TrendingUp className="wallet-icon" size={32} />
              </div>
              <h3 className="wallet-feature-title">{t('wallet.features.staking.title')}</h3>
              <p className="wallet-feature-description">{t('wallet.features.staking.description')}</p>
            </div>
            <div className="wallet-feature-card">
              <div className="wallet-feature-icon">
                <QrCode className="wallet-icon" size={32} />
              </div>
              <h3 className="wallet-feature-title">{t('wallet.features.qrPayments.title')}</h3>
              <p className="wallet-feature-description">{t('wallet.features.qrPayments.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="wallet-how-it-works">
        <div className="wallet-container">
          <h2 className="wallet-section-title">{t('wallet.howItWorks.title')}</h2>
          <div className="wallet-steps">
            <div className="wallet-step">
              <div className="wallet-step-number">1</div>
              <div className="wallet-step-content">
                <h3 className="wallet-step-title">{t('wallet.howItWorks.step1.title')}</h3>
                <p className="wallet-step-description">{t('wallet.howItWorks.step1.description')}</p>
              </div>
            </div>
            <div className="wallet-step">
              <div className="wallet-step-number">2</div>
              <div className="wallet-step-content">
                <h3 className="wallet-step-title">{t('wallet.howItWorks.step2.title')}</h3>
                <p className="wallet-step-description">{t('wallet.howItWorks.step2.description')}</p>
              </div>
            </div>
            <div className="wallet-step">
              <div className="wallet-step-number">3</div>
              <div className="wallet-step-content">
                <h3 className="wallet-step-title">{t('wallet.howItWorks.step3.title')}</h3>
                <p className="wallet-step-description">{t('wallet.howItWorks.step3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="wallet-security">
        <div className="wallet-container">
          <h2 className="wallet-section-title">{t('wallet.security.title')}</h2>
          <div className="wallet-security-grid">
            <div className="wallet-security-card">
              <div className="wallet-security-icon">
                <Shield className="wallet-icon" size={28} />
              </div>
              <h3 className="wallet-security-title">{t('wallet.security.nonCustodial.title')}</h3>
              <p className="wallet-security-description">{t('wallet.security.nonCustodial.description')}</p>
            </div>
            <div className="wallet-security-card">
              <div className="wallet-security-icon">
                <Key className="wallet-icon" size={28} />
              </div>
              <h3 className="wallet-security-title">{t('wallet.security.seedPhrase.title')}</h3>
              <p className="wallet-security-description">{t('wallet.security.seedPhrase.description')}</p>
            </div>
            <div className="wallet-security-card">
              <div className="wallet-security-icon">
                <Fingerprint className="wallet-icon" size={28} />
              </div>
              <h3 className="wallet-security-title">{t('wallet.security.biometry.title')}</h3>
              <p className="wallet-security-description">{t('wallet.security.biometry.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="wallet-screenshots">
        <div className="wallet-container">
          <h2 className="wallet-section-title">{t('wallet.screenshots.title')}</h2>
          <div className="wallet-screenshots-grid">
            <div className="wallet-screenshot-card">
              <div className="wallet-screenshot-mockup">
                <div className="wallet-screenshot-content wallet-screenshot-home">
                  <div className="wallet-screenshot-header">
                    <div className="wallet-screenshot-logo">RSC</div>
                    <div className="wallet-screenshot-balance">12,450 RSK</div>
                  </div>
                  <div className="wallet-screenshot-actions">
                    <div className="wallet-screenshot-action">Send</div>
                    <div className="wallet-screenshot-action">Receive</div>
                  </div>
                  <div className="wallet-screenshot-transactions">
                    <div className="wallet-screenshot-tx">Sent -1,250 RSK</div>
                    <div className="wallet-screenshot-tx">Received +850 RSK</div>
                  </div>
                </div>
              </div>
              <h3 className="wallet-screenshot-label">{t('wallet.screenshots.home')}</h3>
            </div>
            <div className="wallet-screenshot-card">
              <div className="wallet-screenshot-mockup">
                <div className="wallet-screenshot-content wallet-screenshot-send">
                  <div className="wallet-screenshot-header">
                    <div className="wallet-screenshot-back">←</div>
                    <div className="wallet-screenshot-title">Send</div>
                  </div>
                  <div className="wallet-screenshot-input">0x7a3...f2c</div>
                  <div className="wallet-screenshot-amount">1,250 RSK</div>
                  <div className="wallet-screenshot-button">Confirm</div>
                </div>
              </div>
              <h3 className="wallet-screenshot-label">{t('wallet.screenshots.sendReceive')}</h3>
            </div>
            <div className="wallet-screenshot-card">
              <div className="wallet-screenshot-mockup">
                <div className="wallet-screenshot-content wallet-screenshot-staking">
                  <div className="wallet-screenshot-header">
                    <div className="wallet-screenshot-title">Staking</div>
                  </div>
                  <div className="wallet-screenshot-stake-amount">5,000 RSK</div>
                  <div className="wallet-screenshot-rewards">+125 RSK</div>
                  <div className="wallet-screenshot-button">Stake</div>
                </div>
              </div>
              <h3 className="wallet-screenshot-label">{t('wallet.screenshots.staking')}</h3>
            </div>
            <div className="wallet-screenshot-card">
              <div className="wallet-screenshot-mockup">
                <div className="wallet-screenshot-content wallet-screenshot-settings">
                  <div className="wallet-screenshot-header">
                    <div className="wallet-screenshot-title">Settings</div>
                  </div>
                  <div className="wallet-screenshot-setting-item">
                    <Lock size={16} />
                    <span>Security</span>
                  </div>
                  <div className="wallet-screenshot-setting-item">
                    <Key size={16} />
                    <span>Backup</span>
                  </div>
                  <div className="wallet-screenshot-setting-item">
                    <Eye size={16} />
                    <span>Privacy</span>
                  </div>
                </div>
              </div>
              <h3 className="wallet-screenshot-label">{t('wallet.screenshots.settings')}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="wallet-cta-final">
        <div className="wallet-container">
          <div className="wallet-cta-final-content">
            <Smartphone className="wallet-cta-icon" size={64} />
            <h2 className="wallet-cta-final-title">{t('wallet.cta.title')}</h2>
            <p className="wallet-cta-final-description">{t('wallet.cta.description')}</p>
            <button className="wallet-cta-final-button">
              <Download className="wallet-cta-icon-small" size={20} />
              {t('wallet.cta.button')}
              <ArrowRight className="wallet-cta-icon-small" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

