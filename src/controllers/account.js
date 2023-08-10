import { v4 } from "uuid";
import { db } from "../database.js";
import bcrypt from "bcrypt";
import { CreateSession, CreateUser, GetUserByCpfOrEmail, UpdateSession } from "../repositories/user.repository.js";

export async function Cadastro(req, res) {

    const { name, cpf, contact_number, email, password } = req.body;

    try {
        const duplicateSearch = await GetUserByCpfOrEmail(cpf, email)
        if(duplicateSearch !== null) return res.status(409).send("Usuário já cadastrado")

        const hash = bcrypt.hashSync(password, 10);

        const userId = await CreateUser(name, cpf, contact_number, email, hash);
        CreateSession(userId, null);
        
        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function Login(req,res) {

    try {
        const { cpf, email, password } = req.body;
        const user = await GetUserByCpfOrEmail(cpf, email);
        if(user == null) return res.sendStatus(404);

        if(!bcrypt.compareSync(password, user.passwordhash)) return res.sendStatus(401);

        const token = v4();
        await UpdateSession(user.id, token);
        

        return res.status(200).send({token});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}