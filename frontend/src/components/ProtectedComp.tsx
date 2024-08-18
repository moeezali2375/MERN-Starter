import useAxios from "@/hooks/useAxios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const ProtectedComp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();
  const checkStatus = async () => {
    setIsLoading(true);
    try {
      await axios.get("/protect");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="text-center allign-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center py-10">
        You are logged in!
      </h1>
      <Button onClick={checkStatus} disabled={isLoading ? true : false}>
        {isLoading ? <LoaderCircle className="spinner" /> : "Check Status"}
      </Button>
    </div>
  );
};

export default ProtectedComp;
