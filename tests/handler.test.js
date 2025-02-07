const { handler } = require("../app/handler");
const Product = require("../app/models/Product");

jest.mock("../app/models/Product");

describe("Lambda Handler Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getProduct should return product details", async () => {
        const mockProduct = { ProductId: "123", Name: "Test Product" };
        Product.get.mockResolvedValue(mockProduct);

        const event = { fieldName: "getProduct", arguments: { ProductId: "123" } };
        const result = await handler(event);

        expect(result).toEqual(mockProduct);
        expect(Product.get).toHaveBeenCalledWith("123");
    });

    test("listProductsByCategory should return products of a category", async () => {
        const mockProducts = [
            { ProductId: "1", Name: "Product A", Category: "Electronics" },
            { ProductId: "2", Name: "Product B", Category: "Electronics" }
        ];
        Product.scan.mockReturnValue({
            eq: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue(mockProducts)
        });

        const event = { fieldName: "listProductsByCategory", arguments: { Category: "Electronics" } };
        const result = await handler(event);

        expect(result).toEqual(mockProducts);
        expect(Product.scan).toHaveBeenCalledWith("Category");
    });

    test("createProduct should create and return a product", async () => {
        const mockProduct = {
            ProductId: "uuid-123",
            Name: "New Product",
            Description: "Awesome product",
            Price: 100,
            Category: "Gadgets",
            Stock: 10
        };

        jest.spyOn(require("uuid"), "v4").mockReturnValue("uuid-123");
        Product.prototype.save = jest.fn().mockResolvedValue(mockProduct);

        const event = {
            fieldName: "createProduct",
            arguments: {
                Name: "New Product",
                Description: "Awesome product",
                Price: 100,
                Category: "Gadgets",
                Stock: 10
            }
        };

        const result = await handler(event);

        expect(result).toEqual(mockProduct);
        expect(Product.prototype.save).toHaveBeenCalled();
    });

    test("updateProduct should update product details", async () => {
        const updatedProduct = {
            ProductId: "123",
            Name: "Updated Product",
            Description: "Updated",
            Price: 150,
            Category: "Gadgets",
            Stock: 5
        };

        Product.update.mockResolvedValue(updatedProduct);

        const event = {
            fieldName: "updateProduct",
            arguments: {
                ProductId: "123",
                Name: "Updated Product",
                Description: "Updated",
                Price: 150,
                Category: "Gadgets",
                Stock: 5
            }
        };

        const result = await handler(event);

        expect(result).toEqual(updatedProduct);
        expect(Product.update).toHaveBeenCalledWith(
            { ProductId: "123" },
            {
                Name: "Updated Product",
                Description: "Updated",
                Price: 150,
                Category: "Gadgets",
                Stock: 5
            }
        );
    });

    test("deleteProduct should delete a product", async () => {
        Product.delete.mockResolvedValue();

        const event = { fieldName: "deleteProduct", arguments: { ProductId: "123" } };
        const result = await handler(event);

        expect(result).toBe("Product 123 deleted successfully");
        expect(Product.delete).toHaveBeenCalledWith("123");
    });

    test("Unknown fieldName should throw an error", async () => {
        const event = { fieldName: "invalidOperation", arguments: {} };

        await expect(handler(event)).rejects.toThrow("Unknown fieldName: invalidOperation");
    });
});
