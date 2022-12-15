import {domainEndURL, domainStartURL} from "../../config.js";


export const getDateToChooseProduct = async(productName, page) => {

    const linkName = encodeURI(domainStartURL + productName + domainEndURL)

    await page.goto(linkName, {
        waitUntil: ['load', 'networkidle2', "domcontentloaded"],
        timeout: 60000
    })
    await page.click("button")
    await page.waitForSelector(".i0X6df")

    const dateToChoose = await page.evaluate(async() =>{
        const date = []
        document.querySelectorAll(".i0X6df").forEach(offer => {

            const linkForUser = offer.querySelector('.iXEZD')
            const textForUser = offer.querySelector('.tAxDx')

            if(linkForUser){
                date.push({
                link: 'https://google.com' + linkForUser.getAttribute('href'),
                text: textForUser.textContent,
                quantity: linkForUser.textContent.slice(-11).slice(0,2)
            })
            }
        })
            return date.slice(0,7)
    })

    return dateToChoose
}
