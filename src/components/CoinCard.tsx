
import { Link } from 'react-router-dom';
import { Coin, formatPrice } from '@/lib/cryptoData';
import PriceChart from './PriceChart';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CoinCardProps {
  coin: Coin;
}

const CoinCard = ({ coin }: CoinCardProps) => {
  const isPositive = coin.change24h >= 0;
  
  return (
    <Link to={`/coin/${coin.id}`} className="crypto-card p-4 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-3">
          <img src={coin.iconUrl} alt={`${coin.name} logo`} className="w-8 h-8" />
          <div>
            <h3 className="font-semibold">{coin.name}</h3>
            <span className="text-xs text-gray-500">{coin.symbol}</span>
          </div>
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${isPositive ? 'text-crypto-green' : 'text-crypto-red'}`}>
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="h-16 mb-2">
        <PriceChart 
          data={coin.sparkline}
          color={isPositive ? "#10B981" : "#EF4444"}
        />
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-bold">{formatPrice(coin.price)}</span>
        <span className="text-xs bg-gray-100 rounded-full px-2 py-1">Rank #{coin.rank || '??'}</span>
      </div>
    </Link>
  );
};

export default CoinCard;
