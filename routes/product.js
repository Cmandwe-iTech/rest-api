const express = require("express");
const product_router = express.Router();
const bodyparser = require("body-parser");
const { body, validationResult } = require("express-validator");
const ProductModel = require("../models/products");
product_router.use(bodyparser.json());

product_router.get("/products", async (req, res) => {
  try {
    const productdata = await ProductModel.find();
    res.status(200).json({
      status: "success",
      productdata,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

product_router.get("/products/:id", async (req, res) => {
  try {
    const productById = await ProductModel.find({ id: req.params.id });
    if (productById.length) {
      res.status(200).json({
        status: "success",
        productById,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "product not found with this id",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

product_router.post(
  "/products",
  body("name").isAlpha(),
  body("price").isNumeric(),
  async (req, res) => {
    const { name, description, price, category } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      } else {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        const length = await ProductModel.find();
        const uniqueid = timestamp + random + length.length;
        const productdata = await ProductModel.create({
          id: uniqueid,
          name: name,
          description: description,
          price: price,
          category: category,
        });
        res.status(201).json({
          status: "created successfully",
          productdata,
        });
      }
    } catch (e) {
      res.status(400).json({
        status: "failed",
        message: e.message,
      });
    }
  }
);
product_router.put("/products/:id", async (req, res) => {
  try {
    const productById = await ProductModel.findOne({ id: req.params.id });
    if (productById) {
      await ProductModel.updateOne({ id: req.params.id }, req.body);
      res.status(204).json({
        status: "successfully updated",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "invalid id",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});
product_router.delete("/products/:id", async (req, res) => {
  try {
    const productById = await ProductModel.findOne({ id: req.params.id });
    if (productById) {
      await ProductModel.deleteOne({ id: req.params.id });
      res.status(204).json({
        status: "deleted successfully",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "invalid id",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});
module.exports = product_router;
