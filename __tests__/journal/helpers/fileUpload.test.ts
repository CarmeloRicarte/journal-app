import { fileUpload } from "../../../src/journal/helpers";
import { describe, test, expect } from "vitest";
import axios from "axios";

describe("Tests of fileUpload", () => {
  test("should upload file successfully to Cloudinary", async () => {
    const imageUrl =
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/FC_Barcelona_femen%C3%AD.jpg";
    const { data } = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const file = new File([data], "foto.jpg");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");
  });

  test("should return null", async () => {
    const file = new File([], "foto.jpg");
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
