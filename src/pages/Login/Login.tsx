// src/pages/Login/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { authService } from "@/services/auth/authService";
import { useUser } from "../../context/UserContext";
import { useLoading } from "../../context/LoadingContext";

type Login = {
  email: string;
  password: string;
};

function Login() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const { setUser } = useUser();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      const userCredential = await authService.login(data.email, data.password);

      const firebaseUser = userCredential.user;
      const accessToken = await firebaseUser.getIdToken();
      const email = firebaseUser.email;
      const displayName = firebaseUser.displayName;

      setUser({
        email,
        displayName,
        accessToken,
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Firebase login error:", error);
      setError(error.message);
      console.error("Firebase login error:", error.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Display error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Email field */}
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        {/* Password field */}
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        {/* Link to registration page */}
        <div className="mt-3 text-center">
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
