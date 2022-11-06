export const findPriceByMeta = (page, avergePrice) =>  page.evaluate(async(avergePrice) => {
    const splitedPrice  = (price) => {
        price = price
            .replace(/[^0-9]/g, '#')
            .split('#')
            .filter(e => e != '')
        return price[0] + '.' + price[1] ?? -1
    }

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

    const elements = [...document.querySelectorAll('meta')]
    const items= []
    let filtered = []
    elements.forEach(el => {
        let content = el.content 

        decodedPrice = splitedPrice(content)
        
        items.push({
            price: decodedPrice,
            closes: closesToOne(decodedPrice)
        })
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