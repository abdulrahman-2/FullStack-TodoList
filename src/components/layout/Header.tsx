"use client";

import React from "react";
import Logo from "../common/Logo";
import { ModeToggle } from "../common/ModeToggel";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="container flex items-center justify-between py-10">
      <Logo />
      <div className="flex items-center gap-2 md:gap-5">
        {session ? (
          <>
            <Button onClick={() => signOut()} className="font-bold px-5">
              Logout
            </Button>
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
