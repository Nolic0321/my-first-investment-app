import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import {Child} from "../models/types";
const calculateDailyEarnings = (balance: number, yearlyInterestRate: number): number => {
	const dailyInterestRate = yearlyInterestRate / 365;
	return balance * dailyInterestRate;
};

export default function ChildDashboard(){
	const user = useContext(UserContext) as Child;
	const [dailyEarnings, setDailyEarnings] = useState(0);

	useEffect(() =>{
		// Calculate daily earnings
		const earnings = calculateDailyEarnings(user.balance, user.interest/100);
		// Save that to be displayed
		setDailyEarnings(earnings);
	}, [user.balance, user.interest]);
	return (
		<div>
			<h1>Hello {user.displayName}</h1>
			<br/>
			<div>
				<h2>Your current balance is: ${user.balance.toFixed(2)}</h2>
				<h2>Your money is earning you ${dailyEarnings.toFixed(2)} today</h2>
			</div>
		</div>
	)
}
