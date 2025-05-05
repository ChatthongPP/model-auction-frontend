"use client";

import { useEffect, useState } from "react";
import HomeButton from "./HomeButton";
import LoginForm from "./LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getRoleIdFromToken } from "@/utils/authUtils";

export default function Header() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null
  );
  const [roleId, setRoleId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && isLoggedIn) {
      setIsLoggedIn(true);
      const role = getRoleIdFromToken(token);
      setRoleId(role);
    }
  }, [isLoggedIn]);

  const closeModal = () => setActiveModal(null);

  const handleLoginSuccess = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
    closeModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setRoleId(null);
    router.push("/");
  };

  console.log("roleId", roleId);

  return (
    <>
      <header className="bg-[#1f0a38] shadow-md">
        <div className="flex justify-between items-center px-8 py-4">
          <HomeButton />
          <div className="flex gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href={roleId === 4 ? "/seller-centre" : "/profile"}
                  className="bg-[#6a0dad] hover:bg-[#9b59b6] text-white font-bold py-2 px-4 rounded-2xl"
                >
                  Profile
                </Link>
                <Link
                  href="/"
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveModal("login")}
                  className="bg-[#6a0dad] hover:bg-[#9b59b6] text-white font-bold py-2 px-4 rounded-2xl"
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveModal("register")}
                  className="bg-[#6a0dad] hover:bg-[#9b59b6] text-white font-bold py-2 px-4 rounded-2xl"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
        <div className="h-2 bg-[#8e44ad]"></div>
      </header>

      {activeModal && (
        <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
          <div
            className={`bg-[#2d1459] text-white p-8 rounded-2xl shadow-2xl relative mx-4 
              ${
                activeModal === "register"
                  ? "w-[900px] h-auto"
                  : "w-[400px] h-[350px]"
              }`}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 text-2xl"
            >
              ❌
            </button>
            {activeModal === "login" && (
              <LoginForm
                setActiveModal={setActiveModal}
                onLoginSuccess={handleLoginSuccess}
              />
            )}
            {activeModal === "register" && (
              <RegisterForm setActiveModal={setActiveModal} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
