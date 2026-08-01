/**
 * Scrape Metro Furniture catalogue from JustDial.
 * Run: node scripts/scrape-justdial.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { launchBrowser } from "./browser.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCID = "9999P4342.4342.160219180223.A7P4";
const BASE =
  "https://www.justdial.com/Dharmapuri/Metro-Furniture-Senthil-Nagar-Bus-Stop-Salem-Main-Road/9999P4342-4342-160219180223-A7P4_BZDET";
const GALLERY = `${BASE}/gallery`;
const OUT = path.join(__dirname, "justdial-products.json");

async function scrape() {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1280, height: 900 });

    const apiData = [];
    page.on("response", async (response) => {
      const url = response.url();
      if (
        !url.includes("justdial") &&
        !url.includes("jdmagicbox") &&
        !url.includes("jd-api")
      )
        return;
      try {
        const ct = response.headers()["content-type"] || "";
        if (!ct.includes("json") && !url.includes("catalogue") && !url.includes("gallery"))
          return;
        const text = await response.text();
        if (text.length > 100 && (text.includes("catalogue") || text.includes("product") || text.includes("jdmagicbox") || text.includes("dimages"))) {
          apiData.push({ url, snippet: text.slice(0, 50000) });
        }
      } catch {
        /* ignore */
      }
    });

    console.log("Loading main page...");
    await page.goto(BASE, { waitUntil: "networkidle2", timeout: 90000 }).catch(() => {});

    console.log("Loading gallery...");
    await page.goto(GALLERY, { waitUntil: "networkidle2", timeout: 90000 }).catch(() => {});

    // Try catalogue tab if exists
    const catalogueLink = await page.$('a[href*="catalogue"], a[href*="Catalogue"], [data-tab*="catalogue"]');
    if (catalogueLink) {
      await catalogueLink.click().catch(() => {});
      await page.waitForNetworkIdle({ timeout: 15000 }).catch(() => {});
    }

    // Scroll to load lazy content
    await autoScroll(page);

    const extracted = await page.evaluate(() => {
      const products = [];
      const images = new Set();

      // Common JustDial catalogue selectors
      const selectors = [
        ".catalogue__item",
        ".cat_item",
        ".product-card",
        ".prdct-card",
        "[class*='catalogue']",
        "[class*='Catalogue']",
        "[class*='product']",
        ".hpgalleryli",
        ".gallery_item",
        ".catlg_itm",
      ];

      document.querySelectorAll("img").forEach((img) => {
        const src = img.src || img.dataset?.src || img.getAttribute("data-src") || "";
        if (
          src.includes("jdmagicbox") ||
          src.includes("content.") ||
          src.includes("images.jdmagicbox")
        ) {
          images.add(src.replace(/\/\d+x\d+\//, "/").split("?")[0]);
        }
      });

      // Parse inline JSON blobs
      const scripts = [...document.querySelectorAll("script")].map((s) => s.textContent || "");
      const jsonBlobs = [];
      for (const script of scripts) {
        if (script.includes("catalogue") || script.includes("jdmagicbox") || script.includes("product")) {
          jsonBlobs.push(script.slice(0, 100000));
        }
        const nextMatch = script.match(/__NEXT_DATA__\s*=\s*(\{[\s\S]*?\})\s*;/);
        if (nextMatch) jsonBlobs.push(nextMatch[1]);
      }

      // Try gallery list items
      document.querySelectorAll("li, .cat_item, [class*='catlg']").forEach((el) => {
        const name =
          el.querySelector("h2,h3,h4,.title,.name,[class*='title'],[class*='name']")?.textContent?.trim() ||
          el.querySelector("img")?.alt?.trim();
        const priceText =
          el.querySelector("[class*='price'],[class*='Price'],.prc")?.textContent?.trim() || "";
        const imgEl = el.querySelector("img");
        const img =
          imgEl?.src ||
          imgEl?.dataset?.src ||
          imgEl?.getAttribute("data-src") ||
          "";
        if (name && name.length > 2 && name.length < 120) {
          products.push({ name, priceText, image: img });
        }
      });

      // Background images
      document.querySelectorAll("[style*='jdmagicbox'],[style*='background-image']").forEach((el) => {
        const style = el.getAttribute("style") || "";
        const m = style.match(/url\(['"]?(https?:\/\/[^'")]+)['"]?\)/);
        if (m) images.add(m[1].split("?")[0]);
      });

      return {
        title: document.title,
        products,
        images: [...images],
        jsonBlobs,
        bodyText: document.body?.innerText?.slice(0, 8000) || "",
      };
    });

    // Parse API responses for catalogue data
    const parsedApi = [];
    for (const item of apiData) {
      try {
        const json = JSON.parse(item.snippet);
        parsedApi.push(json);
      } catch {
        parsedApi.push({ url: item.url, raw: item.snippet.slice(0, 2000) });
      }
    }

    const result = {
      scrapedAt: new Date().toISOString(),
      docid: DOCID,
      extracted,
      parsedApi,
      apiUrls: apiData.map((a) => a.url),
    };

    fs.writeFileSync(OUT, JSON.stringify(result, null, 2));
    console.log(`Saved to ${OUT}`);
    console.log(`Images found: ${extracted.images.length}`);
    console.log(`Products found: ${extracted.products.length}`);
    console.log(`API responses: ${apiData.length}`);

    return result;
  } finally {
    await browser.close();
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        total += distance;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
      setTimeout(() => {
        clearInterval(timer);
        resolve();
      }, 8000);
    });
  });
}

scrape().catch((err) => {
  console.error(err);
  process.exit(1);
});
