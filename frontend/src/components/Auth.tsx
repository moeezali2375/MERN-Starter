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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import useUser from "@/context/User/UserHook";
import { useNavigate } from "react-router-dom";

interface loginResponse {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  token: string;
}

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser } = useUser();

  useEffect(() => {
    console.log("Login useEffect");
    if (user) navigate("/home");
  }, [navigate, user]);

  const URL = "http://localhost:4000/api/auth";

  const handleGuest = () => {
    setEmail("moeezali2375@gmail.com");
    setPassword("1234");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        description: "Please provide all the details.",
      });
      return;
    }
    try {
      const res = await axios.post(URL + "/login", {
        email: email,
        password: password,
        rememberMe: rememberMe,
      });
      setUser(res.data);
      navigate("/home");
      toast({
        title: "Login Success.",
        description: "You are logged in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.response?.data || "An error occurred during login.",
      });
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
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
                  <Button className="w-full" type="submit">
                    Log In
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full mt-2"
                    type="button"
                    onClick={handleGuest}
                  >
                    Get Guest User Credentials
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          {/* //! Signup */}

          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Sign Up to get started. To verify your account, we will send a
                6-digit code to you.
              </CardDescription>
            </CardHeader>
            <form id="signup" onSubmit={handleRegister}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Batman" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="moeezali2375@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="Password">Password</Label>
                  <Input id="Password" placeholder="Insta Password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" placeholder="Google Password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full">
                  Sign Up!
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
