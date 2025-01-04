"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import InputField from "@/components/common/InputField";
import { VscEye } from "react-icons/vsc";
import { z } from "zod";
import { loginSchema } from "@/zod/ValidationSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Github from "./Github";
import Google from "./Google";
import toast from "react-hot-toast";
import { login } from "@/lib/actions/authActions";

type FormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleErrorToast = () => {
    const { errors } = form.formState;
    const messages = Object.values(errors)
      .map((err) => err.message)
      .join("\n");
    if (messages) {
      toast.error(messages);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await login(data);

      if (response.success) {
        toast.success(response.success);
        form.reset();
        router.push("/todos");
      } else {
        toast.error(response.error || "Login failed");
      }
    } catch (error) {
      toast.error(`Login failed ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <FormProvider {...form}>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Github or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-5">
              <Github />
              <Google />
            </div>
            <form onSubmit={form.handleSubmit(onSubmit, handleErrorToast)}>
              <div className="grid gap-6">
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  <InputField
                    label="Email"
                    type="email"
                    id="email"
                    placeholder="m@example.com"
                  />
                  <div className="relative">
                    <InputField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                    />
                    <VscEye
                      className={`text-muted-foreground text-xl absolute right-4 bottom-[10px] cursor-pointer ${
                        showPassword && "text-primary"
                      } ${
                        form.formState.errors.password &&
                        "right-8 bottom-[20px]"
                      }`}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="signUp"
                    className="underline text-primary underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </FormProvider>
      </Card>
      <div className="max-w-[60%] mx-auto text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
