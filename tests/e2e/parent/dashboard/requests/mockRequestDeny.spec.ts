import {expect, test} from '@playwright/test';
import {createMockChildRequest, loginAsMockParent} from '@playwrightHelpers';

test.describe('Mock Pending Requests Deny', ()=>{
    test.beforeEach(async ({page}) => {
        await createMockChildRequest(page);
        await page.getByRole('link', {name: 'Logout'}).click();
        await loginAsMockParent(page);

    });

    test('should deny request', async ({page}) => {
        await expect(page.getByText('Request $10')).toBeVisible();
        await page.getByRole('button', {name: 'Deny'}).click();
        const thing = page.getByText('Request $10');
        await expect(thing).toBeHidden();
    });
});
