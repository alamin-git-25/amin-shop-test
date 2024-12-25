
import { uploadImage } from "@/lib/cloudinary/upload";
import { queryes } from "@/lib/database/database";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        const products = await queryes({
            query: `SELECT * FROM products`,
            values: [],
        });
        return NextResponse.json({ result: products }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const data = await req.formData();

        // Extracting form data
        const name = data.get("name");
        const title = data.get("title");
        const description = data.get("description");
        const price = parseFloat(data.get("price")); // Convert price to a number
        const category = data.get("category");
        const stock = parseInt(data.get("stock"), 10); // Convert stock to an integer
        const image = data.get("image"); // Corrected typo
        const isPublished = data.get("isPublished"); // Convert to boolean
        // Validate required fields
        if (!name || !title || !description || !price || !category || !stock || !image) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        };
        const uploadedImage = await uploadImage(image, "product_image");

        const products = await queryes({
            query: `INSERT INTO products (name,title,description,price,category,stock,image,isPublished,public_id) values (?,?,?,?,?,?,?,?,?)`,
            values: [name, title, description, price, category, stock, uploadedImage.secure_url, isPublished, uploadedImage.public_id]
        });
        return NextResponse.json({ result: products, message: 'Product added successful' }, {
            status: 201
        })
    } catch (error) {
        console.error("Error handling POST request:", error.message);

        // Respond with error
        return NextResponse.json(
            { error: "Failed to process the request" },
            { status: 500 }
        );
    }
};
