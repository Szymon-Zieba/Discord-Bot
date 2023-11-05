import {newPage, openBrowser, closeBrowser} from './pupeteerCreate/puppeter.js';
import { getDateToChooseProduct } from "./findingProductOnGoogle/getDateToChooseProduct.js"
import { getLinksToProduct } from "./findingProductOnGoogle/getLinksToShops/getLinksToShops.js";
import { goOnEachSite } from './goOnEachSite.js';
import { proxies} from "./pupeteerCreate/proxy.js";
import { changeRegion } from "./findingProductOnGoogle/getLinksToShops/changeRegion.js"
import {domainEndURL, domainStartURL, isBrowserClose} from "../config.js";

const regionWithCookies = async(page) => {
    await page.goto("https://google.com", {
        waitUntil: "load",
    })
    await page.click("#L2AGLb")
    await page.waitForNavigation({waitUntil: "load"})
    await page.goto("https://www.google.com/preferences?lang=1", {
        waitUntil: "load",
    })
    await changeRegion(page)
}

export const getDateForChooseProduct = async (productName) => {
    try {
        const proxy = proxies[0]
        const {browser, chromeTmpDataDir} = await openBrowser(isBrowserClose, proxy)
        const page = await newPage(browser)
        await regionWithCookies(page)
        const linkName = encodeURI(domainStartURL + productName + domainEndURL)
        console.log(linkName)
        await page.goto(linkName, {
            waitUntil: 'load',
            timeout: 60000
        })
        console.log('dsa')
        const dateToChooseProduct = await getDateToChooseProduct(page)
        closeBrowser(browser, chromeTmpDataDir)
        return dateToChooseProduct
    }
    catch (err){
        console.log("ERROR IN getDateForChooseProduct")
        console.log(err)
    }
}

export const startFollow = async (dateToChooseProduct, authorID) => {
    try {
        const proxy = proxies[0]
        const {browser, chromeTmpDataDir} = await openBrowser(isBrowserClose, proxy)
        const page = await newPage(browser)
        await regionWithCookies(page, browser)
        await page.goto(dateToChooseProduct.link, {
            'waitUntil': 'networkidle2',
            'timeout': 0
        })
        const {linksToProduct, avergePrice} = await getLinksToProduct(page, authorID)
        console.log(linksToProduct)
        let dataOfProductFromWebsite = []
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
