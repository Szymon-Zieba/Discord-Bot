import { getAveragePrice } from "./getAvergePrice.js"
import {showAllBlocked} from "../../../mongoDB/server.js"
export const getLinksToProduct = async (page, authorID) => {
    const allBlocked = await showAllBlocked(authorID)
    const linksToProduct = await page.evaluate(async(allBlocked) =>{
        let dataProduct = []
        const fetchLinks = () => {
            document.querySelectorAll("#sh-osd__online-sellers-cont > .sh-osd__offer-row").forEach(data => {
                if(!allBlocked.some(el => data.querySelector('a').href.includes(el)) ){
                    if(data.querySelector('td > span').innerText.split('PLN')[1] == "PLN"){
                        dataProduct.push({
                            price: parseFloat(data.querySelector('td > span').innerText.split('PLN')[1]),
                            link: data.querySelector('a').href,
                        })
                    }
                    else{
                        dataProduct.push({
                            price: parseFloat(data.querySelector('td > span').innerText),
                            link: data.querySelector('a').href,
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
    }, allBlocked)

    const avergePrice = getAveragePrice(linksToProduct)

    return {linksToProduct, avergePrice}
}