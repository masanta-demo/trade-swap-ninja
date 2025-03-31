
import { Coin } from "./cryptoData";

// Using CoinGecko's free public API
const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchAllCoins = async (): Promise<Coin[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      iconUrl: coin.image,
      price: coin.current_price,
      marketCap: coin.market_cap,
      volume24h: coin.total_volume,
      change24h: coin.price_change_percentage_24h || 0,
      sparkline: coin.sparkline_in_7d?.price || Array(7).fill(coin.current_price),
      rank: coin.market_cap_rank,
      website: `https://${coin.id}.org`, // This is a placeholder since CoinGecko doesn't provide website URLs in this endpoint
      description: ""  // We'll fetch this separately for coin details
    }));
  } catch (error) {
    console.error("Error fetching coins:", error);
    return [];
  }
};

export const fetchCoinById = async (id: string): Promise<Coin | null> => {
  try {
    // Fetch detailed coin data
    const detailResponse = await fetch(
      `${API_BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    );
    
    if (!detailResponse.ok) {
      throw new Error(`API error: ${detailResponse.status}`);
    }
    
    const detailData = await detailResponse.json();
    
    // Fetch market chart for sparkline data
    const chartResponse = await fetch(
      `${API_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
    );
    
    if (!chartResponse.ok) {
      throw new Error(`API error: ${chartResponse.status}`);
    }
    
    const chartData = await chartResponse.json();
    
    return {
      id: detailData.id,
      name: detailData.name,
      symbol: detailData.symbol.toUpperCase(),
      iconUrl: detailData.image.large,
      price: detailData.market_data.current_price.usd,
      marketCap: detailData.market_data.market_cap.usd,
      volume24h: detailData.market_data.total_volume.usd,
      change24h: detailData.market_data.price_change_percentage_24h || 0,
      sparkline: chartData.prices.map((price: number[]) => price[1]),
      description: detailData.description.en,
      website: detailData.links.homepage[0] || "",
      rank: detailData.market_cap_rank
    };
  } catch (error) {
    console.error(`Error fetching coin ${id}:`, error);
    return null;
  }
};

export const fetchTrendingCoins = async (): Promise<Coin[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search/trending`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // We need to fetch more details for these coins since the trending endpoint doesn't provide full data
    const coinIds = data.coins.map((item: any) => item.item.id).join(",");
    
    const detailsResponse = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h`
    );
    
    if (!detailsResponse.ok) {
      throw new Error(`API error: ${detailsResponse.status}`);
    }
    
    const detailsData = await detailsResponse.json();
    
    return detailsData.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      iconUrl: coin.image,
      price: coin.current_price,
      marketCap: coin.market_cap,
      volume24h: coin.total_volume,
      change24h: coin.price_change_percentage_24h || 0,
      sparkline: coin.sparkline_in_7d?.price || Array(7).fill(coin.current_price),
      rank: coin.market_cap_rank,
    }));
  } catch (error) {
    console.error("Error fetching trending coins:", error);
    return [];
  }
};

export const fetchHistoricalData = async (
  id: string,
  days: number = 7
): Promise<number[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.prices.map((price: number[]) => price[1]);
  } catch (error) {
    console.error(`Error fetching historical data for ${id}:`, error);
    return [];
  }
};
