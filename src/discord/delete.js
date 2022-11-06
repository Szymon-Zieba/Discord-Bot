import { unfollow } from "../mongoDB/server.js"

export const unFollowProduct = async (msg) => {
    let deletedProduct = msg.content.split("!delete")[1]
    await unfollow(deletedProduct)
    msg.reply("Sucesfull deleted product '" + deletedProduct + '"' )
}