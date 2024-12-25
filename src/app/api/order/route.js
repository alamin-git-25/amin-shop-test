import { queryes } from "@/lib/database/database"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const orders = await queryes({
            query: `SELECT * FROM orders`,
            values: []
        });
        return NextResponse.json({ result: orders }, { status: 200 })
    } catch (error) {
        console.log(error);

    }
};

export const POST = async (req) => {
    try {
        // Parse the incoming request body
        const body = await req.json();
        const { name, email, phone, address, city, postalcode, paymentMethod, products, totalPrice } = body;

        // Validate required fields
        const requiredFields = { name, email, phone, address, city, postalcode, paymentMethod, products, totalPrice };
        for (const [key, value] of Object.entries(requiredFields)) {
            if (value === undefined || value === null) {
                throw new Error(`Missing required field: ${key}`);
            }
        }

        // Format the products array as JSON
        const formattedProducts = JSON.stringify(products);

        // Insert order into the database
        const orders = await queryes({
            query: `INSERT INTO orders (name, email, phone, address, city, postal_code, payment_method, products, totalPrice) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            values: [name, email, phone, address, city, postalcode, paymentMethod, formattedProducts, totalPrice]
        });

        // Return a success response
        return new NextResponse(
            JSON.stringify({ result: orders, message: "Order has been created successfully" }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating order:", error.message);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to create the order', details: error.message }),
            { status: 500 }
        );
    }
};