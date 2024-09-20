import { Request, Response } from "express";
import { createUser, findUsers, findUser , loginUser} from "../service/userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../middlewares/verify";
import { error } from "console";

export const create = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: String(error) });
    }
};

export const find = async (req: Request, res: Response) => {
    try {
        const users = await findUsers({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: String(error) });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const user = await loginUser({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "invalid password" });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: "30d" }
        );
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: String(error) });
    }
};

export const me =async(req: Request, res: Response) =>{
    try{
        const customReq = req as CustomRequest;
        if(!customReq.user || !customReq.user.id){
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }
        const user = await findUser({id: customReq.user.id});
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error: String(error)});
    }
};
