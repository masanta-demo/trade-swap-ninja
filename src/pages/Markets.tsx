
import Navbar from '@/components/Navbar';
import CoinList from '@/components/CoinList';

const Markets = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Cryptocurrency Markets</h1>
        
        <div className="crypto-card p-6">
          <CoinList />
        </div>
      </div>
    </div>
  );
};

export default Markets;
