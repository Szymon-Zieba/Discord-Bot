import dotenv from 'dotenv'
import pkg, { GatewayIntentBits } from 'discord.js';
import {track} from "./track.js"
import { unFollowProduct} from "./delete.js";
import { showFollowed } from "./show.js"
const { Client } = pkg;
dotenv.config()
const token = process.env.TOKEN

const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
]})

client.on('messageCreate', async (msg) => {
  if(msg.author.bot) return
  if(msg.content.startsWith("!track")) {
    await track(msg)
  }
  if(msg.content.startsWith("!delete")) {
    await unFollowProduct(msg)
  }
  if(msg.content.startsWith("!show")){
    await showFollowed(msg)
  }
})
console.log(token)
client.login("OTU2MzI1NzUxNzE0NjE5NDQy.GuzXeJ.zoxbdqu53coLRyY5xqRO5o1pVgRweNJJ1H9L0Q")

