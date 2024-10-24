import { generateMockStocks } from "@/utils/mockData";

// Define the structure of a stock and stock prices
export type Stock = {
  ticker: string;
  companyName: string;
  image: string;
  price: number;
  priceChange: number;
  priceChangePercentage: number;
  socialMediaCount: number;
  prices: { value: number }[];
};

// Generate mock stocks and stock prices
const mockStocks: Stock[] = generateMockStocks();

// Use the mock data for both stocks and stockPrices
export const stocks = mockStocks;
export const stockPrices = mockStocks.map(stock => ({
  ticker: stock.ticker,
  prices: stock.prices, // Mock prices for the last 10 days
}));

// Search for stocks by text
export const searchStocks = (text: string) => {
  if (!text) return [];

  return stocks.filter(
    (i) =>
      i.ticker.match(new RegExp(text, "i")) ||
      i.companyName.match(new RegExp(text, "i"))
  );
};

// Select stock by ticker
export const selectStock = (text: string) => {
  const stock = stocks.filter((i) => i.ticker === text);
  if (stock.length > 0) return stock[0];
  return null;
};

// Select stock prices by ticker
export const selectStockPrices = (text: string) => {
    const stock = stockPrices.filter((i) => i.ticker === text);
    if (stock.length > 0) return stock[0].prices; // return the last 10 days' prices
    return null;
  };
  