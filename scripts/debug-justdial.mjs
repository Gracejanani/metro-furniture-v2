/**
 * Debug JustDial page content
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { launchBrowser } from "./browser.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URLS = [
  "https://www.justdial.com/Dharmapuri/Metro-Furniture-Senthil-Nagar-Bus-Stop-Salem-Main-Road/9999P4342-4342-160219180223-A7P4_BZDET",
  "https://www.justdial.com/Dharmapuri/Metro-Furniture-Senthil-Nagar-Bus-Stop-Salem-Main-Road/9999P4342-4342-160219180223-A7P4_BZDET/gallery",
  "https://www.justdial.com/Dharmapuri/Metro-Furniture-Senthil-Nagar-Bus-Stop-Salem-Main-Road/9999P4342-4342-160219180223-A7P4_BZDET/catalogue",
  "https://www.justdial.com/Dharmapuri/Metro-Furniture-Senthil-Nagar-Bus-Stop-Salem-Main-Road/9999P4342-4342-160219180223-A7P4_BZDET/photos",
];

async function main() {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  const allResponses = [];

  page.on("response", async (res) => {
    const url = res.url();
    if (
      url.includes("catalogue") ||
      url.includes("gallery") ||
      url.includes("product") ||
      url.includes("jd-api") ||
      url.includes("india_api") ||
      url.includes("compcat") ||
      url.includes("magicbox")
    ) {
      try {
        const text = await res.text();
        allResponses.push({ url, status: res.status(), len: text.length, preview: text.slice(0, 3000) });
      } catch {
        /* ignore */
      }
    }
  });

  for (const url of URLS) {
    console.log("\n===", url, "===");
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 }).catch((e) => console.log("goto err", e.message));
    await new Promise((r) => setTimeout(r, 3000));
    const info = await page.evaluate(() => ({
      title: document.title,
      text: document.body?.innerText?.slice(0, 4000),
      htmlLen: document.documentElement.outerHTML.length,
      imgs: [...document.querySelectorAll("img")].slice(0, 20).map((i) => i.src),
    }));
    console.log("Title:", info.title);
    console.log("HTML len:", info.htmlLen);
    console.log("Text preview:", info.text?.slice(0, 500));
    fs.writeFileSync(path.join(__dirname, `debug-${URLS.indexOf(url)}.txt`), info.text || "");
  }

  fs.writeFileSync(path.join(__dirname, "debug-responses.json"), JSON.stringify(allResponses, null, 2));
  console.log("\nAPI responses captured:", allResponses.length);
  await browser.close();
}

main();
