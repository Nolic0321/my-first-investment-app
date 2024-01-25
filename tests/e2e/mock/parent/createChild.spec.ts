import {test, expect} from '@playwright/test';
import { loginAsMockParent } from '../../helperFunctions';

export const navigateToParentDashboard = async (page: any) => {
    page.getByRole('link', {name: 'Dashboard'}).click();
}

test.describe('Creating child account', async () => {
    test.beforeEach(async ({page}) => {
        await loginAsMockParent(page);
        await navigateToParentDashboard(page);
        await page.getByText('Create Child Account').click();
    });

    test('should show the create child dialog', async ({page, context}) => {
        expect(page.getByRole('heading',{name:'Create Child Account'})).toBeVisible();

        //Check that input fields exist
        const displayNameInput = page.getByLabel('Display Name');
        expect(displayNameInput).toBeVisible();
        expect(displayNameInput.inputValue()).toBe({});

        const usernameInput = page.getByLabel('Username');
        expect(usernameInput).toBeVisible();
        expect(usernameInput.inputValue()).toBe('');

        const passwordInput = page.getByLabel('Password');
        expect(passwordInput).toBeVisible();
        expect(passwordInput.inputValue()).toBe('');

        const startingBalanceInput = page.getByLabel('Starting Balance');
        expect(startingBalanceInput).toBeVisible();
        expect(startingBalanceInput.inputValue()).toBe(0);

        const interestRateInput = page.getByLabel('Interest');
        expect(interestRateInput).toBeVisible();
        expect(interestRateInput.inputValue()).toBe('');

        expect(page.getByRole('button', {name: 'Create'})).toBeVisible();


    });
});
