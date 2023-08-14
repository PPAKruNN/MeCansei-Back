import { CreatePhoto, DeletePhoto, ReadGallery, ReadPhotoById, UpdatePhoto } from "../repositories/gallery.repository.js";

export async function getGallery(req, res) {
    
    const userId = res.locals.id;

    try {
        const gallery = await ReadGallery(userId);

        return res.send(gallery);

    } catch (error) {
        console.log(error);    
        res.status(500).send(error);
    }

}

export async function getPhotoById(req, res) {
    try {
        const userId = res.locals.id;
        const { id } = req.params;

        const photo = await ReadPhotoById(id, userId);

        return res.send(photo);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);     
    }
}

export async function postPhoto(req, res) {
    const userId = res.locals.id;

    console.log(res.locals.id)

    try {
        const { url } = req.body;

        await CreatePhoto(url, userId);
        
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error); 
    }
}

export async function deletePhoto(req, res ) {
    try {
        const userId = res.locals.id;
        const { id } = req.params;

        await DeletePhoto(id, userId);
        return res.sendStatus(204)

    } catch (error) {
        console.log(error);    
        return res.status(500).send(error);
    }
}

export async function putPhoto(req,res ) {
    try {
        const userId = res.locals.id;
        const { id } = req.params;
        const { url } = req.body;

        await UpdatePhoto(id, url, userId);

        return res.sendStatus(204);
    } catch (error) {
        console.log(error);    
        return res.status(500).send(error);
    }
}

