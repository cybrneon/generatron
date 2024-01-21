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

//let drums1; let drums2; let drums3; let synth; let bass; let plucks; let arp; let pads;

class Theme {
  constructor(name) {
    this.name = name;
    this.drums1 = null;
    this.drums2 = null;
    this.drums3 = null;
    this.synth = null;
    this.bass = null;
    this.plucks = null;
    this.arp = null;
    this.pads = null;
  }

  loadSounds() {
    this.drums1 = loadSound(`assets/themes/${this.name}/drums1.wav`);
    this.drums2 = loadSound(`assets/themes/${this.name}/drums2.wav`);
    this.drums3 = loadSound(`assets/themes/${this.name}/drums3.wav`);
    this.synth = loadSound(`assets/themes/${this.name}/lead.wav`);
    this.bass = loadSound(`assets/themes/${this.name}/bass.wav`);
    this.plucks = loadSound(`assets/themes/${this.name}/synth.wav`);
    this.arp = loadSound(`assets/themes/${this.name}/arp.wav`);
    this.pads = loadSound(`assets/themes/${this.name}/pads.wav`);
  }
}

let synthwave;
let retrowave;
let futurefunk;
let house;
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

  //retrowave = new Theme('futurefunk');
  //retrowave.loadSounds();

  //retrowave = new Theme('house');
  //retrowave.loadSounds();
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
  //SYNTH
  if (key == 's') //plays synth
  {
    console.log(currentTheme.drums1.isPlaying()+0);
    
    if (currentTheme.synth.isPlaying())
    {
      //.isPlaying() returns a boolean
      currentTheme.synth.stop();
    }
    else 
    {
      currentTheme.synth.loop();
      currentTheme.synth.amp(0.8); //volume
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
  if (key == 'd') //plays plucks
  {    
    if (currentTheme.plucks.isPlaying())
    {
      //.isPlaying() returns a boolean
      currentTheme.plucks.stop();
    }
    else 
    {
      currentTheme.plucks.loop();
      currentTheme.plucks.amp(0.6); //volume
    }
  }

    //ARP
    if (key == 'a') //plays arp
    {    
      if (currentTheme.arp.isPlaying())
      {
        //.isPlaying() returns a boolean
        currentTheme.arp.stop();
      }
      else 
      {
        currentTheme.arp.loop();
        currentTheme.arp.amp(0.8); //volume
      }
    }

    //PADS
    if (key == 'w') //plays pads
    {    
      if (currentTheme.pads.isPlaying())
      {
        //.isPlaying() returns a boolean
        currentTheme.pads.stop();
      }
      else 
      {
        currentTheme.pads.loop();
        currentTheme.pads.amp(0.4); //volume
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

  switch(themeName) {
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
    case 'unknown':
      // handle the unknown theme
      break;
    default:
      console.log('Unknown theme: ' + themeName);
  }
}