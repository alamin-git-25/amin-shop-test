
import cloudinary from './cloudinary'; // Ensure this path points to your configured cloudinary instance

export const uploadImage = async (file, folder) => {
    const buffer = await file.arrayBuffer(); // Convert file to an array buffer
    const bytes = Buffer.from(buffer); // Convert buffer to bytes

    // Wrap the Cloudinary upload_stream in a Promise
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto', // Automatically detect resource type (e.g., image, video)
                folder, // Folder to save in Cloudinary
            },
            (error, result) => {
                if (error) {
                    return reject(error.message); // Reject promise on error
                }
                return resolve(result); // Resolve promise with result
            }
        );

        // End the stream by sending the bytes
        uploadStream.end(bytes);
    });
};

export const deleteImage = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result; // Return Cloudinary's result object
    } catch (error) {
        throw new Error(error.message); // Throw a new error for the calling function to handle
    }
};
