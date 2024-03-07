"use client";

import { Dropdown, Navbar } from "flowbite-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function NavbarStudent() {
  const { data: session, status } = useSession();
  console.log("session in navbar: ", session);
  return (
    <Navbar fluid rounded className="bg-gray-200">
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Logo
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {/* <Button className="mr-2">Sign In</Button> */}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Mohamed Hosam</span>
            <span className="block truncate text-sm font-medium">
              name@logo.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>My Account</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
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
        <button onClick={() => signOut()} className="text-red-500">
          Sign Out
        </button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="#"
          active
          className="bg-zinc-400  text-white dark:text-white md:bg-transparent md:text-cyan-700"
        >
          Home
        </Navbar.Link>
        <Navbar.Link href="#">My Questions</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
