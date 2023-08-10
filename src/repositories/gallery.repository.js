import { db } from "../database.js";

export async function ReadGallery(userid) {
    const gallery = await db.query(`SELECT id, url FROM photos WHERE ownerid = $1`, [userid]);

    return gallery.rows;
};

export async function ReadPhotoById(id, userid) {
    const photo = await db.query(`SELECT id, url FROM photos WHERE id = $1 AND ownerid = $2`, [id, userid]);

    return photo.rows[0];
}

export async function CreatePhoto(url, userid) {
    await db.query(`INSERT INTO photos (url, ownerid) VALUES ($1, $2)`, [url, userid]);
}

export async function DeletePhoto(id, userid) {
    await db.query(`DELETE FROM photos WHERE id = $1 AND ownerid = $2`, [id, userid]);
}

export async function UpdatePhoto(id, url, userid) {
    await db.query(`UPDATE photos SET url = $1 WHERE id = $2 AND ownerid = $3`, [url, id, userid]);
}