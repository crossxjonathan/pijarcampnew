const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const productSchema = mongoose.Schema({
    name:{
        required:[true,'Silahkan nama Produk'],
        type:String,
        unique:1,
        maxlength:250
    },
    images:{
        type:Array,
        default:[]
    },
    date:{
        type:Date,
        default: Date.now
    }
})

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model('Product',productSchema);
module.exports = {
    Product
}