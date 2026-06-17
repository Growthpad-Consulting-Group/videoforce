interface IKAuthResponse {
  token: string;
  expire: number;
  signature: string;
}

/**
 * Uploads a file to ImageKit via a server-side auth token.
 * Returns the public URL of the uploaded image.
 */
export async function uploadToImageKit(
  file: File,
  folder = "/videoforce/blog"
): Promise<string> {
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  if (!publicKey) throw new Error("NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY is not set");

  const authRes = await fetch("/api/admin/imagekit-auth", {
    credentials: "same-origin",
  });
  if (!authRes.ok) throw new Error("Could not get upload credentials");
  const auth = (await authRes.json()) as IKAuthResponse;

  const form = new FormData();
  form.append("file", file);
  form.append("fileName", file.name);
  form.append("folder", folder);
  form.append("publicKey", publicKey);
  form.append("signature", auth.signature);
  form.append("expire", String(auth.expire));
  form.append("token", auth.token);

  const uploadRes = await fetch(
    "https://upload.imagekit.io/api/v1/files/upload",
    { method: "POST", body: form }
  );
  if (!uploadRes.ok) {
    const err = (await uploadRes.json()) as { message?: string };
    throw new Error(err.message ?? "Upload failed");
  }

  const result = (await uploadRes.json()) as { url: string };
  return result.url;
}
