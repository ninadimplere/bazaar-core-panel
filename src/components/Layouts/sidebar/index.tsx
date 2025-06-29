"use client";

import { cn } from "@lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftIcon,
  BazaarIcon,
  LogoutIcon,
  HelpIcon,
  SettingsIcon,
} from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";
import { sideNavMenuItems } from "./sidebar-content";

const sidebarStyles = {
  container: "w-72 bg-gray-100 border-r border-gray-200 h-screen flex flex-col",
  topSection: "flex items-center px-4 py-4 border-b border-gray-200",
  nav: "flex-1 overflow-y-auto px-4 py-6",
  navList: "space-y-4",
  menuItem: "flex items-center gap-3",
  icon: "w-6 h-6 mr-1.5",
  text: "font-[Plus Jakarta Sans] font-medium text-sm leading-5 tracking-normal",
  bottomSection: "px-4 py-6 border-t border-gray-200",
};

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          sidebarStyles.container,
          isMobile ? "fixed z-50" : "sticky top-0",
        )}
        aria-label="Sidebar"
      >
        {/* Top Section with Logo */}
        <div className={sidebarStyles.topSection}>
          <Link href="/overview" className="flex items-center">
            <BazaarIcon className="mr-2 h-8 w-8" />
          </Link>
          {isMobile && (
            <button onClick={toggleSidebar} className="ml-auto text-gray-600">
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className={sidebarStyles.nav}>
          <ul className={sidebarStyles.navList}>
            {sideNavMenuItems.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <MenuItem as="link" href={href} isActive={pathname === href}>
                  <div className={sidebarStyles.menuItem}>
                    <Icon className={sidebarStyles.icon} />
                    <span className={sidebarStyles.text}>{label}</span>
                  </div>
                </MenuItem>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className={sidebarStyles.bottomSection}>
          <ul className={sidebarStyles.navList}>
            {[
              { href: "/settings", icon: SettingsIcon, label: "Settings" },
              { href: "/help", icon: HelpIcon, label: "Help" },
              { href: "/logout", icon: LogoutIcon, label: "Log out" },
            ].map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <MenuItem as="link" href={href} isActive={pathname === href}>
                  <div className={sidebarStyles.menuItem}>
                    <Icon className={sidebarStyles.icon} />
                    <span className={sidebarStyles.text}>{label}</span>
                  </div>
                </MenuItem>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
