import SortingAlgorithm from "./SortingAlgorithm";

export default class QuickSort extends SortingAlgorithm {
    async sort() {
        await this.quickSort(0, this.nums.length - 1);
        await this.loadArray();
        this.setHighlighted([]);
    }

    async quickSort(low: number = 0, high: number = this.nums.length - 1) {
        if (low < high) {
            const pivotIndex = await this.partition(low, high);

            // Sort left part
            await this.quickSort(low, pivotIndex - 1);

            // Sort right part
            await this.quickSort(pivotIndex + 1, high);
        }
    }

    async partition(low: number, high: number): Promise<number> {
        const pivot = this.nums[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            this.incrementComparisons();
            this.setHighlighted([j, high]); // comparing element with pivot
            await new Promise((resolve) => setTimeout(resolve, this.delay));

            if (this.nums[j] <= pivot) {
                i++;
                [this.nums[i], this.nums[j]] = [this.nums[j], this.nums[i]];
                this.setArr([...this.nums]);
            }
        }

        // Place pivot in correct spot
        [this.nums[i + 1], this.nums[high]] = [this.nums[high], this.nums[i + 1]];
        this.setArr([...this.nums]);
        this.setHighlighted([i + 1]); // highlight pivot position
        await new Promise((resolve) => setTimeout(resolve, this.delay));

        return i + 1;
    }
}