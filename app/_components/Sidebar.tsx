"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bot,
  ChevronsUpDown,
  HelpCircle,
  LogOut,
  Mail,
  MessageCircle,
  User,
} from "lucide-react";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/hooks/user.hook";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeAuthToken } from "@/lib/ServerActions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Sidebar = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="w-[300px] border-r bg-muted/20 h-screen">
      <div className="p-4 flex items-center">
        <Bot className="size-5" />
        <p className="ml-2 font-medium">Chess Bot</p>
      </div>
      <Separator />
      <ScrollArea className="h-[calc(100vh-115px)]">
        <div className="space-y-2 p-4">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Recent Chats
          </h2>
          <Button
            onClick={() => router?.push("/chat")}
            variant={path === "/chat" ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
          >
            <MessageCircle size={16} />
            {user?.userName}'s Chat
          </Button>
          <Separator className="my-4" />
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            FAQ
          </h2>
          <Button
            onClick={() => router?.push("/faq")}
            variant={path === "/faq" ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
          >
            <HelpCircle size={16} />
            Upload FAQ
          </Button>
        </div>
      </ScrollArea>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="flex justify-center items-center mx-auto"
          >
            <div className="border rounded-lg p-1 mx-2 cursor-pointer">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {user?.userName[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="truncate font-medium ml-2">
                  {user?.userName}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-5" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px]">
            <DropdownMenuLabel className="flex flex-col">
              <span>Signed in as</span>
              <span className="flex font-normal items-center mt-3">
                <User className="size-4 mr-2" /> {user?.userName}
              </span>
              <span className="flex items-center font-normal mt-2">
                <Mail className="size-4 mr-2" /> {user?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center cursor-pointer"
              onClick={() => {
                setUser(null);
                removeAuthToken();
                router?.push("/login");
              }}
            >
              <LogOut className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
