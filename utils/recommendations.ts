export type Recommendation = "buy" | "hold" | "sell";

export function getRecommendation(
  stockPrices: { value: number }[],
  socialMediaCount: number
): Recommendation {
  // Check for valid stock price data
  if (!stockPrices || stockPrices.length < 2) return "hold";

  const initialPrice = stockPrices[0].value;
  const latestPrice = stockPrices[stockPrices.length - 1].value;

  // Calculate the price change ratio
  const priceChangeRatio = latestPrice / initialPrice;

  // Define thresholds for social media activity
  const highSocialMediaCountThreshold = 1000;
  const lowSocialMediaCountThreshold = 100;

  // Decision logic for recommendations
  if (priceChangeRatio > 1.1 && socialMediaCount > highSocialMediaCountThreshold) {
    return "sell";
  } else if (priceChangeRatio < 0.9 && socialMediaCount < lowSocialMediaCountThreshold) {
    return "buy";
  } else {
    return "hold";
  }
}
