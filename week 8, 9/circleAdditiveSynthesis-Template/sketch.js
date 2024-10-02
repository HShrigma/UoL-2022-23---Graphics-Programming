function setup() {
    createCanvas(550,550);
    background(0);
    angleMode(DEGREES);
}
/////////////////////////////////////////////////
function draw() {
    background(0);
    noStroke();
    fill(255,0,255);

    translate(width/2,height/2);

    //ADDITIVE SYNTHESIS IN A CIRCLE
    var radius = 150;
    beginShape();
    for (var theta=0; theta<360; theta+=1){
      var amp = 40;
      var freq = 10;
      var wave1 = sin(theta*freq)*amp;// your sine code here
      
      var frameMod = 0.0002;
      var wave2 = map(noise(theta*frameCount*frameMod), 0,1,0,radius);// your noise code here
      
      var r = radius + wave1 + wave2;
      var x = cos(theta) * r;
      var y = sin(theta) * r;
      vertex(x,y);
    }
    endShape(CLOSE);
}
