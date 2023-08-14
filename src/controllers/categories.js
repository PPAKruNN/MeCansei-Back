import { ReadCategories, CreateCategory, DeleteCategory } from "../repositories/categories.repository.js";

export async function getCategories(req, res) {
    try {
        const categories = await ReadCategories();
        
        return res.send(categories);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); 
    }
}

export async function postCategory(req, res) {
    const { name } = req.body;

    try {
        const id = await CreateCategory(name);

        return res.status(201).send({id});
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        await DeleteCategory(id);

        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); 
    }
}