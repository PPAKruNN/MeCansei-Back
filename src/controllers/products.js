import { ReadProductById, ReadProducts } from "../repositories/products.repository.js";

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

export async function putProduct(req, res) {

    const {name, description, price, isAvailable, ownerid, categoriesId, photosId} = req.body;
    const { id } = req.params;

    try {
        await UpdateProduct(id, name, description, price, isAvailable, ownerid, categoriesId, photosId);
        
        return res.sendStatus(204);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export  async function deleteProduct(req, res) {

    const { id } = req.params;

    try {
        await DeleteProduct(id);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
}