import { useState } from 'react';
import { Coins, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { UserInfo } from '../../hooks/useRSKSale';

interface VestingSectionProps {
  userInfo: UserInfo;
  isLoading: boolean;
  onClaim: () => Promise<string>;
}

export function VestingSection({ userInfo, isLoading, onClaim }: VestingSectionProps) {
  const [txStatus, setTxStatus] = useState<{
    hash: string | null;
    message: string | null;
  }>({ hash: null, message: null });

  // Calcular progreso del vesting
  const calculateVestingProgress = () => {
    const totalVesting = parseFloat(userInfo.totalPurchased) * 0.75;
    const claimed = parseFloat(userInfo.claimed);
    return totalVesting > 0 ? (claimed / totalVesting) * 100 : 0;
  };

  const vestingProgress = calculateVestingProgress();
  const claimable = parseFloat(userInfo.claimable);

  const handleClaim = async () => {
    if (claimable <= 0) {
      setTxStatus({ hash: null, message: 'No hay tokens disponibles para reclamar' });
      return;
    }

    try {
      setTxStatus({ hash: null, message: 'Reclamando tokens...' });
      const claimHash = await onClaim();
      setTxStatus({ hash: claimHash, message: 'Tokens reclamados exitosamente' });
      
      setTimeout(() => {
        setTxStatus({ hash: null, message: null });
      }, 5000);
    } catch (err: any) {
      setTxStatus({ hash: null, message: err.message || 'Error al reclamar' });
    }
  };

  return (
    <section className="rsk-vesting-section">
      <h2 className="rsk-section-title">Mi Participación</h2>
      <div className="rsk-vesting-card">
        <div className="rsk-vesting-stats">
          <div className="rsk-vesting-stat">
            <div className="rsk-vesting-stat-label">Total comprado</div>
            <div className="rsk-vesting-stat-value">
              {parseFloat(userInfo.totalPurchased).toFixed(2)} wRSK
            </div>
          </div>

          <div className="rsk-vesting-stat">
            <div className="rsk-vesting-stat-label">Ya reclamado</div>
            <div className="rsk-vesting-stat-value">
              {parseFloat(userInfo.claimed).toFixed(2)} wRSK
            </div>
          </div>

          <div className="rsk-vesting-stat">
            <div className="rsk-vesting-stat-label">Disponible para reclamar</div>
            <div className="rsk-vesting-stat-value rsk-vesting-stat-value--claimable">
              {claimable.toFixed(2)} wRSK
            </div>
          </div>
        </div>

        <div className="rsk-vesting-progress">
          <div className="rsk-vesting-progress-header">
            <span>Progreso del vesting</span>
            <span>{vestingProgress.toFixed(1)}%</span>
          </div>
          <div className="rsk-vesting-progress-bar">
            <div
              className="rsk-vesting-progress-fill"
              style={{ width: `${Math.min(vestingProgress, 100)}%` }}
            />
          </div>
        </div>

        <button
          className="rsk-button rsk-button--primary rsk-button--claim"
          onClick={handleClaim}
          disabled={isLoading || claimable <= 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="rsk-button-spinner" size={20} />
              Reclamando...
            </>
          ) : (
            <>
              <Coins size={20} />
              Reclamar tokens
            </>
          )}
        </button>

        {txStatus.message && (
          <div className={`rsk-tx-message rsk-tx-message--${txStatus.hash ? 'claim' : 'info'}`}>
            {txStatus.message}
            {txStatus.hash && (
              <a
                href={`https://bscscan.com/tx/${txStatus.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rsk-tx-link"
              >
                <ExternalLink size={16} />
                Ver en BSCScan
              </a>
            )}
          </div>
        )}

        {txStatus.message && txStatus.message.includes('Error') && (
          <div className="rsk-error-message">
            <AlertCircle size={16} />
            <span>{txStatus.message}</span>
          </div>
        )}
      </div>
    </section>
  );
}



