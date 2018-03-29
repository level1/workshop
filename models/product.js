'use strict';

const mongoose = require('mongoose')
let schema = mongoose.Schema

let productSchema = new schema({
    name : String,
    type : String,
    text : String,
    country : String,
    price : Decimal128,
    createdate : Date
});

module.exports = db.module('product',productSchema);