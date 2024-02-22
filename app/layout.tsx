'use client';
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Nav from "./nav";
import React from "react";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/react";
import {Provider} from "react-redux";
import store from "./store";
import {fetchClient} from "@reducers/clientSlice";

const inter = Inter({subsets: ["latin"]});

// export const metadata: Metadata = {
//     title: "My First Investment App",
//     description: "Kids 'invest', parents save, everyone wins!",
// };

export default function RootLayout({children}: { children: React.ReactNode }) {
	store.dispatch(fetchClient);
	return (
		<html lang="en">
		<body className={inter.className}>
		<SpeedInsights/>
		<Provider store={store}>
			<Nav/>
			<div id={"main"} className={"mt-8 ml-4"}>
				{children}
			</div>
			<Analytics/>
		</Provider>
		</body>
		</html>
	);
}
