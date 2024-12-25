import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const data = await req.formData();
        const image = await data.get('image');
        console.log({ image });

        return new NextResponse(JSON.stringify({ msg: image }))
    } catch (error) {

    }
}