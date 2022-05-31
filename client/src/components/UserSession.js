import React from "react";
import Cookies from "js-cookie";

export const setSessionCookie = (session) => {
    Cookies.remove("session");
    Cookies.set("session", JSON.stringify(session), {expires: 1})
    console.log("set session cookie");
};

export const getSessionCookie = () => {
    const sessionCookie = Cookies.get("session");
    console.log("get session cookie");
    if(sessionCookie === undefined) {
        return {}
    } else {
        console.log("JSON parsing");
        return JSON.parse(sessionCookie);
    }
};

export const SessionContext = React.createContext(getSessionCookie());
