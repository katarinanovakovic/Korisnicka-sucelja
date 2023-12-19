"use client";
import { useState } from "react";

import Logo from "@/components/Logo";
import MainNav from "@/components/MainNav";
import Hamburger from "@/components/Hamburger";
import MobileNav from "@/components/MobileNav";

export type Page = {
  href: string;
  title: string;
};

// Get this info from some external source (e.g. CMS)
const pages: Page[] = [
  { href: "/", title: "Home" },
  { href: "/recipes", title: "Recipes" },
  { href: "/diet", title: "Diet" },
  { href: "/blog", title: "Blog" },
  { href: "/about", title: "About Us" },
  { href: "/login", title: "Log In" },
  //{ href: "/cms/products", title: "Products" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container flex items-center justify-between">
      <Logo />
      <MainNav pages={pages} />
      <Hamburger open={open} clickHandler={setOpen} />
      <MobileNav open={open} clickHandler={setOpen} pages={pages} />
    </div>
  );
};

export default NavBar;
