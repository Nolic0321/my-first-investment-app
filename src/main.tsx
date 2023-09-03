import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./pages/Root.tsx";
import {RootRoute, Route, Router, RouterProvider} from "@tanstack/router";
import Index from "./pages/Index.tsx";
import MySavings from "./pages/MySavings.tsx";

const rootRoute = new RootRoute({
	component: Root,
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Index
});

const mySavingsRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/mysavings",
	component: MySavings
});

const routeTree = rootRoute.addChildren([indexRoute, mySavingsRoute]);
const router = new Router({routeTree});
declare module "@tanstack/router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
				<RouterProvider router={router}/>
		</React.StrictMode>
	);
}
