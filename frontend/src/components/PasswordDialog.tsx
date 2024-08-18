import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import useAxios from "@/hooks/useAxios";
import { LoaderCircle } from "lucide-react";
import PwdInput from "./PwdInput";

const PasswordDialog = ({ setPwdDialog }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [match, setMatch] = useState(0);
  const [oldPwd, setOldPwd] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPwd || match === 2 || match === 0) return;
    try {
      setIsLoading(true);
      await axios.put("/auth/password", {
        oldPassword: oldPwd,
        newPassword: pwd,
      });

      setPwdDialog(false);
      setOldPwd("");
      setPwd("");
      setConfirmPwd("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
        <DialogDescription>
          Change Password of your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form id="changePasswordForm" onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <PwdInput
              id="oldPwd"
              name="Old Password"
              pwd={oldPwd}
              setPwd={setOldPwd}
              dialog={1}
              placeholder="Google Password"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <PwdInput
              id="newPwd"
              name="New Password"
              pwd={pwd}
              setPwd={setPwd}
              dialog={1}
              match={match}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <PwdInput
              id="confirmNewPwd"
              name="Confirm New Password"
              pwd={confirmPwd}
              setPwd={setConfirmPwd}
              dialog={1}
              match={match}
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
