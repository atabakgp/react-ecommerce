import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import { updateUserEmail } from "../../services/profile/profileService";
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
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({ email: user.email ?? "" });
    }
  }, [user, reset]);

  const updateEmail: SubmitHandler<{ email: string }> = async (data) => {
    try {
      const firebaseUser = await updateUserEmail(data.email);
      const email = firebaseUser.email;
      setUser((prev) => ({
        ...prev,
        email,
      }));
      showToast("Email updated successfully!", "success");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <h4 className="mt-4">Update Email</h4>
      <form onSubmit={handleSubmit(updateEmail)}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className={`form-control ${emailErrors.email ? "is-invalid" : ""}`}
            {...register("email", { required: "Email is required" })}
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

export default EmailForm;
