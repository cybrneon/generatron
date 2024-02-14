//GENERATRON

//  _____ ______ _   _ ______ _____         _______ _____   ____  _   _ 
//  / ____|  ____| \ | |  ____|  __ \     /\|__   __|  __ \ / __ \| \ | |
//  | |  __| |__  |  \| | |__  | |__) |   /  \  | |  | |__) | |  | |  \| |
//  | | |_ |  __| | . ` |  __| |  _  /   / /\ \ | |  |  _  /| |  | | . ` |
//  | |__| | |____| |\  | |____| | \ \  / ____ \| |  | | \ \| |__| | |\  |
//  \_____|______|_| \_|______|_|  \_\/_/    \_\_|  |_|  \_\\____/|_| \_|

// WHISTLER 2024
// A complete overhaul of the original Generatron, with a new design, new sounds, new features, and a new visual identity.
// ---------------------------------------------------
// THis is the primary p5.js sketch file for the Generatron project.


//CODE ---------------------------------------------
let angle = 0;
let fr = 60;
let amp;
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

  // Theme specific draw function
  draw()
  {
    if (this.name === 'synthwave') // SYNTWAVE VISUALS <----------
    {
      cursor(CROSS); // set the cursor to cross
      if(mouseIsPressed)
      {
        if (mouseButton === LEFT) 
        {
          normalMaterial();
          stroke(0);
        }
        if (mouseButton === RIGHT) 
        {
          fill('#B1BEC3');
          stroke('#0066FF');
        }
        if (mouseButton === CENTER) 
        {
          let vol = amp.getLevel();
          let size = map(vol, 0, 1, 100, 300);

          sphere(size);
          texture(synthwaveTexture);
          stroke(0);
        }
      }
      else
      {
        fill(0); // fill color set to Black
        stroke(180); //stroke color set to Grey
      }
    
      rectMode(CENTER); // set drawing mode for the shape
      translate (mouseX - width/2, mouseY - height/2); // set the origin of the shape to the mouse position
      
      rotateX(angle); // rotate the shape on the X axis based on the angle variable
      rotateY(angle * 0.3); // rotate the shape on the Y axis based on the angle variable
      rotateZ(angle * 1.2); // rotate the shape on the Z axis based on the angle variable

      box(150,150,20); // draw a box sized 150x150x20
      
      angle += 0.007; // increment the angle variable, which will rotate the shape
    }
    else if
    (this.name === 'retrowave') // RETROWAVE VISUALS <----------
    {
      cursor(CROSS); // set the cursor to cross
      if(mouseIsPressed)
      {
        if (mouseButton === LEFT) 
        {
          normalMaterial();
          stroke(0);
        }
        if (mouseButton === RIGHT) 
        {
          fill('#B1BEC3');
          stroke('#0066FF');
        }
        if (mouseButton === CENTER) 
        {
          let vol = amp.getLevel();
          let size = map(vol, 0, 1, 100, 300);

          sphere(size);
          texture(retrowaveTexture);
          noStroke();
        }
      }
      else
      {
        fill(0);
        stroke('#D500DA');
      }
    
      rectMode(CENTER); // set drawing mode for the shape
      translate (mouseX - width/2, mouseY - height/2); // set the origin of the shape to the mouse position
      
      rotateX(angle); // rotate the shape on the X axis based on the angle variable
      rotateY(angle * 0.3); // rotate the shape on the Y axis based on the angle variable
      rotateZ(angle * 1.2); // rotate the shape on the Z axis based on the angle variable

      box(150,150,20); // draw a box sized 150x150x20
      
      angle += 0.007; // increment the angle variable, which will rotate the shape
    }
    else if (this.name === 'futurefunk') // FUTUREFUNK VISUALS <----------
    {
      cursor(CROSS); // set the cursor to cross
      if(mouseIsPressed)
      {
        if (mouseButton === LEFT) 
        {
          normalMaterial();
          stroke(0);
        }
        if (mouseButton === RIGHT) 
        {
          fill('#3E3DD7');
          stroke('#B69DC7');
        }
        if (mouseButton === CENTER) 
        {
          let vol = amp.getLevel();
          let size = map(vol, 0, 1, 100, 400);

          plane(size);
          texture(futurefunkTexture);
          noStroke();
        }
      }
      else
      {
        fill('#815BBC');
        stroke('#D25DB6');
      }
    
      rectMode(CENTER); // set drawing mode for the shape
      translate (mouseX - width/2, mouseY - height/2); // set the origin of the shape to the mouse position
      
      rotateX(angle); // rotate the shape on the X axis based on the angle variable
      rotateY(angle * 0.3); // rotate the shape on the Y axis based on the angle variable
      rotateZ(angle * 1.2); // rotate the shape on the Z axis based on the angle variable

      box(150,150,20); // draw a box sized 150x150x20
      
      angle += 0.007; // increment the angle variable, which will rotate the shape
    }
    else if (this.name === 'house') // HOUSE VISUALS <----------
    {
      cursor(CROSS); // set the cursor to cross
      if(mouseIsPressed)
      {
        if (mouseButton === LEFT) 
        {
          normalMaterial();
          stroke(0);
        }
        if (mouseButton === RIGHT) 
        {
          fill('#7c0202');
          stroke('#ff4800');
        }
        if (mouseButton === CENTER) 
        {
          let vol = amp.getLevel();
          let size = map(vol, 0, 1, 100, 400);

          sphere(size);
          fill('#8c0070');
          stroke('#FA00CB');
        }
      }
      else
      {
        fill('#02267F');
        stroke('#0055ff');
      }
    
      rectMode(CENTER); // set drawing mode for the shape
      translate (mouseX - width/2, mouseY - height/2); // set the origin of the shape to the mouse position
      
      rotateX(angle); // rotate the shape on the X axis based on the angle variable
      rotateY(angle * 0.3); // rotate the shape on the Y axis based on the angle variable
      rotateZ(angle * 1.2); // rotate the shape on the Z axis based on the angle variable

      box(150,150,20); // draw a box sized 150x150x20
      
      angle += 0.007; // increment the angle variable, which will rotate the shape
    }
    else if (this.name === 'ambiant') // AMBIANT VISUALS <----------
    {
      cursor(CROSS); // set the cursor to cross
      if(mouseIsPressed)
      {
        if (mouseButton === LEFT) 
        {
          normalMaterial();
          stroke(0);
        }
        if (mouseButton === RIGHT) 
        {
          fill('#B1BEC3');
          stroke('#0066FF');
        }
        if (mouseButton === CENTER) 
        {
          let vol = amp.getLevel();
          let size = map(vol, 0, 1, 100, 400);
          
          sphere(size);
          texture(ambiantTexture);
          stroke(0);
        }
      }
      else
      {
        fill(0);
        stroke(180);
      }
    
      rectMode(CENTER); // set drawing mode for the shape
      translate (mouseX - width/2, mouseY - height/2); // set the origin of the shape to the mouse position
      
      rotateX(angle); // rotate the shape on the X axis based on the angle variable
      rotateY(angle * 0.3); // rotate the shape on the Y axis based on the angle variable
      rotateZ(angle * 1.2); // rotate the shape on the Z axis based on the angle variable

      box(150,150,20); // draw a box sized 150x150x20
      
      angle += 0.007; // increment the angle variable, which will rotate the shape
    }
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
  synthwaveTexture = loadImage('assets/textures/sky.png');
  retrowaveTexture = loadImage('assets/textures/sun.png');
  futurefunkTexture = loadImage('assets/textures/sailormoon.gif');
  //houseTexture = loadImage('assets/textures/sky.png'); None!
  ambiantTexture = loadImage('assets/textures/sky.png');

  synthwave = new Theme('synthwave');
  synthwave.loadSounds();

  retrowave = new Theme('retrowave');
  retrowave.loadSounds();

  futurefunk = new Theme('futurefunk');
  futurefunk.loadSounds();

  house = new Theme('house');
  house.loadSounds();

  ambiant = new Theme('ambiant');
  ambiant.loadSounds();
}

