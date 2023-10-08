const express = require("express");

const {
  addNewLinkMappingController,
  getAllLinkMappingsControler,
  deleteLinkMappingController,
} = require("./controllers/admin.controller");
const { resolveNewHitController } = require("./controllers/hit.controller");

const router = express.Router();

router.get("/", (req, res) => {
  getAllLinkMappingsControler(req, res);
});

router.get("/:key_url", (req, res) => {
  resolveNewHitController(req, res);
});

router.delete("/:key_url", (req, res) => {
  deleteLinkMappingController(req, res);
});

router.post("/", (req, res) => {
  addNewLinkMappingController(req, res);
});

module.exports = router;
