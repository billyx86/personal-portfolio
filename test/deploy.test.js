import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

// The deployable static site must live entirely under public/. The Pages
// workflow uploads `public`, so anything referenced by index.html must be
// there — and the nested tanstack-app/ source tree must NOT be in public/.
test("deployable files all present in public/", () => {
  for (const f of ["index.html", "app.js", "styles.css", "404.html"]) {
    const p = join(pub, f);
    assert.ok(statSync(p).isFile(), `public/${f} must exist`);
  }
});

test("public/ contains only the static site (no source tree or VCS)", () => {
  const entries = readdirSync(pub, { withFileTypes: true });
  const names = new Set(entries.map((e) => e.name));
  for (const banned of [".git", ".github", "tanstack-app", "node_modules", "src"]) {
    assert.ok(!names.has(banned), `public/ must not contain ${banned}/`);
  }
});

// Every href="#anchor" in the page must resolve to a real id (in-page nav).
test("all in-page anchors resolve to a real id", () => {
  const html = readFileSync(join(pub, "index.html"), "utf8");
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  const hrefs = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
  assert.ok(hrefs.length > 0, "expected at least one in-page anchor");
  for (const h of hrefs) {
    assert.ok(ids.has(h), `href="#${h}" has no matching id`);
  }
});

// Local asset references (stylesheet, script) must point into public/.
test("index.html local assets resolve to files in public/", () => {
  const html = readFileSync(join(pub, "index.html"), "utf8");
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  const local = refs.filter(
    (r) =>
      !/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(r) && // skip http/https/mailto/tel/data
      !r.startsWith("#") &&
      !r.startsWith("/")
  );
  assert.ok(local.length > 0, "expected at least one local asset reference");
  for (const r of local) {
    const clean = r.split("?")[0].split("#")[0];
    const p = join(pub, clean);
    assert.ok(statSync(p).isFile(), `local asset "${r}" missing from public/`);
  }
});

// app.js must be a module-free, browser-safe script with no syntax errors.
test("app.js parses without syntax errors", () => {
  const src = readFileSync(join(pub, "app.js"), "utf8");
  // Wrap in a function so top-level `document` references don't execute.
  new Function(src);
  assert.ok(src.length > 0, "app.js should not be empty");
});

// 404.html is the GitHub Pages fallback for unknown paths. It must be a valid
// standalone page that sends visitors back to the site.
test("404.html is a valid redirect-to-home fallback", () => {
  const html = readFileSync(join(pub, "404.html"), "utf8");
  assert.ok(/<!DOCTYPE html>/i.test(html), "404.html must declare a doctype");
  assert.ok(/<html/i.test(html), "404.html must have an html element");
  // Either a meta-refresh redirect, a JS redirect, or a visible link home.
  const redirectsHome =
    /http-equiv=["']refresh["'][^>]*url=\.?\/?["']?/i.test(html) ||
    /location\.(replace|href)\s*=\s*["']\.?\/?["']/i.test(html) ||
    /href=["']\.?\/?["']/i.test(html);
  assert.ok(redirectsHome, "404.html must redirect or link back to the site root");
});
