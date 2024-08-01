import React, { useEffect, useState } from "react";
import Foreground from "../Foreground";
import { account } from "../../AppwriteConfig";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    getAdminOnLoad();
  }, []);

  const getAdminOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      setIsAuthenticated(accountDetails);
    } catch (error) {
      console.info(error);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const promise = await account.createEmailPasswordSession(email, password);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setloading(false);
    } catch (error) {
      setloading(false);
      alert("Invalid Credentials!");
      throw new Error(error);
    }
  };
  const handleAdminLogout = async () => {
    await account.deleteSession("current");
    setIsAuthenticated(null);
  };

  if (isAuthenticated) {
    return (
      <Foreground
        isAdmin={isAuthenticated}
        handleAdminLogout={handleAdminLogout}
      />
    );
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col items-center justify-center h-screen z-[3] w-full">
      <form
        onSubmit={handleAdminLogin}
        className="backdrop-blur-md border border-[--text-color] rounded-3xl p-6  shadow-custom"
      >
        <h2 className="text-2xl mb-4 text-[--text-color] font-bold">
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className="shadow-custom transition-colors bg-[--secondary-color] text-[--text-color] py-2 rounded w-full font-semibold hover:bg-[--secondary-color-hover]"
        >
          {loading ? "Loggin in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Admin;
