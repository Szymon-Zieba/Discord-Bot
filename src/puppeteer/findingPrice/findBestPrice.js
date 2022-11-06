import { findPriceByTextContent } from "./findPriceByTextContent.js"
import { findPriceByScript } from "./findPriceByScript.js"
import { findPriceByMeta } from "./findPriceByMeta.js"
import { closesPriceToAverge } from "./filteredData/closesPriceToAverge.js"

export const findBestPrice = async (page, avergePrice) => {
    try{
        const priceByTextContent = await findPriceByTextContent(page, avergePrice)
        const priceByScript = await findPriceByScript(page, avergePrice)
        //const priceByMeta = await findPriceByMeta(page, avergePrice)

        //const pricesAll = [priceByTextContent, priceByScript, priceByMeta]
        const pricesAll = [priceByTextContent, priceByScript]
        const closesPrice = closesPriceToAverge(avergePrice, pricesAll)

        return closesPrice
    }
    catch (err){
        console.log("ERROR IN findBestPrice")
        console.log(err)
    }


}