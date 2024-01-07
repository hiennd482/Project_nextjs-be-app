"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import {
  FaChartPie,
  FaUsers,
  FaShopify,
  FaReceipt,
  FaListAlt,
  FaUserGraduate,
} from "react-icons/fa";

import { AiFillSetting } from "react-icons/ai";
function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="flex-1">
      <aside
        id="default-sidebar"
        className="fixed top-20 left-0 z-40 w-64 border border-r  h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className="">
              <Link
                href="/admin-view"
                className={`flex items-center gap-3 cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/admin-view"
                    ? "bg-gray-200 text-black"
                    : "bg-white text-black"
                }`}
              >
                <FaChartPie />
                Dashboard
              </Link>
            </li>
            {/* <li>
              <Link
                href="/admin-view/all-products"
                className={`flex items-center gap-3 cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/admin-view/all-products"
                    ? "bg-gray-200 text-black"
                    : "bg-white text-black"
                }`}
              >
                <FaShopify />
                San pham
              </Link>
            </li> */}
            <li>
              <Link
                href="/admin-view/course"
                className={`flex items-center gap-3 cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname.includes("/course")
                    ? "bg-gray-200 text-black"
                    : "bg-white text-black"
                }`}
              >
                <FaListAlt />
                courses
              </Link>
            </li>
            <li>
              <Link
                href="/admin-view/users"
                className={`flex items-center gap-3 cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname.includes("/users")
                    ? "bg-gray-200 text-black"
                    : "bg-white text-black"
                }`}
              >
                <FaUsers />
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin-view/students"
                className={`flex items-center gap-3 cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname.includes("/students")
                    ? "bg-gray-200 text-black"
                    : "bg-white text-black"
                }`}
              >
                <FaUserGraduate />
                student
              </Link>
            </li>
            <li>
              <Link
                href="/admin-view/setting"
                className={`flex items-center gap-3 cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname.includes("/setting")
                    ? "bg-gray-200 text-black"
                    : "bg-white text-black"
                }`}
              >
                <AiFillSetting />
                Cài đặt
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
}

export default Sidebar;
