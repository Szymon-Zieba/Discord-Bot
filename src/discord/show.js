import {showAllFollowedByID} from "../mongoDB/server.js"

export const showFollowed = async (msg) => {
    try{
        let name = msg.content.split("!show")[1]
        const followed = await showAllFollowedByID(msg.author.id)
        if(name === ''){
            let i = 1
            for(let product of followed.products){
                msg.reply(i + '. ' + product.name)
                i++
            }
            return
        }
        name = name.slice(1)
        if(followed.products.some((el) => el.name === name)){
            const index = followed.products.findIndex((el) => el.name === name)
            let i = 1
            msg.reply("Link and prices for " + name)
            for(const el of followed.products[index].listOfLinks){
                msg.reply(
                    i + '. Price - ' + el.price + "\n" +
                    'Link - ' + el.link
                )
                i++
            }
        }
        else{
            msg.reply("No product in database.")
        }
    }catch(err){
        msg.reply("Error")
    }
}