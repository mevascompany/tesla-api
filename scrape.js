const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.tesla.com/tr_tr/inventory/new", {
    waitUntil: "networkidle0"
  });

  const data = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('.model-info').forEach(el => {
      const model = el.querySelector('.model-name')?.innerText || '';
      const price = el.querySelector('.price')?.innerText || '';
      items.push({ model, price });
    });
    return items;
  });

  await browser.close();

  fs.writeFileSync("netlify/functions/tesla.json", JSON.stringify(data, null, 2));
  console.log("Veri kaydedildi: tesla.json");
})();
