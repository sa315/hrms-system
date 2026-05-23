"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Leave {
  id: number;
  employeeName: string;
  reason: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function LeavePage() {
  const router = useRouter();

  const [userRole, setUserRole] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [leaves, setLeaves] =
    useState<Leave[]>([]);

  // Protect Route
  useEffect(() => {
    const userData =
      localStorage.getItem("user");

    if (!userData) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(userData);

    setUserRole(user.role);

    fetchLeaves();
  }, [router]);

  // Fetch Leaves
  const fetchLeaves = async () => {
    const res = await fetch(
      "/api/leave"
    );

    const data = await res.json();

    setLeaves(data);
  };

  // Apply Leave
  const handleApplyLeave =
    async () => {
      const userData =
        localStorage.getItem("user");

      if (!userData) return;

      const user =
        JSON.parse(userData);

      const res = await fetch(
        "/api/leave",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            employeeId: user.id,
            employeeName:
              user.name,
            reason,
            startDate,
            endDate,
          }),
        }
      );

      if (res.ok) {
        alert(
          "Leave applied successfully"
        );

        setReason("");
        setStartDate("");
        setEndDate("");

        fetchLeaves();
      }
    };

  // Update Leave Status
  const updateLeaveStatus =
    async (
      id: number,
      status: string
    ) => {
      const res = await fetch(
        "/api/leave",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      if (res.ok) {
        fetchLeaves();
      }
    };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Leave Management
        </h1>

        {/* Leave Form */}
        <div className="bg-gray-900 p-6 rounded-2xl mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            Apply Leave
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              className="p-3 rounded-lg bg-gray-800 border border-gray-700"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              className="p-3 rounded-lg bg-gray-800 border border-gray-700"
            />

            <textarea
              placeholder="Leave Reason"
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              className="md:col-span-2 p-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          <button
            onClick={handleApplyLeave}
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
          >
            Apply Leave
          </button>
        </div>

        {/* Leave Table */}
        <div className="bg-gray-900 rounded-2xl overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4">
                  Employee
                </th>

                <th className="text-left p-4">
                  Reason
                </th>

                <th className="text-left p-4">
                  Start Date
                </th>

                <th className="text-left p-4">
                  End Date
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                {userRole === "admin" && (
                  <th className="text-left p-4">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {leaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-t border-gray-800"
                >
                  <td className="p-4">
                    {
                      leave.employeeName
                    }
                  </td>

                  <td className="p-4">
                    {leave.reason}
                  </td>

                  <td className="p-4">
                    {leave.startDate}
                  </td>

                  <td className="p-4">
                    {leave.endDate}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        leave.status ===
                        "Approved"
                          ? "bg-green-600"
                          : leave.status ===
                            "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  {userRole === "admin" && (
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() =>
                          updateLeaveStatus(
                            leave.id,
                            "Approved"
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateLeaveStatus(
                            leave.id,
                            "Rejected"
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm"
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}