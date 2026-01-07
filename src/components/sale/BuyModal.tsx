import { useState, useEffect } from 'react';
import { X, TrendingUp, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { SaleInfo, UserInfo } from '../../hooks/useRSKSale';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  saleInfo: SaleInfo | null;
  userInfo: UserInfo | null;
  isLoading: boolean;
  onApprove: (amount: string) => Promise<string>;
  onBuy: (amount: string) => Promise<string>;
}

export function BuyModal({
  isOpen,
  onClose,
  saleInfo,
  userInfo,
  isLoading,
  onApprove,
  onBuy,
}: BuyModalProps) {
  const [usdtAmount, setUsdtAmount] = useState('');
  const [txStatus, setTxStatus] = useState<{
    type: 'approve' | 'buy' | null;
    hash: string | null;
    message: string | null;
  }>({ type: null, hash: null, message: null });

  // Calcular wRSK basado en precio
  const calculateWRSK = (usdt: string) => {
    if (!saleInfo || !usdt || parseFloat(usdt) <= 0) {
      return { total: '0', immediate: '0', vesting: '0' };
    }
    const total = (parseFloat(usdt) / parseFloat(saleInfo.price)).toString();
    const immediate = (parseFloat(total) * 0.25).toString();
    const vesting = (parseFloat(total) * 0.75).toString();
    return { total, immediate, vesting };
  };

  const wRSKCalculation = calculateWRSK(usdtAmount);

  // Reset al cerrar
  useEffect(() => {
    if (!isOpen) {
      setUsdtAmount('');
      setTxStatus({ type: null, hash: null, message: null });
    }
  }, [isOpen]);

  const handleBuy = async () => {
    if (!usdtAmount || parseFloat(usdtAmount) <= 0) {
      setTxStatus({ type: null, hash: null, message: 'Por favor, ingresa una cantidad válida' });
      return;
    }

    if (!userInfo) {
      setTxStatus({ type: null, hash: null, message: 'Wallet no conectada' });
      return;
    }

    if (parseFloat(usdtAmount) > parseFloat(userInfo.usdtBalance)) {
      setTxStatus({ type: null, hash: null, message: 'Balance insuficiente de USDT' });
      return;
    }

    try {
      setTxStatus({ type: null, hash: null, message: null });

      // Verificar si necesita approve
      const usdtAmountNum = parseFloat(usdtAmount);
      const currentAllowanceNum = parseFloat(userInfo.usdtAllowance);

      if (usdtAmountNum > currentAllowanceNum) {
        // FASE 1: Approve
        setTxStatus({ type: 'approve', hash: null, message: 'Esperando confirmación de aprobación...' });
        const approveHash = await onApprove(usdtAmount);
        setTxStatus({ type: 'approve', hash: approveHash, message: 'USDT autorizado correctamente' });
        
        // Pequeña pausa
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // FASE 2: Buy
      setTxStatus({ type: 'buy', hash: null, message: 'Confirmando compra...' });
      const buyHash = await onBuy(usdtAmount);
      setTxStatus({ type: 'buy', hash: buyHash, message: 'Compra exitosa' });
      
      // Limpiar y cerrar después de 3 segundos
      setTimeout(() => {
        setUsdtAmount('');
        setTxStatus({ type: null, hash: null, message: null });
        onClose();
      }, 3000);
    } catch (err: any) {
      setTxStatus({ type: null, hash: null, message: err.message || 'Error en la transacción' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rsk-modal-overlay" onClick={onClose}>
      <div className="rsk-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="rsk-modal-header">
          <h2 className="rsk-modal-title">Comprar wRSK</h2>
          <button className="rsk-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="rsk-modal-body">
          <div className="rsk-buy-input-group">
            <label className="rsk-buy-input-label">Cantidad en USDT</label>
            <div className="rsk-buy-input-wrapper">
              <input
                type="number"
                className="rsk-buy-input"
                placeholder="0.00"
                value={usdtAmount}
                onChange={(e) => setUsdtAmount(e.target.value)}
                min="0"
                step="0.01"
                disabled={isLoading}
              />
              <button
                className="rsk-button-max"
                onClick={() => userInfo && setUsdtAmount(userInfo.usdtBalance)}
                disabled={isLoading || !userInfo}
              >
                MAX
              </button>
            </div>
            {userInfo && (
              <p className="rsk-buy-balance">
                Balance disponible: {parseFloat(userInfo.usdtBalance).toFixed(2)} USDT
              </p>
            )}
          </div>

          {usdtAmount && parseFloat(usdtAmount) > 0 && (
            <div className="rsk-buy-calculation">
              <div className="rsk-buy-calculation-item">
                <span>Total wRSK:</span>
                <span className="rsk-buy-calculation-value">
                  {parseFloat(wRSKCalculation.total).toFixed(2)} wRSK
                </span>
              </div>
              <div className="rsk-buy-calculation-item">
                <span>25% Inmediato:</span>
                <span className="rsk-buy-calculation-value">
                  {parseFloat(wRSKCalculation.immediate).toFixed(2)} wRSK
                </span>
              </div>
              <div className="rsk-buy-calculation-item">
                <span>75% Vesting:</span>
                <span className="rsk-buy-calculation-value">
                  {parseFloat(wRSKCalculation.vesting).toFixed(2)} wRSK
                </span>
              </div>
            </div>
          )}

          <button
            className="rsk-button rsk-button--primary rsk-button--buy"
            onClick={handleBuy}
            disabled={isLoading || !usdtAmount || parseFloat(usdtAmount) <= 0}
          >
            {isLoading && txStatus.type === 'approve' ? (
              <>
                <Loader2 className="rsk-button-spinner" size={20} />
                Autorizando USDT...
              </>
            ) : isLoading && txStatus.type === 'buy' ? (
              <>
                <Loader2 className="rsk-button-spinner" size={20} />
                Comprando...
              </>
            ) : (
              <>
                <TrendingUp size={20} />
                Comprar wRSK
              </>
            )}
          </button>

          {txStatus.message && (
            <div className={`rsk-tx-message rsk-tx-message--${txStatus.type || 'info'}`}>
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
      </div>
    </div>
  );
}





