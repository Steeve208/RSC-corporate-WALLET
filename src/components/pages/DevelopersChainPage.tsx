import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Network, 
  Server, 
  Layers,
  Github,
  Code,
  Settings,
  ExternalLink
} from 'lucide-react';
import '../../styles/developers-chain-page.css';

export function DevelopersChainPage() {
  const { t } = useTranslation();

  return (
    <div className="developers-chain-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="developers-chain-hero">
        <div className="developers-chain-hero-container">
          <div className="developers-chain-hero-content">
            <div className="developers-chain-hero-icon">
              <Network size={64} />
            </div>
            <h1 className="developers-chain-hero-title">{t('developersChain.hero.title')}</h1>
            <p className="developers-chain-hero-subtitle">{t('developersChain.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Running a Node */}
      <section className="developers-chain-node">
        <div className="developers-chain-container">
          <div className="developers-chain-section-header">
            <Server className="developers-chain-section-icon" size={48} />
            <h2 className="developers-chain-section-title">{t('developersChain.node.title')}</h2>
          </div>
          <div className="developers-chain-node-content">
            <p className="developers-chain-description">{t('developersChain.node.description')}</p>
            <div className="developers-chain-steps">
              <div className="developers-chain-step">
                <div className="developers-chain-step-number">1</div>
                <div className="developers-chain-step-content">
                  <h3 className="developers-chain-step-title">{t('developersChain.node.step1.title')}</h3>
                  <p className="developers-chain-step-description">{t('developersChain.node.step1.description')}</p>
                  <div className="developers-chain-code-block">
                    <code>{t('developersChain.node.step1.code')}</code>
                  </div>
                </div>
              </div>
              <div className="developers-chain-step">
                <div className="developers-chain-step-number">2</div>
                <div className="developers-chain-step-content">
                  <h3 className="developers-chain-step-title">{t('developersChain.node.step2.title')}</h3>
                  <p className="developers-chain-step-description">{t('developersChain.node.step2.description')}</p>
                  <div className="developers-chain-code-block">
                    <code>{t('developersChain.node.step2.code')}</code>
                  </div>
                </div>
              </div>
              <div className="developers-chain-step">
                <div className="developers-chain-step-number">3</div>
                <div className="developers-chain-step-content">
                  <h3 className="developers-chain-step-title">{t('developersChain.node.step3.title')}</h3>
                  <p className="developers-chain-step-description">{t('developersChain.node.step3.description')}</p>
                  <div className="developers-chain-code-block">
                    <code>{t('developersChain.node.step3.code')}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="developers-chain-endpoints">
        <div className="developers-chain-container">
          <div className="developers-chain-section-header">
            <Code className="developers-chain-section-icon" size={48} />
            <h2 className="developers-chain-section-title">{t('developersChain.endpoints.title')}</h2>
          </div>
          <div className="developers-chain-endpoints-content">
            <p className="developers-chain-description">{t('developersChain.endpoints.description')}</p>
            <div className="developers-chain-endpoints-grid">
              <div className="developers-chain-endpoint-card">
                <div className="developers-chain-endpoint-icon">
                  <Network size={32} />
                </div>
                <h3 className="developers-chain-endpoint-title">{t('developersChain.endpoints.endpoint1.title')}</h3>
                <p className="developers-chain-endpoint-url">{t('developersChain.endpoints.endpoint1.url')}</p>
                <p className="developers-chain-endpoint-description">{t('developersChain.endpoints.endpoint1.description')}</p>
              </div>
              <div className="developers-chain-endpoint-card">
                <div className="developers-chain-endpoint-icon">
                  <Server size={32} />
                </div>
                <h3 className="developers-chain-endpoint-title">{t('developersChain.endpoints.endpoint2.title')}</h3>
                <p className="developers-chain-endpoint-url">{t('developersChain.endpoints.endpoint2.url')}</p>
                <p className="developers-chain-endpoint-description">{t('developersChain.endpoints.endpoint2.description')}</p>
              </div>
              <div className="developers-chain-endpoint-card">
                <div className="developers-chain-endpoint-icon">
                  <Settings size={32} />
                </div>
                <h3 className="developers-chain-endpoint-title">{t('developersChain.endpoints.endpoint3.title')}</h3>
                <p className="developers-chain-endpoint-url">{t('developersChain.endpoints.endpoint3.url')}</p>
                <p className="developers-chain-endpoint-description">{t('developersChain.endpoints.endpoint3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="developers-chain-architecture">
        <div className="developers-chain-container">
          <div className="developers-chain-section-header">
            <Layers className="developers-chain-section-icon" size={48} />
            <h2 className="developers-chain-section-title">{t('developersChain.architecture.title')}</h2>
          </div>
          <div className="developers-chain-architecture-content">
            <p className="developers-chain-description">{t('developersChain.architecture.description')}</p>
            <div className="developers-chain-architecture-layers">
              <div className="developers-chain-architecture-layer">
                <div className="developers-chain-architecture-layer-icon">
                  <Network size={32} />
                </div>
                <div className="developers-chain-architecture-layer-content">
                  <h3 className="developers-chain-architecture-layer-title">{t('developersChain.architecture.layer1.title')}</h3>
                  <p className="developers-chain-architecture-layer-description">{t('developersChain.architecture.layer1.description')}</p>
                </div>
              </div>
              <div className="developers-chain-architecture-layer">
                <div className="developers-chain-architecture-layer-icon">
                  <Server size={32} />
                </div>
                <div className="developers-chain-architecture-layer-content">
                  <h3 className="developers-chain-architecture-layer-title">{t('developersChain.architecture.layer2.title')}</h3>
                  <p className="developers-chain-architecture-layer-description">{t('developersChain.architecture.layer2.description')}</p>
                </div>
              </div>
              <div className="developers-chain-architecture-layer">
                <div className="developers-chain-architecture-layer-icon">
                  <Code size={32} />
                </div>
                <div className="developers-chain-architecture-layer-content">
                  <h3 className="developers-chain-architecture-layer-title">{t('developersChain.architecture.layer3.title')}</h3>
                  <p className="developers-chain-architecture-layer-description">{t('developersChain.architecture.layer3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Links */}
      <section className="developers-chain-github">
        <div className="developers-chain-container">
          <h2 className="developers-chain-section-title">{t('developersChain.github.title')}</h2>
          <div className="developers-chain-github-content">
            <p className="developers-chain-description">{t('developersChain.github.description')}</p>
            <div className="developers-chain-github-links">
              <a href="#" className="developers-chain-github-link">
                <Github className="developers-chain-github-icon" size={24} />
                <div className="developers-chain-github-link-content">
                  <h3 className="developers-chain-github-link-title">{t('developersChain.github.link1.title')}</h3>
                  <p className="developers-chain-github-link-url">{t('developersChain.github.link1.url')}</p>
                </div>
                <ExternalLink className="developers-chain-github-arrow" size={20} />
              </a>
              <a href="#" className="developers-chain-github-link">
                <Github className="developers-chain-github-icon" size={24} />
                <div className="developers-chain-github-link-content">
                  <h3 className="developers-chain-github-link-title">{t('developersChain.github.link2.title')}</h3>
                  <p className="developers-chain-github-link-url">{t('developersChain.github.link2.url')}</p>
                </div>
                <ExternalLink className="developers-chain-github-arrow" size={20} />
              </a>
              <a href="#" className="developers-chain-github-link">
                <Github className="developers-chain-github-icon" size={24} />
                <div className="developers-chain-github-link-content">
                  <h3 className="developers-chain-github-link-title">{t('developersChain.github.link3.title')}</h3>
                  <p className="developers-chain-github-link-url">{t('developersChain.github.link3.url')}</p>
                </div>
                <ExternalLink className="developers-chain-github-arrow" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

