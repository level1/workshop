'use strict';

const mongoose = require('mongoose')
let schema = mongoose.Schema

let productSchema = new schema({
    name : string,
    type : string,
    text : string,
    country : object,
    price : Decimal128,
    createdate : Date
});

module.exports = db.module('product',productSchema);