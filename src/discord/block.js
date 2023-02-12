import {blackList, checkExistBlackList, deleteBlackList} from "../mongoDB/server.js";

export const block = async(msg) => {
    let shop = msg.content.split("!block ")[1]
    if(!shop){
        msg.reply( "You want to block nothing?")
        return
    }
    if(await checkExistBlackList(shop, msg.author.id)){
        msg.reply("Exist in database")
        return
    }
    try{
        await blackList(msg.author.id, shop)
        msg.reply("Successful block : " + shop)
    }catch(err){
        console.log(err)
    }

}

export const unblock = async (msg) => {
    let unblockProduct = msg.content.split("!unblock ")[1]
    try{
        await deleteBlackList(msg.author.id, unblockProduct)
        msg.reply("Successful deleted from blacklist '" + unblockProduct + "'" )
    }catch(err){
        msg.channel.send("Error")
    }
}