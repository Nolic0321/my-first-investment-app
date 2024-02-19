'use client'
import {useContext} from "react";
import Login from "../components/Login";
import ChildDashboard from "./child-dashboard/ChildDashboard";
import ParentDashboard from "./parent-dashboard/ParentDashboard";
import {AuthContext} from "@contexts/AuthContext";

export default function Dashboard() {
	const {user} = useContext(AuthContext)!;

	const renderUserStatus = user
	?	<div>
			{user.isChildAccount ? <ChildDashboard/> : <ParentDashboard/>}
		</div>

	:	<div className={"sm:w-full"}>
			<Login/>
		</div>;

	return (
		<div className={""}>
			{user ? null : <h1 className={"mb-4"}>Welcome to the Dashboard</h1>}
			{renderUserStatus}
		</div>
	);
}
