import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthContext = createContext(null);
export default function Provider({ children }) {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null); //it should i searched i search cuz if u did wait
  const [authLoading, setAuthLoading] = useState(true);
  const [taskName, setTaskName] = useState("");
  const [clickedColor, setClickedColor] = useState({
    name: "gray",
    bg: "bg-gray-400",
    text: "text-gray-400",
  });
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //when we refresh the page , while the user is still authorized
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
          {},
          { withCredentials: true },
        );
        setAccessToken(response.data.accessToken);
        setUsername(response.data.username);
        navigate("/todo");
      } catch (error) {
        setAccessToken(null);
        navigate("/login");
        console.log(error.message);
      } finally {
        setAuthLoading(false);
      }
    };

    initializeAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        authLoading,
        setAuthLoading,
        username,
        setUsername,
        password,
        setPassword,
        tasks,
        setTasks,
        taskName,
        setTaskName,
        clickedColor,
        setClickedColor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
