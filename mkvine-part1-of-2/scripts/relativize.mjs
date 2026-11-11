// Makes the static export work from ANY folder (a subfolder, Live Server, or even double-clicking index.html)
// by turning root-relative links like "/_next/..." and "/about/" into relative ones like "../_next/...".
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";

// Next's client router assumes the site is served from "/", so in this preview plain links are used instead.
const plainLinks = `<script>window.addEventListener("click",function(e){var a=e.target&&e.target.closest?e.target.closest("a[href]"):null;if(!a||a.target||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;var h=a.getAttribute("href")||"";if(h.charAt(0)==="#"||/^[a-z]+:/i.test(h)&&h.indexOf("file:")!==0&&h.indexOf(location.origin)!==0)return;e.stopImmediatePropagation()},true)</script>`;

const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

let pages = 0;
for (const file of walk(OUT)) {
  if (file.endsWith(".html")) {
    const depth = relative(OUT, file).split(sep).length - 1;
    const up = depth === 0 ? "./" : "../".repeat(depth);
    let html = readFileSync(file, "utf8");
    // The Next/Turbopack runtime matches already-loaded scripts by their exact src string, so script tags must keep
    // a full path. Pull them out and re-add them from a bootstrap that works out the real folder at load time.
    const chunks = [];
    html = html.replace(/<script src="\/(_next\/[^"]+)" async=""><\/script>/g, (_, p) => (chunks.push(p), ""));
    html = html.replace(/<link rel="preload" as="script"[^>]*\/>/g, "");
    const loader = chunks.length
      ? `<script>(function(){var a=location.pathname.split("/");a.length-=${depth + 1};var r=a.join("/")+"/";${JSON.stringify(chunks)}.forEach(function(p){var s=document.createElement("script");s.src=r+p;s.async=true;document.head.appendChild(s)})})()</script>`
      : "";
    html = html.replace(/\b(href|src)="\/(?!\/)([^"]*)"/g, (_, attr, path) => {
      if (path === "" || path.endsWith("/")) path += "index.html"; // folders need an explicit file on file:// and some servers
      return `${attr}="${up}${path}"`;
    });
    html = html.replace("</head>", `${plainLinks}${loader}</head>`);
    writeFileSync(file, html);
    pages++;
  } else if (file.endsWith(".css")) {
    // fonts live in ../media relative to the stylesheet
    writeFileSync(file, readFileSync(file, "utf8").replace(/url\((["']?)\/_next\/static\/media\//g, "url($1../media/"));
  }
}
console.log(`Made ${pages} pages location-independent.`);
