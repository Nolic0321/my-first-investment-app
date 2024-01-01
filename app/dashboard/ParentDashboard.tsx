import Button from "../components/Button";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import {Child} from "../models/types";
import {addUser, getChildAccounts, deleteChildAccount} from "../models/mockClient";
import {CreateChildAccountDialog} from "./CreateChildAccountDialog";

export default function ParentDashboard() {
	const [childAccounts, setChildAccounts] = useState<Child[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleCreateChildAccount = (child: Child) => {
		addUser(child);
		setChildAccounts([...childAccounts, child]);
		setIsDialogOpen(false);
	};

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
					<Button className={"my-4"} buttonText="Create Child Account" onButtonPressed={() => setIsDialogOpen(true)}/>
				</div>
				{ user!==null ? <p>Logged in as {user.displayName}</p> : <p>Not logged in</p>}
			</div>
			<CreateChildAccountDialog isOpen={isDialogOpen} onRequestClose={()=> setIsDialogOpen(false)} onCreateChildAccount={handleCreateChildAccount}/>
		</>
	)
}
