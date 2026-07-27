// Ultra-Detailed Editorials for Array Problems 11 to 20

export const arrayEditorialsPart3 = {
  // 11. SEGREGATE 0S AND 1S
  11: {
    title: "Segregate 0s and 1s",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N containing only 0s and 1s, segregate all 0s to the left side and all 1s to the right side in-place.",
    examples: [
      {
        input: "arr = [0, 1, 0, 1, 0, 0, 1]",
        output: "[0, 0, 0, 0, 1, 1, 1]",
        explanation: "All 0s are placed on the left, followed by all 1s.",
        note: "Perform in O(N) time and O(1) space."
      }
    ],
    brute: {
      title: "Brute Force Approach: Count Zeroes & Overwrite Array O(N) Two Passes",
      algorithm: {
        english: "1. Count total zeroes (zeroCount) in array.\n2. Overwrite first zeroCount elements with 0.\n3. Overwrite remaining elements with 1.",
        hinglish: "1. Pehle pass me total 0s ki count (zeroCount) nikal lo.\n2. Dusre pass me shuru ke zeroCount elements me 0 bhar do aur baaki me 1."
      },
      pseudocode: `FUNCTION segregateBrute(arr, N):
    zeroCount = 0
    FOR x IN arr DO: IF x == 0 THEN zeroCount++
    FOR i FROM 0 TO zeroCount-1 DO: arr[i] = 0
    FOR i FROM zeroCount TO N-1 DO: arr[i] = 1`,
      dryRun: [
        { step: "1", state: "arr = [0, 1, 0, 1, 0]", action: "zeroCount = 3" },
        { step: "2", state: "Overwrite", action: "arr[0..2] = 0, arr[3..4] = 1 -> [0, 0, 0, 1, 1]!" }
      ],
      code: {
        cpp: `#include <vector>\nvoid segregateBrute(std::vector<int>& arr) {\n    int zeroCount = 0;\n    for (int x : arr) if (x == 0) zeroCount++;\n    for (int i = 0; i < zeroCount; i++) arr[i] = 0;\n    for (int i = zeroCount; i < arr.size(); i++) arr[i] = 1;\n}`,
        java: `public class Solution {\n    public static void segregateBrute(int[] arr) {\n        int zeroCount = 0;\n        for (int x : arr) if (x == 0) zeroCount++;\n        for (int i = 0; i < zeroCount; i++) arr[i] = 0;\n        for (int i = zeroCount; i < arr.length; i++) arr[i] = 1;\n    }\n}`,
        python: `def segregate_brute(arr):\n    z = arr.count(0)\n    for i in range(z): arr[i] = 0\n    for i in range(z, len(arr)): arr[i] = 1`
      },
      timeComplexity: "O(N) Two Passes",
      timeExplanation: "Count pass + Overwrite pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Two Pointers Swapping O(N) Single Pass",
      algorithm: {
        english: "1. Set left = 0 and right = N - 1.\n2. While left < right: increment left if arr[left] == 0, decrement right if arr[right] == 1.\n3. If arr[left] == 1 and arr[right] == 0, swap arr[left] and arr[right].",
        hinglish: "1. left = 0 aur right = N - 1 rakho.\n2. Jab tak left < right ho: jab tak arr[left] == 0 ho tab tak left++ karo, jab arr[right] == 1 ho tab right-- karo.\n3. Agar arr[left] == 1 aur arr[right] == 0 ho, swap(arr[left], arr[right]) kar do."
      },
      pseudocode: `FUNCTION segregateOptimal(arr, N):
    left = 0, right = N - 1
    WHILE left < right DO:
        WHILE arr[left] == 0 AND left < right DO: left++
        WHILE arr[right] == 1 AND left < right DO: right--
        IF left < right THEN:
            SWAP(arr[left], arr[right])
            left++, right--`,
      dryRun: [
        { step: "1", state: "arr = [1, 0, 1, 0], left=0, right=3", action: "arr[0]=1, arr[3]=0 -> Swap -> [0, 0, 1, 1]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nvoid segregateOptimal(std::vector<int>& arr) {\n    int left = 0, right = arr.size() - 1;\n    while (left < right) {\n        while (left < right && arr[left] == 0) left++;\n        while (left < right && arr[right] == 1) right--;\n        if (left < right) {\n            std::swap(arr[left], arr[right]);\n            left++; right--;\n        }\n    }\n}`,
        java: `public class Solution {\n    public static void segregateOptimal(int[] arr) {\n        int left = 0, right = arr.length - 1;\n        while (left < right) {\n            while (left < right && arr[left] == 0) left++;\n            while (left < right && arr[right] == 1) right--;\n            if (left < right) {\n                int temp = arr[left]; arr[left] = arr[right]; arr[right] = temp;\n                left++; right--;\n            }\n        }\n    }\n}`,
        python: `def segregate_optimal(arr):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        while left < right and arr[left] == 0: left += 1\n        while left < right and arr[right] == 1: right -= 1\n        if left < right:\n            arr[left], arr[right] = arr[right], arr[left]\n            left += 1; right -= 1`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Pointers meet in single pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 12. MAXIMUM CONSECUTIVE ONES
  12: {
    title: "Maximum Consecutive Ones",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given a binary array arr of size N, find and return the maximum number of consecutive 1s in the array.",
    examples: [
      {
        input: "arr = [1, 1, 0, 1, 1, 1]",
        output: "3",
        explanation: "First two digits are consecutive 1s (count 2). Last three digits are consecutive 1s (count 3). Max count = 3.",
        note: "Reset current count to 0 whenever element is 0."
      }
    ],
    brute: {
      title: "Brute Force Approach: Nested Consecutive Subarray Scanning O(N²)",
      algorithm: {
        english: "1. For every starting index i, iterate j from i to N-1 while arr[j] == 1.\n2. Track maxConsecutive = MAX(maxConsecutive, j - i + 1).",
        hinglish: "1. Har starting index i se j tab tak badhao jab tak arr[j] == 1 ho.\n2. Consecutive count = (j - i + 1) check karke maxConsecutive update karo."
      },
      pseudocode: `FUNCTION maxConsecutiveBrute(arr, N):
    maxC = 0
    FOR i FROM 0 TO N-1 DO:
        count = 0
        FOR j FROM i TO N-1 DO:
            IF arr[j] == 1 THEN:
                count++
                maxC = MAX(maxC, count)
            ELSE BREAK
    RETURN maxC`,
      dryRun: [
        { step: "1", state: "arr = [1, 1, 0, 1, 1, 1]", action: "Subarrays of 1s: len 2, len 3 -> max = 3!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nint maxConsecutiveBrute(const std::vector<int>& arr) {\n    int maxC = 0;\n    for (int i = 0; i < arr.size(); i++) {\n        int count = 0;\n        for (int j = i; j < arr.size(); j++) {\n            if (arr[j] == 1) { count++; maxC = std::max(maxC, count); }\n            else break;\n        }\n    }\n    return maxC;\n}`,
        java: `public class Solution {\n    public static int maxConsecutiveBrute(int[] arr) {\n        int maxC = 0;\n        for (int i = 0; i < arr.length; i++) {\n            int count = 0;\n            for (int j = i; j < arr.length; j++) {\n                if (arr[j] == 1) { count++; maxC = Math.max(maxC, count); }\n                else break;\n            }\n        }\n        return maxC;\n    }\n}`,
        python: `def max_consecutive_brute(arr):\n    max_c = 0\n    for i in range(len(arr)):\n        c = 0\n        for j in range(i, len(arr)):\n            if arr[j] == 1: c += 1; max_c = max(max_c, c)\n            else: break\n    return max_c`
      },
      timeComplexity: "O(N²)",
      timeExplanation: "Nested loops scan subarrays.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Single Pass Counter Reset O(N)",
      algorithm: {
        english: "1. Maintain currentCount = 0 and maxCount = 0.\n2. Iterate element x in arr:\n   - If x == 1: currentCount++, maxCount = MAX(maxCount, currentCount).\n   - Else (x == 0): currentCount = 0.\n3. Return maxCount.",
        hinglish: "1. currentCount = 0 aur maxCount = 0 set karo.\n2. Element x par loop chalao:\n   - Agar x == 1 ho: currentCount++ karo, maxCount = max(maxCount, currentCount) update karo.\n   - Agar x == 0 ho: currentCount = 0 kar do.\n3. maxCount return kar do."
      },
      pseudocode: `FUNCTION maxConsecutiveOptimal(arr, N):
    currentCount = 0, maxCount = 0
    FOR EACH x IN arr DO:
        IF x == 1 THEN:
            currentCount++
            maxCount = MAX(maxCount, currentCount)
        ELSE:
            currentCount = 0
    RETURN maxCount`,
      dryRun: [
        { step: "1", state: "arr = [1, 1, 0, 1, 1, 1]", action: "x=1 (c=1, m=1), x=1 (c=2, m=2), x=0 (c=0), x=1 (c=1), x=1 (c=2), x=1 (c=3, m=3) -> Return 3!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nint maxConsecutiveOptimal(const std::vector<int>& arr) {\n    int cur = 0, maxC = 0;\n    for (int x : arr) {\n        if (x == 1) { cur++; maxC = std::max(maxC, cur); }\n        else cur = 0;\n    }\n    return maxC;\n}`,
        java: `public class Solution {\n    public static int maxConsecutiveOptimal(int[] arr) {\n        int cur = 0, maxC = 0;\n        for (int x : arr) {\n            if (x == 1) { cur++; maxC = Math.max(maxC, cur); }\n            else cur = 0;\n        }\n        return maxC;\n    }\n}`,
        python: `def max_consecutive_optimal(arr):\n    cur, max_c = 0, 0\n    for x in arr:\n        if x == 1:\n            cur += 1; max_c = max(max_c, cur)\n        else: cur = 0\n    return max_c`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single linear pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 13. PALINDROMIC ARRAY
  13: {
    title: "Palindromic Array",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of N positive integers, check if all the elements in the array are palindromic numbers. Return true if all are palindromes, else false.",
    examples: [
      {
        input: "arr = [111, 222, 333, 444, 555]",
        output: "true",
        explanation: "Every single integer (111, 222, 333, 444, 555) reads the same forwards and backwards.",
        note: "If even a single number is not palindrome, return false."
      }
    ],
    brute: {
      title: "Brute Force Approach: String Conversion Check for Every Number O(N * D)",
      algorithm: {
        english: "1. For every element num in arr, convert num to string.\n2. Check if string equals reversed string.\n3. If any num is not palindrome, return false.",
        hinglish: "1. Har number num ko String me convert karo.\n2. Check karo ki kya string == reverse(string).\n3. Agar koi bhi number palindrome na ho, turant false return karo."
      },
      pseudocode: `FUNCTION isPalindromicArrayBrute(arr, N):
    FOR EACH num IN arr DO:
        str = TO_STRING(num)
        IF str != REVERSE(str) THEN RETURN FALSE
    RETURN TRUE`,
      dryRun: [
        { step: "1", state: "arr = [121, 131, 20]", action: "121 ok, 131 ok, 20 '20'!='02' -> Return false!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <string>\n#include <algorithm>\nbool isPalindromicArrayBrute(const std::vector<int>& arr) {\n    for (int num : arr) {\n        std::string s = std::to_string(num);\n        std::string rev = s;\n        std::reverse(rev.begin(), rev.end());\n        if (s != rev) return false;\n    }\n    return true;\n}`,
        java: `public class Solution {\n    public static boolean isPalindromicArrayBrute(int[] arr) {\n        for (int num : arr) {\n            String s = String.valueOf(num);\n            String rev = new StringBuilder(s).reverse().toString();\n            if (!s.equals(rev)) return false;\n        }\n        return true;\n    }\n}`,
        python: `def is_palindromic_array_brute(arr):\n    for num in arr:\n        if str(num) != str(num)[::-1]: return False\n    return True`
      },
      timeComplexity: "O(N * D) Time",
      timeExplanation: "N numbers with D digits.",
      spaceComplexity: "O(D) Auxiliary Space",
      spaceExplanation: "String memory allocation."
    },
    optimal: {
      title: "Optimal Approach: Mathematical Reversal O(N * D) Time O(1) Space",
      algorithm: {
        english: "1. Create helper function isPalindrome(num) using modulo % 10 math reversal.\n2. Check isPalindrome for each number in arr.\n3. Return true if all match.",
        hinglish: "1. Helper function isPalindrome(num) banao modulo % 10 se reverse number compute karke.\n2. Array ke saare numbers ko check karo.\n3. Zero extra string space me result pao!"
      },
      pseudocode: `FUNCTION isPalindromeNum(num):
    temp = num, rev = 0
    WHILE temp > 0 DO:
        rev = rev * 10 + (temp % 10)
        temp /= 10
    RETURN rev == num

FUNCTION isPalindromicArrayOptimal(arr, N):
    FOR EACH num IN arr DO:
        IF NOT isPalindromeNum(num) THEN RETURN FALSE
    RETURN TRUE`,
      dryRun: [
        { step: "1", state: "arr = [111, 222]", action: "111 rev=111 (ok), 222 rev=222 (ok) -> Return true!" }
      ],
      code: {
        cpp: `#include <vector>\nbool isPalNum(int num) {\n    int temp = num, rev = 0;\n    while (temp > 0) { rev = rev * 10 + (temp % 10); temp /= 10; }\n    return rev == num;\n}\nbool isPalindromicArrayOptimal(const std::vector<int>& arr) {\n    for (int num : arr) if (!isPalNum(num)) return false;\n    return true;\n}`,
        java: `public class Solution {\n    private static boolean isPalNum(int num) {\n        int temp = num, rev = 0;\n        while (temp > 0) { rev = rev * 10 + (temp % 10); temp /= 10; }\n        return rev == num;\n    }\n    public static boolean isPalindromicArrayOptimal(int[] arr) {\n        for (int num : arr) if (!isPalNum(num)) return false;\n        return true;\n    }\n}`,
        python: `def is_pal_num(num):\n    temp, rev = num, 0\n    while temp > 0: rev = rev * 10 + (temp % 10); temp //= 10\n    return rev == num\ndef is_palindromic_array_optimal(arr):\n    for num in arr:\n        if not is_pal_num(num): return False\n    return True`
      },
      timeComplexity: "O(N * D) Time",
      timeExplanation: "Math digit extraction.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero string allocation."
    }
  },

  // 14. MOVE ZEROES TO END
  14: {
    title: "Move Zeroes to End",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N, move all 0s to the end of the array while maintaining the relative order of non-zero elements in-place.",
    examples: [
      {
        input: "arr = [0, 1, 0, 3, 12]",
        output: "[1, 3, 12, 0, 0]",
        explanation: "Non-zero elements [1, 3, 12] retain order while all zeroes are moved to the end.",
        note: "Perform in-place with O(1) space."
      }
    ],
    brute: {
      title: "Brute Force Approach: Temporary Non-Zero Copy Vector O(N) Space",
      algorithm: {
        english: "1. Collect all non-zero elements into temporary vector temp.\n2. Copy temp back into front of arr.\n3. Fill remaining positions of arr with 0.",
        hinglish: "1. Saare non-zero elements ko temporary list temp me daal do.\n2. Temp ke items original arr ke shuru me copy karo.\n3. Baaki bachi positions me 0 fill kar do."
      },
      pseudocode: `FUNCTION moveZeroesBrute(arr, N):
    CREATE list temp
    FOR x IN arr DO: IF x != 0 THEN temp.APPEND(x)
    FOR i FROM 0 TO temp.SIZE()-1 DO: arr[i] = temp[i]
    FOR i FROM temp.SIZE() TO N-1 DO: arr[i] = 0`,
      dryRun: [
        { step: "1", state: "arr = [0, 1, 0, 3, 12]", action: "temp = [1, 3, 12] -> arr = [1, 3, 12, 0, 0]!" }
      ],
      code: {
        cpp: `#include <vector>\nvoid moveZeroesBrute(std::vector<int>& arr) {\n    std::vector<int> temp;\n    for (int x : arr) if (x != 0) temp.push_back(x);\n    for (size_t i = 0; i < temp.size(); i++) arr[i] = temp[i];\n    for (size_t i = temp.size(); i < arr.size(); i++) arr[i] = 0;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static void moveZeroesBrute(int[] arr) {\n        List<Integer> temp = new ArrayList<>();\n        for (int x : arr) if (x != 0) temp.add(x);\n        for (int i = 0; i < temp.size(); i++) arr[i] = temp.get(i);\n        for (int i = temp.size(); i < arr.length; i++) arr[i] = 0;\n    }\n}`,
        python: `def move_zeroes_brute(arr):\n    nz = [x for x in arr if x != 0]\n    for i in range(len(nz)): arr[i] = nz[i]\n    for i in range(len(nz), len(arr)): arr[i] = 0`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Two linear passes.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Allocates temp vector."
    },
    optimal: {
      title: "Optimal Approach: Two Pointers In-Place Swapping O(N) Time O(1) Space",
      algorithm: {
        english: "1. Find first zero at index j.\n2. Iterate pointer i from j+1 to N-1.\n3. When arr[i] != 0, swap(arr[i], arr[j]) and increment j++.",
        hinglish: "1. Pehle 0 ka index j dhoondho.\n2. Pointer i ko j+1 se N-1 tak chalao.\n3. Jaise hi arr[i] != 0 mile, swap(arr[i], arr[j]) karo aur j++ kar do."
      },
      pseudocode: `FUNCTION moveZeroesOptimal(arr, N):
    j = -1
    FOR i FROM 0 TO N-1 DO:
        IF arr[i] == 0 THEN { j = i; BREAK; }
    IF j == -1 THEN RETURN
    FOR i FROM j + 1 TO N-1 DO:
        IF arr[i] != 0 THEN:
            SWAP(arr[i], arr[j])
            j++`,
      dryRun: [
        { step: "1", state: "arr = [0, 1, 0, 3, 12]", action: "j=0 (arr[0]=0). i=1 (val 1 != 0): Swap -> [1, 0, 0, 3, 12], j=1" },
        { step: "2", state: "i=3 (val 3 != 0)", action: "Swap -> [1, 3, 0, 0, 12], j=2. i=4 (12): Swap -> [1, 3, 12, 0, 0]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nvoid moveZeroesOptimal(std::vector<int>& arr) {\n    int j = -1, n = arr.size();\n    for (int i = 0; i < n; i++) if (arr[i] == 0) { j = i; break; }\n    if (j == -1) return;\n    for (int i = j + 1; i < n; i++) {\n        if (arr[i] != 0) {\n            std::swap(arr[i], arr[j]);\n            j++;\n        }\n    }\n}`,
        java: `public class Solution {\n    public static void moveZeroesOptimal(int[] arr) {\n        int j = -1, n = arr.length;\n        for (int i = 0; i < n; i++) if (arr[i] == 0) { j = i; break; }\n        if (j == -1) return;\n        for (int i = j + 1; i < n; i++) {\n            if (arr[i] != 0) {\n                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;\n                j++;\n            }\n        }\n    }\n}`,
        python: `def move_zeroes_optimal(arr):\n    j = -1; n = len(arr)\n    for i in range(n):\n        if arr[i] == 0: j = i; break\n    if j == -1: return\n    for i in range(j + 1, n):\n        if arr[i] != 0:\n            arr[i], arr[j] = arr[j], arr[i]\n            j += 1`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Traverses elements once.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "In-place modification."
    }
  },

  // 15. SORT ARRAY WITH 0S, 1S AND 2S (DUTCH NATIONAL FLAG)
  15: {
    title: "Sort array with 0's 1's and 2's (Dutch Flag)",
    topic: "Arrays",
    difficulty: "Medium",
    problemStatement: "Given an array arr of size N containing only 0s, 1s, and 2s, sort the array in-place without using library sort functions.",
    examples: [
      {
        input: "arr = [2, 0, 2, 1, 1, 0]",
        output: "[0, 0, 1, 1, 2, 2]",
        explanation: "Array sorted in-place so all 0s come first, followed by 1s and 2s.",
        note: "Dutch National Flag 3-pointer algorithm achieves single-pass O(N)."
      }
    ],
    brute: {
      title: "Brute Force Approach: Counting Sort O(N) Two Passes",
      algorithm: {
        english: "1. Count total occurrences of c0, c1, c2.\n2. Overwrite first c0 items with 0, next c1 items with 1, remaining c2 items with 2.",
        hinglish: "1. Pehle pass me 0, 1 aur 2 ke total counts (c0, c1, c2) nikal lo.\n2. Original array me pehle c0 baar 0, fir c1 baar 1 aur bachi Jagah 2 fill kar do."
      },
      pseudocode: `FUNCTION sort012Brute(arr, N):
    c0 = 0, c1 = 0, c2 = 0
    FOR x IN arr DO:
        IF x == 0 THEN c0++
        ELSE IF x == 1 THEN c1++
        ELSE c2++
    idx = 0
    WHILE c0-- > 0 DO arr[idx++] = 0
    WHILE c1-- > 0 DO arr[idx++] = 1
    WHILE c2-- > 0 DO arr[idx++] = 2`,
      dryRun: [
        { step: "1", state: "arr = [2, 0, 1]", action: "c0=1, c1=1, c2=1 -> arr = [0, 1, 2]!" }
      ],
      code: {
        cpp: `#include <vector>\nvoid sort012Brute(std::vector<int>& arr) {\n    int c0 = 0, c1 = 0, c2 = 0;\n    for (int x : arr) { if (x == 0) c0++; else if (x == 1) c1++; else c2++; }\n    int idx = 0;\n    while (c0--) arr[idx++] = 0;\n    while (c1--) arr[idx++] = 1;\n    while (c2--) arr[idx++] = 2;\n}`,
        java: `public class Solution {\n    public static void sort012Brute(int[] arr) {\n        int c0 = 0, c1 = 0, c2 = 0;\n        for (int x : arr) { if (x == 0) c0++; else if (x == 1) c1++; else c2++; }\n        int idx = 0;\n        while (c0-- > 0) arr[idx++] = 0;\n        while (c1-- > 0) arr[idx++] = 1;\n        while (c2-- > 0) arr[idx++] = 2;\n    }\n}`,
        python: `def sort_012_brute(arr):\n    c0 = arr.count(0); c1 = arr.count(1); c2 = arr.count(2)\n    idx = 0\n    for _ in range(c0): arr[idx] = 0; idx += 1\n    for _ in range(c1): arr[idx] = 1; idx += 1\n    for _ in range(c2): arr[idx] = 2; idx += 1`
      },
      timeComplexity: "O(N) Two Passes",
      timeExplanation: "Count pass + Overwrite pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Dutch National Flag 3-Pointer Algorithm O(N) Single Pass",
      algorithm: {
        english: "1. Maintain 3 pointers: low = 0, mid = 0, high = N - 1.\n2. Loop while mid <= high:\n   - If arr[mid] == 0: swap(arr[low], arr[mid]), low++, mid++.\n   - If arr[mid] == 1: mid++.\n   - If arr[mid] == 2: swap(arr[mid], arr[high]), high--.",
        hinglish: "1. 3 Pointers rakho: low = 0, mid = 0, high = N - 1.\n2. Jab tak mid <= high ho:\n   - Agar arr[mid] == 0 ho: swap(arr[low], arr[mid]), low++, mid++.\n   - Agar arr[mid] == 1 ho: mid++.\n   - Agar arr[mid] == 2 ho: swap(arr[mid], arr[high]), high--."
      },
      pseudocode: `FUNCTION sort012Optimal(arr, N):
    low = 0, mid = 0, high = N - 1
    WHILE mid <= high DO:
        IF arr[mid] == 0 THEN:
            SWAP(arr[low], arr[mid])
            low++, mid++
        ELSE IF arr[mid] == 1 THEN:
            mid++
        ELSE:
            SWAP(arr[mid], arr[high])
            high--`,
      dryRun: [
        { step: "1", state: "arr = [2, 0, 2, 1, 1, 0]", action: "DNF Partition -> Sorted in single pass: [0, 0, 1, 1, 2, 2]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nvoid sort012Optimal(std::vector<int>& arr) {\n    int low = 0, mid = 0, high = arr.size() - 1;\n    while (mid <= high) {\n        if (arr[mid] == 0) {\n            std::swap(arr[low], arr[mid]);\n            low++; mid++;\n        } else if (arr[mid] == 1) {\n            mid++;\n        } else {\n            std::swap(arr[mid], arr[high]);\n            high--;\n        }\n    }\n}`,
        java: `public class Solution {\n    public static void sort012Optimal(int[] arr) {\n        int low = 0, mid = 0, high = arr.length - 1;\n        while (mid <= high) {\n            if (arr[mid] == 0) {\n                int temp = arr[low]; arr[low] = arr[mid]; arr[mid] = temp;\n                low++; mid++;\n            } else if (arr[mid] == 1) {\n                mid++;\n            } else {\n                int temp = arr[mid]; arr[mid] = arr[high]; arr[high] = temp;\n                high--;\n            }\n        }\n    }\n}`,
        python: `def sort_012_optimal(arr):\n    low, mid, high = 0, 0, len(arr) - 1\n    while mid <= high:\n        if arr[mid] == 0:\n            arr[low], arr[mid] = arr[mid], arr[low]\n            low += 1; mid += 1\n        elif arr[mid] == 1:\n            mid += 1\n        else:\n            arr[mid], arr[high] = arr[high], arr[mid]\n            high -= 1`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single linear pass partition.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  }
}
