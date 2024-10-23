interface MockData {
    ticker: string;
    companyName: string;
    date: string;
    price: string;
    priceChange: string;
    priceChangePercentage: string;
    socialMediaCount: number;
}

export function generateMockData(stockSymbol: string, days: number): MockData[] {
    const mockData: MockData[] = [];
    for (let i = 0; i < days; i++) {
        const price = Math.random() * 1000; // Random price between 0 and 1000
        const socialMediaCount = Math.floor(Math.random() * 1000); // Random social media count
        const priceChange = Math.random() > 0.5 ? price * 0.05 : price * -0.05; // Random 5% change

        mockData.push({
            ticker: stockSymbol,
            companyName: `${stockSymbol} Corp`,
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(), // Generate past dates
            price: price.toFixed(2),
            priceChange: priceChange.toFixed(2),
            priceChangePercentage: ((priceChange / price) * 100).toFixed(2),
            socialMediaCount,
        });
    }
    return mockData.reverse(); // So the latest data is shown first
}
  
  export function getRecommendation(data: MockData) {
    const { priceChangePercentage, socialMediaCount } = data;
    
    // Simple recommendation logic
    if (socialMediaCount > 500 && priceChangePercentage > 0) {
      return "Buy";
    } else if (priceChangePercentage < 0 && socialMediaCount < 500) {
      return "Sell";
    } else {
      return "Hold";
    }
  }
  