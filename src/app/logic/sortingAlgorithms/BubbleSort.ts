import SortingAlgorithm from "./SortingAlgorithm";
import SortingInterface from "./SortingAlgorithm";


export default class BubbleSort extends SortingAlgorithm {
    async sort() {
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
}