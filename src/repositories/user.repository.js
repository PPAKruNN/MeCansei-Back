import { db } from "../database.js";

export async function CreateUser(name, cpf, contact_number, email, passwordhash) {
    try {
        const userid = await db.query(`
        insert into users(name, cpf, contact_number, email, passwordhash)
        values ($1, $2, $3, $4, $5)
        returning id;
        `, [name, cpf, contact_number, email, passwordhash]);
        
        return userid.rows[0].id;
    } catch (error) {
        console.log(error);
        return null;    
    }
}

export async function CreateSession(userId, token) {
    await db.query(`
    INSERT INTO sessions(userid, token)
    VALUES ($1, $2)
    `, [userId, token]);
}

export async function UpdateSession(userId, token) {
    await db.query(`
    UPDATE sessions
    SET token = $1
    WHERE userid = $2
    `, [token, userId]);
}

export async function GetUserByToken(token) {
    const sessionSearch = await db.query(`
    SELECT userid FROM sessions
    WHERE token = $1
    `, [token]);
   
    if(sessionSearch.rowCount === 0) return null;

    return sessionSearch.rows[0];
}

export async function GetUserById(id) {
    const userSearch = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if(userSearch.rowCount === 0) return null;

    return userSearch.rows[0];
}

export async function GetUserByCpfOrEmail (cpf, email) {
    if(!cpf) cpf = null;
    if(!email) email = null;

    const userSearch = await db.query(`SELECT * FROM users WHERE cpf = $1 OR email = $2`, [cpf, email]);
    if(userSearch.rowCount === 0) return null;

    return userSearch.rows[0];
}