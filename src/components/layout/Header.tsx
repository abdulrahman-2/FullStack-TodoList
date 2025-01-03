"use client";

import React from "react";
import Logo from "../common/Logo";
import { ModeToggle } from "../common/ModeToggel";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserToggle } from "../common/UserToggle";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="container flex items-center justify-between p-5 sm:py-10">
      <Logo />
      <div className="flex items-center gap-3">
        {session ? (
          <>
            <UserToggle email={session.user?.email as string} />
          </>
        ) : (
          <Link href="/login">
            <Button className="font-bold px-5">Login</Button>
          </Link>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
