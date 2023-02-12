import { startFollow, getDateForChooseProduct } from "../puppeteer/startFollow.js";
import { follow, checkExistProduct } from "../mongoDB/server.js";

export const track = async (msg) => {
    let product = msg.content.split("!track ")[1]
    if(await checkExistProduct(msg, product)){
      return
    }
    console.log("New track")
    if(!product){
      msg.reply( "You want to track nothing?")
      return
    }
    msg.reply( "Searching for - '" + product + "'")
    const dateToChooseProduct = await getDateForChooseProduct(product)
    const {dateFromWebsite, lastNumber} = replyDateToChooseProduct(dateToChooseProduct)
    if(!dateFromWebsite){
      msg.reply("I don't see product like this in google")
      return
    }
    msg.reply(dateFromWebsite)
    const filter = m => m.author.id === msg.author.id && m.content > 0 && m.content <= lastNumber
    const data =  await msg.channel.awaitMessages({filter, max: 1, time: 120 * 1000, errors: ['time', 'maxMatches']})
    const index = parseInt(data.first().content)
    if(index === lastNumber){
        msg.reply("You Stopped searching..")
        return
    }
    msg.reply("Wait we are searching for best price...")
    const { dataOfProductFromWebsite, avergePrice} = await startFollow(dateToChooseProduct[index - 1], msg.author.id)
    if(!dataOfProductFromWebsite[0] ){
        msg.reply(
            "No product"
        )
        return
    }
    msg.reply(
      "Succes the smallest price of " + product + " is: " + dataOfProductFromWebsite[0].price + "\n" +
      "Link: " + dataOfProductFromWebsite[0].link + "\n" +
      "If the price will be smaller we will let you know!!"
    )

    const wholeData = {
      name: product,
      avergePrice: avergePrice,
      listOfLinks: dataOfProductFromWebsite
    }

    await follow(msg.author.id, wholeData)
}

const replyDateToChooseProduct = (dateToChooseProduct) => {
    if(!dateToChooseProduct){
      return null
    }
    let dateFromWebsite = ''
    let lastNumber = 1
    for(const el of dateToChooseProduct){
        dateFromWebsite += lastNumber++ +'. '+ el.text  + " - more than:" + el.quantity + '\n'
    }
    dateFromWebsite += lastNumber + '. Exit searching'
    return {dateFromWebsite, lastNumber}
  }