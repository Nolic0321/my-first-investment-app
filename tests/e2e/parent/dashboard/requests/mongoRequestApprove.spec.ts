import {expect, test} from '@playwright/test';
import {createMongoChildRequest, loginAsMongoParent} from "@playwrightHelpers";

test.describe('Mongo Request Approval', () => {
    test.beforeEach(async ({page}) => {
        await createMongoChildRequest(page);
        await page.getByRole('link', {name: 'Logout'}).click();
        await loginAsMongoParent(page);
    });

    test('should approve request', async ({page}) => {
        let requestCalled = false;
        const requestToTest = page.getByText('Request $10').first();
        await expect(requestToTest).toBeVisible();
        const elementId = await requestToTest.getAttribute('id')??'';
        await page.route(`**/api/transactions/*/approve`, async (route) => {
            requestCalled = true;
            await route.fulfill({
                status: 200
            });
        });
        await page.getByRole('button', {name: 'Approve'}).first().click();
        const thing = page.getByTestId(elementId);
        await expect(thing).toBeHidden();
        expect(requestCalled).toBeTruthy();
    });

});
