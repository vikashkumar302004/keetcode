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
