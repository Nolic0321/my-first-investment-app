import dotenv from 'dotenv';
import {LoginData} from "@contexts/AuthContext";
import {aggregate, Collection, findOne, insertOne, updateOneById} from "@mongoDataApiHelper";
import {ChildAccount} from "@models/child-account";
import {IUser} from "@models/user";
import {Balance, updateAndReturnNewBalance} from '@models/balance';

dotenv.config();

export const POST = async (req: Request) => {
    const loginData = await req.json() as LoginData;
    try {
        const userFindResult = await findOne<IUser>(Collection.Users, {
                username: loginData.username,
                password: loginData.password
            });
        if (!userFindResult?.document) {
            return new Response(null,{
                status:404,
                statusText:'User not found'
            });
        }
        const foundUser = userFindResult.document;
        const childAccountResponse = await findOne<ChildAccount>(Collection.ChildAccounts,{_id: {$oid: foundUser._id}});
        const childAccount = childAccountResponse?.document;
        if(!childAccount){
            return Response.json(userFindResult.document)
        }else{
            //Update child balance for the child account
            const pipeline = [
                {$match: {"childId":childAccount._id}},
                {$sort:{"date":-1}},
                {$limit:1}
            ]
            const latestBalanceResponse = await aggregate<Balance>(Collection.Balances,pipeline);
            let noFirstBalance = false;
            let latestBalance = latestBalanceResponse?.documents[0];
            if(!latestBalance) {
                latestBalance = {
                    childId: childAccount._id,
                    balance: childAccount.balance,
                    date: new Date()
                };
                noFirstBalance = true;
            }else{
                latestBalance = {...latestBalance, date: new Date(latestBalance.date)} as Balance;
            }
            
            //Check if the latestBalance.date is today            
            const today = new Date();
            if(latestBalance.date.toDateString() !== today.toDateString() || noFirstBalance){
                //Update the balance
                const newBalance = await updateAndReturnNewBalance(latestBalance, childAccount.interest/100);
                if(!newBalance.balance && newBalance.balance !== 0) throw new Error('Failed to update balance');
                const insertResult = await insertOne<Balance>('balances',newBalance);
                if(!insertResult || !insertResult.insertedId) throw new Error('Failed to update balance');

                const updatedAccount : ChildAccount = {...childAccount, balance: newBalance.balance};
                const updateResult = await updateOneById<ChildAccount>(Collection.ChildAccounts,childAccount._id, {balance: updatedAccount.balance});
                if(!updateResult) throw new Error('Failed to update account');
                //Return the child account
                return Response.json(updatedAccount);
            }

            if(childAccount.balance != latestBalance.balance) {
                childAccount.balance = latestBalance.balance;
                const updateResult = await updateOneById<ChildAccount>(Collection.ChildAccounts,childAccount._id,{balance: childAccount.balance});
                if(!updateResult) throw new Error('Failed to update account');

            }
            //Return the child account
            return Response.json(childAccount);
        }

    } catch (error) {
        console.log(`auth route error: ${JSON.stringify(error)}`)
        return new Response(null,{
            status:500,
            statusText:`Server error: ${JSON.stringify(error)}`
        });
    }
}
