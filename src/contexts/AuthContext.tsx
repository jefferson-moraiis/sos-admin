import { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    error: Error | null;
}

export const Context = createContext<AuthContextType | null>(null);

export function AuthContext({ children }: { children: ReactNode }) {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("🚀 ~ unsubscribe ~ currentUser:", currentUser)

        setUser(currentUser);
        setLoading(false);
    }, (error) => {
        console.log("🚀 ~ unsubscribe ~ error:", error)
        setError(error);
        setLoading(false);
    });

      return unsubscribe;
  }, []);

  const values: AuthContextType = {
      user: user,
      setUser: setUser,
      error
  };

  return (
      <Context.Provider value={values}>
          {!loading && children}
      </Context.Provider>
  );
}
