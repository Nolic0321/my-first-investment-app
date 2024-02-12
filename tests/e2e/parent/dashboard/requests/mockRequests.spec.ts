import {expect, test} from '@playwright/test';
import {baseUrl, createMockChildRequest, loginAsMockParent} from '@playwrightHelpers';
import {Collection} from "@mongoDataApiHelper";
import {Transaction} from "@models/transaction";

test.describe('Mock Pending Requests', ()=>{
    let currentTransactionId: string;

    test.afterEach(async ({request}) => {
        if(currentTransactionId) {
            await request.delete(`${await baseUrl()}/api/transactions/${currentTransactionId}`);
        }
    });

    test.beforeEach(async ({page}) => {
        await createMockChildRequest(page);
        await page.getByRole('link', {name: 'Logout'}).click();
        await loginAsMockParent(page);

    });
    test('should render', async ({page}) => {page.on('response', async (response) => {
        if(response.url().includes(Collection.Transactions) && response.request().method() === 'POST') {
            const responseData:Transaction[] = await response.json();
            currentTransactionId = responseData[0]._id;
        }
    });

        await expect(page.getByText('Request $10')).toBeVisible();
        await expect(page.getByText('I want to test')).toBeVisible();
        await expect(page.getByRole('button', {name: 'Approve'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Deny'})).toBeVisible();
    });
});
