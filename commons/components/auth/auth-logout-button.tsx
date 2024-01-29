"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/commons/components/ui/alert-dialog";
import { Button } from "@/commons/components/ui/button";
import { logout } from "@/commons/lib/actions/auth";

import React from "react";
// @ts-ignore
import { useFormStatus } from "react-dom";

interface LogoutButtonProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  modal: boolean;
  asChild?: boolean;
}

export const LogoutButton = ({
  children,
  variant,
  modal,
  asChild,
}: LogoutButtonProps) => {
  const { pending } = useFormStatus();

  const onClick = () => {
    logout();
  };
  if (modal) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children ? (
            children
          ) : (
            <Button variant={variant} size="lg">
              Logout
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to logout? All unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClick}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
