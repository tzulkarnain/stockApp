export type Recommendation = "buy" | "hold" | "sell";

export function getRecommendation(
  stockPrices: { value: number }[],
  socialMediaCount: number
): Recommendation {
  // Check for valid stock price data
  if (!stockPrices || stockPrices.length < 2) return "hold";

  const initialPrice = stockPrices[0].value;
  const latestPrice = stockPrices[stockPrices.length - 1].value;

  // Calculate the price change percentage
  const priceChangePercentage = ((latestPrice - initialPrice) / initialPrice) * 100;

  // Define thresholds for social media activity
  const highSocialMediaCountThreshold = 500;
  const lowSocialMediaCountThreshold = 100;

  // Decision logic for recommendations
  if (priceChangePercentage > 5 && socialMediaCount > highSocialMediaCountThreshold) {
    return "sell";
  } else if (priceChangePercentage < -5 && socialMediaCount < lowSocialMediaCountThreshold) {
    return "buy";
  } else {
    return "hold";
  }
}
