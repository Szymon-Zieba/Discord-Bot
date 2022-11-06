import mongoose from "mongoose"
// Define a schema


const productsSchema = new mongoose.Schema({
    name: String,
    avergePrice: Number,
    listOfLinks: Array
})

export const Model = mongoose.model("Products", productsSchema)