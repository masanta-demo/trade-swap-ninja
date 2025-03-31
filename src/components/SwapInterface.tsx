
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, Wallet } from 'lucide-react';
import { Coin, getAllCoins, formatPrice } from '@/lib/cryptoData';
import { useToast } from '@/components/ui/use-toast';

const SwapInterface = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [fromCoin, setFromCoin] = useState<string>('bitcoin');
  const [toCoin, setToCoin] = useState<string>('ethereum');
  const [fromAmount, setFromAmount] = useState<string>('0.1');
  const [toAmount, setToAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchedCoins = getAllCoins();
    setCoins(fetchedCoins);
  }, []);

  useEffect(() => {
    if (fromCoin && toCoin) {
      calculateExchangeRate();
    }
  }, [fromCoin, toCoin]);

  useEffect(() => {
    if (fromAmount && exchangeRate) {
      const calculatedAmount = parseFloat(fromAmount) * exchangeRate;
      setToAmount(calculatedAmount.toFixed(6));
    }
  }, [fromAmount, exchangeRate]);

  const calculateExchangeRate = () => {
    const from = coins.find(coin => coin.id === fromCoin);
    const to = coins.find(coin => coin.id === toCoin);
    
    if (from && to) {
      const rate = to.price / from.price;
      setExchangeRate(rate);
    }
  };

  const handleFromAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
    }
  };
  
  const handleSwapCoins = () => {
    const temp = fromCoin;
    setFromCoin(toCoin);
    setToCoin(temp);
  };

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      });
      return;
    }
    
    if (fromCoin === toCoin) {
      toast({
        title: "Same currencies",
        description: "Cannot swap the same cryptocurrency",
        variant: "destructive",
      });
      return;
    }
    
    const fromCoinData = coins.find(coin => coin.id === fromCoin);
    const toCoinData = coins.find(coin => coin.id === toCoin);
    
    if (fromCoinData && toCoinData) {
      toast({
        title: "Swap Simulated",
        description: `Swapped ${fromAmount} ${fromCoinData.symbol} to ${toAmount} ${toCoinData.symbol}`,
      });
    }
  };

  return (
    <div className="crypto-card p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Swap Tokens</h2>
        <Button variant="ghost" size="icon">
          <Wallet className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* From currency */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm text-gray-500 mb-2">From</label>
          <div className="flex space-x-4">
            <Select value={fromCoin} onValueChange={setFromCoin}>
              <SelectTrigger className="w-1/2 bg-white">
                <SelectValue placeholder="Select coin" />
              </SelectTrigger>
              <SelectContent>
                {coins.map((coin) => (
                  <SelectItem key={`from-${coin.id}`} value={coin.id}>
                    <div className="flex items-center space-x-2">
                      <img src={coin.iconUrl} alt={coin.name} className="w-5 h-5" />
                      <span>{coin.symbol}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className="w-1/2 text-right"
              placeholder="0.00"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
            />
          </div>
          {fromCoin && (
            <div className="mt-2 text-xs text-right text-gray-500">
              Balance: 0.00 {coins.find(coin => coin.id === fromCoin)?.symbol}
            </div>
          )}
        </div>
        
        {/* Swap button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-dashed"
            onClick={handleSwapCoins}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
        
        {/* To currency */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm text-gray-500 mb-2">To</label>
          <div className="flex space-x-4">
            <Select value={toCoin} onValueChange={setToCoin}>
              <SelectTrigger className="w-1/2 bg-white">
                <SelectValue placeholder="Select coin" />
              </SelectTrigger>
              <SelectContent>
                {coins.map((coin) => (
                  <SelectItem key={`to-${coin.id}`} value={coin.id}>
                    <div className="flex items-center space-x-2">
                      <img src={coin.iconUrl} alt={coin.name} className="w-5 h-5" />
                      <span>{coin.symbol}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className="w-1/2 text-right"
              placeholder="0.00"
              value={toAmount}
              disabled
            />
          </div>
          {toCoin && (
            <div className="mt-2 text-xs text-right text-gray-500">
              Balance: 0.00 {coins.find(coin => coin.id === toCoin)?.symbol}
            </div>
          )}
        </div>
        
        {/* Exchange rate */}
        {exchangeRate > 0 && fromCoin !== toCoin && (
          <div className="text-sm text-gray-500 text-center">
            <p>
              1 {coins.find(coin => coin.id === fromCoin)?.symbol} ≈ {exchangeRate.toFixed(6)} {coins.find(coin => coin.id === toCoin)?.symbol}
            </p>
          </div>
        )}
        
        {/* Swap button */}
        <Button 
          className="w-full bg-crypto-purple hover:bg-crypto-light-purple text-white"
          onClick={handleSwap}
        >
          Swap Now
        </Button>
        
        <p className="text-xs text-center text-gray-500">
          This is a demo swap. No real transactions will occur.
        </p>
      </div>
    </div>
  );
};

export default SwapInterface;
