import { startFollow, getDateForChooseProduct } from "../puppeteer/startFollow.js";
import { follow, checkExistProduct } from "../mongoDB/server.js";

export const track = async (msg) => {
    let product = msg.content.split("!track")[1]
    if( await checkExistProduct(product, msg)){
      return
    }
    if(!product){
      msg.reply( "You want to track nothing?")
      return
    }
    msg.reply( "Searching for - '" + product + "'")
    const dateToChooseProduct = await getDateForChooseProduct(product)
    const dateFromWebsite = replyDateToChooseProduct(dateToChooseProduct)
    if(!dateFromWebsite){
      msg.reply("I don't see product like this in google")
      return
    }
    msg.reply(dateFromWebsite)
    const filter = m => m.author.id === msg.author.id && m.content >= 0 && m.content <= 7 
    const data =  await msg.channel.awaitMessages({filter, max: 1, time: 100000, errors: ['time', 'maxMatches']})
    msg.reply("Wait we are searching for best price...")
    const index = data.first().content
    const { dataOfProductFromWebsite, avergePrice } = await startFollow(dateToChooseProduct[index - 1])
    if(!dataOfProductFromWebsite[0] ){
        msg.channel.send(
            "No product"
        )
        return
    }
    msg.channel.send(
      "Succes the smallest price of " + product + " is: " + dataOfProductFromWebsite[0].price + "\n" +
      "Link: " + dataOfProductFromWebsite[0].link + "\n" +
      "If the price will be smaller we will let you know!!"
    )

    const wholeData = {
      name: product,
      avergePrice: avergePrice,
      listOfLinks: dataOfProductFromWebsite
    }

    await follow(wholeData, msg)
}

const replyDateToChooseProduct = (dateToChooseProduct) => {
    if(!dateToChooseProduct){
      return null
    }
    let string = ''
    let index = 1
    for(const el of dateToChooseProduct){
      string += index++ +'. '+ el.text  + '\n'
    }
    return string
  }