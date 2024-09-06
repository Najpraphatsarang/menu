import { PrismaClient, Prisma } from "@prisma/client";
import brcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (data: Prisma.UserCreateInput) =>{
    const hashedPassword = await brcrypt.hash(data.password,10);
    return await prisma.user.create({
        select:{id: true,username: true},
        data:{...data,password:hashedPassword}})
}

export const findUser = async (where: Prisma.UserWhereInput) => {
    return await prisma.user.findMany({where, select: {id:true, username:true,branch: true}});
};