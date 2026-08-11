export const API_BASE = process.env.API_URL ?? "http://localhost:4000";

export async function backendFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const url = `${API_BASE}${path}`;
  let res: Response;
  try {
    res = await fetch(url, init);
  } catch (err) {
    console.error(`[api] connection failed → ${url}`, err);
    throw err;
  }
  return res;
}

export async function backendJson<T>(
  path: string,
  init?: RequestInit
): Promise<T | null> {
  let res: Response;
  try {
    res = await backendFetch(path, init);
  } catch {
    return null;
  }

  if (!res.ok) {
    console.error(`[api] ${res.status} ${res.statusText} → ${API_BASE}${path}`);
    return null;
  }

  try {
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[api] JSON parse failed for response from ${API_BASE}${path}:`, err);
    return null;
  }
}
