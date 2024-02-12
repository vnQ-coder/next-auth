import TextField from "../../shared/Inputs/TextField";
import { Controller } from "react-hook-form";
import { forwardRef } from "react";

const FormBody = forwardRef(({ errors, control }: any, ref) => {
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
    </>
  );
});

export default FormBody;
