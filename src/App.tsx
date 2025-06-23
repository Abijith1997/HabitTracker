import { useEffect, useState } from "react";
import "./App.css";
import { Home } from "./App/Inner/Home";
import { supabase } from "./supabaseClient";
import type { User } from "@supabase/supabase-js";
import { Login } from "./App/Login/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        setUser(null);
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      }
      setUser(data?.user);
    };
    fetchUser();
  }, []); // <- Run only once on component mount

  return (
    <>
      <Router basename="/HabitTracker">
        <Routes>
          <Route path="/" element={user ? <Home user={user} /> : <Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
