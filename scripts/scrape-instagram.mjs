/**
 * Scrape Instagram @metrofurnituredpi for product images
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { launchBrowser } from "./browser.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "instagram-data.json");

async function main() {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  const posts = [];

  page.on("response", async (res) => {
    const url = res.url();
    if (url.includes("graphql") || url.includes("/api/v1/")) {
      try {
        const json = await res.json();
        posts.push({ url, data: json });
      } catch {
        /* ignore */
      }
    }
  });

  await page.goto("https://www.instagram.com/metrofurnituredpi/", {
    waitUntil: "networkidle2",
    timeout: 90000,
  }).catch(() => {});

  await new Promise((r) => setTimeout(r, 5000));

  const extracted = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")]
      .map((i) => ({ src: i.src, alt: i.alt }))
      .filter((i) => i.src.includes("cdninstagram") || i.src.includes("fbcdn"));
    const text = document.body?.innerText?.slice(0, 5000) || "";
    return { title: document.title, imgs, text };
  });

  fs.writeFileSync(OUT, JSON.stringify({ extracted, posts: posts.slice(0, 5) }, null, 2));
  console.log("Instagram images:", extracted.imgs?.length);
  console.log("GraphQL responses:", posts.length);
  await browser.close();
}

main();
