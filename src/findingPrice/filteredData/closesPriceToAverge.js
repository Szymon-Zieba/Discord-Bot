export const closesPriceToAverge = (avergePrice, prices) => {
    const closesPrice = 
    prices.map(e => [e, Math.abs(avergePrice - e)])
        .sort((a, b) => a[1] - b[1])[0][0]
    return closesPrice
}