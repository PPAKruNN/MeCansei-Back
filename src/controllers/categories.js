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
    try {
        const { name } = req.body;

        await CreateCategory(name);

        return res.sendStatus(201);
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