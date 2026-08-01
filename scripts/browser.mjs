import fs from "fs";
import puppeteer from "puppeteer";

const SYSTEM_BROWSERS = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

function exists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

export function resolveBrowserExecutable() {
  try {
    const bundled = puppeteer.executablePath();
    if (bundled && exists(bundled)) return bundled;
  } catch {
    /* use system browser */
  }

  for (const candidate of SYSTEM_BROWSERS) {
    if (exists(candidate)) return candidate;
  }

  return null;
}

export async function launchBrowser(options = {}) {
  const executablePath = resolveBrowserExecutable();

  if (!executablePath) {
    throw new Error(
      [
        "No Chrome/Edge browser found for Puppeteer.",
        "Install Google Chrome, or run:",
        "  npx puppeteer browsers install chrome",
      ].join("\n")
    );
  }

  console.log(`Launching browser: ${executablePath}`);

  return puppeteer.launch({
    headless: true,
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    ...options,
  });
}
