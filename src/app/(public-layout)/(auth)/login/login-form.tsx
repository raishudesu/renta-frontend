"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, LoaderCircle, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { userLoginSchema } from "@/schemas/user.schema";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof userLoginSchema>) => {
    try {
      const res = await signIn("user", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        // if (res.error === "EMAIL_NOT_VERIFIED") {
        //   localStorage.setItem("pendingConfirmationEmail", values.email);
        //   router.push("/confirm-email");
        //   return;
        // }

        toast.error("Oops! Something went wrong.", {
          description: res.error,
          richColors: true,
        });

        console.error("Login error:", res.error);
        return;
      }

      form.reset();

      toast.success("Logged in successfully", {
        description: "Welcome Aboard!",
        richColors: true,
      });

      router.replace("/");
    } catch (error) {
      toast.error("Something went wrong", {
        richColors: true,
        description: `Try again later. Error: ${error}`,
      });

      console.error(error);
    }
  };

  return (
    <Card className="w-full p-6">
      <CardHeader>
        <CardTitle className="text-4xl text-primary">
          Sign in to <span className="text-foreground">Renta</span>
        </CardTitle>
        <CardDescription className="text-lg">
          Book, Scan, and Drive - It&lsquo;s that Simple.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        placeholder="e.g johndoe@email.com"
                        className="pl-9"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute inset-y-0 right-0 px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={form.formState.isSubmitting}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Forgot your password?{" "}
                    <Link
                      href="/reset-password"
                      className="text-primary hover:underline"
                    >
                      Reset Password
                    </Link>
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="self-stretch flex gap-2"
              disabled={form.formState.isSubmitting}
            >
              {isSubmitting && (
                <LoaderCircle size={20} className="animate-spin" />
              )}
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col items-stretch">
        <Separator />
        <small className="my-4 text-center text-muted-foreground">
          Don&lsquo;t have an account?{" "}
        </small>
        <Button variant={"outline"} asChild>
          <Link href="/register" className="text-primary hover:underline">
            Create an account
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
