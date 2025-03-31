
import { useEffect, useState } from 'react';
import { Coin } from '@/lib/cryptoData';
import { fetchTrendingCoins } from '@/lib/api';
import CoinCard from './CoinCard';
import { Flame } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getTrendingCoins = async () => {
      try {
        setLoading(true);
        const coins = await fetchTrendingCoins();
        setTrendingCoins(coins);
      } catch (error) {
        console.error("Failed to fetch trending coins:", error);
        toast({
          title: "Error",
          description: "Failed to load trending coins. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getTrendingCoins();
  }, [toast]);

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-6">
        <Flame className="h-5 w-5 text-crypto-coral" />
        <h2 className="text-xl font-bold">Trending Coins</h2>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="crypto-card p-4 animate-pulse">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded mt-1"></div>
                  </div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              
              <div className="h-16 bg-gray-200 rounded mb-2"></div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingCoins.length > 0 ? (
            trendingCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))
          ) : (
            <div className="col-span-4 text-center py-8 text-gray-500">
              No trending coins available at the moment
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingCoins;
