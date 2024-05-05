import React from 'react';
import { UserMap } from '@/components/UserMap';
import {CircleUser} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Navbar } from '../Navbar';
import { Button } from '../ui/button';

export default function UserProfile({ user }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copiado para a área de transferência: " + text);
  };

  const copyAllUserInfo = () => {
    const allUserInfo = `Nome: ${user.name}\nEmail: ${user.email}\nTelefone: ${user.phone}\nLocalização: ${user.location.address}`;
    copyToClipboard(allUserInfo);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Navbar />
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <UserMap users={user} />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-1">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Informações sobre {user.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>Nome</CardTitle>
              <CardDescription>{user.name}</CardDescription>
              <Button onClick={() => copyToClipboard(user.name)}>Copiar Nome</Button>
              <CardTitle>Email</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <Button onClick={() => copyToClipboard(user.email)}>Copiar Email</Button>
              <CardTitle>Telefone</CardTitle>
              <CardDescription>{user.phone}</CardDescription>
              <Button onClick={() => copyToClipboard(user.phone)}>Copiar Telefone</Button>
              <CardTitle>Localização</CardTitle>
              {/* <CardDescription>{user.location.coords}</CardDescription>
              <Button onClick={() => copyToClipboard(user.location.coords)}>Copiar Localização</Button> */}
            </CardContent>
          </Card>
        </div>
        <Button onClick={copyAllUserInfo} className="mt-4">Copiar Todas Informações</Button>
      </main>
    </div>
  );
}
