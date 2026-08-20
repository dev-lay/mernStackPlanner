import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../src/Context";
import logoGif from "../src/assets/GIPHY Stickers.gif";
import { toast } from "react-toastify";
export default function Signup() {
  const navigate = useNavigate();

  const AUTH_URL = `${import.meta.env.VITE_API_URL}/api/auth/signup`;

  const { password, setPassword, username, setUsername } =
    useContext(AuthContext);

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

      const data = res.data;

      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);

      const errorMessage = error.response?.data?.message || "Signup failed";

      toast.error(errorMessage, {
        className: "alert alert-error alert-soft",
      });
    }
  };

  return (
    <div className="rounded-b-md bg-base-200 flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 flex content-center items-center flex-col">
          <img
            src={logoGif}
            alt="logo"
            className="z-10"
            width="100"
            height="800"
          />
          <h1 className="text-3xl font-bold">Create your account</h1>

          <p className="text-base-content/60 mt-2">
            Start organizing your tasks with Plano.
          </p>
        </div>

        {/* Signup Card */}
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
                  placeholder="Choose a username"
                  value={username}
                  className="input input-bordered w-full focus:input-primary"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
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
                  placeholder="Create a password"
                  value={password}
                  className="input input-bordered w-full focus:input-primary"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>

              {/* Signup button */}
              <button type="submit" className="btn btn-primary w-full mt-2">
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="divider text-sm text-base-content/50">OR</div>

            {/* Login */}
            <p className="text-center text-sm text-base-content/70">
              Already have an account?
              <Link to="/login" className="link link-primary font-medium ml-1">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-base-content/40 mt-6">
          Keep your plans organized with Plano.
        </p>
      </div>
    </div>
  );
}
