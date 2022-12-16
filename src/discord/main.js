
import pkg, { GatewayIntentBits } from 'discord.js';
const { Client } = pkg;

import {track} from "./track.js"
import { unFollowProduct} from "./delete.js";
import { showFollowed } from "./show.js"
import { token, userID, serverID } from "../config.js"
import {commands} from "./commands.js";
import {block, unblock} from "./block.js";

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
]})

export const lowerPrice = async(link, price) => {
    try{
        await client.channels.cache.get(serverID).send(
            `<@${userID}> \n` +
            "Price is lower \n" +
            "Price: " + price + "\n" +
            "Link: " + link + "\n"
        )
    }
    catch(err){
        console.log(err)
    }
}

client.on('messageCreate', async (msg) => {
    if(msg.author.bot) return

    const content = msg.content
    switch(true){
        case content.startsWith("!commands"):
            await commands(msg)
            break

        case content.startsWith("!track "):
            await track(msg)
            break

        case content.startsWith("!delete "):
            await unFollowProduct(msg)
            break

        case content.startsWith("!show"):
            await showFollowed(msg)
            break

        case content.startsWith("!block "):
            await block(msg)
            break

        case content.startsWith("!unblock "):
            await unblock(msg)
            break

        default:
            console.log("none")
    }
})

client.login(token)
