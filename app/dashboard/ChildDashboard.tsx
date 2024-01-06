import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import {Child, Option, Transaction} from "../models/types";
import Input from "../components/Input";
import Button from "../components/Button";
import {guid} from "../models/helperFunctions";
import {ClientContext} from "../context/ClientContext";
import IClient from "../models/client";
const calculateDailyEarnings = (balance: number, yearlyInterestRate: number): number => {
	const dailyInterestRate = yearlyInterestRate / 365;
	return balance * dailyInterestRate;
};

export default function ChildDashboard(){
    const userContext = useContext(UserContext);
	const {user, updateUser} = userContext as unknown as {user: Child, updateUser: (updatedUser: Child) => void};
	const [dailyEarnings, setDailyEarnings] = useState(0);
	const [pretendSpent, setPretendSpent] = useState("");
	const [pretendAdded, setPretendAdded] = useState("");
	const [requestAmount, setRequestAmount] = useState("");
    const [error, setError] = useState<string>("");
    const client = useContext(ClientContext) as unknown as IClient;

	useEffect(() =>{
		// Calculate daily earnings
		const earnings = calculateDailyEarnings(user.balance, user.interest/100);
		// Save that to be displayed
		setDailyEarnings(earnings);
	}, [user.balance, user.interest]);

	const onRequestSubmit = async () => {
        const newRequest : Transaction = {
            amount: Number(requestAmount),
            date: new Date(),
            id: guid()
        }
		// Send request to backend
        try{
            let updatedUser = await client.sendRequest(user.id,newRequest, (newRequest.amount < 0)?{error: "Cannot have negative"} as Option:undefined);
            updateUser(updatedUser);
        } catch(error: any){
            setError(error.message);
        }

		setRequestAmount("");
	};
    if(user) {
        return (
            <div>
                <h1>Hello {user.displayName}</h1>
                <br/>
                <div>
                    {user.pendingRequests?.length > 0
                        ? <h2>Your current balance is: ${user.balance - user.pendingRequests.reduce((total, transaction) => total + transaction.amount, 0)} (${user.balance.toFixed(2)})</h2>
                        : <h2>Your current balance is: ${user.balance.toFixed(2)}</h2>}

                    <h2>Your money is earning you ${dailyEarnings.toFixed(2)} today</h2>
                </div>
                <br/>
                <div className={'flex flex-col'}>
                    <h1>Pretend Zone</h1>
                    <p>This area can be used to pretend you spent some of your money or put more money in.</p>
                    <div className={'inline-flex'}>
                        If I spend <Input className={"w-20 mx-1"} inputText={pretendSpent.toString()} onInputChanged={setPretendSpent} headerDisplay={"$"}/> I would have
                        ${user.balance - Number(pretendSpent)} in my account and then my money would earn me
                        ${calculateDailyEarnings(user.balance - Number(pretendSpent), user.interest / 100).toFixed(2)}
                    </div>
                    <div className={'inline-flex'}>
                        If I add <Input type={"number"} className={"w-20 mx-1"} inputText={pretendAdded.toString()} onInputChanged={setPretendAdded} headerDisplay={"$"}/> I would have
                        ${user.balance + Number(pretendAdded)} in my account and then my money would earn me
                        ${calculateDailyEarnings(user.balance + Number(pretendAdded), user.interest / 100).toFixed(2)}
                    </div>
                </div>
                <div className={'flex flex-col'}>
                    <h1>Spend Money Request</h1>
                    <p>If you want to spend some money then enter the amount below and click &quot;Request&quot;. We&apos;ll let your parents know about the request and they can approve it.</p>
                    <div className={'flex-col'}>
                        <div className={'inline-flex'}>
                            <Input className={"w-20 mx-1"} inputText={requestAmount.toString()} onInputChanged={setRequestAmount} headerDisplay={"$"}/>
                            <Button buttonText={'Request'} onButtonPressed={onRequestSubmit} className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}/>
                        </div>
                        {error && <p className={'text-rose-600'}>{error}</p>}
                    </div>

                </div>
            </div>
        )
    } else {
        return null;
    }
}
