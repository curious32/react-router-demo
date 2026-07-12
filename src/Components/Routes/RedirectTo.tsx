import { useEffect } from "react";

export const RedirectTo = (props: { to: string }) => {
    let isLoggedIn = false;
    useEffect(() => {
        if (!isLoggedIn) window.location.replace('/login');
        else window.location.replace(props.to);
    }, []);
    return null;
}