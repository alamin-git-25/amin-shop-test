import { deleteImage } from "@/lib/cloudinary/upload";
import { queryes } from "@/lib/database/database";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
    try {
        const id = params.id; // Extract the banner ID from params

        // Parse the request body
        const { status } = await req.json();
        console.log(status);

        // Database query to update the banner status
        await queryes({
            query: `
            UPDATE banner
            SET status = ?
            WHERE banner_id = ?
            `,
            values: [status, id],
        });

        // Return success response
        return NextResponse.json({ message: "Success", status: 200 });
    } catch (error) {
        console.error("Error updating banner:", error.message);

        // Return error response
        return NextResponse.json(
            { error: "Failed to update banner", details: error.message },
            { status: 500 }
        );
    }
};

export const DELETE = async (req, { params }) => {
    try {
        const id = `banner/` + params.id; // Fix destructuring

        if (!id) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        await queryes({
            query: `DELETE FROM banner WHERE public_id = ?`,
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
            { success: true, message: "Banner deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error handling DELETE request:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
};