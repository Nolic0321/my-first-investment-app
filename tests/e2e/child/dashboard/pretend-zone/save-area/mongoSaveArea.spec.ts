
import {Locator, expect, test} from '@playwright/test';
import {configMockEnvironment, configMongoEnvironment, loginAsMockChild, loginAsMockParent, loginAsMongoChild, loginAsMongoParent} from "@playwrightHelpers";

test.describe('Mongo Save Area', ()=>{
    let accountBalance: number;
    let ifISpendInput: Locator;
    test.beforeEach(async ({page}) => {
        await configMongoEnvironment(page);
        await loginAsMongoChild(page);
        accountBalance = Number.parseFloat(await page.getByTestId('account-balance').textContent()??"0");
        ifISpendInput = await page.getByLabel('If I save');
    });
    test('should have nothing by default', async ({page}) => {

        await expect(ifISpendInput).toBeVisible();
        expect(await ifISpendInput.inputValue()).toBe('');

        await expect(page.getByLabel('then my account will have').last()).toBeVisible();
        await expect(page.getByLabel('then my account will have').last()).toBeDisabled();
        expect(await page.getByLabel('then my account will have').last().inputValue()).toBe(accountBalance.toString());
    });

    test('should update when entering a value', async ({page}) => {
        await ifISpendInput.fill('15');
        await expect(page.getByLabel('then my account will have').last()).toBeVisible();
        await expect(page.getByLabel('then my account will have').last()).toBeDisabled();
        expect(await page.getByLabel('then my account will have').last().inputValue()).toBe((accountBalance + 15).toString());
    });
});