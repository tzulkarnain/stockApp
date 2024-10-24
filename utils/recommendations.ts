export type Recommendation = "buy" | "hold" | "sell";

export function getRecommendation(
  stockPrices: { value: number }[],
  socialMediaCount: number
): Recommendation {
  if (!stockPrices || stockPrices.length < 2) return "hold";

  const initialPrice = stockPrices[0].value;
  const latestPrice = stockPrices[stockPrices.length - 1].value;
  const priceChange = latestPrice / initialPrice;

  console.log("Initial Price:", initialPrice);
  console.log("Latest Price:", latestPrice);
  console.log("Price Change:", priceChange);
  console.log("Social Media Count:", socialMediaCount);

  // Set thresholds for social media activity
  const highSocialMediaCount = 500;
  const lowSocialMediaCount = 200;

  // Debug the price and social media thresholds
  if (priceChange > 1.1 && socialMediaCount > highSocialMediaCount) {
    console.log("Recommendation: sell");
    return "sell";
  } else if (priceChange < 0.9 && socialMediaCount < lowSocialMediaCount) {
    console.log("Recommendation: buy");
    return "buy";
  } else {
    console.log("Recommendation: hold");
    return "hold";
  }
}
