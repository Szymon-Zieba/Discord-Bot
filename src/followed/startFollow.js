import ppt from '../pupeteerCreate/puppeter.cjs';
const { newPage, openBrowser, closeBrowser} = ppt

import { getDateToChooseProduct } from "../findingProductOnGoogle/getDateToChooseProduct.js"
import { getLinksToProduct } from "../findingProductOnGoogle/getLinksToShops/getLinksToShops.js";
import { goOnEachSite } from '../goOnEachShop/goOnEachSite.js';


export const startFollow = async (productName) => {
    try {
        const browser = await openBrowser(false)
        const page = await newPage(browser)
        const dateToChooseProduct = await getDateToChooseProduct(productName, page)

        //----------------------- DOROBIC WYBOR PRZEZ  UZYTKOWNIKA DISCORD -------------------
        await page.goto(dateToChooseProduct[0].link)
        // -----------------------------------------------------------------------------------

        const {linksToProduct, avergePrice} = await getLinksToProduct(page)
        const followed = await goOnEachSite(avergePrice, linksToProduct, browser)
        const dataOfProductFromWebsite = followed.filter(el => el.price > 5)
        closeBrowser(browser)
        //----------------------- DOROBIC POWIADOMIENIE DO DISCORDA O NAJNIZSZEJ CENIE -------------------
        //
        // ----------------------------------------------------------------------------------------------
        return { dataOfProductFromWebsite, avergePrice }
    }
    catch (err){
        console.log("ERROR IN startFollow")
        console.log(err)
    }
}
