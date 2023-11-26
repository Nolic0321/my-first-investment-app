'use client'
import {User} from "../../models/user";
import Button from "../../components/Button";
import {useState} from "react";
import {Child} from "../../models/child";

export default function ParentDashboard() {
	const createChildAccount = () => {
		console.log("Create Child Account");
	}

	const [user, setUser] = useState<User>({displayName: "Test User"});
	const [childAccounts, setChildAccounts] = useState<Child[]>([]);
	return(
		<>
			<h1>Dashboard</h1>
			<div>Welcome to the parent dashboard</div>
			<sub>More neat things to come soon!</sub>
			<div className={"flex-col"}>
				<Button className={"my-4"} buttonText="Create Child Account" onButtonPressed={createChildAccount}/>

				{ user ? <p>Logged in as {user.displayName}</p> : <p>Not logged in</p>}
				{childAccounts.map((child, index) => (
					<p key={index}>Child: {child.displayName}</p>
				))}
			</div>
		</>
	)
}
