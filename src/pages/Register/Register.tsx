import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authServices";
import { useState } from "react";

type Register = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Register> = async (data) => {
    try {
      const userCredential = await registerUser(
        data.email,
        data.password,
        data.name
      );

      console.log("User registered:", userCredential.user);
      // Store user or token info if needed
      localStorage.setItem("user", JSON.stringify(userCredential.user));

      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
      console.error("Firebase registration error:", error.message);
    }
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Display error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Name field */}
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

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

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>

        <div className="mt-3 text-center">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
