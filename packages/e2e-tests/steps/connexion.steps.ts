import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given } = createBdd();

Given(
  'je me connecte en tant que {string} avec {string}',
  async ({ page }, user, password) => {
    await page.goto('http://localhost:3001/login');

    const loginTitle = page.getByText(
      'Connectez-vous à votre compte LeBonMeeple',
    );

    await expect(loginTitle).toBeVisible();

    await page.fill('input[name="email"]', user);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:3001/');

    await expect(page).toHaveURL('http://localhost:3001/');
  },
);
