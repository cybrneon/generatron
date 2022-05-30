//GENERATRON

//  _____ ______ _   _ ______ _____         _______ _____   ____  _   _ 
//  / ____|  ____| \ | |  ____|  __ \     /\|__   __|  __ \ / __ \| \ | |
//  | |  __| |__  |  \| | |__  | |__) |   /  \  | |  | |__) | |  | |  \| |
//  | | |_ |  __| | . ` |  __| |  _  /   / /\ \ | |  |  _  /| |  | | . ` |
//  | |__| | |____| |\  | |____| | \ \  / ____ \| |  | | \ \| |__| | |\  |
//  \_____|______|_| \_|______|_|  \_\/_/    \_\_|  |_|  \_\\____/|_| \_|


//CODE
let angle = 0;
let fr = 60;
//let contents = ""; -- Typing Text feature removed for the moment

let drums1; let drums2; let drums3; let synth; let bass; let plucks; let arp;


function preload()
{
  //preload stuff
  //TEXTURES
  cubeTexture = loadImage('assets/textures/sky.png');
  
  //SOUNDS
  //soundFormats('mp3', 'wav'); //Default is mp3, compatible everywhere.
  //-DRUMS-//////////////////////////////////////////////
  drums1 = loadSound('assets/fx/cybrcity/drums_01.mp3');
  drums2 = loadSound('assets/fx/cybrcity/drums_02.mp3');
  drums3 = loadSound('assets/fx/cybrcity/drums_03.mp3');

  //-LEAD SYNTH-//////////////////////////////////////////////
  synth = loadSound('assets/fx/cybrcity/lead.mp3');

  //-BASS-//////////////////////////////////////////////
  bass = loadSound('assets/fx/cybrcity/bass.mp3');

  //-PLUCKS-//////////////////////////////////////////////
  plucks = loadSound('assets/fx/cybrcity/synth2.mp3');

  //-ARP-//////////////////////////////////////////////
  arp = loadSound('assets/fx/cybrcity/arp.mp3');
}

function setup()
{
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);  
  //background(0); already set in style.css
  
  frameRate(fr); //Attempt to refresh at starting FPS

  VideoRecorder.addButton();
  
  //disable browser right context menu
  document.oncontextmenu = function() 
  {
    return false;
  }
  
  //REVERB
  // reverbTime of 3 seconds, decayRate of 0.2%
  reverb = new p5.Reverb();
  reverb.process(drums1, 3, 0.2);
  reverb.process(bass, 3, 0.2);
  //reverb.amp(4); // turn it up!
  
  //textFont('Space Grotesk');
  //textAlign(LEFT);
  pixelDensity(4); //downgrade to 2 if using background(0); in sketch.js instead of css. Or else the background reverts to white, even if set to black.
  //Hack it up from 4 if you want crisp images for print for exemple
  //set to 1 because the video recorder can't follow and lags...

  /*Mobile controls buttons
  button = createButton("S");
  button = createButton("D");
  button = createButton("B");*/
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
    drums1.loop();
  }

  if (mouseButton === CENTER)  
  {
    drums2.loop();
  }

  if (mouseButton === RIGHT)  
  {
    drums3.loop();
  }
}

function mouseReleased()
{
  if (mouseButton === LEFT)  
  {  
    drums1.stop();
  }

  if (mouseButton === CENTER)  
  {
    drums2.stop();
  }

  if (mouseButton === RIGHT)  
  {
    drums3.stop();
  }
}

function keyTyped()
{
  //SYNTH
  if (key == 's') //plays synth
  {
    console.log(drums1.isPlaying()+0);
    
    if (synth.isPlaying())
    {
      //.isPlaying() returns a boolean
      synth.stop();
    }
    else 
    {
      synth.loop();
      synth.amp(0.8); //volume
    }
  }
  
  //BASS
  if (key == 'b') //plays synth
  {    
    if (bass.isPlaying())
    {
      //.isPlaying() returns a boolean
      bass.stop();
    }
    else 
    {
      bass.loop();
      bass.amp(0.8); //volume
    }
  }
  
  //PLUCKS
  if (key == 'd') //plays synth
  {    
    if (plucks.isPlaying())
    {
      //.isPlaying() returns a boolean
      plucks.stop();
    }
    else 
    {
      plucks.loop();
      plucks.amp(0.6); //volume
    }
  }

    //ARP
    if (key == 'a') //plays synth
    {    
      if (arp.isPlaying())
      {
        //.isPlaying() returns a boolean
        arp.stop();
      }
      else 
      {
        arp.loop();
        arp.amp(0.8); //volume
      }
    }
  
  //save artwork with the P key.
  if (key == 'p')
  {
    save("GENERATRON_design.png");
  }
  
  if (keyCode == 'BACKSPACE')
  {
    clear();
  }
  
  //type anything -- removed for the moment
  //contents += key;
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}