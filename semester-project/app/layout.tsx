import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import Dropdown from "./dropDown/page"; 
import Button from "@/components/Button";

const pages = {
  Home: "/", 
  Recipes: "/recipes/all",
  Diet: "/diet",
  About: "/about",
  LogIn: "/LogIn",
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js lab project",
  description: "Next.js lab project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex items-center justify-center p-4">
          <ul className="flex gap-8">
            {Object.entries(pages).map(([name, path]) => (
              <li key={name}>
                {name === 'Recipes' ? 
                (<Dropdown/>):
                (<Link href={path}>{name}</Link>)}
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
