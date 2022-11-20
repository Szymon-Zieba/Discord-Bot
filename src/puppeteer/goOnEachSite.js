import { findPriceByTextContent } from "./findingPrice/findPriceByTextContent.js"
import {closePage, newPage} from "./pupeteerCreate/puppeter.js";

const hanglePage = async (link, avergePrice, browser) => {
    try{
        const page = await browser.newPage()
        await page.goto(link, {
            'timeout': 4000 * 60 * 4, 'waitUntil':'networkidle2'
        })
        const price = await findPriceByTextContent(page, avergePrice)
        await closePage(page)
        return {price, link}
    }
    catch (err){
        console.log("ERROR IN hangle page")
        console.log(err)
    }
}

export const goOnEachSite = async(avergePrice, linksToProduct, browser) => {
    const priceLinkProductEachSite = []
    for(let i = 0; i < linksToProduct.length; i++){
        priceLinkProductEachSite.push(hanglePage(linksToProduct[i].link, avergePrice, browser))
    }
    const priceLink = await Promise.all(priceLinkProductEachSite)
    return priceLink.filter(product => product.price)
}

