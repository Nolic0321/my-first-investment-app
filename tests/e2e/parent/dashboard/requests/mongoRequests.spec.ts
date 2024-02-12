import {expect, test} from '@playwright/test';
import {baseUrl, createMongoChildRequest, loginAsMongoParent} from '@playwrightHelpers';
import {DeleteResponse} from "@mongoDataApiHelper";

test.describe('Mongo Pending Requests', ()=>{
    let currentTransactionId = '';
    test.beforeEach(async ({page}) => {
        currentTransactionId = await createMongoChildRequest(page);
        await page.getByRole('link', {name: 'Logout'}).click();
        await loginAsMongoParent(page);
    });
    test.afterEach(async ({page, request}) => {
        //Cleanup
        const deleted = await request.delete(`${await baseUrl()}/api/transactions/test/${currentTransactionId}`);
        expect(deleted.ok(), 'should cleanup transaction properly').toBeTruthy();
        expect(await deleted.json() as unknown as DeleteResponse, 'should expect 1 item deleted').toEqual({deletedCount: 1});

    });
    test('should render', async ({page, request}) => {
        const requestComponent = page.getByText(`Request $10Reason: ${currentTransactionId}`);
        await expect(requestComponent).toBeVisible();
        await expect(requestComponent.getByText('Request $10').first()).toBeVisible();
        await expect(requestComponent.getByText(currentTransactionId).first()).toBeVisible();
        await expect(requestComponent.getByRole('button', {name: 'Approve'})).toBeVisible();
        await expect(requestComponent.getByRole('button', {name: 'Deny'})).toBeVisible();
    });
});
