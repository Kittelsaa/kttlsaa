export { renderers } from '../renderers.mjs';

const prerender = false;
async function GET() {
  const res = await fetch("https://cloud.umami.is/script.js");
  const body = await res.text();
  return new Response(body, {
    headers: { "Content-Type": "application/javascript" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
