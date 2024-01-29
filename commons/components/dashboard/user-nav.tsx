"use client";

import { FaCirclePlay } from "react-icons/fa6";

import { LogoutButton } from "@/commons/components/auth/auth-logout-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/commons/components/ui/avatar";
import { Button } from "@/commons/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/commons/components/ui/dropdown-menu";
import { SessionData } from "@/commons/lib/session";
import Link from "next/link";

interface UserNavProps {
  user: SessionData;
  title: string;
  desc: string;
  children?: React.ReactNode;
}

export default function UserNav({ user, title, desc, children }: UserNavProps) {
  return (
    <nav className="w-full px-6 bg-primary">
      <div className="flex justify-between items-center py-5 rounded-b-md flex-row w-full px-4  mx-auto ">
        <div>
          <Link href="/">
            <h1 className="text-3xl flex flex-row items-center gap-x-2 text-white font-extrabold -skew-x-12 font-mono ">
              {title}
              <FaCirclePlay className="h-10 w-10" />
            </h1>
            <h1 className="text-gray-100 text-xs">{desc}</h1>
          </Link>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={`@${user.username}`} />
                  <AvatarFallback>
                    {user.username.split("")[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.username}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <LogoutButton variant="default" modal={true}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
