import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import useUser from "@/context/User/UserHook";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useUser();
  const axios = useAxios();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (password && confirmPassword) {
        setMatch(password === confirmPassword ? 1 : 2);
      } else {
        setMatch(0);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [password, confirmPassword]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!name || !email || !match) {
        return;
      }
      const res = await axios.post("/auth/register", {
        name: name,
        email: email,
        password: password,
      });
      toast({
        title: "Signup Success.",
        description: "Please verify your account to continue.",
      });
      navigate("/verify");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              <Input
                id="name"
                type="text"
                placeholder="Batman"
                value={name}
                required
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="moeezali2375@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="Password">Password</Label>
              <Input
                type="password"
                id="Password"
                placeholder="Insta Password"
                required
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={
                  match === 1
                    ? "border-green-500"
                    : match === 2
                    ? "border-red-500"
                    : ""
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Google Password"
                required
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={
                  match === 1
                    ? "border-green-500"
                    : match === 2
                    ? "border-red-500"
                    : ""
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              size="sm"
              disabled={isLoading ? true : false}
              className="w-full"
            >
              {isLoading ? <LoaderCircle className="spinner" /> : "Sign Up!"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default Signup;
