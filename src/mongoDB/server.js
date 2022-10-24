import express from "express"
import mongoose from "mongoose"

const app = express();

const uri = 'mongodb+srv://admin:Admin123@products.txuh46a.mongodb.net/?retryWrites=true&w=majority'

const connect = async() => {
    try{
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("connected")
        // const db = mongoose.connection;
        // db.on("error", console.error.bind(console, "MongoDB connection error:"));
        const Schema = mongoose.Schema;

        const productSchema = new Schema({
            name: String,
            avergePrice: Number,
            listOfLinks: [{price: String, link: String}]
        });

        const Products = mongoose.model('products', productSchema);
        const product = new Products({
            name: "DUPA",
            avergePrice: 321321,
            listOfLinks: [{price: "DUPA", link: "DUPA"
            }]
        })
        const filter = {}
        Products.find({filter})
            .exec((err, product) => {
                if (err) return handleError(err);
                console.log("The author is %s", product[0]);
            });

    } catch(err){
    
        console.error(err)
    }

}

connect()

app.listen(8000, () => {
    console.log("Server started on port 8000")
})
