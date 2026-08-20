import axios from "axios";
import { AuthContext } from "../src/Context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ManageAccount() {
  const { setAccessToken, username, setUsername, setPassword } =
    useContext(AuthContext);

  const navigate = useNavigate();

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      setAccessToken(null);
      setUsername("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.log(error.message);

      toast.error("Failed to logout", {
        className: "alert alert-error alert-soft",
      });
    }
  };

  // =========================
  // DELETE ACCOUNT
  // =========================
  const deleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This will permanently delete your account and all of your tasks.",
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/delete`, {
        withCredentials: true,
      });

      setAccessToken(null);
      setUsername("");
      setPassword("");
      toast.success("Account deleted successfully");
      navigate("/signup");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to delete Account", {
        className: "alert alert-error alert-soft",
      });
    }
  };

  return (
    <div className=" rounded-md bg-base-200 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/todo")}
            className="btn btn-ghost btn-sm mb-3"
          >
            ← Back to tasks
          </button>

          <h1 className="text-2xl font-bold">Welcome {username}</h1>
          <p className="text-base-content/60 mt-1">
            Manage your account and session.
          </p>
        </div>
        {/* ACCOUNT ACTIONS */}
        <div className="card bg-base-100 border border-error/30 shadow-sm">
          <div className="card-body">
            {/* LOGOUT */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-semibold">Logout</h3>

                <p className="text-sm text-base-content/60">
                  End your current session.
                </p>
              </div>

              <button onClick={logout} className="btn btn-outline">
                Logout
              </button>
            </div>

            <div className="divider"></div>

            {/* DELETE ACCOUNT */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-semibold text-error">Delete Account</h3>

                <p className="text-sm text-base-content/60">
                  Permanently delete your account and all of your tasks.
                </p>
              </div>

              <button onClick={deleteAccount} className="btn btn-error">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
