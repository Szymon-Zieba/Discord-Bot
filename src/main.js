import ppt from "./pupeteerCreate/puppeter.cjs"
const { openBrowser, closeBrowser } = ppt

import { getFollowed } from "./followed/followOperations.js"
import { goOnEachSite } from "./goOnEachShop/goOnEachSite.js"



const followed = getFollowed()

const startMain = async () => {
    let browser = {}
    let newFollowedToCheck = []

    for(let product of followed){
        browser[product.id] = await openBrowser(false)
        newFollowedToCheck.push(goOnEachSite(product.avergePrice, product.listOfLinks, browser[product.id]))
    }
    let newDataToCompare = await Promise.all(newFollowedToCheck)
    console.log(newDataToCompare)

    // for(let product of newDataToCompare){
    //     product.listOfLinks.sort( (a,b) => {
    //         return a - b
    //     })
    // }
    
    for(let product of followed){
        closeBrowser(browser[product.id])  
    }

    return newDataToCompare
}

startMain()