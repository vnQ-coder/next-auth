import TextField from "../../shared/Inputs/TextField";
import { Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";

const FormBody = ({ errors, control }: any) => {
  return (
    <>
      <div className="mb-4">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Email*"
              type="email"
              size="lg"
              placeholder={"Email"}
              crossOrigin={""}
            />
          )}
        />
        <span className="text-[10px] text-red-500">
          {errors.email && errors.email?.message}
        </span>
      </div>
      <div className="mb-4">
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Password*"
              type="password"
              size="lg"
              placeholder={"Password"}
              crossOrigin={""}
            />
          )}
        />
        <span className="text-[10px] text-red-500">
          {errors.password && errors.password?.message}
        </span>
      </div>
    </>
  );
};

export default FormBody;
