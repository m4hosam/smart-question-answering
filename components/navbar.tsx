"use client";

import { Dropdown, Navbar } from "flowbite-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function NavbarStudent() {
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
