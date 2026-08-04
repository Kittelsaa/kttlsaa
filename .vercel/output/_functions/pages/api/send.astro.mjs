export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  const body = await request.text();
  const res = await fetch("https://cloud.umami.is/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": request.headers.get("user-agent") ?? "",
      "X-Forwarded-For": request.headers.get("cf-connecting-ip") ?? ""
    },
    body
  });
  return new Response(await res.text(), { status: res.status });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
