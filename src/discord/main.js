
import pkg, { GatewayIntentBits } from 'discord.js';
const { Client } = pkg;

import {track} from "./track.js"
import { unFollowProduct} from "./delete.js";
import { showFollowed } from "./show.js"
import { token, serverID } from "../config.js"
import {commands} from "./commands.js";
import {block, unblock} from "./block.js";

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
]})

export const lowerPrice = async(link, price, authorID) => {
    try{
        await client.channels.cache.get(serverID).send(
            `<@${authorID}>` +  '\n' +
            "Price is lower \n" +
            "Price: " + price + "\n" +
            "Link: " + link + "\n"
        )
    }
    catch(err){
        console.log(err)
    }
}

let idInUse = []

client.on('messageCreate', async (msg) => {
    if(msg.author.bot) return
    const content = msg.content
    if(content.startsWith("!") && idInUse.includes(msg.author.id)){
        await msg.reply("Nie można używać więcej niż jednej komendy w tym samym momencie!!!")
        return
    }
    switch(true){
        case content.startsWith("!commands"):
            idInUse.push(msg.author.id)
            commands(msg)
            break

        case content.startsWith("!track "):
            idInUse.push(msg.author.id)
            await track(msg)
            break

        case content.startsWith("!delete "):
            idInUse.push(msg.author.id)
            await unFollowProduct(msg)
            break

        case content.startsWith("!show"):
            idInUse.push(msg.author.id)
            await showFollowed(msg)
            break

        case content.startsWith("!block "):
            idInUse.push(msg.author.id)
            await block(msg)
            break

        case content.startsWith("!unblock "):
            idInUse.push(msg.author.id)
            await unblock(msg)
            break

        case content.startsWith("!id"):
            await msg.reply(msg.author.id)
            break

        default:
    }
    idInUse = idInUse.filter(e => e != msg.author.id)
})

client.login(token)



