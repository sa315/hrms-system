"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-yellow-700/20 backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-yellow-500 tracking-wide">
          LexCore HRMS
        </h1>

        <button
          onClick={() =>
            router.push("/login")
          }
          className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold px-6 py-3 rounded-xl transition duration-300"
        >
          Employee Login
        </button>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">

        <p className="text-yellow-500 uppercase tracking-[5px] text-sm mb-6">
          Legal Workforce Management
        </p>

        <h1 className="text-5xl md:text-7xl font-bold max-w-6xl leading-tight">

          Smart Legal Office
          Attendance & Payroll
          Management Platform

        </h1>

        <p className="text-gray-400 text-lg md:text-2xl mt-8 max-w-3xl leading-relaxed">

          Manage advocates, legal assistants,
          attendance tracking, payroll,
          leave approvals, and office workflow
          from one secure enterprise platform.

        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mt-14">

          {/* Register */}
          <button
            onClick={() =>
              router.push("/register")
            }
            className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold px-10 py-4 rounded-2xl text-lg transition duration-300 shadow-lg shadow-yellow-600/20"
          >
            Get Started
          </button>

          {/* Login */}
          <button
            onClick={() =>
              router.push("/login")
            }
            className="border border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black px-10 py-4 rounded-2xl text-lg transition duration-300"
          >
            Employee Portal
          </button>

        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 pb-24">

        {/* Feature 1 */}
        <div className="bg-zinc-900 border border-yellow-700/20 p-8 rounded-3xl hover:border-yellow-500 transition duration-300">

          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            Attendance Tracking
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Secure GPS-based attendance
            monitoring for advocates and
            legal office staff.
          </p>

        </div>

        {/* Feature 2 */}
        <div className="bg-zinc-900 border border-yellow-700/20 p-8 rounded-3xl hover:border-yellow-500 transition duration-300">

          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            Payroll Automation
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Automate salary calculations,
            payroll deductions, and
            downloadable salary slips.
          </p>

        </div>

        {/* Feature 3 */}
        <div className="bg-zinc-900 border border-yellow-700/20 p-8 rounded-3xl hover:border-yellow-500 transition duration-300">

          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            Leave Management
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Simplify leave requests,
            approvals, and advocate office
            workflow management.
          </p>

        </div>

      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 pb-24">

        <div className="bg-zinc-900 p-10 rounded-3xl text-center border border-yellow-700/10">
          <h2 className="text-5xl font-bold text-yellow-500">
            24/7
          </h2>

          <p className="text-gray-400 mt-4">
            Secure Workforce Monitoring
          </p>
        </div>

        <div className="bg-zinc-900 p-10 rounded-3xl text-center border border-yellow-700/10">
          <h2 className="text-5xl font-bold text-yellow-500">
            100%
          </h2>

          <p className="text-gray-400 mt-4">
            Payroll Accuracy
          </p>
        </div>

        <div className="bg-zinc-900 p-10 rounded-3xl text-center border border-yellow-700/10">
          <h2 className="text-5xl font-bold text-yellow-500">
            Secure
          </h2>

          <p className="text-gray-400 mt-4">
            Legal Office Management
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-700/20 py-8 text-center text-gray-500">

        © 2026 LexCore HRMS —
        Legal Office Workforce Platform

      </footer>

    </main>
  );
}