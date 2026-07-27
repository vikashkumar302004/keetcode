// Ultra-Detailed Editorials for Array Problems 26 to 29

export const arrayEditorialsPart6 = {
  // 26. BEST TIME TO BUY AND SELL STOCK
  26: {
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array prices where prices[i] is the price of a stock on day i, maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    examples: [
      {
        input: "prices = [7, 1, 5, 3, 6, 4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
        note: "Cannot buy on day 2 and sell on day 1 (must buy before selling)."
      }
    ],
    brute: {
      title: "Brute Force Approach: Double Loop Buy & Sell Pairs O(N²)",
      algorithm: {
        english: "1. Evaluate all buy day i and sell day j pairs (j > i).\n2. Calculate profit = prices[j] - prices[i].\n3. Update maxProfit = MAX(maxProfit, profit).",
        hinglish: "1. Buy day i (0 se N-1) aur sell day j (i+1 se N-1) ke saare pairs check karo.\n2. profit = prices[j] - prices[i] calculate karo.\n3. maxProfit = max(maxProfit, profit) update karte raho."
      },
      pseudocode: `FUNCTION maxProfitBrute(prices, N):
    maxProfit = 0
    FOR i FROM 0 TO N-1 DO:
        FOR j FROM i+1 TO N-1 DO:
            maxProfit = MAX(maxProfit, prices[j] - prices[i])
    RETURN maxProfit`,
      dryRun: [
        { step: "1", state: "prices = [7, 1, 5, 3, 6, 4]", action: "Buy=1, Sell=6 -> Profit = 6-1 = 5!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nint maxProfitBrute(const std::vector<int>& prices) {\n    int maxP = 0, n = prices.size();\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            maxP = std::max(maxP, prices[j] - prices[i]);\n        }\n    }\n    return maxP;\n}`,
        java: `public class Solution {\n    public static int maxProfitBrute(int[] prices) {\n        int maxP = 0, n = prices.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                maxP = Math.max(maxP, prices[j] - prices[i]);\n            }\n        }\n        return maxP;\n    }\n}`,
        python: `def max_profit_brute(prices):\n    max_p = 0; n = len(prices)\n    for i in range(n):\n        for j in range(i + 1, n):\n            max_p = max(max_p, prices[j] - prices[i])\n    return max_p`
      },
      timeComplexity: "O(N²)",
      timeExplanation: "Evaluates N * (N-1) / 2 pairs.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Single Pass MinPrice & MaxProfit Tracking O(N)",
      algorithm: {
        english: "1. Maintain minPrice = INT_MAX and maxProfit = 0.\n2. Iterate stock price p in prices:\n   - minPrice = MIN(minPrice, p).\n   - maxProfit = MAX(maxProfit, p - minPrice).\n3. Return maxProfit.",
        hinglish: "1. minPrice = infinity aur maxProfit = 0 set karo.\n2. Har price p par loop chalao:\n   - minPrice = min(minPrice, p) update karo.\n   - maxProfit = max(maxProfit, p - minPrice) update karo.\n3. maxProfit return kar do."
      },
      pseudocode: `FUNCTION maxProfitOptimal(prices, N):
    minPrice = INT_MAX, maxProfit = 0
    FOR p IN prices DO:
        minPrice = MIN(minPrice, p)
        maxProfit = MAX(maxProfit, p - minPrice)
    RETURN maxProfit`,
      dryRun: [
        { step: "1", state: "prices = [7, 1, 5, 3, 6, 4]", action: "p=1 (min=1), p=6 (profit=5, max=5) -> Return 5!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\n#include <climits>\nint maxProfitOptimal(const std::vector<int>& prices) {\n    int minP = INT_MAX, maxP = 0;\n    for (int p : prices) {\n        minP = std::min(minP, p);\n        maxP = std::max(maxP, p - minP);\n    }\n    return maxP;\n}`,
        java: `public class Solution {\n    public static int maxProfitOptimal(int[] prices) {\n        int minP = Integer.MAX_VALUE, maxP = 0;\n        for (int p : prices) {\n            minP = Math.min(minP, p);\n            maxP = Math.max(maxP, p - minP);\n        }\n        return maxP;\n    }\n}`,
        python: `def max_profit_optimal(prices):\n    min_p, max_p = float('inf'), 0\n    for p in prices:\n        min_p = min(min_p, p)\n        max_p = max(max_p, p - min_p)\n    return max_p`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single linear pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 27. NEXT PERMUTATION
  27: {
    title: "Next Permutation",
    topic: "Arrays",
    difficulty: "Medium",
    problemStatement: "Given an array arr of size N representing a permutation of numbers, rearrange numbers into the lexicographically next greater permutation of numbers in-place.",
    examples: [
      {
        input: "arr = [1, 2, 3]",
        output: "[1, 3, 2]",
        explanation: "Lexicographically next permutation of [1, 2, 3] is [1, 3, 2].",
        note: "If no next permutation exists (sorted descending), reverse into lowest ascending order."
      }
    ],
    brute: {
      title: "Brute Force Approach: Generate All Permutations Search O(N! * N)",
      algorithm: {
        english: "1. Generate all N! permutations in sorted lexicographical order.\n2. Search for arr in generated list.\n3. Return adjacent next permutation.",
        hinglish: "1. Saare N! permutations sorted order me generate karo.\n2. List me current arr search karo.\n3. Agla item next permutation hota hai."
      },
      pseudocode: `FUNCTION nextPermutationBrute(arr, N):
    allPerms = GENERATE_SORTED_PERMUTATIONS(arr)
    idx = FIND(allPerms, arr)
    arr = allPerms[(idx + 1) % len(allPerms)]`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3]", action: "Perms: [[1,2,3], [1,3,2], [2,1,3]...] -> Next is [1, 3, 2]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nvoid nextPermutationBrute(std::vector<int>& arr) {\n    std::vector<int> sorted = arr;\n    std::sort(sorted.begin(), sorted.end());\n    std::vector<std::vector<int>> perms;\n    do { perms.push_back(sorted); } while (std::next_permutation(sorted.begin(), sorted.end()));\n    for (size_t i = 0; i < perms.size(); i++) {\n        if (perms[i] == arr) { arr = perms[(i + 1) % perms.size()]; return; }\n    }\n}`,
        java: `public class Solution {\n    public static void nextPermutationBrute(int[] arr) {\n        int n = arr.length, i = n - 2;\n        while (i >= 0 && arr[i] >= arr[i + 1]) i--;\n        if (i >= 0) {\n            int j = n - 1;\n            while (arr[j] <= arr[i]) j--;\n            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;\n        }\n        int l = i + 1, r = n - 1;\n        while (l < r) { int temp = arr[l]; arr[l] = arr[r]; arr[r] = temp; l++; r--; }\n    }\n}`,
        python: `def next_permutation_brute(arr):\n    n = len(arr); i = n - 2\n    while i >= 0 and arr[i] >= arr[i + 1]: i -= 1\n    if i >= 0:\n        j = n - 1\n        while arr[j] <= arr[i]: j -= 1\n        arr[i], arr[j] = arr[j], arr[i]\n    arr[i + 1:] = reversed(arr[i + 1:])`
      },
      timeComplexity: "O(N! * N)",
      timeExplanation: "Generating all N! permutations.",
      spaceComplexity: "O(N! * N) Auxiliary Space",
      spaceExplanation: "Stores all permutations."
    },
    optimal: {
      title: "Optimal Approach: Breakpoint Search & Partial Reversal O(N) Time O(1) Space",
      algorithm: {
        english: "1. Find breakpoint i (arr[i] < arr[i+1]) from right to left.\n2. If no breakpoint (i < 0), reverse whole array.\n3. Else: find j (arr[j] > arr[i]) from right, swap(arr[i], arr[j]), reverse suffix arr[i+1..N-1].",
        hinglish: "1. Piche se pehla breakpoint i dhoondho (arr[i] < arr[i+1]).\n2. Agar i < 0 ho, poora array reverse kar do.\n3. Warna: piche se j dhoondho (arr[j] > arr[i]), swap(arr[i], arr[j]) karo aur suffix reverse kar do."
      },
      pseudocode: `FUNCTION nextPermutationOptimal(arr, N):
    i = N - 2
    WHILE i >= 0 AND arr[i] >= arr[i+1] DO i--
    IF i >= 0 THEN:
        j = N - 1
        WHILE arr[j] <= arr[i] DO j--
        SWAP(arr[i], arr[j])
    REVERSE(arr, i + 1, N - 1)`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3]", action: "i=1 (arr[1]=2<3), j=2 (arr[2]=3>2) -> Swap -> [1,3,2], Reverse suffix -> [1, 3, 2]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nvoid nextPermutationOptimal(std::vector<int>& arr) {\n    int n = arr.size(); int i = n - 2;\n    while (i >= 0 && arr[i] >= arr[i + 1]) i--;\n    if (i >= 0) {\n        int j = n - 1;\n        while (arr[j] <= arr[i]) j--;\n        std::swap(arr[i], arr[j]);\n    }\n    std::reverse(arr.begin() + i + 1, arr.end());\n}`,
        java: `public class Solution {\n    public static void nextPermutationOptimal(int[] arr) {\n        int n = arr.length, i = n - 2;\n        while (i >= 0 && arr[i] >= arr[i + 1]) i--;\n        if (i >= 0) {\n            int j = n - 1;\n            while (arr[j] <= arr[i]) j--;\n            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;\n        }\n        int l = i + 1, r = n - 1;\n        while (l < r) { int temp = arr[l]; arr[l] = arr[r]; arr[r] = temp; l++; r--; }\n    }\n}`,
        python: `def next_permutation_optimal(arr):\n    n = len(arr); i = n - 2\n    while i >= 0 and arr[i] >= arr[i + 1]: i -= 1\n    if i >= 0:\n        j = n - 1\n        while arr[j] <= arr[i]: j -= 1\n        arr[i], arr[j] = arr[j], arr[i]\n    arr[i + 1:] = reversed(arr[i + 1:])`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Single pass linear search + reversal.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "In-place modification."
    }
  },

  // 28. MAXIMUM VALUE OF EXPRESSION
  28: {
    title: "Maximum Value Of Expression",
    topic: "Arrays",
    difficulty: "Medium",
    problemStatement: "Given an array arr of size N, find the maximum value of the expression |arr[i] - arr[j]| + |i - j| for all valid index pairs (i, j).",
    examples: [
      {
        input: "arr = [1, 2, 3, 4]",
        output: "6",
        explanation: "For i = 0 (val 1) and j = 3 (val 4): |1 - 4| + |0 - 3| = 3 + 3 = 6.",
        note: "Absolute values simplify into two linear cases."
      }
    ],
    brute: {
      title: "Brute Force Approach: Nested Pairs Evaluation O(N²)",
      algorithm: {
        english: "1. Evaluate expr = |arr[i] - arr[j]| + |i - j| for all pairs (i, j).\n2. Return maximum value.",
        hinglish: "1. Double nested loops (i, j) se expression calculate karo.\n2. Maximum expr return karo."
      },
      pseudocode: `FUNCTION maxValueExprBrute(arr, N):
    maxExpr = 0
    FOR i FROM 0 TO N-1 DO:
        FOR j FROM 0 TO N-1 DO:
            maxExpr = MAX(maxExpr, ABS(arr[i] - arr[j]) + ABS(i - j))
    RETURN maxExpr`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3, 4]", action: "i=0, j=3: |1-4| + |0-3| = 3 + 3 = 6 -> Return 6!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <cmath>\n#include <algorithm>\nint maxValueExprBrute(const std::vector<int>& arr) {\n    int maxExpr = 0, n = arr.size();\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            maxExpr = std::max(maxExpr, std::abs(arr[i] - arr[j]) + std::abs(i - j));\n        }\n    }\n    return maxExpr;\n}`,
        java: `public class Solution {\n    public static int maxValueExprBrute(int[] arr) {\n        int maxExpr = 0, n = arr.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                maxExpr = Math.max(maxExpr, Math.abs(arr[i] - arr[j]) + Math.abs(i - j));\n            }\n        }\n        return maxExpr;\n    }\n}`,
        python: `def max_value_expr_brute(arr):\n    max_expr = 0; n = len(arr)\n    for i in range(n):\n        for j in range(n):\n            max_expr = max(max_expr, abs(arr[i] - arr[j]) + abs(i - j))\n    return max_expr`
      },
      timeComplexity: "O(N²)",
      timeExplanation: "Evaluates N * N pairs.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Mathematical Expression Decomposition O(N) Time O(1) Space",
      algorithm: {
        english: "1. Break expression into Case 1: (arr[k] + k) MAX - MIN and Case 2: (arr[k] - k) MAX - MIN.\n2. Compute min/max for (arr[k] + k) and (arr[k] - k) in single pass.\n3. Return MAX(diff1, diff2).",
        hinglish: "1. Expression ko 2 cases me break karo: Case 1 (arr[k]+k) ka MAX-MIN aur Case 2 (arr[k]-k) ka MAX-MIN.\n2. Single pass me max aur min track karo.\n3. max(diff1, diff2) return kar do."
      },
      pseudocode: `FUNCTION maxValueExprOptimal(arr, N):
    max1 = -INF, min1 = INF, max2 = -INF, min2 = INF
    FOR i FROM 0 TO N-1 DO:
        v1 = arr[i] + i, v2 = arr[i] - i
        max1 = MAX(max1, v1), min1 = MIN(min1, v1)
        max2 = MAX(max2, v2), min2 = MIN(min2, v2)
    RETURN MAX(max1 - min1, max2 - min2)`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3, 4]", action: "v1=[1,3,5,7] -> max1=7, min1=1 (diff=6). Return 6!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\n#include <climits>\nint maxValueExprOptimal(const std::vector<int>& arr) {\n    int max1 = INT_MIN, min1 = INT_MAX, max2 = INT_MIN, min2 = INT_MAX;\n    for (int i = 0; i < arr.size(); i++) {\n        int v1 = arr[i] + i, v2 = arr[i] - i;\n        max1 = std::max(max1, v1); min1 = std::min(min1, v1);\n        max2 = std::max(max2, v2); min2 = std::min(min2, v2);\n    }\n    return std::max(max1 - min1, max2 - min2);\n}`,
        java: `public class Solution {\n    public static int maxValueExprOptimal(int[] arr) {\n        int max1 = Integer.MIN_VALUE, min1 = Integer.MAX_VALUE;\n        int max2 = Integer.MIN_VALUE, min2 = Integer.MAX_VALUE;\n        for (int i = 0; i < arr.length; i++) {\n            int v1 = arr[i] + i, v2 = arr[i] - i;\n            max1 = Math.max(max1, v1); min1 = Math.min(min1, v1);\n            max2 = Math.max(max2, v2); min2 = Math.min(min2, v2);\n        }\n        return Math.max(max1 - min1, max2 - min2);\n    }\n}`,
        python: `def max_value_expr_optimal(arr):\n    max1, min1 = float('-inf'), float('inf')\n    max2, min2 = float('-inf'), float('inf')\n    for i, x in enumerate(arr):\n        v1, v2 = x + i, x - i\n        max1, min1 = max(max1, v1), min(min1, v1)\n        max2, min2 = max(max2, v2), min(min2, v2)\n    return max(max1 - min1, max2 - min2)`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single linear pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 29. FIRST MISSING POSITIVE
  29: {
    title: "First Missing Positive",
    topic: "Arrays",
    difficulty: "Hard",
    problemStatement: "Given an unsorted integer array arr of size N, return the smallest missing positive integer in O(N) time and O(1) auxiliary space.",
    examples: [
      {
        input: "arr = [3, 4, -1, 1]",
        output: "2",
        explanation: "Positive integers present are 1, 3, 4. Smallest missing positive integer is 2.",
        note: "Ignore negative integers and zeroes."
      }
    ],
    brute: {
      title: "Brute Force Approach: HashSet Search O(N) Space",
      algorithm: {
        english: "1. Insert all positive elements from array into HashSet.\n2. Iterate candidate numbers target from 1 up to N+1.\n3. Return first target not present in HashSet.",
        hinglish: "1. Saare positive elements (>0) ko HashSet me daal do.\n2. target = 1 se loop chalao.\n3. Jo pehla integer HashSet me na mile, wahi return kar do."
      },
      pseudocode: `FUNCTION firstMissingPositiveBrute(arr, N):
    CREATE set S
    FOR x IN arr DO: IF x > 0 THEN S.INSERT(x)
    FOR target FROM 1 TO N+1 DO:
        IF target NOT IN S THEN RETURN target
    RETURN 1`,
      dryRun: [
        { step: "1", state: "arr = [3, 4, -1, 1]", action: "Set = {1, 3, 4}. Check 1 (ok), 2 NOT in set -> Return 2!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <unordered_set>\nint firstMissingPositiveBrute(const std::vector<int>& arr) {\n    std::unordered_set<int> st;\n    for (int x : arr) if (x > 0) st.insert(x);\n    for (int t = 1; t <= arr.size() + 1; t++) if (st.find(t) == st.end()) return t;\n    return 1;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static int firstMissingPositiveBrute(int[] arr) {\n        Set<Integer> set = new HashSet<>();\n        for (int x : arr) if (x > 0) set.add(x);\n        for (int t = 1; t <= arr.length + 1; t++) if (!set.contains(t)) return t;\n        return 1;\n    }\n}`,
        python: `def first_missing_positive_brute(arr):\n    st = set(x for x in arr if x > 0)\n    for t in range(1, len(arr) + 2):\n        if t not in st: return t\n    return 1`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Set insertions and lookups.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Allocates hash set."
    },
    optimal: {
      title: "Optimal Approach: Cyclic Sort (In-Place Index Placement) O(N) Time O(1) Space",
      algorithm: {
        english: "1. While arr[i] is in range [1, N] and arr[i] != arr[arr[i] - 1]: swap(arr[i], arr[arr[i] - 1]).\n2. Second Pass: iterate i from 0 to N-1. If arr[i] != i + 1, return i + 1.\n3. If all match, return N + 1.",
        hinglish: "1. Cyclic Swap: Jab tak arr[i] range [1, N] me ho aur arr[i] != arr[arr[i]-1] ho: swap(arr[i], arr[arr[i]-1]) karo.\n2. Pass 2: check karo pehla index jahan arr[i] != i + 1 ho, (i + 1) return kar do."
      },
      pseudocode: `FUNCTION firstMissingPositiveOptimal(arr, N):
    FOR i FROM 0 TO N-1 DO:
        WHILE arr[i] >= 1 AND arr[i] <= N AND arr[i] != arr[arr[i]-1] DO:
            SWAP(arr[i], arr[arr[i]-1])
    FOR i FROM 0 TO N-1 DO:
        IF arr[i] != i + 1 THEN RETURN i + 1
    RETURN N + 1`,
      dryRun: [
        { step: "1", state: "arr = [3, 4, -1, 1]", action: "Cyclic Sort -> arr = [1, -1, 3, 4] -> arr[1] != 2 -> Return 2!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nint firstMissingPositiveOptimal(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n; i++) {\n        while (arr[i] >= 1 && arr[i] <= n && arr[i] != arr[arr[i] - 1]) {\n            std::swap(arr[i], arr[arr[i] - 1]);\n        }\n    }\n    for (int i = 0; i < n; i++) if (arr[i] != i + 1) return i + 1;\n    return n + 1;\n}`,
        java: `public class Solution {\n    public static int firstMissingPositiveOptimal(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n; i++) {\n            while (arr[i] >= 1 && arr[i] <= n && arr[i] != arr[arr[i] - 1]) {\n                int temp = arr[arr[i] - 1]; arr[arr[i] - 1] = arr[i]; arr[i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) if (arr[i] != i + 1) return i + 1;\n        return n + 1;\n    }\n}`,
        python: `def first_missing_positive_optimal(arr):\n    n = len(arr)\n    for i in range(n):\n        while 1 <= arr[i] <= n and arr[i] != arr[arr[i] - 1]:\n            t = arr[i] - 1\n            arr[i], arr[t] = arr[t], arr[i]\n    for i in range(n):\n        if arr[i] != i + 1: return i + 1\n    return n + 1`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Each element swapped at most once.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "In-place modification."
    }
  }
}
