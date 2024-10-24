import { Pressable, View, FlatList, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import { formatCurrency } from "@/utils/formatCurrency";

// Define types for the props, including socialMediaCount and prices
interface PriceData {
  value: number; // Define the structure of price data
}

interface StockCardProps {
  ticker: string;
  image: string;
  companyName: string;
  price: number;
  priceChange: number;
  priceChangePercentage: number;
  socialMediaCount: number;
  prices: PriceData[]; // Prices over a given time window
}

// StockCard component using the defined props
export const StockCard: React.FC<StockCardProps> = ({
  ticker,
  image,
  companyName,
  price,
  priceChange,
  priceChangePercentage,
  socialMediaCount,
  prices, // New prop for the prices over time
}) => {
  const { width } = useWindowDimensions(); // Get screen width

  return (
    <Pressable
      style={{
        flexDirection: "column",
        marginVertical: 10,
        paddingHorizontal: 10,
      }}
      onPress={() => router.push(`/${ticker}`)} // Navigate to detailed view based on ticker
    >
      {/* Row for Stock Image, Ticker, and Current Price Info */}
      <View style={{ flexDirection: "row", height: 60 }}>
        <Image
          source={{ uri: image }} // Ensure the image is passed as a valid URI
          style={{ height: 50, width: 50 }}
          contentFit="contain"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: width - 75, // Dynamic width based on window size
            paddingLeft: 15,
          }}
        >
          {/* Display stock ticker and company name */}
          <View>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
              {ticker}
            </Text>
            <Text variant="labelMedium">{companyName}</Text>
            {/* Display social media count */}
            <Text variant="labelSmall">Mentions: {socialMediaCount}</Text>
          </View>

          {/* Display price, price change, and percentage */}
          <View style={{ alignItems: "flex-end" }}>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
              {formatCurrency(price)} {/* Display formatted price */}
            </Text>
            <Text
              variant="labelMedium"
              style={{
                color:
                  priceChange < 0
                    ? "red"
                    : priceChange > 0
                    ? "lightgreen"
                    : "black",
              }}
            >
              {formatCurrency(priceChange)} ({priceChangePercentage.toFixed(2)}%)
            </Text>
          </View>
        </View>
      </View>

      {/* Display last N days of prices in a horizontal scrollable list */}
      <View style={{ marginTop: 10 }}>
        <Text variant="labelMedium">Price History (Last 10 days):</Text>
        <FlatList
          data={prices} // Prices is now an array of PriceData objects
          renderItem={({ item, index }) => (
            <View style={{ marginHorizontal: 5 }}>
              <Text variant="labelSmall">
                Day {index + 1}: {formatCurrency(item.value)} {/* Access the value property */}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true} // Display prices in a row
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll bar
          contentContainerStyle={{ paddingHorizontal: 10 }} // Padding for smooth scrolling
        />
      </View>
    </Pressable>
  );
};
