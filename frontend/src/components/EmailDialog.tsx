import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUser from "@/context/User/UserHook";
import { useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";

const EmailDialog = () => {
  const { user } = useUser();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.put("/auth/email", {
        newEmail: email,
        password: password,
      });
      toast({
        title: res.data,
      });
      setEmail(user.email);
      setPassword("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle>Change Email</DialogTitle>
        <DialogDescription>
          Change Email of your profile here. For security reasons, we will
          require your password.
        </DialogDescription>
      </DialogHeader>
      <form id="changeEmailForm" onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newEmail" className="text-right">
              New Email
            </Label>
            <Input
              id="newEmail"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              id="username"
              type="password"
              required
              autoComplete="false"
              className="col-span-3"
              placeholder="Insta Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading ? true : false}>
            {isLoading ? <LoaderCircle className="spinner" /> : "Save Changes!"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EmailDialog;
