import {
  SafeAreaView,
  View,
  Pressable,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useContext, useState } from "react";
import { selectStock, selectStockPrices } from "@/utils/searchStocks";
import { StoreContext } from "./_layout";
import { getRecommendation } from "@/utils/recommendations";

export default function TickerScreen() {
  const [ticker] = useState("AAPL");
  const stock = selectStock(ticker);
  const stockPrices = selectStockPrices(ticker);

  const { likedStocks, updateLikedStocks } = useContext(StoreContext);
  const socialMediaCount = stock?.socialMediaCount || 0;

  // Check for valid price change
  const positiveOverallPriceChange =
    stockPrices.length > 1
      ? stockPrices[stockPrices.length - 1].value > stockPrices[0].value
      : false;

  console.log('Stock Prices:', stockPrices); // Log the stock prices array
  console.log('Initial Price:', stockPrices[0]?.value); // Check the initial price
  console.log('Latest Price:', stockPrices[stockPrices.length - 1]?.value); // Check the latest price

  // Recommendation Logic - Pass both stockPrices and socialMediaCount
  const recommendation = stockPrices.length > 0
    ? getRecommendation(stockPrices, socialMediaCount)
    : "Hold";

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 25,
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="chevron-left"
            color={"white"}
            size={40}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            if (likedStocks.includes(ticker))
              return updateLikedStocks(ticker, "del");
            updateLikedStocks(ticker, "add");
          }}
        >
          <MaterialCommunityIcons
            name={likedStocks.includes(ticker) ? "star" : "star-outline"}
            color={"white"}
            size={40}
          />
        </Pressable>
      </View>

      {stock ? (
        <FlatList
          data={[1]} // Only displaying one item (the stock details)
          renderItem={() => (
            <View>
              {/* Stock details */}
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={stock.image}
                  style={{ height: 50, width: 50 }}
                  contentFit="contain"
                />
                <View style={{ paddingLeft: 20 }}>
                  <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                    {stock.ticker}
                  </Text>
                  <Text variant="labelMedium">{stock.companyName}</Text>
                </View>
              </View>

              {/* Recommendation */}
              <View style={{ paddingTop: 20 }}>
                <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
                  Recommendation: {recommendation}
                </Text>
              </View>

              {/* Price Comparison */}
              <View style={{ paddingTop: 20 }}>
                <Text
                  variant="labelLarge"
                  style={{
                    color: positiveOverallPriceChange ? "lightgreen" : "red",
                  }}
                >
                  {positiveOverallPriceChange
                    ? "Stock Price is increasing"
                    : "Stock Price is decreasing"}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>Stock Not Available</Text>
      )}
    </SafeAreaView>
  );
}
