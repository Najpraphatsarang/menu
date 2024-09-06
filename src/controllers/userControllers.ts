import { Request, Response } from "express";
import { createUser, findUser } from "../service/userService";

export const create = async(req: Request,res: Response) => {
    try{
        const user = await createUser(req.body);
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({error: String(error)});
    }
};

export const find = async(req: Request,res: Response) =>{
    try{
        const user = await findUser({})
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error: String(error)});

    }
};

