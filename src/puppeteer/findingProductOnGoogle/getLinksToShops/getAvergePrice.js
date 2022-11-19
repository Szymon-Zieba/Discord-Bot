export const getAveragePrice = (dataOfProduct) => {
    let allPrice  = 0
    dataOfProduct.forEach(el => {
        allPrice += el.price
    })
    allPrice = (allPrice / dataOfProduct.length).toFixed(2)

    return allPrice
}