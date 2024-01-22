/* ------------------------- Version Display Script -------------------------- */
/* ------------------------------- GENERATRON -------------------------------- */
/* -------------------------- Created by @cybrneon --------------------------- */


window.onload = function()
{
    var versionNumber = "2.0";
    var versionCodename = "WHISTLER";

    document.getElementById("version").innerHTML += " " + versionNumber + " - " + versionCodename;
    document.getElementById("version-header").innerHTML += " " + versionNumber + " - " + versionCodename;
}