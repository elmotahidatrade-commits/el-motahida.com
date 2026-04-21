const Product = require('../models/Product');

// @desc    Fetch all products with pagination and filters
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword
      ? {
          $or: [
            { 'title.en': { $regex: req.query.keyword, $options: 'i' } },
            { 'title.ar': { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    const categoryFilter = req.query.category ? { category: req.query.category } : {};

    const count = await Product.countDocuments({ ...keyword, ...categoryFilter, isActive: true });
    const products = await Product.find({ ...keyword, ...categoryFilter, isActive: true })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true });
    if (product) {
      product.views += 1;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      Object.assign(product, req.body);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
