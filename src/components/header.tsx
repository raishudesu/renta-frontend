import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={"/"} className="flex items-center">
          <div className="relative w-10 h-10">
            <Image src={"/logos/renta-logo.svg"} alt="renta-logo" fill />
          </div>
          <span className="text-2xl font-extrabold bg-clip-text">Renta</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            How it Works
          </Link>
          <Link
            href="#pricing"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Pricing
          </Link>
          <Button variant="outline" asChild>
            <Link href={"/login"}>Sign In</Link>
          </Button>
          <Button>Get Started</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
