/* ----------- interfaces ------------*/

interface CookieManipulation {
    createSessionCookie: (cookieLabel: string, cookieValue: string) => null;

    searchForCookie: (cookieLabel: string) => string;
}

/* ----------- implementations ------------ */

class CookieHandler implements CookieManipulation {

    createSessionCookie(cookieLabel: string, cookieValue: string): null {
        document.cookie = `${cookieLabel}=${cookieValue}; path=/`;

        return null;
    }

    searchForCookie(cookieLabel: string): string {
        
        let cookieArray: Array<string> = document.cookie.split(";");

        for(let index in cookieArray) {
            let keyValueArray: Array<string> = cookieArray[index].split("=");

            let key: string = keyValueArray[0].trim()

            if (cookieLabel === key) {
                let value: string = keyValueArray[1].trim()
                return value;
            }
        }

        return "";
    }
}