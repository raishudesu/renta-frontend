import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10">
                <Image src={"/logos/renta-logo.svg"} alt="renta-logo" fill />
              </div>
              <span className="text-2xl font-extrabold bg-clip-text">
                Renta
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Simplifying vehicle rentals with innovative QR code technology.
            </p>
            <div className="text-sm text-gray-400">
              Book, Scan, Drive - It&lsquo;s that simple.
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#open-source"
                  className="hover:text-white transition-colors"
                >
                  Open Source
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="https://github.com/raishudesu"
                  className="hover:text-white transition-colors"
                >
                  Visit Developer Github
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Renta</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
