"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] =
    useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Employees",
      path: "/employees",
    },

    {
      name: "Attendance",
      path: "/attendance",
    },

    {
      name: "Leaves",
      path: "/leaves",
    },

    {
      name: "Payroll",
      path: "/payroll",
    },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold">
          HRMS
        </h1>

        <button
          onClick={() =>
            setIsOpen(!isOpen)
          }
          className="bg-gray-800 px-4 py-2 rounded-lg"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8">
            HRMS
          </h1>

          <nav className="space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() =>
                  setIsOpen(false)
                }
                className={`block p-3 rounded-xl transition ${
                  pathname === item.path
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}
    </>
  );
}