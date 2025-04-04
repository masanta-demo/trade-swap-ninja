
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Coin } from "@/lib/cryptoData";
import { fetchAllCoins } from "@/lib/api";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useToast } from "@/components/ui/use-toast";

const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = async () => {
    if (coins.length === 0) {
      try {
        setLoading(true);
        const fetchedCoins = await fetchAllCoins();
        setCoins(fetchedCoins);
      } catch (error) {
        console.error("Failed to fetch coins for search:", error);
        toast({
          title: "Error",
          description: "Failed to load search data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelect = (coinId: string) => {
    setOpen(false);
    navigate(`/coin/${coinId}`);
  };

  return (
    <>
      <div 
        className="relative"
        onClick={() => {
          setOpen(true);
          handleSearch();
        }}
      >
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search coins..." 
          className="pl-9 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-crypto-purple/50 w-40 transition-all duration-300 focus:w-60"
          readOnly
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search for any cryptocurrency..." />
          <CommandList>
            <CommandEmpty>
              {loading ? 'Loading...' : 'No coins found.'}
            </CommandEmpty>
            <CommandGroup heading="Coins">
              {coins.map((coin) => (
                <CommandItem
                  key={coin.id}
                  value={`${coin.name} ${coin.symbol}`}
                  onSelect={() => handleSelect(coin.id)}
                  className="flex items-center gap-2 px-2 py-1.5"
                >
                  <img 
                    src={coin.iconUrl} 
                    alt={coin.name} 
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/24';
                    }}
                  />
                  <div className="flex flex-col">
                    <span>{coin.name}</span>
                    <span className="text-xs text-gray-500">{coin.symbol}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
