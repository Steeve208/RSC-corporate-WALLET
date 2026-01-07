import React, { ErrorBoundary } from 'react';
// Import components directly from frontend folder
// @ts-ignore - JSX files
import { Header } from '../../frontend/src/components/Header.jsx';
// @ts-ignore - JSX files
import { SaleCard } from '../../frontend/src/components/SaleCard.jsx';
// Import CSS from frontend
import '../../frontend/src/App.css';
import '../../frontend/src/components/Header.css';
import '../../frontend/src/components/SaleCard.css';
import '../../frontend/src/components/BuyForm.css';
import '../../frontend/src/components/ClaimSection.css';
import '../../frontend/src/components/InfoPanel.css';

// Error boundary component
class SaleErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error in Sale components:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Error loading sale page</h2>
          <p>{this.state.error?.message || 'Unknown error'}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function RSKSalePage() {
  return (
    <SaleErrorBoundary>
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
    </SaleErrorBoundary>
  );
}
