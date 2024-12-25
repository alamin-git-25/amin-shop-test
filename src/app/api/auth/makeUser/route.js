import { queryes } from "@/lib/database/database"
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
export const GET = async () => {
    try {
        const user = await queryes({
            query: `SELECT * FROM users`,
            values: [],
        });
        return NextResponse.json({ result: user, status: 200 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "User Not Found", status: 200 })
    }
};
export const POST = async (req) => {
    try {
        const data = await req.json()
        const { name, email, password } = data;
        const hashPass = await bcrypt.hash(password, 15);
        const role = "user"
        const user = await queryes({
            query: `INSERT INTO users (name,email,password,role) values (?,?,?,?)`,
            values: [name, email, hashPass, role]
        });
        return new NextResponse(JSON.stringify({ result: user }), { status: 201 })
    } catch (error) {
        console.log(error.message);
        return new NextResponse(JSON.stringify("Error"))
    }
}