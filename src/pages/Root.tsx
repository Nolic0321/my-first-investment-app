import {Link, Outlet} from "@tanstack/router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";

export default function Root() {

	return (
		<div className={'flex grow flex-col'}>
			<div className={'pt-4 pl-20 pr-20 flex flex-row items-center place-content-between'}>
				<Link to={"/"}>Home</Link>
				<Link to={"/mysavings"}>My Savings</Link>
			</div>
			<hr/>
			<div className={'pt-10'}>
				<Outlet/>
			</div>

			<TanStackRouterDevtools initialIsOpen={false}/>
		</div>
	);
}
