'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from "@/components/Layout/Footer";
import { IoNotificationsOutline, IoSettingsOutline, IoWalletOutline, IoShirtOutline, IoVideocamOutline, IoDocumentTextOutline, IoCalendarOutline, IoStarOutline, IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuthContext } from '@/lib/context/AuthContext';
import { Wallet, Zap, ArrowUpRight, Gift, Users, Vote, ShoppingCart, ArrowDown, Clock, X } from 'lucide-react';
// Types
interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  subItems?: MenuItem[];
  isHighlighted?: boolean;
}

interface MemberLayoutProps {
  children: React.ReactNode;
}
const balance = 1250;
// Menu Configuration - Centralized and maintainable
const mainMenuConfig: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/member",
    icon: <IoSettingsOutline className="h-5 w-5" />,
    isHighlighted: true
  },
  {
    label: "Vote",
    href: "/member/vote",
    icon: <IoStarOutline className="h-5 w-5" />
  },
  {
    label: "Nominate",
    href: "/nomination",
    icon: <IoPersonOutline className="h-5 w-5" />
  },
  {
    label: "NESA TV",
    icon: <IoVideocamOutline className="h-5 w-5" />,
    subItems: [
      {
        label: "Award Videos",
        href: "/nesatv",
        icon: <IoDocumentTextOutline className="h-4 w-4" />
      },
      {
        label: "Documentaries",
        href: "/member/nesa-tv/documentaries",
        icon: <IoVideocamOutline className="h-4 w-4" />
      },
      {
        label: "Live Events",
        href: "/member/nesa-tv/live",
        icon: <IoCalendarOutline className="h-4 w-4" />
      }
    ]
  },
  {
    label: "Shop",
    icon: <IoShirtOutline className="h-5 w-5" />,
    subItems: [
      {
        label: "Award Tickets",
        href: "/member/shop/tickets",
        icon: <IoDocumentTextOutline className="h-4 w-4" />
      },
      {
        label: "Merchandise",
        href: "/member/shop/merchandise",
        icon: <IoShirtOutline className="h-4 w-4" />
      },
      {
        label: "VIP Packages",
        href: "/member/shop/vip",
        icon: <IoStarOutline className="h-4 w-4" />
      }
    ]
  }
];

const notificationItems = [
  {
    label: "New nomination received",
    href: "/member/notifications",
    icon: <IoPersonOutline className="h-5 w-5" />,
    timestamp: "2 hours ago"
  },
  {
    label: "Payment confirmation #12345",
    href: "/member/notifications",
    icon: <IoWalletOutline className="h-5 w-5" />,
    timestamp: "5 hours ago"
  },
  {
    label: "Event reminder: Annual Gala",
    href: "/member/notifications",
    icon: <IoCalendarOutline className="h-5 w-5" />,
    timestamp: "1 day ago"
  }
];

const profileItems = [
  {
    label: "My Profile",
    href: "/member/profile",
    icon: <IoPersonOutline className="h-4 w-4" />
  },
  {
    label: "Account Settings",
    href: "/member/settings",
    icon: <IoSettingsOutline className="h-4 w-4" />
  },
  {
    label: "Wallet",
    href: "/member/wallet",
    icon: <IoWalletOutline className="h-4 w-4" />
  },
  {
    label: "Referrals",
    href: "/member/referrals",
    icon: <IoPersonOutline className="h-4 w-4" />
  },
  {
    label: "Upgrade Account",
    href: "/member/upgrade",
    icon: <IoStarOutline className="h-4 w-4" />
  },
  {
    label: "Support",
    href: "/member/support",
    icon: <IoDocumentTextOutline className="h-4 w-4" />
  },
  {
    label: "Logout",
    onClick: () => console.log("Logging out..."),
    icon: <IoLogOutOutline className="h-4 w-4" />
  }
];

// Wallet Info Component

const WalletInfo = () => (
  <div className="flex items-center space-x-4 bg-[#191307E6] rounded-lg px-6 py-4 shadow-md">
    {/* Wallet Icon */}
    <div className="flex items-center justify-center bg-[#f6b146] text-[#191307] rounded-full w-10 h-10">
       <Zap className="flex items-center"  style={{ color: '#FFF' }} />
    </div>

    {/* Balance Info */}
    <div className="flex items-center">
               
                <span className="text-2xl font-bold text-white">{balance.toLocaleString()}</span>
                <span className="ml-1 text-sm text-gray-400">pts</span>
              </div>

  </div>
);

