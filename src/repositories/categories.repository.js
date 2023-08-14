import { db } from "../database.js";

export async function ReadCategories() {
    const categories = await db.query(`SELECT * FROM categories`);

    return categories.rows;
}

export async function CreateCategory(categoryName) {
    const res = await db.query(`INSERT INTO categories (name) VALUES ($1) RETURNING id`, [categoryName]);
    return res.rows[0].id;
}

export async function DeleteCategory(categoryId) {
    await db.query(`DELETE FROM categories WHERE id = $1`, [categoryId]);
}