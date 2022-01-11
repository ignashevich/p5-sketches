import './App.css';
import Sketch from "./components/Sketch";
import {sketchesConfig} from './sketches'
import {useEffect, useReducer, useState} from "react";
import Button from "./components/Button";
import cx from "classnames";
import {LocalStorageSlice} from "./utilities/LocalStorageSlice";

function App() {

    const [selectedModule, setSelectedModule] = useState(null);
    const defaultSketch = new LocalStorageSlice("Default sketch");
    const [selectedSketchId, setSelectedSketchId] = useState(defaultSketch.get())

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const setCurrentSketch = async (id) => {
        const module = await import(`./sketches/${id}.js`);
        setSelectedModule(() => module);
        setSelectedSketchId(id);
    }

    useEffect(() => {
        setCurrentSketch(defaultSketch.get() || sketchesConfig[0].id);
    }, []);


    const onSketchClick = async (id) => {
        setCurrentSketch(id);
    }

    const makeSketchDefault = (id) => {
        defaultSketch.set(id)
        forceUpdate()
    }
    return (
        <div className="flex h-full flex-col">
            <header>
                p5 Sketches
            </header>
            <main className="grow flex">
                <div className="w-4/12 border-r-4">
                    {
                        sketchesConfig.map((config) => {
                            const isDefault = defaultSketch.get() === config.id;

                            return (
                                    <div onClick={() => onSketchClick(config.id)} className="nav-item pl-8 pr-4 flex items-center cursor-pointer my-4 space-x-3 text-xl">
                                        <span>{config.name}</span>
                                        <Button onClick={() => makeSketchDefault(config.id)} className={cx("text-xs", isDefault && "border-green-600 text-green-600")}>Default</Button>
                                        <span></span>
                                    </div>
                                );
                            }
                        )
                    }
                </div>
                <div className="grow grid place-items-center">
                    <Sketch inputs={selectedModule?.inputs} sketch={selectedModule?.sketch} sketchId={selectedSketchId}/>
                </div>
            </main>
            <footer className="p-12 border-t-4 text-center">
                <div>Aliaksandr Ihnashevich</div>
                <a href="https://www.ignashevich.dev/">ignashevich.dev</a>
            </footer>
        </div>
    );
}


export default App;
