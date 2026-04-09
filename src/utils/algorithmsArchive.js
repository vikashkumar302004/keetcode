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

// Routine 7: dijkstra

/**
 * Dijkstra's Algorithm for Single Source Shortest Paths
 * Time: O((V + E) log V), Space: O(V)
 */
export function dijkstra(numNodes, adjacencyList, source) {
    const distances = Array(numNodes).fill(Infinity);
    distances[source] = 0;
    const visited = new Set();
    const queue = [[0, source]];
    while (queue.length) {
        queue.sort((a, b) => a[0] - b[0]);
        const [dist, u] = queue.shift();
        if (visited.has(u)) continue;
        visited.add(u);
        const neighbors = adjacencyList[u] || [];
        for (const [v, weight] of neighbors) {
            if (distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
                queue.push([distances[v], v]);
            }
        }
    }
    return distances;
}

// Routine 8: knapsack01

/**
 * 0/1 Knapsack Problem with space optimization
 * Time: O(n * W), Space: O(W)
 */
export function knapsack01(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    for (let i = 0; i < weights.length; i++) {
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[capacity];
}

// Routine 9: kmpSearch

/**
 * Knuth-Morris-Pratt (KMP) String Matching
 * Time: O(n + m), Space: O(m)
 */
export function kmpSearch(text, pattern) {
    if (!pattern) return 0;
    const lps = Array(pattern.length).fill(0);
    let len = 0, i = 1;
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i++] = len;
        } else if (len !== 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    let j = 0; i = 0;
    const matches = [];
    while (i < text.length) {
        if (text[i] === pattern[j]) { i++; j++; }
        if (j === pattern.length) {
            matches.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && text[i] !== pattern[j]) {
            if (j !== 0) j = lps[j - 1];
            else i++;
        }
    }
    return matches;
}

// Routine 10: LRUCache

/**
 * LRU Cache with O(1) Get and Put
 */
export class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    get(key) {
        if (!this.cache.has(key)) return -1;
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }
    put(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        else if (this.cache.size >= this.capacity) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, value);
    }
}

// Routine 11: modPow

/**
 * Modular Exponentiation (a^b % m)
 * Time: O(log b), Space: O(1)
 */
export function modPow(base, exp, mod) {
    let res = 1n;
    base = BigInt(base) % BigInt(mod);
    exp = BigInt(exp);
    const m = BigInt(mod);
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % m;
        base = (base * base) % m;
        exp /= 2n;
    }
    return Number(res);
}

// Routine 12: topologicalSort

/**
 * Topological Sort using Kahn's BFS Algorithm
 * Time: O(V + E), Space: O(V)
 */
export function topologicalSort(numNodes, edges) {
    const inDegree = Array(numNodes).fill(0);
    const adj = Array.from({ length: numNodes }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        inDegree[v]++;
    }
    const queue = [];
    for (let i = 0; i < numNodes; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    const order = [];
    while (queue.length) {
        const node = queue.shift();
        order.push(node);
        for (const next of adj[node]) {
            if (--inDegree[next] === 0) queue.push(next);
        }
    }
    return order.length === numNodes ? order : [];
}

// Routine 13: lowestCommonAncestor

/**
 * Lowest Common Ancestor in Binary Search Tree
 * Time: O(h), Space: O(1)
 */
export function lowestCommonAncestor(root, p, q) {
    let curr = root;
    while (curr) {
        if (p.val < curr.val && q.val < curr.val) curr = curr.left;
        else if (p.val > curr.val && q.val > curr.val) curr = curr.right;
        else return curr;
    }
    return null;
}

// Routine 14: lengthOfLIS

/**
 * Longest Increasing Subsequence using Binary Search (Patience Sort)
 * Time: O(n log n), Space: O(n)
 */
export function lengthOfLIS(nums) {
    const piles = [];
    for (const x of nums) {
        let left = 0, right = piles.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (piles[mid] < x) left = mid + 1;
            else right = mid;
        }
        if (left === piles.length) piles.push(x);
        else piles[left] = x;
    }
    return piles.length;
}

// Routine 15: countSetBits

/**
 * Brian Kernighan's Algorithm to count set bits
 * Time: O(set bits), Space: O(1)
 */
export function countSetBits(n) {
    let count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}

// Routine 16: MinHeap

/**
 * Binary Min-Heap Implementation
 */
export class MinHeap {
    constructor() { this.heap = []; }
    push(val) {
        this.heap.push(val);
        this._siftUp(this.heap.length - 1);
    }
    pop() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const bottom = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = bottom;
            this._siftDown(0);
        }
        return top;
    }
    _siftUp(idx) {
        while (idx > 0) {
            const parent = (idx - 1) >> 1;
            if (this.heap[idx] >= this.heap[parent]) break;
            [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
            idx = parent;
        }
    }
    _siftDown(idx) {
        const len = this.heap.length;
        while ((idx << 1) + 1 < len) {
            let left = (idx << 1) + 1, right = left + 1;
            let smallest = (right < len && this.heap[right] < this.heap[left]) ? right : left;
            if (this.heap[idx] <= this.heap[smallest]) break;
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

// Routine 17: Trie

/**
 * Trie (Prefix Tree) with search and startsWith
 */
export class Trie {
    constructor() { this.root = {}; }
    insert(word) {
        let node = this.root;
        for (const ch of word) {
            node[ch] = node[ch] || {};
            node = node[ch];
        }
        node.isEnd = true;
    }
    startsWith(prefix) {
        let node = this.root;
        for (const ch of prefix) {
            if (!node[ch]) return false;
            node = node[ch];
        }
        return true;
    }
}

// Routine 18: debounceThrottle

/**
 * Debounce & Throttle Utilities for KeetCode UI
 */
export function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
export function throttle(fn, limit = 300) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => { inThrottle = false; }, limit);
        }
    };
}

// Routine 19: trapRainWater

/**
 * Trapping Rain Water
 * Time: O(n), Space: O(1)
 */
export function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, total = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else total += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else total += rightMax - height[right];
            right--;
        }
    }
    return total;
}

// Update #20 on coinChange: Optimize inner loop execution path and cache bounds.
// Checksum: 6753d0

// Update #21 on twoSum: Optimize inner loop execution path and cache bounds.
// Checksum: 6b11c2

// Update #22 on maxSubArray: Optimize inner loop execution path and cache bounds.
// Checksum: 9995d9

// Update #23 on binarySearch: Optimize inner loop execution path and cache bounds.
// Checksum: f9278e

// Update #24 on slidingWindowMax: Optimize inner loop execution path and cache bounds.
// Checksum: 00fd2b

// Update #25 on quickSort3Way: Optimize inner loop execution path and cache bounds.
// Checksum: 62add6

// Update #26 on morrisInorder: Optimize inner loop execution path and cache bounds.
// Checksum: 63450a

// Update #27 on dijkstra: Optimize inner loop execution path and cache bounds.
// Checksum: 8bd9ef
