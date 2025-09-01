"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from '@/lib/context/AuthContext';
import { Menu, X, User } from "lucide-react";
import { navlinks, secondaryNavlinks } from "@/lib/data/global";
import { renderIcon } from "@/lib/utils/iconMapper";

import { IoLogOut } from "react-icons/io5";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";



const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthContext();
  const pathname = usePathname();

  const controlMenu = (action: boolean) => setSidebarOpen(action);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  useEffect(() => {
    // Ensure navbar stays fixed and visible on all screen sizes
    const handleResize = () => {
      if (!ref.current) return;

      // Always keep navbar visible and fixed at top
      ref.current.style.transform = "translateY(0)";
    };

    // Set initial position
    handleResize();

    // Listen for resize events to maintain fixed position
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Two-Layer Horizontal Navigation Layout */}
      <nav
        className="bg-[#17120a] fixed top-0 left-0 w-full h-auto flex flex-col z-[1000] transition-transform duration-300 ease-in-out"
        ref={ref}
      >
        {/* Layer 1 - Top Bar: Main Navigation */}
        <div className="lg:border-b lg:border-deepGold/20 bg-gradient-to-r from-[#17120a] to-[#1a140b]">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Main Navigation grouped together on the left */}
              <div className="flex items-center space-x-16">
                {/* Logo positioned on the left */}
                <motion.div
                  className="flex-shrink-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={"/"}>
                    <Image
                      src={"/svgs/logo.svg"}
                      alt="nesa logo"
                      width={120}
                      height={120}
                      id="nav_logo"
                      className="min-w-[120px] hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>

                {/* Main Navigation - Desktop Only - Moved closer to logo */}
                <div className="hidden lg:flex items-center">
                  <HorizontalNavLinks links={navlinks} pathname={pathname?? "/"} layer="layer-1" />
                </div>
              </div>

              {/* Authentication Buttons - Desktop Only */}
              <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
                <AuthButtons user={user} />
              </div>

              {/* Mobile Menu Toggle */}
              <motion.div
                className="lg:hidden cursor-pointer p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
                whileTap={{ scale: 0.95 }}
              >
                <Menu
                  className="text-white"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Layer 2 - Bottom Bar: Secondary Navigation - Desktop Only */}
        <div className="hidden lg:block bg-gradient-to-r from-[#1a140b] to-[#1d170e]">
          <div className="container mx-auto px-4 py-4">
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <HorizontalNavLinks links={secondaryNavlinks} pathname={pathname?? "/"} layer="layer-2" />
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar sidebarOpen={sidebarOpen} controlMenu={controlMenu} user={user} pathname={pathname ?? "/"} />
    </>
  );
};

const HorizontalNavLinks = ({
  links,
  pathname,
  layer
}: {
  links: any[];
  pathname: string;
  layer?: 'layer-1' | 'layer-2' | 'layer-3';
}) => {
  // Adjust spacing based on layer and number of items
  const getSpacingClass = () => {
    if (layer === 'layer-1' || layer === 'layer-2') {
      return 'space-x-3 lg:space-x-4 xl:space-x-5 2xl:space-x-6'; // Same responsive spacing for both layers
    }
    return 'space-x-8'; // Default spacing for other layers
  };

  return (
    <motion.ul className={`flex items-center ${getSpacingClass()} ${layer ? styles[layer] : ''}`}>
      {links.map((link, id) => (
        <HorizontalNavLink key={id} link={link} pathname={pathname} index={id} />
      ))}
    </motion.ul>
  );
};

