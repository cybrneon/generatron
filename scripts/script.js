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