// src/pages/telemetry.js.ts
export const prerender = false;

export async function GET() {
  try {
    const res = await fetch('https://cloud.umami.is/script.js');
    if (!res.ok) {
      return new Response('// analytics unavailable', {
        status: 200,
        headers: { 'Content-Type': 'application/javascript' },
      });
    }
    const body = await res.text();
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response('// analytics unavailable', {
      status: 200,
      headers: { 'Content-Type': 'application/javascript' },
    });
  }
}