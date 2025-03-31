
import Navbar from '@/components/Navbar';
import SwapInterface from '@/components/SwapInterface';

const Swap = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Crypto Swap</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Instantly swap cryptocurrencies at competitive rates with our secure trading platform
        </p>
        
        <SwapInterface />
      </div>
    </div>
  );
};

export default Swap;
