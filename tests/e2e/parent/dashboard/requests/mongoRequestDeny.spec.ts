import {expect, test} from '@playwright/test';
import {baseUrl, createMongoChildRequest, loginAsMongoParent} from "@playwrightHelpers";
import {DeleteResponse} from "@mongoDataApiHelper";

test.describe('Mongo Request Denial', () => {
    let currentTransactionId = '';
    test.beforeEach(async ({page}) => {
        currentTransactionId = await createMongoChildRequest(page);
        await page.getByRole('link', {name: 'Logout'}).click();
        await loginAsMongoParent(page);
    });

    test('should deny request', async ({page, request}) => {
        const requestComponent = page.getByText(`Request $10Reason: ${currentTransactionId}`);
        await expect(requestComponent).toBeVisible();
        await requestComponent.getByRole('button', {name: 'Deny'}).click();
        await expect(requestComponent).toBeHidden();

        //Cleanup
        const deleted = await request.delete(`${await baseUrl()}/api/transactions/test/${currentTransactionId}`);
        expect(deleted.ok(), 'should cleanup transaction properly').toBeTruthy();
        expect(await deleted.json() as unknown as DeleteResponse, 'should expect 1 item deleted').toEqual({deletedCount: 1});


    });

});
