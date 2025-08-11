abstract class SortingAlgorithm {
  nums: number[];
  protected setArr: (arr: number[]) => void;
  protected setHighlighted: (indices: number[]) => void;
  protected incrementComparisons: () => void;
  delay: number;

  constructor(
    nums: number[],
    setArr: (arr: number[]) => void,
    setHighlighted: (indices: number[]) => void,
    incrementComparisons: () => void,
    delay: number
  ) {
    this.nums = nums;
    this.setArr = setArr;
    this.setHighlighted = setHighlighted;
    this.incrementComparisons = incrementComparisons;
    this.delay = delay;
  }

  async loadArray() {
    const highlighted: number[] = [];
    for (let i = 0; i < this.nums.length; i++) {
      highlighted.push(i);
      this.setHighlighted([...highlighted]);
      await new Promise((resolve) => setTimeout(resolve, this.delay));
    }
    this.setHighlighted([]);
  }

  // All subclasses must implement this method
  abstract sort(): Promise<void>;
}
export default SortingAlgorithm;