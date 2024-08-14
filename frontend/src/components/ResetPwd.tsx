import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";

const ResetPwd = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const axios = useAxios();
  const { toast } = useToast();
  const { token, email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (password && confirmPassword) {
        setMatch(password === confirmPassword && password.length >= 4 ? 1 : 2);
      } else {
        setMatch(0);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) return;
    setIsLoading(true);
    try {
      const res = await axios.put(`/auth/password/verify/${email}/${token}`, {
        password: password,
      });
      toast({
        title: res.data,
        description: "Please log in to continue",
        variant: "default",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>New Password 🤨</CardTitle>
          <CardDescription>
            Enter your new password and please don't forget it this time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Insta Password"
                  required
                  minLength={4}
                  value={password}
                  autoComplete="off"
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Insta Password"
                  required
                  value={confirmPassword}
                  autoComplete="off"
                  minLength={4}
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button
            variant="default"
            type="submit"
            disabled={isLoading ? true : false}
            onClick={handleSubmit}
          >
            {isLoading ? <LoaderCircle className="spinner" /> : "Submit!"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPwd;
