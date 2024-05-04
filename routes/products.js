const express = require("express");
const router = express.Router();

const { getProduct, getAllProducts } = require("../controllers/products");

router.route("/getall").get(getAllProducts);
router.route("/").get(getProduct);

module.exports = router;
