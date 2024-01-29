import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Nav from "./nav";
import React from "react";
import {AuthProvider} from "./context/AuthContext";
import {ClientProvider} from "./context/ClientContext";
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Analytics} from "@vercel/analytics/react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "My First Investment App",
    description: "Kids 'invest', parents save, everyone wins!",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <SpeedInsights/>
        <ClientProvider>
            <AuthProvider>
                <Nav/>
                    <div id={"main"} className={"mt-8 ml-4"}>
                        {children}
                    </div>
                <Analytics/>
            </AuthProvider>
        </ClientProvider>
        </body>
        </html>
    );
}
