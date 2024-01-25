import {expect, test} from '@playwright/test';
import dotenv from "dotenv";
import {loginAsMockParent, loginAsMongoParent} from "../../helperFunctions";

dotenv.config();

const performCommonAssertions = async (page:any) => {
    await expect(page.getByText('Welcome to the parent dashboard')).toBeVisible();
    await expect(page.getByText('Create Child Account')).toBeVisible();
    await expect(page.getByText('Logout')).toBeVisible();
}

test.describe('Login as Mongo Parent', ()=>{
    test.beforeEach(async ({page}) => {
        await loginAsMongoParent(page);
    });
    test('common assertions', async ({page}) => {
        await performCommonAssertions(page);
    });
    test('should show any child accounts after successful login', async ({page}) => {
        await expect(page.getByText('First Mongo Child')).toBeVisible();
    });
})
