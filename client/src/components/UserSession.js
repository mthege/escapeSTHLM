import React from "react";
import Cookies from "js-cookie";

export const setSessionCookie = (session) => {
    Cookies.remove("session");
    Cookies.set("session", JSON.stringify(session), {expires: 1})
};

export const getSessionCookie = () => {
    const sessionCookie = Cookies.get("session");
    if(sessionCookie === undefined) {
        return {}
    } else {
        return JSON.parse(sessionCookie);
    }
};

export const SessionContext = React.createContext(getSessionCookie());
