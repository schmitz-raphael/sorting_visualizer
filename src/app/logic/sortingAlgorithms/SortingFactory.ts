

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
                }
                await new Promise((resolve) => setTimeout(resolve, this.delay));
            }
        }
        this.setHighlighted([]);
    }
    async selectionSort() {
        const newArr = [...this.nums];
        const n = newArr.length;

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < n; j++) {
                // Highlight the two elements being compared
                this.setHighlighted([i, j]);
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
    async insertionSort() {
    const newArr = [...this.nums];

    for (let i = 1; i < newArr.length; i++) {
        let j = i;

        // Small delay for highlighting before comparisons
        await new Promise((resolve) => setTimeout(resolve, this.delay));

        while (j > 0) {
            this.incrementComparisons(); // count the comparison in condition
            this.setHighlighted([j - 1, j]);

            if (newArr[j - 1] > newArr[j]) {
                // Swap
                [newArr[j], newArr[j - 1]] = [newArr[j - 1], newArr[j]];
                this.setArr([...newArr]);
                j--;
                await new Promise((resolve) => setTimeout(resolve, this.delay));
            } else {
                break; // no more shifting needed
            }
        }
    }

    this.setHighlighted([]);
}

}

export default SortingFactory;