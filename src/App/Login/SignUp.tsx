import { IconPencil } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Button } from "../../Components/ui/button";
import { supabase } from "../../supabaseClient";

export interface SignUpFormValues {
  email: string;
  password: string;
  displayName: string;
  confirmPassword: string;
}

export const SignUp = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePicture: null as File | null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: "/HabitTracker",
        },
      });

      if (error) {
        console.error("Error signing up:", error.message);
        alert(error.message);
        return;
      }

      if (data.user) {
        console.log("User signed up successfully:", data.user);

        alert("Sign up successful! Please check your email to confirm.");
      }
    } catch (error) {
      console.error("Error signing up user:", (error as Error).message);
      alert("Sign up failed: " + (error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Sign Up</h2>

        {/* Profile Picture */}
        <div className="flex w-full items-center justify-center">
          <div
            className="relative h-20 w-20 p-1 rounded-full border border-black overflow-hidden cursor-pointer flex items-center justify-center"
            onClick={triggerFileSelect}
          >
            <img
              src={imageUrl || "https://via.placeholder.com/80"}
              alt="Profile"
              className="object-cover h-full w-full rounded-full"
            />
            <div className="absolute bottom-0 right-0 w-full flex items-center justify-center p-1 shadow-sm hover:bg-gray-100 ">
              <IconPencil size={16} className="text-gray-700" />
            </div>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col items-start">
          <label className="mb-1 font-medium w-full text-left">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        {/* Display Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-left">Display Name</label>
          <input
            type="text"
            name="displayName"
            required
            value={formData.displayName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Phone Number (optional) */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-left">
            Phone Number (optional)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col ">
          <label className="mb-1 font-medium text-left">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-left">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>

        <Button
          type="submit"
          className="w-[50%]  text-white py-2 rounded-md transition-all duration-150 ease-in-out cursor-pointer"
          variant={"default"}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};
