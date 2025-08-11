import SortingAlgorithm from "./SortingAlgorithm";


export default class MergeSort extends SortingAlgorithm {
    async sort() {
        await this.mergeSort();
        await this.loadArray();
        this.setHighlighted([]);
    }
    async mergeSort(left = 0, right = this.nums.length - 1) {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);
        await this.mergeSort(left, mid);
        await this.mergeSort(mid + 1, right);
        await this.merge(left, mid, right);
    }
    async merge(left: number, mid: number, right: number) {
        const leftArr = this.nums.slice(left, mid + 1);
        const rightArr = this.nums.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left; 

        while (i < leftArr.length && j < rightArr.length) {
            this.setHighlighted([left + i, mid + 1 + j]);
            this.incrementComparisons();
            await new Promise((resolve) => setTimeout(resolve, this.delay));
            if (leftArr[i] <= rightArr[j]) {
                this.nums[k] = leftArr[i++];
            }
            else {
                this.nums[k] = rightArr[j++];
            }
            k++;
            this.setArr([...this.nums]);
        }

        // Copy any remaining elements of leftArr
        while (i < leftArr.length) {
            this.nums[k++] = leftArr[i++];
            this.setArr([...this.nums]);
            await new Promise((resolve) => setTimeout(resolve, this.delay));
        }

        // Copy any remaining elements of rightArr
        while (j < rightArr.length) {
            this.nums[k++] = rightArr[j++];
            this.setArr([...this.nums]);
            await new Promise((resolve) => setTimeout(resolve, this.delay));
        }
    }

}