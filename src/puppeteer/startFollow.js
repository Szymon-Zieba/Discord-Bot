import { newPage, openBrowser, closeBrowser} from './pupeteerCreate/puppeter.js';
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
        const browser = await openBrowser(true )
        const page = await newPage(browser)
        await page.goto(dateToChooseProduct.link)

        const {linksToProduct, avergePrice} = await getLinksToProduct(page)
        const followed = await goOnEachSite(avergePrice, linksToProduct, browser)
        console.log("PRzed data")
        const dataOfProductFromWebsite = followed.filter(el => el.price > 1)
        console.log("Po data")
        dataOfProductFromWebsite.sort( (a,b) => {
            return a.price - b.price
        })
        console.log("Po sorcie")
        closeBrowser(browser)
        return { dataOfProductFromWebsite, avergePrice }
    }
    catch (err){
        console.log("ERROR IN startFollow")
        console.log(err)
    }
}
