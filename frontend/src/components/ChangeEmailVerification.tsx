import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import useUser from "@/context/User/UserHook";

const ChangeEmailVerification = () => {
  const [isLoading, setIsLoading] = useState(0);
  const axios = useAxios();
  const { toast } = useToast();
  const { token } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(
    () => {
      const verifyChangeEmail = async () => {
        try {
          const res = await axios.get("/auth/email/verify/" + token);
          toast({ title: res.data.notification });
          setUser({ ...user, email: res.data.newEmail });
          setIsLoading(1);
        } catch (error) {
          console.log(error);
          setIsLoading(2);
        }
      };
      verifyChangeEmail();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="text-center allign-center">
      {isLoading === 0 ? (
        <h1 className="flashing-heading scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center py-10">
          Verifying your Request...
        </h1>
      ) : isLoading === 1 ? (
        <>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center py-10">
            🙌 Your Email is changed! 😎
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
            You may now close this tab or go back to
            <Button
              variant="link"
              className="px-1"
              onClick={() => navigate("/home")}
            >
              homepage.
            </Button>
          </p>
        </>
      ) : (
        <>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center py-10">
            It looks like your request might be expired.
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
            You may now close this tab or go back to
            <Button
              variant="link"
              className="px-1"
              onClick={() => navigate("/home")}
            >
              homepage.
            </Button>
          </p>
        </>
      )}
    </div>
  );
};

export default ChangeEmailVerification;
