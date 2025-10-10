import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import { profileService } from "@/services/profile/profileService";
import { useToast } from "../../context/ToastContext";

function EmailForm() {
  const [error, setError] = useState("");
  const { user, setUser } = useUser();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors: emailErrors },
    reset,
  } = useForm<{ email: string }>({
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (user) {
      reset({ email: user.email ?? "" });
    }
  }, [user, reset]);

  const updateEmail: SubmitHandler<{ email: string }> = async (data) => {
    try {
      const firebaseUser = await profileService.updateUserEmail({
        email: data.email,
      });
      const email = firebaseUser.email;
      setUser((prev) => ({ ...prev, email }));
      showToast("Email updated successfully!", "success");
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit(updateEmail)}
        className="flex flex-col gap-4"
      >
        {/* Error message */}
        {error && <p className="text-red-600 font-medium">{error}</p>}

        {/* Email input */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              emailErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailErrors.email && (
            <p className="text-red-500 text-sm mt-1">
              {emailErrors.email.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
        >
          Update Email
        </button>
      </form>
    </div>
  );
}

export default EmailForm;
