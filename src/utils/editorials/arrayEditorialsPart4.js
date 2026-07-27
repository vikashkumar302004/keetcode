// Ultra-Detailed Editorials for Array Problems 16 to 25

export const arrayEditorialsPart4 = {
  // 16. EQUILIBRIUM POINT
  16: {
    title: "Equilibrium Point",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N, find the first equilibrium position (1-based index). An equilibrium position is an index such that the sum of elements before it equals the sum of elements after it.",
    examples: [
      {
        input: "arr = [1, 3, 5, 2, 2]",
        output: "3",
        explanation: "At index 3 (value 5): left sum = 1 + 3 = 4, right sum = 2 + 2 = 4. Equilibrium index is 3.",
        note: "Return -1 if no equilibrium point exists."
      }
    ],
    brute: {
      title: "Brute Force Approach: Nested Left & Right Sum Evaluation O(N²)",
      algorithm: {
        english: "1. For each candidate index i from 0 to N-1:\n2. Calculate leftSum = SUM(arr[0..i-1]) and rightSum = SUM(arr[i+1..N-1]).\n3. If leftSum == rightSum, return i + 1.",
        hinglish: "1. Har index i (0 se N-1) par loop chalao.\n2. Inner loops se leftSum aur rightSum compute karo.\n3. Agar leftSum == rightSum ho, (i + 1) return kar do."
      },
      pseudocode: `FUNCTION equilibriumBrute(arr, N):
    FOR i FROM 0 TO N-1 DO:
        leftSum = 0, rightSum = 0
        FOR j FROM 0 TO i-1 DO leftSum += arr[j]
        FOR j FROM i+1 TO N-1 DO rightSum += arr[j]
        IF leftSum == rightSum THEN RETURN i + 1
    RETURN -1`,
      dryRun: [
        { step: "1", state: "arr = [1, 3, 5, 2, 2]", action: "i=2 (val 5): leftSum=4, rightSum=4 -> Return 3!" }
      ],
      code: {
        cpp: `#include <vector>\nint equilibriumBrute(const std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n; i++) {\n        int leftSum = 0, rightSum = 0;\n        for (int j = 0; j < i; j++) leftSum += arr[j];\n        for (int j = i + 1; j < n; j++) rightSum += arr[j];\n        if (leftSum == rightSum) return i + 1;\n    }\n    return -1;\n}`,
        java: `public class Solution {\n    public static int equilibriumBrute(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n; i++) {\n            int leftSum = 0, rightSum = 0;\n            for (int j = 0; j < i; j++) leftSum += arr[j];\n            for (int j = i + 1; j < n; j++) rightSum += arr[j];\n            if (leftSum == rightSum) return i + 1;\n        }\n        return -1;\n    }\n}`,
        python: `def equilibrium_brute(arr):\n    n = len(arr)\n    for i in range(n):\n        if sum(arr[:i]) == sum(arr[i+1:]): return i + 1\n    return -1`
      },
      timeComplexity: "O(N²)",
      timeExplanation: "Nested sum calculations.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Total Sum & Prefix Running Balance O(N)",
      algorithm: {
        english: "1. Compute totalSum of all array elements.\n2. Maintain leftSum = 0.\n3. For each element arr[i]: rightSum = totalSum - leftSum - arr[i].\n4. If leftSum == rightSum, return i + 1. Else update leftSum += arr[i].",
        hinglish: "1. Total sum = totalSum nikalo.\n2. leftSum = 0 set karo.\n3. Loop me: rightSum = totalSum - leftSum - arr[i].\n4. Agar leftSum == rightSum ho, (i + 1) return karo, warna leftSum += arr[i] kar do."
      },
      pseudocode: `FUNCTION equilibriumOptimal(arr, N):
    totalSum = SUM(arr)
    leftSum = 0
    FOR i FROM 0 TO N-1 DO:
        rightSum = totalSum - leftSum - arr[i]
        IF leftSum == rightSum THEN RETURN i + 1
        leftSum += arr[i]
    RETURN -1`,
      dryRun: [
        { step: "1", state: "arr = [1, 3, 5, 2, 2], totalSum = 13", action: "i=2: leftSum=4, rightSum = 13 - 4 - 5 = 4 -> Match! Return 3." }
      ],
      code: {
        cpp: `#include <vector>\nint equilibriumOptimal(const std::vector<int>& arr) {\n    long long totalSum = 0, leftSum = 0;\n    for (int x : arr) totalSum += x;\n    for (int i = 0; i < arr.size(); i++) {\n        long long rightSum = totalSum - leftSum - arr[i];\n        if (leftSum == rightSum) return i + 1;\n        leftSum += arr[i];\n    }\n    return -1;\n}`,
        java: `public class Solution {\n    public static int equilibriumOptimal(int[] arr) {\n        long totalSum = 0, leftSum = 0;\n        for (int x : arr) totalSum += x;\n        for (int i = 0; i < arr.length; i++) {\n            long rightSum = totalSum - leftSum - arr[i];\n            if (leftSum == rightSum) return i + 1;\n            leftSum += arr[i];\n        }\n        return -1;\n    }\n}`,
        python: `def equilibrium_optimal(arr):\n    total_sum, left_sum = sum(arr), 0\n    for i, x in enumerate(arr):\n        if left_sum == (total_sum - left_sum - x): return i + 1\n        left_sum += x\n    return -1`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Two linear passes.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 17. REVERSE INTEGER
  17: {
    title: "Reverse Integer",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given a signed 32-bit integer X, reverse its digits. If reversing X causes the value to overflow 32-bit integer range [-2^31, 2^31 - 1], return 0.",
    examples: [
      {
        input: "X = -123",
        output: "-321",
        explanation: "Reversing digits of -123 yields -321, which lies within valid 32-bit signed bounds.",
        note: "Return 0 if reversed integer overflows."
      }
    ],
    brute: {
      title: "Brute Force Approach: String Conversion & Parsing with Exception Handling",
      algorithm: {
        english: "1. Convert abs(X) to string and reverse characters.\n2. Parse reversed string back to integer.\n3. Apply original sign and check overflow limits.",
        hinglish: "1. abs(X) ko string bana kar reverse karo.\n2. String ko waapas integer me convert karke overflow check karo."
      },
      pseudocode: `FUNCTION reverseIntegerBrute(X):
    sign = (X < 0) ? -1 : 1
    str = REVERSE(TO_STRING(ABS(X)))
    val = PARSE_LONG(str) * sign
    IF val < INT_MIN OR val > INT_MAX THEN RETURN 0
    RETURN val`,
      dryRun: [
        { step: "1", state: "X = -123", action: "str='321', val=-321 -> Valid 32-bit -> Return -321!" }
      ],
      code: {
        cpp: `#include <string>\n#include <algorithm>\n#include <climits>\nint reverseIntegerBrute(int X) {\n    int sign = (X < 0) ? -1 : 1;\n    std::string s = std::to_string(std::abs((long long)X));\n    std::reverse(s.begin(), s.end());\n    try {\n        long long val = std::stoll(s) * sign;\n        if (val < INT_MIN || val > INT_MAX) return 0;\n        return (int)val;\n    } catch (...) { return 0; }\n}`,
        java: `public class Solution {\n    public static int reverseIntegerBrute(int X) {\n        int sign = (X < 0) ? -1 : 1;\n        String s = new StringBuilder(String.valueOf(Math.abs((long)X))).reverse().toString();\n        try {\n            long val = Long.parseLong(s) * sign;\n            if (val < Integer.MIN_VALUE || val > Integer.MAX_VALUE) return 0;\n            return (int)val;\n        } catch (Exception e) { return 0; }\n    }\n}`,
        python: `def reverse_integer_brute(X):\n    sign = -1 if X < 0 else 1\n    rev = int(str(abs(X))[::-1]) * sign\n    if rev < -2**31 or rev > 2**31 - 1: return 0\n    return rev`
      },
      timeComplexity: "O(D) Time",
      timeExplanation: "String reversal over digits.",
      spaceComplexity: "O(D) Auxiliary Space",
      spaceExplanation: "Allocates string memory."
    },
    optimal: {
      title: "Optimal Approach: Pure Math Modulo Extraction with Overflow Boundary Check O(D)",
      algorithm: {
        english: "1. Initialize rev = 0.\n2. While X != 0:\n   - pop = X % 10, X /= 10.\n   - Check overflow condition before rev = rev * 10 + pop.\n3. Return rev.",
        hinglish: "1. rev = 0 set karo.\n2. Loop jab tak X != 0 ho: pop = X % 10, X /= 10. rev = rev * 10 + pop karne se pehle 32-bit overflow check karo.\n3. rev return kar do."
      },
      pseudocode: `FUNCTION reverseIntegerOptimal(X):
    rev = 0
    WHILE X != 0 DO:
        pop = X % 10
        X /= 10
        IF rev > INT_MAX/10 OR rev < INT_MIN/10 THEN RETURN 0
        rev = rev * 10 + pop
    RETURN rev`,
      dryRun: [
        { step: "1", state: "X = -123", action: "pop=-3, rev=-3 -> pop=-2, rev=-32 -> pop=-1, rev=-321. Return -321!" }
      ],
      code: {
        cpp: `#include <climits>\nint reverseIntegerOptimal(int X) {\n    int rev = 0;\n    while (X != 0) {\n        int pop = X % 10;\n        X /= 10;\n        if (rev > INT_MAX/10 || (rev == INT_MAX/10 && pop > 7)) return 0;\n        if (rev < INT_MIN/10 || (rev == INT_MIN/10 && pop < -8)) return 0;\n        rev = rev * 10 + pop;\n    }\n    return rev;\n}`,
        java: `public class Solution {\n    public static int reverseIntegerOptimal(int X) {\n        int rev = 0;\n        while (X != 0) {\n            int pop = X % 10;\n            X /= 10;\n            if (rev > Integer.MAX_VALUE/10 || (rev == Integer.MAX_VALUE/10 && pop > 7)) return 0;\n            if (rev < Integer.MIN_VALUE/10 || (rev == Integer.MIN_VALUE/10 && pop < -8)) return 0;\n            rev = rev * 10 + pop;\n        }\n        return rev;\n    }\n}`,
        python: `def reverse_integer_optimal(X):\n    sign = -1 if X < 0 else 1\n    X = abs(X)\n    rev = 0\n    while X != 0:\n        rev = rev * 10 + (X % 10)\n        X //= 10\n    rev *= sign\n    if rev < -2**31 or rev > 2**31 - 1: return 0\n    return rev`
      },
      timeComplexity: "O(D) Time",
      timeExplanation: "Runs for D digits.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero string allocation."
    }
  },

  // 18. LEADERS IN ARRAY
  18: {
    title: "Leaders in Array",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N, find all the leaders in the array. An element is a leader if it is strictly greater than or equal to all elements to its right.",
    examples: [
      {
        input: "arr = [16, 17, 4, 3, 5, 2]",
        output: "[17, 5, 2]",
        explanation: "17 is greater than 4, 3, 5, 2. 5 is greater than 2. 2 is rightmost (always a leader).",
        note: "Rightmost element is always a leader."
      }
    ],
    brute: {
      title: "Brute Force Approach: Nested Right Subarray Search O(N²)",
      algorithm: {
        english: "1. For each element arr[i] from 0 to N-1, check all elements arr[j] from i+1 to N-1.\n2. If arr[i] >= all right elements, add arr[i] to leaders list.",
        hinglish: "1. Har element arr[i] ke liye uske aage (i+1 se N-1) ke saare elements check karo.\n2. Agar arr[i] sabhi right elements se bada/barabar hai, use leaders list me daal do."
      },
      pseudocode: `FUNCTION leadersBrute(arr, N):
    CREATE list leaders
    FOR i FROM 0 TO N-1 DO:
        isLeader = TRUE
        FOR j FROM i+1 TO N-1 DO:
            IF arr[j] > arr[i] THEN { isLeader = FALSE; BREAK; }
        IF isLeader THEN leaders.APPEND(arr[i])
    RETURN leaders`,
      dryRun: [
        { step: "1", state: "arr = [16, 17, 4, 3, 5, 2]", action: "17 > rest (ok), 5 > 2 (ok), 2 rightmost (ok) -> Result: [17, 5, 2]" }
      ],
      code: {
        cpp: `#include <vector>\nstd::vector<int> leadersBrute(const std::vector<int>& arr) {\n    std::vector<int> leaders;\n    int n = arr.size();\n    for (int i = 0; i < n; i++) {\n        bool isLeader = true;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] > arr[i]) { isLeader = false; break; }\n        }\n        if (isLeader) leaders.push_back(arr[i]);\n    }\n    return leaders;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static List<Integer> leadersBrute(int[] arr) {\n        List<Integer> leaders = new ArrayList<>();\n        int n = arr.length;\n        for (int i = 0; i < n; i++) {\n            boolean isLeader = true;\n            for (int j = i + 1; j < n; j++) {\n                if (arr[j] > arr[i]) { isLeader = false; break; }\n            }\n            if (isLeader) leaders.add(arr[i]);\n        }\n        return leaders;\n    }\n}`,
        python: `def leaders_brute(arr):\n    leaders = []\n    n = len(arr)\n    for i in range(n):\n        if all(arr[i] >= arr[j] for j in range(i+1, n)):\n            leaders.append(arr[i])\n    return leaders`
      },
      timeComplexity: "O(N²)",
      timeExplanation: "Nested loops search right subarrays.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Excluding output list."
    },
    optimal: {
      title: "Optimal Approach: Right-to-Left Max Tracking O(N)",
      algorithm: {
        english: "1. Initialize maxFromRight = arr[N-1] and add arr[N-1] to leaders list.\n2. Iterate backwards from i = N-2 down to 0:\n   - If arr[i] >= maxFromRight: maxFromRight = arr[i], add arr[i] to leaders.\n3. Reverse leaders list to restore original left-to-right order.",
        hinglish: "1. maxFromRight = arr[N-1] rakho aur last item ko leaders list me daal do.\n2. Piche se (i = N-2 se 0) loop chalao:\n   - Agar arr[i] >= maxFromRight ho: maxFromRight = arr[i] update karo aur list me daalo.\n3. Reverse list karke original order return karo."
      },
      pseudocode: `FUNCTION leadersOptimal(arr, N):
    CREATE list leaders
    maxRight = arr[N-1]
    leaders.APPEND(maxRight)
    FOR i FROM N-2 DOWNTO 0 DO:
        IF arr[i] >= maxRight THEN:
            maxRight = arr[i]
            leaders.APPEND(maxRight)
    REVERSE(leaders)
    RETURN leaders`,
      dryRun: [
        { step: "1", state: "arr = [16, 17, 4, 3, 5, 2]", action: "maxRight=2 (add 2) -> 5>=2 (add 5, max=5) -> 17>=5 (add 17, max=17)" },
        { step: "2", state: "Reverse", action: "Reverse [2, 5, 17] -> [17, 5, 2]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nstd::vector<int> leadersOptimal(const std::vector<int>& arr) {\n    std::vector<int> leaders;\n    int n = arr.size();\n    int maxRight = arr[n - 1];\n    leaders.push_back(maxRight);\n    for (int i = n - 2; i >= 0; i--) {\n        if (arr[i] >= maxRight) {\n            maxRight = arr[i];\n            leaders.push_back(maxRight);\n        }\n    }\n    std::reverse(leaders.begin(), leaders.end());\n    return leaders;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static List<Integer> leadersOptimal(int[] arr) {\n        List<Integer> leaders = new ArrayList<>();\n        int n = arr.length;\n        int maxRight = arr[n - 1];\n        leaders.add(maxRight);\n        for (int i = n - 2; i >= 0; i--) {\n            if (arr[i] >= maxRight) {\n                maxRight = arr[i];\n                leaders.add(maxRight);\n            }\n        }\n        Collections.reverse(leaders);\n        return leaders;\n    }\n}`,
        python: `def leaders_optimal(arr):\n    n = len(arr)\n    max_right = arr[-1]\n    leaders = [max_right]\n    for i in range(n - 2, -1, -1):\n        if arr[i] >= max_right:\n            max_right = arr[i]\n            leaders.append(max_right)\n    return leaders[::-1]`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single backwards pass + reversal.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Excluding output list."
    }
  },

  // 19. INCREASING ARRAY
  19: {
    title: "Increasing Array",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array of N integers, modify the array such that it becomes non-decreasing (arr[i] >= arr[i-1]). In each move, you can increase any element by 1. Find the minimum total moves required.",
    examples: [
      {
        input: "arr = [3, 2, 5, 1, 7]",
        output: "5",
        explanation: "i=1 (val 2 < 3): add 1 move (val 3). i=3 (val 1 < 5): add 4 moves (val 5). Total moves = 1 + 4 = 5.",
        note: "Greedy single-pass approach computes minimum moves."
      }
    ],
    brute: {
      title: "Brute Force Approach: Increment Moves Simulation O(N + TotalMoves)",
      algorithm: {
        english: "1. Iterate loop counter i from 1 to N-1.\n2. While arr[i] < arr[i-1]: increment arr[i]++ and totalMoves++.\n3. Return totalMoves.",
        hinglish: "1. Loop counter i = 1 se N-1 tak chalao.\n2. Jab tak arr[i] < arr[i-1] ho: arr[i]++ aur totalMoves++ karte raho.\n3. totalMoves return kar do."
      },
      pseudocode: `FUNCTION increasingArrayBrute(arr, N):
    totalMoves = 0
    FOR i FROM 1 TO N-1 DO:
        WHILE arr[i] < arr[i-1] DO:
            arr[i]++
            totalMoves++
    RETURN totalMoves`,
      dryRun: [
        { step: "1", state: "arr = [3, 2, 5, 1, 7]", action: "i=1: 2<3 -> 1 move (3). i=3: 1<5 -> 4 moves (5). Total = 5!" }
      ],
      code: {
        cpp: `#include <vector>\nlong long increasingArrayBrute(std::vector<int> arr) {\n    long long moves = 0;\n    for (size_t i = 1; i < arr.size(); i++) {\n        while (arr[i] < arr[i - 1]) {\n            arr[i]++;\n            moves++;\n        }\n    }\n    return moves;\n}`,
        java: `public class Solution {\n    public static long increasingArrayBrute(int[] arr) {\n        long moves = 0;\n        int[] clone = arr.clone();\n        for (int i = 1; i < clone.length; i++) {\n            while (clone[i] < clone[i - 1]) {\n                clone[i]++;\n                moves++;\n            }\n        }\n        return moves;\n    }\n}`,
        python: `def increasing_array_brute(arr):\n    arr = list(arr)\n    moves = 0\n    for i in range(1, len(arr)):\n        while arr[i] < arr[i - 1]:\n            arr[i] += 1; moves += 1\n    return moves`
      },
      timeComplexity: "O(N + TotalMoves)",
      timeExplanation: "Simulates each move one by one.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Direct Difference Accumulation O(N)",
      algorithm: {
        english: "1. Iterate loop counter i from 1 to N-1.\n2. If arr[i] < arr[i-1]:\n   - diff = arr[i-1] - arr[i].\n   - totalMoves += diff.\n   - arr[i] = arr[i-1].\n3. Return totalMoves.",
        hinglish: "1. Loop counter i = 1 se N-1 tak chalao.\n2. Agar arr[i] < arr[i-1] ho:\n   - diff = arr[i-1] - arr[i] nikalo.\n   - totalMoves += diff karo.\n   - arr[i] = arr[i-1] set kar do.\n3. totalMoves return kar do."
      },
      pseudocode: `FUNCTION increasingArrayOptimal(arr, N):
    totalMoves = 0
    FOR i FROM 1 TO N-1 DO:
        IF arr[i] < arr[i-1] THEN:
            diff = arr[i-1] - arr[i]
            totalMoves += diff
            arr[i] = arr[i-1]
    RETURN totalMoves`,
      dryRun: [
        { step: "1", state: "arr = [3, 2, 5, 1, 7]", action: "i=1: 3-2=1 (arr[1]=3). i=3: 5-1=4 (arr[3]=5). Total = 5!" }
      ],
      code: {
        cpp: `#include <vector>\nlong long increasingArrayOptimal(std::vector<int> arr) {\n    long long moves = 0;\n    for (size_t i = 1; i < arr.size(); i++) {\n        if (arr[i] < arr[i - 1]) {\n            moves += (arr[i - 1] - arr[i]);\n            arr[i] = arr[i - 1];\n        }\n    }\n    return moves;\n}`,
        java: `public class Solution {\n    public static long increasingArrayOptimal(int[] arr) {\n        long moves = 0;\n        int[] clone = arr.clone();\n        for (int i = 1; i < clone.length; i++) {\n            if (clone[i] < clone[i - 1]) {\n                moves += (clone[i - 1] - clone[i]);\n                clone[i] = clone[i - 1];\n            }\n        }\n        return moves;\n    }\n}`,
        python: `def increasing_array_optimal(arr):\n    arr = list(arr); moves = 0\n    for i in range(1, len(arr)):\n        if arr[i] < arr[i - 1]:\n            moves += (arr[i - 1] - arr[i])\n            arr[i] = arr[i - 1]\n    return moves`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single linear pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 20. REARRANGE ARRAY ELEMENTS BY SIGN
  20: {
    title: "Rearrange Array Elements by Sign",
    topic: "Arrays",
    difficulty: "Medium",
    problemStatement: "Given an array arr of size N (N is even) containing equal number of positive and negative integers, rearrange the elements such that every consecutive pair has opposite signs starting with positive (pos, neg, pos, neg...).",
    examples: [
      {
        input: "arr = [3, 1, -2, -5, 2, -4]",
        output: "[3, -2, 1, -5, 2, -4]",
        explanation: "Positives [3, 1, 2] and negatives [-2, -5, -4] are interleaved starting with positive at index 0.",
        note: "Preserve relative order of positive and negative numbers."
      }
    ],
    brute: {
      title: "Brute Force Approach: Separate Positives & Negatives Auxiliary Vectors O(N) Space",
      algorithm: {
        english: "1. Collect all positive integers into pos vector and negative integers into neg vector.\n2. Fill result array: pos at even indices (2*i) and neg at odd indices (2*i + 1).",
        hinglish: "1. Saare positive numbers pos list me aur negative numbers neg list me daal do.\n2. Result array me even indices (2*i) par pos aur odd indices (2*i + 1) par neg daal do."
      },
      pseudocode: `FUNCTION rearrangeBySignBrute(arr, N):
    CREATE pos, neg, result vectors
    FOR x IN arr DO:
        IF x > 0 THEN pos.APPEND(x) ELSE neg.APPEND(x)
    FOR i FROM 0 TO (N/2)-1 DO:
        result[2*i] = pos[i]
        result[2*i + 1] = neg[i]
    RETURN result`,
      dryRun: [
        { step: "1", state: "arr = [3, 1, -2, -5, 2, -4]", action: "pos=[3,1,2], neg=[-2,-5,-4] -> Interleave -> [3, -2, 1, -5, 2, -4]!" }
      ],
      code: {
        cpp: `#include <vector>\nstd::vector<int> rearrangeBySignBrute(const std::vector<int>& arr) {\n    std::vector<int> pos, neg;\n    for (int x : arr) { if (x > 0) pos.push_back(x); else neg.push_back(x); }\n    std::vector<int> res(arr.size());\n    for (size_t i = 0; i < pos.size(); i++) {\n        res[2 * i] = pos[i];\n        res[2 * i + 1] = neg[i];\n    }\n    return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static int[] rearrangeBySignBrute(int[] arr) {\n        List<Integer> pos = new ArrayList<>(), neg = new ArrayList<>();\n        for (int x : arr) { if (x > 0) pos.add(x); else neg.add(x); }\n        int[] res = new int[arr.length];\n        for (int i = 0; i < pos.size(); i++) {\n            res[2 * i] = pos.get(i);\n            res[2 * i + 1] = neg.get(i);\n        }\n        return res;\n    }\n}`,
        python: `def rearrange_by_sign_brute(arr):\n    pos = [x for x in arr if x > 0]\n    neg = [x for x in arr if x < 0]\n    res = [0] * len(arr)\n    for i in range(len(pos)):\n        res[2 * i] = pos[i]\n        res[2 * i + 1] = neg[i]\n    return res`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Two passes over elements.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Allocates auxiliary vectors."
    },
    optimal: {
      title: "Optimal Approach: Two Pointers Direct Index Placement O(N) Single Pass",
      algorithm: {
        english: "1. Create result vector of size N.\n2. Maintain posIdx = 0 (even) and negIdx = 1 (odd).\n3. Iterate element x in arr:\n   - If x > 0: result[posIdx] = x, posIdx += 2.\n   - Else: result[negIdx] = x, negIdx += 2.\n4. Return result.",
        hinglish: "1. N size ka result vector banao.\n2. posIdx = 0 (even) aur negIdx = 1 (odd) set karo.\n3. Loop me element x check karo:\n   - Agar x > 0 ho: result[posIdx] = x, posIdx += 2 karo.\n   - Agar x < 0 ho: result[negIdx] = x, negIdx += 2 karo."
      },
      pseudocode: `FUNCTION rearrangeBySignOptimal(arr, N):
    CREATE result array of size N
    posIdx = 0, negIdx = 1
    FOR EACH x IN arr DO:
        IF x > 0 THEN:
            result[posIdx] = x
            posIdx += 2
        ELSE:
            result[negIdx] = x
            negIdx += 2
    RETURN result`,
      dryRun: [
        { step: "1", state: "arr = [3, 1, -2, -5, 2, -4]", action: "x=3 (res[0]=3, pos=2), x=-2 (res[1]=-2, neg=3) -> Direct Single Pass!" }
      ],
      code: {
        cpp: `#include <vector>\nstd::vector<int> rearrangeBySignOptimal(const std::vector<int>& arr) {\n    int n = arr.size();\n    std::vector<int> res(n);\n    int posIdx = 0, negIdx = 1;\n    for (int x : arr) {\n        if (x > 0) {\n            res[posIdx] = x;\n            posIdx += 2;\n        } else {\n            res[negIdx] = x;\n            negIdx += 2;\n        }\n    }\n    return res;\n}`,
        java: `public class Solution {\n    public static int[] rearrangeBySignOptimal(int[] arr) {\n        int n = arr.length;\n        int[] res = new int[n];\n        int posIdx = 0, negIdx = 1;\n        for (int x : arr) {\n            if (x > 0) {\n                res[posIdx] = x;\n                posIdx += 2;\n            } else {\n                res[negIdx] = x;\n                negIdx += 2;\n            }\n        }\n        return res;\n    }\n}`,
        python: `def rearrange_by_sign_optimal(arr):\n    n = len(arr)\n    res = [0] * n\n    pos_idx, neg_idx = 0, 1\n    for x in arr:\n        if x > 0:\n            res[pos_idx] = x\n            pos_idx += 2\n        else:\n            res[neg_idx] = x\n            neg_idx += 2\n    return res`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single linear pass.",
      spaceComplexity: "O(N) Output Space",
      spaceExplanation: "Allocates output array."
    }
  }
}
