const Product = require("./models/Product");

exports.lambda_handler = async (event) => {
    console.log("Event received:", JSON.stringify(event, null, 2));

    const { fieldName, arguments } = event;

    try {
        switch (fieldName) {
            case "getProduct":
                return await Product.get(arguments.ProductId);

            case "listProductsByCategory":
                return await Product.scan("Category").eq(arguments.Category).exec();

            case "createProduct":
                const newProduct = new Product({
                    ProductId: require("uuid").v4(),
                    Name: arguments.Name,
                    Description: arguments.Description,
                    Price: arguments.Price,
                    Category: arguments.Category,
                    Stock: arguments.Stock
                });
                await newProduct.save();
                return newProduct;

            case "updateProduct":
                return await Product.update(
                    { ProductId: arguments.ProductId },
                    {
                        Name: arguments.Name,
                        Description: arguments.Description,
                        Price: arguments.Price,
                        Category: arguments.Category,
                        Stock: arguments.Stock
                    }
                );

            case "deleteProduct":
                await Product.delete(arguments.ProductId);
                return `Product ${arguments.ProductId} deleted successfully`;

            default:
                throw new Error(`Unknown fieldName: ${fieldName}`);
        }
    } catch (error) {
        console.error("Error:", error);
        throw new Error(error.message);
    }
};
