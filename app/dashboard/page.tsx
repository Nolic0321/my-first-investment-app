'use client'
import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import Login from "../components/Login";
import ChildDashboard from "./ChildDashboard";
import ParentDashboard from "./ParentDashboard";

export default function Dashboard() {
	const user = useContext(UserContext);

	const renderUserStatus = user
	?	<div>
			<p>Logged in as {user.displayName}</p>
			{"balance" in user ? <ChildDashboard/> : <ParentDashboard/>}
		</div>

	:	<div className={"w-1/3"}>
			<p className={"mb-4"}>Not logged in</p>
			<Login/>
		</div>;

	return (
		<div className={"ml-4"}>
			<h1 className={"mb-4"}>Welcome to the Dashboard</h1>

			{renderUserStatus}
		</div>
	);
}
