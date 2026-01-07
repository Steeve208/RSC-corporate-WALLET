import { useState } from 'react';
import '../../styles/landing.css';
import { useScrollAnimation } from './useScrollAnimation';
import { Navbar } from './Navbar';
import { ArrowUpRight, ArrowDownLeft, Check, Key, Zap, Coins, QrCode, FileText, Network, Wallet, Shield, ArrowRight, Play, Lock, Fingerprint, Eye, AlertCircle, User, Building2, Code, Send, TrendingUp, Clock, ChevronLeft, ChevronRight, History, Bell, Link2, Activity, Layers, Banknote, Download, BookOpen, Rocket } from 'lucide-react';

type LandingPageProps = {
  onEnter?: () => void;
};

const handleEnter = () => {
  // Placeholder function - can be implemented later if needed
  console.log('Enter clicked');
};


export function LandingPage({ onEnter }: LandingPageProps) {
  const [activeScreen, setActiveScreen] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Activate scroll animations
  useScrollAnimation();


  return (
    <div className="vaulto-landing">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - wRSK Token Sale */}
      <section className="rsc-hero rsc-tech-bg">
        {/* Animated Background Elements */}
        <div className="rsc-tech-bg-glow"></div>
        <div className="rsc-tech-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="rsc-tech-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
        
        {/* wRSK Token Sale Hero Content */}
        <div className="rsc-sale-hero-container">
          <div className="rsc-sale-hero-content">
            {/* Badge */}
            <div className="rsc-sale-hero-badge animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="rsc-sale-hero-badge-dot"></span>
              <span>FIRST ROUND - LIVE NOW</span>
            </div>

            {/* Main Title */}
            <h1 className="rsc-sale-hero-title animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="rsc-sale-hero-title-icon">🚀</span>
              <span className="rsc-sale-hero-title-highlight">wRSK Token Sale</span>
            </h1>

            {/* Subtitle */}
            <p className="rsc-sale-hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Exclusive opportunity to acquire wRSK tokens with USDT on BSC Mainnet
            </p>

            {/* Features Grid */}
            <div className="rsc-sale-hero-features animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="rsc-sale-hero-feature-card">
                <div className="rsc-sale-hero-feature-icon">⚡</div>
                <div className="rsc-sale-hero-feature-content">
                  <h3 className="rsc-sale-hero-feature-title">25% Immediate</h3>
                  <p className="rsc-sale-hero-feature-desc">Receive tokens instantly</p>
                </div>
              </div>
              <div className="rsc-sale-hero-feature-card">
                <div className="rsc-sale-hero-feature-icon">📈</div>
                <div className="rsc-sale-hero-feature-content">
                  <h3 className="rsc-sale-hero-feature-title">75% Vesting</h3>
                  <p className="rsc-sale-hero-feature-desc">6 months linear release</p>
                </div>
              </div>
              <div className="rsc-sale-hero-feature-card">
                <div className="rsc-sale-hero-feature-icon">💰</div>
                <div className="rsc-sale-hero-feature-content">
                  <h3 className="rsc-sale-hero-feature-title">Special Price</h3>
                  <p className="rsc-sale-hero-feature-desc">Best rate available</p>
                </div>
              </div>
              <div className="rsc-sale-hero-feature-card">
                <div className="rsc-sale-hero-feature-icon">🔒</div>
                <div className="rsc-sale-hero-feature-content">
                  <h3 className="rsc-sale-hero-feature-title">Secure</h3>
                  <p className="rsc-sale-hero-feature-desc">Smart contract verified</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="rsc-sale-hero-cta-wrapper animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <button 
                className="rsc-sale-hero-cta"
                onClick={() => {
                  if ((window as any).navigateToPage) {
                    (window as any).navigateToPage('sale');
                  }
                }}
              >
                <Rocket size={28} />
                <span>Join the Token Sale</span>
                <span className="rsc-sale-hero-cta-arrow">→</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="rsc-sale-hero-info animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <p className="rsc-sale-hero-info-text">
                Limited supply available • First come, first served
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why RSC Wallet Section */}
      <section className="rsc-why-section rsc-tech-bg animate-on-scroll">
        {/* Animated Background Elements */}
        <div className="rsc-why-bg">
          <div className="rsc-why-bg-grid"></div>
          <div className="rsc-why-bg-glow"></div>
          <div className="rsc-why-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="rsc-why-particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}></div>
            ))}
              </div>
              </div>

        <div className="rsc-why-container">
          <div className="rsc-why-header">
            <div className="rsc-why-badge">
              <span className="rsc-why-badge-dot"></span>
              <span>Ecosistema RSC</span>
            </div>
            <h2 className="rsc-why-title">
              <span className="rsc-why-title-gradient">La wallet que conecta</span>
              <br />
              <span>tu economía a RSC Chain</span>
            </h2>
            <p className="rsc-why-subtitle">
              Gestiona activos, pagos y recompensas desde una sola identidad digital. RSC Wallet está diseñada para operar en el ecosistema RSC con velocidad, control y seguridad.
            </p>
            </div>

          <div className="rsc-why-grid">
            <div className="rsc-why-card" data-card="1">
              <div className="rsc-why-card-glow"></div>
              <div className="rsc-why-card-border"></div>
              <div className="rsc-why-card-icon">
                <div className="rsc-why-icon-bg"></div>
                <Key size={32} className="rsc-why-icon" />
                <div className="rsc-why-icon-pulse"></div>
                </div>
              <h3 className="rsc-why-card-title">Non-custodial</h3>
              <p className="rsc-why-card-description">
                Tus llaves, tu control. Nadie puede congelar tu saldo ni tomar custodia de tus fondos.
              </p>
              <div className="rsc-why-card-shine"></div>
                </div>

            <div className="rsc-why-card" data-card="2">
              <div className="rsc-why-card-glow"></div>
              <div className="rsc-why-card-border"></div>
              <div className="rsc-why-card-icon">
                <div className="rsc-why-icon-bg"></div>
                <Zap size={32} className="rsc-why-icon" />
                <div className="rsc-why-icon-pulse"></div>
                </div>
              <h3 className="rsc-why-card-title">Transacciones instantáneas</h3>
              <p className="rsc-why-card-description">
                Enviar y recibir toma segundos, con estados claros y confirmación verificable.
              </p>
              <div className="rsc-why-card-shine"></div>
              </div>

            <div className="rsc-why-card" data-card="3">
              <div className="rsc-why-card-glow"></div>
              <div className="rsc-why-card-border"></div>
              <div className="rsc-why-card-icon">
                <div className="rsc-why-icon-bg"></div>
                <Coins size={32} className="rsc-why-icon" />
                <div className="rsc-why-icon-pulse"></div>
                </div>
              <h3 className="rsc-why-card-title">Staking & rewards</h3>
              <p className="rsc-why-card-description">
                Participa en el ecosistema: staking, recompensas y utilidades integradas.
              </p>
              <div className="rsc-why-card-shine"></div>
                </div>

            <div className="rsc-why-card" data-card="4">
              <div className="rsc-why-card-glow"></div>
              <div className="rsc-why-card-border"></div>
              <div className="rsc-why-card-icon">
                <div className="rsc-why-icon-bg"></div>
                <QrCode size={32} className="rsc-why-icon" />
                <div className="rsc-why-icon-pulse"></div>
                </div>
              <h3 className="rsc-why-card-title">Pagos con QR</h3>
              <p className="rsc-why-card-description">
                Paga de forma simple. Escanea, confirma y listo (ideal para comercios y vida diaria).
              </p>
              <div className="rsc-why-card-shine"></div>
              </div>

            <div className="rsc-why-card" data-card="5">
              <div className="rsc-why-card-glow"></div>
              <div className="rsc-why-card-border"></div>
              <div className="rsc-why-card-icon">
                <div className="rsc-why-icon-bg"></div>
                <FileText size={32} className="rsc-why-icon" />
                <div className="rsc-why-icon-pulse"></div>
            </div>
              <h3 className="rsc-why-card-title">Historial y transparencia</h3>
              <p className="rsc-why-card-description">
                Actividad organizada, exportable y fácil de auditar para el usuario.
              </p>
              <div className="rsc-why-card-shine"></div>
          </div>

            <div className="rsc-why-card" data-card="6">
              <div className="rsc-why-card-glow"></div>
              <div className="rsc-why-card-border"></div>
              <div className="rsc-why-card-icon">
                <div className="rsc-why-icon-bg"></div>
                <Network size={32} className="rsc-why-icon" />
                <div className="rsc-why-icon-pulse"></div>
              </div>
              <h3 className="rsc-why-card-title">Diseñada para el ecosistema RSC</h3>
              <p className="rsc-why-card-description">
                Integración nativa con RSC Chain: identidad, apps, servicios y futuro bridge.
              </p>
              <div className="rsc-why-card-shine"></div>
              </div>
            </div>
        </div>
      </section>

      {/* Features Deep Dive Section */}
      <section className="rsc-features-section rsc-tech-bg animate-on-scroll">
        {/* Animated Background Elements */}
        <div className="rsc-tech-bg-glow"></div>
        <div className="rsc-tech-particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="rsc-tech-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>

        <div className="rsc-features-container">
          <div className="rsc-features-header">
            <h2 className="rsc-features-title">
              Todo lo esencial. <span className="rsc-features-title-gradient">Y lo avanzado, también.</span>
            </h2>
                  </div>

          <div className="rsc-features-grid">
            {/* Bloque A - Send & Receive */}
            <div className="rsc-feature-block" data-block="a">
              <div className="rsc-feature-content">
                <div className="rsc-feature-header-block">
                  <div className="rsc-feature-icon-wrapper">
                    <div className="rsc-feature-icon-bg"></div>
                    <ArrowUpRight size={28} className="rsc-feature-icon" />
                      </div>
                  <h3 className="rsc-feature-block-title">Enviar y recibir sin fricción</h3>
                    </div>
                <p className="rsc-feature-block-text">
                  Envía RSK y activos compatibles con total claridad: dirección, monto, comisión, estado y confirmación. Recibe con un toque y comparte tu dirección o QR.
                </p>
                <ul className="rsc-feature-bullets">
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Confirmaciones y estados: Pending / Confirmed</span>
                  </li>
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Copiar, compartir, escanear QR</span>
                  </li>
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Dirección pública con formato claro</span>
                  </li>
                </ul>
                      </div>
              <div className="rsc-feature-mockup">
                <div className="rsc-mockup-card">
                  <div className="rsc-mockup-header">
                    <div className="rsc-mockup-dot"></div>
                    <div className="rsc-mockup-dot"></div>
                    <div className="rsc-mockup-dot"></div>
                    </div>
                  <div className="rsc-mockup-content">
                    <div className="rsc-mockup-transaction">
                      <div className="rsc-mockup-tx-icon">→</div>
                      <div className="rsc-mockup-tx-info">
                        <div className="rsc-mockup-tx-label">Enviando</div>
                        <div className="rsc-mockup-tx-amount">1,250 RSK</div>
                      </div>
                      <div className="rsc-mockup-tx-status">Pending</div>
                    </div>
                    <div className="rsc-mockup-qr">
                      <div className="rsc-mockup-qr-grid"></div>
                    </div>
                  </div>
                </div>
                  </div>
                </div>

            {/* Bloque B - Balance + Overview */}
            <div className="rsc-feature-block" data-block="b">
              <div className="rsc-feature-content">
                <div className="rsc-feature-header-block">
                  <div className="rsc-feature-icon-wrapper">
                    <div className="rsc-feature-icon-bg"></div>
                    <FileText size={28} className="rsc-feature-icon" />
                    </div>
                  <h3 className="rsc-feature-block-title">Tu portfolio, simple y visible</h3>
                  </div>
                <p className="rsc-feature-block-text">
                  Balance total, movimientos recientes y métricas básicas. Diseñado para entender tu dinero en segundos.
                </p>
                <ul className="rsc-feature-bullets">
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Total balance + variación diaria (si aplica)</span>
                  </li>
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Últimas transacciones</span>
                  </li>
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Separación por activos</span>
                  </li>
                </ul>
                  </div>
              <div className="rsc-feature-mockup">
                <div className="rsc-mockup-card">
                  <div className="rsc-mockup-header">
                    <div className="rsc-mockup-dot"></div>
                    <div className="rsc-mockup-dot"></div>
                    <div className="rsc-mockup-dot"></div>
                </div>
                  <div className="rsc-mockup-content">
                    <div className="rsc-mockup-balance">
                      <div className="rsc-mockup-balance-label">Total Balance</div>
                      <div className="rsc-mockup-balance-amount">$12,450.80</div>
                      <div className="rsc-mockup-balance-change">+5.2% today</div>
              </div>
                    <div className="rsc-mockup-assets">
                      <div className="rsc-mockup-asset">RSK: 1,250</div>
                      <div className="rsc-mockup-asset">ETH: 78.381</div>
            </div>
          </div>
        </div>
              </div>
            </div>

            {/* Bloque C - Staking */}
            <div className="rsc-feature-block" data-block="c">
              <div className="rsc-feature-content">
                <div className="rsc-feature-header-block">
                  <div className="rsc-feature-icon-wrapper">
                    <div className="rsc-feature-icon-bg"></div>
                    <Coins size={28} className="rsc-feature-icon" />
                  </div>
                  <h3 className="rsc-feature-block-title">Staking integrado al flujo</h3>
                </div>
                <p className="rsc-feature-block-text">
                  Haz staking sin salir del producto. Recompensas y tiempos transparentes.
                </p>
                <ul className="rsc-feature-bullets">
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Monto en staking / disponible</span>
                  </li>
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Recompensas estimadas y acumuladas</span>
                  </li>
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Acciones claras: Stake / Unstake</span>
                  </li>
                </ul>
              </div>
              <div className="rsc-feature-mockup">
                <div className="rsc-mockup-card">
                  <div className="rsc-mockup-header">
                    <div className="rsc-mockup-dot"></div>
                    <div className="rsc-mockup-dot"></div>
                    <div className="rsc-mockup-dot"></div>
                  </div>
                  <div className="rsc-mockup-content">
                    <div className="rsc-mockup-staking">
                      <div className="rsc-mockup-staking-label">En Staking</div>
                      <div className="rsc-mockup-staking-amount">5,000 RSK</div>
                      <div className="rsc-mockup-staking-rewards">Recompensas: +125 RSK</div>
                      <div className="rsc-mockup-staking-actions">
                        <div className="rsc-mockup-btn">Stake</div>
                        <div className="rsc-mockup-btn">Unstake</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloque D - Seguridad */}
            <div className="rsc-feature-block" data-block="d">
              <div className="rsc-feature-content">
                <div className="rsc-feature-header-block">
                  <div className="rsc-feature-icon-wrapper">
                    <div className="rsc-feature-icon-bg"></div>
                    <Key size={28} className="rsc-feature-icon" />
                </div>
                  <h3 className="rsc-feature-block-title">Seguridad práctica, no promesas vacías</h3>
              </div>
                <p className="rsc-feature-block-text">
                  Protecciones reales orientadas al usuario: bloqueo, backup y control.
                </p>
                <ul className="rsc-feature-bullets">
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>PIN / Biométrica</span>
                  </li>
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Auto-lock y protección en segundo plano</span>
                  </li>
                  <li>
                    <span className="rsc-bullet-icon">✓</span>
                    <span>Backup con frase semilla (seed)</span>
                  </li>
                </ul>
              </div>
              <div className="rsc-feature-mockup">
                <div className="rsc-mockup-card">
                  <div className="rsc-mockup-header">
                    <div className="rsc-mockup-dot"></div>
                    <div className="rsc-mockup-dot"></div>
                    <div className="rsc-mockup-dot"></div>
            </div>
                  <div className="rsc-mockup-content">
                    <div className="rsc-mockup-security">
                      <div className="rsc-mockup-security-item">
                        <div className="rsc-mockup-security-icon">🔒</div>
                        <div className="rsc-mockup-security-label">PIN Activo</div>
                      </div>
                      <div className="rsc-mockup-security-item">
                        <div className="rsc-mockup-security-icon">👆</div>
                        <div className="rsc-mockup-security-label">Biometría</div>
                      </div>
                      <div className="rsc-mockup-security-item">
                        <div className="rsc-mockup-security-icon">🔑</div>
                        <div className="rsc-mockup-security-label">Seed Backup</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="rsc-how-section rsc-tech-bg animate-on-scroll">
        {/* Animated Background Elements */}
        <div className="rsc-tech-bg-glow"></div>
        <div className="rsc-tech-particles">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="rsc-tech-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>

        <div className="rsc-how-container">
          <div className="rsc-how-header">
            <h2 className="rsc-how-title">
              <span className="rsc-how-title-gradient">Empieza</span> en minutos
        </h2>
          </div>

          <div className="rsc-how-steps">
            {/* Step 1 */}
            <div className="rsc-how-step" data-step="1">
              <div className="rsc-step-number">
                <div className="rsc-step-number-bg"></div>
                <span className="rsc-step-number-text">1</span>
                <div className="rsc-step-number-pulse"></div>
              </div>
              <div className="rsc-step-content">
                <div className="rsc-step-icon-wrapper">
                  <div className="rsc-step-icon-bg"></div>
                  <Wallet size={32} className="rsc-step-icon" />
                </div>
                <h3 className="rsc-step-title">Crea tu wallet</h3>
                <p className="rsc-step-description">
                  Genera tu wallet y guarda tu frase de recuperación (seed) de forma segura.
                </p>
              </div>
              <div className="rsc-step-connector">
                <ArrowRight size={24} className="rsc-step-arrow" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="rsc-how-step" data-step="2">
              <div className="rsc-step-number">
                <div className="rsc-step-number-bg"></div>
                <span className="rsc-step-number-text">2</span>
                <div className="rsc-step-number-pulse"></div>
              </div>
              <div className="rsc-step-content">
                <div className="rsc-step-icon-wrapper">
                  <div className="rsc-step-icon-bg"></div>
                  <Shield size={32} className="rsc-step-icon" />
                </div>
                <h3 className="rsc-step-title">Asegura tu acceso</h3>
                <p className="rsc-step-description">
                  Activa PIN o biometría y configura el bloqueo automático.
                </p>
              </div>
              <div className="rsc-step-connector">
                <ArrowRight size={24} className="rsc-step-arrow" />
              </div>
        </div>

            {/* Step 3 */}
            <div className="rsc-how-step" data-step="3">
              <div className="rsc-step-number">
                <div className="rsc-step-number-bg"></div>
                <span className="rsc-step-number-text">3</span>
                <div className="rsc-step-number-pulse"></div>
              </div>
              <div className="rsc-step-content">
                <div className="rsc-step-icon-wrapper">
                  <div className="rsc-step-icon-bg"></div>
                  <QrCode size={32} className="rsc-step-icon" />
            </div>
                <h3 className="rsc-step-title">Recibe fondos o conecta servicios</h3>
                <p className="rsc-step-description">
                  Deposita, recibe por QR o integra con el ecosistema RSC.
                </p>
              </div>
              <div className="rsc-step-connector">
                <ArrowRight size={24} className="rsc-step-arrow" />
            </div>
          </div>

            {/* Step 4 */}
            <div className="rsc-how-step" data-step="4">
              <div className="rsc-step-number">
                <div className="rsc-step-number-bg"></div>
                <span className="rsc-step-number-text">4</span>
                <div className="rsc-step-number-pulse"></div>
              </div>
              <div className="rsc-step-content">
                <div className="rsc-step-icon-wrapper">
                  <div className="rsc-step-icon-bg"></div>
                  <Play size={32} className="rsc-step-icon" />
                </div>
                <h3 className="rsc-step-title">Usa: paga, envía, stakea</h3>
                <p className="rsc-step-description">
                  Opera tu día a día con historial, estados y control total.
                </p>
              </div>
            </div>
          </div>

          <div className="rsc-how-microcopy">
            <p className="rsc-how-microcopy-text">
              RSC Wallet está diseñada para ser clara incluso si es tu primera wallet.
            </p>
              </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="rsc-security-section rsc-tech-bg animate-on-scroll">
        {/* Animated Background Elements */}
        <div className="rsc-tech-bg-glow"></div>
        <div className="rsc-tech-particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="rsc-tech-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
            ))}
          </div>

        <div className="rsc-security-container">
          <div className="rsc-security-header">
            <div className="rsc-security-icon-main">
              <div className="rsc-security-icon-main-bg"></div>
              <Shield size={48} className="rsc-security-icon-main-icon" />
              <div className="rsc-security-icon-main-pulse"></div>
        </div>
            <h2 className="rsc-security-title">
              Tu seguridad es <span className="rsc-security-title-gradient">parte del producto</span>
            </h2>
          </div>

          <div className="rsc-security-content">
            <div className="rsc-security-text">
              <p className="rsc-security-paragraph">
                RSC Wallet es non-custodial, lo que significa que el control del acceso lo mantiene el usuario. La app está diseñada para proteger la clave privada y ayudarte a recuperar tu cuenta de forma responsable.
              </p>
              <p className="rsc-security-paragraph">
                La seguridad no es un banner: es una serie de capas pensadas para uso real.
              </p>
              </div>

            <div className="rsc-security-features">
              <div className="rsc-security-feature">
                <div className="rsc-security-feature-icon-wrapper">
                  <div className="rsc-security-feature-icon-bg"></div>
                  <Shield size={24} className="rsc-security-feature-icon" />
            </div>
                <div className="rsc-security-feature-content">
                  <h4 className="rsc-security-feature-title">Non-custodial</h4>
                  <p className="rsc-security-feature-description">Control del usuario sobre su acceso</p>
              </div>
            </div>

              <div className="rsc-security-feature">
                <div className="rsc-security-feature-icon-wrapper">
                  <div className="rsc-security-feature-icon-bg"></div>
                  <Key size={24} className="rsc-security-feature-icon" />
              </div>
                <div className="rsc-security-feature-content">
                  <h4 className="rsc-security-feature-title">Backup con frase semilla</h4>
                  <p className="rsc-security-feature-description">Recuperación cuando lo necesites</p>
            </div>
          </div>

              <div className="rsc-security-feature">
                <div className="rsc-security-feature-icon-wrapper">
                  <div className="rsc-security-feature-icon-bg"></div>
                  <Fingerprint size={24} className="rsc-security-feature-icon" />
                </div>
                <div className="rsc-security-feature-content">
                  <h4 className="rsc-security-feature-title">Protecciones de acceso</h4>
                  <p className="rsc-security-feature-description">PIN y biometría</p>
          </div>
        </div>

              <div className="rsc-security-feature">
                <div className="rsc-security-feature-icon-wrapper">
                  <div className="rsc-security-feature-icon-bg"></div>
                  <Lock size={24} className="rsc-security-feature-icon" />
            </div>
                <div className="rsc-security-feature-content">
                  <h4 className="rsc-security-feature-title">Datos sensibles protegidos</h4>
                  <p className="rsc-security-feature-description">Cifrado local (si lo implementas)</p>
            </div>
          </div>

              <div className="rsc-security-feature">
                <div className="rsc-security-feature-icon-wrapper">
                  <div className="rsc-security-feature-icon-bg"></div>
                  <Eye size={24} className="rsc-security-feature-icon" />
                </div>
                <div className="rsc-security-feature-content">
                  <h4 className="rsc-security-feature-title">Buenas prácticas</h4>
                  <p className="rsc-security-feature-description">Recordatorios anti-phishing y verificación de direcciones</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rsc-security-disclaimer">
            <div className="rsc-security-disclaimer-icon">
              <AlertCircle size={20} />
            </div>
            <p className="rsc-security-disclaimer-text">
              La seguridad final también depende del cuidado del usuario con su frase semilla y su dispositivo.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="rsc-usecases-section rsc-tech-bg animate-on-scroll">
        {/* Animated Background Elements */}
        <div className="rsc-tech-bg-glow"></div>
        <div className="rsc-tech-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="rsc-tech-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>

        <div className="rsc-usecases-container">
          <div className="rsc-usecases-header">
            <h2 className="rsc-usecases-title">
              <span className="rsc-usecases-title-gradient">Hecha para personas.</span> Lista para negocios. <span className="rsc-usecases-title-gradient">Abierta a integración.</span>
            </h2>
              </div>

          <div className="rsc-usecases-grid">
            {/* Columna 1 - Individuos */}
            <div className="rsc-usecase-column" data-column="1">
              <div className="rsc-usecase-header-column">
                <div className="rsc-usecase-icon-column">
                  <div className="rsc-usecase-icon-column-bg"></div>
                  <User size={32} className="rsc-usecase-icon-column-icon" />
            </div>
                <h3 className="rsc-usecase-column-title">Individuos</h3>
              </div>
              <ul className="rsc-usecase-list">
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <Send size={20} />
                  </div>
                  <span>Enviar/recibir RSK al instante</span>
                </li>
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <TrendingUp size={20} />
                  </div>
                  <span>Control de balance y actividad</span>
                </li>
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <Coins size={20} />
                  </div>
                  <span>Staking y recompensas del ecosistema</span>
                </li>
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <QrCode size={20} />
                  </div>
                  <span>Pagos con QR en vida diaria</span>
                </li>
              </ul>
            </div>

            {/* Columna 2 - Empresas / Comercios */}
            <div className="rsc-usecase-column" data-column="2">
              <div className="rsc-usecase-header-column">
                <div className="rsc-usecase-icon-column">
                  <div className="rsc-usecase-icon-column-bg"></div>
                  <Building2 size={32} className="rsc-usecase-icon-column-icon" />
                </div>
                <h3 className="rsc-usecase-column-title">Empresas / Comercios</h3>
              </div>
              <ul className="rsc-usecase-list">
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <QrCode size={20} />
                  </div>
                  <span>Cobros rápidos con QR</span>
                </li>
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <Check size={20} />
                  </div>
                  <span>Confirmación clara de pago</span>
                </li>
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <FileText size={20} />
                  </div>
                  <span>Historial de transacciones para control interno</span>
                </li>
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <Network size={20} />
                  </div>
                  <span>Preparada para integraciones futuras con RSC Payments</span>
                </li>
              </ul>
            </div>

            {/* Columna 3 - Desarrolladores */}
            <div className="rsc-usecase-column" data-column="3">
              <div className="rsc-usecase-header-column">
                <div className="rsc-usecase-icon-column">
                  <div className="rsc-usecase-icon-column-bg"></div>
                  <Code size={32} className="rsc-usecase-icon-column-icon" />
                </div>
                <h3 className="rsc-usecase-column-title">Desarrolladores</h3>
              </div>
              <ul className="rsc-usecase-list">
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <Network size={20} />
                  </div>
                  <span>Integración con APIs del ecosistema (REST/WS)</span>
                </li>
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <Wallet size={20} />
                  </div>
                  <span>Enfoque modular: wallet como puerta al stack RSC</span>
                </li>
                <li className="rsc-usecase-item">
                  <div className="rsc-usecase-item-icon">
                    <FileText size={20} />
                  </div>
                  <span>Documentación / endpoints <span className="rsc-usecase-coming-soon">(Coming soon)</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* UI Preview / Screens Section */}
      <section className="rsc-preview-section rsc-tech-bg animate-on-scroll">
        {/* Animated Background Elements */}
        <div className="rsc-tech-bg-glow"></div>
        <div className="rsc-tech-particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="rsc-tech-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>

        <div className="rsc-preview-container">
          <div className="rsc-preview-header">
            <h2 className="rsc-preview-title">
              Diseñada para ser <span className="rsc-preview-title-gradient">clara, rápida y elegante</span>
            </h2>
            <p className="rsc-preview-subtitle">
              Una experiencia enfocada en lo importante: control, visibilidad y acciones rápidas.
            </p>
              </div>

          <div className="rsc-preview-carousel-wrapper">
            <div 
              className="rsc-preview-carousel"
              style={{ transform: `translateX(-${activeScreen * 100}%)` }}
            >
              {/* Screen 1 - Home / Total Balance */}
              <div className="rsc-preview-screen">
                <div className="rsc-preview-phone">
                  <div className="rsc-preview-phone-frame">
                    <div className="rsc-preview-phone-content">
                      <div className="rsc-preview-screen-header">
                        <div className="rsc-preview-screen-title">RSC Wallet</div>
                      </div>
                      <div className="rsc-preview-balance-section">
                        <div className="rsc-preview-balance-label">Total Balance</div>
                        <div className="rsc-preview-balance-amount">$12,450.80</div>
                        <div className="rsc-preview-balance-change">+5.2% today</div>
                      </div>
                      <div className="rsc-preview-quick-actions">
                        <div className="rsc-preview-action-btn">Send</div>
                        <div className="rsc-preview-action-btn">Receive</div>
                        <div className="rsc-preview-action-btn">Stake</div>
                      </div>
                      <div className="rsc-preview-recent-txs">
                        <div className="rsc-preview-tx-item">
                          <ArrowUpRight size={16} />
                          <span>Sent 1,250 RSK</span>
                          <span className="rsc-preview-tx-status">Confirmed</span>
                        </div>
                        <div className="rsc-preview-tx-item">
                          <ArrowDownLeft size={16} />
                          <span>Received 850 RSK</span>
                          <span className="rsc-preview-tx-status">Confirmed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rsc-preview-label">Home / Total Balance</div>
              </div>

              {/* Screen 2 - Send */}
              <div className="rsc-preview-screen">
                <div className="rsc-preview-phone">
                  <div className="rsc-preview-phone-frame">
                    <div className="rsc-preview-phone-content">
                      <div className="rsc-preview-screen-header">
                        <ChevronLeft size={20} />
                        <div className="rsc-preview-screen-title">Send</div>
                        <div></div>
                      </div>
                      <div className="rsc-preview-send-section">
                        <div className="rsc-preview-input-group">
                          <label>To Address</label>
                          <div className="rsc-preview-input">0x7a3...f2c</div>
                        </div>
                        <div className="rsc-preview-input-group">
                          <label>Amount</label>
                          <div className="rsc-preview-input-large">1,250 RSK</div>
                        </div>
                        <div className="rsc-preview-fee-info">
                          <span>Network Fee: 0.001 RSK</span>
                        </div>
                        <div className="rsc-preview-send-button">Confirm Send</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rsc-preview-label">Send</div>
              </div>

              {/* Screen 3 - Receive (QR) */}
              <div className="rsc-preview-screen">
                <div className="rsc-preview-phone">
                  <div className="rsc-preview-phone-frame">
                    <div className="rsc-preview-phone-content">
                      <div className="rsc-preview-screen-header">
                        <ChevronLeft size={20} />
                        <div className="rsc-preview-screen-title">Receive</div>
                        <div></div>
                      </div>
                      <div className="rsc-preview-receive-section">
                        <div className="rsc-preview-qr-large">
                          <div className="rsc-preview-qr-grid-large"></div>
                        </div>
                        <div className="rsc-preview-address-display">
                          <div className="rsc-preview-address-label">Your Address</div>
                          <div className="rsc-preview-address-value">0x9b1...a4d</div>
                          <div className="rsc-preview-copy-btn">Copy</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rsc-preview-label">Receive (QR)</div>
              </div>

              {/* Screen 4 - Staking */}
              <div className="rsc-preview-screen">
                <div className="rsc-preview-phone">
                  <div className="rsc-preview-phone-frame">
                    <div className="rsc-preview-phone-content">
                      <div className="rsc-preview-screen-header">
                        <ChevronLeft size={20} />
                        <div className="rsc-preview-screen-title">Staking</div>
                        <div></div>
                      </div>
                      <div className="rsc-preview-staking-section">
                        <div className="rsc-preview-staking-balance">
                          <div className="rsc-preview-staking-label">Staked Amount</div>
                          <div className="rsc-preview-staking-amount">5,000 RSK</div>
                        </div>
                        <div className="rsc-preview-staking-rewards">
                          <div className="rsc-preview-reward-item">
                            <span>Total Rewards</span>
                            <span>+125 RSK</span>
                          </div>
                          <div className="rsc-preview-reward-item">
                            <span>APY</span>
                            <span>8.5%</span>
                          </div>
                        </div>
                        <div className="rsc-preview-staking-actions">
                          <div className="rsc-preview-stake-btn">Stake More</div>
                          <div className="rsc-preview-unstake-btn">Unstake</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rsc-preview-label">Staking</div>
              </div>

              {/* Screen 5 - Transaction History */}
              <div className="rsc-preview-screen">
                <div className="rsc-preview-phone">
                  <div className="rsc-preview-phone-frame">
                    <div className="rsc-preview-phone-content">
                      <div className="rsc-preview-screen-header">
                        <ChevronLeft size={20} />
                        <div className="rsc-preview-screen-title">History</div>
                        <div></div>
                      </div>
                      <div className="rsc-preview-history-section">
                        <div className="rsc-preview-history-item">
                          <ArrowUpRight size={20} className="rsc-preview-history-icon-send" />
                          <div className="rsc-preview-history-details">
                            <div className="rsc-preview-history-type">Sent</div>
                            <div className="rsc-preview-history-to">To: 0x7a3...f2c</div>
                          </div>
                          <div className="rsc-preview-history-amount">-1,250 RSK</div>
                        </div>
                        <div className="rsc-preview-history-item">
                          <ArrowDownLeft size={20} className="rsc-preview-history-icon-receive" />
                          <div className="rsc-preview-history-details">
                            <div className="rsc-preview-history-type">Received</div>
                            <div className="rsc-preview-history-to">From: 0x9b1...a4d</div>
                          </div>
                          <div className="rsc-preview-history-amount positive">+850 RSK</div>
                        </div>
                        <div className="rsc-preview-history-item">
                          <Coins size={20} className="rsc-preview-history-icon-stake" />
                          <div className="rsc-preview-history-details">
                            <div className="rsc-preview-history-type">Staking Reward</div>
                            <div className="rsc-preview-history-to">Auto-compound</div>
                          </div>
                          <div className="rsc-preview-history-amount positive">+12.5 RSK</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rsc-preview-label">Transaction History</div>
              </div>

              {/* Screen 6 - Security Settings */}
              <div className="rsc-preview-screen">
                <div className="rsc-preview-phone">
                  <div className="rsc-preview-phone-frame">
                    <div className="rsc-preview-phone-content">
                      <div className="rsc-preview-screen-header">
                        <ChevronLeft size={20} />
                        <div className="rsc-preview-screen-title">Security</div>
                        <div></div>
                      </div>
                      <div className="rsc-preview-security-section">
                        <div className="rsc-preview-security-item">
                          <Lock size={20} />
                          <span>PIN Protection</span>
                          <div className="rsc-preview-toggle active"></div>
                        </div>
                        <div className="rsc-preview-security-item">
                          <Fingerprint size={20} />
                          <span>Biometric Auth</span>
                          <div className="rsc-preview-toggle active"></div>
                        </div>
                        <div className="rsc-preview-security-item">
                          <Clock size={20} />
                          <span>Auto-lock (5 min)</span>
                          <div className="rsc-preview-toggle active"></div>
                        </div>
                        <div className="rsc-preview-security-item">
                          <Shield size={20} />
                          <span>Transaction Confirmation</span>
                          <div className="rsc-preview-toggle active"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rsc-preview-label">Security Settings</div>
              </div>

              {/* Screen 7 - Backup / Recovery */}
              <div className="rsc-preview-screen">
                <div className="rsc-preview-phone">
                  <div className="rsc-preview-phone-frame">
                    <div className="rsc-preview-phone-content">
                      <div className="rsc-preview-screen-header">
                        <ChevronLeft size={20} />
                        <div className="rsc-preview-screen-title">Backup</div>
                        <div></div>
                      </div>
                      <div className="rsc-preview-backup-section">
                        <div className="rsc-preview-backup-warning">
                          <AlertCircle size={24} />
                          <div className="rsc-preview-backup-warning-text">
                            Guarda tu frase de recuperación en un lugar seguro
                          </div>
                        </div>
                        <div className="rsc-preview-seed-words">
                          <div className="rsc-preview-seed-word">word</div>
                          <div className="rsc-preview-seed-word">example</div>
                          <div className="rsc-preview-seed-word">phrase</div>
                          <div className="rsc-preview-seed-word">...</div>
                          <div className="rsc-preview-seed-word">24</div>
                          <div className="rsc-preview-seed-word">words</div>
                        </div>
                        <div className="rsc-preview-backup-button">I've Saved It</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rsc-preview-label">Backup / Recovery</div>
              </div>

              {/* Screen 8 - Notifications */}
              <div className="rsc-preview-screen">
                <div className="rsc-preview-phone">
                  <div className="rsc-preview-phone-frame">
                    <div className="rsc-preview-phone-content">
                      <div className="rsc-preview-screen-header">
                        <ChevronLeft size={20} />
                        <div className="rsc-preview-screen-title">Notifications</div>
                        <div></div>
                      </div>
                      <div className="rsc-preview-notifications-section">
                        <div className="rsc-preview-notification-item">
                          <Check size={20} className="rsc-preview-notification-icon-success" />
                          <div className="rsc-preview-notification-content">
                            <div className="rsc-preview-notification-title">Transaction Confirmed</div>
                            <div className="rsc-preview-notification-text">1,250 RSK sent successfully</div>
                          </div>
                          <div className="rsc-preview-notification-time">2m ago</div>
                        </div>
                        <div className="rsc-preview-notification-item">
                          <Coins size={20} className="rsc-preview-notification-icon-reward" />
                          <div className="rsc-preview-notification-content">
                            <div className="rsc-preview-notification-title">Staking Reward</div>
                            <div className="rsc-preview-notification-text">+12.5 RSK earned</div>
                          </div>
                          <div className="rsc-preview-notification-time">1h ago</div>
                        </div>
                        <div className="rsc-preview-notification-item">
                          <Shield size={20} className="rsc-preview-notification-icon-security" />
                          <div className="rsc-preview-notification-content">
                            <div className="rsc-preview-notification-title">Security Alert</div>
                            <div className="rsc-preview-notification-text">New device login detected</div>
                          </div>
                          <div className="rsc-preview-notification-time">2d ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rsc-preview-label">Notifications</div>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="rsc-preview-thumbnails">
            {[
              { label: 'Home', icon: Wallet },
              { label: 'Send', icon: Send },
              { label: 'Receive', icon: QrCode },
              { label: 'Staking', icon: Coins },
              { label: 'History', icon: History },
              { label: 'Security', icon: Shield },
              { label: 'Backup', icon: Key },
              { label: 'Notifications', icon: Bell }
            ].map((screen, index) => (
              <button
                key={index}
                className={`rsc-preview-thumbnail ${activeScreen === index ? 'active' : ''}`}
                onClick={() => setActiveScreen(index)}
                aria-label={screen.label}
              >
                <div className="rsc-preview-thumbnail-icon">
                  <screen.icon size={20} />
                </div>
                <span className="rsc-preview-thumbnail-label">{screen.label}</span>
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
              <button
            className="rsc-preview-nav rsc-preview-nav-prev"
            onClick={() => setActiveScreen((prev) => (prev > 0 ? prev - 1 : 7))}
            aria-label="Previous screen"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="rsc-preview-nav rsc-preview-nav-next"
            onClick={() => setActiveScreen((prev) => (prev < 7 ? prev + 1 : 0))}
            aria-label="Next screen"
          >
            <ChevronRight size={24} />
              </button>
            </div>
      </section>

      {/* Ecosystem Integration Section */}
      <section className="rsc-ecosystem-section rsc-tech-bg animate-on-scroll">
        {/* Animated Background Elements */}
        <div className="rsc-tech-bg-glow"></div>
        <div className="rsc-tech-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="rsc-tech-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>

        <div className="rsc-ecosystem-container">
          <div className="rsc-ecosystem-header">
            <h2 className="rsc-ecosystem-title">
              La puerta de entrada al <span className="rsc-ecosystem-title-gradient">ecosistema RSC</span>
            </h2>
            <p className="rsc-ecosystem-subtitle">
              RSC Wallet no es una app aislada. Es el punto de acceso a la infraestructura de RSC Chain: identidad, pagos, utilidades y futuras integraciones.
            </p>
          </div>

          <div className="rsc-ecosystem-map">
            {/* Central Wallet Node */}
            <div className="rsc-ecosystem-center">
              <div className="rsc-ecosystem-wallet-node">
                <div className="rsc-ecosystem-wallet-icon-bg"></div>
                <Wallet size={48} className="rsc-ecosystem-wallet-icon" />
                <div className="rsc-ecosystem-wallet-pulse"></div>
                <div className="rsc-ecosystem-wallet-label">RSC Wallet</div>
              </div>
            </div>

            {/* Connection Blocks */}
            <div className="rsc-ecosystem-blocks">
              {/* Block 1 - RSC Chain */}
              <div className="rsc-ecosystem-block" data-block="1">
                <div className="rsc-ecosystem-connection-line"></div>
                <div className="rsc-ecosystem-block-content">
                  <div className="rsc-ecosystem-block-icon-wrapper">
                    <div className="rsc-ecosystem-block-icon-bg"></div>
                    <Network size={32} className="rsc-ecosystem-block-icon" />
        </div>
                  <div className="rsc-ecosystem-block-connection">
                    <Wallet size={20} />
                    <Link2 size={16} />
                    <Network size={20} />
                  </div>
                  <h3 className="rsc-ecosystem-block-title">Wallet ↔ RSC Chain</h3>
                  <p className="rsc-ecosystem-block-description">
                    Operaciones y confirmaciones conectadas a la red.
                  </p>
                </div>
              </div>

              {/* Block 2 - Rewards / Mining / Events */}
              <div className="rsc-ecosystem-block" data-block="2">
                <div className="rsc-ecosystem-connection-line"></div>
                <div className="rsc-ecosystem-block-content">
                  <div className="rsc-ecosystem-block-icon-wrapper">
                    <div className="rsc-ecosystem-block-icon-bg"></div>
                    <Activity size={32} className="rsc-ecosystem-block-icon" />
                  </div>
                  <div className="rsc-ecosystem-block-connection">
                    <Wallet size={20} />
                    <Link2 size={16} />
                    <Activity size={20} />
                  </div>
                  <h3 className="rsc-ecosystem-block-title">Wallet ↔ Rewards / Mining / Events</h3>
                  <p className="rsc-ecosystem-block-description">
                    Recompensas y utilidades dentro del ecosistema.
                  </p>
              </div>
              </div>

              {/* Block 3 - Bridge (Roadmap) */}
              <div className="rsc-ecosystem-block" data-block="3">
                <div className="rsc-ecosystem-connection-line"></div>
                <div className="rsc-ecosystem-block-content">
                  <div className="rsc-ecosystem-block-icon-wrapper">
                    <div className="rsc-ecosystem-block-icon-bg"></div>
                    <Layers size={32} className="rsc-ecosystem-block-icon" />
            </div>
                  <div className="rsc-ecosystem-block-connection">
                    <Wallet size={20} />
                    <Link2 size={16} />
                    <Layers size={20} />
                  </div>
                  <h3 className="rsc-ecosystem-block-title">Wallet ↔ Bridge <span className="rsc-ecosystem-roadmap-badge">(Roadmap)</span></h3>
                  <p className="rsc-ecosystem-block-description">
                    Conexión a otras redes mediante puente oficial cuando esté habilitado.
                  </p>
                </div>
              </div>

              {/* Block 4 - RSC Bank / Payments (Visión) */}
              <div className="rsc-ecosystem-block" data-block="4">
                <div className="rsc-ecosystem-connection-line"></div>
                <div className="rsc-ecosystem-block-content">
                  <div className="rsc-ecosystem-block-icon-wrapper">
                    <div className="rsc-ecosystem-block-icon-bg"></div>
                    <Banknote size={32} className="rsc-ecosystem-block-icon" />
                  </div>
                  <div className="rsc-ecosystem-block-connection">
                    <Wallet size={20} />
                    <Link2 size={16} />
                    <Banknote size={20} />
                  </div>
                  <h3 className="rsc-ecosystem-block-title">Wallet ↔ RSC Bank / Payments <span className="rsc-ecosystem-vision-badge">(Visión)</span></h3>
                  <p className="rsc-ecosystem-block-description">
                    Pagos diarios, conversión y experiencia bancaria cripto-first.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="rsc-faq-section rsc-tech-bg animate-on-scroll">
        {/* Animated Background Elements */}
        <div className="rsc-tech-bg-glow"></div>
        <div className="rsc-tech-particles">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="rsc-tech-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>

        <div className="rsc-faq-container">
          <div className="rsc-faq-header">
            <h2 className="rsc-faq-title">
              Preguntas <span className="rsc-faq-title-gradient">frecuentes</span>
            </h2>
            <p className="rsc-faq-subtitle">
              Todo lo que necesitas saber sobre RSC Wallet
          </p>
        </div>

          <div className="rsc-faq-list">
            {/* FAQ 1 */}
            <div className={`rsc-faq-item ${openFaq === 0 ? 'rsc-faq-item--open' : ''}`}>
              <button
                className="rsc-faq-question"
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                aria-expanded={openFaq === 0}
              >
                <span className="rsc-faq-question-text">¿RSC Wallet es custodial?</span>
                <span className="rsc-faq-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d={openFaq === 0 ? "M5 12L19 12" : "M12 5L12 19M5 12L19 12"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <div className={`rsc-faq-answer ${openFaq === 0 ? 'rsc-faq-answer--open' : ''}`}>
                <p>No. Está diseñada como non-custodial: el acceso y control lo mantiene el usuario.</p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className={`rsc-faq-item ${openFaq === 1 ? 'rsc-faq-item--open' : ''}`}>
              <button
                className="rsc-faq-question"
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                aria-expanded={openFaq === 1}
              >
                <span className="rsc-faq-question-text">¿Qué pasa si pierdo mi teléfono?</span>
                <span className="rsc-faq-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d={openFaq === 1 ? "M5 12L19 12" : "M12 5L12 19M5 12L19 12"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <div className={`rsc-faq-answer ${openFaq === 1 ? 'rsc-faq-answer--open' : ''}`}>
                <p>Puedes recuperar tu wallet usando tu frase semilla (seed). Por eso es clave guardarla bien.</p>
        </div>
            </div>

            {/* FAQ 3 */}
            <div className={`rsc-faq-item ${openFaq === 2 ? 'rsc-faq-item--open' : ''}`}>
              <button
                className="rsc-faq-question"
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                aria-expanded={openFaq === 2}
              >
                <span className="rsc-faq-question-text">¿Hay comisiones?</span>
                <span className="rsc-faq-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d={openFaq === 2 ? "M5 12L19 12" : "M12 5L12 19M5 12L19 12"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
            </button>
              <div className={`rsc-faq-answer ${openFaq === 2 ? 'rsc-faq-answer--open' : ''}`}>
                <p>Puede haber comisiones de red según la operación. La app mostrará el costo antes de confirmar.</p>
          </div>
            </div>

            {/* FAQ 4 */}
            <div className={`rsc-faq-item ${openFaq === 3 ? 'rsc-faq-item--open' : ''}`}>
              <button
                className="rsc-faq-question"
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                aria-expanded={openFaq === 3}
              >
                <span className="rsc-faq-question-text">¿Puedo ver mis transacciones?</span>
                <span className="rsc-faq-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d={openFaq === 3 ? "M5 12L19 12" : "M12 5L12 19M5 12L19 12"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
              </svg>
                </span>
              </button>
              <div className={`rsc-faq-answer ${openFaq === 3 ? 'rsc-faq-answer--open' : ''}`}>
                <p>Sí. Tendrás historial con estados y detalles básicos.</p>
            </div>
            </div>

            {/* FAQ 5 */}
            <div className={`rsc-faq-item ${openFaq === 4 ? 'rsc-faq-item--open' : ''}`}>
              <button
                className="rsc-faq-question"
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                aria-expanded={openFaq === 4}
              >
                <span className="rsc-faq-question-text">¿Está disponible en iOS/Android?</span>
                <span className="rsc-faq-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d={openFaq === 4 ? "M5 12L19 12" : "M12 5L12 19M5 12L19 12"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
              </svg>
                </span>
              </button>
              <div className={`rsc-faq-answer ${openFaq === 4 ? 'rsc-faq-answer--open' : ''}`}>
                <p>Sí / Coming soon (usa el estado real que tengas).</p>
            </div>
            </div>

            {/* FAQ 6 */}
            <div className={`rsc-faq-item ${openFaq === 5 ? 'rsc-faq-item--open' : ''}`}>
              <button
                className="rsc-faq-question"
                onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                aria-expanded={openFaq === 5}
              >
                <span className="rsc-faq-question-text">¿RSC Wallet es parte de RSC Chain?</span>
                <span className="rsc-faq-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d={openFaq === 5 ? "M5 12L19 12" : "M12 5L12 19M5 12L19 12"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
              </svg>
                </span>
              </button>
              <div className={`rsc-faq-answer ${openFaq === 5 ? 'rsc-faq-answer--open' : ''}`}>
                <p>Sí. Es el producto oficial para interactuar con el ecosistema y sus utilidades.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="rsc-cta-final-section rsc-tech-bg animate-on-scroll">
        {/* Animated Background Elements */}
        <div className="rsc-tech-bg-glow"></div>
        <div className="rsc-tech-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="rsc-tech-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>

        <div className="rsc-cta-final-container">
          <div className="rsc-cta-final-content">
            <div className="rsc-cta-final-badge">
              <span className="rsc-cta-final-badge-dot"></span>
              <span>Listo para empezar</span>
            </div>
            
            <h2 className="rsc-cta-final-title">
              Crea tu <span className="rsc-cta-final-title-gradient">RSC Wallet</span> hoy
            </h2>
            
            <p className="rsc-cta-final-subtitle">
              Accede al ecosistema RSC con control real, transacciones rápidas y seguridad práctica.
            </p>

            <div className="rsc-cta-final-actions">
              <button 
                className="rsc-cta-final-primary"
                onClick={onEnter || handleEnter}
              >
                <Download size={20} />
                <span>Descargar RSC Wallet</span>
                <ArrowRight size={20} />
              </button>
              
              <button 
                className="rsc-cta-final-secondary"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              >
                <BookOpen size={20} />
                <span>Ver documentación / Seguridad</span>
              </button>
            </div>

            <p className="rsc-cta-final-microcopy">
              Disponible para usuarios que buscan operar con libertad y claridad.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="rsc-cta-final-decoration">
            <div className="rsc-cta-final-ring rsc-cta-final-ring-1"></div>
            <div className="rsc-cta-final-ring rsc-cta-final-ring-2"></div>
            <div className="rsc-cta-final-ring rsc-cta-final-ring-3"></div>
          </div>
        </div>
      </section>

      {/* Footer Completo */}
      <footer className="vaulto-footer">
        <div className="vaulto-footer-content">
          <div className="vaulto-footer-section">
            <div className="vaulto-footer-logo">
              <div className="vaulto-logo-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="url(#footer-gradient)" />
                  <defs>
                    <linearGradient id="footer-gradient" x1="2" y1="7" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#14b8a6" />
                      <stop offset="0.5" stopColor="#06b6d4" />
                      <stop offset="1" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="vaulto-footer-brand">RSC Wallet</span>
            </div>
            <p className="vaulto-footer-tagline">
              Your sovereign economy on the RSC Chain
            </p>
            <div className="vaulto-footer-social">
              <a href="#" className="vaulto-social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="vaulto-social-link" aria-label="Discord">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C2.451 6.018 1.73 7.74 1.43 9.497a.082.082 0 0 0 .031.084 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.084c-.3-1.759-1.022-3.48-2.216-5.1a.051.051 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="vaulto-social-link" aria-label="Telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="vaulto-social-link" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="vaulto-footer-section">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#" onClick={onEnter || handleEnter}>Dashboard</a>
          </div>

          <div className="vaulto-footer-section">
            <h4>Resources</h4>
            <a href="#faq">FAQ</a>
            <a href="#">Documentation</a>
            <a href="#">API</a>
            <a href="#">Blog</a>
          </div>

          <div className="vaulto-footer-section">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
            <a href="#">Press</a>
          </div>

          <div className="vaulto-footer-section">
            <h4>Legal</h4>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
            <a href="#">Compliance</a>
          </div>
        </div>

        <div className="vaulto-footer-bottom">
          <p className="vaulto-footer-disclaimer">
            ⚠️ We do not custody your funds · We do not sell your data · If you lose your key, no one can recover it
          </p>
          <p className="vaulto-footer-copyright">
            © 2025 RSC Wallet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

