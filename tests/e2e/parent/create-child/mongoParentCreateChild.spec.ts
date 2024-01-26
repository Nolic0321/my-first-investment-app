import {test, expect} from '@playwright/test';
import { configMockEnvironment, configMongoEnvironment, loginAsMockParent, loginAsMongoParent } from '@playwrightHelpers';

export const navigateToParentDashboard = async (page: any) => {
    page.getByRole('link', {name: 'Dashboard'}).click();
}

test.describe('Mock Client - Parent - Creating child account', async () => {
    test.beforeEach(async ({page}) => {
        await configMongoEnvironment(page);
        await loginAsMongoParent(page);
        await navigateToParentDashboard(page);
        await page.getByText('Create Child Account').click();
    });

    test('should show the create child dialog', async ({page, context}) => {
        // Wait for the dialog to be available
        await page.getByRole('dialog');

        //Check that header exists
        expect(page.getByRole('heading',{name:'Create Child Account'})).toBeVisible();

        //Check that button exists
        expect(page.getByRole('button', {name: 'Create'})).toBeVisible();

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
        await expect(interestRateInput).toBeVisible();
        expect(await interestRateInput.inputValue()).toBe('');



    });
});