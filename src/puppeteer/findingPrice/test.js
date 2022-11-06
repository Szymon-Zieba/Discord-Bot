import ppt from '../pupeteerCreate/puppeter.cjs';
import { findBestPrice } from './findBestPrice.js';
const { newPage, openBrowser, closeBrowser} = ppt

const link = "https://www.empik.com/myszka-miki-i-przyjaciele-zabawka-interaktywna-spiacy-miki-imc,p1103187500,zabawki-p?srsltid=AR5OiO2tTqXAgDhnk1YTpFptv8tFrRfCAOc8X34f-92m9gayTxDCUvNzRPM"
const avergePrice = 100
const main = async(link) => {
    try {
        const browser = await openBrowser(false)
        const page = await newPage(browser)
        await page.goto(link)
        const price =  await findBestPrice(page, avergePrice)
        console.log(await price)
    } catch(err){
        console.log(err)
    }
}

main(link)