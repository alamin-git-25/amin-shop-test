// Adjust the path to your database utility

import { queryes } from "@/lib/database/database";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        const { email } = params;

        if (!email) {
            return new Response(
                JSON.stringify({ error: "Email parameter is required" }),
                { status: 400 }
            );
        }

        // Query the database for orders with the given email
        const orders = await queryes({
            query: "SELECT * FROM orders WHERE email = ?",
            values: [email],
        });

        if (!orders.length) {
            return new Response(
                JSON.stringify({ message: "No orders found for this email" }),
                { status: 404 }
            );
        }

        return NextResponse.json({ result: orders }, { status: 200 })
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
};
