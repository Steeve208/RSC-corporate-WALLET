import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACTS } from '../../config/sale-frontend/contracts.js';
import { formatEther } from '../../utils/sale-frontend/web3.js';

export function useSaleContract(provider, signer) {
  const [saleContract, setSaleContract] = useState(null);
  const [saleContractReadOnly, setSaleContractReadOnly] = useState(null);
  const [usdtContract, setUsdtContract] = useState(null);
  const [saleInfo, setSaleInfo] = useState(null);
  const [userPurchase, setUserPurchase] = useState(null);
  const [claimableAmount, setClaimableAmount] = useState('0');
  const [usdtBalance, setUsdtBalance] = useState('0');
  const [usdtAllowance, setUsdtAllowance] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inicializar contrato de solo lectura (sin wallet) para cargar info pública
  useEffect(() => {
    const initReadOnly = async () => {
      try {
        if (typeof window === 'undefined' || !window.ethereum) {
          // No mostrar error si no hay MetaMask, solo no cargar datos
          setIsLoading(false);
          return;
        }

        try {
          const prov = new ethers.BrowserProvider(window.ethereum);
          const sale = new ethers.Contract(
            CONTRACTS.RSKSale.address,
            CONTRACTS.RSKSale.abi,
            prov
          );
          setSaleContractReadOnly(sale);
          // Cargar información pública inmediatamente
          await loadPublicData(sale);
        } catch (contractErr) {
          // Si hay error al cargar el contrato, no mostrar error técnico
          // El usuario verá el mensaje de conectar wallet
          console.error('Error loading contract (user may need to connect wallet):', contractErr);
          setIsLoading(false);
          // No establecer error aquí, dejar que el componente maneje el estado sin wallet
        }
      } catch (err) {
        console.error('Error inicializando contrato read-only:', err);
        setIsLoading(false);
        // No establecer error aquí
      }
    };
    
    initReadOnly();
  }, []);

  // Inicializar contratos con signer cuando hay wallet conectado
  useEffect(() => {
    if (provider && signer) {
      initializeContracts();
    }
  }, [provider, signer]);

  // Cargar datos del usuario cuando hay wallet conectado
  useEffect(() => {
    if (saleContract && signer) {
      loadUserData();
      const interval = setInterval(loadUserData, 10000);
      return () => clearInterval(interval);
    }
  }, [saleContract, signer]);

  const initializeContracts = async () => {
    try {
      const sale = new ethers.Contract(
        CONTRACTS.RSKSale.address,
        CONTRACTS.RSKSale.abi,
        signer
      );
      
      const usdt = new ethers.Contract(
        CONTRACTS.USDT.address,
        CONTRACTS.USDT.abi,
        signer
      );
      
      setSaleContract(sale);
      setUsdtContract(usdt);
    } catch (err) {
      console.error('Error inicializando contratos:', err);
    }
  };

  const loadPublicData = async (contract) => {
    if (!contract) return;
    
    setIsLoading(true);
    try {
      const [startTime, endTime, totalSold, remaining, paused] = await contract.getSaleInfo();
      const price = await contract.PRICE_USDT();
      const maxPerUser = await contract.MAX_PER_USER();
      const totalSale = await contract.TOTAL_SALE();
      
      setSaleInfo({
        startTime: Number(startTime),
        endTime: Number(endTime),
        totalSold: formatEther(totalSold),
        remaining: formatEther(remaining),
        paused,
        price: formatEther(price),
        maxPerUser: formatEther(maxPerUser),
        totalSale: formatEther(totalSale)
      });
      setError(null);
    } catch (err) {
      setError('Error loading sale information: ' + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserData = async () => {
    if (!saleContract || !signer) return;
    
    try {
      const address = await signer.getAddress();
      
      // Cargar información del usuario
      const purchase = await saleContract.purchases(address);
      if (purchase.total > 0) {
        setUserPurchase({
          total: formatEther(purchase.total),
          claimed: formatEther(purchase.claimed),
          startTime: Number(purchase.startTime)
        });
        
        // Calcular claimable
        const claimable = await saleContract.claimable(address);
        setClaimableAmount(formatEther(claimable));
      } else {
        setUserPurchase(null);
        setClaimableAmount('0');
      }
      
      // Cargar balance y allowance de USDT
      if (usdtContract) {
        const balance = await usdtContract.balanceOf(address);
        setUsdtBalance(formatEther(balance));
        
        const allowance = await usdtContract.allowance(address, CONTRACTS.RSKSale.address);
        setUsdtAllowance(formatEther(allowance));
      }
      
    } catch (err) {
      console.error('Error cargando datos del usuario:', err);
    }
  };

  const buy = async (usdtAmount) => {
    if (!saleContract || !usdtContract || !signer) {
      throw new Error('Contracts not initialized');
    }
    
    try {
      const address = await signer.getAddress();
      const usdtAmountWei = ethers.parseEther(usdtAmount.toString());
      
      // Verificar allowance
      const allowance = await usdtContract.allowance(address, CONTRACTS.RSKSale.address);
      
      if (allowance < usdtAmountWei) {
        // Aprobar USDT
        const approveTx = await usdtContract.approve(CONTRACTS.RSKSale.address, ethers.MaxUint256);
        await approveTx.wait();
      }
      
      // Comprar
      const tx = await saleContract.buy(usdtAmountWei);
      await tx.wait();
      
      // Recargar datos
      await loadUserData();
      if (saleContractReadOnly) {
        await loadPublicData(saleContractReadOnly);
      }
      
      return tx.hash;
    } catch (err) {
      throw new Error('Purchase error: ' + err.message);
    }
  };

  const claim = async () => {
    if (!saleContract || !signer) {
      throw new Error('Contract not initialized');
    }
    
    try {
      const tx = await saleContract.claim();
      await tx.wait();
      
      // Recargar datos
      await loadUserData();
      
      return tx.hash;
    } catch (err) {
      throw new Error('Error claiming tokens: ' + err.message);
    }
  };

  return {
    saleContract,
    usdtContract,
    saleInfo,
    userPurchase,
    claimableAmount,
    usdtBalance,
    usdtAllowance,
    isLoading,
    error,
    buy,
    claim,
    refresh: () => {
      if (saleContractReadOnly) loadPublicData(saleContractReadOnly);
      if (saleContract && signer) loadUserData();
    }
  };
}
