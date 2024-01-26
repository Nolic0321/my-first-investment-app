import {expect, test} from '@playwright/test';
import {configMockEnvironment, configMongoEnvironment, loginAsMockParent, loginAsMongoChild, loginAsMongoParent} from "@playwrightHelpers";

test.describe('Mongo Dashboard', ()=>{  
    test.beforeEach(async ({page}) => {
        await configMongoEnvironment(page);
        await loginAsMongoParent(page);
    });
    test('should display header', async ({page}) => {
        await expect(page.getByText('Welcome to the parent dashboard')).toBeVisible();
    });
    test('should have create child account button', async ({page}) => {
        await expect(page.getByText('Create Child Account')).toBeVisible();
    });
    test('should have logout button', async ({page}) => {
        await expect(page.getByText('Logout')).toBeVisible();
    });
    test('should show any child accounts after successful login', async ({page}) => {
        await expect(page.getByText('First Mongo Child')).toBeVisible();
    });
});
