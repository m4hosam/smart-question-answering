import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

import { signOut } from "next-auth/react";

export function ProfileAvatar({ userChar }: Readonly<{ userChar: string }>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>{userChar}</AvatarFallback>
        </Avatar>
        {/* <button>f</button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 ">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/account">
            <DropdownMenuItem>Details</DropdownMenuItem>
          </Link>
          <Link href="/myquestions">
            <DropdownMenuItem>My Questions</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign Out </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
