import {expect, test} from '@playwright/test';
import {createMockChildRequest, loginAsMockParent} from '@playwrightHelpers';

test.describe('Mock Pending Requests', ()=>{
    test.beforeEach(async ({page}) => {
        await createMockChildRequest(page);
        await page.getByRole('link', {name: 'Logout'}).click();
        await loginAsMockParent(page);

    });
    test('should render', async ({page}) => {
        await expect(page.getByText('Request $10')).toBeVisible();
        await expect(page.getByText('I want to test')).toBeVisible();
        await expect(page.getByRole('button', {name: 'Approve'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Deny'})).toBeVisible();
    });
});
