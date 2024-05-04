const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'must be provide']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        // enum: ['ikea', 'marcos', 'liddy', 'caressa']
        enum: {
            values: ['ikea', 'marcos', 'liddy', 'caressa'],
            message: '{value} is not supported'
        }
    }
})

const products = mongoose.model('products', productSchema);

module.exports = products;