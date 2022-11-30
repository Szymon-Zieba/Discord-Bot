import {findPriceByTextContent} from "./findingPrice/findPriceByTextContent.js"
import {closePage, newPage} from "./pupeteerCreate/puppeter.js";

const hanglePage = async (link, avergePrice, browser) => {
    const page = await newPage(browser)
    await page.goto(link, {
        waitUntil: "networkidle2",
        timeout: 0
    })
    .catch((err) => console.log("error loading url", err));

    let price = await findPriceByTextContent(page, avergePrice)

    await closePage(page)
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

