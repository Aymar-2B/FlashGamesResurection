const express = require("express");
const { getAll, getById, post, put, drop } = require("../controllers/GameController");
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", post);
router.put("/:id", put);
router.delete("/:id", drop);

module.exports = router;
