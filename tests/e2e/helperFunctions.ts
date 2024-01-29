import {Page, Route} from 'playwright';
import {ClientType} from '../../app/enums/clientType';
import {ApprovalStatus, Transaction} from "@models/transaction";
import dotenv from "dotenv";

dotenv.config();
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
    await loginAsMongoChild(page);
    const testTransaction : Transaction = {
        _id: 'test',
        childId: '65ada4aaf492160c42729149',
        approved: ApprovalStatus.Pending,
        amount: 10,
        date: new Date(),
        reason: 'Playwright Test'
    }
    await page.route('**/api/childaccount/*/transactions', async (route: Route) => {
        await route.fulfill({status:200, body:JSON.stringify([testTransaction])});
    });
    await page.route('**/api/parent/*/transactions', async (route: Route) => {
        await route.fulfill({status:200, body:JSON.stringify([testTransaction])});
    });
    await page.getByLabel('I want to spend', {exact:true}).fill('10');
    await page.getByLabel('I want to spend this money because').fill('I want to test');
    await page.getByRole('button',{name:'Request'}).click();
    await page.waitForTimeout(500);
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
