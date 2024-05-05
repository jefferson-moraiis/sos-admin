/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import {CircleUser} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Navbar } from "@/components/Navbar";
import useSocket from "@/socket";
import { useEffect, useState } from "react";
import { UserMap } from "@/components/UserMap";




export function DashboardPage() {
  const auth = getAuth()
  const [users, setUsers] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    const onGetLocation = (newUser) => {
      setUsers(currentUsers => {
        const index = currentUsers.findIndex(user => user.id === newUser.id);
        if (index >= 0) {
          const updatedUsers = [...currentUsers];
          updatedUsers[index] = newUser;
          return updatedUsers;
        } else {
          return [...currentUsers, newUser];
        }
      });
    };
    socket.on('getLocation', onGetLocation);
    return () => {
      socket.off('getLocation', onGetLocation);
      socket.disconnect();
    };
  }, [socket]); 

  async function handleSignOut(){
      try {
          await signOut(auth);
      } catch (error) {
          console.log(error)
      }
  }
  return (
      <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Navbar/>
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
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </header>
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-1">
        
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
              <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {users.map((user:any) => (
                    <>
                    <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.location.andress}</TableCell>
                    </TableRow>
                    <TableRow >
                        <UserMap users={user} />

                    </TableRow>
                    </>
                ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  ) 
}

