import {test, expect, Route} from '@playwright/test';
import { configMockEnvironment, createMockChildRequest, loginAsMockChild, loginAsMockParent } from '@playwrightHelpers';

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

    test('should approve request', async ({page}) => {        
        await expect(page.getByText('Request $10')).toBeVisible();
        await page.getByRole('button', {name: 'Approve'}).click();
        const thing = page.getByText('Request $10');
        await expect(thing).toBeHidden();     
    });

    test('should deny request', async ({page}) => {        
        await expect(page.getByText('Request $10')).toBeVisible();
        await page.getByRole('button', {name: 'Deny'}).click();
        const thing = page.getByText('Request $10');
        await expect(thing).toBeHidden();     
    });
});