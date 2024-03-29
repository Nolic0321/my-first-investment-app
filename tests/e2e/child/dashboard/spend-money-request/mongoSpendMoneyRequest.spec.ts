import {expect, test} from '@playwright/test'
import {baseUrl, loginAsMongoChild} from '@playwrightHelpers';
import {Transaction} from "@models/transaction";
import {Collection} from "@mongoDataApiHelper";


test.describe('Mongo Spend Money Request', ()=>{
    let currentTransactionId = '';
    test.beforeEach(async ({page}) => {
        await loginAsMongoChild(page, 'spendmoneychild');
    });

    test.afterEach(async ({request}) => {
        if(currentTransactionId) {
            await request.delete(`${await baseUrl()}/api/transactions/${currentTransactionId}`);
        }
    });

    test('should have Spend Money Request area', async ({page}) => {
        await expect(page.getByText('Spend Money RequestI want to')).toBeVisible();
    });

    test('should update the account balance when a money request is made', async ({page, request}) => {
        page.on('response', async (response) => {
            if(response.url().includes(Collection.Transactions) && response.request().method() === 'POST') {
                const responseData:Transaction[] = await response.json();
                currentTransactionId = responseData[0]._id;
            }
        });

        const accountBalance = Number.parseFloat(await page.getByTestId('account-balance').textContent() ?? "0");
        await page.getByPlaceholder('Enter amount', {exact: true}).fill('10');
        await page.getByLabel('I want to spend this money because').fill('I want to test');
        await page.getByRole('button', {name: 'Request'}).click();
        await page.waitForTimeout(500);
        await expect(page.getByText(`($${accountBalance.toFixed(2)})`)).toBeVisible();
        await expect(page.getByText(`$${(accountBalance - 10).toFixed(2)}`)).toBeVisible();
    });
});
