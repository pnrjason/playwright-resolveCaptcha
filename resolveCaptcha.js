const { chromium, devices } = require('playwright');

(async () => {
  const iphone13 = devices['iPhone 13'];
  const browser = await chromium.launch({
    headless: true
  });
  const context = await browser.newContext({
    ...iphone13
  });
  const page = await context.newPage();
  await page.route('**/*', route => {
    route.continue();
  });
  await page.goto('https://signup.pureflix.com/signup/2/n/plans');
  await page.waitForSelector('#monthly');
  await page.click('#monthly');
  await page.click('#plans-page > div.page-action > span > button');

  await page.waitForSelector('body > div:nth-child(46) > div');
  const password = '6pR12o2H4Bd@';
  await page.type('#account_password', password);
  await page.click('#button-signup');
  
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('https://www.google.com/recaptcha/api2/reload')) {
      const responseBody = await response.text();
      const trimmedValue = responseBody.match(/"rresp","([^"]+)"/);
      const trimmedJSON = JSON.stringify({
        recaptcha: trimmedValue[1]
      });
      console.log(trimmedJSON);
      await browser.close();
    }
  });
})();
