"use client";

import { Navbar } from "flowbite-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ProfileAvatar } from "@/components/profileAvatar";

export default function NavbarStudent() {
  const { data: session, status } = useSession();
  let isUser = false;
  if (status === "authenticated") {
    isUser = true;
    // console.log("Signed in as", session?.user?.email);
  }
  const userChar = session?.user?.name?.charAt(0) ?? "U";
  // console.log("session in navbar: ", session);
  return (
    <Navbar fluid rounded className="bg-gray-200">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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
            className="py-1.5 px-5 mr-5 text-sm font-medium
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
        <Navbar.Link
          href="/"
          active
          className="bg-zinc-400  text-white dark:text-white md:bg-transparent md:text-cyan-700"
        >
          Home
        </Navbar.Link>
        <Navbar.Link href="/myquestions">My Questions</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
