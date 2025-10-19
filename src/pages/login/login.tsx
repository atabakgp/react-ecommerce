import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { authService } from "@/services/auth/authService";
import { useUser } from "../../context/UserContext";

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

      setUser({ email, displayName, accessToken });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Firebase login error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-200 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Login
          </button>

          {/* Register link */}
          <div className="text-center text-gray-600 mt-2">
            <Link to="/register" className="text-blue-600 hover:underline">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
