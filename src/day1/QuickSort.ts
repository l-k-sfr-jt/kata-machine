function partition(arr: number[], low: number, hi: number): number {
    const pivot = arr[hi];

    let index = low - 1;
    for (let i = low; i < hi; ++i) {
        if (arr[i] <= pivot) {
            index++;
            const tmp = arr[i];
            arr[i] = arr[index];
            arr[index] = tmp;
        } else {
        }
    }
    index++;
    arr[hi] = arr[index];
    arr[index] = pivot;

    return index;
}

function qs(arr: number[], low: number, hi: number): void {
    if (low >= hi) {
        return;
    }
    const pivotIndex = partition(arr, low, hi);

    qs(arr, low, pivotIndex - 1);
    qs(arr, pivotIndex + 1, hi);
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
