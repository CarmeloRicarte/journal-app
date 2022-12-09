/**
 * It takes a file, creates a formData object, appends the file to the formData object, and then sends
 * the formData object to the cloudinary API
 * @param {File} file - The file that we want to upload
 * @returns The secure_url of the uploaded file.
 */
export const fileUpload = async (file: File) => {
  const cloudUrl = import.meta.env.VITE_CLOUDINARY_URL;
  const formData = new FormData();
  formData.append("upload_preset", "journal-app");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("Error uploading file");

    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
