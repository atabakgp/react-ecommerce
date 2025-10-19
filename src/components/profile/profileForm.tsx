import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import { profileService } from "@/services/profile/profileService";
import { useToast } from "../../context/ToastContext";

function ProfileForm() {
  const [error, setError] = useState("");
  const { user, setUser } = useUser();
  const { showToast } = useToast();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<{ name: string }>({
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (user) {
      resetProfile({ name: user.displayName ?? "" });
    }
  }, [user, resetProfile]);

  const updateProfile: SubmitHandler<{ name: string }> = async (data) => {
    try {
      const firebaseUser = await profileService.updateUserProfile({
        displayName: data.name,
      });
      const displayName = firebaseUser.displayName;
      setUser((prev) => ({ ...prev, displayName }));
      showToast("Profile updated successfully!", "success");
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md  bg-white p-6 rounded-lg shadow-md">
      <div>
        <form
          onSubmit={handleProfileSubmit(updateProfile)}
          className="flex flex-col gap-4"
        >
          {/* Error message */}
          {error && <p className="text-red-600 font-medium">{error}</p>}

          {/* Name input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...registerProfile("name", { required: "Name is required" })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                profileErrors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {profileErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {profileErrors.name.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
          >
            Update Your Name
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
