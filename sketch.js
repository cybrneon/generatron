//GENERATRON

//  _____ ______ _   _ ______ _____         _______ _____   ____  _   _ 
//  / ____|  ____| \ | |  ____|  __ \     /\|__   __|  __ \ / __ \| \ | |
//  | |  __| |__  |  \| | |__  | |__) |   /  \  | |  | |__) | |  | |  \| |
//  | | |_ |  __| | . ` |  __| |  _  /   / /\ \ | |  |  _  /| |  | | . ` |
//  | |__| | |____| |\  | |____| | \ \  / ____ \| |  | | \ \| |__| | |\  |
//  \_____|______|_| \_|______|_|  \_\/_/    \_\_|  |_|  \_\\____/|_| \_|

// WHISTLER 2024
// A complete overhaul of the original Generatron, with a new design, new sounds, new features, and a new visual identity.


//CODE ---------------------------------------------
let angle = 0;
let fr = 60;
let pixelDensitySlider;
//let contents = ""; -- Typing Text feature removed for the moment

// Create a mapping between theme names and display names for a more stylized display
var themeDisplayNames =
{
  'synthwave': 'SYNTHWAVE',
  'retrowave': 'RETROWAVE',
  'futurefunk': 'FUTURE FUNK',
  'house': 'HOUSE',
  'ambiant': 'AMBIANT'
};

class Theme
{
  constructor(name)
  {
    this.name = name;
    this.drums1 = null;
    this.drums2 = null;
    this.drums3 = null;
    this.lead = null; //lead
    this.inst1 = null; //inst1 / pads
    this.inst2 = null; //inst2 / plucks
    this.inst3 = null; //inst3 / arp
    this.bass = null; //bass
  }

  loadSounds()
  {
    this.drums1 = loadSound(`assets/themes/${this.name}/drums1.wav`);
    this.drums2 = loadSound(`assets/themes/${this.name}/drums2.wav`);
    this.drums3 = loadSound(`assets/themes/${this.name}/drums3.wav`);
    this.lead = loadSound(`assets/themes/${this.name}/lead.wav`);
    this.inst1 = loadSound(`assets/themes/${this.name}/inst1.wav`);
    this.inst2 = loadSound(`assets/themes/${this.name}/inst2.wav`);
    this.inst3 = loadSound(`assets/themes/${this.name}/inst3.wav`);
    this.bass = loadSound(`assets/themes/${this.name}/bass.wav`);
  }
}

let synthwave;
let retrowave;
let futurefunk;
let house;
let ambiant;
let currentTheme;


function preload()
{
  //SOUNDS
  soundFormats('mp3', 'wav', 'aac'); //Default is mp3, compatible everywhere. Wav is greater quality and is seamless in loops, but doesn't work on iOS automatically.
  
  //preload stuff

  //TEXTURES
  cubeTexture = loadImage('assets/textures/sky.png');

  synthwave = new Theme('synthwave');
  synthwave.loadSounds();

  retrowave = new Theme('retrowave');
  retrowave.loadSounds();

  futurefunk = new Theme('futurefunk');
  futurefunk.loadSounds();

  //house = new Theme('house');
  //house.loadSounds();

  //ambiant = new Theme('ambiant');
  //ambiant.loadSounds();
}

function setup()
{
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);  
  //background(0); already set in style.css
  
  frameRate(fr); //Attempt to refresh at starting FPS
    
  //disable browser right context menu
  document.oncontextmenu = function() 
  {
    return false;
  }

  currentTheme = synthwave; // start with synthwave genre
  
  //REVERB
  // reverbTime of 3 seconds, decayRate of 0.2%
  reverb = new p5.Reverb();
  reverb.process(currentTheme.drums1, 3, 0.2);
  reverb.process(currentTheme.bass, 3, 0.2);
  //reverb.amp(4); // turn it up!

  // Create a slider from 1 to 4 with a step of 1 for Canva's Pixel Density
  pixelDensitySlider = createSlider(1, 4, 1, 1);
  pixelDensitySlider.input(updatePixelDensity);
  pixelDensitySlider.id('pixelDensitySlider');
  pixelDensitySlider.parent('sliderContainer');

  // Create the label
  pixelDensityLabel = createP(pixelDensitySlider.value());
  pixelDensityLabel.id('pixelDensitySliderLabel');
  pixelDensityLabel.parent('sliderContainer');

  // Retrieve the pixel density from localStorage
  let storedPixelDensity = localStorage.getItem('pixelDensity');

  // If a pixel density was stored, set the slider and label to this value
  if (storedPixelDensity)
  {
    pixelDensitySlider.value(storedPixelDensity);
    pixelDensityLabel.html(storedPixelDensity);
    pixelDensity(storedPixelDensity);
  }


  /*Mobile controls buttons
  button = createButton("S");
  button = createButton("D");
  button = createButton("B");*/
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}

