import Link from "next/link";
import { Icons } from "./Icons";
import UserAuthForm from "./UserAuthForm";

const SignIn = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto w-15 h-15" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="max-w-xs mx-auto text-sm">
          By continuing, you are setting up a Threddit account and agree to our
          User Agreement and Privacy Policy.
        </p>

        {/* sign in form */}
        <UserAuthForm />

        <p className="px-8 text-sm text-center text-zinc-700">
          New to Threddit?{" "}
          <Link
            href="/sign-up"
            className="text-sm underline hover:text-zinc-800 underline-offset-2"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
