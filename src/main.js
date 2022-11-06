import ppt from "./puppeteer/pupeteerCreate/puppeter.cjs"
const { openBrowser, closeBrowser } = ppt

import { shwowAllFollowed } from "./mongoDB/server.js"
import { goOnEachSite } from "./puppeteer/goOnEachSite.js"

const startMain = async () => {
    let newFollowedToCheck = []
    const followed = await shwowAllFollowed()

    for(let product of followed){

        const browser = await openBrowser(false)

        newFollowedToCheck.push( await goOnEachSite(product.avergePrice, product.listOfLinks, browser))

        closeBrowser(browser)
    }

    return newDataToCompare
}

startMain()