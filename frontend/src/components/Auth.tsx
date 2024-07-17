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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "./ui/switch";

export default function Auth() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          {/* //! Login */}
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>Enter your details to log in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="moeezali2375@gmail.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Insta Password" />
              </div>
              <div className="flex items-center justify-between ">
                <Label htmlFor="rememberme">Remember Me</Label>
                <Switch id="rememberme" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <Button className="w-full">Log In</Button>
                <Button variant="secondary" className="w-full mt-2">
                  Get Guest User Credentials
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Sign Up to get started. To verify your account, we will send a
                6-digit code to you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Batman" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="moeezali2375@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Password">Password</Label>
                <Input id="Password" placeholder="Insta Password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" placeholder="Google Password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full">
                Sign Up!
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
