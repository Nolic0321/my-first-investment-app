import {expect, test} from '@playwright/test';
import {configMongoEnvironment, loginAsMongoChild} from "@playwrightHelpers";

test.describe('Mongo Dashboard', ()=>{
    let accountBalance: number;
    test.beforeEach(async ({page}) => {
        await configMongoEnvironment(page);
        await loginAsMongoChild(page);
        accountBalance = Number.parseFloat(await page.getByTestId('account-balance').textContent()??"0");
    });

    test('should display header', async ({page}) => {
        await expect(page.getByText('Hello First Mongo Child')).toBeVisible();
    });

    test('should have Account Balance Section', async ({page}) => {
        await expect(page.getByText('Account Balance')).toBeVisible();
        await expect (page.getByText(`$${accountBalance.toFixed(2)}`)).toBeVisible();
        await expect(page.getByText('Your current balance is')).toBeVisible();
        await expect(page.getByText('Today your money made you')).toBeVisible();
    });
});
