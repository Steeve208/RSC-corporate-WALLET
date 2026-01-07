import React from 'react';
import { Header } from './components/Header.jsx';
import { SaleCard } from './components/SaleCard.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
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

export default App;

