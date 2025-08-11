import SortingAlgorithm from "./SortingAlgorithm";


export default class InsertionSort extends SortingAlgorithm {
    async sort() {
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
        await this.loadArray();
        this.setHighlighted([]);
    }
}