const model = require('../models/model')

// post request to create a new category 
async function create_Categories(req, res) {
    const {type, color} = req.body
    const create = new model.Categories({
        type, color
    })

    await create.save()
    res.json(create)
}


// get request
async function get_Categories(req, res) {
    let data = await model.Categories.find({})

    return res.json(data)
}

// create transaction
async function create_Transaction(req, res) {
    if (!req.body) return res.status(400).json("POST HTTP Data not Provided")
    const { name, type, amount } = req.body;

    const create = new model.Transaction(
        {
            name: name,
            type: type,
            amount: amount,
            data: new Date()
        }
    )

    await create.save()
    res.json(create)
}

//get transaction
async function get_Transaction(req, res) {
    let data = await model.Transaction.find({})

    return res.json(data)
}


// delete transaction
async function delete_Transaction(req, res) {
    if (!req.body) res.status(400).json({ message: "Request body not Found" })
    await model.Transaction.deleteOne(req.body)
    
    return res.json('Record Deleted')

}


//get labels (join)
async function get_Labels(req,res) {
    model.Transaction.aggregate([
        {
            $lookup : {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result=>{
        let data = result.map(v=> Object.assign({},{_id:v._id, name: v.name, type:v.type, amount:v.amount, color:v.categories_info.color}))
        res.json(data)
    }).catch(error=>{
        res.status(400).json("Lookup Collection Error")
    })
}

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}