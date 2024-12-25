import { queryes } from "@/lib/database/database";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!id || !status) {
        return new NextResponse(JSON.stringify({ error: "Invalid request" }), { status: 400 });
    }

    try {
        const updateQuery = `UPDATE orders SET status = ? WHERE id = ?`;
        const result = await queryes({ query: updateQuery, values: [status, id] });

        if (result.affectedRows === 0) {
            return new NextResponse(JSON.stringify({ error: "Order not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: "Order updated successfully" }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to update order" }), { status: 500 });
    }
};
