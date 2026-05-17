import Product from '../models/Product.js'

export const  getAllProducts = async (req, res) =>{
    const {name, category, seller, sort} = req.query;
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (pageNumber - 1) * limit;
    const filter = {};
    let sortOption = { createdAt: -1 };
    if(sort === "price_asc") sortOption = { price: 1 }
    if(sort === "price_desc") sortOption = { price: -1 }
    if(name) filter.name = { $regex:name, $options: "i" }
    if(category) filter.category = category
    if(seller) filter.seller = seller
    try{
        const products = await Product.find(filter)
        .populate("seller", "name")
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
        const  total = await Product.countDocuments(filter);
        if(!products || products.length === 0){
            return res.json({
                success: false,
                message: "Products are not Available"
            })
        }
        res.json({
            success: true,
            message: "Product Fetched Successfully",
            data: products,
            pagination: {
                total,
                pageNumber,
                totalPages: Math.ceil(total  / limit)
            }
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
        if(!product){
            return res.json({
                success: true,
                message: "Products are not Available"
            })
        }
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
export const addProduct = async (req, res) => {
    const newProduct = req.body;
    try{
        const product = await Product.create(newProduct);
        res.json({
            success: true,
            message: "Product Added Successfully",
            data: product
        });
    }
    catch(err){
        console.error("Adding Product Failed");
        res.json({
            success: false,
            message: "Product Add Failed"
        });
    }
};
export  const updateProduct = async (req, res) => {
    const newProduct = req.body;
    const productId = req.params.id;
    try{
        const product = await Product.findByIdAndUpdate(productId, newProduct, {new: true});
        res.json({
            success: true,
            message: "Product updated Successfully",
            data: product
        });
    }
    catch(err){
        console.error("Updating Product Failed");
        res.json({
            success: false,
            message: "Product Update Failed"
        })
    }
};
export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try{
        const product = await Product.findByIdAndDelete(productId);
        res.json({
            success: true,
            message: "Product Deleted Successfully",
            data: product
        });
    }
    catch(err){
        console.error("Deleting Product Failed");
        res.json({
            success: false,
            message: "Product Delete Failed"
        });
    }
};