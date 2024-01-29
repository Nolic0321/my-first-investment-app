import {expect, test} from '@playwright/test';
import {createMongoChildRequest, loginAsMongoParent} from "@playwrightHelpers";

test.describe('Mongo Request Denial', () => {
    test.beforeEach(async ({page}) => {
        await createMongoChildRequest(page);
        await page.getByRole('link', {name: 'Logout'}).click();
        await loginAsMongoParent(page);
    });

    test('should deny request', async ({page}) => {
        let requestCalled = false;
        await expect(page.getByText('Request $10')).toBeVisible();
        await page.route(`**/api/transactions/*/deny`, async (route) => {
            requestCalled = true;
            await route.fulfill({
                status: 200
            });
        });
        await page.getByRole('button', {name: 'Deny'}).first().click();
        const thing = page.getByText('Request $10');
        await expect(thing).toBeHidden();
        expect(requestCalled).toBeTruthy();
    });

});
