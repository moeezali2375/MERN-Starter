import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

export default function Auth() {
  return (
    <div className="flex items-center justify-center mt-12">
      <Tabs defaultValue="signup" className="w-[400px] mr-2 ml-2">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <Login />
        <Signup />
      </Tabs>
    </div>
  );
}
