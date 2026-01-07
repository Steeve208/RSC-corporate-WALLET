import React from 'react';
import { useWeb3 } from '../hooks/useWeb3.js';
import { formatAddress } from '../utils/web3.js';
import './Header.css';

export function Header() {
  const { account, isConnecting, connect, disconnect, error } = useWeb3();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>wRSK Sale</h1>
          <span className="subtitle">RSC Finance</span>
        </div>
        
        <div className="wallet-section">
          {error && <div className="error-message">{error}</div>}
          
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

