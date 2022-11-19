import {blackList, checkExistBlackList, deleteBlackList} from "../mongoDB/server.js";

export const block = async(msg) => {
    let shop = msg.content.split("!block")[1]
    if( await checkExistBlackList(shop, msg)){
        return
    }
    if(!shop){
        msg.reply( "You want to block nothing?")
        return
    }
    await blackList(shop)
}

export const unblock = async (msg) => {
    let unblockProduct = msg.content.split("!unblock")[1]
    await deleteBlackList
    msg.reply("Sucesfull deleted blacklist shop '" + unblockProduct + "'" )
}