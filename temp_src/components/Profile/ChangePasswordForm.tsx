import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { profileService } from "@/services/profile/profileService";
import { useToast } from "@/context/ToastContext";

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

function ChangePasswordForm() {
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const handleChangePassword: SubmitHandler<ChangePasswordForm> = async (
    data
  ) => {
    try {
      if (data.newPassword !== data.confirmNewPassword) {
        setError("Passwords do not match");
        return;
      }

      await profileService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      showToast("Password updated successfully", "success");
      setError("");
      reset();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="flex flex-col gap-4"
      >
        {/* Current Password */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            {...register("currentPassword", {
              required: "Password is required",
            })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.currentPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword", { required: "Password is required" })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register("confirmNewPassword", {
              required: "Password is required",
            })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        {/* Error message */}
        {error && <p className="text-red-600 font-medium">{error}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
