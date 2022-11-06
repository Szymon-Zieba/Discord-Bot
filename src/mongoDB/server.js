import mongoose, { Schema } from "mongoose"
import { Model } from "./schemas.js"
await mongoose.connect('mongodb://root:example@mongo:27017/')

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

export const checkifExist = async (name, msg) => {

    if( await Model.findOne({name: name})){
        msg.reply("Exist in database")
        return true
    }
    return false
}


export const update = async (name, link, newPrice) => {
    const filter = { name: name, listOfLinks: link}
    const updateData = {$set: {"listOfLinks.$.price": newPrice}}
    await Model.findOneAndUpdate(filter, updateData, {
        new: true
    })
}

export const shwowAllFollowed = async () => {
    return Model.find();
}

