import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const ProtectedComp = () => {
  // const { toast } = useToast();

  const checkStatus = async () => {
    // try {
    //   await axiosInstance.get("/protect");
    //   toast({
    //     title: "All Okay.",
    //     description: "You are Authorized.",
    //   });
    // } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     description: "Token expired",
    //   });
    // }
  };
  return (
    <div className="text-center allign-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center py-10">
        You are logged in!
      </h1>
      <Button onClick={checkStatus}>Check Status</Button>
    </div>
  );
};

export default ProtectedComp;
