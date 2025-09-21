import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navlinks, secondaryNavlinks } from "@/lib/data/global";
import { renderIcon } from "@/lib/utils/iconMapper";
import { Menu, X, User } from "lucide-react";
import { IoLogOut } from "react-icons/io5";

// Define types for the navlinks
interface NavSubItem {
  path: string;
  label: string;
  icon?: string;
}

interface SecondaryNavSubItem {
  path: string;
  label: string;
  icon?: string;
}

// Extend the SecondaryNavLink type to include children
interface SecondaryNavLinkWithChildren extends SecondaryNavLink {
  children?: SecondaryNavSubItem[];
}

// Ensure the SecondaryNavLink type is available
interface SecondaryNavLink {
  path: string;
  label: string;
}

// A simplified navbar component specifically for Edge browsers
const EdgeNavbar = ({ 
  user, 
  pathname, 
  sidebarOpen, 
  controlMenu 
}: { 
  user: any; 
  pathname: string; 
  sidebarOpen: boolean; 
  controlMenu: (action: boolean) => void;
}) => {
  return (
    <div className="edge-navbar">
      {/* Two-Layer Horizontal Navigation Layout */}
      <nav className="bg-black fixed top-0 left-0 w-full h-auto flex flex-col z-[1000]">
        {/* Layer 1 - Top Bar: Main Navigation */}
        <div className="lg:border-b lg:border-deepGold/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/svgs/logo.svg"
                    alt="NESA Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>
            
              {/* Desktop Navigation - Layer 1 */}
              <div className="hidden lg:flex items-center space-x-6">
                {navlinks.map((item, index) => (
                  <div key={index} className="relative group">
                    {item.children ? (
                      <>
                        <button className="text-gray-200 hover:text-deepGold font-medium flex items-center">
                          {item.label}
                          <span className="ml-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transition-transform group-hover:rotate-180"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </span>
                        </button>
                        <div className="absolute left-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          {item.children.map((subitem, subindex) => (
                            <Link
                              key={subindex}
                              href={subitem.path}
                              className="flex items-center px-4 py-3 hover:bg-gray-800 text-gray-200 hover:text-deepGold border-b border-gray-700 last:border-0"
                            >
                              <span className="mr-3 text-gray-400">
                                {subitem.icon && renderIcon({ name: subitem.icon, size: 18 })}
                              </span>
                              {subitem.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.path}
                        className={`text-gray-200 hover:text-deepGold font-medium ${
                          pathname === item.path ? "text-deepGold" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Navigation - Layer 2 */}
              <div className="hidden lg:flex items-center space-x-4">
                {secondaryNavlinks.map((item: SecondaryNavLinkWithChildren, index) => (
                  <div key={index} className="relative group">
                    {item.children ? (
                      <>
                        <button className="text-gray-300 hover:text-deepGold text-sm font-medium flex items-center">
                          {item.label}
                          <span className="ml-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transition-transform group-hover:rotate-180"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </span>
                        </button>
                        <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          {item.children && item.children.map((subitem, subindex) => (
                            <Link
                              key={subindex}
                              href={subitem.path}
                              className="flex items-center px-4 py-3 hover:bg-gray-800 text-gray-200 hover:text-deepGold border-b border-gray-700 last:border-0"
                            >
                              <span className="mr-3 text-gray-400">
                                {subitem.icon && renderIcon({ name: subitem.icon, size: 18 })}
                              </span>
                              {subitem.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.path}
                        className={`text-gray-300 hover:text-deepGold text-sm font-medium ${
                          pathname === item.path ? "text-deepGold" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* User menu or login button */}
                {user ? (
                  <div className="relative group">
                    <button className="flex items-center text-gray-200 hover:text-deepGold">
                      <User size={20} className="mr-1" />
                      <span className="text-sm font-medium">Account</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-800 hover:text-deepGold border-b border-gray-700"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-800 hover:text-deepGold border-b border-gray-700"
                      >
                        Profile
                      </Link>
                      <button
                        className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-800 hover:text-deepGold flex items-center"
                      >
                        <IoLogOut className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/account/login"
                    className="bg-deepGold hover:bg-amber-500 text-black font-medium py-2 px-4 rounded-md text-sm transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => controlMenu(true)}
                  className="text-gray-200 hover:text-deepGold"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Layer 2 - Bottom Bar: Secondary Navigation - Desktop Only */}
        <div className="hidden lg:block bg-gray-900">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-center items-center">
              {secondaryNavlinks.map((item: SecondaryNavLinkWithChildren, index) => (
                <div key={index} className="relative group">
                  {item.children ? (
                    <>
                      <button className="text-gray-300 hover:text-deepGold text-sm font-medium flex items-center">
                        {item.label}
                        <span className="ml-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform group-hover:rotate-180"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </button>
                      <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        {item.children && item.children.map((subitem, subindex) => (
                          <Link
                            key={subindex}
                            href={subitem.path}
                            className="flex items-center px-4 py-3 hover:bg-gray-800 text-gray-200 hover:text-deepGold border-b border-gray-700 last:border-0"
                          >
                            <span className="mr-3 text-gray-400">
                              {subitem.icon && renderIcon({ name: subitem.icon, size: 18 })}
                            </span>
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      className={`text-gray-300 hover:text-deepGold text-sm font-medium ${
                        pathname === item.path ? "text-deepGold" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 z-50 lg:hidden transition-opacity ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-0 right-0 w-full max-w-sm h-full bg-gray-900 transform transition-transform ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-5 border-b border-gray-800 flex justify-between items-center">
            <Image
              src="/svgs/logo.svg"
              alt="NESA Logo"
              width={100}
              height={32}
              className="h-8 w-auto"
            />
            <button
              onClick={() => controlMenu(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            <div className="py-4">
              {navlinks.map((item, index) => (
                <div key={index} className="px-4 py-2">
                  {item.children ? (
                    <div className="mb-2">
                      <div className="text-gray-200 font-medium mb-2">
                        {item.label}
                      </div>
                      <div className="pl-4 border-l border-gray-700">
                        {item.children.map((subitem, subindex) => (
                          <Link
                            key={subindex}
                            href={subitem.path}
                            className="flex items-center py-2 text-gray-400 hover:text-deepGold"
                            onClick={() => controlMenu(false)}
                          >
                            <span className="mr-3">
                              {subitem.icon && renderIcon({ name: subitem.icon, size: 16 })}
                            </span>
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`block py-2 text-gray-200 hover:text-deepGold font-medium ${
                        pathname === item.path ? "text-deepGold" : ""
                      }`}
                      onClick={() => controlMenu(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="border-t border-gray-800 mt-4 pt-4">
                {secondaryNavlinks.map((item: SecondaryNavLinkWithChildren, index) => (
                  <div key={index} className="px-4 py-2">
                    {item.children ? (
                      <div className="mb-2">
                        <div className="text-gray-300 font-medium mb-2 text-sm">
                          {item.label}
                        </div>
                        <div className="pl-4 border-l border-gray-700">
                          {item.children && item.children.map((subitem, subindex) => (
                            <Link
                              key={subindex}
                              href={subitem.path}
                              className="flex items-center py-2 text-gray-400 hover:text-deepGold text-sm"
                              onClick={() => controlMenu(false)}
                            >
                              <span className="mr-3">
                                {subitem.icon && renderIcon({ name: subitem.icon, size: 16 })}
                              </span>
                              {subitem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.path}
                        className={`block py-2 text-gray-300 hover:text-deepGold text-sm ${
                          pathname === item.path ? "text-deepGold" : ""
                        }`}
                        onClick={() => controlMenu(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="px-4 py-4 mt-4">
                {user ? (
                  <>
                    <div className="text-gray-200 font-medium mb-4 flex items-center">
                      <User size={18} className="mr-2" />
                      Account
                    </div>
                    <Link
                      href="/dashboard"
                      className="block py-2 text-gray-300 hover:text-deepGold"
                      onClick={() => controlMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block py-2 text-gray-300 hover:text-deepGold"
                      onClick={() => controlMenu(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="flex items-center py-2 text-gray-300 hover:text-deepGold"
                    >
                      <IoLogOut className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full bg-deepGold hover:bg-amber-500 text-black font-medium py-2 px-4 rounded-md text-center"
                    onClick={() => controlMenu(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeNavbar;