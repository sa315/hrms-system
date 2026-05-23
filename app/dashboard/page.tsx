"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardData {
  totalEmployees: number;
  totalAttendance: number;
  presentToday: number;
}

export default function DashboardPage() {
  const router = useRouter();

  const [dashboardData, setDashboardData] =
    useState<DashboardData>({
      totalEmployees: 0,
      totalAttendance: 0,
      presentToday: 0,
    });

  // Protect Route
  useEffect(() => {
    const userData =
      localStorage.getItem("user");

    // Not Logged In
    if (!userData) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(userData);

    // Not Admin
    if (user.role !== "admin") {
      router.push("/attendance");
      return;
    }

    // Fetch Dashboard Data
    fetchDashboardData();
  }, [router]);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    const res = await fetch(
      "/api/dashboard"
    );

    const data = await res.json();

    setDashboardData(data);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");

    router.push("/login");
  };

  // Analytics Chart Data
  const chartData = {
    labels: [
      "Employees",
      "Attendance",
      "Present Today",
    ],

    datasets: [
      {
        label: "HRMS Analytics",

        data: [
          dashboardData.totalEmployees,
          dashboardData.totalAttendance,
          dashboardData.presentToday,
        ],

        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#dc2626",
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-gray-400">
            Total Employees
          </h2>

          <p className="text-4xl font-bold mt-4">
            {
              dashboardData.totalEmployees
            }
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-gray-400">
            Present Today
          </h2>

          <p className="text-4xl font-bold mt-4 text-green-500">
            {
              dashboardData.presentToday
            }
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-gray-400">
            Total Attendance Records
          </h2>

          <p className="text-4xl font-bold mt-4 text-blue-500">
            {
              dashboardData.totalAttendance
            }
          </p>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-gray-900 p-6 rounded-2xl mt-8">
        <h2 className="text-2xl font-semibold mb-6">
          HRMS Analytics
        </h2>

        <Bar data={chartData} />
      </div>
    </main>
  );
}