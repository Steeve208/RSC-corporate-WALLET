import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3.js';
import { useSaleContract } from '../hooks/useSaleContract.js';
import { formatNumber, formatDate } from '../utils/web3.js';
import './ClaimSection.css';

export function ClaimSection() {
  const { provider, signer } = useWeb3();
  const { userPurchase, claimableAmount, claim, refresh } = useSaleContract(provider, signer);
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!userPurchase) return null;

  const totalVested = parseFloat(userPurchase.total) * 0.75;
  const claimed = parseFloat(userPurchase.claimed);
  const remaining = totalVested - claimed;
  const claimable = parseFloat(claimableAmount);

  const handleClaim = async () => {
    if (claimable <= 0) {
      setError('No tokens available to claim');
      return;
    }

    setError(null);
    setSuccess(null);
    setIsClaiming(true);

    try {
      const txHash = await claim();
      setSuccess(`Tokens claimed successfully! TX: ${txHash.slice(0, 10)}...`);
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="claim-section">
      <h3>My Tokens</h3>
      
      <div className="claim-info">
        <div className="info-row">
          <span className="info-label">Total purchased:</span>
          <span className="info-value">{formatNumber(userPurchase.total, 2)} wRSK</span>
        </div>
        <div className="info-row">
          <span className="info-label">Received immediately (25%):</span>
          <span className="info-value">{formatNumber(parseFloat(userPurchase.total) * 0.25, 2)} wRSK</span>
        </div>
        <div className="info-row">
          <span className="info-label">In vesting (75%):</span>
          <span className="info-value">{formatNumber(totalVested, 2)} wRSK</span>
        </div>
        <div className="info-row">
          <span className="info-label">Already claimed:</span>
          <span className="info-value">{formatNumber(claimed, 2)} wRSK</span>
        </div>
        <div className="info-row highlight">
          <span className="info-label">Available to claim:</span>
          <span className="info-value">{formatNumber(claimable, 2)} wRSK</span>
        </div>
        <div className="info-row">
          <span className="info-label">Pending:</span>
          <span className="info-value">{formatNumber(remaining - claimable, 2)} wRSK</span>
        </div>
      </div>

      {claimable > 0 && (
        <div className="claim-action">
          <button 
            onClick={handleClaim} 
            className="btn-claim"
            disabled={isClaiming || claimable <= 0}
          >
            {isClaiming ? 'Processing...' : `Claim ${formatNumber(claimable, 2)} wRSK`}
          </button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="vesting-note">
        <p>
          <strong>Vesting Note:</strong> 75% of your tokens are released gradually 
          over 6 months from the purchase date. You can claim available tokens at 
          any time.
        </p>
        <p className="vesting-date">
          Vesting start date: {formatDate(userPurchase.startTime)}
        </p>
      </div>
    </div>
  );
}

