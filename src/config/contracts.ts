// BSC Mainnet Chain ID
export const BSC_MAINNET_CHAIN_ID = 56;

// Contract Addresses (BSC Mainnet)
export const CONTRACT_ADDRESSES = {
  RSK_SALE: '0x0000000000000000000000000000000000000000', // TODO: Reemplazar con dirección real
  USDT: '0x55d398326f99059fF775485246999027B3197955', // USDT en BSC Mainnet
};

// USDT ABI (BEP-20 Standard Token)
export const USDT_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
];

// RSK Sale Contract ABI
export const RSK_SALE_ABI = [
  // View functions
  'function getSaleInfo() view returns (bool active, bool paused, uint256 price, uint256 totalSupply, uint256 sold, uint256 startTime, uint256 endTime)',
  'function getUserInfo(address user) view returns (uint256 totalPurchased, uint256 claimed, uint256 claimable, uint256 purchaseTime)',
  'function price() view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function sold() view returns (uint256)',
  'function active() view returns (bool)',
  'function paused() view returns (bool)',
  'function startTime() view returns (uint256)',
  'function endTime() view returns (uint256)',
  
  // Write functions
  'function buy(uint256 usdtAmount) returns (bool)',
  'function claim() returns (bool)',
  'function approveUSDT(uint256 amount) returns (bool)',
  
  // Events
  'event TokensPurchased(address indexed buyer, uint256 amount, uint256 price)',
  'event TokensClaimed(address indexed user, uint256 amount)',
  'event SalePaused()',
  'event SaleResumed()',
];

