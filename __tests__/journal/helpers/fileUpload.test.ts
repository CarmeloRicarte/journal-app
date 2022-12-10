import { describe, test, expect } from "vitest";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../../src/journal/helpers";
import { getEnvironments } from "../../../src/helpers";

const { VITE_CLOUD_NAME, VITE_API_KEY, VITE_API_SECRET } = getEnvironments();
cloudinary.config({
  cloud_name: VITE_CLOUD_NAME,
  api_key: VITE_API_KEY,
  api_secret: VITE_API_SECRET,
  secure: true,
});

describe("Tests of fileUpload", () => {
  test("should upload file successfully to Cloudinary", async () => {
    const imageUrl =
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/FC_Barcelona_femen%C3%AD.jpg";
    const { data } = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const file = new File([data], "foto.jpg");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    await cloudinary.api.delete_resources([`journal-app/${imageId}`], {
      resource_type: "image",
    });
  });

  test("should return null", async () => {
    const file = new File([], "foto.jpg");
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
