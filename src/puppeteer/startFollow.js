import { newPage, openBrowser, closeBrowser} from './pupeteerCreate/puppeter.js';
import { getDateToChooseProduct } from "./findingProductOnGoogle/getDateToChooseProduct.js"
import { getLinksToProduct } from "./findingProductOnGoogle/getLinksToShops/getLinksToShops.js";
import { goOnEachSite } from './goOnEachSite.js';

export const getDateForChooseProduct = async (productName) => {
    try {
        const {browser, chromeTmpDataDir} = await openBrowser(true)
        const page = await browser.newPage()
        const dateToChooseProduct = await getDateToChooseProduct(productName, page)
        closeBrowser(browser, chromeTmpDataDir)
        return dateToChooseProduct
    }
    catch (err){
        console.log("ERROR IN getDateForChooseProduct")
        console.log(err)
    }
}

export const startFollow = async (dateToChooseProduct) => {
    try {
        const {browser, chromeTmpDataDir} = await openBrowser(true)
        const page = await newPage(browser)
        await page.goto(dateToChooseProduct.link, {
            'waitUntil': 'networkidle2',
            'timeout': 0
        })
        const {linksToProduct, avergePrice} = await getLinksToProduct(page)
        const followed = await goOnEachSite(avergePrice, linksToProduct, browser)
        const dataOfProductFromWebsite = followed.filter(el => el.price > 1)
        dataOfProductFromWebsite.sort( (a,b) => {
            return a.price - b.price
        })
        closeBrowser(browser, chromeTmpDataDir)
        return { dataOfProductFromWebsite, avergePrice}
    }
    catch (err){
        console.log("ERROR IN startFollow")
        console.log(err)
    }
}
