import { useEffect } from 'react';

export const usePageTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title ? `${title} | Zonta Club of Naples` : 'Zonta Club of Naples';
        
        return () => {
            document.title = prevTitle;
        };
    }, [title]);
};
