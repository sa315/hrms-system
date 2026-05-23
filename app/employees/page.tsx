"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

interface Employee {
  id: number;
  name: string;
  email: string;
  mobile: string;
  salary: number;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [salary, setSalary] = useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  // Fetch Employees
  const fetchEmployees = async () => {
    const res = await fetch("/api/employees");
    const data = await res.json();

    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add Employee
  const handleAddEmployee = async () => {
    if (!name || !email || !mobile || !salary) {
      alert("Please fill all fields");
      return;
    }

    await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        salary: Number(salary),
      }),
    });

    setName("");
    setEmail("");
    setMobile("");
    setSalary("");

    fetchEmployees();
  };

  // Delete Employee
  const handleDeleteEmployee = async (
    id: number
  ) => {
    await fetch("/api/employees", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchEmployees();
  };

  // Update Employee
  const handleUpdateEmployee = async () => {
    if (
      !editingId ||
      !name ||
      !email ||
      !mobile ||
      !salary
    ) {
      alert("Please fill all fields");
      return;
    }

    await fetch("/api/employees", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        name,
        email,
        mobile,
        salary: Number(salary),
      }),
    });

    setEditingId(null);

    setName("");
    setEmail("");
    setMobile("");
    setSalary("");

    fetchEmployees();
  };

  return (
    <main className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Employees
        </h1>

        {/* Employee Form */}
        <div className="bg-gray-900 p-6 rounded-2xl mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            {editingId
              ? "Edit Employee"
              : "Add Employee"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Employee Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="p-3 rounded-lg bg-gray-800 border border-gray-700"
            />

            <input
              type="email"
              placeholder="Employee Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="p-3 rounded-lg bg-gray-800 border border-gray-700"
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value)
              }
              className="p-3 rounded-lg bg-gray-800 border border-gray-700"
            />

            <input
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) =>
                setSalary(e.target.value)
              }
              className="p-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          <button
            onClick={
              editingId
                ? handleUpdateEmployee
                : handleAddEmployee
            }
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
          >
            {editingId
              ? "Update Employee"
              : "Add Employee"}
          </button>
        </div>

        {/* Employee Table */}
        <div className="bg-gray-900 rounded-2xl overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Mobile
                </th>

                <th className="text-left p-4">
                  Salary
                </th>

                <th className="text-left p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-t border-gray-800"
                >
                  <td className="p-4">
                    {employee.name}
                  </td>

                  <td className="p-4">
                    {employee.email}
                  </td>

                  <td className="p-4">
                    {employee.mobile}
                  </td>

                  <td className="p-4">
                    ₹{employee.salary}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => {
                        setEditingId(employee.id);
                        setName(employee.name);
                        setEmail(employee.email);
                        setMobile(employee.mobile);
                        setSalary(
                          employee.salary.toString()
                        );
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteEmployee(
                          employee.id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}