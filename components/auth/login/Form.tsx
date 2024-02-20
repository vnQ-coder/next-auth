"use client";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./helper";
import { signIn } from "next-auth/react";
import LoadingSpinner from "@/components/shared/Spinner";
import { toast } from "react-hot-toast";
import { login } from "@/libs/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginFormInputs = z.infer<typeof schema>;

const LoginForm = ({ locale }: { locale: string }) => {
  const t = useTranslations("auth");
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const form = useForm<LoginFormInputs>({
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
    <div className="p-4 max-w-md w-full">
      <div className="text-lg font-semibold tracking-tight lg:text-xl">
        Hello!
      </div>
      <div className="text-lg font-semibold tracking-tight lg:text-sm">
        Welcome to Shuttlepro
      </div>
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-xs">Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="mt-4">
                  <FormLabel className="text-xs">Password*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Password"
                        type={passwordShow ? "text" : "password"}
                        {...field}
                      />
                      {passwordShow ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 absolute right-2 top-2 cursor-pointer"
                          onClick={() =>
                            setPasswordShow((prev: boolean) => !prev)
                          }
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 absolute right-2 top-2 cursor-pointer"
                          onClick={() =>
                            setPasswordShow((prev: boolean) => !prev)
                          }
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full mt-4 text-xs">
            {loading ? (
              <LoadingSpinner color={"#fafafe"} height={20} />
            ) : (
              t("loginButton")
            )}
          </Button>
          <div className="text-sm font-semibold text-right w-full mt-4 text-primary hover:underline">
            Forgot your password?
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
