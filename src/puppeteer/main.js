import {showAllFollowed, updatePrice} from "../mongoDB/server.js"
import {goOnEachSite} from "./goOnEachSite.js";
import {closeBrowser, openBrowser} from "./pupeteerCreate/puppeter.js";
import {browserQuantity, isBrowserClose} from "../config.js"
import {lowerPrice} from "../discord/main.js";
import { proxies } from "./pupeteerCreate/proxy.js"

const checkSmallestPrice = async(newDataFromFollowed, listOfLinks, authorID) => {
    for(let i = 0; i < newDataFromFollowed.length; i++){
        const newProduct = newDataFromFollowed[i]
        const newPrice = parseFloat(newProduct.price)
        const element = listOfLinks.find(el => el.price > 0)
        if(newPrice < parseFloat(element.price) && newPrice > 0){
            await lowerPrice(newProduct.link, newProduct.price, authorID)
        }
    }
}
const getDataFromWebsites = async (item, proxy, authorID) => {
    const {browser, chromeTmpDataDir} = await openBrowser(isBrowserClose, proxy)
    const newDataFromFollowed = {
        name: item.name,
        listOfLinks: await goOnEachSite(item.avergePrice, item.listOfLinks, browser)
    }
    await checkSmallestPrice(newDataFromFollowed.listOfLinks, item.listOfLinks, authorID)
    newDataFromFollowed.listOfLinks.sort((a,b) => a.price - b.price)
    await updatePrice(authorID, newDataFromFollowed)
    closeBrowser(browser, chromeTmpDataDir)
}
const getNewFollowed = async(followed, authorID) => {
    let index = 0
    for(let i = 0; i < followed.length; i += browserQuantity) {
        const proxy = proxies[index]
        let chunk = followed
        if(browserQuantity !== 1){
            chunk = followed.slice(i, i+browserQuantity)
        }
        await Promise.all(chunk.map(item => getDataFromWebsites(item, proxy, authorID)))
        console.log("OK")
        index++
        if(index === proxies.length){
            index = 0
        }
    }
}
const searchFollowedSites = async(i) => {
    console.log("refresh")
    const followed = await showAllFollowed()
    if (followed) {
        for(const el of followed){
            await getNewFollowed(el.products, el.id)
        }
    }
    console.log(i++)
    setTimeout(() => searchFollowedSites(i), 1000 * 3 );
}
let i = 0
await searchFollowedSites(i)