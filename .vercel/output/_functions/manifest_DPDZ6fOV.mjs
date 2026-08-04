import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_HZMvGBYO.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CCmfhyhq.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/kittelsaa/projects/kttlsaa/","cacheDir":"file:///home/kittelsaa/projects/kttlsaa/node_modules/.astro/","outDir":"file:///home/kittelsaa/projects/kttlsaa/dist/","srcDir":"file:///home/kittelsaa/projects/kttlsaa/src/","publicDir":"file:///home/kittelsaa/projects/kttlsaa/public/","buildClientDir":"file:///home/kittelsaa/projects/kttlsaa/dist/client/","buildServerDir":"file:///home/kittelsaa/projects/kttlsaa/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"500.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/500","isIndex":false,"type":"page","pattern":"^\\/500\\/?$","segments":[[{"content":"500","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/500.astro","pathname":"/500","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"garden/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/garden","isIndex":false,"type":"page","pattern":"^\\/garden\\/?$","segments":[[{"content":"garden","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/garden.astro","pathname":"/garden","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"notes/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/notes","isIndex":true,"type":"page","pattern":"^\\/notes\\/?$","segments":[[{"content":"notes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/notes/index.astro","pathname":"/notes","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"now/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/now","isIndex":false,"type":"page","pattern":"^\\/now\\/?$","segments":[[{"content":"now","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/now.astro","pathname":"/now","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"stream/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/stream","isIndex":false,"type":"page","pattern":"^\\/stream\\/?$","segments":[[{"content":"stream","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/stream.astro","pathname":"/stream","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/send","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/send\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"send","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/send.ts","pathname":"/api/send","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/stats.js","isIndex":false,"type":"endpoint","pattern":"^\\/stats\\.js\\/?$","segments":[[{"content":"stats.js","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/stats.js.ts","pathname":"/stats.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://kttlsaa.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/kittelsaa/projects/kttlsaa/src/components/garden/GardenCollections.astro",{"propagation":"in-tree","containsHead":false}],["/home/kittelsaa/projects/kttlsaa/src/pages/garden.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/garden@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/kittelsaa/projects/kttlsaa/src/pages/notes/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/notes/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/kittelsaa/projects/kttlsaa/src/pages/notes/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/notes/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/kittelsaa/projects/kttlsaa/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["/home/kittelsaa/projects/kttlsaa/src/utils/noteUtils.js",{"propagation":"in-tree","containsHead":false}],["/home/kittelsaa/projects/kttlsaa/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/home/kittelsaa/projects/kttlsaa/src/pages/500.astro",{"propagation":"none","containsHead":true}],["/home/kittelsaa/projects/kttlsaa/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/kittelsaa/projects/kttlsaa/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/kittelsaa/projects/kttlsaa/src/pages/now.astro",{"propagation":"none","containsHead":true}],["/home/kittelsaa/projects/kttlsaa/src/pages/stream.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/500@_@astro":"pages/500.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/send@_@ts":"pages/api/send.astro.mjs","\u0000@astro-page:src/pages/garden@_@astro":"pages/garden.astro.mjs","\u0000@astro-page:src/pages/notes/[slug]@_@astro":"pages/notes/_slug_.astro.mjs","\u0000@astro-page:src/pages/notes/index@_@astro":"pages/notes.astro.mjs","\u0000@astro-page:src/pages/now@_@astro":"pages/now.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/stats.js@_@ts":"pages/stats.js.astro.mjs","\u0000@astro-page:src/pages/stream@_@astro":"pages/stream.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DPDZ6fOV.mjs","/home/kittelsaa/projects/kttlsaa/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BMYJ9Ndt.mjs","/home/kittelsaa/projects/kttlsaa/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/home/kittelsaa/projects/kttlsaa/.astro/content-modules.mjs":"chunks/content-modules_DxaNfGKL.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DhGHsHMe.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/ai-tool.mdx?astroPropagatedAssets":"chunks/ai-tool_IKQovjX5.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/big-tech-and-the-future-of-software.mdx?astroPropagatedAssets":"chunks/big-tech-and-the-future-of-software_CpMAcxfF.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/channeling-your-creative-energy.mdx?astroPropagatedAssets":"chunks/channeling-your-creative-energy_CYLFXzyL.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/my-digital-garden.mdx?astroPropagatedAssets":"chunks/my-digital-garden_BwJeQm6I.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/notes-taking-guide.mdx?astroPropagatedAssets":"chunks/notes-taking-guide_CgNPxIAa.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/obsidian-tool.mdx?astroPropagatedAssets":"chunks/obsidian-tool_ChyBOnh5.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/start-building-things.mdx?astroPropagatedAssets":"chunks/start-building-things_BooTRIav.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/ai-tool.mdx":"chunks/ai-tool_CHfQ5qjD.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/big-tech-and-the-future-of-software.mdx":"chunks/big-tech-and-the-future-of-software_DopsGsAt.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/channeling-your-creative-energy.mdx":"chunks/channeling-your-creative-energy_xcPiblow.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/my-digital-garden.mdx":"chunks/my-digital-garden_DoR3KKMa.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/notes-taking-guide.mdx":"chunks/notes-taking-guide_CRxIpy_A.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/obsidian-tool.mdx":"chunks/obsidian-tool_YNWoB21g.mjs","/home/kittelsaa/projects/kttlsaa/src/content/notes/start-building-things.mdx":"chunks/start-building-things_ooeg-IeB.mjs","@astrojs/react/client.js":"_astro/client.Co0vMr8l.js","/home/kittelsaa/projects/kttlsaa/src/pages/garden.astro?astro&type=script&index=0&lang.ts":"_astro/garden.astro_astro_type_script_index_0_lang.DYdwy9Cm.js","/home/kittelsaa/projects/kttlsaa/src/pages/notes/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.DrTb5oCO.js","/home/kittelsaa/projects/kttlsaa/src/components/garden/GardenCollections.astro?astro&type=script&index=0&lang.ts":"_astro/GardenCollections.astro_astro_type_script_index_0_lang.DsZGqq9x.js","/home/kittelsaa/projects/kttlsaa/src/components/BackButton.astro?astro&type=script&index=0&lang.ts":"_astro/BackButton.astro_astro_type_script_index_0_lang.421IwZ-b.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/404.D6YbzjXb.css","/_astro/500.Cl2UBIhd.css","/_astro/RemoteImage_astro_astro_type_style_index_0_lang.B0KDyaaR.css","/_astro/_slug_.M8oOvr1S.css","/_astro/_slug_.D3tOXNEx.css","/_astro/_slug_.BOTALHkc.css","/_astro/about.DehVBKju.css","/_astro/about.B0E_iD5t.css","/_astro/about.B0OBUxRX.css","/_astro/garden.v8bYKm9-.css","/_astro/index.MV8wjNRe.css","/_astro/index.CVl9xmZP.css","/_astro/now.DRKuYBuF.css","/_astro/stream.DlSi6tnn.css","/f1.png","/robots.txt","/_astro/BackButton.astro_astro_type_script_index_0_lang.421IwZ-b.js","/_astro/GardenCollections.astro_astro_type_script_index_0_lang.DsZGqq9x.js","/_astro/client.Co0vMr8l.js","/_astro/garden.astro_astro_type_script_index_0_lang.DYdwy9Cm.js","/_astro/index.astro_astro_type_script_index_0_lang.DrTb5oCO.js","/images/kttlsaalg.png","/images/kttlsaalogo.png","/images/lg.png","/images/logo.png","/images/namelg.png","/images/namelogo.png","/404.html","/500.html","/about/index.html","/garden/index.html","/notes/index.html","/now/index.html","/rss.xml","/stream/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"QMCE70xcEx3Rv3MBA4UWVExJrCP+DG9UIWzAG1lt4Rs="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
