const express = require("express");
const router = express.Router();
const shortid = require('shortid');

const db = require('../db');

const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/:id/delete", controller.delete)

router.get("/:id/view", controller.view)


router.get("/create", controller.create)

router.post("/create", validate.postCreate, controller.postCreate);

router.get("/:id/update", controller.update);

router.post("/update", controller.postUpdate);

module.exports = router;