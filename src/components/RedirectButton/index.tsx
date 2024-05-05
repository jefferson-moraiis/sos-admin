import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface RedirectButtonProps {
    href?: string;
    text?: string;
}

export function RedirectButton({ href, text }: RedirectButtonProps) {
    const navigate = useNavigate();

    return (
        <Button variant="secondary" onClick={() => navigate(href)}>
            {text}
        </Button>
    );
}