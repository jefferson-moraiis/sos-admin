import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth()

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/home');
      setLoading(false);

    }).catch(() =>{
      setError('Failed to log in. Please check your credentials.');
      setLoading(false);
    })
  };

  if (loading) return <Progress value={100} />;

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form className="mx-auto grid w-[300px] items-center gap-6" onSubmit={handleLogin}>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">SOS - ADMIN</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:block h-screen">
        <div className="relative w-full h-full">
          <img
            src="/image.png"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale opacity-80"
          />
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundColor: "rgba(154, 2, 120, 0.5)"}}></div>
        </div>
      </div>
    </div>
  );
}
