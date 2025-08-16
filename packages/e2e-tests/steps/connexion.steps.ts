import { createBdd } from 'playwright-bdd';

const { Given } = createBdd();

Given(
  'je me connecte en tant que {string} avec {string}',
  async ({ page }, user, password) => {
    await page.goto('http://localhost:3001/signin');

    await page.fill('input[name="email"]', user);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:3001/');
  },
);
