import mongoose, { Schema } from "mongoose"
import { Model, ModelBlackList } from "./schemas.js"
 //await mongoose.connect('mongodb://root:example@mongo:27017/')
await mongoose.connect('mongodb://root:example@localhost:27017/')

export const follow = async (wholeData) => {
    const product = new Model({
        name: wholeData.name,
        avergePrice: wholeData.avergePrice,
        listOfLinks: wholeData.listOfLinks,
    })
    await product.save()
}

export const unfollow = async (deleteProductName) => {
    Model.findOneAndDelete({name: deleteProductName }, function (err, docs) {
        if (err){
            console.log(err)
        }
    })
}

export const checkExistProduct = async (name, msg) => {
    if( await Model.findOne({name: name})){
        msg.reply("Exist in database")
        return true
    }
    return false
}

export const updatePrice = async (product) => {
    await Model.findOneAndUpdate({name: product.name},
        {listOfLinks: product.listOfLinks})
}

export const showAllFollowed = async () => {
    return Model.find();
}

export const blackList = async (name) => {
    const blacklistProduct = new ModelBlackList({name: name})
    await blacklistProduct.save()
    const followed = await showAllFollowed()

    /// SPRAWDZIC CZY TO DZIALA NA PEWNO
    for(const product of followed){
        const newProduct = product.listOfLinks.filter(links => links.link.includes(name))
        await updatePrice(newProduct)
    }
}

export const deleteBlackList = async (name) => {
    await ModelBlackList.findOneAndDelete({name: name},function (err, docs) {
        if (err){
            console.log(err)
        }
    })
}

export const checkExistBlackList = async (name, msg) => {
    if( await ModelBlackList.findOne({name: name})){
        msg.reply("Exist in database")
        return true
    }
    return false
}

// Model.findOneAndDelete({_id: '63693ff56874f502240c6722' }, function (err, docs) {
//     if (err){
//         console.log(err)
//     }
// })