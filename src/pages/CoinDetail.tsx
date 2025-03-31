import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Coin, formatPrice, formatNumber } from '@/lib/cryptoData';
import { fetchCoinById, fetchHistoricalData } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PriceChart from '@/components/PriceChart';
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SwapInterface from '@/components/SwapInterface';
import { useToast } from '@/components/ui/use-toast';

const CoinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState<number[]>([]);
  const [timeframe, setTimeframe] = useState<'1d' | '7d' | '30d' | '90d'>('7d');
  const { toast } = useToast();

  useEffect(() => {
    const getCoinData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Get coin details
        const coinData = await fetchCoinById(id);
        if (!coinData) {
          toast({
            title: "Error",
            description: "Failed to load coin data. Coin not found.",
            variant: "destructive",
          });
          return;
        }
        
        setCoin(coinData);
        
        // Get historical price data based on timeframe
        const days = timeframe === '1d' ? 1 : 
                     timeframe === '7d' ? 7 : 
                     timeframe === '30d' ? 30 : 90;
        
        const historicalPrices = await fetchHistoricalData(id, days);
        setHistoricalData(historicalPrices);
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
        toast({
          title: "Error",
          description: "Failed to load cryptocurrency data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getCoinData();
  }, [id, timeframe, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="animate-pulse-slow">Loading...</div>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <Link to="/" className="inline-flex items-center text-crypto-purple hover:underline mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Coin Not Found</h2>
            <p className="text-gray-600 mb-6">The cryptocurrency you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isPositive = coin.change24h >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/markets" className="inline-flex items-center text-crypto-purple hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Markets
        </Link>
        
        {/* Coin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <img src={coin.iconUrl} alt={`${coin.name} logo`} className="w-12 h-12" />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">{coin.name}</h1>
                <span className="text-gray-500">{coin.symbol}</span>
                {coin.rank && (
                  <span className="text-xs bg-gray-100 rounded-full px-2 py-1">
                    Rank #{coin.rank}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xl font-bold">{formatPrice(coin.price)}</span>
                <span className={`flex items-center space-x-1 text-sm font-medium ${
                  isPositive ? 'text-crypto-green' : 'text-crypto-red'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {coin.website && (
              <Button variant="outline" asChild>
                <a href={coin.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <span>Website</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            <Button asChild>
              <Link to="/swap" className="bg-crypto-purple hover:bg-crypto-light-purple">
                Trade
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Price Chart */}
            <div className="crypto-card p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">{coin.name} Price Chart</h2>
                <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                  <button 
                    className={`px-3 py-1 text-sm ${timeframe === '1d' ? 'bg-crypto-purple text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setTimeframe('1d')}
                  >
                    24h
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm ${timeframe === '7d' ? 'bg-crypto-purple text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setTimeframe('7d')}
                  >
                    7d
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm ${timeframe === '30d' ? 'bg-crypto-purple text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setTimeframe('30d')}
                  >
                    30d
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm ${timeframe === '90d' ? 'bg-crypto-purple text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setTimeframe('90d')}
                  >
                    90d
                  </button>
                </div>
              </div>
              
              <div className="h-72">
                <PriceChart 
                  data={historicalData}
                  color={isPositive ? "#10B981" : "#EF4444"}
                  height={288}
                  showTooltip
                  showAxis
                  fullWidth
                />
              </div>
            </div>
            
            {/* Market Stats */}
            <div className="crypto-card p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Market Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Market Cap</div>
                  <div className="font-bold">${formatNumber(coin.marketCap)}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">24h Volume</div>
                  <div className="font-bold">${formatNumber(coin.volume24h)}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">24h Low / High</div>
                  <div className="font-bold">
                    ${(coin.price * 0.985).toFixed(2)} / ${(coin.price * 1.015).toFixed(2)}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Circulating Supply</div>
                  <div className="font-bold">
                    {formatNumber(coin.marketCap / coin.price)} {coin.symbol}
                  </div>
                </div>
              </div>
            </div>
            
            {/* About */}
            <div className="crypto-card p-6">
              <h2 className="text-lg font-bold mb-4">About {coin.name}</h2>
              <p className="text-gray-700 leading-relaxed">
                {coin.description ? (
                  <div dangerouslySetInnerHTML={{ __html: coin.description }} />
                ) : (
                  `No description available for ${coin.name}.`
                )}
              </p>
            </div>
          </div>
          
          <div>
            {/* Swap Widget */}
            <div className="sticky top-24">
              <SwapInterface />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
