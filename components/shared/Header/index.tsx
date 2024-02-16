"use client";
import { signOut } from "next-auth/react";
import { Button } from "@material-tailwind/react";

function Header() {
  return (
    <header className={`z-0 py-4 main-header top-header`}>
      <div className="flex w-full justify-between items-center">
        <div>Headers</div>
        <Button
          children={<div>Logout</div>}
          placeholder={"Logout"}
          onClick={() =>
            signOut({ callbackUrl: "http://localhost:3000/en/login" })
          }
        />
      </div>
    </header>
  );
}

export default Header;
