import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { When, Then } = createBdd();

When('je créé un commentaire', async ({ page }) => {
  await page.getByRole('button', { name: 'Articles' }).first().click();
  await page.getByTestId('view-all-posts-button').click();

  const createTitle = page.getByTestId('posts-title-page');
  await expect(createTitle).toBeVisible();

  await page.locator('div.chakra-card').first().click();
  await page.fill('textarea[name="body"]', 'Mon nouveau commentaire');

  await page.getByTestId('submit-comment-button').click();

  const modal = page.getByTestId('modal');
  await expect(modal).toBeVisible();
  await modal.getByTestId('confirm-create-button').click();
});

Then('je dois voir le commentaire créé', async ({ page }) => {
  const comment = page.getByText('Mon nouveau commentaire');
  await expect(comment).toBeVisible();
});

When('je modifie le commentaire', async ({ page }) => {
  await page.getByLabel('Modifier le commentaire').click();

  const textarea = page.locator('textarea[name="body"]').nth(1);
  await textarea.fill('Mon nouveau commentaire modifié');
  await page.getByText('Modifier').click();

  const modal = page.getByTestId('modal');
  await expect(modal).toBeVisible();
  await modal.getByTestId('confirm-edit-button').click();
});

Then('je dois voir le commentaire modifié', async ({ page }) => {
  const comment = page.getByText('Mon nouveau commentaire modifié');
  await expect(comment).toBeVisible();
});

When('je supprime le commentaire', async ({ page }) => {
  await page.getByLabel('Supprimer le commentaire').click();

  const modal = page.getByTestId('modal');
  await expect(modal).toBeVisible();
  await modal.getByTestId('confirm-delete-button').click();
});

Then('je ne dois plus voir le commentaire', async ({ page }) => {
  const comment = page.getByText('Mon nouveau commentaire modifié');
  await expect(comment).not.toBeVisible();
});
