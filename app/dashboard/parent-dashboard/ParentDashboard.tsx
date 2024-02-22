import Button from "../../components/Button";
import {useEffect, useState} from "react";
import {CreateChildAccountDialog} from "./CreateChildAccountDialog";
import {ChildAccount} from "@models/child-account";
import {ChildPreview} from "./ChildPreview";
import {selectClient} from "@reducers/clientSlice";
import {useAppSelector} from "@hooks/hooks";
import {selectUser} from "@reducers/userSlice";

export default function ParentDashboard() {
	const user = useAppSelector(selectUser);
	const client = useAppSelector(selectClient);
	const [childAccounts, setChildAccounts] = useState<ChildAccount[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [loadingChildAccounts, setLoadingChildAccounts] = useState(true);

	const handleCreateChildAccount = async (child: ChildAccount) => {
		setLoadingChildAccounts(true);
		setChildAccounts([...childAccounts, child]);
		setIsDialogOpen(false);
		setLoadingChildAccounts(false);
	};

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
