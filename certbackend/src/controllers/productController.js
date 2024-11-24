const Product = require("../models/Product");

// Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products =
      req.user.role === "admin"
        ? await Product.find()
        : await Product.find({ seller: req.user._id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products", details: err.message });
  }
};

// Fetch a specific product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Ensure that non-admins only access their own products
    if (req.user.role !== "admin" && product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product", details: err.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "seller") {
    return res.status(403).json({ error: "Access denied" });
  }

  const { name, price, description, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      image,
      seller: req.user._id,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: "Failed to create product", details: err.message });
  }
};

// Update an existing product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Ensure only the admin or product's seller can update
    if (req.user.role !== "admin" && product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Access denied" });
    }

    Object.assign(product, req.body); // Update product fields
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: "Failed to update product", details: err.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Ensure only the admin or product's seller can delete
    if (req.user.role !== "admin" && product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Access denied" });
    }

    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product", details: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

