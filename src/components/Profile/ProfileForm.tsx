import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import {
  updateUserProfile,
  updateUserEmail,
} from "../../services/profileServices";

import { useToast } from "../../context/ToastContext";


function ProfileForm() {
  const [error, setError] = useState("");
  const { user, setUser } = useUser();
  const { showToast } = useToast();

  // Form 1: Profile (Display Name)
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

  // Form 2: Email
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
    reset: resetEmail,
  } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      resetProfile({ name: user.displayName ?? "" });
      resetEmail({ email: user.email ?? "" });
    }
  }, [user, resetProfile, resetEmail]);

  const updateProfile: SubmitHandler<{ name: string }> = async (data) => {
    try {
      const firebaseUser = await updateUserProfile(data.name);
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
