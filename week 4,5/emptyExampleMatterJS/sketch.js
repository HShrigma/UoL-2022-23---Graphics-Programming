// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var ground1, ground2;

var boxes = [];

function setup() {
    createCanvas(900, 600);

    //init engine
    engine = Engine.create();

    //init bodies
    ground1 = Bodies.rectangle(100, 200, 810, 10, { isStatic: true, angle: Math.PI * 0.06 });
    ground2 = Bodies.rectangle(500, 500, 810, 10, { isStatic: true, angle: Math.PI * -0.06 });

    //add all bodies to world
    World.add(engine.world, [ ground1, ground2]);
}

function draw() {
    background(0);
    Engine.update(engine);

    //draw boxes
    fill(255);
    generateObjects(width / 2, 0);
    for (let i = 0; i < boxes.length; i++) {
        drawVertices(boxes[i].vertices);
        
        //check if rendering outside of screen
        if(isOffScreen(boxes[i])){
            World.remove(engine.world, boxes[i]);
            boxes.splice(i,1);
            i--;
        }
    }
    //draw ground
    fill(255);
    drawVertices(ground1.vertices);
    drawVertices(ground2.vertices);
}

function isOffScreen(body) {
    var pos = body.position;

    return (pos.x > width || pos.y > height || pos.x < 0 || pos.y < 0);
}

function generateObjects(x, y) {
    var b = Bodies.rectangle(x, y, random(10, 30), random(10, 30), { restitution: .8, friction: .05 });
    boxes.push(b);
    World.add(engine.world, [b]);
}

function drawVertices(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}