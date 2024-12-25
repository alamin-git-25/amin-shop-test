import { deleteImage, uploadImage } from "@/lib/cloudinary/upload";
import { queryes } from "@/lib/database/database";
import { NextResponse } from "next/server";


// PUT API: Update an existing product
export const PUT = async (req, { params }) => {
    try {
        // Parse the request body
        const { id } = params;
        const { name, title, description, price, stock, category, isPublished } = await req.json();

        // Validate required fields
        if (!name || !title || !price || !stock || !category) {
            return new NextResponse(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        // Build and execute the SQL UPDATE query
        const updateProduct = await queryes({
            query: `
                UPDATE products
                SET name = ?, title = ?, description = ?, price = ?, stock = ?, category = ?, isPublished = ?
                WHERE product_id = ?
            `,
            values: [name, title, description, price, stock, category, isPublished, id],
        });

        // Check if the product was successfully updated
        if (updateProduct.affectedRows === 0) {
            return new NextResponse(JSON.stringify({ error: "Product not found or no changes made" }), { status: 404 });
        }

        // Return success response
        return new NextResponse(JSON.stringify({ message: "Product updated successfully" }), { status: 200 });

    } catch (error) {
        // Handle errors
        console.error("Error updating product:", error);
        return new NextResponse(JSON.stringify({ error: "An error occurred while updating the product" }), { status: 500 });
    }
};
// DELETE API: Delete a product
export const DELETE = async (req, { params }) => {
    try {
        const id = `product_image/` + params.id; // Fix destructuring

        if (!id) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        const product = await queryes({
            query: `SELECT image FROM products WHERE public_id = ?`,
            values: [id],
        });

        if (!product.length) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }


        await queryes({
            query: `DELETE FROM products WHERE public_id = ?`,
            values: [id],
        });

        if (id) {
            try {
                await deleteImage(id);
            } catch (cloudinaryError) {
                console.error("Cloudinary deletion error:", cloudinaryError);
            }
        }

        return NextResponse.json(
            { success: true, message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error handling DELETE request:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
};

