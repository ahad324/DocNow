import React, { useState } from "react";
import Foreground from "../Foreground";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const adminEmail = "admin@gmail.com";
    const adminPassword = "ahad324xv";

    if (email === adminEmail && password === adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (isAuthenticated) {
    return <Foreground isAdmin={isAuthenticated} />;
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col items-center justify-center h-screen z-[3] rounded-lg w-full">
      <form
        onSubmit={handleLogin}
        className="backdrop-blur-md border border-[--text-color] p-6 rounded shadow-custom"
      >
        <h2 className="text-2xl mb-4 text-[--text-color] font-bold">
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-[--secondary-color] text-[--text-color] py-2 rounded w-full font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Admin;