// Navigation Item Component
const NavItem = ({ item, mobile = false }: { item: MenuItem; mobile?: boolean }) => {
  const baseClasses = "flex items-center py-2 px-4 rounded-lg transition-colors whitespace-nowrap";
  const mobileClasses = mobile ? "block w-full text-left mb-2" : "";
  const highlightedClasses = item.isHighlighted ? "bg-[#f6b146] text-[#191307]" : "hover:bg-[#f6b146] hover:text-[#191307]";

  return (
    <Link
      href={item.href || "#"}
      className={`${baseClasses} ${mobileClasses} ${highlightedClasses}`}
    >
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
    </Link>
  );
};

// Dropdown Component
const NavDropdown = ({ item, mobile = false }: { item: MenuItem; mobile?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${mobile ? "w-full" : ""}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
          mobile ? "w-full justify-start" : ""
        } hover:bg-[#f6b146] hover:text-[#191307] whitespace-nowrap`}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label} <RiArrowDropDownLine className="ml-1" />
      </button>
      {isOpen && (
        <div
          className={`${
            mobile ? "relative w-full" : "absolute left-0"
          } bg-[#191307E6] p-2 rounded-lg ${mobile ? "mt-2" : "mt-1"} min-w-[200px] z-50 shadow-xl`}
        >
          {item.subItems?.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href || "#"}
              className="flex items-center py-2 px-3 hover:bg-[#f6b146] hover:text-[#191307] rounded transition-colors text-sm"
            >
              {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Right Side Icon Dropdown Component
const NotificationDropdown = ({
  icon,
  items,
  badge,
  mobile = false
}: {
  icon: React.ReactNode;
  items: { href?: string; label: string; icon?: React.ReactNode; onClick?: () => void; timestamp?: string }[];
  badge?: number;
  mobile?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${mobile ? "mx-1" : "ml-2"}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`relative p-2 rounded-full transition-colors ${
          mobile ? "bg-white text-[#36322f]" : "bg-white text-[#36322f]"
        } hover:bg-[#f6b146]`}
      >
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div
          className={`${
            mobile 
              ? "fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              : "absolute right-0 mt-2 bg-[#191307E6] rounded-lg shadow-xl min-w-[320px]"
          }`}
        >
          {/* Mobile Full-screen Notification Panel */}
          {mobile && (
            <div className="absolute bottom-0 w-full bg-[#191307] rounded-t-2xl shadow-lg max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="px-4 py-4 border-b border-[#f6b146]/20 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#f6b146]">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-[#f6b146]"
                >
                  <HiX size={24} />
                </button>
              </div>

              {/* Notification List */}
              <div className="overflow-y-auto flex-1 p-4 space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#191307E6] rounded-lg p-4 hover:bg-[#f6b146]/10 transition-colors border border-[#f6b146]/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-[#f6b146] mt-1">
                        {item.icon || <IoNotificationsOutline size={20} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{item.label}</h4>
                        {item.timestamp && (
                          <p className="text-sm text-gray-400 mt-1">{item.timestamp}</p>
                        )}
                      </div>
                      <div className="h-2 w-2 bg-[#f6b146] rounded-full ml-2" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#f6b146]/20">
                <button className="w-full py-3 bg-[#f6b146] text-[#191307] rounded-lg font-medium">
                  Mark All as Read
                </button>
              </div>
            </div>
          )}

          {/* Desktop Notification Dropdown */}
          {!mobile && (
            <div className="bg-[#191307E6] rounded-lg shadow-xl py-2 border border-[#f6b146]/20">
              <div className="px-4 py-2 border-b border-[#f6b146]/20">
                <h3 className="text-sm font-medium text-[#f6b146]">Notifications</h3>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto">
                {items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href || "#"}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 hover:bg-[#f6b146]/10 group transition-colors"
                  >
                    <div className="text-[#f6b146] mr-3">
                      {item.icon || <IoNotificationsOutline size={18} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white group-hover:text-[#f6b146]">
                        {item.label}
                      </p>
                      {item.timestamp && (
                        <p className="text-xs text-gray-400 mt-1">{item.timestamp}</p>
                      )}
                    </div>
                    <div className="h-2 w-2 bg-[#f6b146] rounded-full ml-5" />
                  </Link>
                ))}
              </div>
              
              <div className="p-2 border-t border-[#f6b146]/20">
                <Link
                  href="/member/notifications"
                  className="block text-center text-sm text-[#f6b146] hover:bg-[#f6b146]/10 py-2 rounded"
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


const AccountSettingsDropdown = ({
  icon,
  items,
  mobile = false
}: {
  icon: React.ReactNode;
  items: { href?: string; label: string; icon?: React.ReactNode; onClick?: () => void }[];
  mobile?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (onClick?: () => void) => {
    if (onClick) onClick(); // Execute the item's onClick handler if it exists
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className={`relative ${mobile ? "mx-1" : "ml-2"}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`relative p-2 rounded-full transition-colors ${
          mobile ? "bg-white text-[#36322f]" : "bg-white text-[#36322f]"
        } hover:bg-[#f6b146]`}
      >
        {icon}
      </button>

      {isOpen && (
        <div
          className={`${
            mobile
              ? "fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              : "absolute right-0 mt-2 bg-[#191307E6] rounded-lg shadow-xl min-w-[200px]"
          }`}
        >
          {/* Mobile Full-screen Account Settings Panel */}
          {mobile && (
            <div className="absolute bottom-0 w-full bg-[#191307] rounded-t-2xl shadow-lg max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="px-4 py-4 border-b border-[#f6b146]/20 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#f6b146]">Account Settings</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-[#f6b146]"
                >
                  <HiX size={24} />
                </button>
              </div>

              {/* Account Settings List */}
              <div className="overflow-y-auto flex-1 p-4 space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#191307E6] rounded-lg p-4 hover:bg-[#f6b146]/10 transition-colors border border-[#f6b146]/10"
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => handleItemClick(item.onClick)}
                        className="flex items-center gap-3"
                      >
                        <div className="text-[#f6b146]">
                          {item.icon || <IoSettingsOutline size={20} />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{item.label}</h4>
                        </div>
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleItemClick(item.onClick)}
                        className="flex items-center gap-3 w-full text-left"
                      >
                        <div className="text-[#f6b146]">
                          {item.icon || <IoSettingsOutline size={20} />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{item.label}</h4>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Account Settings Dropdown */}
          {!mobile && (
            <div className="bg-[#191307E6] rounded-lg shadow-xl py-2 border border-[#f6b146]/20">
              {items.map((item, index) => (
                <div key={index}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => handleItemClick(item.onClick)}
                      className="flex items-center px-4 py-3 hover:bg-[#f6b146]/10 group transition-colors"
                    >
                      <div className="text-[#f6b146] mr-3">
                        {item.icon || <IoSettingsOutline size={18} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white group-hover:text-[#f6b146]">
                          {item.label}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleItemClick(item.onClick)}
                      className="flex items-center px-4 py-3 hover:bg-[#f6b146]/10 group transition-colors w-full text-left"
                    >
                      <div className="text-[#f6b146] mr-3">
                        {item.icon || <IoSettingsOutline size={18} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white group-hover:text-[#f6b146]">
                          {item.label}
                        </p>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
// Main Layout Component
export default function MemberLayout({ children }: MemberLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuthContext();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="text-white py-3 bg-[#17120a] fixed w-full z-50 border-b border-[#f6b146]/20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/member" className="flex items-center">
            <Image src="/svgs/logo.svg" alt="NEW EDUCATION STANDARD AWARDS AFRICA" width={150} height={50} />
          </Link>

          {/* Mobile Top Bar Icons */}
<div className="md:hidden flex items-center space-x-5">
 {/* Mobile Header */}
<NotificationDropdown
  mobile
  icon={<IoNotificationsOutline size={20} />}
  badge={3}
  items={notificationItems}
/>
  <AccountSettingsDropdown 
    mobile
    icon={<IoSettingsOutline size={20} />}
    items={[
      ...profileItems.slice(0, -1), // All items except the last one (Logout)
      {
        label: "Logout",
        onClick: handleLogout,
        icon: <IoLogOutOutline className="h-4 w-4" />
      }
    ]}
  />
  <button className="text-white p-2" onClick={toggleMenu}>
    {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
  </button>
</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {mainMenuConfig.map((item, index) => (
              item.subItems ? (
                <NavDropdown key={index} item={item} />
              ) : (
                <NavItem key={index} item={item} />
              )
            ))}
            <WalletInfo />
            {/* Desktop Icons */}
            {/* Desktop Header */}
<NotificationDropdown
  icon={<IoNotificationsOutline size={20} />}
  badge={3}
  items={notificationItems}
/>
             <AccountSettingsDropdown
    icon={<IoSettingsOutline size={20} />}
    items={[
      ...profileItems.slice(0, -1), // All items except the last one (Logout)
      {
        label: "Logout",
        onClick: handleLogout,
        icon: <IoLogOutOutline className="h-4 w-4" />
      }
    ]}
  />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#191307E6] mt-2 p-4 space-y-3 border-t border-[#f6b146]/10">
            {mainMenuConfig.map((item, index) => (
              item.subItems ? (
                <NavDropdown key={index} item={item} mobile />
              ) : (
                <NavItem key={index} item={item} mobile />
              )
            ))}
            <div className="pt-2">
              <WalletInfo />
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <Footer />
    </div>
  );
}