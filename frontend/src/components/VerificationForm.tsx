import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import useUser from "@/context/User/UserHook";
import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function VerificationForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const { user, setUser } = useUser();
  const axios = useAxios();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user.isVerified === true) navigate("/home");
  }, [user, navigate]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleResend = async () => {
    setIsLoading2(true);
    try {
      await axios.get("/auth/token/regenerate");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const url = "/auth/token/verify/" + data.pin;
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      await axios.get(url);
      setUser({ ...user, isVerified: true });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center h-screen space-y-6"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="w-full max-w-sm">
              <FormLabel className="text-center">
                <h3 className="text-3xl font-semibold">Verification Code</h3>
              </FormLabel>
              <div className="flex justify-center">
                <FormControl className="text-center">
                  <InputOTP
                    maxLength={6}
                    ref={inputRef} // Attach the ref here
                    {...field}
                  >
                    <InputOTPGroup className="flex justify-center">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </div>
              <FormDescription className="text-center">
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse space-x-4 space-x-reverse">
          <Button variant="outline" type="submit" disabled={isLoading}>
            {isLoading ? <LoaderCircle className="spinner" /> : "Submit!"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleResend}
            disabled={isLoading2}
          >
            {isLoading2 ? <LoaderCircle className="spinner" /> : "Resend"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
