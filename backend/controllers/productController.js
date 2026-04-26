import Product from '../models/Product.js'

export const  getAllProducts = async (req, res) =>{
    const {name, category, seller} = req.query;
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (pageNumber - 1) * limit;
    const filter = {};
    if(name) filter.name = name;
    if(category) filter.category = category;
    if(seller) filter.seller = seller;
    try{
        const products = await Product.find(filter)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        res.json({
            success: true,
            message: "Product Fetched Successfully",
            data: products
        });
    }
    catch(err){
        console.error("Error fetching Products");
        res.json({
            success: false,
            message: "Product Fetch Failed"
        });
    }
};
export const  getAProduct = async (req, res) =>{
    const productId = req.params.id;
    try{
        const product = await Product.findById(productId);
        res.json({
            success: true,
            message: "Product Fetched Successfully",
            data: product
        });
    }
    catch(err){
        console.error("Error fetching Products");
        res.json({
            success: false,
            message: "Product Fetch Failed"
        });
    }
};