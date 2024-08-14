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
import { useToast } from "@/components/ui/use-toast";
import useAxios from "@/hooks/useAxios";

const ForgetPwd = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const axios = useAxios();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await axios.put("/auth/password/forget", { email: email });
      toast({
        title: res.data,
        description: "Please check you inbox 📥",
        variant: "default",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Forget Password 🤦‍♂️</CardTitle>
          <CardDescription>
            Enter your email to initiate the request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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

export default ForgetPwd;
