"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signIn, signUp } from "@/lib/actions/auth.action";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-in" ? z.string().optional() : z.string().min(2),
    email: z.email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error("Sign in failed.Please try again");
          return;
        }

        const result = await signIn({
          idToken,
        });

        if (!result.success) {
          toast.error("Sign in failed.Please try again");
          return;
        }

        toast.success("Sign in successfully");
        router.push("/");
      }

      if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        router.push("/sign-in");
        toast.success(result.message);
      }
    } catch (error) {
      toast.error("error:" + error);
    }
  }

  const isSignin = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[556px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row justify-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4 form"
          >
            {!isSignin && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="name"
                type="text"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="password"
              type="password"
            />
            <Button type="submit" className="btn">
              {isSignin ? "Sign In" : " Create an acount"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignin ? "No account yet ?" : "Have an account already ?"}
          <Link
            href={isSignin ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1 border-b-1 border-white/50"
          >
            {isSignin ? " Create an acount" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
