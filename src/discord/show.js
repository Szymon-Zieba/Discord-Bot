import {showAllFollowed} from "../mongoDB/server.js"

export const showFollowed = async (msg) => {
    const followed = await showAllFollowed()
    let i = 1
    for(let product of followed){
        msg.channel.send(i + '. ' + product.name)
        i++
    }
}