"use client";

import Sidebar from "@/components/Sidebar";
import jsPDF from "jspdf";

const payrollData = [
  {
    id: 1,
    name: "Arun",
    baseSalary: 30000,
    lateDeduction: 1000,
    leaveDeduction: 2000,
  },
  {
    id: 2,
    name: "Rahul",
    baseSalary: 40000,
    lateDeduction: 500,
    leaveDeduction: 1000,
  },
];

export default function PayrollPage() {

  // Generate Salary Slip PDF
  const downloadSalarySlip = (
    employee: {
      id: number;
      name: string;
      baseSalary: number;
      lateDeduction: number;
      leaveDeduction: number;
    }
  ) => {

    const finalSalary =
      employee.baseSalary -
      employee.lateDeduction -
      employee.leaveDeduction;

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "Salary Slip",
      80,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Employee: ${employee.name}`,
      20,
      50
    );

    doc.text(
      `Base Salary: ₹${employee.baseSalary}`,
      20,
      70
    );

    doc.text(
      `Late Deduction: ₹${employee.lateDeduction}`,
      20,
      90
    );

    doc.text(
      `Leave Deduction: ₹${employee.leaveDeduction}`,
      20,
      110
    );

    doc.text(
      `Final Salary: ₹${finalSalary}`,
      20,
      130
    );

    doc.save(
      `${employee.name}-salary-slip.pdf`
    );
  };

  return (
    <main className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Payroll Management
        </h1>

        <div className="bg-gray-900 rounded-2xl overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4">
                  Employee
                </th>

                <th className="text-left p-4">
                  Base Salary
                </th>

                <th className="text-left p-4">
                  Late Deduction
                </th>

                <th className="text-left p-4">
                  Leave Deduction
                </th>

                <th className="text-left p-4">
                  Final Salary
                </th>

                <th className="text-left p-4">
                  Salary Slip
                </th>
              </tr>
            </thead>

            <tbody>
              {payrollData.map((employee) => {

                const finalSalary =
                  employee.baseSalary -
                  employee.lateDeduction -
                  employee.leaveDeduction;

                return (
                  <tr
                    key={employee.id}
                    className="border-t border-gray-800"
                  >
                    <td className="p-4">
                      {employee.name}
                    </td>

                    <td className="p-4">
                      ₹{employee.baseSalary}
                    </td>

                    <td className="p-4 text-red-400">
                      -₹{employee.lateDeduction}
                    </td>

                    <td className="p-4 text-red-400">
                      -₹{employee.leaveDeduction}
                    </td>

                    <td className="p-4 text-green-400 font-bold">
                      ₹{finalSalary}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          downloadSalarySlip(
                            employee
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}