import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className="navbar bg-primary text-primary-content rounded-t-md px-4 py-2">
      {/* Logo / description */}
      <div className="flex-1">
        <div>
          <h1 className="text-2xl font-medium">Plano</h1>

          <p className="text-sm hidden sm:block">
            Use this app to remember whatever you want to do
          </p>
        </div>
      </div>

      {/* Account button - Todo only */}
      {location.pathname === "/todo" && (
        <Link to="/manageAccount" className="group relative">
          <FaUserCircle className="text-2xl cursor-pointer" />

          <span
            className="
              absolute right-0 top-full mt-2
              z-10
              bg-primary
              text-secondary-content
              px-2 py-1
              rounded
              whitespace-nowrap
              text-sm font-bold
              opacity-0
              pointer-events-none
              transition-opacity
              group-hover:opacity-100
            "
          >
            Manage Account
          </span>
        </Link>
      )}
    </header>
  );
}
