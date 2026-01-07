import React, { useState } from 'react';
import { useSaleContract } from '../../hooks/sale-frontend/useSaleContract.js';
import { useWeb3 } from '../../hooks/sale-frontend/useWeb3.js';
import { BuyForm } from './BuyForm.jsx';
import { ClaimSection } from './ClaimSection.jsx';
import { InfoPanel } from './InfoPanel.jsx';
import { formatNumber, formatDate, getTimeRemaining } from '../../utils/sale-frontend/web3.js';
import './SaleCard.css';

export function SaleCard() {
  const { account, provider, signer, isConnecting } = useWeb3();
  const { saleInfo, userPurchase, claimableAmount, isLoading, error } = useSaleContract(provider, signer);
  
  // If no wallet connected, show friendly message
  if (!account && !isConnecting && !saleInfo) {
    // If loading, show spinner
    if (isLoading) {
      return (
        <div className="sale-card loading">
          <div className="spinner"></div>
          <p>Loading sale information...</p>
        </div>
      );
    }
    
    // If not loading, show message to connect wallet
    return (
      <div className="sale-card">
        <div className="connect-wallet-prompt">
          <div className="prompt-icon">🔐</div>
          <h3>Connect Your Wallet to View Sale Information</h3>
          <p>
            To view the wRSK token sale details and participate, you need to connect your MetaMask wallet.
            Once connected, you'll be able to see all sale information and purchase tokens with USDT.
          </p>
          <ul className="prompt-features">
            <li>✅ View real-time sale information</li>
            <li>✅ Buy wRSK tokens with USDT</li>
            <li>✅ Receive 25% immediately</li>
            <li>✅ 75% vested over 6 months</li>
            <li>✅ Claim your tokens when available</li>
          </ul>
          <p className="prompt-note">
            <strong>Note: Make sure you have MetaMask installed and are on BSC Mainnet.</strong>
          </p>
        </div>
      </div>
    );
  }

  // If loading and has wallet or saleInfo, show spinner
  if (isLoading && !saleInfo) {
    return (
      <div className="sale-card loading">
        <div className="spinner"></div>
        <p>Loading sale information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sale-card error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!saleInfo) {
    return (
      <div className="sale-card">
        <p>Could not load sale information.</p>
      </div>
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const isSaleActive = now >= saleInfo.startTime && now <= saleInfo.endTime && !saleInfo.paused;
  const isSaleUpcoming = now < saleInfo.startTime;
  const isSaleEnded = now > saleInfo.endTime;

  const timeRemaining = isSaleUpcoming 
    ? getTimeRemaining(saleInfo.startTime)
    : isSaleActive 
    ? getTimeRemaining(saleInfo.endTime)
    : null;

  return (
    <div className="sale-card">
      <div className="sale-header">
        <h2>wRSK Public Sale</h2>
        <div className="sale-status">
          {isSaleUpcoming && (
            <span className="status-badge upcoming">Upcoming</span>
          )}
          {isSaleActive && (
            <span className="status-badge active">Active</span>
          )}
          {isSaleEnded && (
            <span className="status-badge ended">Ended</span>
          )}
          {saleInfo.paused && (
            <span className="status-badge paused">Paused</span>
          )}
        </div>
      </div>

      <div className="sale-stats">
        <div className="stat-item">
          <div className="stat-label">Price</div>
          <div className="stat-value">{formatNumber(saleInfo.price, 6)} USDT</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Sold</div>
          <div className="stat-value">{formatNumber(saleInfo.totalSold, 0)} wRSK</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Available</div>
          <div className="stat-value">{formatNumber(saleInfo.remaining, 0)} wRSK</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Max per user</div>
          <div className="stat-value">{formatNumber(saleInfo.maxPerUser, 0)} wRSK</div>
        </div>
      </div>

      {timeRemaining && !timeRemaining.isPast && (
        <div className="countdown">
          <div className="countdown-label">
            {isSaleUpcoming ? 'Starts in:' : 'Ends in:'}
          </div>
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="countdown-value">{timeRemaining.days}</span>
              <span className="countdown-unit">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeRemaining.hours}</span>
              <span className="countdown-unit">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeRemaining.minutes}</span>
              <span className="countdown-unit">Min</span>
            </div>
          </div>
        </div>
      )}

      <div className="sale-dates">
        <div className="date-item">
          <span className="date-label">Start:</span>
          <span className="date-value">{formatDate(saleInfo.startTime)}</span>
        </div>
        <div className="date-item">
          <span className="date-label">End:</span>
          <span className="date-value">{formatDate(saleInfo.endTime)}</span>
        </div>
      </div>

      {isSaleActive && (
        <>
          {account ? (
            <>
              <BuyForm />
              {userPurchase && <ClaimSection />}
            </>
          ) : (
            <div className="connect-wallet-prompt">
              <div className="prompt-icon">🔐</div>
              <h3>Connect Your Wallet to Purchase</h3>
              <p>
                To participate in the wRSK sale, you need to connect your MetaMask wallet.
                Once connected, you'll be able to purchase tokens with USDT.
              </p>
              <ul className="prompt-features">
                <li>✅ Buy wRSK tokens with USDT</li>
                <li>✅ Receive 25% immediately</li>
                <li>✅ 75% vested over 6 months</li>
                <li>✅ Claim your tokens when available</li>
              </ul>
              <p className="prompt-note">
                <strong>Note: Make sure you have USDT on BSC Mainnet and enough BNB for gas fees.</strong>
              </p>
            </div>
          )}
        </>
      )}
      
      <InfoPanel saleInfo={saleInfo} />
    </div>
  );
}

