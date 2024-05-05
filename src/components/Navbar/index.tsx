import { Menu, Package2 } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "react-router-dom";

export function Navbar(){
   return (
    <>
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <span className="sr-only">Acme Inc</span>
          </a>
          <a
            href="/home"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Emergências
          </a>
          <a
            href="/users"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Clientes
          </a>
          <a
            href="agents"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Agentes
          </a>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
            <a
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <span className="sr-only">Acme Inc</span>
          </a>
          <a
            href="/home"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Emergências
          </a>
          <a
            href="/users"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Clientes
          </a>
          <a
            href="agents"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Agentes
          </a>
            </nav>
          </SheetContent>
        </Sheet>
    </>
   )
}