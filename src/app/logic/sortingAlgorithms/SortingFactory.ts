class SortingFactory {
    nums: number[];
    setArr: (arr: number[]) => void;
    setHighlighted: (indices: number[]) => void;
    incrementComparisons: () => void;
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

    async bubbleSort() {
        for (let i = 0; i < this.nums.length - 1; i++) {
            for (let j = 0; j < this.nums.length - i - 1; j++) {
                this.setHighlighted([j, j + 1]);
                this.incrementComparisons();
                if (this.nums[j] > this.nums[j + 1]) {
                    [this.nums[j], this.nums[j + 1]] = [this.nums[j + 1], this.nums[j]];
                    this.setArr([...this.nums]);
                }
                await new Promise((resolve) => setTimeout(resolve, this.delay));
            }
        }
        await this.loadArray();
        this.setHighlighted([]);
    }

    async selectionSort() {
        const n = this.nums.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                this.setHighlighted([i, j]);
                this.incrementComparisons();
                await new Promise((resolve) => setTimeout(resolve, this.delay));
                if (this.nums[j] < this.nums[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [this.nums[i], this.nums[minIndex]] = [this.nums[minIndex], this.nums[i]];
                this.setArr([...this.nums]);
                await new Promise((resolve) => setTimeout(resolve, this.delay));
            }
        }
        this.setHighlighted([]);
    }

    async insertionSort() {
        for (let i = 1; i < this.nums.length; i++) {
            let j = i;
            await new Promise((resolve) => setTimeout(resolve, this.delay));
            while (j > 0) {
                this.incrementComparisons();
                this.setHighlighted([j - 1, j]);
                if (this.nums[j - 1] > this.nums[j]) {
                    [this.nums[j], this.nums[j - 1]] = [this.nums[j - 1], this.nums[j]];
                    this.setArr([...this.nums]);
                    j--;
                    await new Promise((resolve) => setTimeout(resolve, this.delay));
                } else {
                    break;
                }
            }
        }
        this.setHighlighted([]);
    }

    async heapSort() {
        const n = this.nums.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(this.nums, n, i);
        }
        for (let i = n - 1; i > 0; i--) {
            [this.nums[0], this.nums[i]] = [this.nums[i], this.nums[0]];
            this.setArr([...this.nums]);
            this.setHighlighted([0, i]);
            await new Promise((resolve) => setTimeout(resolve, this.delay));
            await this.heapify(this.nums, i, 0);
        }
        await this.loadArray();
        this.setHighlighted([]);
    }

    async heapify(arr: number[], n: number, i: number) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n) {
            this.incrementComparisons();
            this.setHighlighted([largest, left]);
            if (arr[left] > arr[largest]) largest = left;
        }
        if (right < n) {
            this.incrementComparisons();
            this.setHighlighted([largest, right]);
            if (arr[right] > arr[largest]) largest = right;
        }
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.setArr([...this.nums]);
            this.setHighlighted([i, largest]);
            await new Promise((resolve) => setTimeout(resolve, this.delay));
            await this.heapify(arr, n, largest);
        }
    }
}

export default SortingFactory;
