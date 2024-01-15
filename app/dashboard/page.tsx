'use client'
import {useContext} from "react";
import Login from "../components/Login";
import ChildDashboard from "./ChildDashboard";
import ParentDashboard from "./ParentDashboard";
import {AuthContext} from "@contexts/AuthContext";

export default function Dashboard() {
	const {user} = useContext(AuthContext)!;

	const renderUserStatus = user
	?	<div>
			{"balance" in user ? <ChildDashboard/> : <ParentDashboard/>}
		</div>

	:	<div className={"xl:w-1/3 sm:w-full"}>
			<p className={"mb-4"}>Not logged in</p>
			<Login/>
		</div>;

	return (
		<div className={"mx-4"}>
			{user ? null : <h1 className={"mb-4"}>Welcome to the Dashboard</h1>}
			{renderUserStatus}
		</div>
	);
}
