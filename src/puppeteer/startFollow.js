import {newPage, openBrowser, closeBrowser, closePage} from './pupeteerCreate/puppeter.js';
import { getDateToChooseProduct } from "./findingProductOnGoogle/getDateToChooseProduct.js"
import { getLinksToProduct } from "./findingProductOnGoogle/getLinksToShops/getLinksToShops.js";
import { goOnEachSite } from './goOnEachSite.js';
import { proxies} from "./pupeteerCreate/proxy.js";
import { changeRegion } from "./findingProductOnGoogle/getLinksToShops/changeRegion.js"
import {isBrowserClose} from "../config.js";

const changeRegionGoogle = async(browser) => {
    const regionPage = await newPage(browser)
    await regionPage.goto("https://www.google.com/preferences?hl&prev",{
        'waitUntil': 'networkidle2',
        'timeout': 0
    })
    await changeRegion(regionPage)
    await closePage(regionPage)
}

export const getDateForChooseProduct = async (productName) => {
    try {
        const proxy = proxies[0]
        const {browser, chromeTmpDataDir} = await openBrowser(isBrowserClose, proxy)
        const page = await newPage(browser)
        await page.goto("https://google.com")
        await page.click("#L2AGLb")
        await changeRegionGoogle(browser)
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
        const proxy = proxies[0]
        const {browser, chromeTmpDataDir} = await openBrowser(isBrowserClose, proxy)
        await changeRegionGoogle(browser)
        const page = await newPage(browser)
        await page.goto(dateToChooseProduct.link, {
            'waitUntil': 'networkidle2',
            'timeout': 0
        })
        const {linksToProduct, avergePrice} = await getLinksToProduct(page)
        let dataOfProductFromWebsite
        try{
            const followed = await goOnEachSite(avergePrice, linksToProduct, browser)
             dataOfProductFromWebsite = followed.filter(el => el.price > 1)
        } catch(err){
            console.log(err)
            console.log("START FOLLOW GO ON EACH SITE")
        }
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
