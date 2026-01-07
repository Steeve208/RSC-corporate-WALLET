import React from 'react';
// Import components from integrated sale-frontend
// @ts-ignore - JSX files
import { Header } from '../sale-frontend/Header.jsx';
// @ts-ignore - JSX files
import { SaleCard } from '../sale-frontend/SaleCard.jsx';
// Import CSS from sale-frontend
import '../../styles/sale-frontend.css';
import '../sale-frontend/Header.css';
import '../sale-frontend/SaleCard.css';
import '../sale-frontend/BuyForm.css';
import '../sale-frontend/ClaimSection.css';
import '../sale-frontend/InfoPanel.css';

export function RSKSalePage() {
  return (
    <div className="app" style={{ minHeight: '100vh' }}>
      <Header />
      <main className="main-content">
        <SaleCard />
      </main>
      <footer className="footer">
        <p>© 2026 RSC Finance. All rights reserved.</p>
        <p>
          <a href="https://bscscan.com/address/0xc8D38246503e06Cf2a75114EaD4dA1cb7840F28A" target="_blank" rel="noopener noreferrer">
            View contract on BSCScan
          </a>
        </p>
      </footer>
    </div>
  );
}
