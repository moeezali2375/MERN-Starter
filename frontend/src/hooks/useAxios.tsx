import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@/context/User/UserHook";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:4000/api",
});

const useAxios = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    console.log("axios useEffect");
    const reqInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (user) {
          const token = user.token;
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error("Request Error: ", error);
        return Promise.reject(error);
      }
    );

    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status == 403) {
          toast({
            variant: "destructive",
            description:
              error.response?.data || "An error occurred during login.",
          });
          navigate("/verify");
        } else if (error.response?.status == 401) {
          toast({
            variant: "destructive",
            description:
              error.response?.data || "An error occurred during login.",
          });
          logout();
          navigate("/");
        } else if (!error.response) {
          //! Network Error
          toast({
            variant: "destructive",
            description: error.message || "An error occurred during login.",
          });
        } else {
          toast({
            variant: "destructive",
            description:
              error.response?.data || "An error occurred during login.",
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [toast, navigate, user, logout]);
  return axiosInstance;
};

export default useAxios;
