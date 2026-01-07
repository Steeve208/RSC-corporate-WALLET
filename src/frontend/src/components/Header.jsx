import React from 'react';
import { useWeb3 } from '../hooks/useWeb3.js';
import { formatAddress, isMobile } from '../utils/web3.js';
import './Header.css';

export function Header() {
  const { account, isConnecting, connect, disconnect, error } = useWeb3();
  const mobile = isMobile();

  // Mejorar mensaje de error para móvil
  const getErrorMessage = (err) => {
    if (!err) return null;
    if (mobile && err.includes('not installed')) {
      return 'Please open this page in the MetaMask app browser. If you don\'t have MetaMask, download it from your app store.';
    }
    if (mobile && err.includes('not detected')) {
      return 'MetaMask not detected. Please open this page in the MetaMask app browser.';
    }
    return err;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>wRSK Sale</h1>
          <span className="subtitle">RSC Finance</span>
        </div>
        
        <div className="wallet-section">
          {error && (
            <div className="error-message" style={{ fontSize: mobile ? '0.85rem' : '0.9rem' }}>
              {getErrorMessage(error)}
            </div>
          )}
          
          {account ? (
            <div className="wallet-connected">
              <div className="wallet-address">
                <span className="address-label">Connected:</span>
                <span className="address-value">{formatAddress(account)}</span>
              </div>
              <button onClick={disconnect} className="btn-disconnect">
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={(e) => {
                e.preventDefault();
                connect();
              }} 
              className="btn-connect"
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

