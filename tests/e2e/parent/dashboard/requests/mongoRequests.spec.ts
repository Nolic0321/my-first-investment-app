import {expect, test} from '@playwright/test';
import {createMongoChildRequest, loginAsMongoParent} from '@playwrightHelpers';

test.describe('Mongo Pending Requests', ()=>{
    test.beforeEach(async ({page}) => {
        await createMongoChildRequest(page);
        await page.getByRole('link', {name: 'Logout'}).click();
        await loginAsMongoParent(page);
    });
    test('should render', async ({page}) => {
        await expect(page.getByText('Request $10')).toBeVisible();
        await expect(page.getByText('Playwright Test')).toBeVisible();
        await expect(page.getByRole('button', {name: 'Approve'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Deny'})).toBeVisible();
    });
});
