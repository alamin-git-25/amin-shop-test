"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react"

export default function P() {
    const [image, setImage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!image) {
                return
            }
            const data = new FormData();
            data.append("image", image);
            const res = await axios.post('/api/upload', data);
            const resp = await res.data;
            console.log(resp);

        } catch (error) {

        }
    }
    return (
        <form onSubmit={handleSubmit} className="p-10">
            <input type="file" name="image" id="" onChange={(e) => setImage(e.target?.files[0])} />
            <Button type="submit">upload</Button>
        </form>
    )
}
