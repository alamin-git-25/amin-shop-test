import { queryes } from "@/lib/database/database"
import next from "next"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {
        const category = await queryes({
            query: `SELECT * FROM category`,
            values: []
        })
        return NextResponse.json({ result: category }, {
            status: 200
        })
    } catch (error) {
        console.log(error.message);

    }
};
export const POST = async (req) => {
    try {
        const { name, title, description } = await req.json();
        const category = await queryes({
            query: `INSERT INTO category (name,title,description) values (?,?,?)`,
            values: [name, title, description]
        });
        return new NextResponse(JSON.stringify({ result: category },), { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { error: "Failed to process the request" },
            { status: 500 }
        );

    }
}
