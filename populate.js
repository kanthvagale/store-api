const mongoose = require('mongoose');
const Products = require('./models/product');
require('dotenv').config();
const connectMongoDB = require('./db/connect');
const jsonProducts = require('./products.json');


const start = async () => {
    try {
        await connectMongoDB(process.env.MONGO_URI);
        const product = await Products.deleteMany({});
        await Products.create(jsonProducts);
        console.log(product);
        process.exit(0);
    } catch (error) {
        console.log(error)
    }
}

start();
