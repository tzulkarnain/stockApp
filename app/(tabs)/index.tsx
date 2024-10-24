import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { StockCard } from "@/components/StockCard";
import { generateMockStocks } from "@/utils/mockData";

export default function HomeScreen() {
    const [stocks, setStocks] = useState<any[]>([]);
    const timeWindow = 5; // Number of days to show

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
                renderItem={({ item }) => {
                    return (
                        <StockCard
                            companyName={item.companyName}
                            image={item.image}
                            price={item.price}
                            priceChange={item.priceChange}
                            priceChangePercentage={item.priceChangePercentage}
                            ticker={item.ticker}
                            socialMediaCount={item.socialMediaCount}
                            prices={item.prices.slice(-timeWindow)} // Pass only the last n days of prices
                        />
                    );
                }}
            />
        </View>
    );
}
