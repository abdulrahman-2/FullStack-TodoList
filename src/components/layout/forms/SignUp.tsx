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
import { z } from "zod";
import { registerSchema } from "@/zod/ValidationSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VscEye } from "react-icons/vsc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { register } from "@/lib/actions/authActions";

type FormData = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await register(data);

      if (response.success) {
        toast.success(response.success);
        form.reset();
        router.push("/login");
      } else {
        toast.error(response.error || "Registration failed");
      }
    } catch (error) {
      toast.error(`Registration failed ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <FormProvider {...form}>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Sign up</CardTitle>
            <CardDescription>
              Welcome to Quick Task! Please enter your details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit, handleErrorToast)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <InputField label="Name" type="text" id="name" />
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
                  <InputField
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                  />
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    {isSubmitting ? "Signing up..." : "Sign up"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary underline underline-offset-4"
                  >
                    Login
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
