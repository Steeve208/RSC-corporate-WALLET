// Configuración de contratos - BSC Mainnet
export const CONTRACTS = {
  RSKSale: {
    address: "0xc8D38246503e06Cf2a75114EaD4dA1cb7840F28A",
    abi: [
      {
        inputs: [
          { internalType: "address", name: "_wrappedRSK", type: "address" },
          { internalType: "address", name: "_usdt", type: "address" },
          { internalType: "address", name: "_admin", type: "address" }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: "address", name: "oldAdmin", type: "address" },
          { indexed: false, internalType: "address", name: "newAdmin", type: "address" }
        ],
        name: "AdminUpdated",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "user", type: "address" },
          { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
        ],
        name: "Claimed",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
        name: "Paused",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "buyer", type: "address" },
          { indexed: false, internalType: "uint256", name: "usdtAmount", type: "uint256" },
          { indexed: false, internalType: "uint256", name: "wRSKAmount", type: "uint256" },
          { indexed: false, internalType: "uint256", name: "immediate", type: "uint256" },
          { indexed: false, internalType: "uint256", name: "vested", type: "uint256" }
        ],
        name: "Purchased",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: "uint256", name: "startTime", type: "uint256" },
          { indexed: false, internalType: "uint256", name: "endTime", type: "uint256" }
        ],
        name: "SaleDatesUpdated",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
        name: "Unpaused",
        type: "event"
      },
      {
        inputs: [],
        name: "MAX_PER_USER",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "PRICE_USDT",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "TOTAL_SALE",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "VESTING_DURATION",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "VESTING_IMMEDIATE_PERCENT",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "admin",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [{ internalType: "uint256", name: "usdtAmount", type: "uint256" }],
        name: "buy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "claimable",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "getSaleInfo",
        outputs: [
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
          { internalType: "uint256", name: "_totalSold", type: "uint256" },
          { internalType: "uint256", name: "remaining", type: "uint256" },
          { internalType: "bool", name: "_paused", type: "bool" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "paused",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "purchases",
        outputs: [
          { internalType: "uint256", name: "total", type: "uint256" },
          { internalType: "uint256", name: "claimed", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "saleEndTime",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "saleStartTime",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "totalSold",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "usdt",
        outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "wrappedRSK",
        outputs: [{ internalType: "contract WrappedRSK", name: "", type: "address" }],
        stateMutability: "view",
        type: "function"
      }
    ]
  },
  USDT: {
    address: "0x55d398326f99059fF775485246999027B3197955",
    abi: [
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        type: "function"
      },
      {
        constant: true,
        inputs: [
          { name: "_owner", type: "address" },
          { name: "_spender", type: "address" }
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        type: "function"
      },
      { payable: true, stateMutability: "payable", type: "fallback" },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "owner", type: "address" },
          { indexed: true, name: "spender", type: "address" },
          { indexed: false, name: "value", type: "uint256" }
        ],
        name: "Approval",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "value", type: "uint256" }
        ],
        name: "Transfer",
        type: "event"
      }
    ]
  }
};

// Configuración de red BSC
export const BSC_NETWORK = {
  chainId: "0x38", // 56 en decimal
  chainName: "BNB Smart Chain",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com"]
};

