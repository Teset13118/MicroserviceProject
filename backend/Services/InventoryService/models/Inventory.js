const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity_in_stock: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    enum: ["in_stock", "low_stock", "out_of_stock"],
    default: "out_of_stock"
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
});


// InventorySchema.pre('remove', async function(next) {
//   try {
//     // เมื่อ product ถูกลบ ให้ลบข้อมูลใน Inventory ที่เกี่ยวข้อง
//     await mongoose.model('Inventory').deleteMany({ product: this._id });
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = mongoose.model("Inventory", InventorySchema);