import { ethers } from 'ethers';
import { BSC_NETWORK } from '../config/contracts.js';

/**
 * Detecta si es un dispositivo móvil
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768 && window.matchMedia('(pointer: coarse)').matches);
}

/**
 * Espera a que window.ethereum esté disponible (útil en móvil)
 */
async function waitForEthereum(maxWait = 3000) {
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
        reject(new Error('MetaMask not detected'));
      }
    }, 100);
  });
}

/**
 * Conecta a MetaMask y retorna el provider y signer
 */
export async function connectWallet() {
  const isMobileDevice = isMobile();
  
  // En móvil, esperar un poco más por si MetaMask está cargando
  let ethereum;
  try {
    if (isMobileDevice) {
      ethereum = await waitForEthereum(5000);
    } else {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install the MetaMask extension from https://metamask.io');
      }
      ethereum = window.ethereum;
    }
  } catch (error) {
    if (isMobileDevice) {
      throw new Error('MetaMask not detected. Please make sure you are using the MetaMask app browser or have MetaMask installed. If using a regular browser, open this page in the MetaMask app browser.');
    } else {
      throw new Error('MetaMask is not installed. Please install the MetaMask extension from https://metamask.io');
    }
  }

  try {
    // Request connection
    await ethereum.request({ method: 'eth_requestAccounts' });
    
    // Create provider
    const provider = new ethers.BrowserProvider(ethereum);
    
    // Get signer
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    // Verify network
    const network = await provider.getNetwork();
    if (network.chainId !== BigInt(56)) {
      await switchToBSC();
    }
    
    return { provider, signer, address };
  } catch (error) {
    if (error.code === 4001) {
      throw new Error('Connection rejected by user.');
    }
    if (error.message && error.message.includes('not detected')) {
      throw error;
    }
    throw new Error(error.message || 'Failed to connect wallet. Please try again.');
  }
}

/**
 * Cambia a la red BSC Mainnet
 */
export async function switchToBSC() {
  const ethereum = window.ethereum;
  if (!ethereum) {
    throw new Error('MetaMask not available');
  }
  
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BSC_NETWORK.chainId }],
    });
  } catch (switchError) {
    // Si la red no existe, agregarla
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BSC_NETWORK],
        });
      } catch (addError) {
        throw new Error('Could not add BSC network. Please add it manually in MetaMask.');
      }
    } else {
      throw switchError;
    }
  }
}

/**
 * Formatea un número de wei a una cadena legible
 */
export function formatEther(value) {
  if (!value) return '0';
  try {
    return ethers.formatEther(value);
  } catch {
    return '0';
  }
}

/**
 * Parsea una cadena a wei
 */
export function parseEther(value) {
  try {
    return ethers.parseEther(value.toString());
  } catch {
    return BigInt(0);
  }
}

/**
 * Formatea un número con decimales
 */
export function formatNumber(value, decimals = 2) {
  if (!value || value === '0') return '0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Formatea una dirección de wallet (muestra primeros y últimos caracteres)
 */
export function formatAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Calcula el tiempo restante hasta una fecha
 */
export function getTimeRemaining(timestamp) {
  const now = Math.floor(Date.now() / 1000);
  const remaining = timestamp - now;
  
  if (remaining <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  
  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  
  return { days, hours, minutes, seconds, isPast: false };
}

/**
 * Formatea una fecha timestamp a string legible
 */
export function formatDate(timestamp) {
  if (!timestamp || timestamp === 0) return 'Not configured';
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

