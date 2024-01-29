

import {Locator, expect, test} from '@playwright/test';
import {configMockEnvironment, configMongoEnvironment, loginAsMockChild, loginAsMockParent, loginAsMongoChild, loginAsMongoParent} from "@playwrightHelpers";

test.describe('Pretend Zone',()=>{
    test.beforeEach(async ({page}) => {
        await configMongoEnvironment(page);
        await loginAsMongoChild(page);
    });
    test('should have header', async ({page}) => {
        await expect(page.getByText('Pretend Zone')).toBeVisible();
    });
});