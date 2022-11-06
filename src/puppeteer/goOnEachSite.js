import ppt from "./pupeteerCreate/puppeter.cjs"
const { newPage } = ppt
import { findPriceByTextContent } from "./findingPrice/findPriceByTextContent.js"

const hanglePage = async (link, avergePrice, browser) => {
    try{
            const page = await newPage(browser)

            await page.goto(link, {
                'timeout': 4000 * 1000, 'waitUntil':'load'
            })   
            const price = await findPriceByTextContent(page, avergePrice)
            
            await page.close()
            return {price, link}
        
    }
    catch (err){
        console.log("ERROR IN hangle page")
        console.log(err)
    }
}

export const goOnEachSite = async (avergePrice, linksToProduct, browser) => {
    const priceLinkProductEachSite = []
    try{
        for(let i = 0; i < linksToProduct.length; i++){
            const priceLink = hanglePage(linksToProduct[i].link,avergePrice, browser) 
            if(priceLink){
                priceLinkProductEachSite.push(priceLink)
            }
        }
    }
    catch (err){
        console.log("ERROR IN goOnEachSite")
        console.log(err)
    }
    return Promise.all(priceLinkProductEachSite)
}

