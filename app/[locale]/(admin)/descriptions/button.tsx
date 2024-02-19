"use client";

import Button from "@/components/shared/Inputs/Button";

function CreateAdmin() {
  const onClickAdmin = async () => {};
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
