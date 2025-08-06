/* ----------- interfaces ------------*/

interface Access {
    cookieManager: Object

    getCredentials(): Object;

    inputValidator(): null;

    saveSessionInfo(): null;

    requestAuthorization(): string;

}

/* ----------- implementations ------------ */

class Login implements Access{
    
    _cookieManager = {}

    constructor() {
        
    }

    getCredentials(): Object {
        return {}
    }
}

/* ------------- State Check ------------- */

window.addEventListener("DOMContentLoaded", () => {
    
})