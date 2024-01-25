import {expect, test} from "@playwright/test";
import {performLogin} from "../helperFunctions";


const performCommonAssertions = async (page:any) => {
    await expect(page.getByText('Welcome to the dashboard')).toBeVisible();
    await expect(page.getByText('Create Child Account')).toBeVisible();
    await expect(page.getByText('Logout')).toBeVisible();
}

test.describe('Test with Mongo Client',()=>{
    process.env.ENVIRONMENT = 'test';
    test.beforeEach(async ({page}) => {
        await performLogin(page, 'firstmongouser', 'pass123');
    });
    test('common assertions', async ({page}) => {
        await performCommonAssertions(page);
    });

    test('should show any child accounts after successful login', async ({page}) => {
        await expect(page.getByText('First Mongo Child')).toBeVisible();
    });
});
