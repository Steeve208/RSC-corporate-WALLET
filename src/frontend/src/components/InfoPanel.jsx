import React from 'react';
import { formatNumber } from '../utils/web3.js';
import './InfoPanel.css';

export function InfoPanel({ saleInfo }) {
  if (!saleInfo) return null;

  const progress = (parseFloat(saleInfo.totalSold) / parseFloat(saleInfo.totalSale)) * 100;

  return (
    <div className="info-panel">
      <h3>Sale Information</h3>
      
      <div className="progress-section">
        <div className="progress-header">
          <span>Sale progress</span>
          <span>{formatNumber(progress, 1)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <span>{formatNumber(saleInfo.totalSold, 0)} / {formatNumber(saleInfo.totalSale, 0)} wRSK</span>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <div className="info-icon">💰</div>
          <div className="info-content">
            <div className="info-title">Price</div>
            <div className="info-desc">{formatNumber(saleInfo.price, 6)} USDT per wRSK</div>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-icon">🔒</div>
          <div className="info-content">
            <div className="info-title">Vesting</div>
            <div className="info-desc">25% immediate, 75% over 6 months</div>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-icon">👤</div>
          <div className="info-content">
            <div className="info-title">Limit per user</div>
            <div className="info-desc">{formatNumber(saleInfo.maxPerUser, 0)} wRSK</div>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-icon">💳</div>
          <div className="info-content">
            <div className="info-title">Payment method</div>
            <div className="info-desc">USDT (BSC)</div>
          </div>
        </div>
      </div>

      <div className="disclaimer">
        <p>
          <strong>Important:</strong> Make sure you have enough USDT in your wallet 
          and have approved the contract spending. Tokens are distributed 
          automatically: 25% immediately and 75% vested over 6 months.
        </p>
      </div>
    </div>
  );
}

