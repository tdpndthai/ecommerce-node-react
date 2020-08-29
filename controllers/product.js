const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { result } = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined; //bỏ qua xem photo của product
  return res.json(req.product);
};

exports.remove = (req, res) => {
  //console.log("product: ", req);
  let product = req.product;
  product.remove((err, deleteProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      deleteProduct,
      messaage: "product delete successfully",
    });
  });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "image could not be upload",
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;
    console.log(fields);

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "all fields are required",
      });
    }

    let product = new Product(fields);

    // 1kb = 1000
    //1mb = 1 000 000

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          err: "image should be less than 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json({ result });
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "image could not be upload",
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;
    console.log(fields);

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "all fields are required",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    // 1kb = 1000
    //1mb = 1 000 000

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          err: "image should be less than 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json({ result });
    });
  });
};
