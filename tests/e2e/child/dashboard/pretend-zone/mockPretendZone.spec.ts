import {Locator, expect, test} from '@playwright/test';
import {configMockEnvironment, configMongoEnvironment, loginAsMockChild, loginAsMockParent, loginAsMongoChild, loginAsMongoParent} from "@playwrightHelpers";

test.describe('Mock Pretend Zone',()=>{
    let accountBalance: number;
    test.beforeEach(async ({page}) => {
        await configMockEnvironment(page);
        await loginAsMockChild(page);
        accountBalance = Number.parseFloat(await page.getByTestId('account-balance').textContent()??"0");
    });
    test('should have header', async ({page}) => {
        await expect(page.getByText('Pretend Zone')).toBeVisible();
    });
});