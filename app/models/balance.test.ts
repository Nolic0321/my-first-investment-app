import {Balance, updateAndReturnNewBalance} from "@models/balance";

describe('Balance', () => {
    describe('updateAndReturnNewBalance', () => {
        it('should return a new balance based on the duration of days past', async () => {
            const today = new Date();
            const yearlyRate = .05;
            let numberOfDays = 1;

            for(let i = 0; i < 10; i++) {
                numberOfDays = Math.floor(Math.random());
                const balance: Balance = {
                    childId: 'test',
                    balance: 100,
                    date: new Date(today.setDate(new Date().getDate() - numberOfDays))
                };
                const newBalance = await updateAndReturnNewBalance(balance, yearlyRate);
                const expectedNumber = Number.parseFloat((balance.balance * (1 + (yearlyRate / 365 * numberOfDays))).toFixed(2));if (newBalance.balance !== expectedNumber) {
                    console.error(`Expected ${expectedNumber} but got ${newBalance.balance}`);
                }
                expect(newBalance.balance).toBe(expectedNumber);
            }
        });
    });
});
