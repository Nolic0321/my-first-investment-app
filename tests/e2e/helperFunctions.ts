import {APIRequestContext, Page, Route} from 'playwright';
import {ClientType} from '../../app/enums/clientType';
import dotenv from "dotenv";
import {guid} from "../../app/helper-functions";

dotenv.config();
export const mongoChildId = '65ada4aaf492160c42729149';
export const baseUrl = async () : Promise<string> => {
    return process.env.PLAYWRIGHT_TEST_BASE_URL as string;
}
export const performLogin = async (page:any, username:string, password:string) => {
    if(!page.url().includes(process.env.PLAYWRIGHT_TEST_BASE_URL)) {
        await page.goto(process.env.PLAYWRIGHT_TEST_BASE_URL, {waitUntil: 'networkidle'});
    }
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
};
export const loginAsMockParent = async (page:any) => {
    await performLogin(page, 'parent1', 'pass123');
}

export const loginAsMockChild = async (page:any) => {
    await configMockEnvironment(page);
    await performLogin(page, 'child1', 'pass123')
}

export const loginAsMongoParent = async (page:any) => {
    await configMongoEnvironment(page);
    await performLogin(page, 'firstmongouser', 'pass123');
    await page.waitForTimeout(1000);
}

export const loginAsMongoChild = async (page:any) => {
    await configMongoEnvironment(page);
    await performLogin(page, 'firstmongochild', 'pass123');
    await page.waitForTimeout(1000);
}

export const createMockChildRequest = async (page:any) => {
    await loginAsMockChild(page);
    await page.getByLabel('I want to spend', {exact:true}).fill('10');
    await page.getByLabel('I want to spend this money because').fill('I want to test');
    await page.getByRole('button',{name:'Request'}).click();
    await page.waitForTimeout(500);
}

export const createMongoChildRequest = async (page:Page) => {
    const transactionId = guid();
    await loginAsMongoChild(page);
    await page.getByLabel('I want to spend', {exact:true}).fill('10');
    await page.getByLabel('I want to spend this money because').fill(transactionId);
    await page.getByRole('button',{name:'Request'}).click();
    await page.waitForTimeout(500);
    return transactionId;
}


export const configMockEnvironment = async (page:any) => {
    
    await page.route('**/api/client', async (route: Route) => route.fulfill({
        status: 200,
        body: ClientType.Mock
    }));
};

export const configMongoEnvironment = async (page:any) => {
    await page.route('**/api/client', async (route: Route) => route.fulfill({
        status: 200,
        body: ClientType.Mongo
    }));
};

export const deleteMongoTransaction = async (request: APIRequestContext, transactionId:string) => {
    await request.delete(`${await baseUrl()}/api/transactions/${transactionId}`);
}
