import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../hooks/sale-frontend/useWeb3.js';
import { useSaleContract } from '../../hooks/sale-frontend/useSaleContract.js';
import { formatNumber, parseEther, formatEther } from '../../utils/sale-frontend/web3.js';
import './BuyForm.css';

export function BuyForm() {
  const { account, provider, signer } = useWeb3();
  const { saleInfo, usdtBalance, buy, refresh } = useSaleContract(provider, signer);
  const [usdtAmount, setUsdtAmount] = useState('');
  const [isBuying, setIsBuying] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const calculateWRSK = (usdt) => {
    if (!usdt || !saleInfo) return '0';
    try {
      const usdtWei = parseEther(usdt);
      const priceWei = parseEther(saleInfo.price);
      const wRSKWei = (usdtWei * BigInt(10**18)) / priceWei;
      return formatEther(wRSKWei);
    } catch {
      return '0';
    }
  };

  const wRSKAmount = calculateWRSK(usdtAmount);

  const handleBuy = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!usdtAmount || parseFloat(usdtAmount) <= 0) {
      setError('Enter a valid USDT amount');
      return;
    }

    if (parseFloat(usdtBalance) < parseFloat(usdtAmount)) {
      setError('Insufficient USDT balance in your wallet');
      return;
    }

    const wRSK = parseFloat(wRSKAmount);
    if (wRSK > parseFloat(saleInfo.maxPerUser)) {
      setError(`Maximum per user is ${formatNumber(saleInfo.maxPerUser, 0)} wRSK`);
      return;
    }

    setIsBuying(true);
    try {
      const txHash = await buy(usdtAmount);
      setSuccess(`Purchase successful! TX: ${txHash.slice(0, 10)}...`);
      setUsdtAmount('');
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="buy-form-container">
      <h3>Buy wRSK</h3>
      
      <form onSubmit={handleBuy} className="buy-form">
        <div className="form-group">
          <label>USDT to pay</label>
          <div className="input-group">
            <input
              type="number"
              step="0.000001"
              min="0"
              value={usdtAmount}
              onChange={(e) => setUsdtAmount(e.target.value)}
              placeholder="0.0"
              disabled={isBuying}
            />
            <span className="input-suffix">USDT</span>
          </div>
          <div className="balance-info">
            Balance: {formatNumber(usdtBalance, 2)} USDT
          </div>
        </div>

        <div className="form-group">
          <label>You will receive</label>
          <div className="output-display">
            {formatNumber(wRSKAmount, 2)} wRSK
          </div>
          <div className="vesting-info">
            <span>25% immediate ({formatNumber(parseFloat(wRSKAmount) * 0.25, 2)} wRSK)</span>
            <span>75% vested ({formatNumber(parseFloat(wRSKAmount) * 0.75, 2)} wRSK)</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button 
          type="submit" 
          className="btn-buy"
          disabled={isBuying || !usdtAmount || parseFloat(usdtAmount) <= 0}
        >
          {isBuying ? 'Processing...' : 'Buy wRSK'}
        </button>
      </form>
    </div>
  );
}

