import { useEffect, useState } from 'react';
import { Coin, formatPrice, formatNumber } from '@/lib/cryptoData';
import { fetchAllCoins } from '@/lib/api';
import { ArrowUpDown, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PriceChart from './PriceChart';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

const CoinList = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Coin | null;
    direction: 'ascending' | 'descending';
  }>({
    key: 'marketCap',
    direction: 'descending',
  });
  const { toast } = useToast();

  useEffect(() => {
    const getCoins = async () => {
      try {
        setLoading(true);
        const fetchedCoins = await fetchAllCoins();
        setCoins(fetchedCoins);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
        toast({
          title: "Error",
          description: "Failed to load cryptocurrency data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getCoins();

    // Set up a polling interval to refresh data (every 60 seconds)
    const intervalId = setInterval(() => {
      getCoins();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [toast]);

  const handleSort = (key: keyof Coin) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  const sortedCoins = [...coins].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === undefined || bValue === undefined) return 0;
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'ascending' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'ascending' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const filteredCoins = sortedCoins.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSortIcon = (key: keyof Coin) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    
    return sortConfig.direction === 'ascending' 
      ? <ChevronUp className="h-4 w-4" />
      : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="w-full">
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search coins..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crypto-purple/30"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-gray-600 border-b">
                <th className="px-4 py-3 text-left font-medium">#</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-right font-medium">Price</th>
                <th className="px-4 py-3 text-right font-medium">24h %</th>
                <th className="px-4 py-3 text-right font-medium hidden md:table-cell">Market Cap</th>
                <th className="px-4 py-3 text-right font-medium hidden lg:table-cell">Volume (24h)</th>
                <th className="px-4 py-3 text-right font-medium hidden md:table-cell">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="border-b animate-pulse">
                  <td className="px-4 py-4"><div className="h-4 w-4 bg-gray-200 rounded"></div></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-3 w-12 bg-gray-200 rounded mt-1"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right"><div className="h-4 w-20 bg-gray-200 rounded ml-auto"></div></td>
                  <td className="px-4 py-4 text-right"><div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div></td>
                  <td className="px-4 py-4 text-right hidden md:table-cell"><div className="h-4 w-24 bg-gray-200 rounded ml-auto"></div></td>
                  <td className="px-4 py-4 text-right hidden lg:table-cell"><div className="h-4 w-24 bg-gray-200 rounded ml-auto"></div></td>
                  <td className="px-4 py-4 text-right hidden md:table-cell">
                    <div className="w-24 h-10 bg-gray-200 rounded ml-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-gray-600 border-b">
                <th className="px-4 py-3 text-left font-medium">#</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th 
                  className="px-4 py-3 text-right font-medium cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Price</span>
                    {renderSortIcon('price')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right font-medium cursor-pointer"
                  onClick={() => handleSort('change24h')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>24h %</span>
                    {renderSortIcon('change24h')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right font-medium cursor-pointer hidden md:table-cell"
                  onClick={() => handleSort('marketCap')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Market Cap</span>
                    {renderSortIcon('marketCap')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right font-medium cursor-pointer hidden lg:table-cell"
                  onClick={() => handleSort('volume24h')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Volume (24h)</span>
                    {renderSortIcon('volume24h')}
                  </div>
                </th>
                <th className="px-4 py-3 text-right font-medium hidden md:table-cell">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.length > 0 ? (
                filteredCoins.map((coin, index) => (
                  <tr key={coin.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm">{index + 1}</td>
                    <td className="px-4 py-4">
                      <Link to={`/coin/${coin.id}`} className="flex items-center space-x-3 hover:text-crypto-purple">
                        <img src={coin.iconUrl} alt={coin.name} className="w-8 h-8" />
                        <div>
                          <div className="font-medium">{coin.name}</div>
                          <div className="text-xs text-gray-500">{coin.symbol}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-right font-medium">
                      {formatPrice(coin.price)}
                    </td>
                    <td className={`px-4 py-4 text-right font-medium ${
                      coin.change24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'
                    }`}>
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                    </td>
                    <td className="px-4 py-4 text-right hidden md:table-cell">
                      ${formatNumber(coin.marketCap)}
                    </td>
                    <td className="px-4 py-4 text-right hidden lg:table-cell">
                      ${formatNumber(coin.volume24h)}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="w-24 h-10 ml-auto">
                        <PriceChart 
                          data={coin.sparkline} 
                          color={coin.change24h >= 0 ? "#10B981" : "#EF4444"}
                          height={40}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No coins found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CoinList;
