import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../src/Context";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const { setAccessToken, setPassword, username, password, setUsername } =
    useContext(AuthContext);

  const AUTH_URL = `${import.meta.env.VITE_API_URL}/api/auth/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        AUTH_URL,
        { username, password },
        {
          withCredentials: true,
        },
      );
      setAccessToken(res.data.accessToken);
      toast.success("Logged in successfully!");
      navigate("/todo");
    } catch (error) {
      console.log(error.message);

      toast.error(error.response?.data?.message || "Login failed!", {
        className: "alert alert-error alert-soft",
      });
    }
  };

  return (
    <div className="rounded-b-md bg-base-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Brand / Intro */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Welcome back</h1>

          <p className="text-base-content/60 mt-2">
            Log in to continue managing your tasks.
          </p>
        </div>

        {/* Login Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Username */}
              <div className="form-control">
                <label htmlFor="username" className="label">
                  <span className="label-text font-medium">Username</span>
                </label>

                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  className="input input-bordered w-full focus:input-primary"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text font-medium">Password</span>
                </label>

                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  className="input input-bordered w-full focus:input-primary"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Login button */}
              <button type="submit" className="btn btn-primary w-full mt-2">
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="divider text-sm text-base-content/50">OR</div>

            {/* Signup */}
            <p className="text-center text-sm text-base-content/70">
              Don't have an account?
              <Link to="/signup" className="link link-primary font-medium ml-1">
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-base-content/40 mt-6">
          Welcome to Plano — keep your plans organized.
        </p>
      </div>
    </div>
  );
}
