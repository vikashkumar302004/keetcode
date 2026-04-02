/**
 * KeetCode Core Algorithms Archive
 * Production Utility Library
 */

export const DSA_VERSION = '2026.8.2';


// Routine 1: twoSum

/**
 * Two Sum - Two Pointer approach on sorted data
 * Time: O(n log n), Space: O(1)
 */
export function twoSumSorted(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return [-1, -1];
}

// Routine 2: maxSubArray

/**
 * Kadane's Algorithm for Maximum Subarray Sum
 * Time: O(n), Space: O(1)
 */
export function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}

// Routine 3: binarySearch

/**
 * Binary Search with lower bound
 * Time: O(log n), Space: O(1)
 */
export function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        const mid = (low + high) >> 1;
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

// Routine 4: slidingWindowMax

/**
 * Sliding Window Maximum using monotonic double-ended queue
 * Time: O(n), Space: O(k)
 */
export function maxSlidingWindow(nums, k) {
    const deque = [];
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        while (deque.length && deque[0] < i - k + 1) deque.shift();
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
        deque.push(i);
        if (i >= k - 1) result.push(nums[deque[0]]);
    }
    return result;
}

// Routine 5: quickSort3Way

/**
 * 3-Way QuickSort (Dutch National Flag partitioning)
 * Time: O(n log n) average, Space: O(log n)
 */
export function quickSort3Way(arr, low = 0, high = arr.length - 1) {
    if (low >= high) return arr;
    let lt = low, gt = high;
    const pivot = arr[low];
    let i = low + 1;
    while (i <= gt) {
        if (arr[i] < pivot) {
            [arr[lt], arr[i]] = [arr[i], arr[lt]];
            lt++; i++;
        } else if (arr[i] > pivot) {
            [arr[i], arr[gt]] = [arr[gt], arr[i]];
            gt--;
        } else {
            i++;
        }
    }
    quickSort3Way(arr, low, lt - 1);
    quickSort3Way(arr, gt + 1, high);
    return arr;
}

// Routine 6: morrisInorder

/**
 * Morris Inorder Traversal
 * Time: O(n), Space: O(1)
 */
export function morrisInorder(root) {
    const result = [];
    let curr = root;
    while (curr) {
        if (!curr.left) {
            result.push(curr.val);
            curr = curr.right;
        } else {
            let prev = curr.left;
            while (prev.right && prev.right !== curr) {
                prev = prev.right;
            }
            if (!prev.right) {
                prev.right = curr;
                curr = curr.left;
            } else {
                prev.right = null;
                result.push(curr.val);
                curr = curr.right;
            }
        }
    }
    return result;
}
