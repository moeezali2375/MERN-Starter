import { useEffect, useState } from "react";

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
import PwdInput from "@/components/PwdInput";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [match, setMatch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();
  const axios = useAxios();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (pwd && confirmPwd) {
        setMatch(pwd === confirmPwd && pwd.length >= 4 ? 1 : 2);
      } else {
        setMatch(0);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [pwd, confirmPwd]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!name || !email || match === 2 || match == 0) {
        return;
      }
      const res = await axios.post("/auth/register", {
        name: name,
        email: email,
        password: pwd,
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
                autoCorrect="off"
                spellCheck="false"
                autoCapitalize="words"
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
                autoCorrect="off"
                spellCheck="false"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <PwdInput
                id="pwd"
                name="Password"
                pwd={pwd}
                setPwd={setPwd}
                match={match}
              />
            </div>
            <div className="space-y-1">
              <PwdInput
                id="confirmPwd"
                name="Confirm Password"
                pwd={confirmPwd}
                setPwd={setConfirmPwd}
                match={match}
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
