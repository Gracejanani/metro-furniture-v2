/**
 * Capture network from wap.justdial.com (loads when desktop is blocked)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { launchBrowser } from "./browser.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL =
  "https://wap.justdial.com/Dharmapuri/Metro-Furniture-Senthil-Nagar-Bus-Stop-Salem-Main-Road/9999P4342-4342-160219180223-A7P4_BZDET";

async function main() {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
  );

  const captured = [];

  page.on("response", async (res) => {
    const url = res.url();
    if (!url.includes("justdial") && !url.includes("127777") && !url.includes("magicbox"))
      return;
    try {
      const ct = res.headers()["content-type"] || "";
      let body = "";
      if (ct.includes("json") || ct.includes("text") || url.includes(".php")) {
        body = await res.text();
      }
      if (body.length > 50) {
        captured.push({ url, status: res.status(), ct, body: body.slice(0, 100000) });
      }
    } catch {
      /* ignore */
    }
  });

  await page.goto(URL, { waitUntil: "networkidle2", timeout: 120000 });
  await new Promise((r) => setTimeout(r, 8000));

  const pageData = await page.evaluate(() => ({
    title: document.title,
    text: document.body?.innerText?.slice(0, 8000),
    imgs: [...document.querySelectorAll("img")].map((i) => i.src).filter(Boolean),
  }));

  fs.writeFileSync(
    path.join(__dirname, "wap-captured.json"),
    JSON.stringify({ pageData, captured }, null, 2)
  );

  console.log("Captured responses:", captured.length);
  console.log("Page title:", pageData.title);
  console.log("Images on page:", pageData.imgs.length);
  console.log("Text length:", pageData.text?.length);

  await browser.close();
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
