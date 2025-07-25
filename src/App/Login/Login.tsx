import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { supabase } from "../../supabaseClient";
import { Button } from "../../Components/ui/button";
import type { User } from "@supabase/supabase-js";
import { useEffect } from "react";

interface LoginProps {
  user: User | null;
}

export const Login = ({ user }: LoginProps) => {
  useEffect(() => {
    if (user && window.location.pathname !== "/HabitTracker/") {
      window.location.replace("/HabitTracker/");
    }
  }, [user]);

  const signInWithGoogle = async () => {
    console.log("in sign in function");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${window.location.pathname}`,
      },
    });

    if (error) {
      console.log("Google sign-in error:", error);
      return { error };
    }
    return { error: null };
  };

  const onGoogleSignIn = async () => {
    const error = await signInWithGoogle();
    if (error) {
      console.error("Unable to sign in with Google.", error);
    } else {
      console.log("User signed in succesfully with Google.");
    }
  };

  const createNew = () => {
    window.location.href = "/HabitTracker/signup";
  };

  return (
    <div className="h-screen w-screen bg-[var(--background)] flex items-center justify-center">
      <div className="items-center justify-center sm:justify-start sm:max-h-[600px] max-w-[450px] bg-gray-400 h-full w-full sm:rounded-md sm:rounded-0 shadow-lg flex flex-col text-black sm:items-start p-10 gap-5">
        <div className="heading w-full text-center font-extrabold text-md sm:text-2xl font-stretch-120%">
          Login
        </div>
        <div className="email-group w-full flex flex-col items-start">
          <label htmlFor="email">
            <p className="sm:text-lg text-md">Email:</p>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="rounded-md px-2 py-1 placeholder:text-white/40 border-1 border-white/40 w-full focus:border-1 focus:border-blue-300 focus:outline-0 bg-gray-800"
          />
        </div>
        <div className="password-group w-full flex flex-col items-start">
          <label htmlFor="password">
            <p className="sm:text-lg text-md">Password:</p>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className=" rounded-md px-2 py-1 placeholder:text-white/40 border-1 border-white/40 w-full focus:border-1 focus:border-blue-300 focus:outline-0 bg-gray-800"
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <Button
            className="w-auto h-10 flex items-center justify-center gap-2 text-white rounded-md cursor-pointer"
            color="primary"
          >
            Login
          </Button>
        </div>
        <div className="forgot w-full flex items-start justify-start">
          <a href="#" className="text-gray-300 hover:text-gray-500">
            Forgot password?
          </a>
        </div>
        <div className="new w-full flex items-center justify-center">
          <span className="">
            New to the app?{" "}
            <Button
              className="text-center flex items-center justify-center rounded-md hover:shadow-md hover:scale-101 cursor-pointer transition-all duration-150 ease-in-out"
              color="primary"
              onClick={createNew}
            >
              Create an account
            </Button>
          </span>
        </div>
        <div className="w-full text-black font-extrabold or relative z-0 flex items-center justify-center">
          <p className="opacity-100 bg-gray-400 w-fit-content flex px-1">
            Or sign in using
          </p>
        </div>
        <div className="google-button w-full flex items-center justify-center">
          <Button
            onClick={onGoogleSignIn}
            color="default"
            className="w-auto h-10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <IconBrandGoogleFilled size={24} color="white" />
          </Button>
        </div>
      </div>
    </div>
  );
};
