'use client';
import Link from "next/link";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";

export type NavLink = {
	href: string,
	text: string
}
export default function Nav() {
	const authContext = useContext(AuthContext)!;
	const navLinks : NavLink[] = [
		{href: "/", text: "Home"},
		{href: "/dashboard", text: "Dashboard"}
	];

	const {user,logout} = authContext;
	return (
		<div className={"border-b-2"}>
			<div className={"flex mx-4 mt-4 pb-2"}>
				{navLinks.map((link) => (
					<Link key={link.href} href={link.href} className={"mx-2"}>{link.text}</Link>
				))}
				<div className={"flex-grow"}/>
				{user ? <Link key={"#"} href={"#"} onClick={logout}>Logout</Link> : null}
			</div>
		</div>
	);
}
