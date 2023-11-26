import Link from "next/link";

export type NavLink = {
	href: string,
	text: string
}

export type NavProps = {
	links: Array<NavLink>
}
export default function Nav({links}: NavProps) {
	return (
		<div className={"border-b-2"}>
			<div className={"flex ml-4 mt-4 pb-2"}>
				{links.map((link) => (
					<Link key={link.href} href={link.href} className={"mx-2"}>{link.text}</Link>
				))}
			</div>
		</div>
	);
}
