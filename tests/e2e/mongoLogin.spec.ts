import {expect, test} from '@playwright/test';


process.env.ENVIRONMENT = 'test';
test('mongoLogin', async ({page}) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('firstmongouser');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('pass123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Welcome to the dashboard')).toBeVisible();
    await expect(page.getByText('Create Child Account')).toBeVisible();
    await expect(page.getByText('Logout')).not.toBeVisible();

});
