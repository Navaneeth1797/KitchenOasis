import mongoose from "mongoose";
import dbProducts from "./data.js";
import Products from "../models/products.js";

let handleProducts = async () => {
    try {
        await mongoose.connect(
              "mongodb://rnavaneethk1797:navaneeth@ac-o42eblf-shard-00-00.dnthuz8.mongodb.net:27017,ac-o42eblf-shard-00-01.dnthuz8.mongodb.net:27017,ac-o42eblf-shard-00-02.dnthuz8.mongodb.net:27017/?ssl=true&replicaSet=atlas-c7wkf5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=oasis"
            // "mongodb://localhost:27017/kitchen-oasis"
        );
        await Products.deleteMany()
        console.log("products are deleted");
        await Products.insertMany(dbProducts)
        console.log("products are inserted")
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

handleProducts()