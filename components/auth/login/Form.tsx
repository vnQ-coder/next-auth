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
import LoadingSpinner from "@/components/shared/Spinner";
import { login } from "@/libs/actions/auth";
import { toast } from "react-hot-toast";

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
      const response = await login(data);
      if (response && response.code === 200) {
        signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: `/${locale}/workspaces`,
          redirect: true,
        });
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    },
    []
  );

  return (
    <form autoComplete="off" action="">
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
