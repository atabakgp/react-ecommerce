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
    defaultValues: {
      name: "",
    },
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
      setUser((prev) => ({
        ...prev,
        displayName,
      }));
      showToast("Profile updated successfully!", "success");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <h2>Profile</h2>

      <div>
        <h4>Update Display Name</h4>
        <form onSubmit={handleProfileSubmit(updateProfile)}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className={`form-control ${
                profileErrors.name ? "is-invalid" : ""
              }`}
              {...registerProfile("name", { required: "Name is required" })}
            />
            {profileErrors.name && (
              <div className="invalid-feedback">
                {profileErrors.name.message}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
}

export default ProfileForm;
