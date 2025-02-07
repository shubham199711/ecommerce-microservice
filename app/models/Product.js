const dynamoose = require("./db");

const ProductSchema = new dynamoose.Schema(
    {
        ProductId: { type: String, hashKey: true },
        Name: { type: String, required: true },
        Description: String,
        Price: { type: Number, required: true },
        Category: { type: String, required: true, index: { global: true, name: "CategoryIndex" } },
        Stock: { type: Number, required: true }
    },
    { timestamps: true }
);

const Product = dynamoose.model("Products", ProductSchema);
module.exports = Product;
