let system;
let currentColor = 'b';
let currentOperator = '+';
let currentObj;

export const sketch = (p5) => {
        p5.setup = function setup() {

            currentObj = p5.color(255, 0, 0);

            system = new ParticleSystem(p5.createVector(p5.mouseX, p5.mouseY));

            p5.createCanvas(600, 600);

        }

        p5.draw = function draw() {
            p5.fill(255);
            p5.background(0);
            system.run();
            p5.textSize(32);
            p5.text('Move mouse here', 170, 30);
            p5.fill(255);

        }

        function calculate(val) {
            return currentOperator === '-' ? val -5 : val +5;
        }

        function getStopValue() {
            return currentOperator === '-' ? 0 : 255;
        }

        function getMirrorOperator() {
            return currentOperator === '-' ? '+' : '-';
        }

        function star(x, y, radius1, radius2, npoints) {
            let angle = p5.TWO_PI / npoints;
            let halfAngle = angle / 2.0;
            p5.beginShape();
            for (let a = 0; a < p5.TWO_PI; a += angle) {
                let sx = x + p5.cos(a) * radius2;
                let sy = y + p5.sin(a) * radius2;
                p5.vertex(sx, sy);
                sx = x + p5.cos(a + halfAngle) * radius1;
                sy = y + p5.sin(a + halfAngle) * radius1;
                p5.vertex(sx, sy);
            }
            p5.endShape(p5.CLOSE);
        }


        p5.mouseMoved = function mouseMoved() {
            system.addParticle(p5.createVector(p5.mouseX, p5.mouseY));
            const [red, green, blue] = currentObj.levels;
            if(currentColor == 'b') {
                if (blue === getStopValue()) {
                    currentColor = 'r';
                    currentOperator = getMirrorOperator();
                }
                currentObj = p5.color(red, green, calculate(blue));
            }
            if(currentColor == 'r') {
                if (red === getStopValue()) {
                    currentColor = 'g';
                    currentOperator = getMirrorOperator();
                }
                currentObj = p5.color(calculate(red), green, blue);
            }
            if(currentColor == 'g') {
                if (green === getStopValue()) {
                    currentColor = 'b';
                    currentOperator = getMirrorOperator();
                }
                currentObj = p5.color(red, calculate(green), blue);
            }

        }

// A simple Particle class
        let Particle = function(position) {
            this.acceleration = p5.createVector(0, 0.05);
            this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 0));
            this.position = position.copy();
            this.lifespan = 40;
        };

        Particle.prototype.run = function() {
            this.update();
            this.display();
        };

// Method to update position
        Particle.prototype.update = function(){
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.lifespan -= 2;
        };

// Method to display
        Particle.prototype.display = function() {
            p5.strokeWeight(0);
            p5.fill(currentObj, this.lifespan);
            star(this.position.x, this.position.y, 1, 5, 5);
        };

// Is the particle still useful?
        Particle.prototype.isDead = function(){
            return this.lifespan < 0;
        };

        let ParticleSystem = function(position) {
            this.origin = position.copy();
            this.particles = [];
        };

        ParticleSystem.prototype.addParticle = function(pos) {
            for(let i = 0; i < 2; i++) {
                this.particles.push(new Particle(pos || this.origin));

            }

        };

        ParticleSystem.prototype.run = function() {
            for (let i = this.particles.length-1; i >= 0; i--) {
                let p = this.particles[i];
                p.run();
                if (p.isDead()) {
                    this.particles.splice(i, 1);
                }
            }
        }
}


;
