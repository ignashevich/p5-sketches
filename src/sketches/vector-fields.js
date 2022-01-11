import {getSketchDefaults} from "../utilities/getSketchDefaults";

export const sketch = (p5, values = getSketchDefaults(inputs)) => {

    const cellSize = 20;
    const xRange = [-10, 10];
    const yRange = [-10, 10];

    let funcX = new Function("return " + `function (x, y) { return ${values.x}; }`)()
    let funcY = new Function("return " + `function (x, y) { return ${values.y}; }`)()

    p5.setup = () => {
        p5.createCanvas(600, 600);

    };

    p5.draw = () => {
        p5.translate(p5.width/2, p5.height/2);
        p5.scale(1, -1);
        p5.stroke(255);

        for (let y = yRange[0]; y < yRange[1]; y++) {
            for (let x = xRange[0]; x < xRange[1]; x++) {
                const xVector = funcX(x, y);
                const yVector = funcY(x, y);

                p5.line(x * cellSize, y * cellSize, x * cellSize + xVector, y * cellSize + yVector);
            }
        }
    };
};

export const inputs = [
    {
        id: 'x',
        name: "f(x,y) = (x)",
        type: "js expression",
        default: "x+(y*2)"
    },
    {
        id: 'y',
        name: "f(x,y) = (y)",
        type: "js expression",
        default: "y-(x*2)"
    },
]
