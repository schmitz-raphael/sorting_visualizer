import SortingAlgorithm from "./SortingAlgorithm";


export default class HeapSort extends SortingAlgorithm {
    async sort() {
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
            await new Promise((resolve) => setTimeout(resolve, this.delay));
            if (arr[left] > arr[largest]) largest = left;
        }
        if (right < n) {
            this.incrementComparisons();
            this.setHighlighted([largest, right]);
            await new Promise((resolve) => setTimeout(resolve, this.delay));
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