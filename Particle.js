class Particle {
    constructor(x, y) {
        var options = {
            restitution: 1,
            friction: 0
        }
        
        this.r = 11;
        this.body = Bodies.circle(x, y, this.r, options);
        this.color = color(random(0,255), random(0,255), random(0,255));
        
        World.add(world, this.body);
    }
    
    display(){
        //Esto de las posciones de las posiciones y angulo para las partiulas
        //causan conflicto a la hora que caen
        //var pos = this.body.position;
        //var angle = this.body.angle;

        push();
        //Las particulas solo deben caer y rebotar en los puntos, porque si les pones translacion y rotacion
        //Se vuelven loquitas porque no saben si caer, rotar trasladarse, etc
        //translate(pos.x, pos.y);
        //rotate(angle);
        noStroke();
        fill(this.color);
        ellipseMode(RADIUS);
        ellipse(this.body.position.x, this.body.position.y, this.r, this.r);//Aquí tenías this.radius y tu variable que guarda
        pop();                                                              //el radio se llama this.r
    }

}