import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import {
  updateUserProfile,
  updateUserEmail,
} from "../../services/profileServices";
import { UserProfile } from "../../types/profile";
import { auth } from "../../firebase/firebase";

function ProfileForm() {
  const [error, setError] = useState("");
  const { user, setUser } = useUser();

  // Form 1: Profile (Display Name)
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<{ name: string }>({
    defaultValues: {
      name: ""
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
      email: ""
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
    } catch (error: any) {
      setError(error.message);
    }
  };

  const updateEmail: SubmitHandler<{ email: string}> = async (data) => {
    try {
      const firebaseUser = await updateUserEmail(data.email);
      const email = firebaseUser.email;
      setUser((prev) => ({
        ...prev,
        email,
      }));
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <h2>Profile</h2>

      <h4>Update Display Name</h4>
      <form onSubmit={handleProfileSubmit(updateProfile)}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className={`form-control ${profileErrors.name ? "is-invalid" : ""}`}
            {...registerProfile("name", { required: "Name is required" })}
          />
          {profileErrors.name && (
            <div className="invalid-feedback">{profileErrors.name.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-success w-100">
          Update Profile
        </button>
      </form>

      <h4 className="mt-4">Update Email</h4>
      <form onSubmit={handleEmailSubmit(updateEmail)}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className={`form-control ${emailErrors.email ? "is-invalid" : ""}`}
            {...registerEmail("email", { required: "Email is required" })}
          />
          {emailErrors.email && (
            <div className="invalid-feedback">{emailErrors.email.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-success w-100">
          Update Email
        </button>
      </form>
    </>
  );
}

export default ProfileForm;
