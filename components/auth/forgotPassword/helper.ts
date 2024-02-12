import { z } from "zod";

export const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
});
