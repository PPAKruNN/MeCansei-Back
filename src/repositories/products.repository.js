import { db } from "../database.js";

export async function ReadProducts() {
    const products = await db.query("SELECT * FROM products"); 
    if(products.rowCount === 0) return null;
    return products.rows;
}

export async function ReadProductById(id) {
    const product = await db.query("SELECT * FROM products WHERE id = $1", [id]);
    if(product.rowCount === 0) return null;
    return product.rows[0];
}

export async function CreateProduct(name, description, price, isAvailable, ownerid, categoriesId, photosId) {
    const product = await db.query(
        `INSERT INTO products (name, description, price, isAvailable, ownerid, categoriesId, photosId) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id`,
        [name, description, price, isAvailable, ownerid, categoriesId, photosId]
    );
    
    return product.rows[0];
}