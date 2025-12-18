import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  TrendingUp, 
  Coins, 
  Lock, 
  Gift, 
  Unlock, 
  Eye, 
  BarChart3,
  ArrowRight,
  Wallet,
  CheckCircle,
  Clock,
  Percent,
  Shield
} from 'lucide-react';
import '../../styles/staking-page.css';

export function StakingPage() {
  const { t } = useTranslation();

  return (
    <div className="staking-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="staking-hero">
        <div className="staking-hero-container">
          <div className="staking-hero-content">
            <div className="staking-hero-icon">
              <TrendingUp size={64} />
            </div>
            <h1 className="staking-hero-title">{t('staking.hero.title')}</h1>
            <p className="staking-hero-subtitle">{t('staking.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* What is Staking */}
      <section className="staking-what">
        <div className="staking-container">
          <h2 className="staking-section-title">{t('staking.what.title')}</h2>
          <div className="staking-what-content">
            <div className="staking-what-text">
              <p className="staking-what-description">{t('staking.what.description')}</p>
              <div className="staking-what-benefits">
                <div className="staking-benefit-card">
                  <Coins className="staking-benefit-icon" size={32} />
                  <h3 className="staking-benefit-title">{t('staking.what.benefit1.title')}</h3>
                  <p className="staking-benefit-description">{t('staking.what.benefit1.description')}</p>
                </div>
                <div className="staking-benefit-card">
                  <BarChart3 className="staking-benefit-icon" size={32} />
                  <h3 className="staking-benefit-title">{t('staking.what.benefit2.title')}</h3>
                  <p className="staking-benefit-description">{t('staking.what.benefit2.description')}</p>
                </div>
                <div className="staking-benefit-card">
                  <Shield className="staking-benefit-icon" size={32} />
                  <h3 className="staking-benefit-title">{t('staking.what.benefit3.title')}</h3>
                  <p className="staking-benefit-description">{t('staking.what.benefit3.description')}</p>
                </div>
              </div>
            </div>
            <div className="staking-what-visual">
              <div className="staking-visual-card">
                <div className="staking-visual-header">
                  <TrendingUp className="staking-visual-icon" size={40} />
                  <span className="staking-visual-label">{t('staking.what.visual.label')}</span>
                </div>
                <div className="staking-visual-amount">5,000 RSK</div>
                <div className="staking-visual-rewards">
                  <Percent className="staking-visual-percent" size={20} />
                  <span>+125 RSK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Generate Rewards */}
      <section className="staking-rewards">
        <div className="staking-container">
          <h2 className="staking-section-title">{t('staking.rewards.title')}</h2>
          <div className="staking-rewards-content">
            <div className="staking-rewards-steps">
              <div className="staking-reward-step">
                <div className="staking-step-number">1</div>
                <div className="staking-step-content">
                  <h3 className="staking-step-title">{t('staking.rewards.step1.title')}</h3>
                  <p className="staking-step-description">{t('staking.rewards.step1.description')}</p>
                </div>
              </div>
              <div className="staking-reward-step">
                <div className="staking-step-number">2</div>
                <div className="staking-step-content">
                  <h3 className="staking-step-title">{t('staking.rewards.step2.title')}</h3>
                  <p className="staking-step-description">{t('staking.rewards.step2.description')}</p>
                </div>
              </div>
              <div className="staking-reward-step">
                <div className="staking-step-number">3</div>
                <div className="staking-step-content">
                  <h3 className="staking-step-title">{t('staking.rewards.step3.title')}</h3>
                  <p className="staking-step-description">{t('staking.rewards.step3.description')}</p>
                </div>
              </div>
            </div>
            <div className="staking-rewards-visual">
              <div className="staking-rewards-card">
                <div className="staking-rewards-header">
                  <Gift className="staking-rewards-icon" size={32} />
                  <span>{t('staking.rewards.visual.title')}</span>
                </div>
                <div className="staking-rewards-amount">+125 RSK</div>
                <div className="staking-rewards-period">{t('staking.rewards.visual.period')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Rules */}
      <section className="staking-rules">
        <div className="staking-container">
          <h2 className="staking-section-title">{t('staking.rules.title')}</h2>
          <div className="staking-rules-grid">
            <div className="staking-rule-card">
              <div className="staking-rule-icon">
                <Lock size={32} />
              </div>
              <h3 className="staking-rule-title">{t('staking.rules.lock.title')}</h3>
              <p className="staking-rule-description">{t('staking.rules.lock.description')}</p>
              <div className="staking-rule-details">
                <Clock className="staking-rule-detail-icon" size={16} />
                <span>{t('staking.rules.lock.detail')}</span>
              </div>
            </div>
            <div className="staking-rule-card">
              <div className="staking-rule-icon">
                <Gift size={32} />
              </div>
              <h3 className="staking-rule-title">{t('staking.rules.rewards.title')}</h3>
              <p className="staking-rule-description">{t('staking.rules.rewards.description')}</p>
              <div className="staking-rule-details">
                <Percent className="staking-rule-detail-icon" size={16} />
                <span>{t('staking.rules.rewards.detail')}</span>
              </div>
            </div>
            <div className="staking-rule-card">
              <div className="staking-rule-icon">
                <Unlock size={32} />
              </div>
              <h3 className="staking-rule-title">{t('staking.rules.unstake.title')}</h3>
              <p className="staking-rule-description">{t('staking.rules.unstake.description')}</p>
              <div className="staking-rule-details">
                <Clock className="staking-rule-detail-icon" size={16} />
                <span>{t('staking.rules.unstake.detail')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Control */}
      <section className="staking-transparency">
        <div className="staking-container">
          <div className="staking-transparency-content">
            <div className="staking-transparency-visual">
              <Eye className="staking-transparency-icon-large" size={80} />
            </div>
            <div className="staking-transparency-text">
              <h2 className="staking-section-title">{t('staking.transparency.title')}</h2>
              <p className="staking-transparency-description">{t('staking.transparency.description')}</p>
              <div className="staking-transparency-features">
                <div className="staking-transparency-feature">
                  <CheckCircle className="staking-check-icon" size={20} />
                  <span>{t('staking.transparency.feature1')}</span>
                </div>
                <div className="staking-transparency-feature">
                  <CheckCircle className="staking-check-icon" size={20} />
                  <span>{t('staking.transparency.feature2')}</span>
                </div>
                <div className="staking-transparency-feature">
                  <CheckCircle className="staking-check-icon" size={20} />
                  <span>{t('staking.transparency.feature3')}</span>
                </div>
                <div className="staking-transparency-feature">
                  <CheckCircle className="staking-check-icon" size={20} />
                  <span>{t('staking.transparency.feature4')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="staking-cta">
        <div className="staking-container">
          <div className="staking-cta-content">
            <Wallet className="staking-cta-icon" size={64} />
            <h2 className="staking-cta-title">{t('staking.cta.title')}</h2>
            <p className="staking-cta-description">{t('staking.cta.description')}</p>
            <button className="staking-cta-button">
              {t('staking.cta.button')}
              <ArrowRight className="staking-cta-arrow" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

