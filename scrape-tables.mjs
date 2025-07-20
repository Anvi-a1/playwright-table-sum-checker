import { chromium } from 'playwright';

const seeds = Array.from({ length: 10 }, (_, i) => 64 + i);
let grandTotal = 0;

for (const seed of seeds) {
    const url = `https://live.ds.study.iitm.ac.in/table-sum/${seed}`;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const tables = await page.$$('table');
    for (const table of tables) {
        const cells = await table.$$eval('td', tds =>
            tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
        );
        const tableSum = cells.reduce((a, b) => a + b, 0);
        grandTotal += tableSum;
    }

    await browser.close();
}

console.log("Total sum of all table values:", grandTotal);
