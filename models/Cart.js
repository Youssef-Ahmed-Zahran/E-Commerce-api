const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // mongoose.Schema.Types.ObjectId
      required: true,
      // ref: "User",
    },
    products: [
      {
        productId: {
          type: String, // mongoose.Schema.Types.ObjectId
          // ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

// User Model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = {
  Cart,
};
