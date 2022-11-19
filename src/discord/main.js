
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

    if(msg.content.startsWith("!commands")) {
        await commands(msg)
    }
    if(msg.content.startsWith("!track")) {
        await track(msg)
    }
    if(msg.content.startsWith("!delete")) {
        await unFollowProduct(msg)
    }
    if(msg.content.startsWith("!show")) {
        await showFollowed(msg)
    }
    if(msg.content.startsWith("!block")) {
        await block(msg)
    }
    if(msg.content.startsWith("!unblock")) {
       await unblock(msg)
    }
})

client.login(token)
