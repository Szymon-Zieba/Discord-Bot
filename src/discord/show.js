import {shwowAllFollowed} from "../mongoDB/server.js"

export const showFollowed = async (msg) => {
    const cos = await shwowAllFollowed()
    let i = 1
    for(let el of cos){
        msg.channel.send(i + '. ' + el.name)
        i++
    }
}