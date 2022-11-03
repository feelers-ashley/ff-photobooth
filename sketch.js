/* ===
~ DIY! Good AM Graphic & WhatsApp Sticker Booth 
Presented by Feelers with library@orchard.
https://feelers-feelers.com/

Colloquially-known “Good Morning” WhatsApp images are easily identified by their colourful, saturated stock backgrounds featuring positive daily tidings in mismatched fonts.

Come visit this activity booth to make your own “Good Morning” graphics using a generator created by Singaporean art & tech label Feelers! The first 30 participants may have their generated images made into WhatsApp stickers, released by Feelers.
=== */

new p5();
let gg;
let c1, c2, gc1, gc2;
let fLogo;
let PlayfairDisplay, PoorStory, Satisfy, Trispace, ZCOOLKuaiLe;
let bgLBtn, bgRBtn, subBtn, frameBtn, greetBtn, saveBtn;
let bgImgs = [];
let subjectImgs = [];
let greetings = [];
let bgImg, subjectImg;
let greeting;
let textInput;
let greetFillCol, greetStrCol, msgFillCol, msgStrCol, frameCol;
let greetX, greetY, msgX, msgY, subX, subY;
let noiseScale;
let counter;

////////// PRELOAD IMGS //////////
function preload() {
  PlayfairDisplay = loadFont("assets/font/PlayfairDisplay.ttf");
  PoorStory = loadFont("assets/font/PoorStory.ttf");
  Satisfy = loadFont("assets/font/Satisfy.ttf");
  Trispace = loadFont("assets/font/Trispace.ttf");
  ZCOOLKuaiLe = loadFont("assets/font/ZCOOLKuaiLe.ttf");

  fLogo = loadImage("assets/feelers-logo.png");
  for (let i = 0; i < 29; i++) {
    bgImgs[i] = loadImage("assets/bg/bg" + i + ".png");
    subjectImgs[i] = loadImage("assets/subject/subject" + i + ".png");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gg = createGraphics(0.75 * height, 0.75 * height);

  ////////// APPLY COLOUR GRADIENTS //////////
  c1 = color(255, 255, 255);
  c2 = color(255, 0, 127);
  gc1 = color(255, 229, 204);
  gc2 = color(102, 178, 255);

  push();
  for (let i = 0; i < height; i++) {
    n = map(i, 0, height, 0, 1);
    let newc = lerpColor(c1, c2, n);
    let newgc = lerpColor(gc1, gc2, n);
    stroke(newc);
    gg.stroke(newgc);
    line(0, i, width, i);
    gg.line(0, i, width, i);
  }
  granulate(30);
  pop();

  ////////// ASSIGN BUTTONS //////////
  greetBtn = createImg("assets/button/greet.png");
  greetBtn.position(0.07 * width, 0.28 * height);
  greetBtn.size(0.12 * width, 0.095 * width);
  greetBtn.mousePressed(changeGreeting);

  subBtn = createImg("assets/button/subject.png");
  subBtn.size(0.1 * width, 0.1 * width);
  subBtn.position(0.09 * width, 0.7 * height);
  subBtn.mousePressed(changeSubject);

  bgLBtn = createImg("assets/button/arrowL.png");
  bgLBtn.size(0.07 * width, 0.06 * width);
  bgLBtn.position(
    0.5 * width - gg.width / 2 - bgLBtn.width - 0.025 * width,
    0.55 * height - bgLBtn.height / 2
  );
  bgLBtn.mousePressed(changeLBackground);

  bgRBtn = createImg("assets/button/arrowR.png");
  bgRBtn.size(0.07 * width, 0.06 * width);
  bgRBtn.position(
    0.5 * width + gg.width / 2 + 0.025 * width,
    0.55 * height - bgRBtn.height / 2
  );
  bgRBtn.mousePressed(changeRBackground);

  frameBtn = createImg("assets/button/frame.png");
  frameBtn.position(0.79 * width, 0.16 * height);
  frameBtn.size(0.12 * width, 0.14 * width);
  frameBtn.mousePressed(changeFrame);

  saveBtn = createImg("assets/button/save.png");
  saveBtn.position(0.5 * width + gg.width / 2 + 0.045 * width, 0.78 * height);
  saveBtn.size(0.1 * width, 0.1 * width);
  saveBtn.mousePressed(saveImg);

  ////////// ASSIGN INIT GRAPHICS //////////
  bgImg = bgImgs[0];
  subjectImg = subjectImgs[0];
  greetings = [
    "good morning",
    "baby girl",
    "merry time",
    "exceeding favour",
    "daily blessings",
    "another slay",
    "fair warning",
    "bestest wishes",
    "best regrets",
    "wonderful promises",
    "epic happy",
    "incoming income",
    "zero suffer",
    "smell nice",
    "fantastic day",
  ];
  greeting = greetings[0];
  textInput = createInput("wishing a merry day today and everyday");
  textInput.position(0.831 * width, 0.64 * height);
  textInput.size(0.14 * width, 0.02 * width);
  textInput.style("font-size", "20px");
  greetFillCol = color(random(255), random(255), random(255));
  greetStrCol = color(random(255), random(255), random(255));
  msgFillCol = color(random(255), random(255), random(255));
  msgStrCol = color(random(255), random(255), random(255));
  frameCol = color(random(255), random(255), random(255));
  greetX = random(0.1 * gg.height, 0.5 * gg.width);
  greetY = random(0, 0.5 * gg.height);
  msgX = random(0, 0.3 * gg.width);
  msgY = random(0.5 * gg.height, 0.7 * gg.height);
  subX = random(subjectImg.width, gg.width - subjectImg.width);
  subY = random(subjectImg.height, gg.height - subjectImg.height);
  noiseScale = 0.02;
  counter = 0;

  // FEELERS LOGO
  push();
  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowOffsetY = 2;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = color(192);
  image(fLogo, 0.01 * width, 0.01 * height, 0.2 * width, 0.2 * height);
  pop();
}

function draw() {
  ////////// GUI //////////
  push();
  // TITLE
  fill(0);
  textSize(0.05 * width);
  textFont(PoorStory);
  text("make your own Good AM graphic ~", 0.24 * width, 0.11 * height);

  // BUTTON TEXT
  textSize(0.03 * width);
  fill(255, 0, 127);
  textFont(ZCOOLKuaiLe);
  text("greeting", 0.07 * width, 0.5 * height);
  text("subject", 0.09 * width, 0.69 * height);
  text("frame", 0.81 * width, 0.46 * height);
  text("message", 0.83 * width, 0.63 * height);
  text("save", 0.76 * width, 0.77 * height);

  // FOOTER
  textSize(0.01 * width);
  fill(255, 204, 229);
  textFont(Trispace);
  text("www.feelers-feelers.com", 0.1 * width, 0.98 * height);
  text("follow us on ig @feelers_feelers", 0.45 * width, 0.98 * height);
  text("peace and love", 0.88 * width, 0.98 * height);
  pop();

  ////////// GRAPHIC CANVAS //////////
  // BG IMG
  gg.image(bgImg, 0, 0, gg.width, gg.height);

  // SUBJECT IMG
  gg.push();
  gg.image(subjectImg, subX, subY);
  gg.pop();

  // GREETING TEXT
  gg.push();
  gg.textSize(0.03 * width);
  gg.fill(greetFillCol);
  gg.stroke(greetStrCol);
  gg.strokeWeight(5);
  gg.textFont(PlayfairDisplay);
  gg.textWrap(WORD);
  gg.text(greeting, greetX, greetY, gg.width - greetX);
  gg.pop();

  // MESSSAGE TEXT
  gg.push();
  gg.textSize(0.03 * width);
  gg.fill(msgFillCol);
  gg.stroke(msgStrCol);
  gg.strokeWeight(2);
  gg.textFont(Satisfy);
  gg.textWrap(WORD);
  gg.text(textInput.value(), msgX, msgY, gg.width - msgX);
  gg.pop();

  // FRAME
  gg.push();
  gg.strokeWeight(0.006 * width);
  gg.stroke(frameCol);
  gg.noFill();
  gg.square(0, 0, gg.width);
  gg.pop();

  // PRINT
  image(gg, 0.5 * width - gg.width / 2, 0.55 * height - gg.height / 2);
}

////////// APPLY STYLE GRAIN //////////
function granulate(amount) {
  loadPixels();
  const d = pixelDensity();
  const pixelsCount = 4 * (width * d) * (height * d);
  for (let i = 0; i < pixelsCount; i += 4) {
    const grainAmount = random(-amount, amount);
    pixels[i] = pixels[i] + grainAmount;
    pixels[i + 1] = pixels[i + 1] + grainAmount;
    pixels[i + 2] = pixels[i + 2] + grainAmount;
    pixels[i + 3] = pixels[i + 3] + grainAmount;
  }
  updatePixels();
}

////////// BUTTON HANDLERS //////////
function changeGreeting() {
  greeting = greetings[int(random(greetings.length))];
  greetFillCol = color(random(255), random(255), random(255));
  greetStrCol = color(random(255), random(255), random(255));
  msgFillCol = color(random(255), random(255), random(255));
  msgStrCol = color(random(255), random(255), random(255));
  greetX = random(0, 0.5 * gg.width);
  greetY = random(0.1 * gg.height, 0.5 * gg.height);
  msgX = random(0, 0.5 * gg.width);
  msgY = random(0.5 * gg.height, 0.7 * gg.height);
}

function changeLBackground() {
  if (counter == 0) {
    counter = 28;
  } else if (counter > 0 && counter < 29) {
    counter--;
  }
  bgImg = bgImgs[counter];
}
function changeRBackground() {
  if (counter >= 0 && counter < 28) {
    counter++;
  } else if (counter == 28) {
    counter = 0;
  }
  bgImg = bgImgs[counter];
}

function changeSubject() {
  subjectImg = subjectImgs[int(random(subjectImgs.length))];
  subX = random(0, gg.width - subjectImg.width);
  subY = random(0, gg.height - subjectImg.height);
}

function changeFrame() {
  frameCol = color(random(255), random(255), random(255));
}

function saveImg() {
  save(gg, "goodam.png");
}
