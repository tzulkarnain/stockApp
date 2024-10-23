import { Pressable, View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import { formatCurrency } from "@/utils/formatCurrency";

// Define types for the props, including socialMediaCount
interface StockCardProps {
  ticker: string;
  image: string;
  companyName: string;
  price: number;
  priceChange: number;
  priceChangePercentage: number;
  socialMediaCount: number; // Add social media count prop
}

// StockCard component using the defined props
export const StockCard: React.FC<StockCardProps> = ({
  ticker,
  image,
  companyName,
  price,
  priceChange,
  priceChangePercentage,
  socialMediaCount, // Destructure social media count
}) => {
  const { width } = useWindowDimensions(); // Get screen width

  return (
    <Pressable
      style={{
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 10,
        height: 60,
      }}
      onPress={() => router.push(`/${ticker}`)} // Navigate to detailed view based on ticker
    >
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
              color: priceChange < 0 ? "red" : priceChange > 0 ? "lightgreen" : "black",
            }}
          >
            {formatCurrency(priceChange)} {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
