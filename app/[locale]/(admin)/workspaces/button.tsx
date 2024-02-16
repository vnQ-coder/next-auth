"use client";

import Button from "@/components/shared/Inputs/Button";
import { createAdmin } from "@/libs/actions/users";
import { toast } from "react-hot-toast";

function CreateAdmin() {
  const onClickAdmin = async () => {
    const resp = await createAdmin({
      firstName: "admin",
      lastName: "admin",
      email: "admin@example.com",
      role: "admin",
    });
    if (resp.code !== 200) {
      toast.error(resp.message);
    }
    console.log(resp);
  };
  return (
    <Button
      onClick={onClickAdmin}
      disabled={false}
      textColor="text-fontLightPrimary"
      type={"submit"}
      className="w-full rounded-lg"
    >
      Create Admin
    </Button>
  );
}

export default CreateAdmin;
