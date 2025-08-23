import z from "zod";

export const userRegistrationSchema = z
  .object({
    email: z.email(),
    firstName: z
      .string()
      .min(2, "First name must contain at least 2 characters")
      .max(50),
    lastName: z
      .string()
      .min(2, "Last Name must contain at least 2 characters")
      .max(50),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const userLoginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    ),
});

export const businessCoordinatesSchema = z.object({
  businessCoordinatesString: z.string().min(1),
});

export const passwordUpdateSchema = z
  .object({
    userId: z.string(),
    currentPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    newPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    confirmNewPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });
