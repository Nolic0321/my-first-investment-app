import Button from "../components/Button";
import {useContext, useEffect, useState} from "react";
import {CreateChildAccountDialog} from "./CreateChildAccountDialog";
import {ClientContext} from "@contexts/ClientContext";
import {ChildAccount} from "@models/child-account";
import {ApprovalStatus, Transaction} from "@models/transaction";
import {AuthContext} from "@contexts/AuthContext";
import IClient from "@models/client";

export default function ParentDashboard() {
	const [childAccounts, setChildAccounts] = useState<ChildAccount[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [pendingRequests, setPendingRequests] = useState<Transaction[]>([]);
	const client = useContext(ClientContext) as unknown as IClient

	const handleCreateChildAccount = async (child: ChildAccount) => {
		const newChildAccount = await client.addChildUser(child);
		if(!newChildAccount) return;
		setChildAccounts([...childAccounts, newChildAccount]);
		setIsDialogOpen(false);
	};

	const {user} = useContext(AuthContext)!
	useEffect(()=>{
		if (user && user._id) {
			console.log('getting child accounts');
			client.getChildAccounts(user._id)
				.then((childAccounts:ChildAccount[]|null) => {
					console.log(`childAccounts found: ${JSON.stringify(childAccounts)}`);
					if(childAccounts)
						setChildAccounts(childAccounts);
				});
		}
	}, [user, client]);

	useEffect(()=>{

		const fetchPendingRequests = async () => {
			try {
				if(!user?._id) return;
				const requests = await client.getPendingRequestsForParent(user!._id);
				setPendingRequests(requests);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPendingRequests();

	},[client, user])

	const getPendingRequestsForChild = (childId: string) => {
		if(!pendingRequests || !pendingRequests.length) return;
		return pendingRequests?.filter((request) => request.childId === childId);
	}

	const onRequestApproval = async (request: Transaction) => {
		try{
			const remainingPendingRequests = await client.approveRequest({...request, approved: ApprovalStatus.Approved});
			const updatedChildAccounts = childAccounts.map((child) => {
				if (child._id === request.childId) {
					child.balance -= request.amount;
				}
				client.updateChildAccount(child);
				return child;
			});
			setChildAccounts(updatedChildAccounts);
			setPendingRequests(remainingPendingRequests);
		} catch (error) {
			console.log(error);
		}
	}

	const onRequestDenied = async (request: Transaction) => {
		try{
			const remainingPrendingRequests = await client.rejectRequest({...request, approved: ApprovalStatus.Rejected});
			setPendingRequests(remainingPrendingRequests);
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
					<div key={child._id}>
						<div>{child.displayName}</div>
						{/*<Button buttonText="Delete" className={'ml-4'} onButtonPressed={() => onDeletePressed(child.id)}/> to be implemented in issue #12*/}
						{getPendingRequestsForChild(child._id!)?.map((request:Transaction) => (
							<div  key={request._id} className={'my-4'}>
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
				{ user!==null ? <p>Logged in</p> : <p>Not logged in</p>}
			</div>
			<CreateChildAccountDialog isOpen={isDialogOpen} onRequestClose={()=> setIsDialogOpen(false)} onCreateChildAccount={handleCreateChildAccount}/>
		</>
	)
}
