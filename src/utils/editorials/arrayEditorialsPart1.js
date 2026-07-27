// Ultra-Detailed Editorials for Array Problems 1 to 15

export const arrayEditorialsPart1 = {
  // 1. FIND ELEMENT AT A GIVEN INDEX
  1: {
    title: "Find Element at a Given Index",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array of integers arr of size N and a zero-based target index K, return the element located at index K. If K is out of bounds (K < 0 or K >= N), return -1.",
    examples: [
      {
        input: "arr = [10, 20, 30, 40, 50], K = 2",
        output: "30",
        explanation: "Zero-based indexing: arr[0]=10, arr[1]=20, arr[2]=30. The element at index 2 is 30.",
        note: "Valid index range is 0 <= K < N."
      }
    ],
    brute: {
      title: "Brute Force Approach: Sequential Loop Scanning O(N)",
      algorithm: {
        english: "1. Validate index K bounds (0 <= K < N).\n2. Iterate loop counter i from 0 to N-1.\n3. When counter i equals K, return arr[i].",
        hinglish: "1. Pehle index K ki validity check karo (K >= 0 aur K < N).\n2. Loop counter i = 0 se N-1 tak chalao.\n3. Jaise hi i == K ho, arr[i] return kar do."
      },
      pseudocode: `FUNCTION findElementBrute(arr, N, K):
    IF K < 0 OR K >= N THEN RETURN -1
    FOR i FROM 0 TO N-1 DO:
        IF i == K THEN RETURN arr[i]
    RETURN -1`,
      dryRun: [
        { step: "1", state: "arr = [10, 20, 30, 40, 50], K = 2", action: "Check 0 <= K < 5 -> Valid" },
        { step: "2", state: "i = 0 (10), i = 1 (20)", action: "Scanning..." },
        { step: "3", state: "i = 2 (30)", action: "2 == K (2) -> Return 30!" }
      ],
      code: {
        cpp: `#include <vector>\nint findElementAtIndexBrute(const std::vector<int>& arr, int K) {\n    if (K < 0 || K >= arr.size()) return -1;\n    for (int i = 0; i < arr.size(); i++) {\n        if (i == K) return arr[i];\n    }\n    return -1;\n}`,
        java: `public class Solution {\n    public static int findElementAtIndexBrute(int[] arr, int K) {\n        if (K < 0 || K >= arr.length) return -1;\n        for (int i = 0; i < arr.length; i++) {\n            if (i == K) return arr[i];\n        }\n        return -1;\n    }\n}`,
        python: `def find_element_at_index_brute(arr, K):\n    if K < 0 or K >= len(arr): return -1\n    for i in range(len(arr)):\n        if i == K: return arr[i]\n    return -1`
      },
      timeComplexity: "O(K) Linear Time",
      timeExplanation: "Iterates K+1 elements in worst case.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space used."
    },
    optimal: {
      title: "Optimal Approach: Direct O(1) Memory Lookup",
      algorithm: {
        english: "1. Arrays are stored in contiguous memory.\n2. Compute memory location offset directly.\n3. Return arr[K] instantly in constant O(1) time.",
        hinglish: "1. Array elements RAM me contiguous store hote hain.\n2. Computer direct memory address calculation karta hai.\n3. Seedhe arr[K] lookup karke O(1) time me answer do."
      },
      pseudocode: `FUNCTION findElementOptimal(arr, N, K):
    IF K >= 0 AND K < N THEN RETURN arr[K]
    RETURN -1`,
      dryRun: [
        { step: "1", state: "arr = [10, 20, 30, 40, 50], K = 2", action: "Direct lookup arr[2] -> 30!" }
      ],
      code: {
        cpp: `#include <vector>\nint findElementAtIndexOptimal(const std::vector<int>& arr, int K) {\n    if (K < 0 || K >= arr.size()) return -1;\n    return arr[K];\n}`,
        java: `public class Solution {\n    public static int findElementAtIndexOptimal(int[] arr, int K) {\n        if (K < 0 || K >= arr.length) return -1;\n        return arr[K];\n    }\n}`,
        python: `def find_element_at_index_optimal(arr, K):\n    if 0 <= K < len(arr): return arr[K]\n    return -1`
      },
      timeComplexity: "O(1) Constant Time",
      timeExplanation: "Direct pointer indexing in 1 CPU cycle.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 2. MIN AND MAX IN ARRAY
  2: {
    title: "Min and Max in Array",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N, find and return both the minimum and maximum element present in the array.",
    examples: [
      {
        input: "arr = [5, 2, 9, 1, 7]",
        output: "Minimum = 1, Maximum = 9",
        explanation: "Scanning elements reveals smallest value 1 and largest value 9.",
        note: "Single linear pass handles both min and max."
      }
    ],
    brute: {
      title: "Brute Force Approach: Sort Array O(N log N)",
      algorithm: {
        english: "1. Sort the array in ascending order.\n2. Minimum element is at arr[0].\n3. Maximum element is at arr[N-1].",
        hinglish: "1. Array ko sort kar do O(N log N).\n2. Sabse chhota element index 0 (arr[0]) par hoga.\n3. Sabse bada element aakhri index (arr[N-1]) par hoga."
      },
      pseudocode: `FUNCTION getMinMaxBrute(arr, N):
    SORT(arr)
    RETURN pair(arr[0], arr[N-1])`,
      dryRun: [
        { step: "1", state: "arr = [5, 2, 9, 1, 7]", action: "Sort -> [1, 2, 5, 7, 9]" },
        { step: "2", state: "Min = arr[0] = 1, Max = arr[4] = 9", action: "Return (1, 9)!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nstd::pair<int,int> getMinMaxBrute(std::vector<int> arr) {\n    std::sort(arr.begin(), arr.end());\n    return {arr[0], arr.back()};\n}`,
        java: `import java.util.Arrays;\npublic class Solution {\n    public static int[] getMinMaxBrute(int[] arr) {\n        int[] clone = arr.clone();\n        Arrays.sort(clone);\n        return new int[]{clone[0], clone[clone.length - 1]};\n    }\n}`,
        python: `def get_min_max_brute(arr):\n    s = sorted(arr)\n    return (s[0], s[-1])`
      },
      timeComplexity: "O(N log N)",
      timeExplanation: "Sorting takes O(N log N) comparison time.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Copy of array allocated for sorting."
    },
    optimal: {
      title: "Optimal Approach: Single Pass Comparison Tracking O(N)",
      algorithm: {
        english: "1. Initialize minVal = arr[0] and maxVal = arr[0].\n2. Iterate through elements from i = 1 to N-1.\n3. Update minVal = MIN(minVal, arr[i]) and maxVal = MAX(maxVal, arr[i]).",
        hinglish: "1. minVal = arr[0] aur maxVal = arr[0] set karo.\n2. Loop i = 1 se N-1 tak chalao.\n3. Agar arr[i] < minVal ho toh minVal update karo, agar arr[i] > maxVal ho toh maxVal update karo."
      },
      pseudocode: `FUNCTION getMinMaxOptimal(arr, N):
    minVal = arr[0], maxVal = arr[0]
    FOR i FROM 1 TO N-1 DO:
        IF arr[i] < minVal THEN minVal = arr[i]
        IF arr[i] > maxVal THEN maxVal = arr[i]
    RETURN pair(minVal, maxVal)`,
      dryRun: [
        { step: "1", state: "arr = [5, 2, 9, 1, 7]", action: "Init: min=5, max=5" },
        { step: "2", state: "i=1 (2): min=2", action: "i=2 (9): max=9" },
        { step: "3", state: "i=3 (1): min=1", action: "i=4 (7): no change. Result: (1, 9)!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nstd::pair<int,int> getMinMaxOptimal(const std::vector<int>& arr) {\n    int minV = arr[0], maxV = arr[0];\n    for (size_t i = 1; i < arr.size(); i++) {\n        if (arr[i] < minV) minV = arr[i];\n        if (arr[i] > maxV) maxV = arr[i];\n    }\n    return {minV, maxV};\n}`,
        java: `public class Solution {\n    public static int[] getMinMaxOptimal(int[] arr) {\n        int minV = arr[0], maxV = arr[0];\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] < minV) minV = arr[i];\n            if (arr[i] > maxV) maxV = arr[i];\n        }\n        return new int[]{minV, maxV};\n    }\n}`,
        python: `def get_min_max_optimal(arr):\n    min_v, max_v = arr[0], arr[0]\n    for x in arr[1:]:\n        if x < min_v: min_v = x\n        if x > max_v: max_v = x\n    return (min_v, max_v)`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Single traversal over N elements.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 3. SUM OF ARRAY
  3: {
    title: "Sum of Array",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N, calculate and return the total accumulated sum of all its elements.",
    examples: [
      {
        input: "arr = [1, 2, 3, 4, 5]",
        output: "15",
        explanation: "1 + 2 + 3 + 4 + 5 = 15.",
        note: "Use accumulator to avoid integer overflow if numbers are large."
      }
    ],
    brute: {
      title: "Brute Force Approach: Recursive Summation O(N) Call Stack",
      algorithm: {
        english: "1. Base Case: if index == N, return 0.\n2. Recursively return arr[index] + recursiveSum(index + 1).",
        hinglish: "1. Base Case: agar index == N ho jaye toh 0 return karo.\n2. Recursion se arr[index] + recursiveSum(index + 1) calculate karo."
      },
      pseudocode: `FUNCTION sumRecursive(arr, idx, N):
    IF idx == N THEN RETURN 0
    RETURN arr[idx] + sumRecursive(arr, idx + 1, N)`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3]", action: "1 + sum([2, 3]) -> 1 + 2 + 3 = 6!" }
      ],
      code: {
        cpp: `#include <vector>\nlong long sumRecursive(const std::vector<int>& arr, int idx) {\n    if (idx == arr.size()) return 0;\n    return arr[idx] + sumRecursive(arr, idx + 1);\n}`,
        java: `public class Solution {\n    public static long sumRecursive(int[] arr, int idx) {\n        if (idx == arr.length) return 0;\n        return arr[idx] + sumRecursive(arr, idx + 1);\n    }\n}`,
        python: `def sum_recursive(arr, idx=0):\n    if idx == len(arr): return 0\n    return arr[idx] + sum_recursive(arr, idx + 1)`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "N recursive function calls.",
      spaceComplexity: "O(N) Call Stack Memory",
      spaceExplanation: "Recursion depth of N frames."
    },
    optimal: {
      title: "Optimal Approach: Iterative Accumulator Loop O(N) Time O(1) Space",
      algorithm: {
        english: "1. Initialize totalSum = 0.\n2. Loop through every element x in arr and add x to totalSum.\n3. Return totalSum.",
        hinglish: "1. totalSum = 0 set karo.\n2. Loop se har element x ko totalSum me add karte raho.\n3. totalSum return kar do."
      },
      pseudocode: `FUNCTION sumOptimal(arr, N):
    totalSum = 0
    FOR EACH x IN arr DO:
        totalSum += x
    RETURN totalSum`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3, 4, 5], totalSum = 0", action: "Add 1 -> 1, Add 2 -> 3, Add 3 -> 6, Add 4 -> 10, Add 5 -> 15" }
      ],
      code: {
        cpp: `#include <vector>\nlong long sumOptimal(const std::vector<int>& arr) {\n    long long totalSum = 0;\n    for (int x : arr) totalSum += x;\n    return totalSum;\n}`,
        java: `public class Solution {\n    public static long sumOptimal(int[] arr) {\n        long totalSum = 0;\n        for (int x : arr) totalSum += x;\n        return totalSum;\n    }\n}`,
        python: `def sum_optimal(arr):\n    return sum(arr)`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Single linear pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra memory space."
    }
  },

  // 4. SUM OF DIGITS
  4: {
    title: "Sum of Digits",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an integer N, calculate and return the sum of all its individual digits.",
    examples: [
      {
        input: "N = 1234",
        output: "10",
        explanation: "1 + 2 + 3 + 4 = 10.",
        note: "Handle negative integers by taking absolute value."
      }
    ],
    brute: {
      title: "Brute Force Approach: String Conversion & Character Parsing O(D)",
      algorithm: {
        english: "1. Convert integer N to string representation.\n2. Iterate over each character, parse digit and add to digitSum.",
        hinglish: "1. Number N ko String me convert karo.\n2. Har character ko integer digit me convert karke total me add karo."
      },
      pseudocode: `FUNCTION sumDigitsBrute(N):
    strN = TO_STRING(ABS(N))
    digitSum = 0
    FOR EACH char c IN strN DO:
        digitSum += PARSE_INT(c)
    RETURN digitSum`,
      dryRun: [
        { step: "1", state: "N = 1234 -> str = '1234'", action: "1 + 2 + 3 + 4 = 10!" }
      ],
      code: {
        cpp: `#include <string>\n#include <cmath>\nint sumDigitsBrute(int N) {\n    std::string s = std::to_string(std::abs(N));\n    int sum = 0;\n    for (char c : s) sum += (c - '0');\n    return sum;\n}`,
        java: `public class Solution {\n    public static int sumDigitsBrute(int N) {\n        String s = String.valueOf(Math.abs(N));\n        int sum = 0;\n        for (char c : s.toCharArray()) sum += (c - '0');\n        return sum;\n    }\n}`,
        python: `def sum_digits_brute(N):\n    return sum(int(c) for c in str(abs(N)))`
      },
      timeComplexity: "O(D) Time",
      timeExplanation: "D is total number of digits.",
      spaceComplexity: "O(D) Auxiliary Space",
      spaceExplanation: "String allocation memory."
    },
    optimal: {
      title: "Optimal Approach: Mathematical Modulo % 10 Extraction O(D) Time O(1) Space",
      algorithm: {
        english: "1. Initialize sum = 0, temp = abs(N).\n2. While temp > 0: add last digit (temp % 10) to sum, divide temp by 10 (temp /= 10).\n3. Return sum.",
        hinglish: "1. sum = 0 aur temp = abs(N) set karo.\n2. Jab tak temp > 0 ho: last digit (temp % 10) ko sum me add karo aur temp /= 10 kar do.\n3. sum return kar do."
      },
      pseudocode: `FUNCTION sumDigitsOptimal(N):
    temp = ABS(N), sum = 0
    WHILE temp > 0 DO:
        sum += temp % 10
        temp /= 10
    RETURN sum`,
      dryRun: [
        { step: "1", state: "N = 1234", action: "4 extracted (N=123) -> 3 extracted (N=12) -> 2 extracted (N=1) -> 1 extracted (N=0). Sum = 10!" }
      ],
      code: {
        cpp: `#include <cmath>\nint sumDigitsOptimal(int N) {\n    int temp = std::abs(N), sum = 0;\n    while (temp > 0) {\n        sum += temp % 10;\n        temp /= 10;\n    }\n    return sum;\n}`,
        java: `public class Solution {\n    public static int sumDigitsOptimal(int N) {\n        int temp = Math.abs(N), sum = 0;\n        while (temp > 0) {\n            sum += temp % 10;\n            temp /= 10;\n        }\n        return sum;\n    }\n}`,
        python: `def sum_digits_optimal(N):\n    temp, sum_v = abs(N), 0\n    while temp > 0:\n        sum_v += temp % 10\n        temp //= 10\n    return sum_v`
      },
      timeComplexity: "O(D) Time",
      timeExplanation: "Runs D times for D digits.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero string allocation."
    }
  },

  // 5. CHECK IF ARRAY IS SORTED
  5: {
    title: "Check If Array is Sorted",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N, determine whether the array is sorted in non-decreasing order. Return true if sorted, else false.",
    examples: [
      {
        input: "arr = [1, 2, 3, 4, 5]",
        output: "true",
        explanation: "Every element arr[i] >= arr[i-1] for all indices.",
        note: "Return false immediately on encountering first violation arr[i] < arr[i-1]."
      }
    ],
    brute: {
      title: "Brute Force Approach: Double Loop All Pairs Order Verification O(N²)",
      algorithm: {
        english: "1. For every index i from 0 to N-1, compare with every index j from i+1 to N-1.\n2. If arr[i] > arr[j], return false.\n3. Return true if no pair violates order.",
        hinglish: "1. Nested loops (i aur j) se saare pairs check karo.\n2. Agar kisi pehle element arr[i] ko baad waale element arr[j] se bada paya, toh false return kar do."
      },
      pseudocode: `FUNCTION isSortedBrute(arr, N):
    FOR i FROM 0 TO N-1 DO:
        FOR j FROM i+1 TO N-1 DO:
            IF arr[i] > arr[j] THEN RETURN FALSE
    RETURN TRUE`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 5, 4, 6]", action: "i=2 (val 5), j=3 (val 4) -> 5 > 4 violation! Return false!" }
      ],
      code: {
        cpp: `#include <vector>\nbool isSortedBrute(const std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            if (arr[i] > arr[j]) return false;\n        }\n    }\n    return true;\n}`,
        java: `public class Solution {\n    public static boolean isSortedBrute(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (arr[i] > arr[j]) return false;\n            }\n        }\n        return true;\n    }\n}`,
        python: `def is_sorted_brute(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(i + 1, n):\n            if arr[i] > arr[j]: return False\n    return True`
      },
      timeComplexity: "O(N²)",
      timeExplanation: "Evaluates N * (N-1) / 2 pairs.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Single Pass Adjacent Elements Check O(N)",
      algorithm: {
        english: "1. Iterate loop counter i from 1 to N-1.\n2. If arr[i] < arr[i-1], return false.\n3. If loop finishes, return true.",
        hinglish: "1. Loop counter i = 1 se N-1 tak chalao.\n2. Agar arr[i] < arr[i-1] mile, turant false return karo.\n3. Poora loop paas hone par true return karo."
      },
      pseudocode: `FUNCTION isSortedOptimal(arr, N):
    FOR i FROM 1 TO N-1 DO:
        IF arr[i] < arr[i-1] THEN RETURN FALSE
    RETURN TRUE`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3, 4, 5]", action: "All adjacent pairs arr[i] >= arr[i-1] valid -> Return true!" }
      ],
      code: {
        cpp: `#include <vector>\nbool isSortedOptimal(const std::vector<int>& arr) {\n    for (size_t i = 1; i < arr.size(); i++) {\n        if (arr[i] < arr[i - 1]) return false;\n    }\n    return true;\n}`,
        java: `public class Solution {\n    public static boolean isSortedOptimal(int[] arr) {\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] < arr[i - 1]) return false;\n        }\n        return true;\n    }\n}`,
        python: `def is_sorted_optimal(arr):\n    for i in range(1, len(arr)):\n        if arr[i] < arr[i - 1]: return False\n    return True`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single linear traversal.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },
  // 6. ALTERNATES IN ARRAY
  6: {
    title: "Alternates In Array",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N, return all elements present at even indices (index 0, 2, 4, 6...).",
    examples: [
      {
        input: "arr = [10, 20, 30, 40, 50]",
        output: "[10, 30, 50]",
        explanation: "Elements at even indices 0, 2, 4 are 10, 30, and 50.",
        note: "Only collect elements where index % 2 == 0."
      }
    ],
    brute: {
      title: "Brute Force Approach: Full Scan with Modulo Check O(N)",
      algorithm: {
        english: "1. Iterate index i from 0 to N-1.\n2. If i % 2 == 0, add arr[i] to result.\n3. Return result.",
        hinglish: "1. Loop i = 0 se N-1 tak chalao.\n2. Agar i % 2 == 0 ho, arr[i] ko result me daal do.\n3. Result return kar do."
      },
      pseudocode: `FUNCTION getAlternatesBrute(arr, N):
    CREATE list res
    FOR i FROM 0 TO N-1 DO:
        IF i % 2 == 0 THEN res.APPEND(arr[i])
    RETURN res`,
      dryRun: [
        { step: "1", state: "arr = [10, 20, 30, 40, 50]", action: "i=0 (10), i=2 (30), i=4 (50) -> Return [10, 30, 50]!" }
      ],
      code: {
        cpp: `#include <vector>\nstd::vector<int> getAlternatesBrute(const std::vector<int>& arr) {\n    std::vector<int> res;\n    for (size_t i = 0; i < arr.size(); i++) if (i % 2 == 0) res.push_back(arr[i]);\n    return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static List<Integer> getAlternatesBrute(int[] arr) {\n        List<Integer> res = new ArrayList<>();\n        for (int i = 0; i < arr.length; i++) if (i % 2 == 0) res.add(arr[i]);\n        return res;\n    }\n}`,
        python: `def get_alternates_brute(arr):\n    return [arr[i] for i in range(len(arr)) if i % 2 == 0]`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Scans all N elements.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Allocates output list."
    },
    optimal: {
      title: "Optimal Approach: Step-2 Index Striding O(N/2)",
      algorithm: {
        english: "1. Iterate index i from 0 to N-1 stepping by 2 (i += 2).\n2. Add arr[i] directly to result.\n3. Reduces iterations by half to N/2 steps.",
        hinglish: "1. Loop counter i = 0 se start karke 2 se badhao (i += 2).\n2. Seedhe arr[i] ko result me add karo.\n3. Aadhi (N/2) steps me complete karo!"
      },
      pseudocode: `FUNCTION getAlternatesOptimal(arr, N):
    CREATE list res
    FOR i FROM 0 TO N-1 STEP 2 DO:
        res.APPEND(arr[i])
    RETURN res`,
      dryRun: [
        { step: "1", state: "arr = [10, 20, 30, 40, 50]", action: "i=0 (10), i=2 (30), i=4 (50) -> Return [10, 30, 50]!" }
      ],
      code: {
        cpp: `#include <vector>\nstd::vector<int> getAlternatesOptimal(const std::vector<int>& arr) {\n    std::vector<int> res;\n    for (size_t i = 0; i < arr.size(); i += 2) res.push_back(arr[i]);\n    return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static List<Integer> getAlternatesOptimal(int[] arr) {\n        List<Integer> res = new ArrayList<>();\n        for (int i = 0; i < arr.length; i += 2) res.add(arr[i]);\n        return res;\n    }\n}`,
        python: `def get_alternates_optimal(arr):\n    return arr[::2]`
      },
      timeComplexity: "O(N/2) = O(N) Time",
      timeExplanation: "Runs exactly N/2 iterations.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  }
}

