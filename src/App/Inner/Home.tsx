import type { User } from "@supabase/supabase-js";
import { Navbar } from "../../Components/Navbar";
import { Main } from "./Main";

interface HomeProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const Home = ({ user, setUser }: HomeProps) => {
  return (
    <>
      <div className="min-h-screen min-w-screen bg-[var(--background)] flex flex-col w-full h-full relative">
        <div className="z-10">
          <Navbar user={user} setUser={setUser} />
        </div>
        <div className="z-1 mt-10">
          <Main user={user} />
        </div>
      </div>
    </>
  );
};
