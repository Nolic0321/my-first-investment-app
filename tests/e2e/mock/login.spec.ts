import {expect, test} from '@playwright/test';
import dotenv from "dotenv";
import {performLogin} from "../helperFunctions";

dotenv.config();

const performCommonAssertions = async (page:any) => {
    await expect(page.getByText('Welcome to the dashboard')).toBeVisible();
    await expect(page.getByText('Create Child Account')).toBeVisible();
    await expect(page.getByText('Logout')).toBeVisible();
}

test.describe('Test with Mock Client', ()=>{
    process.env.ENVIRONMENT = 'mock';
    test.beforeEach(async ({page}) => {
        await performLogin(page, 'parent1', 'pass123');
    });
    test('common assertions', async ({page}) => {
        await performCommonAssertions(page);
    });
    test('should show any child accounts after successful login', async ({page}) => {
        await expect(page.getByText('First Child')).toBeVisible();
    });
})
