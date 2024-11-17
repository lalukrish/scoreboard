"use client";

import React from "react";
import { Link as ScrollLink } from "react-scroll"; // Alias to avoid conflicts with next/link
import Link from "next/link"; // For navigation to other pages

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white z-50">
      <nav className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">Writeup100</h1>
        <div className="flex space-x-4">
          {/* Internal scrolling links */}
          <ScrollLink
            to="hero"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="winners"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            Winners
          </ScrollLink>
          {/* External navigation using next/link */}
          <Link href="/signup" passHref>
            <span className="cursor-pointer">Signup</span>
          </Link>
          <Link href="/signin" passHref>
            <span className="cursor-pointer">Signin</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
