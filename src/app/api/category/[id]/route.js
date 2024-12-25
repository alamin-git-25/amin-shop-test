import { queryes } from "@/lib/database/database";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
    try {
        const id = params.id;
        console.log(id);


        const { name, title, description } = await req.json();

        // Ensure all required fields are provided
        if (!name || !title || !description) {
            return new NextResponse(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400 }
            );
        }

        // Update the category in the database
        await queryes({
            query: `
            UPDATE category
            SET name = ?, title = ?, description = ?
            WHERE category_id = ?
        `,
            values: [name, title, description, id],
        });

        return new NextResponse(
            JSON.stringify({ message: "Category updated successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating category:", error.message);
        return new NextResponse(
            JSON.stringify({ error: "Failed to update category" }),
            { status: 500 }
        );
    }
};

export const DELETE = async (req, { params }) => {
    try {
        const { id } = params;
        await queryes({
            query: `DELETE FROM category WHERE category_id = ?`,
            values: [id],
        });
        return new NextResponse(JSON.stringify("Category Delete Succes"), { status: 200 });
    } catch (error) {
        console.log("Error", error.message);

    }
}