export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">
          AttendAI
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h2 className="text-5xl md:text-6xl font-bold max-w-4xl leading-tight">
          Smart Employee Attendance & Payroll System
        </h2>

        <p className="text-gray-400 mt-6 text-lg max-w-2xl">
          Manage attendance, GPS verification, face recognition,
          leaves, payroll deductions, and employee monitoring
          from one powerful platform.
        </p>

        <div className="flex gap-4 mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg">
            Get Started
          </button>

          <button className="border border-gray-700 hover:border-gray-500 px-6 py-3 rounded-xl text-lg">
            Learn More
          </button>
        </div>
      </section>
    </main>
  );
}