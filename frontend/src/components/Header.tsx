import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, CircleUser, Package2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ModeToggle } from "./mode-toggle";
import useUser from "@/context/User/UserHook";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import EmailDialog from "@/components/EmailDialog";
import PasswordDialog from "@/components/PasswordDialog";

const Header = () => {
  const { user, logout } = useUser();
  const [emailDialog, setEmailDialog] = useState(false);
  const [pwdDialog, setPwdDialog] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="top-0  flex h-16 items-center gap-4 border-b px-4 md:px-6 sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">MERN-Starter</span>
        </Link>
        <Link
          to=""
          className="text-foreground transition-colors hover:text-foreground"
        >
          Settings
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full justify-end items-center gap-4">
        <div className="relative">
          <ModeToggle />
          {user && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setEmailDialog(true)}>
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPwdDialog(true)}>
                    Password
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog
                open={emailDialog}
                onOpenChange={() => setEmailDialog(!emailDialog)}
              >
                <EmailDialog />
              </Dialog>
              <Dialog
                open={pwdDialog}
                onOpenChange={() => setPwdDialog(!pwdDialog)}
              >
                <PasswordDialog setPwdDialog={setPwdDialog} />
              </Dialog>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