function setup()
{
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('canvas-container');

  //background(0); already set in style.css
  
  frameRate(fr); //Attempt to refresh at starting FPS

  amp = new p5.Amplitude(); // create a new Amplitude object
    
  //disable browser right context menu
  document.oncontextmenu = function() 
  {
    return false;
  }

  // Get the URL parameters
  let params = getURLParams();

  // If a theme was selected, apply it
  if (params.theme)
  {
    changeTheme(params.theme, true);
  }
  else
  {
    // If no theme was selected, use the default theme
    changeTheme('synthwave', false);
  }
  
  
  //REVERB from Legacy GENERATRON
  // reverbTime of 3 seconds, decayRate of 0.2%
  //reverb = new p5.Reverb();
  //reverb.process(currentTheme.drums1, 3, 0.2);
  //reverb.process(currentTheme.bass, 3, 0.2);
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
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}

function draw()
{
  currentTheme.draw();
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

function keyPressed() // Detecting keyboard input and playing sounds
{
  //LEAD
  if (keyCode == 83) //plays lead with letter S/s
  {
    playLead();
  }
  
  //BASS
  if (keyCode == 66) //plays bass with letter B/b
  {    
    playBass();
  }
  
  //INST1
  if (keyCode == 68) //plays instrument 1 with letter D/d
  {    
    playInst1();
  }

  //INST2
  if (keyCode == 65) //plays instrument 2 with letter A/a
  {    
    playInst2();
  }

  //INST3
  if (keyCode == 87) //plays instrument 3 with letter W/w
  {    
    playInst3();
  }
  
  //save artwork with the P/p key.
  if (keyCode == 80)
  {
    CaptureScreenshot();
  }

  //save artwork with the O/o key.
  if (keyCode == 79)
  {
    toggleRecording();
  }

  //clear canvas with the BACKSPACE key.
  if (keyCode ===  BACKSPACE)
  {
    ClearCanvasAndSound();
  }
  
  //type anything -- removed for the moment
  //contents += key;
}

// detect the click on the control buttons and play sounds
function attachButtonListener(buttonId, playSoundFunction)
{
  var button = document.getElementById(buttonId);
  var gradient = "linear-gradient(180deg, #67D30F 0%, #3F8208 100%)"; // green gradient
  var isOriginal = true; // flag to track the button state

  button.addEventListener('click', function()
  {
    if (isOriginal)
    {
      this.style.background = gradient; // change color to gradient
      isOriginal = false;
    }
    else
    {
      this.style.background = ""; // revert to original color
      isOriginal = true;
    }
    playSoundFunction();
  });
}

// Usage
attachButtonListener('lead-button', playLead);
attachButtonListener('bass-button', playBass);
attachButtonListener('inst1-button', playInst1);
attachButtonListener('inst2-button', playInst2);
attachButtonListener('inst3-button', playInst3);

var button = document.querySelector('.canvas-screenshot-button');
button.addEventListener('click', function()
{
  CaptureScreenshot();
});

let isRecording = false; // variable to keep track of the recording state
let recordButton = document.querySelector('.canvas-record-button');
let recordButtonText = document.querySelector('#canvas-record-button-text');

// Store the initial button text
let initialButtonText = recordButtonText.textContent;

function toggleRecording() // Recording the canvas function
{
  if (isRecording)
  {
    // If the script is currently recording, stop the recording
    VideoRecorder.stop();
    isRecording = false;
    recordButtonText.textContent = initialButtonText;
  }
  else
  {
    // If the script is not currently recording, start a new recording
    VideoRecorder.record();
    isRecording = true;
    recordButtonText.textContent = "Recording...";
  }
}

recordButton.addEventListener('click', toggleRecording);


// TRACKS FUNCTIONS ---------------------------------------------
function playLead()
{
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

function playBass()
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

function playInst1()
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

function playInst2()
{
  if (currentTheme.inst2.isPlaying())
    {
      //.isPlaying() returns a boolean
      currentTheme.inst2.stop();
    }
    else 
    {
      currentTheme.inst2.loop();
      currentTheme.inst2.amp(0.6); //volume
    }
}

function playInst3()
{
  if (currentTheme.inst3.isPlaying())
    {
      //.isPlaying() returns a boolean
      currentTheme.inst3.stop();
    }
    else 
    {
      currentTheme.inst3.loop();
      currentTheme.inst3.amp(0.6); //volume
    }
}

// OTHER FUNCTIONS -----------------------------------------------

function touchMoved()
{
  // prevent default
  return false;
}

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
  let now = new Date();
  let timestamp = now.getFullYear() + '-' +
                  ('0' + (now.getMonth()+1)).slice(-2) + '-' +
                  ('0' + now.getDate()).slice(-2) + '_' +
                  ('0' + now.getHours()).slice(-2) + '-' +
                  ('0' + now.getMinutes()).slice(-2) + '-' +
                  ('0' + now.getSeconds()).slice(-2);
  save("GENERATRON_design_" + timestamp + ".png");
}

function ClearCanvasAndSound()
{
  // If currentTheme is an object containing sounds, stop them
  if (currentTheme)
  {
    for (let key in currentTheme)
    {
      if (currentTheme[key] && typeof currentTheme[key].stop === 'function')
      {
        currentTheme[key].stop();
      }
    }
  }
  this.clear();
  return false; // prevent default browser behavior
}

function changeTheme(themeName, showLoadingScreen = true)
{
  // Remove and re-add the loading screen to reset the animation
  var loadingScreen = document.getElementById('loading-screen');
  // If showLoadingScreen is true, show the loading screen
  if (showLoadingScreen)
  {
    // Hide the original loading screen
    loadingScreen.style.display = 'none';

    // Remove and re-add the loading screen to reset the animation
    var newLoadingScreen = loadingScreen.cloneNode(true);
    loadingScreen.parentNode.replaceChild(newLoadingScreen, loadingScreen);
    // Delay the display of the new loading screen by 100 milliseconds
    setTimeout(function() {
      newLoadingScreen.style.display = 'flex';
    }, 100);
  }

  // If currentTheme is an object containing sounds, stop them
  if (currentTheme)
  {
    for (let key in currentTheme)
    {
      if (currentTheme[key] && typeof currentTheme[key].stop === 'function')
      {
        currentTheme[key].stop();
      }
    }
  }
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

  // Reset the background color of all control buttons
  var buttons = document.querySelectorAll('.key-button');
  buttons.forEach(button =>
  {
    button.style.background = "";
  });

  // Hide the loading screen after a delay
  setTimeout(function()
  {
    newLoadingScreen.style.display = 'none';
  }, 1000); // delay in milliseconds
}