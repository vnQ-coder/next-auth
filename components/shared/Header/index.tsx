"use client";
import { signOut } from "next-auth/react";
import Button from "../Inputs/Button";

function Header() {
  return (
    <header className={`z-0 py-4 main-header top-header`}>
      headers
      {/* <Button
        onClick={() =>
          signOut({ callbackUrl: "http://localhost:3000/en/login" })
        }
        disabled={false}
        textColor="text-fontLightPrimary"
        type={"submit"}
        className="w-full rounded-lg"
      >
        Logout
      </Button> */}
    </header>
  );
}

export default Header;
