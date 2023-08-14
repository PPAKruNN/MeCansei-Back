import { CreateProduct, DeleteProduct, ReadProductById, ReadProducts, UpdateProduct } from "../repositories/products.repository.js";

export async function getProducts (req, res) {
    try {
        const products = await ReadProducts();

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export async function getProductById(req, res) {
    
    const { id } = req.params;

    try {
        const product = await ReadProductById(id);

        if(product === null) return res.sendStatus(404);
        res.status(200).send(product);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
}

export async function postProduct(req, res) {
    const ownerid = res.locals.id;
    console.log(req.body)
    const { name, description, price, isAvailable, categoriesId, photosId } = req.body;

    try {
       
        const productId = await CreateProduct(name, description, price, isAvailable, ownerid, categoriesId, photosId);

        res.status(201).send(productId);
    } catch (error) {
        console.log(error);
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
        console.log(error);
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