import React, {useEffect, useRef} from 'react';
import p5 from "p5";
import Button from "./Button";
import {useCachedState} from "../hooks/useCachedState";

const id = "p5sketch";

const createSketch = (sketch, values) => {
    return sketch && new p5((editor) => sketch(editor, values), document.getElementById(id))
}

const Sketch = ({sketch, inputs}) => {
    const [values, setValues] = useCachedState('sketchValues');
    const sketchInstance = useRef(null);

    const onValueChange = (id, value) => {
        setValues({...values, [id]: value});
    }

    useEffect(() => {
        !values && setValues(() => inputs?.reduce((prev, curr) => {
            prev[curr.id] = curr.default;
            return prev;
        }, {}));
    }, [inputs]); // map config with default values to initial state

    useEffect(() => {
        sketchInstance.current = createSketch(sketch, values);
        return () => {
           sketchInstance.current?.remove();
        }
    }, [sketch]);

    const runSketch = () => {
        sketchInstance.current.remove();
        sketchInstance.current = createSketch(sketch, values);
    }

    return (
        <div>
            <div className="mb-12 space-y-3">
                {inputs?.map((input) => (
                    <div className="space-x-3">
                        <label htmlFor={input.name}>{input.name}</label>
                        <input
                            className="bg-black border border-white px-2 py-1"
                            id={input.name}
                            value={values?.[input.id]}
                            onChange={(event => onValueChange(input.id, event.target.value))}
                            type="text"
                        />
                        <span>({input.type})</span>
                    </div>
                ))}
                { inputs && <Button onClick={runSketch}>Run</Button> }
            </div>
            <div className="border-2 border-dashed p-4" id={id}>
                {!sketch && "No sketch selected"}
            </div>
        </div>
    );
};

export default Sketch;
