import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { StockCard } from "@/components/StockCard";

// Mock data generation function
function generateMockStocks() {
  const stocks = [
    { ticker: "AAPL", companyName: "Apple Inc.", image: "https://financialmodelingprep.com/image-stock/AAPL.png" },
    { ticker: "GOOGL", companyName: "Alphabet Inc.", image: "https://financialmodelingprep.com/image-stock/GOOGL.png" },
    { ticker: "AMZN", companyName: "Amazon.com Inc.", image: "https://financialmodelingprep.com/image-stock/AMZN.png" },
    { ticker: "COST", companyName: "Costco Wholesale Corporation", image: "https://financialmodelingprep.com/image-stock/COST.png" },
  ];

  return stocks.map(stock => {
    const price = (Math.random() * 1000).toFixed(2); // Mock stock price
    const priceChange = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10).toFixed(2); // Mock price change
    const priceChangePercentage = ((parseFloat(priceChange) / parseFloat(price)) * 100).toFixed(2); // Percentage change
    const socialMediaCount = Math.floor(Math.random() * 1000); // Mock social media count

    return {
      ...stock,
      price: parseFloat(price), // Convert to number
      priceChange: parseFloat(priceChange), // Convert to number
      priceChangePercentage: parseFloat(priceChangePercentage), // Convert to number
      socialMediaCount,
    };
  });
}

export default function HomeScreen() {
  const [stocks, setStocks] = useState<any[]>([]);

  useEffect(() => {
    // Generate mock data when the component mounts
    const mockData = generateMockStocks();
    setStocks(mockData);
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <Text
        variant="titleLarge"
        style={{ fontWeight: "bold", marginLeft: 5, marginBottom: 5 }}
      >
        Available Stocks
      </Text>
      <FlatList
        keyExtractor={(item) => item.ticker}
        data={stocks}
        renderItem={({ item }) => (
          <StockCard
            companyName={item.companyName}
            image={item.image}
            price={item.price}
            priceChange={item.priceChange}
            priceChangePercentage={item.priceChangePercentage}
            ticker={item.ticker}
            socialMediaCount={item.socialMediaCount}
          />
        )}
      />
    </View>
  );
}
