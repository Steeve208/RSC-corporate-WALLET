declare module 'react-day-picker';
declare module 'embla-carousel-react';
declare module 'recharts';
declare module 'cmdk';
declare module 'vaul';
declare module 'react-hook-form';
declare module 'input-otp';
declare module 'react-resizable-panels';
declare module 'next-themes';
declare module 'sonner';

// MetaMask / Ethereum
interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, handler: (...args: any[]) => void) => void;
    removeListener: (event: string, handler: (...args: any[]) => void) => void;
    isMetaMask?: boolean;
  };
}

