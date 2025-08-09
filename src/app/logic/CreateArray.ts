export default function createArray(length: number) {
    return Array.from({length}, () => Math.floor(Math.random() * 100) + 1);
}

