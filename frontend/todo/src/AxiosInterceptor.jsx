import { useEffect, useContext, useRef } from "react";
import { AuthContext } from "./Context";
import axios from "axios";
export const AxiosInterceptor = ({ children }) => {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const tokenRef = useRef(accessToken);

  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    // 1. OUTGOING REQUEST CHECKPOINT
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (tokenRef.current) {
          if (config.headers.set) {
            config.headers.set("Authorization", `Bearer ${tokenRef.current}`);
          } else {
            config.headers["Authorization"] = `Bearer ${tokenRef.current}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // 2. INCOMING RESPONSE CHECKPOINT
    const responseInterceptor = axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
              {},
              {
                withCredentials: true,
                headers: { Authorization: undefined },
              },
            );

            const newAccessToken = response.data.newAccessToken;
            setAccessToken(newAccessToken);
            tokenRef.current = newAccessToken;
            if (originalRequest.headers.set) {
              originalRequest.headers.set(
                "Authorization",
                `Bearer ${newAccessToken}`,
              );
            } else {
              originalRequest.headers["Authorization"] =
                `Bearer ${newAccessToken}`;
            }
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Refresh failed:", refreshError.message);
            setAccessToken(null);
            tokenRef.current = null;
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    // CLEANUP
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [setAccessToken]);

  return children;
};
