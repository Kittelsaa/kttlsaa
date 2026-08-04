import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_HnF4ZlzX.mjs';
import { manifest } from './manifest_DPDZ6fOV.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/500.astro.mjs');
const _page3 = () => import('./pages/about.astro.mjs');
const _page4 = () => import('./pages/api/send.astro.mjs');
const _page5 = () => import('./pages/garden.astro.mjs');
const _page6 = () => import('./pages/notes/_slug_.astro.mjs');
const _page7 = () => import('./pages/notes.astro.mjs');
const _page8 = () => import('./pages/now.astro.mjs');
const _page9 = () => import('./pages/rss.xml.astro.mjs');
const _page10 = () => import('./pages/stats.js.astro.mjs');
const _page11 = () => import('./pages/stream.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/500.astro", _page2],
    ["src/pages/about.astro", _page3],
    ["src/pages/api/send.ts", _page4],
    ["src/pages/garden.astro", _page5],
    ["src/pages/notes/[slug].astro", _page6],
    ["src/pages/notes/index.astro", _page7],
    ["src/pages/now.astro", _page8],
    ["src/pages/rss.xml.ts", _page9],
    ["src/pages/stats.js.ts", _page10],
    ["src/pages/stream.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "04f53bf7-b1fd-452f-9a93-fc8a04bf7e1a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
