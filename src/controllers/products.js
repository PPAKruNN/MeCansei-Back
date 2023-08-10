import { ReadProductById, ReadProducts } from "../repositories/products.repository";

export async function getProducts (req, res) {
    try {
        const products = await ReadProducts();

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export async function getProductById(req, res) {
    try {
        const product = await ReadProductById(id);

        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function postProduct(req, res) {
    try {
        const { name, description, price, isAvailable, ownerid, categoriesId, photosId } = req.body;
       
        const productId = await CreateProduct(name, description, price, isAvailable, ownerid, categoriesId, photosId);

        res.status(201).send(productId);
    } catch (error) {
        res.status(500).send(error.message);
    }
}