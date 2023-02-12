import {findPriceByTextContent} from "./findPriceByTextContent.js"
import {findPriceByScript} from "./findPriceByScript.js"
import {closesPriceToAverge} from "./filteredData/closesPriceToAverge.js"

export const findBestPrice = async (page, avergePrice) => {
    try{
        const priceByTextContent = await findPriceByTextContent(page, avergePrice)
        const priceByScript = await findPriceByScript(page, avergePrice)

        const pricesAll = [priceByTextContent, priceByScript]
        return closesPriceToAverge(avergePrice, pricesAll)
    }
    catch (err){
        console.log("ERROR IN findBestPrice")
        console.log(err)
    }


}