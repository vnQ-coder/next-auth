"use client";
import { signOut } from "next-auth/react";
import Button from "../Inputs/Button";

function Header() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "http://localhost:3000/en/login" })}
      disabled={false}
      textColor="text-fontLightPrimary"
      type={"submit"}
      className="w-full rounded-lg"
    >
      Logout
    </Button>
  );
}

export default Header;
