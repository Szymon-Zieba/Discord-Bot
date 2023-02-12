import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    id: String,
    products: [{
        name: String,
        avergePrice: String,
        listOfLinks: Array
    }],
    blackList: Array,
})
export const ModelUsers = mongoose.model("Users", Schema)