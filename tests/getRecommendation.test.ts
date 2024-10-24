import { getRecommendation, Recommendation } from "../utils/recommendations";

describe("getRecommendation", () => {
  test("returns 'hold' for invalid stock price data", () => {
    expect(getRecommendation([], 500)).toBe("hold"); // No prices
    expect(getRecommendation([{ value: 100 }], 500)).toBe("hold"); // Only one price
  });

  test("returns 'hold' when price change is within range and social media count is moderate", () => {
    const stockPrices = [
      { value: 100 },
      { value: 105 },
    ];
    expect(getRecommendation(stockPrices, 500)).toBe("hold"); // Price increased by 5%
  });

  test("returns 'sell' when price has significantly increased and social media count is high", () => {
    const stockPrices = [
      { value: 100 },
      { value: 120 },
    ];
    expect(getRecommendation(stockPrices, 1100)).toBe("sell"); // Price increased by 20%, high social media
  });

  test("returns 'buy' when price has significantly decreased and social media count is low", () => {
    const stockPrices = [
      { value: 100 },
      { value: 80 },
    ];
    expect(getRecommendation(stockPrices, 50)).toBe("buy"); // Price decreased by 20%, low social media
  });

  test("returns 'hold' when price has moderately changed and social media count is average", () => {
    const stockPrices = [
      { value: 100 },
      { value: 95 },
    ];
    expect(getRecommendation(stockPrices, 200)).toBe("hold"); // Price decreased by 5%, moderate social media
  });
});
