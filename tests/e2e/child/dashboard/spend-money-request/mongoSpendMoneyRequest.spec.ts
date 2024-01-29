import {expect, test} from '@playwright/test'
import {loginAsMongoChild} from '@playwrightHelpers';


test.describe('Mongo Spend Money Request', ()=>{
    test.beforeEach(async ({page}) => {
        await loginAsMongoChild(page);
    });

    test('should have Spend Money Request area', async ({page}) => {
        await expect(page.getByText('Spend Money RequestI want to')).toBeVisible();
    });

    test('should update the account balance when a money request is made', async ({page}) => {
        const accountBalance = Number.parseFloat(await page.getByTestId('account-balance').textContent()??"0");
        await page.getByPlaceholder('Enter amount', { exact: true }).fill('10');
        await page.getByLabel('I want to spend this money because').fill('I want to test');
        await page.getByRole('button',{name:'Request'}).click();
        await expect(page.getByText(`($${accountBalance.toFixed(2)})`)).toBeVisible();
        await expect(page.getByText(`$${(accountBalance-10).toFixed(2)}`)).toBeVisible();
    });

});
