import SortingAlgorithm from "./SortingAlgorithm";


export default class SelectionSort extends SortingAlgorithm {
    async sort() {
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
        await this.loadArray();
        this.setHighlighted([]);
    }
}