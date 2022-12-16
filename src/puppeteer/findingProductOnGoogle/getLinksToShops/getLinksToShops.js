import { getAveragePrice } from "./getAvergePrice.js"
import {showAllBlocked} from "../../../mongoDB/server.js"
export const getLinksToProduct = async (page) => {
    const allBlocked = await showAllBlocked()
    const blockedTab = allBlocked.map(el => el.name)
    console.log(blockedTab)
    const linksToProduct = await page.evaluate(async(blockedTab) =>{
        let dataProduct = []
        const fetchLinks = () => {
            let i = 1;
            document.querySelectorAll("#sh-osd__online-sellers-cont > .sh-osd__offer-row").forEach(data => {
                if(!blockedTab.some(el => data.querySelector('a').href.includes(el)) ){
                    if(data.querySelector('td > span').innerText.split('PLN')[1] == "PLN"){
                        dataProduct.push({
                            price: parseFloat(data.querySelector('td > span').innerText.split('PLN')[1]),
                            link: data.querySelector('a').href,
                            quantity: i++,
                        })
                    }
                    else{
                        dataProduct.push({
                            price: parseFloat(data.querySelector('td > span').innerText),
                            link: data.querySelector('a').href,
                            quantity: i++,
                        })
                    }
                }
            })
        }
        fetchLinks()

        let length = document.querySelector('#sh-fp__pagination-button-wrapper').children.length -1
        const click = document.querySelector('#sh-fp__pagination-button-wrapper .R9e18b .internal-link')
        if(click){
            for(let i=0; i < length; i++){
                click.click()
                await new Promise(r => setTimeout(r, 1*1000))
                fetchLinks()
            }
        }
        return dataProduct
    }, blockedTab)

    const avergePrice = getAveragePrice(linksToProduct)

    return {linksToProduct, avergePrice}
}