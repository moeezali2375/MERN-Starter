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
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import useAxios from "@/hooks/useAxios";
import { LoaderCircle } from "lucide-react";

const PasswordDialog = ({ setPwdDialog }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [match, setMatch] = useState(0);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const axios = useAxios();
  const { toast } = useToast();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!oldPassword || !password || !confirmPassword) return;
      const res = await axios.post("/auth/change-password", {
        oldPassword: oldPassword,
        newPassword: password,
      });
      toast({
        title: res.data,
      });
      setPwdDialog(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
        <DialogDescription>
          Change Password of your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form id="changePasswordForm" onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="oldPassword" className="text-right">
              Old Password
            </Label>
            <Input
              id="oldPassword"
              type="password"
              required
              placeholder="Google Password"
              minLength={4}
              autoComplete="off"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword" className="text-right">
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              required
              placeholder="Insta Password"
              autoComplete="off"
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={
                match === 1
                  ? "border-green-500 col-span-3"
                  : match === 2
                  ? "border-red-500 col-span-3"
                  : "col-span-3"
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmNewPassword" className="text-right">
              Confirm New Password
            </Label>
            <Input
              id="confirmNewPassword"
              type="password"
              required
              placeholder="Insta Password"
              minLength={4}
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={
                match === 1
                  ? "border-green-500 col-span-3"
                  : match === 2
                  ? "border-red-500 col-span-3"
                  : "col-span-3"
              }
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

export default PasswordDialog;
