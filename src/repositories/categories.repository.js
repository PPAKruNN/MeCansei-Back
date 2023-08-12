import { db } from "../database.js";

export async function ReadCategories() {
    const categories = await db.query(`SELECT * FROM categories`);

    return categories.rows;
}

export async function CreateCategory(categoryName) {
    await db.query(`INSERT INTO categories (name) VALUES ($1)`, [categoryName]);
}

export async function DeleteCategory(categoryId) {
    await db.query(`DELETE FROM categories WHERE id = $1`, [categoryId]);
}