import { SafeAreaView, View, Pressable, FlatList, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useContext, useState } from "react";

import { selectStock, selectStockPrices } from "@/utils/searchStocks";
import { formatCurrency } from "@/utils/formatCurrency";
import { StoreContext } from "./_layout";
import { getRecommendation } from "@/utils/recommendations";

export default function TickerScreen() {
  const options = ["Description", "Historical Metrics"];
  const { ticker } = useLocalSearchParams();
  const stock = selectStock(ticker as string);
  const stockPrices = selectStockPrices(ticker as string);
  const { width } = useWindowDimensions();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { likedStocks, updateLikedStocks } = useContext(StoreContext);

  const positiveOverallPriceChange =
    stockPrices &&
    stockPrices[0].value < stockPrices[stockPrices.length - 1].value;

  // Recommendation Logic
  const recommendation = stockPrices ? getRecommendation(stockPrices) : "Hold";

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
            if (likedStocks.includes(ticker as string))
              return updateLikedStocks(ticker as string, "del");
            updateLikedStocks(ticker as string, "add");
          }}
        >
          <MaterialCommunityIcons
            name={
              likedStocks.includes(ticker as string) ? "star" : "star-outline"
            }
            color={"white"}
            size={40}
          />
        </Pressable>
      </View>

      {stock ? (
        <FlatList
          data={[1]}
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

              {/* Stock Price and Change */}
              <View style={{ paddingTop: 20 }}>
                <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
                  {formatCurrency(stock.price)}
                </Text>
                <Text
                  variant="labelLarge"
                  style={{
                    color:
                      stock.priceChange < 0
                        ? "red"
                        : stock.priceChange > 0
                        ? "lightgreen"
                        : "auto",
                  }}
                >
                  {formatCurrency(stock.priceChange)}{" "}
                  {stock.priceChangePercentage.toFixed(2)}%
                </Text>
              </View>

              {/* Recommendation */}
              <View style={{ paddingTop: 20 }}>
                <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
                  Recommendation: {recommendation}
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

