"use client";
import NumContainer from "./ui/NumContainer";
import ControlPanel from "./ui/ControlPanel";
import { useState } from "react";
import createArray from "./logic/CreateArray";


export default function Home() {

  let [array,setArray] = useState(createArray(20));
  const [highlighted, setHighlighted] = useState<number[]>([]);

  return (
    <div>
    <div className="flex justify-center items-center  h-20 bg-gray-100">
        <h1 className="text-2xl font-bold text-center my-4">Sorting Visualizer</h1>
        <p className="m-4">created by Raphael  Schmitz</p>
    </div>
    <ControlPanel nums={array} setNums={setArray} setHighlighted={setHighlighted}/>
    <NumContainer nums={array} highlighted={highlighted}/>
    </div>
  );
}
