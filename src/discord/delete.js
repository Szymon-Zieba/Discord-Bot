import { unfollow } from "../mongoDB/server.js"

export const unFollowProduct = async (msg) => {
    let deletedProduct = msg.content.split("!delete ")[1]
    try{
        await unfollow(msg.author.id, deletedProduct)
        msg.reply("Sucesfull deleted product '" + deletedProduct + '"' )
    }catch(err){
        msg.reply("Error")
    }
}