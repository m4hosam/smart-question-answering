"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ProfileAvatar } from "@/components/profileAvatar";

export default function NavbarStudent() {
  const { data: session, status } = useSession();
  const [isUser, setIsUser] = useState(false);
  const [userChar, setUserChar] = useState("U");

  useEffect(() => {
    if (status === "authenticated") {
      setIsUser(true);
      // console.log("Signed in as", session?.user?.email);
    }
    setUserChar(session?.user?.name?.charAt(0) ?? "U");
  }, [status, session]);
  // console.log("session in navbar: ", session);
  return (
    <Navbar fluid className="bg-[#14213d] min-h-16 pt-3">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Logo
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {/* <Button className="mr-2">Sign In</Button> */}
        {isUser ? (
          <div className="mr-5">
            <ProfileAvatar userChar={userChar} />
          </div>
        ) : (
          <Link
            href="/account/login"
            className="py-1.5 px-5 mr-5 mt-1 text-sm font-medium
                             text-gray-900 focus:outline-none
                              bg-white rounded-full border border-gray-200
                               hover:bg-gray-100 hover:text-blue-700 focus:z-10
                                focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700
                                 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
                                  dark:hover:text-white dark:hover:bg-gray-700"
          >
            Sign In
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {/* if user role is teacher add link to /teacher */}
        {session?.user?.role === "teacher" && (
          <Navbar.Link
            href="/teacher"
            className="text-white hover:text-cyan-400 hover:bg-cyan-800"
          >
            Teacher
          </Navbar.Link>
        )}
        <Navbar.Link
          href="/"
          className="  text-white hover:text-cyan-400 hover:bg-cyan-800  "
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/myquestions"
          className="text-white hover:text-cyan-400 hover:bg-cyan-800"
        >
          My Questions
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
