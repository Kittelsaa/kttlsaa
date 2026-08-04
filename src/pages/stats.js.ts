// src/pages/stats.js.ts
export const prerender = false;

export async function GET() {
  const res = await fetch('https://cloud.umami.is/script.js');
  const body = await res.text();
  return new Response(body, {
    headers: { 'Content-Type': 'application/javascript' },
  });
}