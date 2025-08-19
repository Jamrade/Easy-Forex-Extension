"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class CookieHandler {
    createSessionCookie(cookieLabel, cookieValue) {
        document.cookie = `${cookieLabel}=${cookieValue}; path=/`;
        return null;
    }
    searchForCookie(cookieLabel) {
        let cookieArray = document.cookie.split(";");
        for (let index in cookieArray) {
            let keyValueArray = cookieArray[index].split("=");
            let key = keyValueArray[0].trim();
            if (cookieLabel === key) {
                let value = keyValueArray[1].trim();
                return value;
            }
        }
        return "";
    }
}
//# sourceMappingURL=cookies.js.map