// Declare variables for shape radii
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

const clockDisplay = new Map([
  ['210', "፩"], ['240', "፪"], ['270', "፫"], ['300', "፬"], ['330', "፭"], ['0', "፮"], 
  ['30', "፯"], ['60', "፰"], ['90', "፱"], ['120', "፲"], ['150', "፲፩"], ['180', "፲፪"],
]);

function setup() {
  // Prepare Canvas
  createCanvas(window.innerWidth * .85, window.innerHeight * .85);
  angleMode(DEGREES);
  
  // Set text color, size, and alignment
  stroke(255);
  textSize(50);
  textAlign(CENTER, CENTER);

  // Set the color mode
  colorMode(RGB);

  clockBG = loadImage('assets/sefed-bl.png');

  // Set radius for each shape based on canvas dimensions
  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.85;

  describe('A functioning clock on Ethiopian sefed & Ge\'ez numbers.');
}

function draw() {
  // Move origin to center of canvas
  translate(width / 2, height / 2);

  // Draw the clock background
  noStroke();
  fill(7, 137, 48);
  ellipse(0, 0, clockDiameter + 30, clockDiameter + 30);
  fill(252, 221, 9);
  ellipse(0, 0, clockDiameter + 15, clockDiameter + 15);
  fill(218, 18, 26);
  ellipse(0, 0, clockDiameter, clockDiameter);
  
  // Color
  fill(75);
  ellipse(0, 0, clockDiameter - 15, clockDiameter - 15);
  // Image
  image(clockBG, -clockBG.width / 2, - clockBG.height / 2);

  // Calculate angle for each hand
  let secondAngle = map(second(), 0, 60, 0, 360);
  let minuteAngle = map(minute(), 0, 60, 0, 360);
  let hourAngle = map(hour(), 0, 12, 0, 360);

  stroke(255);

  // Clock labels / numbers / 1-12 / -፲፪
  // Loop through angles 0, 30, 60, 90... degrees
  for (let angle=0; angle < 360; angle += 30) {
    push();                       

    // Translate to center of canvas and rotate by angle
    rotate(angle);
    translate(0, clockDiameter/2 - 45);
    rotate(-angle);

    fill(255);
    stroke(218, 18, 26);

    // Display the angle
    strokeWeight(2.5);
    text(clockDisplay.get(angle.toString()), 0, 0);
    
    pop();
  }

  // Second hand
  push();
  rotate(secondAngle);
  strokeWeight(2);
  stroke(7, 137, 48);
  line(0, 0, 0, -secondsRadius);
  pop();

  // Minute hand
  push();
  strokeWeight(5);
  stroke(252, 221, 9);
  rotate(minuteAngle);
  line(0, 0, 0, -minutesRadius);
  pop();

  // Hour hand
  push();
  strokeWeight(7);
  stroke(218, 18, 26);
  rotate(hourAngle);
  line(0, 0, 0, -hoursRadius);
  pop();

  // Tick markers around perimeter of clock
  push();
  for (let ticks = 0; ticks < 60; ticks += 1) {
    strokeWeight(4);
    
    if(ticks % 5 == 0) strokeWeight(8);
    
    point(0, hoursRadius * .75);
    rotate(6);
  }
  pop();
}