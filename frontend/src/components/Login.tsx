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
import { useToast } from "@/components/ui/use-toast";
import useUser from "@/context/User/UserHook";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useUser();
  const axios = useAxios();

  const handleGuest = () => {
    setEmail("moeezali2375@gmail.com");
    setPassword("1234");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!email || !password) {
        return;
      }
      const res = await axios.post("/auth/login", {
        email: email,
        password: password,
        rememberMe: rememberMe,
      });
      toast({
        title: "Login Success.",
        description: "You are logged in.",
      });
      navigate("/home");
      setUser(res.data);
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Insta Password"
                type="password"
                value={password}
                required
                minLength={4}
                onChange={(e) => setPassword(e.target.value)}
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
