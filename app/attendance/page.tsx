"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

interface Attendance {
  id: number;
  checkIn: string;
  checkOut?: string;
  latitude: number;
  longitude: number;
  status: string;
  createdAt: string;
}

export default function AttendancePage() {
  const [attendanceLogs, setAttendanceLogs] =
    useState<Attendance[]>([]);

  const [status, setStatus] =
    useState("Absent");

  const [checkInTime, setCheckInTime] =
    useState("");

  const [latitude, setLatitude] =
    useState<number | null>(null);

  const [longitude, setLongitude] =
    useState<number | null>(null);

  // Fetch Attendance
  const fetchAttendance = async () => {
    const res = await fetch("/api/attendance");
    const data = await res.json();

    setAttendanceLogs(data);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Check In
  const handleCheckIn = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const currentTime =
          new Date().toLocaleTimeString();

        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        setStatus("Present");
        setCheckInTime(currentTime);

        // Save to Database
        await fetch("/api/attendance", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            employeeId: 1,
            checkIn: currentTime,
            latitude: lat,
            longitude: lng,
            status: "Present",
          }),
        });

        fetchAttendance();
      },
      (error) => {
        alert("Location access denied");
        console.log(error);
      }
    );
  };

  return (
    <main className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Attendance
        </h1>

        {/* Attendance Card */}
        <div className="bg-gray-900 p-6 rounded-2xl mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Today's Attendance
          </h2>

          <p className="text-gray-400">
            Status: {status}
          </p>

          <p className="text-gray-400">
            Check In:{" "}
            {checkInTime || "--"}
          </p>

          <p className="text-gray-400">
            Latitude:{" "}
            {latitude || "--"}
          </p>

          <p className="text-gray-400 mb-6">
            Longitude:{" "}
            {longitude || "--"}
          </p>

          <button
            onClick={handleCheckIn}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
          >
            Check In
          </button>
        </div>

        {/* Attendance Table */}
        <div className="bg-gray-900 rounded-2xl overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4">
                  Check In
                </th>

                <th className="text-left p-4">
                  Latitude
                </th>

                <th className="text-left p-4">
                  Longitude
                </th>

                <th className="text-left p-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {attendanceLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-t border-gray-800"
                >
                  <td className="p-4">
                    {log.checkIn}
                  </td>

                  <td className="p-4">
                    {log.latitude}
                  </td>

                  <td className="p-4">
                    {log.longitude}
                  </td>

                  <td className="p-4">
                    <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                      {log.status}
                    </span>
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