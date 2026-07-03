import { useEffect } from "react";

export const RedirectTo = (props: { to: string }) => {
    useEffect(() => {
        window.location.replace(props.to);
    }, []);
    return null;
}