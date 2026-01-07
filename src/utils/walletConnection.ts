/**
 * Utilidades para conectar wallet - Soporta MetaMask Desktop y Móvil
 */

export interface WalletProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  removeListener: (event: string, callback: (...args: any[]) => void) => void;
}

/**
 * Detecta si estamos en un dispositivo móvil
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Obtiene el provider de MetaMask (desktop o móvil)
 */
export function getMetaMaskProvider(): WalletProvider | null {
  if (typeof window === 'undefined') return null;

  const ethereum = (window as any).ethereum;

  if (!ethereum) {
    // En móvil, intentar abrir la app de MetaMask
    if (isMobile()) {
      return null; // Retornar null para que se use deep linking
    }
    return null;
  }

  // Si hay múltiples providers, buscar MetaMask
  if (ethereum.providers) {
    return ethereum.providers.find((p: any) => p.isMetaMask) || ethereum;
  }

  return ethereum;
}

/**
 * Abre MetaMask en móvil usando deep linking
 */
export function openMetaMaskMobile(): void {
  if (typeof window === 'undefined') return;

  // Intentar diferentes formatos de deep link
  const metamaskLinks = [
    'metamask://wc',
    'https://metamask.app.link/wc',
    'https://metamask.app.link/dapp/' + encodeURIComponent(window.location.href),
  ];

  // Intentar abrir la app
  for (const link of metamaskLinks) {
    try {
      window.location.href = link;
      // Si funciona, salir
      setTimeout(() => {
        // Si después de 2 segundos no se abrió, mostrar instrucciones
        alert('Por favor, abre MetaMask manualmente y vuelve a esta página.');
      }, 2000);
      return;
    } catch (err) {
      console.error('Error opening MetaMask:', err);
    }
  }
}

/**
 * Conecta a MetaMask (desktop o móvil)
 */
export async function connectMetaMask(): Promise<{
  provider: any;
  address: string;
  chainId: number;
}> {
  if (typeof window === 'undefined') {
    throw new Error('Window is not available');
  }

  // En móvil sin provider, intentar abrir la app
  const ethereum = getMetaMaskProvider();
  if (!ethereum && isMobile()) {
    openMetaMaskMobile();
    throw new Error(
      'MetaMask no detectado. Por favor, abre la app de MetaMask y vuelve a esta página, luego intenta conectar de nuevo.'
    );
  }

  if (!ethereum) {
    // En desktop, mostrar link de descarga
    const installLink = 'https://metamask.io/download/';
    window.open(installLink, '_blank');
    throw new Error(
      'MetaMask no está instalado. Por favor, instálalo desde https://metamask.io'
    );
  }

  try {
    // Solicitar conexión
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No se obtuvieron cuentas');
    }

    // Obtener chainId
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    const chainIdNum = parseInt(chainId, 16);

    return {
      provider: ethereum,
      address: accounts[0],
      chainId: chainIdNum,
    };
  } catch (err: any) {
    if (err.code === 4001) {
      throw new Error('Conexión rechazada por el usuario');
    }
    throw err;
  }
}

/**
 * Cambia a BSC Mainnet
 */
export async function switchToBSC(): Promise<void> {
  const ethereum = getMetaMaskProvider();
  if (!ethereum) {
    throw new Error('MetaMask no está disponible');
  }

  const BSC_CHAIN_ID = '0x38'; // 56 en hex

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BSC_CHAIN_ID }],
    });
  } catch (switchError: any) {
    // Si la red no existe, agregarla
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: BSC_CHAIN_ID,
              chainName: 'BNB Smart Chain',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
            },
          ],
        });
      } catch (addError) {
        throw new Error('Error al agregar BSC Mainnet');
      }
    } else {
      throw switchError;
    }
  }
}

/**
 * Escucha cambios de cuenta y red
 */
export function setupWalletListeners(
  onAccountsChanged: (accounts: string[]) => void,
  onChainChanged: () => void
): () => void {
  const ethereum = getMetaMaskProvider();
  if (!ethereum) {
    return () => {}; // No-op cleanup
  }

  const handleAccountsChanged = (accounts: string[]) => {
    onAccountsChanged(accounts);
  };

  const handleChainChanged = () => {
    onChainChanged();
  };

  ethereum.on('accountsChanged', handleAccountsChanged);
  ethereum.on('chainChanged', handleChainChanged);

  // Retornar función de limpieza
  return () => {
    ethereum.removeListener('accountsChanged', handleAccountsChanged);
    ethereum.removeListener('chainChanged', handleChainChanged);
  };
}

