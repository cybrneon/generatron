let angle = 0;
let fr = 60;
let myFont;
//let contents = ""; -- removed for the moment

let drums; let synth; let bass; let plucks;


function preload()
{
  //preload stuff
  //TEXTURES
  cubeTexture = loadImage('assets/textures/sky.png');
  //myFont = loadFont('assets/fonts/Syne-Bold.otf');
  
  //SOUNDS  
  drums = loadSound('assets/fx/drums.mp3');
  synth = loadSound('assets/fx/synth.mp3');
  bass = loadSound('assets/fx/bass.mp3');
  plucks = loadSound('assets/fx/synth2.mp3');
}

function setup()
{
  createCanvas(windowWidth, windowHeight, WEBGL);
  //background(0); already set in style.css
  
  frameRate(fr); //Attempt to refresh at starting FPS

  VideoRecorder.addButton();
  
  //disable browser right context menu
  document.oncontextmenu = function() 
  {
    return false;
  }
  
  reverb = new p5.Reverb();

  //REVERB
  // reverbTime of 3 seconds, decayRate of 0.2%
  reverb.process(drums, 3, 0.2);
  reverb.process(bass, 3, 0.2);
  //reverb.amp(4); // turn it up!
  
  //textFont(myFont);
  //textAlign(LEFT);
  pixelDensity(4); //downgrade to 2 if using background(0); in sketch.js instead of css. Or else the background reverts to white, even if set to black.
}

function draw()
{
  //textSize(32); -- removed for the moment
  //text(contents, mouseX-400, mouseY-400); -- removed for the moment
  
  if(mouseIsPressed)
  {
    if (mouseButton === LEFT) 
    {
      normalMaterial();
      //fill(255); // fill color white
      stroke(0);
    }
    if (mouseButton === RIGHT) 
    {
      sphere(150);
      fill('#0066ff');
      stroke('#FF9900');
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
    drums.loop();
}

function mouseReleased()
{
    drums.stop();
}

function keyTyped()
{
  //SYNTH
  if (key == 's', 'S') //plays synth
  {
    console.log(drums.isPlaying()+0);
    
    if (synth.isPlaying())
    {
      //.isPlaying() returns a boolean
      synth.stop();
    }
    else 
    {
      synth.loop();
    }
  }
  
  //BASS
  if (key == 'b', 'B') //plays synth
  {    
    if (bass.isPlaying())
    {
      //.isPlaying() returns a boolean
      bass.stop();
    }
    else 
    {
      bass.loop();
    }
  }
  
  //SYNTH 2 (PLUCKS)
  if (key == 'd', 'D') //plays synth
  {    
    if (plucks.isPlaying())
    {
      //.isPlaying() returns a boolean
      plucks.stop();
    }
    else 
    {
      plucks.loop();
    }
  }
  
  //save artwork with the P key.
  if (key == 'p')
  {
    save("myCYBRDesign.png");
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