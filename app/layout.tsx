import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Nav from "./nav";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({children}: {  children: React.ReactNode}) {
	const navLinks = [
		{href: "/", text: "Home"},
		{href: "/dashboard", text: "Dashboard"},
		{href: "/dashboard/parent", text: "Parent Dashboard"},
	];
	return (
		<html lang="en">
			<body className={inter.className}>
				<Nav links={navLinks}/>
				<div className={"mt-8"}>
					{children}
				</div>
			</body>
		</html>
	);
}
