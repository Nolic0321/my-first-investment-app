export interface Balance{
    _id?: any;
    childId: string;
    balance: number;
    date: Date;
}

export const updateAndReturnNewBalance = async  (balance:Balance, rate:number) => {
    const currentDate = new Date();
    const daysSinceLastUpdate = calculateDaysBetweenDates(balance.date, currentDate);

    let newBalance = balance.balance;
    for (let i = 0; i < daysSinceLastUpdate; i++) {
        newBalance += calculateDailyInterest(newBalance, rate);
    }

    const newBalanceEntry:Balance = {
        date: currentDate,
        balance: parseFloat(newBalance.toFixed(2)),
        childId: balance.childId
    };

    return newBalanceEntry;
}

function calculateDaysBetweenDates(startDate: Date, endDate: Date): number {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((endDate.getTime() - startDate.getTime()) / msPerDay);
}

function calculateDailyInterest(balance: number, rate:number): number {
    const dailyRate = rate / 365;
    return balance * dailyRate;
}