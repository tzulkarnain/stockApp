export function generateMockStocks() {
    const stocks = [
        { ticker: "AAPL", companyName: "Apple Inc.", image: "https://financialmodelingprep.com/image-stock/AAPL.png" },
        { ticker: "GOOGL", companyName: "Alphabet Inc.", image: "https://financialmodelingprep.com/image-stock/GOOGL.png" },
        { ticker: "AMZN", companyName: "Amazon.com Inc.", image: "https://financialmodelingprep.com/image-stock/AMZN.png" },
        { ticker: "COST", companyName: "Costco Wholesale Corporation", image: "https://financialmodelingprep.com/image-stock/COST.png" },
    ];

    return stocks.map(stock => {
        // Generate a random price and price change
        const price = (Math.random() * 1000).toFixed(2);
        const priceChange = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10).toFixed(2);
        const priceChangePercentage = ((parseFloat(priceChange) / parseFloat(price)) * 100).toFixed(2);
        const socialMediaCount = Math.floor(Math.random() * 1000);

        // Generate mock prices for the last 10 days
        const prices = Array.from({ length: 10 }).map(() => ({
            value: parseFloat((Math.random() * 1000).toFixed(2)) // Convert to an object with a value property
        }));

        return {
            ...stock,
            price: parseFloat(price),
            priceChange: parseFloat(priceChange),
            priceChangePercentage: parseFloat(priceChangePercentage),
            socialMediaCount,
            prices, // Last 10 days of mock prices as objects
        };
    });
}
