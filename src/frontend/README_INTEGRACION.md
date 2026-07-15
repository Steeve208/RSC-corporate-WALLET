# 🚀 Quick Integration Guide - RSC Web

## Fastest Way (Recommended)

### Step 1: Copy the folder
Copy the entire `frontend/` folder to your RSC web project.

### Step 2: Install dependencies
```bash
cd frontend
npm install
```

### Step 3: Run in development
```bash
npm run dev
```

### Step 4: Build for production
```bash
npm run build
```

The compiled files will be in `frontend/dist/` - serve these from your web server.

---

## What's Included

✅ Complete React application  
✅ All components (Header, SaleCard, BuyForm, ClaimSection, InfoPanel)  
✅ Web3 hooks (useWeb3, useSaleContract)  
✅ Contract configuration (already set up)  
✅ Modern, responsive design  
✅ Production ready

---

## Contract Addresses (Already Configured)

- **RSKSale**: `0xc8D38246503e06Cf2a75114EaD4dA1cb7840F28A`
- **USDT (BSC)**: `0x55d398326f99059fF775485246999027B3197955`

No changes needed unless you deploy new contracts.

---

## File Structure

```
frontend/
├── src/
│   ├── components/    # React components
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utilities
│   ├── config/        # Contract config
│   └── App.jsx        # Main app
├── dist/              # Build output (after npm run build)
├── package.json
└── vite.config.js
```

---

## That's it! 🎉

Just copy the folder and run `npm install`. Everything is ready to go.

