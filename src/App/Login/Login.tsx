import { Button } from "@heroui/react";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { supabase } from "../../supabaseClient";

export const Login = () => {
  const signInWithGoogle = async () => {
    console.log("in sign in function");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`, // This ensures the OAuth flow uses a pop-up and doesn't redirect the user
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
  return (
    <div className="h-screen w-screen bg-[var(--background)] flex items-center justify-center">
      <div className="items-center justify-center sm:justify-start sm:max-h-[600px] max-w-[450px] bg-gray-400 h-full w-full rounded-md sm:rounded-0 shadow-lg flex flex-col text-black sm:items-start p-10 gap-5">
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
            variant="solid"
            className="w-auto h-10 flex items-center justify-center gap-2 text-white rounded-md "
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
            <Button className="text-center flex items-center justify-center">
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
            variant="solid"
            color="default"
            className="w-auto h-10 flex items-center justify-center gap-2"
          >
            <IconBrandGoogleFilled size={24} color="black" />
          </Button>
        </div>
      </div>
    </div>
  );
};
