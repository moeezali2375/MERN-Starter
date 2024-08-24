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
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";

const ForgetPwd = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const axios = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      await axios.put("/auth/password/forget", { email: email });
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px] mr-2 ml-2">
        <form id="forgetpwd" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Forget Password 🤦‍♂️</CardTitle>
            <CardDescription>
              Enter your email to initiate the request.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="secondary" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading ? true : false}>
              {isLoading ? <LoaderCircle className="spinner" /> : "Submit!"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgetPwd;
