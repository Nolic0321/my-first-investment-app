import Button from "../components/Button";
import {useContext, useEffect, useState} from "react";
import {UserContext, } from "../context/UserContext";
import {Child, Transaction} from "../models/types";
import {CreateChildAccountDialog} from "./CreateChildAccountDialog";
import IClient from "../models/client";
import {ClientContext} from "../context/ClientContext";

export default function ParentDashboard() {
	const [childAccounts, setChildAccounts] = useState<Child[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const client = useContext(ClientContext) as unknown as IClient

	const handleCreateChildAccount = (child: Child) => {
		client.addChildUser(child);
		setChildAccounts([...childAccounts, child]);
		setIsDialogOpen(false);
	};

	const {user} = useContext(UserContext)!;
	useEffect(()=>{
		if (user) {
			let childAccounts = client.getChildAccounts(user.id);
			setChildAccounts(childAccounts);
		}
	}, [user, client]);

	const updateChildBalance = (childId: string, request: Transaction) => {
		const updatedChildAccounts = childAccounts.map((child) => {
			if (child.id === childId) {
				child.balance -= request.amount;
				child.pendingRequests = child.pendingRequests.filter((transaction) => transaction.id !== request.id);
			}
			client.updateUser(child);
			return child;
		});
		setChildAccounts(updatedChildAccounts);
	}

	return(
		<>
			<div>Welcome to the parent dashboard</div>
			<sub>More neat things to come soon!</sub>
			<div className={"flex flex-col"}>
				{childAccounts.map((child) => (
					<div key={child.id} className={'inline-flex'}><div>{child.displayName}</div>
						{/*<Button buttonText="Delete" className={'ml-4'} onButtonPressed={() => onDeletePressed(child.id)}/> to be implemented in issue #12*/}
						{child.pendingRequests.map((request:Transaction) => (
							<div  key={request.id}>
								<div>Request {request.amount}</div>
								<Button buttonText="Approve" className={'ml-4'} onButtonPressed={() => updateChildBalance(child.id, request)}/>
							</div>
						))}
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
