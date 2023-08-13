import { db } from "../database.js";

export async function ReadProducts() {
    const product = await db.query("SELECT * FROM products");
}

export async function ReadProductById(id) {
    const product = await db.query("SELECT * FROM products WHERE id = $1", [id]);
    if(product.rowCount === 0) return null;
    return product.rows[0];
}

export async function CreateProduct(name, description, price, isAvailable, ownerid, categoriesId, photosId) {
    const product = await db.query(
        `INSERT INTO products (name, description, price, isAvailable, ownerid ) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id`,
        [name, description, price, isAvailable, ownerid ]
    );

    await db.query(`
        INSERT INTO products_categories (productid, categoryid)
        VALUES 
        ${ "($1, $2),".repeat(categoriesId.length).slice(0, -1) }`,
        [product.rows[0].id, ...categoryId]
    );
    
    await db.query(`
        INSERT INTO products_photos (productid, photoid)
        VALUES 
        ${ "($1, $2),".repeat(photosId.length).slice(0, -1) }`,
        [product.rows[0].id, ...photosId]
    );
}

export async function UpdateProduct(id, name, description, price, isAvailable, ownerid, categoriesId, photosId) {
    await db.query(
        `UPDATE products SET name = $1, description = $2, price = $3, isAvailable = $4, ownerid = $5 WHERE id = $6`,
        [name, description, price, isAvailable, ownerid, id]
    );

    await db.query(`DELETE FROM products_categories WHERE productid = $1`, [id]);
    await db.query(`
        INSERT INTO products_categories (productid, categoryid)
        VALUES 
        ${ "($1, $2),".repeat(categoriesId.length).slice(0, -1) }`,
        [id, ...categoriesId]
    );

    await db.query(`DELETE FROM products_photos WHERE productid = $1`, [id]);
    await db.query(`
        INSERT INTO products_photos (productid, photoid)
        VALUES 
        ${ "($1, $2),".repeat(photosId.length).slice(0, -1) }`,
        [id, ...photosId]
    );
}

export async function DeleteProduct(id) {
    await db.query(`DELETE FROM products_categories WHERE productid = $1`, [id]);
    await db.query(`DELETE FROM products_photos WHERE productid = $1`, [id]);
    await db.query(`DELETE FROM products WHERE id = $1`, [id]);
}