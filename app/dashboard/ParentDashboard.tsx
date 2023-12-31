import Button from "../components/Button";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";

export default function ParentDashboard() {
	const createChildAccount = () => {
		console.log("Create Child Account");
	}
	const user = useContext(UserContext)!;
	return(
		<>
			<div>Welcome to the parent dashboard</div>
			<sub>More neat things to come soon!</sub>
			<div className={"flex-col"}>
				<Button className={"my-4"} buttonText="Create Child Account" onButtonPressed={createChildAccount}/>

				{ user!==null ? <p>Logged in as {user.displayName}</p> : <p>Not logged in</p>}
			</div>
		</>
	)
}
