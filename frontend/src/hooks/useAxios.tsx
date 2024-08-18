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
        if (response.data.msg) {
          toast({
            variant: "default",
            title: response.data.msg?.title,
            description: response.data.msg?.desc,
          });
        }
        return response;
      },
      (error) => {
        if (error.response) {
          const res = error.response;
          if (res.data.msg) {
            if (res.status == 403) {
              //! verify
              navigate("/verify");
            } else if (res.status == 401) {
              //! login
              logout();
              navigate("/");
            }
            toast({
              variant: "destructive",
              description:
                res.data?.msg?.title || "Oops! Something went wrong. 👉🏽👈🏽",
            });
          }
        } else {
          //! Network Error
          toast({
            variant: "destructive",
            description: "Network Error 🛜",
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
