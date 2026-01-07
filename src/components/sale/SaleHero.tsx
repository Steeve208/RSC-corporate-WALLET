import { Rocket, CheckCircle, XCircle, PauseCircle, Wallet } from 'lucide-react';
import { SaleInfo } from '../../hooks/useRSKSale';
import { CountdownTimer } from './CountdownTimer';

interface SaleHeroProps {
  saleInfo: SaleInfo | null;
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

export function SaleHero({ saleInfo, isWalletConnected, onConnectWallet }: SaleHeroProps) {
  const getStatusInfo = () => {
    if (!saleInfo) {
      return { text: 'Cargando...', icon: null, color: 'gray' };
    }
    if (saleInfo.paused) {
      return { text: 'Pausado', icon: PauseCircle, color: 'orange' };
    }
    if (saleInfo.active) {
      return { text: 'Activo', icon: CheckCircle, color: 'green' };
    }
    return { text: 'Inactivo', icon: XCircle, color: 'red' };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  // Determinar tiempo objetivo para countdown
  const getTargetTime = () => {
    if (!saleInfo) return 0;
    const now = Math.floor(Date.now() / 1000);
    
    // Si está inactivo, mostrar countdown hasta inicio
    if (!saleInfo.active && saleInfo.startTime > now) {
      return saleInfo.startTime;
    }
    
    // Si está activo, mostrar countdown hasta fin
    if (saleInfo.active && saleInfo.endTime > now) {
      return saleInfo.endTime;
    }
    
    return 0; // Ya terminó
  };

  const targetTime = getTargetTime();
  const isBeforeStart = saleInfo && !saleInfo.active && saleInfo.startTime > Math.floor(Date.now() / 1000);

  return (
    <section className="rsk-sale-hero">
      <div className="rsk-sale-hero-container">
        {/* Badge First Round */}
        <div className="rsk-sale-badge">
          <Rocket size={16} />
          <span>FIRST ROUND</span>
        </div>

        {/* Título */}
        <h1 className="rsk-sale-hero-title">
          RSK Token Sale
        </h1>
        <p className="rsk-sale-hero-subtitle">
          Oportunidad exclusiva para adquirir wRSK con USDT en BSC Mainnet
        </p>

        {/* Estado del Sale */}
        {saleInfo && StatusIcon && (
          <div className={`rsk-sale-status rsk-sale-status--${statusInfo.color}`}>
            <StatusIcon size={20} />
            <span>{statusInfo.text}</span>
          </div>
        )}

        {/* Countdown Timer */}
        {targetTime > 0 && (
          <div className="rsk-sale-countdown-wrapper">
            <p className="rsk-sale-countdown-label">
              {isBeforeStart ? 'Inicia en:' : 'Termina en:'}
            </p>
            <CountdownTimer targetTime={targetTime} />
          </div>
        )}

        {/* Estadísticas en tiempo real */}
        {saleInfo && (
          <div className="rsk-sale-stats">
            <div className="rsk-sale-stat-card">
              <div className="rsk-sale-stat-label">Precio</div>
              <div className="rsk-sale-stat-value">{saleInfo.price} USDT</div>
              <div className="rsk-sale-stat-sub">por wRSK</div>
            </div>

            <div className="rsk-sale-stat-card">
              <div className="rsk-sale-stat-label">Disponible</div>
              <div className="rsk-sale-stat-value">
                {parseFloat(saleInfo.remaining).toLocaleString()}
              </div>
              <div className="rsk-sale-stat-sub">wRSK</div>
            </div>

            <div className="rsk-sale-stat-card">
              <div className="rsk-sale-stat-label">Vendido</div>
              <div className="rsk-sale-stat-value">
                {parseFloat(saleInfo.sold).toLocaleString()}
              </div>
              <div className="rsk-sale-stat-sub">
                {saleInfo.progress.toFixed(1)}% completado
              </div>
            </div>
          </div>
        )}

        {/* CTA para conectar wallet */}
        {!isWalletConnected && (
          <div className="rsk-sale-hero-cta">
            <button
              className="rsk-button rsk-button--primary rsk-button--large"
              onClick={onConnectWallet}
            >
              <Wallet size={24} />
              Conectar Wallet y Participar
            </button>
          </div>
        )}
      </div>
    </section>
  );
}





