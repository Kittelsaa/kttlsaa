// src/pages/api/send.ts  
export const prerender = false;

export async function POST({ request }) {
  const body = await request.text();
  const res = await fetch('https://cloud.umami.is/api/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': request.headers.get('user-agent') ?? '',
      'X-Forwarded-For': request.headers.get('cf-connecting-ip') ?? '',
    },
    body,
  });
  return new Response(await res.text(), { status: res.status });
}