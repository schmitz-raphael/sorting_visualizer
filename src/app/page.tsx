"use client";

import { useState, useEffect } from "react";
import NumContainer from "./ui/NumContainer";
import createArray from "./logic/CreateArray";
import BubbleSort from "./logic/sortingAlgorithms/BubbleSort";
import SortingAlgorithm from "./logic/sortingAlgorithms/SortingAlgorithm";
import InsertionSort from "./logic/sortingAlgorithms/InsertionSort";
import SelectionSort from "./logic/sortingAlgorithms/SelectionSort";
import QuickSort from "./logic/sortingAlgorithms/QuickSort";
import HeapSort from "./logic/sortingAlgorithms/HeapSort";
import MergeSort from "./logic/sortingAlgorithms/MergeSort";

export default function Home() {
  const [nums, setNums] = useState(createArray(50));
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [arraySize, setArraySize] = useState<number>(50);
  const [delay, setDelay] = useState<number>(500);
  const [algorithmName, setAlgorithmName] = useState<string>("bubble");
  
  const [sortingAlgorithm, setSortingAlgorithm] = useState<SortingAlgorithm>(
    new BubbleSort(nums, setNums, setHighlighted, () => setComparisons(prev => prev + 1), delay)
  );
  const incrementComparisons = () => {
    setComparisons(prev => prev + 1);
  };


  useEffect(() => {
    let algo: SortingAlgorithm;
    switch (algorithmName) {
      case "bubble":
        algo = new BubbleSort(nums, setNums, setHighlighted, incrementComparisons, delay);
        break;
      case "selection":
        algo = new SelectionSort(nums, setNums, setHighlighted, incrementComparisons, delay);
        break;
      case "insertion":
        algo = new InsertionSort(nums, setNums, setHighlighted, incrementComparisons, delay);
        break;
      case "merge":
        algo = new MergeSort(nums, setNums, setHighlighted, incrementComparisons, delay);
        break;
      case "quick":
        algo = new QuickSort(nums, setNums, setHighlighted, incrementComparisons, delay);
        break;
      case "heap":
        algo = new HeapSort(nums, setNums, setHighlighted, incrementComparisons, delay);
        break;
      default:
        algo = new BubbleSort(nums, setNums, setHighlighted, incrementComparisons, delay);
        break;
    }
    setSortingAlgorithm(algo);
  }, [nums, delay, algorithmName]);

  const startSorting = async () => {
    setIsSorting(true);
    await sortingAlgorithm.sort();
    setIsSorting(false);
  };

  const resetArray = () => {
    setNums(createArray(arraySize));
    setHighlighted([]);
    setComparisons(0);
    setIsSorting(false);
  };

  const changeAlgorithm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithmName(e.target.value);
    resetArray();
  };

  const changeArraySize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setArraySize(newSize);
    resetArray();
  };

  const changeDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(e.target.value));
  };

  return (
    <div>
      <div className="flex justify-center align-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Sorting Visualizer</h1>
        <p className="text-lg mx-4 my-2">created by Raphael Schmitz</p>
      </div>
      <div className="control-panel flex items-center p-4 bg-gray-200">
        <select
          className="selectedAlgorithm bg-white border border-gray-300 rounded p-2 mr-4"
          onChange={changeAlgorithm}
          value={algorithmName}
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
          className="startSorting bg-blue-500 text-white px-4 py-2 rounded"
          onClick={startSorting}
          disabled={isSorting}
        >
          Start Sort
        </button>
        <button
          className="bg-blue-500 mx-2 text-white px-4 py-2 rounded"
          onClick={resetArray}
          disabled={isSorting}
        >
          Reset Array
        </button>
        <p className="m-2">Array Size: {arraySize}</p>
        <input
          type="range"
          min="10"
          max="100"
          value={arraySize}
          onChange={changeArraySize}
          disabled={isSorting}
        />
        <p className="m-2">Delay (ms): {delay}</p>
        <input
          className="mx-2"
          type="range"
          min="1"
          max="1000"
          value={delay}
          onChange={changeDelay}
          disabled={isSorting}
        />
      </div>
      <p className="m-2">Number of comparisons: {comparisons}</p>
      <NumContainer nums={nums} highlighted={highlighted} />
    </div>
  );
}
