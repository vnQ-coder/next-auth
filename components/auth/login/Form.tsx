"use client";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./helper";
import FormBody from "./FormBody";
import Button from "../../shared/Inputs/Button";
import { signIn } from "next-auth/react";
import { postRequestBody, sendRequest } from "@/utils";
import LoadingSpinner from "@/components/shared/Spinner";

type LoginFormInputs = z.infer<typeof schema>;

const LoginForm = ({ locale }: { locale: string }) => {
  const t = useTranslations("auth");
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<LoginFormInputs> = useCallback(
    async (data) => {
      setLoading(true);
      const response = await sendRequest(`auth/login`, postRequestBody(data));
      if (response) {
        signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: `/${locale}/workspaces`,
          redirect: true,
        });
      }
      setLoading(false);
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
          className="w-full rounded-lg"
        >
          {loading ? <LoadingSpinner color={"#fafafe"} /> : t("loginButton")}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
