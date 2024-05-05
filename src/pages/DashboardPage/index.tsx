/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
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
import io from 'socket.io-client';


export function DashboardPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io('wss://sos-woman-service.onrender.com');
  
    // Handle incoming location updates
    socket.on('getLocation', newUser => {
      setUsers(currentUsers => {
      console.log("🚀 ~ useEffect ~ currentUsers:", currentUsers)

        const index = currentUsers.findIndex(user => user.id === newUser.id);
        if (index >= 0) {
          // Only update if there's a change
          if (JSON.stringify(currentUsers[index]) !== JSON.stringify(newUser)) {
            return currentUsers.map(user =>
              user.id === newUser.id ? { ...user, ...newUser } : user
            );
          }
        } else {
          // Add new user if not already in the list
          return [...currentUsers, newUser];
        }
        return currentUsers; // Return the unchanged array if no updates
      });
    });
  
    // Clean up on unmount
    return () => {
      socket.off('getLocation');
      socket.close();
    };
  }, []); // Note the empty dependency array
  

  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  function removeUser(userId) {
    setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
  }
  async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não é suportada pelo seu navegador.'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }
  

  const handleUserClick = async (user) => {
    navigate(`/user?userId=${user.id}`);
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
            <DropdownMenuContent align="end"  className="z-30">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="z-10">
        <UserMap users={users} />

        </div>
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Emergências</CardTitle>
                <CardDescription>
                  Há <span style={{ fontWeight: 'bold' }}>{users.length}</span> emergência{users.length !== 1 ? 's' : ''} no momento
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>

                <TableHeader>
                  
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Telefone</TableHead>
                    <TableHead className="hidden md:table-cell">Localização</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                
            {users.map((user) => (
                  <TableBody  key={user.id} >
                    <TableRow>
                      <TableCell>{user.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                      <TableCell className="hidden md:table-cell" style={{cursor:'pointer'}}onClick={() => handleUserClick(user)}>{user.location.address}</TableCell>
                      <TableCell>
                        <Button variant="secondary" onClick={() => handleUserClick(user)}>detalhes</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </CardContent>
          </Card>
      </main>
    </div>
  );
}


