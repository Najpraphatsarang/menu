import { PrismaClient, Prisma } from "@prisma/client";
import brcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (data: Prisma.UserCreateInput) =>{
    const hashedPassword = await brcrypt.hash(data.password,10);
    return await prisma.user.create({
        select:{id: true,username: true},
        data:{...data,password:hashedPassword}})
}

export const findUsers = async (where: Prisma.UserWhereInput) => {
    return await prisma.user.findMany({where, select: {id:true, username:true,branch: true}});
};

export const loginUser = async (where : Prisma.UserWhereUniqueInput) =>{
    return await prisma.user.findUnique({
        where,
        select: {id: true,username:true,branch:true,password:true},
    });
}

export const findUser = async (where : Prisma.UserWhereUniqueInput) =>{
    return await prisma.user.findUnique({
        where,
        select: {id: true,username:true,branch:true},
    });
}