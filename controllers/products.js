const mongoose = require("mongoose");
const express = require("express");
const Products = require("../models/product");

const getAllProducts = async (req, res) => {
  const getProducts = await Products.find({});
  res.status(200).json({ numberOfProducts: getProducts.length, getProducts });
};

const getProduct = async (req, res) => {
  // console.log(req.query);
  const { company, name, featured, sort, fields, page, limit, numericFilter } =
    req.query;
  const queryObj = {};
  if (featured) {
    queryObj.featured = featured === "true";
  }
  if (company) {
    queryObj.company = { $regex: company, $options: "i" };
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  // price and ratings sorting...
  if (numericFilter) {
    const arr = req.query.numericFilter.split(",");
    console.log(arr);
    const numericFil = {
      "<=": "$lte",
      ">=": "$gte",
      ">": "$gt",
      "<": "$lt",
      "=": "$eq",
    };
    const numfilter = ["price", "rating"];
    arr.forEach((ele) => {
      for (const op in numericFil) {
        if (ele.indexOf(op) > -1) {
          let operation = ele.split(op);
          let field = operation[0];
          let value = operation[1];
          let operator = numericFil[op];
          if (numfilter.includes(field)) {
            queryObj[field] = { [operator]: value };
          }
          break;
        }
      }
    });
  }

  const result = Products.find(queryObj);

  //sorting
  if (sort) {
    result.sort(sort.split(",").join(" "));
  }
  // fields
  if (fields) {
    result.select(fields.split(",").join(" "));
  }
  //pages and limit
  const pages = parseInt(page) || 1;
  const pagelimit = parseInt(limit) || 10;
  const skip = (pages - 1) * pagelimit;
  result.skip(skip).limit(pagelimit);

  const products = await result;
  res
    .status(200)
    .json({ numberOfProducts: products.length, page: pages, products });
};

module.exports = {
  getAllProducts,
  getProduct,
};
