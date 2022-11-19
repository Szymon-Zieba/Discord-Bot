import {showAllFollowed, updatePrice} from "../mongoDB/server.js"
import {goOnEachSite} from "./goOnEachSite.js";
import {closeBrowser, openBrowser} from "./pupeteerCreate/puppeter.js";
import { browserQuantity } from "../config.js"
import {lowerPrice} from "../discord/main.js";

const checkSmallestPrice = async(newDataFromFollowed, listOfLinks) => {
    const sortLinks = (a, b) => a.link.localeCompare(b.link)
    newDataFromFollowed.sort(sortLinks)
    listOfLinks.sort(sortLinks)
    for(let i = 0; i < newDataFromFollowed.length; i++){
        const old = listOfLinks[i]
        const newProduct = newDataFromFollowed[i]
        if(newProduct.price !== old.price){
            console.log("Nowa cena")
        }
        if(newProduct.price < listOfLinks[0].price){
            await lowerPrice(newProduct.link, newProduct.price)
        }
    }
    // return newDataFromFollowed
}

const getDataFromWebsites = async (item) => {
    const browser = await openBrowser(false)
    const newDataFromFollowed = await goOnEachSite(item.avergePrice, item.listOfLinks, browser)
    console.log("TuTAJ")
    await checkSmallestPrice(newDataFromFollowed, item.listOfLinks)
    await updatePrice(newDataFromFollowed)
    closeBrowser(browser)
    return newDataFromFollowed
}

const getNewFollowed = async(followed) => {
    const newDataFromFollowed = []
    for(let i = 0; i < followed.length; i += browserQuantity) {
        const chunk = followed.slice(i, i+browserQuantity)
        const newFollowed = await Promise.all(chunk.map(item => getDataFromWebsites(item)))
        newDataFromFollowed.push(...newFollowed)
    }
    return newDataFromFollowed
}

const searchFollowedSites = async() => {
    const followed = await showAllFollowed()
    if (followed) {
        await getNewFollowed(followed)
    }
}

const main = () => {
    searchFollowedSites()
}
main()