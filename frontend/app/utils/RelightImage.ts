import { Buffer } from "buffer";

export const relightImage = async (imageUri: string, controller?: AbortController): Promise<string> => {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    } as any);

    const response = await fetch("http://192.168.1.15:8000/relight", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: controller?.signal,
    });

    if (!response.ok) {
      throw new Error("Failed to relight image");
    }

    // Read image data as ArrayBuffer and convert to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Return base64 uri that can be used in <Image />
    return `data:image/jpeg;base64,${base64}`;

  } catch (err) {
    console.error("Error relighting image:", err);
    throw err;
  }
};
