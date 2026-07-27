// Ultra-Detailed Editorials for Array Problems 7 to 15

export const arrayEditorialsPart2 = {
  // 7. REMOVE DUPLICATES FROM ARRAY
  7: {
    title: "Remove Duplicates from Sorted Array",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given a sorted array arr of size N, remove duplicate elements in-place such that each unique element appears only once. Return the number of unique elements K.",
    examples: [
      {
        input: "arr = [1, 1, 2, 2, 3, 4, 4]",
        output: "K = 4, arr = [1, 2, 3, 4, ...]",
        explanation: "First 4 elements of arr are modified in-place to contain unique elements [1, 2, 3, 4].",
        note: "Perform in-place modification using O(1) extra space."
      }
    ],
    brute: {
      title: "Brute Force Approach: HashSet Unique Filtering O(N log N) / O(N) Space",
      algorithm: {
        english: "1. Insert all array elements into a Set to remove duplicates.\n2. Write unique elements back into original array starting from index 0.\n3. Return set size as unique count.",
        hinglish: "1. Saare elements ko Set me daal kar duplicates hatao.\n2. Set ke unique elements ko original array ke shuru (0, 1, 2...) me copy karo.\n3. Set size return kar do."
      },
      pseudocode: `FUNCTION removeDuplicatesBrute(arr, N):
    CREATE set S
    FOR EACH x IN arr: S.INSERT(x)
    idx = 0
    FOR EACH val IN S:
        arr[idx++] = val
    RETURN S.SIZE()`,
      dryRun: [
        { step: "1", state: "arr = [1, 1, 2, 2, 3]", action: "Set S = {1, 2, 3}" },
        { step: "2", state: "Copy back", action: "arr[0]=1, arr[1]=2, arr[2]=3. K = 3!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <set>\nint removeDuplicatesBrute(std::vector<int>& arr) {\n    std::set<int> st(arr.begin(), arr.end());\n    int idx = 0;\n    for (int x : st) arr[idx++] = x;\n    return st.size();\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static int removeDuplicatesBrute(int[] arr) {\n        Set<Integer> set = new LinkedHashSet<>();\n        for (int x : arr) set.add(x);\n        int idx = 0;\n        for (int x : set) arr[idx++] = x;\n        return set.size();\n    }\n}`,
        python: `def remove_duplicates_brute(arr):\n    s = sorted(set(arr))\n    for i, x in enumerate(s): arr[i] = x\n    return len(s)`
      },
      timeComplexity: "O(N log N)",
      timeExplanation: "Set insertion takes O(N log N) time.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Allocates set memory for N elements."
    },
    optimal: {
      title: "Optimal Approach: Two Pointers In-Place Shifting O(N) Time O(1) Space",
      algorithm: {
        english: "1. Maintain two pointers: i = 0 (last unique position) and j = 1 to N-1 (scanner).\n2. When arr[j] != arr[i], increment i (i++) and set arr[i] = arr[j].\n3. Return i + 1 as unique count K.",
        hinglish: "1. Two Pointers rakho: i = 0 (last unique position) aur j = 1 se N-1 (scanner).\n2. Jab bhi arr[j] != arr[i] mile: i++ karo aur arr[i] = arr[j] copy kar do.\n3. (i + 1) return kar do."
      },
      pseudocode: `FUNCTION removeDuplicatesOptimal(arr, N):
    IF N == 0 THEN RETURN 0
    i = 0
    FOR j FROM 1 TO N-1 DO:
        IF arr[j] != arr[i] THEN:
            i++
            arr[i] = arr[j]
    RETURN i + 1`,
      dryRun: [
        { step: "1", state: "arr = [1, 1, 2, 2, 3], i=0", action: "j=2 (2 != 1) -> i=1, arr[1]=2" },
        { step: "2", state: "j=4 (3 != 2)", action: "i=2, arr[2]=3. Result: K = 3, arr=[1, 2, 3]" }
      ],
      code: {
        cpp: `#include <vector>\nint removeDuplicatesOptimal(std::vector<int>& arr) {\n    if (arr.empty()) return 0;\n    int i = 0;\n    for (size_t j = 1; j < arr.size(); j++) {\n        if (arr[j] != arr[i]) {\n            i++;\n            arr[i] = arr[j];\n        }\n    }\n    return i + 1;\n}`,
        java: `public class Solution {\n    public static int removeDuplicatesOptimal(int[] arr) {\n        if (arr.length == 0) return 0;\n        int i = 0;\n        for (int j = 1; j < arr.length; j++) {\n            if (arr[j] != arr[i]) {\n                i++;\n                arr[i] = arr[j];\n            }\n        }\n        return i + 1;\n    }\n}`,
        python: `def remove_duplicates_optimal(arr):\n    if not arr: return 0\n    i = 0\n    for j in range(1, len(arr)):\n        if arr[j] != arr[i]:\n            i += 1\n            arr[i] = arr[j]\n    return i + 1`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Single traversal with two pointers.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "In-place modification."
    }
  },

  // 8. SECOND LARGEST IN ARRAY
  8: {
    title: "Second Largest in Array",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N, find and return the second largest distinct element in the array. If no second largest element exists, return -1.",
    examples: [
      {
        input: "arr = [12, 35, 1, 10, 34, 1]",
        output: "34",
        explanation: "Largest element is 35. Second largest distinct element is 34.",
        note: "Handle duplicates by making sure second largest != largest."
      }
    ],
    brute: {
      title: "Brute Force Approach: Sort Array and Backwards Search O(N log N)",
      algorithm: {
        english: "1. Sort array in ascending order.\n2. largest = arr[N-1].\n3. Scan backwards from N-2 to 0 for first element arr[i] != largest.",
        hinglish: "1. Array ko sort kar do O(N log N).\n2. largest = arr[N-1] rakho.\n3. Piche se (N-2 se 0) scan karo aur pehla element jo largest ke barabar na ho, wahi return karo."
      },
      pseudocode: `FUNCTION secondLargestBrute(arr, N):
    SORT(arr)
    largest = arr[N-1]
    FOR i FROM N-2 DOWNTO 0 DO:
        IF arr[i] != largest THEN RETURN arr[i]
    RETURN -1`,
      dryRun: [
        { step: "1", state: "arr = [12, 35, 1, 10, 34, 1]", action: "Sort -> [1, 1, 10, 12, 34, 35]" },
        { step: "2", state: "largest = 35", action: "Scan backwards: 34 != 35 -> Return 34!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nint secondLargestBrute(std::vector<int> arr) {\n    int n = arr.size();\n    if (n < 2) return -1;\n    std::sort(arr.begin(), arr.end());\n    int largest = arr[n - 1];\n    for (int i = n - 2; i >= 0; i--) {\n        if (arr[i] != largest) return arr[i];\n    }\n    return -1;\n}`,
        java: `import java.util.Arrays;\npublic class Solution {\n    public static int secondLargestBrute(int[] arr) {\n        int n = arr.length;\n        if (n < 2) return -1;\n        Arrays.sort(arr);\n        int largest = arr[n - 1];\n        for (int i = n - 2; i >= 0; i--) {\n            if (arr[i] != largest) return arr[i];\n        }\n        return -1;\n    }\n}`,
        python: `def second_largest_brute(arr):\n    if len(arr) < 2: return -1\n    s = sorted(arr)\n    largest = s[-1]\n    for i in range(len(s) - 2, -1, -1):\n        if s[i] != largest: return s[i]\n    return -1`
      },
      timeComplexity: "O(N log N)",
      timeExplanation: "Sorting takes O(N log N) time.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "In-place sort space."
    },
    optimal: {
      title: "Optimal Approach: Single Pass Dual Variable Tracking O(N)",
      algorithm: {
        english: "1. Maintain largest = -1 and secondLargest = -1.\n2. Iterate through array elements num:\n   - If num > largest: secondLargest = largest, largest = num.\n   - Else if num > secondLargest AND num != largest: secondLargest = num.\n3. Return secondLargest.",
        hinglish: "1. Do variables rakho: largest = -1 aur secondLargest = -1.\n2. Loop chalao:\n   - Agar num > largest ho: secondLargest = largest karo, largest = num karo.\n   - Agar num > secondLargest aur num != largest ho: secondLargest = num karo."
      },
      pseudocode: `FUNCTION secondLargestOptimal(arr, N):
    largest = -1, secondLargest = -1
    FOR EACH num IN arr DO:
        IF num > largest THEN:
            secondLargest = largest
            largest = num
        ELSE IF num > secondLargest AND num != largest THEN:
            secondLargest = num
    RETURN secondLargest`,
      dryRun: [
        { step: "1", state: "arr = [12, 35, 1, 10, 34, 1]", action: "largest=-1, sec=-1" },
        { step: "2", state: "num=12 -> l=12, s=-1", action: "num=35 -> l=35, s=12" },
        { step: "3", state: "num=34 -> s=34", action: "Result: secondLargest = 34!" }
      ],
      code: {
        cpp: `#include <vector>\nint secondLargestOptimal(const std::vector<int>& arr) {\n    int largest = -1, secondLargest = -1;\n    for (int num : arr) {\n        if (num > largest) {\n            secondLargest = largest;\n            largest = num;\n        } else if (num > secondLargest && num != largest) {\n            secondLargest = num;\n        }\n    }\n    return secondLargest;\n}`,
        java: `public class Solution {\n    public static int secondLargestOptimal(int[] arr) {\n        int largest = -1, secondLargest = -1;\n        for (int num : arr) {\n            if (num > largest) {\n                secondLargest = largest;\n                largest = num;\n            } else if (num > secondLargest && num != largest) {\n                secondLargest = num;\n            }\n        }\n        return secondLargest;\n    }\n}`,
        python: `def second_largest_optimal(arr):\n    largest, second_largest = -1, -1\n    for num in arr:\n        if num > largest:\n            second_largest = largest\n            largest = num\n        elif num > second_largest and num != largest:\n            second_largest = num\n    return second_largest`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single traversal over elements.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 9. REVERSE AN ARRAY
  9: {
    title: "Reverse an Array",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N, reverse the elements of the array in-place.",
    examples: [
      {
        input: "arr = [1, 2, 3, 4, 5]",
        output: "[5, 4, 3, 2, 1]",
        explanation: "Elements are reversed in-place so arr[0] becomes 5 and arr[4] becomes 1.",
        note: "Reverse array in-place with O(1) auxiliary space."
      }
    ],
    brute: {
      title: "Brute Force Approach: Temporary Auxiliary Array O(N) Space",
      algorithm: {
        english: "1. Create temporary vector temp of size N.\n2. Copy original array backwards into temp.\n3. Copy temp back into original array.",
        hinglish: "1. Ek temporary array temp banao size N ka.\n2. Original array ko piche se scan karke temp me copy karo.\n3. Temp array ko waapas original array me copy kar do."
      },
      pseudocode: `FUNCTION reverseBrute(arr, N):
    CREATE temp array of size N
    FOR i FROM 0 TO N-1 DO:
        temp[i] = arr[N - 1 - i]
    arr = temp`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3, 4, 5]", action: "temp = [5, 4, 3, 2, 1] -> arr = [5, 4, 3, 2, 1]" }
      ],
      code: {
        cpp: `#include <vector>\nvoid reverseArrayBrute(std::vector<int>& arr) {\n    int n = arr.size();\n    std::vector<int> temp(n);\n    for (int i = 0; i < n; i++) temp[i] = arr[n - 1 - i];\n    arr = temp;\n}`,
        java: `public class Solution {\n    public static void reverseArrayBrute(int[] arr) {\n        int n = arr.length;\n        int[] temp = new int[n];\n        for (int i = 0; i < n; i++) temp[i] = arr[n - 1 - i];\n        System.arraycopy(temp, 0, arr, 0, n);\n    }\n}`,
        python: `def reverse_array_brute(arr):\n    temp = [arr[len(arr) - 1 - i] for i in range(len(arr))]\n    for i in range(len(arr)): arr[i] = temp[i]`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Two passes over elements.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Allocates temp array."
    },
    optimal: {
      title: "Optimal Approach: Two Pointers In-Place Swapping O(N) Time O(1) Space",
      algorithm: {
        english: "1. Set left = 0 and right = N - 1.\n2. While left < right: swap arr[left] with arr[right], left++, right--.\n3. Reverses array in-place.",
        hinglish: "1. left = 0 aur right = N - 1 rakho.\n2. Jab tak left < right ho: swap(arr[left], arr[right]), left++ aur right--.\n3. In-place reverse ho jata hai."
      },
      pseudocode: `FUNCTION reverseOptimal(arr, N):
    left = 0, right = N - 1
    WHILE left < right DO:
        SWAP(arr[left], arr[right])
        left++, right--`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3, 4, 5], left=0, right=4", action: "Swap 1 & 5 -> [5, 2, 3, 4, 1]" },
        { step: "2", state: "left=1, right=3", action: "Swap 2 & 4 -> [5, 4, 3, 2, 1]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nvoid reverseArrayOptimal(std::vector<int>& arr) {\n    int left = 0, right = arr.size() - 1;\n    while (left < right) {\n        std::swap(arr[left], arr[right]);\n        left++; right--;\n    }\n}`,
        java: `public class Solution {\n    public static void reverseArrayOptimal(int[] arr) {\n        int left = 0, right = arr.length - 1;\n        while (left < right) {\n            int temp = arr[left]; arr[left] = arr[right]; arr[right] = temp;\n            left++; right--;\n        }\n    }\n}`,
        python: `def reverse_array_optimal(arr):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        arr[left], arr[right] = arr[right], arr[left]\n        left += 1; right -= 1`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "N/2 swaps executed.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "In-place memory modification."
    }
  },

  // 10. MISSING NUMBER
  10: {
    title: "Missing Number in Array",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of N-1 distinct integers in the range [1, N], find the single missing number from the sequence.",
    examples: [
      {
        input: "arr = [1, 2, 4, 5, 6], N = 6",
        output: "3",
        explanation: "Numbers range from 1 to 6. Number 3 is missing from the array.",
        note: "Range is [1, N]."
      }
    ],
    brute: {
      title: "Brute Force Approach: Linear Search Every Number O(N²)",
      algorithm: {
        english: "1. For every target from 1 to N, perform linear search in arr.\n2. If target is not found in arr, return target.",
        hinglish: "1. 1 se N tak ke har ek number target ke liye array me search karo.\n2. Jo number array me na mile, wahi return kar do."
      },
      pseudocode: `FUNCTION missingNumberBrute(arr, N):
    FOR num FROM 1 TO N DO:
        IF num NOT IN arr THEN RETURN num
    RETURN -1`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 4, 5], N = 5", action: "1 found, 2 found, 3 NOT found! Return 3." }
      ],
      code: {
        cpp: `#include <vector>\nint missingNumberBrute(const std::vector<int>& arr, int N) {\n    for (int num = 1; num <= N; num++) {\n        bool found = false;\n        for (int x : arr) if (x == num) { found = true; break; }\n        if (!found) return num;\n    }\n    return -1;\n}`,
        java: `public class Solution {\n    public static int missingNumberBrute(int[] arr, int N) {\n        for (int num = 1; num <= N; num++) {\n            boolean found = false;\n            for (int x : arr) if (x == num) { found = true; break; }\n            if (!found) return num;\n        }\n        return -1;\n    }\n}`,
        python: `def missing_number_brute(arr, N):\n    for num in range(1, N + 1):\n        if num not in arr: return num\n    return -1`
      },
      timeComplexity: "O(N²)",
      timeExplanation: "Nested loops check N * N comparisons.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Sum Formula N*(N+1)/2 O(N) Time O(1) Space",
      algorithm: {
        english: "1. Compute expectedSum = N * (N + 1) / 2.\n2. Sum elements present in array: actualSum.\n3. Return expectedSum - actualSum.",
        hinglish: "1. Math Formula: expectedSum = N * (N + 1) / 2 nikalo.\n2. Array ke elements ka actualSum nikalo.\n3. Return expectedSum - actualSum."
      },
      pseudocode: `FUNCTION missingNumberOptimal(arr, N):
    expectedSum = N * (N + 1) / 2
    actualSum = SUM(arr)
    RETURN expectedSum - actualSum`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 4, 5], N = 5", action: "expectedSum = 5*6/2 = 15. actualSum = 12. 15 - 12 = 3!" }
      ],
      code: {
        cpp: `#include <vector>\nint missingNumberOptimal(const std::vector<int>& arr, int N) {\n    long long expectedSum = (long long)N * (N + 1) / 2;\n    long long actualSum = 0;\n    for (int x : arr) actualSum += x;\n    return expectedSum - actualSum;\n}`,
        java: `public class Solution {\n    public static int missingNumberOptimal(int[] arr, int N) {\n        long expectedSum = (long)N * (N + 1) / 2;\n        long actualSum = 0;\n        for (int x : arr) actualSum += x;\n        return (int)(expectedSum - actualSum);\n    }\n}`,
        python: `def missing_number_optimal(arr, N):\n    return (N * (N + 1) // 2) - sum(arr)`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single linear pass to compute actualSum.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  }
}
