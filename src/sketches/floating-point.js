import p5Lib from "p5";
import {getSketchDefaults} from "../utilities/getSketchDefaults";

export const sketch = (p5, values = getSketchDefaults(inputs)) => {
    let position = p5.createVector(0, 0);
    let velocity = p5Lib.Vector.random2D();
    velocity.mult(p5.random(3));

    p5.setup = () => {
        p5.createCanvas(600, 600);
        p5.background(0);

    };

    p5.draw = () => {
        p5.translate(p5.width/2, p5.height/2);
        p5.scale(1, -1);
        p5.stroke(255);
        p5.fill(0);
        p5.circle(position.x, position.y, 10);
        let acc = p5Lib.Vector.random2D();


        velocity.add(acc);
        velocity.limit(values.speedLimit);
        position.add(velocity);
        position.x = p5.constrain(position.x, -290, 290);
        position.y = p5.constrain(position.y, -290, 290);


    };
};

export const inputs = [
    {
        id: 'speedLimit',
        name: "Speed limit",
        type: "number",
        default: 2
    }
]
