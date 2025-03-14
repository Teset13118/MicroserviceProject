const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getAllInventory);
router.get("/:id", inventoryController.getInventoryById);

router.post("/create", inventoryController.addInventory);
router.put('/clear/:productId', inventoryController.clearInventory);

router.delete("/:id", inventoryController.deleteInventory);


module.exports = router;
