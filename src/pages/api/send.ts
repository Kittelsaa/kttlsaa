// src/pages/api/send.ts
export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.text();
    const res = await fetch('https://cloud.umami.is/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') ?? '',
        'X-Forwarded-For':
          request.headers.get('cf-connecting-ip') ??
          request.headers.get('x-forwarded-for') ??
          '',
      },
      body,
    });
    return new Response(await res.text(), { status: res.status });
  } catch {
    return new Response(JSON.stringify({ error: 'proxy failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}