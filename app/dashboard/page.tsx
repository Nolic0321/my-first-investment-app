'use client'
import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import Login from "../components/Login";
import ChildDashboard from "./ChildDashboard";
import ParentDashboard from "./ParentDashboard";

export default function Dashboard() {
	const {currentUser} = useContext(UserContext)!;

	const renderUserStatus = currentUser
	?	<div>
			{"balance" in currentUser ? <ChildDashboard/> : <ParentDashboard/>}
		</div>

	:	<div className={"xl:w-1/3 sm:w-full"}>
			<p className={"mb-4"}>Not logged in</p>
			<Login/>
		</div>;

	return (
		<div className={"mx-4"}>
			{currentUser ? null : <h1 className={"mb-4"}>Welcome to the Dashboard</h1>}
			{renderUserStatus}
		</div>
	);
}
