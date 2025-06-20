import type { User } from "@supabase/supabase-js";
import { Navbar } from "../../Components/Navbar";
import { Main } from "./Main";

interface HomeProps {
  user: User;
}

export const Home = ({ user }: HomeProps) => {
  return (
    <>
      <div className="min-h-screen min-w-screen bg-[var(--background)] flex flex-col w-full h-full">
        <Navbar />
        <Main user={user} />
      </div>
    </>
  );
};
