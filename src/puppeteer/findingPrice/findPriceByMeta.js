export const findPriceByMeta = (page, avergePrice) =>  page.evaluate(async(avergePrice) => {

    const closesToOne = (decodedPrice) => {
        let dividedDecodedToAvarage = decodedPrice/ avergePrice
        if(dividedDecodedToAvarage > 2){
            return 0 
        }

        else if(dividedDecodedToAvarage <= 1){ 
            return dividedDecodedToAvarage
        }

        else if(dividedDecodedToAvarage <= 2 && dividedDecodedToAvarage > 1){                
            return 2 - dividedDecodedToAvarage
        }

        return 0
    }

    const splitPrice = (element) => {
        let content = (element.split('"offers"')[1]).split("brand")[0]
        if(content.includes("InStock")){
            let content = (element.split('"offers"')[1]).split("brand")[0]
            return (content.split('"price":')[1]).split(",")[0]
        }
    }

    const elements = [...document.querySelectorAll('script[type="application/ld+json"]')]
    const items= []
    let filtered = []
    elements.forEach(el => {
        const element = el.text
        if(element){
            if(element.includes("offers")){
                const decodedPrice = splitPrice(element)

                items.push({
                    price: decodedPrice,
                    closes: closesToOne(decodedPrice)
                })
            }
        }
    })
    filtered = items.filter(
            p =>  p.price != ''
            && p.closes != 0
    )

    filtered.sort((a, b) => {
            const divideB = b.closes * b.closes
            const divideA = a.closes * a.closes
            return divideB - divideA
    })

    if(!filtered[0]){
        return -1
    }
    else{
        return filtered[0].price
    }
}, avergePrice)