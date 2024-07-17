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


const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </a>
        <a
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Orders
        </a>
        <a
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Products
        </a>
        <a
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Customers
        </a>
        <a
          href="#"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Settings
        </a>
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
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Orders
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Products
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Customers
            </a>
            <a href="#" className="hover:text-foreground">
              Settings
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full justify-end items-center gap-4">
        <div className="relative">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
