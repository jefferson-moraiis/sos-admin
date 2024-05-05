import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../contexts/AuthContext';

export function PrivateRouter({ children }: { children: JSX.Element }) {
    const context = useContext(Context);
    
    if (!context) {
        throw new Error('AuthContext must be used within an AuthProvider.');
    }

    const { user } = context;

    if (!user) {
        return <Navigate to="/" replace />;
    } 
    return children;
}
