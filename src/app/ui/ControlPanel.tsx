import React, { useState } from "react";
import createArray from "../logic/CreateArray";
import SortingFactory from "../logic/sortingAlgorithms/SortingFactory";

interface ControlPanelProps {
  nums: number[];
  setNums: React.Dispatch<React.SetStateAction<number[]>>;
  setHighlighted: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function ControlPanel({ nums, setNums, setHighlighted}: ControlPanelProps) {
    const [isSorting, setIsSorting] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
    const [comparisons, setComparisons] = useState<number>(0);
    const [arraySize, setArraySize] = useState<number>(20);
    const [delay, setDelay] = useState<number>(0.5);

    const startSorting = async () => {
      if (isSorting) return;
      resetArray();
      setIsSorting(true);
      let sortingFactory = new SortingFactory(nums, setNums, setHighlighted, incrementComparisons, delay);
      switch (selectedAlgorithm){
        case "bubble":
          await sortingFactory.bubbleSort();
          break;
        case "selection":
          await sortingFactory.selectionSort();
          break;
        default:
          break;
      }
      setIsSorting(false);
    };

    const resetArray = () => {
      setNums(createArray(arraySize));
      setHighlighted([]);
      setComparisons(0);
    }
    const changeAlgorithm = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedAlgorithm(e.target.value);
      resetArray();
    }
    const changeArraySize = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSize = Number(e.target.value);
      setArraySize(newSize); 
      resetArray();
    }
    const changeDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDelay = Number(e.target.value) / 100;
      setDelay(newDelay); 
    }
    const incrementComparisons = () => {
      setComparisons(prev => prev + 1);
    }
    return (
      <div>
        <div className="control-panel flex items-center p-4 bg-gray-200">
          <select 
            className = "selectedAlgorithm bg-white border border-gray-300 rounded p-2 mr-4" 
            onChange={changeAlgorithm}
            disabled={isSorting}
          >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="heap">Heap Sort</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={startSorting}
            disabled={isSorting}
          >
            Start Sort
          </button>
          <p className="m-2">Array Size: {arraySize}</p>
          <input 
              type="range"
              min = "10"
              max = "30"
              defaultValue="20"
              onChange={changeArraySize}/>
          <p className="m-2">Delay (in seconds): {delay}</p>
          <input 
              className="mx-2"
              type="range"
              min = "10"
              max = "100"
              defaultValue="50"
              onChange={changeDelay}/>
        </div>
        <p className="m-2">Number of comparisons: {comparisons}</p>
      </div>
    );
}
