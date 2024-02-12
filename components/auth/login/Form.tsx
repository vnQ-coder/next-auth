"use client";

import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./helper";
import FormBody from "./FormBody";
import Button from "../../shared/Inputs/Button";

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
        const response = await fetch(
          `https://endpoint.freshdesk.com/api/v2/tickets/28/reply`,
          {
            body: "We are working on this issue. Will keep you posted.",
            headers: {
              Authorization: "Basic " + base64.encode("APIKEY:X"),
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );

        if (response.status >= 400) {
          return res.status(400).json({
            error: "There was an error",
          });
        }

        return res.status(200).json({ status: "ok" });
      } catch (err) {}
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
