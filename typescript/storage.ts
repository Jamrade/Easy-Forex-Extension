/* ----------- interfaces ------------*/

/* ----------- implementations ------------ */



/* ------------- State Check ------------- */

window.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("market", "09182374")
    console.log(`Here is the currently selected market ${localStorage.getItem("market")}`)
})