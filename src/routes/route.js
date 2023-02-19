const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");




// ==========================================================APIS=======================================================================================
router.post("/authors", authorController.createAuthor);
router.post("/login", authorController.login)




module.exports = router;