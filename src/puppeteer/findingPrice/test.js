import ppt from '../pupeteerCreate/puppeter.cjs';
import { findBestPrice } from './findBestPrice.js';
import {findPriceByTextContent} from "./findPriceByTextContent.js";
const { newPage, openBrowser, closeBrowser} = ppt

const link = "https://hanzo.com.pl/pl/p/AMD-Ryzen-3-3200G-3%2C6GHz-AM4-YD3200C5FHBOX/6281"
const avergePrice = 500
const main = async(link) => {
    try {
        const browser = await openBrowser(false)
        const page = await newPage(browser)
        await page.goto(link, {waitUntil: 'networkidle2', timeout: 0})
        const price =  await findPriceByTextContent(page, avergePrice)
        console.log(price)
    } catch(err){
        console.log(err)
    }
}

main(link)