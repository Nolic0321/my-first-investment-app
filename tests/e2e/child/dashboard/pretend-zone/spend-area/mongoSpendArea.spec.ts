import {Locator, expect, test} from '@playwright/test';
import {configMockEnvironment, configMongoEnvironment, loginAsMockChild, loginAsMockParent, loginAsMongoChild, loginAsMongoParent} from "@playwrightHelpers";

test.describe('Mongo Spend Area', ()=>{
    let accountBalance: number;
    let ifISpendInput: Locator;
    test.beforeEach(async ({page}) => {
        await configMockEnvironment(page);
        await loginAsMockChild(page);
        accountBalance = Number.parseFloat(await page.getByTestId('account-balance').textContent()??"0");
        ifISpendInput = await page.getByLabel('If I spend');
    });
    test('should have nothing by default', async ({page}) => {

        await expect(ifISpendInput).toBeVisible();
        expect(await ifISpendInput.inputValue()).toBe('');

        await expect(page.getByLabel('then my account will have').first()).toBeVisible();
        await expect(page.getByLabel('then my account will have').first()).toBeDisabled();
        expect(await page.getByLabel('then my account will have').first().inputValue()).toBe(accountBalance.toString());
    });

    test('should update when entering a value', async ({page}) => {
        await ifISpendInput.fill('10');
        await expect(page.getByLabel('then my account will have').first()).toBeVisible();
        await expect(page.getByLabel('then my account will have').first()).toBeDisabled();
        expect(await page.getByLabel('then my account will have').first().inputValue()).toBe((accountBalance - 10).toString());
    });
});