const Product = require('../models/Product.model')

 const findAll = async(req, res) =>{
  try {
    const product = await Product.find({})
        res.status(200).json({"message": product});
    }catch(error){
        res.status(400).json({"message": error});
    }
}
const findOne = async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json({"message": product})
    }catch(error) {
        res.status(400).json({"message": error});
    }
}

const create = async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json({"message": product});
    }catch(error){
        res.status(400).json({"message": error});
    }
}

const update =  async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        console.log(product, "put route");
        
        if(!product){
            return res.status(401).json({"message": "Not found"});
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json({updateProduct});


    }catch(error){
        res.status(400).json({"message": error})
    }
}

const remove = async(req, res) => {
    try {
        const {id} = req.params;
        const delelteProduct = await Product.findByIdAndDelete(id)

        if (!delelteProduct) {
            return res.status(404).json({message: "Not found"})
        }
        res.status(200).json({"message": "Product Delete with successFully"});
    } catch (error) {
        res.status(400).json({"message": error})
    }
}

module.exports = {
    findAll, 
    findOne, 
    create, 
    update, 
    remove
}

