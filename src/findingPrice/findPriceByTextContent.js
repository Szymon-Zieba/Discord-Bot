export const findPriceByTextContent = (page, avergePrice) =>  
    page.evaluate(async(avergePrice) => {

        const getElementComputedStyle = (el, property) => window.getComputedStyle(el, null).getPropertyValue(property)

        const decodePrice = (price) => {
            const splitPrice = price
                .replace(/[^0-9]/g, '#')
                .split('#')
                .filter(e => e != '')
    
            let decodedPrice = ''
    
            for(let i = 0; i < splitPrice.length; i++) {
                const fragment = splitPrice[i]
    
                const separator = i > 0 && fragment.length < 3 ? '.' : ''
                
                decodedPrice += separator + fragment
            }
    
            return decodedPrice 
        }

        const getElementMaxFontSize = (el) => {
            let fontSize = parseInt(getElementComputedStyle(el, 'font-size').replace('px', ''))

            for(const child of el.children) {
                const size = parseInt(getElementComputedStyle(child, 'font-size').replace('px', ''))

                if(fontSize < size) fontSize = size
            }

            return fontSize
        }

        const prices = []
        const elements = [...document.querySelectorAll('body *')]
        elements.forEach(el => {
            let content = el.textContent          

            const currieces = /zl|zł|pln|,-/i
            
            if(el.children.length > 4 || !(currieces.test(content))) {
                return 
            }

            if( content.search(currieces) > 0){
                content = content.split(currieces)[0]
            }

            prices.push({
                fontWeight: parseInt(getElementComputedStyle(el, 'font-weight')),
                fontSize: getElementMaxFontSize(el), 
                offsetTop: el.getBoundingClientRect().top,
                text: decodePrice(content),
                link: document.location.href
            })
        })

        const filtered = prices.filter(
            p => 
            !isNaN(p.text) 
            && p.text != '' 
            && p.offsetTop > 100 
            && p.offsetTop < 1500
            && p.text > avergePrice * 0.15  
        )

        filtered.sort((a, b) => {
            const divideB = b.fontSize * b.fontWeight
            const divideA = a.fontSize * a.fontWeight
            
            if(divideB == divideA) 
                 return divideB / b.offsetTop  - divideA / a.offsetTop
    
            return divideB - divideA
        })
        if(!filtered[0]){
            return -1
        }
        else{
            return filtered[0].text
        }
    }, 
avergePrice)