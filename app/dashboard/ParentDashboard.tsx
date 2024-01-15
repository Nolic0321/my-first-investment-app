import Button from "../components/Button";
import {useContext, useEffect, useState} from "react";
import {UserContext, } from "@contexts/UserContext";
import {CreateChildAccountDialog} from "./CreateChildAccountDialog";
import IClient from "../clients/clientFactory";
import {ClientContext} from "@contexts/ClientContext";
import {Child} from "@models/Child";
import {Transaction} from "@models/Transaction";
import {AuthContext} from "@contexts/AuthContext";

export default function ParentDashboard() {
	const [childAccounts, setChildAccounts] = useState<Child[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [pendingRequests, setPendingRequests] = useState<Transaction[]>([]);
	const client = useContext(ClientContext) as unknown as IClient

	const handleCreateChildAccount = (child: Child) => {
		client.addChildUser(child);
		setChildAccounts([...childAccounts, child]);
		setIsDialogOpen(false);
	};

	const {userId} = useContext(AuthContext)!
	useEffect(()=>{
		if (userId) {
			let childAccounts = client.getChildAccounts(userId);
			setChildAccounts(childAccounts);
		}
	}, [userId, client]);

	useEffect(()=>{

		const fetchPendingRequests = async () => {
			try {
				const requests = await client.getPendingRequests(userId!);
				setPendingRequests(requests);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPendingRequests();

	},[client, userId])

	const getPendingRequestsForChild = (childId: string) => {
		return pendingRequests.filter((request) => request.childId === childId);
	}

	const onRequestApproval = async (request: Transaction) => {
		try{
			await client.approveRequest(request);
			const updatedChildAccounts = childAccounts.map((child) => {
				if (child.id === request.childId) {
					child.balance -= request.amount;
				}
				client.updateUser(child);
				return child;
			});
			setChildAccounts(updatedChildAccounts);
			setPendingRequests(pendingRequests.filter((transaction) => transaction.id !== request.id));
		} catch (error) {
			console.log(error);
		}
	}

	const onRequestDenied = async (request: Transaction) => {
		try{
			await client.rejectRequest(request);
			setPendingRequests(pendingRequests.filter((transaction) => transaction.id !== request.id));
		} catch (error) {
			console.log(error);
		}
	}

	return(
		<>
			<div>Welcome to the parent dashboard</div>
			<sub>More neat things to come soon!</sub>
			<div className={"flex flex-col"}>
				{childAccounts.map((child) => (
					<div key={child.id}>
						<div>{child.displayName}</div>
						{/*<Button buttonText="Delete" className={'ml-4'} onButtonPressed={() => onDeletePressed(child.id)}/> to be implemented in issue #12*/}
						{getPendingRequestsForChild(child.id).map((request:Transaction) => (
							<div  key={request.id} className={'my-4'}>
								<div>Request ${request.amount}</div>
								<div>Reason: {request.reason}</div>
								<div className={'inline-flex'}>
									<Button buttonText="Approve" onButtonPressed={() => onRequestApproval(request)}/>
									<Button buttonText={"Deny"} className={"ml-4"}  onButtonPressed={() => onRequestDenied(request)}/>
								</div>
							</div>
						))}
					</div>
				))}
				<div>
					<Button className={"my-4"} buttonText="Create Child Account" onButtonPressed={() => setIsDialogOpen(true)}/>
				</div>
				{ userId!==null ? <p>Logged in</p> : <p>Not logged in</p>}
			</div>
			<CreateChildAccountDialog isOpen={isDialogOpen} onRequestClose={()=> setIsDialogOpen(false)} onCreateChildAccount={handleCreateChildAccount}/>
		</>
	)
}
