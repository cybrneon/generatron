/* ------------------------- Version Display Script -------------------------- */
/* ------------------------------- GENERATRON -------------------------------- */
/* -------------------------- Created by @cybrneon --------------------------- */


window.onload = function()
{
    fetch('/manifest.json')
    .then(response => response.json())
    .then(data =>
        {
        var versionNumber = data.version;
        var versionCodename = data.codename;

        document.getElementById("version").innerHTML += " " + versionNumber + " - " + versionCodename;
        document.getElementById("version-header").innerHTML += " " + versionNumber + " - " + versionCodename;
        });
}