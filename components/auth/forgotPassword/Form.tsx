"use client";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./helper";
import FormBody from "./FormBody";
import Button from "../../shared/Inputs/Button";

type ForgotPasswordFormInputs = z.infer<typeof schema>;

const ForgotPasswordForm = () => {
  const t = useTranslations("auth");
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<ForgotPasswordFormInputs> = useCallback(
    (data) => {
      console.log(data);
    },
    []
  );

  return (
    <form autoComplete="off">
      <FormBody errors={errors} control={control} />
      <div className="text-center text-white pt-2">
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          disabled={loading}
          textColor="text-fontLightPrimary"
          type={"submit"}
          className="w-full"
        >
          {t("send-email")}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
