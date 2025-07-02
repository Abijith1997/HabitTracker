import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { IconSettings } from "@tabler/icons-react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import type { User } from "@supabase/supabase-js";

export const Navbar = ({
  user,
  setUser,
}: {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed navbar w-full sm:h-20 px-5 flex items-center justify-between navbar font-open font-extrabold font-stretch-75% font-sans z-[1000] opacity-100">
      <div className="app-name flex items-center gap-2 justify-center text-xs">
        <h1 className="text-bold text-white font-open px-1 py-1 bg-yellow ">
          Tracker
        </h1>
      </div>
      <div className="navbar-right flex gap-5">
        {!user ? (
          <Button
            className="cursor-pointer hover:scale-101"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        ) : (
          <Dropdown>
            <DropdownTrigger>
              <IconSettings
                size={32}
                color={"white"}
                className="hover:cursor-pointer hover:scale-110 transition-all duration-150 focus:outline-0"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              className="flex flex-col bg-gray-800 px-5 py-3 rounded-md gap-2 shadow-md"
            >
              <DropdownItem
                key="settings"
                className="text-white hover:scale-110 hover:bg-gray-500 transition-all duration-150 rounded-md p-2 cursor-pointer"
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-white hover:scale-110 hover:bg-red-500 transition-all duration-150 rounded-md p-2 cursor-pointer"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/");
                  setUser(null);
                }}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};
