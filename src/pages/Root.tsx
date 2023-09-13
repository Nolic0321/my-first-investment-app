import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import React from "react";

export default function Root() {

	return (
		<div>
			<div className={"pt-4 pl-20 pr-20 flex flex-row w-full"}>
				<Link to={"/"} className={"p-1"}>Home</Link>
				<Link to={"/mysavings"} className={"p-1"}>My Savings</Link>
			</div>
			<hr/>
			<div className={"flex grow flex-col h-screen items-center"}>
				<div className={"pt-10 w-80 "}>
					<Outlet/>
				</div>

				<TanStackRouterDevtools initialIsOpen={false}/>
			</div>
		</div>
	);
}
