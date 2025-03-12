import {useContext, useEffect, useState} from "react";
import {CreateChildAccountDialog} from "./CreateChildAccountDialog";
import {ClientContext} from "@contexts/ClientContext";
import {ChildAccount} from "@models/child-account";
import {AuthContext} from "@contexts/AuthContext";
import IClient from "@models/client";
import {ChildPreview} from "./ChildPreview";
import Button from "@components/button/Button";

export default function ParentDashboard() {
	const [childAccounts, setChildAccounts] = useState<ChildAccount[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [loadingChildAccounts, setLoadingChildAccounts] = useState(true);
	const client = useContext(ClientContext) as unknown as IClient;

	const handleCreateChildAccount = async (child: ChildAccount) => {
		setLoadingChildAccounts(true);
		setChildAccounts([...childAccounts, child]);
		setIsDialogOpen(false);
		setLoadingChildAccounts(false);
	};

	const {user} = useContext(AuthContext)!;
	useEffect(() => {
		if (user && user._id && client) {
			client.getChildAccounts(user._id)
				.then((childAccounts: ChildAccount[] | null) => {
					if (childAccounts) {
						setChildAccounts(childAccounts);
						setLoadingChildAccounts(false);
					}
				});
		}
	}, [user, client]);


	return (
		<>
			<div>Welcome to the parent dashboard</div>
			{loadingChildAccounts && <div className={"flex flex-col"}>Loading child accounts...</div>}
			{!loadingChildAccounts &&
				<div className={"flex flex-col grid-flow-row gap-4 mt-4"}>
					{childAccounts.map((child) => (
						<div key={child._id}>
							<ChildPreview child={child} onChildSelected={() => console.log(`child selected`)}/>
						</div>
					))}
					<div className={"flex flex-row grid-flow-row gap-1"}>
						<Button buttonText="Create Child Account" onButtonPressed={() => setIsDialogOpen(true)}/>
					</div>
				</div>
			}
			<CreateChildAccountDialog isOpen={isDialogOpen} onRequestClose={() => setIsDialogOpen(false)}
									  onCreateChildAccount={handleCreateChildAccount}/>
			<section>
				<div>This is a test</div>
				<div><span className={'font-bold'}>THIS IS BOLD</span> however <span
					className={'italic'}>this is italic</span><span className={"material-symbols-outlined"}>stat_1</span>
				</div>
			</section>
		</>
	);
}
