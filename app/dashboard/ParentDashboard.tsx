import Button from "../components/Button";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import {Child} from "../models/types";
import {addUser, getChildAccounts, deleteChildAccount} from "../models/mockClient";

export default function ParentDashboard() {
	const [childAccounts, setChildAccounts] = useState<Child[]>([]);
	const createChildAccount = () => {
		let newChild : Child = {
			id: 'newid',
			displayName: 'newChild',
			balance: 0,
			parentId: user.id,
			password: 'newPassword',
			username: 'newUsername'
		}
		addUser(newChild);
		setChildAccounts([...childAccounts, newChild]);
	}

	const onDeletePressed = (childId: string) => {
		//TODO: Implement in issue #12
		deleteChildAccount(childId);
		let updatedChildAccounts = getChildAccounts(user.id);
		setChildAccounts(updatedChildAccounts);
	}

	const user = useContext(UserContext)!;
	useEffect(()=>{
		if (user) {
			let childAccounts = getChildAccounts(user.id);
			setChildAccounts(childAccounts);
		}
	}, [user]);

	return(
		<>
			<div>Welcome to the parent dashboard</div>
			<sub>More neat things to come soon!</sub>
			<div className={"flex flex-col"}>
				{childAccounts.map((child) => (
					<div key={child.id} className={'inline-flex'}><div>{child.displayName}</div>
						{/*<Button buttonText="Delete" className={'ml-4'} onButtonPressed={() => onDeletePressed(child.id)}/> to be implemented in issue #12*/}
					</div>
				))}
				<div>
					<Button className={"my-4"} buttonText="Create Child Account" onButtonPressed={createChildAccount}/>
				</div>
				{ user!==null ? <p>Logged in as {user.displayName}</p> : <p>Not logged in</p>}
			</div>
		</>
	)
}
