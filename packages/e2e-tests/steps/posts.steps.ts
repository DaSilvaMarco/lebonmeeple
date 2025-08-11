import { expect } from '@playwright/test';
import path from 'path';
import { createBdd } from 'playwright-bdd';

const { When, Then } = createBdd();

When('je créé un article', async ({ page }) => {
  await page.getByRole('button', { name: 'Articles' }).first().click();
  await page.getByTestId('create-post-button').click();

  const createTitle = page.getByText('Créer un nouvel article');

  await expect(createTitle).toBeVisible();

  await page.fill('input[name="title"]', 'Mon nouvel article');
  await page.fill('textarea[name="body"]', 'Mon nouveau texte');

  const imagePath = path.join(
    __dirname,
    '../../../apps/front-end/public/boardgame.jpg',
  );

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByTestId('post-image-input').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(imagePath);

  await page.click('button[type="submit"]');

  const modal = page.getByTestId('modal');
  await expect(modal).toBeVisible();
  await modal.getByTestId('confirm-create-button').click();
});

Then("je dois voir l'article créé", async ({ page }) => {
  const articleTitle = page.getByText('Mon nouvel article');
  await expect(articleTitle).toBeVisible();

  await articleTitle.click();

  await page.getByText('Retour').click();
});

When("je modifie l'article", async ({ page }) => {
  await page.getByLabel('Modifier le post').click();

  const modal = page.getByTestId('modal');
  await expect(modal).toBeVisible();
  await modal.getByTestId('confirm-edit-button').click();

  await page.fill('input[name="title"]', 'Mon nouvel article modifié');
  await page.fill('textarea[name="body"]', 'Mon nouveau texte modifié');

  const imagePath = path.join(
    __dirname,
    '../../../apps/front-end/public/boardgame2.jpg',
  );

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByTestId('post-image-input').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(imagePath);

  await page.click('button[type="submit"]');

  await expect(modal).toBeVisible();
  await modal.getByTestId('confirm-edit-button').click();
});

Then("je dois voir l'article modifié", async ({ page }) => {
  const articleTitle = page.getByText('Mon nouvel article modifié');
  await expect(articleTitle).toBeVisible();

  await articleTitle.click();

  const articleBody = page.getByText('Mon nouveau texte modifié');
  await expect(articleBody).toBeVisible();

  await page.getByText('Retour').click();
});

When("je supprime l'article", async ({ page }) => {
  await page.getByLabel('Supprimer le post').click();

  const modal = page.getByTestId('modal');
  await expect(modal).toBeVisible();
  await modal.getByTestId('confirm-delete-button').click();
});

Then("je ne dois plus voir l'article", async ({ page }) => {
  const articleTitle = page.getByText('Mon nouvel article modifié');
  await expect(articleTitle).not.toBeVisible();
});
