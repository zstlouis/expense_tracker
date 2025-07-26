const mongoose = require('mongoose')

const Schema = mongoose.Schema

// categories => field => ['type', 'color']
const categories_model = new Schema({
    type: {type:String, default: "Investment"},
    color: {type:String, default: '#FCBE44'}
})

//transactions => field => ['name', 'type', 'amount', 'date']
const Transaction_model = new Schema({
    name: {type:String, default: "Anonymouse"},
    type: {type:String, default: "Investment"},
    amount:{type:Number},
    date:{type:Date, default: Date.now}
})

const Categories = mongoose.model('categories', categories_model)
const Transaction = mongoose.model('transaction', Transaction_model)

exports.default = Transaction
module.exports = {
    Categories, 
    Transaction
}