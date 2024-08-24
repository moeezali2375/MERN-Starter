import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import PwdInput from "./PwdInput";

const ResetPwd = () => {
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [match, setMatch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const axios = useAxios();
  const { token, email } = useParams();
  const navigate = useNavigate();

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
    if (match == 2 || match == 0) return;
    try {
      setIsLoading(true);
      await axios.put(`/auth/password/verify/${email}/${token}`, {
        password: pwd,
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
      <form id="reset" onSubmit={handleSubmit}>
        <Card className="w-[400px] mr-2 ml-2">
          <CardHeader>
            <CardTitle>New Password 🤨</CardTitle>
            <CardDescription>
              Enter your new password and please don't forget it this time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <PwdInput
                  id="pwd"
                  name="Password"
                  pwd={pwd}
                  setPwd={setPwd}
                  match={match}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <PwdInput
                  id="confirmPwd"
                  name="Confirm Password"
                  pwd={confirmPwd}
                  setPwd={setConfirmPwd}
                  match={match}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="secondary" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button
              variant="default"
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? <LoaderCircle className="spinner" /> : "Submit!"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ResetPwd;
