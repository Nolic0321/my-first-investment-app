import {expect, test} from '@playwright/test';
import {configMockEnvironment, loginAsMockParent} from '@playwrightHelpers';

export const navigateToParentDashboard = async (page: any) => {
    page.getByRole('link', {name: 'Dashboard'}).click();
}

test.describe('Mock Client - Parent - Creating child account', async () => {
    test.beforeEach(async ({page}) => {
        await configMockEnvironment(page);
        await loginAsMockParent(page);
        await navigateToParentDashboard(page);
        await page.getByText('Create Child Account').click();
    });

    test('should show the create child dialog', async ({page}) => {
        // Wait for the dialog to be available
        await page.getByRole('dialog');

        //Check that header exists
        expect(page.getByRole('heading',{name:'Create Child Account'})).toBeVisible();
        
        //Check that button exists
        expect(page.getByRole('button', {name: 'Create Account'})).toBeVisible();

        //Check that input fields exist
        const displayNameInput = page.getByLabel('Display Name');
        await expect(displayNameInput).toBeVisible();
        expect(displayNameInput).toHaveValue('');

        const usernameInput = page.getByLabel('Username');
        await expect(usernameInput).toBeVisible();
        expect(await usernameInput.inputValue()).toBe('');

        const passwordInput = page.getByLabel('Password');
        await expect(passwordInput).toBeVisible();
        expect(await passwordInput.inputValue()).toBe('');

        const startingBalanceInput = page.getByLabel('Starting Balance');
        await expect(startingBalanceInput).toBeVisible();
        expect(await startingBalanceInput.inputValue()).toBe("0");

        const interestRateInput = page.getByLabel('Interest');
        expect(interestRateInput).toBeVisible();
        expect(await interestRateInput.inputValue()).toBe('');
    });

    test('should create a child account', async ({page}) => {

        await page.getByLabel('Display Name').fill('Test Child');
        await page.getByLabel('Username').fill('testchild');
        await page.getByLabel('Password').fill('password');
        await page.getByLabel('Starting Balance').fill('100');
        await page.getByLabel('Interest').fill('5');
        await page.getByRole('button', {name: 'Create Account'}).click();

        await expect(page.getByText('Test Child')).toBeVisible();
    });
});
