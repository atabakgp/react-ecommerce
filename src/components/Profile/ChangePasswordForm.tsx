import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { changePassword } from "../../services/profile/profileService";
import { useToast } from "../../context/ToastContext";

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

  const handleChangePassword: SubmitHandler<{
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }> = async (data) => {
    try {
      if (data.newPassword != data.confirmNewPassword) {
        setError("Passwords do not match");
        return;
      }
      await changePassword(data.currentPassword, data.newPassword);
      showToast("Password updated successfully", "success");
      setError("");
      reset();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <h4 className="mt-4">Change Password</h4>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <div className="mb-3">
          <label>Current Password</label>
          <input
            type="password"
            className={`form-control ${
              errors.currentPassword ? "is-invalid" : ""
            }`}
            {...register("currentPassword", {
              required: "password is required",
            })}
          />
          {errors.currentPassword && (
            <div className="invalid-feedback">
              {errors.currentPassword.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
            {...register("newPassword", { required: "password is required" })}
          />
          {errors.newPassword && (
            <div className="invalid-feedback">{errors.newPassword.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Confirm New Password</label>
          <input
            type="password"
            className={`form-control ${
              errors.confirmNewPassword ? "is-invalid" : ""
            }`}
            {...register("confirmNewPassword", {
              required: "password is required",
            })}
          />
          {errors.confirmNewPassword && (
            <div className="invalid-feedback">
              {errors.confirmNewPassword.message}
            </div>
          )}
        </div>
        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-success w-100">
          Change Password
        </button>
      </form>
    </>
  );
}

export default ChangePasswordForm;
