import {closesPriceToAverge} from "../src/puppeteer/findingPrice/filteredData/closesPriceToAverge.js";

test('check closes to average price', () => {
    expect(closesPriceToAverge(100, [1,3,3,4,5,6,11,8,9,10])).toBe(11);
});