function draw()
{
  //textSize(32);
  //text('Press a key or mouse to start.', 10, 20);
  
  if(mouseIsPressed)
  {

    cursor(CROSS);
    if (mouseButton === LEFT) 
    {
      normalMaterial();
      //fill(255); // fill color white
      stroke(0);
    }
    if (mouseButton === RIGHT) 
    {
      fill('#B1BEC3');
      stroke('#0066FF');
    }
    if (mouseButton === CENTER) 
    {
      sphere(150);
      texture(cubeTexture);
      stroke(0);
    }
  }
  else
  {
    fill(0); // fill color black
    stroke(180);
    cursor(ARROW);
  }
  
  rectMode(CENTER);
  
  translate (mouseX - width/2, mouseY - height/2);
  
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);
  //rect(0,0,150,100);

  box(150,150,20);
  
  angle += 0.007;
}


function mousePressed()
{
  if (mouseButton === LEFT)  
  {
    currentTheme.drums1.loop();
  }

  if (mouseButton === CENTER)  
  {
    currentTheme.drums2.loop();
  }

  if (mouseButton === RIGHT)  
  {
    currentTheme.drums3.loop();
  }
}

function mouseReleased()
{
  if (mouseButton === LEFT)  
  {  
    currentTheme.drums1.stop();
  }

  if (mouseButton === CENTER)  
  {
    currentTheme.drums2.stop();
  }

  if (mouseButton === RIGHT)  
  {
    currentTheme.drums3.stop();
  }
}

function keyTyped()
{
  //LEAD
  if (key == 's') //plays lead
  {
    console.log(currentTheme.drums1.isPlaying()+0);
    
    if (currentTheme.lead.isPlaying())
    {
      //.isPlaying() returns a boolean
      currentTheme.lead.stop();
    }
    else 
    {
      currentTheme.lead.loop();
      currentTheme.lead.amp(0.8); //volume
    }
  }
  
  //BASS
  if (key == 'b') //plays bass
  {    
    if (currentTheme.bass.isPlaying())
    {
      //.isPlaying() returns a boolean
      currentTheme.bass.stop();
    }
    else 
    {
      currentTheme.bass.loop();
      currentTheme.bass.amp(0.8); //volume
    }
  }
  
  //PLUCKS
  if (key == 'd') //plays instrument 1
  {    
    if (currentTheme.inst1.isPlaying())
    {
      //.isPlaying() returns a boolean
      currentTheme.inst1.stop();
    }
    else 
    {
      currentTheme.inst1.loop();
      currentTheme.inst1.amp(0.6); //volume
    }
  }

    //ARP
    if (key == 'a') //plays instrument 2
    {    
      if (currentTheme.inst2.isPlaying())
      {
        //.isPlaying() returns a boolean
        currentTheme.inst2.stop();
      }
      else 
      {
        currentTheme.inst2.loop();
        currentTheme.inst2.amp(0.8); //volume
      }
    }

    //PADS
    if (key == 'w') //plays instrument 3
    {    
      if (currentTheme.inst3.isPlaying())
      {
        //.isPlaying() returns a boolean
        currentTheme.inst3.stop();
      }
      else 
      {
        currentTheme.inst3.loop();
        currentTheme.inst3.amp(0.4); //volume
      }
    }
  
  //save artwork with the P key.
  if (key == 'p')
  {
    CaptureScreenshot();
  }

  if (keyCode == 'BACKSPACE')
  {
    canvas.clear();
  }
  
  //type anything -- removed for the moment
  //contents += key;
}

// FUNCTIONS ---------------------------------------------

function updatePixelDensity()
{
  let pixelDensityValue = pixelDensitySlider.value();
  pixelDensity(pixelDensityValue);

  // Update the label text
  pixelDensityLabel.html(pixelDensityValue);

  // Store the pixel density in localStorage
  localStorage.setItem('pixelDensity', pixelDensityValue);
  
  // Update the label text
  pixelDensityLabel.html(pixelDensitySlider.value());
}

function CaptureScreenshot()
{
  save("GENERATRON_design.png");
}

function changeTheme(themeName)
{
  clear(); // clear the canvas before switching theme

  // Hide the menu
  menu.classList.remove('show-menu');

  switch(themeName)
  {
    case 'synthwave':
      currentTheme = synthwave;
      break;
    case 'retrowave':
      currentTheme = retrowave;
      break;
    case 'futurefunk':
      currentTheme = futurefunk;
      break;
    case 'house':
      currentTheme = house;
      break;
    case 'ambiant':
      currentTheme = ambiant;
      break;
    default:
      console.log('Unknown theme: ' + themeName);
  }

  // Get a reference to the current theme element
  var currentThemeElement = document.getElementById('generatron-logo-text-currentheme');

  // Look up the display name for the current theme
  var themeDisplayName = themeDisplayNames[themeName];

  // Update the current theme element with the display name of the current theme
  currentThemeElement.textContent = themeDisplayName;
}