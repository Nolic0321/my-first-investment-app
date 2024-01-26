import {Route} from 'playwright';
import { ClientType } from '../../app/enums/clientType';

export const performLogin = async (page:any, username:string, password:string) => {
    await page.goto('http://localhost:3000/');
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
}

export const loginAsMongoChild = async (page:any) => {
    await configMongoEnvironment(page);
    await performLogin(page, 'firstmongochild', 'pass123');
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