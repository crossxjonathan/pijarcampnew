const { body } = require("express-validator");
const { ApiError } = require("../middleware/ApiError");
const { Product } = require("../models/product");
const httpStatus = require("http-status");
const { default: mongoose } = require("mongoose");

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dsvbvrtxn',
  api_key: '866685442232273',
  api_secret:`${process.env.CN_API_SECRET}`
})

const addProduct = async (body) => {
  try {
    const product = new Product({
      ...body,
    });
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (_id) => {
  try {
    const product = await Product.findById(_id);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    return product;
  } catch (error) {
    throw error;
  }
};

const updateProductById = async (_id, body) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    return product;
  } catch (error) {
    throw error;
  }
};

const deleteProductById = async (_id) => {
  try {
    const product = await Product.findByIdAndDelete(_id);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    return product;
  } catch (error) {
    throw error;
  }
};

const allProducts = async (req) => {
  try {
    const products = await Product.find({}).limit(parseInt(req.query.limit));

    return products;
  } catch (error) {
    throw error;
  }
};

const paginateProducts = async (req) => {
  try {
    let aggQueryArray = [];

    if (req.body.keywords && req.body.keywords !== "") {
      const re = new RegExp(`${req.body.keywords}`, "gi");
      aggQueryArray.push({
        $match: { name: { $regex: re } },
      });
    }

    // "keywords":"ayam",
    // "page":1,
    // "name":["6597b5102049cc4490a72704"]

    //// ADD POPULATE
    aggQueryArray.push(
        {
          $lookup: {
            from: "product", // Update this to the actual collection name
            localField: "name",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$name" } // Assuming you want to unwind the array created by $lookup
      );      
      /////////

      // console.log(aggQueryArray);

    let aggQuery = Product.aggregate(aggQueryArray);
    // console.log(aggQuery,'goooooooooooooooooooooooooooooooooo')
    const options = {
      page: req.body.page,
      limit: 8,
      sort:{ date: 'desc' }
    };
    const products = await Product.aggregatePaginate(aggQuery, options);
    // console.log(products,'productssssssssssssssssssssssssssssssssssssss')
    return products;
  } catch (error) {
    throw error;
  }
};

const picUpload = async(req) => {
  try{
    const upload = await cloudinary.uploader.upload(req.files.file.path,{
      public_id:`${Date.now()}`,
      folder:'bakul_medan_upload'
    });

    // console.log(upload)

    return {
      public_id: upload.public_id,
      url: upload.url
    }

  } catch(error){
    throw error
  }
}

module.exports = {
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  allProducts,
  paginateProducts,
  picUpload
};
