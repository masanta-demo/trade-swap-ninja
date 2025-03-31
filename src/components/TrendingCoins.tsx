
import { useEffect, useState } from 'react';
import { Coin, getTrendingCoins } from '@/lib/cryptoData';
import CoinCard from './CoinCard';
import { Flame } from 'lucide-react';

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState<Coin[]>([]);

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    const fetchedTrendingCoins = getTrendingCoins();
    setTrendingCoins(fetchedTrendingCoins);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-6">
        <Flame className="h-5 w-5 text-crypto-coral" />
        <h2 className="text-xl font-bold">Trending Coins</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingCoins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;
