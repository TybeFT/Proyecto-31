var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
  Body = Matter.Body
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
//variable para almacenar la imagen del fondo
var groundImg;
//variable para almacenar el estado del juego
var gameState = "over"
//variables para almacenar los objetos de los bordes L=izquierda, R=derecha
var bordeL,bordeR;

function preload(){
  groundImg = loadImage("fondo.jpg");
}


function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  /* 
  Crea los bordes de la izquierda y la derecha ya que me di cuenta de que 
  las pelotitas (particulas) se salían de los bordes, así que los cree 
  */
  
  bordeL = new Divisions(3,400,10,800);
  bordeR = new Divisions(797,400,10,800);

  //crea los objetos para dividir
  for (var k = 0; k <=800; k = k + 100) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //crea la primera fila de objetos plinko
  for (var j =30; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //crea la segunda fila de objetos plinko
  for (var j = 20; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //crea la tercera fila de objetos plinko
  for (var j = 40; j <= width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }
  
  //crea la cuarta fila de objetos plinko
  for (var j = 20; j <= width-10; j=j+50){
    plinkos.push(new Plinko(j,375));
  }

  //crea los objetos partícula
  if(frameCount % 100 === 0){
    /*
    Quería hacer algo como que cuando las pelotitas llegaran a su destino, osea
    cuando estan en las divisones se cambiara el estado del juego para lanzar
    la alerta pero sigue siendo lo mismo y la alerta la saca desde el principio 
    asi que cambie el propósito de la alerta
    */
    gameState = "gameplay"
    for(var i = 10; i <= 100; i++){//Te faltaba este for para que cayeran varias particulas
    particles.push(new Particle(random(width/2-10, width/2+10), 10,10));
  }
}

//Indica que si el estado es diferente a over lance la alerta
if(gameState !== "over"){
  alert("Click on 'Aceptar' to play the PlinkosGame");
}

//Invoca la funcion de fuerza
force();
}

function draw() {
  background(groundImg);
  textSize(25)
 
  Engine.update(engine);
  ground.display();
  //muestra los bordes laterales 
  bordeL.display();
  bordeR.display();

  //muestra los plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //muestra las divisiones
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  //muestra las partículas 
  for (var i = 0; i < divisions.length; i++){
    particles[i].display();
  }
  // Texto de puntajes 
  fill("white");
  stroke("black");
  text("100",730,700);
  text("50",640,700);
  text("30",540,700)
  text("10",440,700);
  text("10",340,700);
  text("30",240,700);
  text("50",140,700);
  text("100",30,700);
}

/*
Aquí intente hacer una funcion como en el proyecto 28 que aplica fuerzas a los objetos 
pero no se por que no hace nada cuando presionas la tecla
No lanza errores simplemente no hace nada
*/
function force(){
  if(keyCode === 32){
    Matter.Body.applyForce(particles.body,particles.body.position, {x: 0, y: 30});
  }
}
