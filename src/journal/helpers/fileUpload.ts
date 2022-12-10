import axios from "axios";
import { getEnvironments } from "../../helpers";
const { VITE_CLOUDINARY_URL } = getEnvironments();

/**
 * It takes a file, creates a formData object, appends the file to the formData object, and then sends
 * the formData object to the cloudinary API
 * @param {File} file - The file that we want to upload
 * @returns The secure_url of the uploaded file.
 */
export const fileUpload = async (file: File) => {
  const cloudUrl = VITE_CLOUDINARY_URL;
  const formData = new FormData();
  formData.append("upload_preset", "journal-app");
  formData.append("file", file);

  try {
    const resp = await axios.post(cloudUrl, formData);

    if (!resp.data) return null;

    return resp.data.secure_url;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
