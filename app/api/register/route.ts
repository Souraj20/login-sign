import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const { name, email, password } = await request.json();

        if (!email || !name || !password) {
            return new NextResponse("Missing info", { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log(error, "Registering Error");
        return new NextResponse("Internal Error", { status: 500 });
    }
};
