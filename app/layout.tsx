import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
const cormorant = Cormorant_Garamond({ subsets:["latin"], variable:"--font-cormorant", weight:["400","500","600","700"] });
const playfair = Playfair_Display({ subsets:["latin"], variable:"--font-playfair", weight:["400","500","600","700"] });
export const metadata: Metadata = { title:"N & B — Nikkah Invitation", description:"A luxury interactive Nikkah invitation." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${cormorant.variable} ${playfair.variable}`}>{children}</body></html>}