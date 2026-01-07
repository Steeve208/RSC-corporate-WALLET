import { ethers } from 'ethers';
import { BSC_NETWORK } from '../../config/sale-frontend/contracts.js';

/**
 * Conecta a MetaMask y retorna el provider y signer
 */
export async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
  }

  try {
    // Request connection
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    // Create provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    
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
    throw error;
  }
}

/**
 * Cambia a la red BSC Mainnet
 */
export async function switchToBSC() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BSC_NETWORK.chainId }],
    });
  } catch (switchError) {
    // Si la red no existe, agregarla
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
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

