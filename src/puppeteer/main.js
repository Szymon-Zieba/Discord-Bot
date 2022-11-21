import {showAllFollowed, updatePrice} from "../mongoDB/server.js"
import {goOnEachSite} from "./goOnEachSite.js";
import {closeBrowser, openBrowser} from "./pupeteerCreate/puppeter.js";
import {browserQuantity} from "../config.js"
import {lowerPrice} from "../discord/main.js";

const checkSmallestPrice = async(newDataFromFollowed, listOfLinks) => {
    for(let i = 0; i < newDataFromFollowed.length; i++){
        const newProduct = newDataFromFollowed[i]
        if(parseFloat(newProduct.price) < parseFloat(listOfLinks[0].price)){
            await lowerPrice(newProduct.link, newProduct.price)
        }
    }
}

const getDataFromWebsites = async (item) => {
    const browser = await openBrowser(true)
    const newDataFromFollowed = {
        name: item.name,
        listOfLinks: await goOnEachSite(item.avergePrice, item.listOfLinks, browser)
    }
    await checkSmallestPrice(newDataFromFollowed.listOfLinks, item.listOfLinks)
    newDataFromFollowed.listOfLinks.sort((a,b) => a.price - b.price)
    await updatePrice(newDataFromFollowed)
    closeBrowser(browser)
}

const getNewFollowed = async(followed) => {
    for(let i = 0; i < followed.length; i += browserQuantity) {
        const chunk = followed.slice(i, i+browserQuantity)
        await Promise.all(chunk.map(item => getDataFromWebsites(item)))
        console.log("OK")
    }
}

const searchFollowedSites = async() => {
    console.log("refresh")

    const followed = await showAllFollowed()
    if (followed) {
        await getNewFollowed(followed)
    }
    setTimeout(await searchFollowedSites(), 1000 * 60 * 2);
}

await searchFollowedSites()