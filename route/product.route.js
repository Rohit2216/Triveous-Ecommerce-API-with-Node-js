const express = require("express");
const productRouter = express.Router();
const { Product } = require("../models/product"); // Import the Product model

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific product by ID
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a product by ID
productRouter.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a product by ID
productRouter.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
