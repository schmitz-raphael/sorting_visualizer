

class SortingFactory {
    nums: number[];
    setArr: (newArr: number[]) => void;
    setHighlighted: (indices: number[]) => void;
    incrementComparisons: () => void;
    delay: number;
    constructor(nums: number[], setArr: (newArr: number[]) => void, setHighlighted: (indices: number[]) => void, incrementComparisons: () => void, delay: number){
        this.nums = nums;
        this.setArr = setArr;
        this.setHighlighted = setHighlighted;
        this.incrementComparisons = incrementComparisons;
        this.delay = delay;
    }
    async bubbleSort() {
        const newArr = [...this.nums]; // copy so we don't mutate props

        for (let i = 0; i < newArr.length - 1; i++) {
            for (let j = 0; j < newArr.length - i - 1; j++) {
            this.setHighlighted([j+1]);
            this.incrementComparisons();
                if (newArr[j] > newArr[j + 1]) {
                    [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
                    this.setArr([...newArr]);
                    await new Promise((resolve) => setTimeout(resolve, 50));
                }
            }
        }
        this.setHighlighted([]);
    }
    async selectionSort() {
        const newArr = [...this.nums]; // copy to avoid mutating props
        const n = newArr.length;

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < n; j++) {
                // Highlight the two elements being compared
                this.setHighlighted([minIndex, j]);
                this.incrementComparisons();
                await new Promise((resolve) => setTimeout(resolve, this.delay));

                if (newArr[j] < newArr[minIndex]) {
                    minIndex = j;
                }
            }

            if (minIndex !== i) {
                [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]];
                this.setArr([...newArr]);
                await new Promise((resolve) => setTimeout(resolve, this.delay));
            }
        }

        // Clear highlight after sorting
        this.setHighlighted([]);
    }
}

export default SortingFactory;