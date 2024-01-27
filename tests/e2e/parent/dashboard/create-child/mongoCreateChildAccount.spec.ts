import {expect, test} from '@playwright/test';
import {configMongoEnvironment, loginAsMongoParent} from '@playwrightHelpers';
import {ChildAccount} from "@models/child-account";

export const navigateToParentDashboard = async (page: any) => {
    page.getByRole('link', {name: 'Dashboard'}).click();
}

test.describe('Mock Create Child Account', async () => {
    test.beforeEach(async ({page}) => {
        await configMongoEnvironment(page);
        await loginAsMongoParent(page);
        await navigateToParentDashboard(page);
        await page.getByText('Create Child Account').click();
    });

    test('should show the create child dialog', async ({page}) => {
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


    test('should create a child account', async ({page}) => {
        const newChildAccount : ChildAccount = {
            _id: 'test',
            isChildAccount: true,
            displayName: 'Test Child',
            username: 'testchild',
            password: 'password',
            balance: 100,
            interest: 5,
            parentId: 'test'
        }
        await page.route(`**/api/childaccount`, async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify(newChildAccount)
            });
        });

        await page.getByLabel('Display Name').fill(newChildAccount.displayName);
        await page.getByLabel('Username').fill(newChildAccount.username);
        await page.getByLabel('Password').fill(newChildAccount.password);
        await page.getByLabel('Starting Balance').fill(newChildAccount.balance.toString());
        await page.getByLabel('Interest').fill(newChildAccount.interest.toString());
        await page.getByRole('button', {name: 'Create Account'}).click();

        await expect(page.getByText('Test Child')).toBeVisible();
    });
});
