import TextField from "../../shared/Inputs/TextField";
import { Controller } from "react-hook-form";

const FormBody = ({ errors, control }: any) => {
  return (
    <>
      <div className="mb-4">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email*"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
      </div>
      <div className="mb-4">
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Password*"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
      </div>
    </>
  );
};

export default FormBody;
