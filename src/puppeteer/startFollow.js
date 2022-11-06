import ppt from './pupeteerCreate/puppeter.cjs';
const { newPage, openBrowser, closeBrowser} = ppt

import { getDateToChooseProduct } from "./findingProductOnGoogle/getDateToChooseProduct.js"
import { getLinksToProduct } from "./findingProductOnGoogle/getLinksToShops/getLinksToShops.js";
import { goOnEachSite } from './goOnEachSite.js';


export const getDateForChooseProduct = async (productName) => {
    try {
        const browser = await openBrowser(true)
        const page = await newPage(browser)
        const dateToChooseProduct = await getDateToChooseProduct(productName, page)
        closeBrowser(browser)
        return dateToChooseProduct
    }
    catch (err){
        console.log("ERROR IN getDateForChooseProduct")
        console.log(err)
    }
}

export const startFollow = async (dateToChooseProduct) => {
    try {
        const browser = await openBrowser(true)
        const page = await newPage(browser)
        await page.goto(dateToChooseProduct.link)

        const {linksToProduct, avergePrice} = await getLinksToProduct(page)
        const followed = await goOnEachSite(avergePrice, linksToProduct, browser)
        const dataOfProductFromWebsite = followed.filter(el => el.price > 1)

        dataOfProductFromWebsite.sort( (a,b) => {
            return a.price - b.price
        })
        closeBrowser(browser)
        return { dataOfProductFromWebsite, avergePrice }
    }
    catch (err){
        console.log("ERROR IN startFollow")
        console.log(err)
    }
}
