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
    await performLogin(page, 'child1', 'pass123')
}

export const loginAsMongoParent = async (page:any) => {
    await performLogin(page, 'firstmongouser', 'pass123');
}

export const loginAsMongoChild = async (page:any) => {
    await performLogin(page, 'firstmongochild', 'pass123');
}
