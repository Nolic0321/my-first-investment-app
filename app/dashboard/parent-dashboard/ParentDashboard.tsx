import Button from "../../components/Button";
import {useContext, useEffect, useState} from "react";
import {CreateChildAccountDialog} from "./CreateChildAccountDialog";
import {ClientContext} from "@contexts/ClientContext";
import {ChildAccount} from "@models/child-account";
import {Transaction} from "@models/transaction";
import {AuthContext} from "@contexts/AuthContext";
import IClient from "@models/client";
import {ChildPreview} from "./ChildPreview";

export default function ParentDashboard() {
	const [childAccounts, setChildAccounts] = useState<ChildAccount[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [pendingRequests, setPendingRequests] = useState<Transaction[]>([]);
	const [loadingChildAccounts, setLoadingChildAccounts] = useState(true);
	const client = useContext(ClientContext) as unknown as IClient

	const handleCreateChildAccount = async (child: ChildAccount) => {
		setLoadingChildAccounts(true);
		const newChildAccount = await client.addChildUser(child);
		if(!newChildAccount) return;
		setChildAccounts([...childAccounts, newChildAccount]);
		setIsDialogOpen(false);
		setLoadingChildAccounts(false);
	};

	const {user} = useContext(AuthContext)!
	useEffect(()=>{
		if (user && user._id && client) {
			client.getChildAccounts(user._id)
				.then((childAccounts:ChildAccount[]|null) => {
					if(childAccounts) {
						setChildAccounts(childAccounts);
						setLoadingChildAccounts(false);
					}
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



	return(
		<>
			<div>Welcome to the parent dashboard</div>
			<sub>More neat things to come soon!</sub>
			{loadingChildAccounts && <div className={"flex flex-col"}>Loading child accounts...</div>}
			{!loadingChildAccounts &&
			<div className={"flex flex-col grid-flow-row gap-4 lg:w-1/3 sm:w-full mt-4"}>
				{childAccounts.map((child) => (
					<div key={child._id}>
						<ChildPreview child={child} onChildSelected={()=>console.log(`child selected`)}/>
					</div>
				))}
				<div>
					<Button className={"my-4"} buttonText="Create Child Account" onButtonPressed={() => setIsDialogOpen(true)}/>
				</div>
				{ user!==null ? <p>Logged in</p> : <p>Not logged in</p>}
			</div>
			}
			<CreateChildAccountDialog isOpen={isDialogOpen} onRequestClose={()=> setIsDialogOpen(false)} onCreateChildAccount={handleCreateChildAccount}/>
		</>
	)
}
