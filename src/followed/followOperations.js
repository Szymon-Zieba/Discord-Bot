import followedJSON from "./followed.json" assert {type: 'json'}  // co zrobic jak jest pusty json 
import fs  from 'fs';

import { startFollow } from "./startFollow.js"

const overWriteFile = (name, data) => {
    fs.writeFile(name, data, function (err) {
        if (err) throw err;
        console.log('Replaced!');
    })
}

export const getFollowed = () => {
    return JSON.parse(JSON.stringify(followedJSON))
}

export const follow = async (nameProduct) => {
    const followed = getFollowed()

    const ifExist = followed.find(x => x.name === nameProduct)
    if(ifExist){
        // DODAC  -   DISCORD MOWI ZE JEST JUZ W BAZIE
        console.log("JUZ JEST W BAZIE")
        return
    }

    const { dataOfProductFromWebsite, avergePrice } = await startFollow(nameProduct)
    const lastID = followed[followed.length - 1]?.id ?? 0
    
    followed.push({
        id: lastID + 1,
        name: nameProduct,
        avergePrice,
        listOfLinks: dataOfProductFromWebsite
    })
    for(let product of followed){
        product.listOfLinks.sort( (a,b) => {
            return a.price - b.price
        })
    }
    // const filtered = followed.filter(
    //     (product) =>  product.listOfLinks.price != -1
    // )

    const newFollowed = JSON.stringify(followed)
    overWriteFile('followed.json', newFollowed)
}

export const unfollow = (nameProduct) => {
    const followed = getFollowed()
    console.log(followed )
    const ifExist = followed.find(x => x === nameProduct)
    if(ifExist){
        // DODAC  -   DISCORD MOWI ZE NIE MA TAKIEGO PRODUKTU
        console.log("NIE MA TAKIEGO PRODUKTU")
        return
    }
    const filtered = JSON.stringify(followed.filter(x => x === nameProduct))
    overWriteFile('followed.json', filtered)
}
