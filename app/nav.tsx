'use client';
import Link from "next/link";
import {useAppSelector, useAppDispatch} from "@hooks/hooks";
import {clearUser, setUser, selectUser} from "@reducers/userSlice";

export type NavLink = {
	href: string,
	text: string
}
export default function Nav() {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const navLinks : NavLink[] = [
		{href: "/", text: "Home"},
		{href: "/dashboard", text: "Dashboard"}
	];
	return (
		<div className={"border-b-2"}>
			<div className={"flex mx-4 mt-4 pb-2"}>
				{navLinks.map((link) => (
					<Link key={link.href} href={link.href} className={"mx-2"}>{link.text}</Link>
				))}
				<div className={"flex-grow"}/>
				{user ? <Link key={"#"} href={"#"} onClick={()=>dispatch(clearUser())}>Logout</Link> : null}
			</div>
		</div>
	);
}
