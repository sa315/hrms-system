"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("employee");

  const handleRegister = async () => {
    if (
      !name ||
      !email ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful");

      setName("");
      setEmail("");
      setPassword("");
      setRole("employee");
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          />

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          >
            <option value="employee">
              Employee
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
}