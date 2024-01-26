import {Locator, expect, test} from '@playwright/test';
import {configMockEnvironment, configMongoEnvironment, loginAsMockChild, loginAsMockParent, loginAsMongoChild, loginAsMongoParent} from "@playwrightHelpers";

test.describe('Mongo Client - Child - Login', ()=>{
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
        await expect(page.getByText('Your current balance is')).toBeVisible();
        await expect(page.getByText('Today your money made you')).toBeVisible();
    });

    test.describe('Pretend Zone',()=>{
        test('should have header', async ({page}) => {
            await expect(page.getByText('Pretend Zone')).toBeVisible();
        });

        test.describe('Spend Area', ()=>{
            let ifISpendInput: Locator;
            test.beforeEach(async ({page}) => {
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

        test.describe('Save Area', ()=>{
            let ifISpendInput: Locator;
            test.beforeEach(async ({page}) => {
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


    });
});
