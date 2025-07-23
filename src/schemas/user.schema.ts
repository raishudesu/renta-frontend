import z from "zod";

export const userRegistrationSchema = z.object({
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

export const userLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
