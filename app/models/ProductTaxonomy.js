const dynamoose = require("./db");

const ProductTaxonomySchema = new dynamoose.Schema(
    {
        TaxonomyId: { type: String, hashKey: true },
        Name: { type: String, required: true },
        Description: String,
        ParentId: { type: String, index: { global: true, name: "ParentIndex" } },
        Type: { type: String, enum: ["category", "tag"], required: true }
    },
    { timestamps: true }
);

const ProductTaxonomy = dynamoose.model("ProductTaxonomyAttributes", ProductTaxonomySchema);
module.exports = ProductTaxonomy;
