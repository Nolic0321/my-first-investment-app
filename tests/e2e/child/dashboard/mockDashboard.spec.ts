import {Locator, expect, test} from '@playwright/test';
import {configMockEnvironment, configMongoEnvironment, loginAsMockChild, loginAsMockParent, loginAsMongoChild, loginAsMongoParent} from "@playwrightHelpers";

test.describe('Mock Dashboard', ()=>{
    let accountBalance: number;
    test.beforeEach(async ({page}) => {
        await configMockEnvironment(page);
        await loginAsMockChild(page);
        accountBalance = Number.parseFloat(await page.getByTestId('account-balance').textContent()??"0");
    });

    test('should display header', async ({page}) => {
        await expect(page.getByText('Hello Child 1')).toBeVisible();
    });

    test('should have Account Balance Section', async ({page}) => {
        await expect(page.getByText('Account Balance')).toBeVisible();
        await expect (page.getByText(`$${accountBalance.toFixed(2)}`)).toBeVisible();
        await expect(page.getByText('Your current balance is')).toBeVisible();
        await expect(page.getByText('Today your money made you')).toBeVisible();
    });
});
