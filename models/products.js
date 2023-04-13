const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: String },
});

const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
