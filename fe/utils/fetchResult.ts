// utils/fetchResult.ts

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export async function fetchResult(type: "tarot" | "saju", slug: string) {
  const apiUrl = `${API_URL}/${type}/${slug}`;
  const res = await fetch(apiUrl, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API fetch failed: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}
