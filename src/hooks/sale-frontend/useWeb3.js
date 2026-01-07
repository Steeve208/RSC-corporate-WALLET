import { useState, useEffect } from 'react';
import { connectWallet, switchToBSC, isMobile } from '../../utils/sale-frontend/web3.js';

// Función para esperar a que window.ethereum esté disponible
async function waitForEthereum(maxWait = 5000) {
  if (window.ethereum) {
    return window.ethereum;
  }
  
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (window.ethereum) {
        clearInterval(checkInterval);
        resolve(window.ethereum);
      } else if (Date.now() - startTime > maxWait) {
        clearInterval(checkInterval);
        resolve(null);
      }
    }, 100);
  });
}

export function useWeb3() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [ethereumReady, setEthereumReady] = useState(false);

  useEffect(() => {
    // En móvil, esperar a que ethereum esté disponible
    const initEthereum = async () => {
      if (isMobile()) {
        const ethereum = await waitForEthereum(5000);
        if (ethereum) {
          setEthereumReady(true);
          setupListeners(ethereum);
          checkConnection(ethereum);
        }
      } else {
        if (window.ethereum) {
          setEthereumReady(true);
          setupListeners(window.ethereum);
          checkConnection(window.ethereum);
        }
      }
    };

    initEthereum();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const setupListeners = (ethereum) => {
    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);
  };

  const checkConnection = async (ethereum) => {
    try {
      if (ethereum) {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connect();
        }
      }
    } catch (err) {
      console.error('Error checking connection:', err);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnect();
    } else {
      connect();
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const { provider: prov, signer: sig, address } = await connectWallet();
      setProvider(prov);
      setSigner(sig);
      setAccount(address);
    } catch (err) {
      setError(err.message);
      console.error('Error connecting wallet:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
  };

  return {
    account,
    provider,
    signer,
    isConnecting,
    error,
    connect,
    disconnect,
    isConnected: !!account
  };
}

