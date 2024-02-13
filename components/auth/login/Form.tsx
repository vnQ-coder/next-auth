"use client";

import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./helper";
import FormBody from "./FormBody";
import Button from "../../shared/Inputs/Button";
import { signIn } from "next-auth/react";

type LoginFormInputs = z.infer<typeof schema>;

const LoginForm = () => {
  const t = useTranslations("auth");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });
  const handleFormSubmit: SubmitHandler<LoginFormInputs> = useCallback(
    async (data) => {
      console.log(data);
      try {
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
          body: JSON.stringify(data), // Convert data to JSON string
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (response.status === 200) {
          // Handle successful response
          const responseData = await response.json();
          if (responseData.code === 200) {
            signIn("credentials", {
              email: data.email,
              password: data.password,
              callbackUrl: "/en/workspaces",
              redirect: true,
            });
          } else {
            console.log(responseData, "response data");
          }
        } else {
          // Handle error response
          const errorData = await response.json();
          console.error(errorData, "error data");
        }
      } catch (err) {
        console.error(err, "error");
      }
    },
    []
  );

  return (
    <form autoComplete="off">
      <FormBody errors={errors} control={control} />
      <div className="text-center text-white pt-2">
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          disabled={false}
          textColor="text-fontLightPrimary"
          type={"submit"}
          className="w-full"
        >
          {t("loginButton")}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
