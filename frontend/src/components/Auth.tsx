import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import useUser from "@/context/User/UserHook";
import { useNavigate } from "react-router-dom";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

export default function Auth() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) navigate("/home");
  }, [navigate, user]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <Login />
        <Signup />
      </Tabs>
    </div>
  );
}
