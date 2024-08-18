import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import useUser from "@/context/User/UserHook";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { LoaderCircle } from "lucide-react";
import PwdInput from "./PwdInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();
  const axios = useAxios();

  const handleGuest = () => {
    setEmail("moeezali2375@gmail.com");
    setPwd("1234");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !pwd) return;
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/login", {
        email: email,
        password: pwd,
        rememberMe: rememberMe,
      });

      navigate("/home");
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="login">
      {/* //! Login */}
      <Card>
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Enter your details to log in.</CardDescription>
        </CardHeader>
        <form id="login" onSubmit={handleLogin}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="moeezali2375@gmail.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <PwdInput
                id="password"
                name="Password"
                pwd={pwd}
                setPwd={setPwd}
              />
            </div>

            <div className="flex items-center justify-between ">
              <Label htmlFor="rememberme">Remember Me</Label>
              <Switch
                id="rememberme"
                checked={rememberMe}
                onCheckedChange={() => setRememberMe(!rememberMe)}
              />
            </div>
            <div className="space-y-1">
              <div>
                <Link
                  to="/password/forget"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Button
                className="w-full"
                type="submit"
                disabled={isLoading ? true : false}
              >
                {isLoading ? <LoaderCircle className="spinner" /> : "Log In!"}
              </Button>
              <Button
                variant="secondary"
                className="w-full mt-2"
                type="button"
                disabled={isLoading ? true : false}
                onClick={handleGuest}
              >
                Get Guest User Credentials
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default Login;
