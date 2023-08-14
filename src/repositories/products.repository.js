import { db } from "../database.js";
import { CreateCategory } from "./categories.repository.js";

export async function ReadProducts() {
    const product = await db.query(`
    SELECT *, 
    array (
    SELECT url
    FROM products_photos
    INNER JOIN photos
    ON photos.id = products_photos.photoid
    WHERE products_photos.productid = products.id
    ) as photos,
    array (
    SELECT name
    FROM products_categories
    INNER JOIN categories
    ON categories.id = products_categories.categoryid
    WHERE products_categories.categoryid = products.id
    ) as categories 
    FROM products 
    WHERE isavailable = true
    `);
   
    return product.rows;
}

export async function ReadProductById(id) {
    const product = await db.query(`
    SELECT products.*, users.id as ownerid, contact_number, users.name as ownername,
    array (
    SELECT url

    FROM products_photos
    INNER JOIN photos
    ON photos.id = products_photos.photoid
    WHERE products_photos.productid = products.id
    ) as photos,

    array (
    SELECT name
    FROM products_categories
    INNER JOIN categories
    ON categories.id = products_categories.categoryid
    WHERE products_categories.productid = products.id
    ) as categories 

    FROM products
    INNER JOIN users
    ON users.id = products.ownerid
    WHERE isavailable = true
    AND products.id = $1`, 
    [id]);
    
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
    
    function values(length) {
        let values = [];
        for(let i = 1; i <= length; i++) {
            values.push(`($1, $${i + 1})`);
        }
        console.log(values.join(", "));
        return values.join(", ");
    }

    await db.query(`
        INSERT INTO products_categories (productid, categoryid)
        VALUES 
        ${values(categoriesId.length)}`,
        [product.rows[0].id, ...categoriesId]
    );

    await db.query(`
        INSERT INTO products_photos (productid, photoid)
        VALUES 
        ${values(photosId.length)}`,
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