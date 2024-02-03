/* ------------------------------- GENERATRON -------------------------------- */

/* ------------------------------- Menu Script ------------------------------- */
var logo = document.querySelector('.generatron-logo');
var menu = document.querySelector('.menu');

logo.addEventListener('click', function()
{
  // Shows the menu
  menu.classList.toggle('show-menu')
});

document.addEventListener('click', function(event)
{
  // Check if the click was outside the menu and the logo
  if (!menu.contains(event.target) && !logo.contains(event.target))
  {
    // Hides the menu
    menu.classList.remove('show-menu');
  }
});

/* ----------------------- User Agent Sniffing Script ----------------------- */

/* NOT ENABLED, YET

// Function to check if the device is mobile
function isMobileDevice()
{
  // Log the user agent for debugging purposes
  console.log(navigator.userAgent);
  // Return true if the user agent matches 'Mobi' or 'Android' (case insensitive)
  return /Mobi|Android/i.test(navigator.userAgent);
}


// Add an event listener for the DOMContentLoaded event
// This event fires when the initial HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', function()
{
  // Select the desktop controls element
  var controlsDesktop = document.querySelector('.controls-desktop');
  // Select the mobile controls element
  var controlsMobile = document.querySelector('.controls-mobile');

  // If the device is mobile
  if (isMobileDevice())
  {
    // Log that we're running on a mobile device
    console.log('Running on a mobile device');
    // Hide the desktop controls
    controlsDesktop.style.display = 'none';
    // Show the mobile controls
    controlsMobile.style.display = 'block';
  }
  else // If the device is not mobile
  {
    // Log that we're running on a desktop
    console.log('Running on a desktop');
    // Show the desktop controls
    controlsDesktop.style.display = 'block';
    // Hide the mobile controls
    controlsMobile.style.display = 'none';
  }
});

*/