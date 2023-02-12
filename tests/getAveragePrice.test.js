import {getAveragePrice} from "../src/puppeteer/findingProductOnGoogle/getLinksToShops/getAvergePrice.js";

const dataOfProduct = [
    {
        price: 10
    },
    {
        price: 15
    },
]

test('get average price', () => {
    expect(getAveragePrice(dataOfProduct)).toBe("12.50");
});