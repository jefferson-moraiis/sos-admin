/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { Button } from "@/components/ui/button";
import { CircleUser, Copy } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { UserMap } from "@/components/UserMap";
import api from '@/utils/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -22.7489,
  lng: -41.8810
};

export function MapRoutePage() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      api.get(`/user/${userId}`)
        .then(response => {
          console.log("🚀 ~ socket.on ~ location:", response.data)
          setUser(response.data);
        })
        .catch(error => {
          console.error('Erro ao recuperar dados do usuário:', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    const socket = io('wss://sos-woman-service.onrender.com');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setOrigin({ lat: latitude, lng: longitude });
        },
        error => console.error('Error getting current location', error)
      );
    }

    socket.on('getLocation', (user) => {
      console.log("🚀 ~ socket.on ~ location:", user)
      if (user.id === userId) {
        setUser(user)
        setDestination({ lat: user.location.coords.latitude, lng: user.location.coords.longitude });
      }
    });

    return () => {
      socket.off('getLocation');
    };
  }, [userId]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copiado para a área de transferência: " + text);
  };

  const copyAllUserInfo = () => {
    const allUserInfo = `Nome: ${user.name}\nEmail: ${user.email}\nTelefone: ${user.phone}\nLocalização: ${user.location.address}`;
    copyToClipboard(allUserInfo);
  };

  console

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
              {/* <DropdownMenuItem onClick={handleSignOut}>Sair</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {user && (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="z-10">
        <UserMap users={user} />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-1">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <CardTitle>Informações sobre {user.name}</CardTitle>
            </CardHeader>
            <CardContent >
              <div className="flex items-center mb-4">
                <CardTitle>Nome: </CardTitle>
                <CardDescription>{user.name}</CardDescription>
                <Copy size={16} style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={() => copyToClipboard(user.name)} />
              </div>
              <div className="flex items-center mb-4">
                <CardTitle>Email: </CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Copy size={16} style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={() => copyToClipboard(user.email)} />
              </div>
              <div className="flex items-center mb-4">
                <CardTitle>Telefone: </CardTitle>
                <CardDescription>{user.phone}</CardDescription>
                <Copy size={16} style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={() => copyToClipboard(user.phone)} />
              </div>
              <div className="flex items-center">
                <CardTitle>Localização: </CardTitle>
                <CardDescription>{user.location?.address}</CardDescription>
                <Copy size={16}  style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={() => copyToClipboard(user.location.address)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      )}
    </div>
  );
}

export default MapRoutePage;
