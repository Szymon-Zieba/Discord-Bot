import {showAllFollowed, updatePrice} from "../mongoDB/server.js"
import {goOnEachSite} from "./goOnEachSite.js";
import {closeBrowser, openBrowser} from "./pupeteerCreate/puppeter.js";
import {browserQuantity} from "../config.js"
import {lowerPrice} from "../discord/main.js";

const checkSmallestPrice = async(newDataFromFollowed, listOfLinks) => {
    for(let i = 0; i < newDataFromFollowed.length; i++){
        const newProduct = newDataFromFollowed[i]
        const newPrice = parseFloat(newProduct.price)
        if(newPrice < parseFloat(listOfLinks[0].price) && newPrice > 0){
            await lowerPrice(newProduct.link, newProduct.price)
        }
    }
}

const getDataFromWebsites = async (item) => {
    const {browser, chromeTmpDataDir} = await openBrowser(false)
    const newDataFromFollowed = {
        name: item.name,
        listOfLinks: await goOnEachSite(item.avergePrice, item.listOfLinks, browser)
    }
    await checkSmallestPrice(newDataFromFollowed.listOfLinks, item.listOfLinks)
    newDataFromFollowed.listOfLinks.sort((a,b) => a.price - b.price)
    await updatePrice(newDataFromFollowed)
    closeBrowser(browser, chromeTmpDataDir)
}

const getNewFollowed = async(followed) => {
    for(let i = 0; i < followed.length; i += browserQuantity) {
        const chunk = followed.slice(i, i+browserQuantity)
        await Promise.all(chunk.map(item => getDataFromWebsites(item)))
        console.log("OK")
    }
    return "nic"
}

const searchFollowedSites = async(i) => {
    console.log("refresh")

    const followed = await showAllFollowed()
    if (followed) {
        await getNewFollowed(followed)
    }
    console.log(i++)
    setTimeout(() => searchFollowedSites(i), 1000 * 3 );
}
let i = 0
await searchFollowedSites(i)