import {blackList, checkExistBlackList, deleteBlackList} from "../mongoDB/server.js";

export const block = async(msg) => {
    let shop = msg.content.split("!block")[1]
    if(!shop){
        msg.reply( "You want to block nothing?")
        return
    }
    if(await checkExistBlackList(shop, msg)){
        return
    }

    await blackList(shop)
    msg.reply("Successful block : " + shop)
}

export const unblock = async (msg) => {
    let unblockProduct = msg.content.split("!unblock")[1]
    await deleteBlackList(unblockProduct)
    msg.reply("Successful deleted from blacklist '" + unblockProduct + "'" )
}