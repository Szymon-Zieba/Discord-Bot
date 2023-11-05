import mongoose from "mongoose"
import {ModelUsers } from "./schemas.js"
// await mongoose.connect('mongodb://root:example@mongo:27017/')
await mongoose.connect('mongodb://root:example@localhost:27017/')

export const follow = async (authorID, wholeData) => {
    const isUser = await ModelUsers.exists({id: authorID})
    if(!isUser){
        const user = new ModelUsers({
            id: authorID,
            products: wholeData,
            blackList: [],
        })
        await user.save()
    }
    else{
        await ModelUsers.updateOne({id: authorID},{
            $push: {products: wholeData}
        })
    }
}

export const unfollow = async (authorID, name) => {
    await ModelUsers.updateOne({id: authorID},
        {$pull: {
            products: {name: name}
        }},
        { safe: true, multi:true }
    )
}

export const checkExistProduct = async (msg, name) => {
    const authorId = msg.author.id
    const userInfo = await ModelUsers.findOne({id: authorId})
    if(!userInfo || userInfo.products.length === 0) return false
    const {products} = userInfo
    if(products.some( e => e.name === name)){
        msg.reply("Exist in database")
        return true
    }
    return false
}
export const updatePrice = async (authorID, product) => {
    await ModelUsers.findOneAndUpdate({"id": authorID, "products.name": product.name},
        {
            $set: {
                'products.$.listOfLinks': product.listOfLinks
            }
        }
    )
}
export const showAllFollowed = async () => {
    return ModelUsers.find();
}

export const showAllFollowedByID = async (authorID) => {
    return ModelUsers.findOne({id: authorID});
}
export const updateBlockerPrice = async (authorID, product) => {
    await ModelUsers.findOneAndUpdate({id: authorID, "products.name": product.name},
        {$set: {
                'products.$.listOfLinks': product.listOfLinks,
                'products.$.name': product.name,
            }},
        { safe: true, multi:true }
    )
}
export const blackList = async (authorID, name) => {
    await ModelUsers.updateOne({id: authorID},{
        $addToSet: {blackList: name}
    }, (err, ob) => {}).clone()

    const followed = await showAllFollowedByID(authorID)
    for(const product of followed.products){
        const newProduct = {
            name: product.name,
            listOfLinks: product.listOfLinks.filter(links => !links.link.includes(name.replace(/ /g, '') + "."))
        }
        await updateBlockerPrice(authorID, newProduct)
    }
}
export const showAllBlocked = async (authorID) => {
    const userInfo = await ModelUsers.findOne({id: authorID})
    if(!userInfo) return []
    const {blackList} = userInfo
    return blackList
}
export const deleteBlackList = async (authorID, name) => {
    await ModelUsers.updateOne({id: authorID},
        {$pull: {
                blackList: name
            }},
        { safe: true, multi:true }
    )
}
export const checkExistBlackList = async (name, authorID) => {
    const userDate = await ModelUsers.findOne({id: authorID})
    const {blackList} = userDate
    return blackList.includes(name)
}