import {newPage} from "./pupeteerCreate/puppeter.js";
import {findBestPrice} from "./findingPrice/findBestPrice.js";

const dataFromPage = async (page, avergePrice, link) => {
    try{
        await page.goto(link, {
            waitUntil: 'networkidle2',
            timeout: 0
        })
        return await findBestPrice(page, avergePrice)
    }
    catch(err){
        console.log(err)
        console.log("error in hanglePage")
        return -1
    }
}
const handlePage = async (link, avergePrice, browser) => {
    const page = await newPage(browser)
    let price = false
    let attempts = 1
    while(!price && attempts < 5) {
        price = await dataFromPage(page, avergePrice, link)
        attempts += 1;
        if (!price) {
            setTimeout((r) => r, 3000)
        }
    }
    await page.close()
    return {price, link}
}
const  getPriceLink = async(avergePrice, linksToProduct, browser) => {
    const priceLinkProductEachSite = []
    let quantity = 10
    for(let i = 0; i < linksToProduct.length; i += quantity) {
        const chunk = linksToProduct.slice(i, i+quantity)
        const priceLink = await Promise.all(chunk.map(item => handlePage(item.link, avergePrice, browser)))
        console.log(priceLink)
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

