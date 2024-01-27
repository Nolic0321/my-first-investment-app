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

    test('should approve request', async ({page}) => {
        let requestCalled = false;
        const requestToTest = page.getByText('Request $10').first();
        await expect(requestToTest).toBeVisible();
        const elementId = await requestToTest.getAttribute('id')??'';
        await page.route(`**/api/transactions/*/approve`, async (route) => {
            console.log('route called');
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

    test('should deny request', async ({page}) => {
        let requestCalled = false;
        await expect(page.getByText('Request $10')).toBeVisible();
        await page.route(`**/api/transactions/*/deny`, async (route) => {
            console.log('route called');
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