const HorizontalNavLink = ({
  link,
  pathname,
  index
}: {
  link: any;
  pathname: string;
  index: number;
}) => {
  const isActive = pathname === link.path;
  const hasDropdown = link.children && link.children.length > 0;

  return (
    <motion.li
      className={styles["nav-item"]}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      {hasDropdown ? (
        <div className="relative">
          <Link
            href={link.path}
            className={`font-normal duration-300 relative py-2 px-3 rounded-md transition-all hover:bg-white/5 flex items-center ${
              isActive
                ? 'text-deepGold'
                : 'text-white hover:text-deepGold'
            }`}
            aria-haspopup="true"
            aria-expanded="false"
            role="button"
            tabIndex={0}
          >
            <span>{link.label}</span>
            <span className={styles['dropdown-chevron']}>
              {renderIcon({ name: 'ChevronDown', size: 16, className: 'transition-transform duration-300' })}
            </span>
            {isActive && (
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-deepGold"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>

          {/* Dropdown Menu */}
          <div
            className={styles.dropdown}
            role="menu"
            aria-label={`${link.label} submenu`}
          >
            {link.children.map((child: any, childIndex: number) => (
              <Link
                key={childIndex}
                href={child.path}
                className={styles['dropdown-item']}
                role="menuitem"
                tabIndex={0}
              >
                {child.icon && (
                  <span className={styles['dropdown-item-icon']}>
                    {renderIcon({ name: child.icon, size: 18 })}
                  </span>
                )}
                <span className={styles['dropdown-item-text']}>{child.label}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Link
          href={link.path}
          className={`font-normal duration-300 relative py-2 px-3 rounded-md transition-all hover:bg-white/5 ${
            isActive
              ? 'text-deepGold'
              : 'text-white hover:text-deepGold'
          }`}
        >
          <span>{link.label}</span>
          {isActive && (
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-deepGold"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      )}
    </motion.li>
  );
};



const AuthButtons = ({ user }: { user: any }) => {
  const { logout } = useAuthContext();

  if (user) {
    // If the user is logged in, show the profile icon and logout button
    const handleLogout = () => {
      logout();
      window.location.href = '/login';
    };

    return (
      <div className="flex flex-col space-y-3 w-full">
        <Link href="/ProfileSetting">
          <motion.div className="flex items-center justify-center space-x-3 cursor-pointer bg-gradient-to-r from-[#17120a]/60 to-[#1a140b]/60 border border-[#ea580c]/15 rounded-lg p-4 hover:bg-gradient-to-r hover:from-[#ea580c]/8 hover:to-[#ea580c]/5 transition-all duration-200 min-h-[56px]">
            <User className="text-gray-300 w-5 h-5" />
            <span className="text-gray-200 font-medium text-base">My Account</span>
          </motion.div>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-3 bg-gradient-to-r from-[#ea580c]/15 to-[#ea580c]/10 hover:bg-gradient-to-r hover:from-[#ea580c]/25 hover:to-[#ea580c]/15 rounded-lg p-4 transition-all duration-200 min-h-[56px] border border-[#FFB92E]/30"
        >
          <IoLogOut size={20} className="text-[#FFB92E]" />
          <span className="text-[#FFB92E] font-medium text-base">Log Out</span>
        </button>
      </div>
    );
  }

  // If the user is not logged in, return null since Login/Sign Up are now in main nav
  return null;
};

const MobileSidebar = ({
  sidebarOpen,
  controlMenu,
  user,
  pathname,
}: {
  sidebarOpen: boolean;
  controlMenu: (action: boolean) => void;
  user: any;
  pathname: string;
}) => (
  <aside
    className={`${
      sidebarOpen ? "translate-x-0" : "translate-x-full"
    } fixed top-0 right-0 w-full h-full bg-black text-white select-none flex duration-300 ease-out items-start justify-center z-[2000] overflow-y-auto lg:hidden`}
  >
    <motion.div
      className="absolute right-6 top-6 cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
      whileTap={{ scale: 0.95 }}
    >
      <X size={24} onClick={() => controlMenu(false)} className="text-white" />
    </motion.div>
    <MobileSideMenu controlMenu={controlMenu} user={user} pathname={pathname} />
  </aside>
);

const MobileSideMenu = ({
  controlMenu,
  user,
  pathname,
}: {
  controlMenu: (action: boolean) => void;
  user: any;
  pathname: string;
}) => {
  const [activeTab, setActiveTab] = useState<'main' | 'secondary'>('main');
  const [expandedDropdowns, setExpandedDropdowns] = useState<Set<string>>(new Set());

  const toggleMobileDropdown = (label: string) => {
    const newExpanded = new Set(expandedDropdowns);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedDropdowns(newExpanded);
  };

  return (
    <motion.div
      className="flex flex-col w-full px-4 sm:px-6 py-8 pt-16 overflow-y-auto max-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Navigation Tabs */}
      <div className="flex w-full mb-6 border-b border-[#ea580c]/20 bg-gradient-to-r from-[#17120a]/80 to-[#1a140b]/80 rounded-t-lg">
        <button
          onClick={() => setActiveTab('main')}
          className={`flex-1 py-4 text-center font-medium text-base transition-all duration-200 rounded-tl-lg ${
            activeTab === 'main'
              ? 'text-[#FFB92E] border-b-2 border-[#FFB92E] bg-gradient-to-b from-[#ea580c]/10 to-[#ea580c]/5'
              : 'text-gray-300 hover:text-[#FFB92E] hover:bg-[#ea580c]/5'
          }`}
        >
          Main Navigation
        </button>
        <button
          onClick={() => setActiveTab('secondary')}
          className={`flex-1 py-4 text-center font-medium text-base transition-all duration-200 rounded-tr-lg ${
            activeTab === 'secondary'
              ? 'text-[#FFB92E] border-b-2 border-[#FFB92E] bg-gradient-to-b from-[#ea580c]/10 to-[#ea580c]/5'
              : 'text-gray-300 hover:text-[#FFB92E] hover:bg-[#ea580c]/5'
          }`}
        >
          Quick Access
        </button>
      </div>

      {/* Main Navigation */}
      {activeTab === 'main' && (
        <div className="w-full">
          <div className="flex flex-col space-y-2 w-full">
            {navlinks.map((link, id) => {
              const isActive = pathname === link.path;
              const hasDropdown = link.children && link.children.length > 0;
              const isExpanded = expandedDropdowns.has(link.label);

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: id * 0.05 }}
                  className="bg-gradient-to-r from-[#17120a]/60 to-[#1a140b]/60 rounded-lg border border-[#ea580c]/15 overflow-hidden backdrop-blur-sm"
                >
                  {hasDropdown ? (
                    <div>
                      {/* Dropdown Toggle Button */}
                      <button
                        onClick={() => toggleMobileDropdown(link.label)}
                        className={`w-full flex items-center justify-between px-4 py-4 text-left font-medium transition-all duration-200 min-h-[56px] ${
                          isActive
                            ? 'text-[#FFB92E] bg-gradient-to-r from-[#ea580c]/15 to-[#ea580c]/10 border-l-4 border-[#FFB92E]'
                            : 'text-gray-200 hover:text-[#FFB92E] hover:bg-gradient-to-r hover:from-[#ea580c]/8 hover:to-[#ea580c]/5'
                        }`}
                        aria-expanded={isExpanded}
                        aria-haspopup="true"
                        aria-controls={`mobile-dropdown-${link.label.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        <div className="flex items-center flex-1">
                          {link.icon && (
                            <span className={`inline-flex items-center justify-center w-5 h-5 mr-3 transition-colors duration-200 ${
                              isActive ? 'text-[#FFB92E]' : 'text-gray-400 group-hover:text-[#ea580c]'
                            }`}>
                              {renderIcon({ name: link.icon, size: 18 })}
                            </span>
                          )}
                          <span className="text-base">{link.label}</span>
                        </div>
                        <span className={`inline-flex items-center justify-center w-5 h-5 ml-2 transition-all duration-200 ${
                          isExpanded ? 'rotate-180 text-[#FFB92E]' : 'rotate-0 text-gray-400'
                        }`}>
                          {renderIcon({ name: 'ChevronDown', size: 16 })}
                        </span>
                      </button>

                      {/* Dropdown Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out bg-gradient-to-r from-[#17120a]/95 to-[#1a140b]/95 border-t border-[#FFB92E]/30 ${
                          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        id={`mobile-dropdown-${link.label.replace(/\s+/g, '-').toLowerCase()}`}
                        role="menu"
                        aria-label={`${link.label} submenu`}
                      >
                        {link.children?.map((child: any, childIndex: number) => (
                          <Link
                            key={childIndex}
                            href={child.path}
                            className="flex items-center px-6 py-3 text-gray-300 hover:text-[#FFB92E] hover:bg-gradient-to-r hover:from-[#ea580c]/10 hover:to-[#ea580c]/5 transition-all duration-200 border-b border-[#ea580c]/10 last:border-b-0 min-h-[48px]"
                            onClick={() => controlMenu(false)}
                            role="menuitem"
                          >
                            {child.icon && (
                              <span className="inline-flex items-center justify-center w-4 h-4 mr-3 text-gray-500 group-hover:text-[#ea580c] transition-colors duration-200">
                                {renderIcon({ name: child.icon, size: 14 })}
                              </span>
                            )}
                            <span className="text-sm font-medium">{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.path}
                      className={`flex items-center px-4 py-4 font-medium transition-all duration-200 min-h-[56px] ${
                        isActive
                          ? 'text-[#FFB92E] bg-gradient-to-r from-[#ea580c]/15 to-[#ea580c]/10 border-l-4 border-[#FFB92E] shadow-lg'
                          : 'text-gray-200 hover:text-[#FFB92E] hover:bg-gradient-to-r hover:from-[#ea580c]/8 hover:to-[#ea580c]/5'
                      }`}
                      onClick={() => controlMenu(false)}
                    >
                      {link.icon && (
                        <span className={`inline-flex items-center justify-center w-5 h-5 mr-3 transition-colors duration-200 ${
                          isActive ? 'text-[#FFB92E]' : 'text-gray-400 hover:text-[#ea580c]'
                        }`}>
                          {renderIcon({ name: link.icon, size: 18 })}
                        </span>
                      )}
                      <span className="text-base">{link.label}</span>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
          <div className="mt-6 pt-6 border-t border-[#ea580c]/20">
            <AuthButtons user={user} />
          </div>
        </div>
      )}

      {/* Secondary Navigation */}
      {activeTab === 'secondary' && (
        <div className="w-full">
          <div className="flex flex-col space-y-2 w-full">
            {secondaryNavlinks.map((link, id) => {
              const isActive = pathname === link.path;

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: id * 0.05 }}
                  className="bg-gradient-to-r from-[#17120a]/60 to-[#1a140b]/60 rounded-lg border border-[#ea580c]/15 overflow-hidden backdrop-blur-sm"
                >
                  <Link
                    href={link.path}
                    className={`flex items-center px-4 py-4 font-medium transition-all duration-200 min-h-[56px] ${
                      isActive
                        ? 'text-[#FFB92E] bg-gradient-to-r from-[#ea580c]/15 to-[#ea580c]/10 border-l-4 border-[#FFB92E] shadow-lg'
                        : 'text-gray-200 hover:text-[#FFB92E] hover:bg-gradient-to-r hover:from-[#ea580c]/8 hover:to-[#ea580c]/5'
                    }`}
                    onClick={() => controlMenu(false)}
                  >
                    {link.icon && (
                      <span className={`inline-flex items-center justify-center w-5 h-5 mr-3 transition-colors duration-200 ${
                        isActive ? 'text-[#FFB92E]' : 'text-gray-400 hover:text-[#ea580c]'
                      }`}>
                        {renderIcon({ name: link.icon, size: 18 })}
                      </span>
                    )}
                    <div className="flex-1">
                      <span className="text-base block">{link.label}</span>
                      {link.description && (
                        <span className="text-xs text-gray-500 block mt-1">{link.description}</span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Secondary Navigation */}
      {activeTab === 'secondary' && (
        <div className="w-full">
          <h3 className="text-deepGold font-semibold text-lg mb-4 text-center">Quick Access</h3>
          <div className="flex flex-col space-y-3 w-full">
            {secondaryNavlinks && secondaryNavlinks.length > 0 ? (
              secondaryNavlinks.map((link, id) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: id * 0.05 }}
                  >
                    <Link
                      href={link.path}
                      className={`font-normal duration-200 relative block py-3 px-4 rounded-md transition-all ${
                        isActive
                          ? 'text-deepGold bg-deepGold/10 border-l-4 border-deepGold'
                          : 'text-white hover:text-deepGold hover:bg-white/5'
                      }`}
                      onClick={() => controlMenu(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-white text-center py-4">
                <p>No secondary navigation items available</p>
              </div>
            )}
          </div>
        </div>
      )}


    </motion.div>
  );
};

export default Navbar;