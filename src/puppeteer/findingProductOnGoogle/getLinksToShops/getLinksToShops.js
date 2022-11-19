import { getAveragePrice } from "./getAvergePrice.js"
export const getLinksToProduct = async (page) => {

    const linksToProduct = await page.evaluate(async() =>{
        let dataProduct = []
        const fetchLinks = () => {
            let i = 1;
            document.querySelectorAll("#sh-osd__online-sellers-cont > .sh-osd__offer-row").forEach(data => {
                // dsadas
                if(!(data.querySelector('a').href).includes('allegro') && !(data.querySelector('a').href).includes('aliexpress') && !(data.querySelector('a').href).includes('erli.pl')){
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
    })

    const avergePrice = getAveragePrice(linksToProduct)

    return {linksToProduct, avergePrice}
}