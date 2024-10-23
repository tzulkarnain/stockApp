export type Recommendation = "buy" | "hold" | "sell";

export function getRecommendation(stockPrices: { value: number }[]) {
  if (!stockPrices || stockPrices.length < 2) return "Hold";

  const initialPrice = stockPrices[0].value;
  const latestPrice = stockPrices[stockPrices.length - 1].value;

  if (latestPrice > initialPrice * 1.1) {
    return "Sell";
  } else if (latestPrice < initialPrice * 0.9) {
    return "Buy";
  } else {
    return "Hold";
  }
}
