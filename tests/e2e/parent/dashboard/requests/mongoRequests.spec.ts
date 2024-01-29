import {expect, test} from '@playwright/test';
import {baseUrl, createMongoChildRequest, loginAsMongoParent} from '@playwrightHelpers';

test.describe('Mongo Pending Requests', ()=>{
    let currentTransactionId = '';
    test.beforeEach(async ({page}) => {
        currentTransactionId = await createMongoChildRequest(page);
        await page.getByRole('link', {name: 'Logout'}).click();
        await loginAsMongoParent(page);
    });
    test.afterEach(async ({page, request}) => {
        //Delete transaction made in test
        await request.delete(`${await baseUrl()}/api/transactions/test/${currentTransactionId}`);
    });
    test('should render', async ({page, request}) => {
        const requestComponent = page.getByText(`Request $10Reason: ${currentTransactionId}`);
        await expect(requestComponent).toBeVisible();
        await expect(requestComponent.getByText('Request $10').first()).toBeVisible();
        await expect(requestComponent.getByText(currentTransactionId).first()).toBeVisible();
        await expect(requestComponent.getByRole('button', {name: 'Approve'})).toBeVisible();
        await expect(requestComponent.getByRole('button', {name: 'Deny'})).toBeVisible();
    });
});
