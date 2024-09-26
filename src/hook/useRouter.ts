import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const useRoute = () => {
    const navigate = useNavigate();

    // Define a function to navigate dynamically
    const clickRouteLink = useCallback((link: string) => {
        navigate(`/${link}`);
    }, [navigate]);

    return { clickRouteLink };
};

export default useRoute;
