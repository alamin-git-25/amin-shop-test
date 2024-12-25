import { uploadImage } from "@/lib/cloudinary/upload";
import { queryes } from "@/lib/database/database"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const banner = await queryes({
            query: `SELECT * FROM banner`,
            values: []
        });
        return NextResponse.json({ result: banner }, { status: 200 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "Filed To Fetch Banner" }, { status: 500 });
    }
};
export const POST = async (req) => {
    try {
        const data = await req.formData();

        // Extracting form data
        const name = data.get("name");
        const title = data.get("title");
        const link = data.get("link");
        const image = data.get("image"); // Corrected typo
        const status = data.get("status"); // Convert to boolean
        // Validate required fields

        const uploadedImage = await uploadImage(image, "banner");

        const banner = await queryes({
            query: `INSERT INTO banner (name,title,link,image,status,public_id) values (?,?,?,?,?,?)`,
            values: [name, title, link, uploadedImage.secure_url, status, uploadedImage.public_id]
        });
        return NextResponse.json({ result: banner, message: 'Banner added successful' }, {
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