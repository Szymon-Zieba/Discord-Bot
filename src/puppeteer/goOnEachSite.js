import {findPriceByTextContent} from "./findingPrice/findPriceByTextContent.js"
import {closePage, newPage} from "./pupeteerCreate/puppeter.js";
import {findBestPrice} from "./findingPrice/findBestPrice.js";

const dataFromPage = async (page, avergePrice, link) => {
    try{
        await page.goto(link, {
            waitUntil: 'networkidle2',
            timeout: 0
        })
        let price = await findBestPrice(page, avergePrice)
        await closePage(page)
        return price
    }
    catch(err){
        console.log(err)
        console.log("error in hanglePage")
        return false
    }

}

const hanglePage = async (link, avergePrice, browser) => {
    const page = await newPage(browser)
    let price = false
    let attempts = 1
    while(price === false && attempts < 5) {
        price = await dataFromPage(page, avergePrice, link)
        attempts += 1;
        if (price === false) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
    return {price, link}
}
const  getPriceLink = async(avergePrice, linksToProduct, browser) => {
    const priceLinkProductEachSite = []
    let quantity = 10
    for(let i = 0; i < linksToProduct.length; i += quantity) {
        const chunk = linksToProduct.slice(i, i+quantity)
        const priceLink = await Promise.all(chunk.map(item => hanglePage(item.link, avergePrice, browser)))
        priceLinkProductEachSite.push(...priceLink)
    }
    return priceLinkProductEachSite
}

export const goOnEachSite = async(avergePrice, linksToProduct, browser) => {
    let priceLink = await getPriceLink(avergePrice, linksToProduct, browser)
    if(!priceLink){
        priceLink = await getPriceLink(avergePrice, linksToProduct, browser)
    }
    return priceLink.filter(product => product?.price)
}

