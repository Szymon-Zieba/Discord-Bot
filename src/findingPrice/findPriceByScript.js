export const findPriceByScript = (page, avergePrice) => 
    page.evaluate(async(avergePrice) => {
        const splitedPrice = (name, price) => {
            let split
            split += price
                .split(name)
                .pop()
            split = split
                .replace(/[^0-9]/g, '#')
                .split('#')
                .filter(e => e != '')
            return split
        }

        const decodePrice = (price) => {
            const valueToFind = ["price", "value", "price :"]
            let splitPrice
            for(let i = 0; i < valueToFind.length; i++){
                let valueFinded = valueToFind[i]
                if(price.includes(valueFinded)){
                    splitPrice = splitedPrice(valueFinded, price)
                }
            }
            return splitPrice ?? ''
        }

        const elements = [...document.querySelectorAll('script')]
        let items= []
        let filtered = []
        elements.forEach(el => {
            let content = el.textContent 
            items.push(
                decodePrice(content)
            )
        })
        filtered = items.filter(
            p =>  p != '' 
        )
        items= []
        for(let i = 1; i < filtered.length; i++){
            items = items.concat(filtered[i])
        }
        const closesPrice = items.map(e => [e, Math.abs(avergePrice - e)]).sort((a, b) => a[1] - b[1])
        if(!closesPrice[0]){
            return -1
        }
        else{
            return closesPrice[0][0]
        }
    }, avergePrice)