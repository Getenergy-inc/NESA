'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from "@/components/Layout/Footer";
// TEMPORARILY DISABLED: Authentication removed for development/testing
// import JudgeProtectedRoute from "@/components/Common/JudgeProtectedRoute";
import { IoNotificationsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

interface JudgeLayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  href: string;
  label: string;
  isHighlighted?: boolean;
  mobile?: boolean;
}

interface NavDropdownProps {
  label: string;
  items: { href: string; label: string }[];
  mobile?: boolean;
}

function NavItem({ href, label, isHighlighted, mobile }: NavItemProps) {
  const baseClasses = "py-2 px-3 rounded transition-colors";
  const mobileClasses = mobile ? "block w-full text-center mb-2" : "";
  const highlightedClasses = isHighlighted ? "text-[#f6b146]" : "hover:bg-[#f6b146] hover:text-[#191307]";

  return (
    <Link href={href} className={`${baseClasses} ${mobileClasses} ${highlightedClasses}`}>
      {label}
    </Link>
  );
}

function NavDropdown({ label, items, mobile }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${mobile ? 'w-full' : ''}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center py-2 px-3 rounded transition-colors ${
          mobile ? 'w-full justify-center' : ''
        } hover:bg-[#f6b146] hover:text-[#191307]`}
      >
        {label} <RiArrowDropDownLine className="ml-1" />
      </button>
      {isOpen && (
        <div className={`${mobile ? 'relative' : 'absolute'} bg-[#191307E6] p-2 rounded-md ${mobile ? 'mt-2' : 'mt-1'}`}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 px-3 hover:bg-[#f6b146] hover:text-[#191307] rounded transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JudgeLayout({ children }: JudgeLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // TEMPORARILY DISABLED: Authentication removed for development/testing
    // <JudgeProtectedRoute requireActiveJudge={true}>
      <div className="flex flex-col min-h-screen ">
        <nav className="text-white py-4 bg-[#17120a] fixed w-full z-50">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image src="/svgs/logo.svg" alt="NEW EDUCATION STANDARD AWARDS AFRICA" width={150} height={50} />
            </Link>
            <div className="hidden md:flex space-x-6 items-center">
              <NavItem href="/judge" label="Home" />
              <NavDropdown label="Nomination" items={[
                { href: "/nomination/sub-categories/africa-lifetime-education-icon", label: "African Icon" },
                { href: "/judge/competitive", label: "Competitive" },
                { href: "/judge/non-competitive", label: "Non-Competitive" },
                { href: "/judge/SeeAll", label: "See All" },
              ]} />
              <NavDropdown label="Judges Arena" items={[
                { href: "/judge/SeeJudges", label: "See Judges" },
                { href: "/chatroom", label: "Judge Chat Room" },
              ]} />
              <NavDropdown label="Reviews" items={[
                { href: "/judge/JudgeReview", label: "JudgeReview" },
              ]} />
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-white rounded-full p-2 text-[#36322f] hover:bg-[#f6b146] transition-colors">
                <IoNotificationsSharp size={20} />
              </button>
              <button className="bg-[#f6b146] rounded-full p-2 text-[#36322f] hover:bg-white transition-colors">
                <CgProfile size={20} />
              </button>
            </div>
            <button className="md:hidden text-white" onClick={toggleMenu}>
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden bg-[#191307E6] mt-2 p-4">
              <NavItem href="/judge" label="Home" mobile />
              <NavItem href="/judge/nomination" label="Nomination" isHighlighted mobile />
              <NavDropdown label="Judges Arena" items={[
                { href: "/judge/SeeJudges", label: "See Judges" },
                { href: "/judge/JudgeChat", label: "Judge Chat Room" },
              ]} mobile />
              <NavDropdown label="Reviews" items={[
                { href: "/judge/JudgeReview", label: "JudgeReview" },
              ]} mobile />
              <div className="flex justify-center mt-4 space-x-4">
                <button className="bg-white rounded-full p-2 text-[#36322f] hover:bg-[#f6b146] transition-colors">
                  <IoNotificationsSharp size={20} />
                </button>
                <button className="bg-[#f6b146] rounded-full p-2 text-[#36322f] hover:bg-white transition-colors">
                  <CgProfile size={20} />
                </button>
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow pt-16 md:pt-0">
          {children}
        </main>

        <Footer />
      </div>
    // </JudgeProtectedRoute>
  );
}