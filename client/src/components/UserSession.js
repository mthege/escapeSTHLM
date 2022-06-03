import React from "react";
import Cookies from "js-cookie";

/**
 * Writes new content to the session cookie
 * 
 * @param {object} session
 */
export const setSessionCookie = (session) => {
    var oldSession = getSessionCookie()
    console.log("Set Session Cookie");
    if (JSON.stringify(oldSession) !== JSON.stringify(session)) {
        Cookies.remove("session");
        Cookies.set("session", JSON.stringify(session), { expires: 1 })
    }
};

/**
 * @returns the current content of the session cookie
 */
export const getSessionCookie = () => {
    const sessionCookie = Cookies.get("session");
    if (sessionCookie === undefined) {
        return {}
    } else {
        return JSON.parse(sessionCookie);
    }
};

// A react context to be used to access the content of the cookie
export const SessionContext = React.createContext(getSessionCookie());