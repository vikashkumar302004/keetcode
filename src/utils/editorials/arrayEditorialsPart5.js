// Ultra-Detailed Editorials for Array Problems 21 to 29

export const arrayEditorialsPart5 = {
  // 21. ROTATE ARRAY BY ONE
  21: {
    title: "Rotate Array by One",
    topic: "Arrays",
    difficulty: "Easy",
    problemStatement: "Given an array arr of size N, rotate the array to the right by one position in-place such that the last element becomes the first element.",
    examples: [
      {
        input: "arr = [1, 2, 3, 4, 5]",
        output: "[5, 1, 2, 3, 4]",
        explanation: "The last element 5 moves to index 0, and all other elements shift right by 1 position.",
        note: "Rotate in-place with O(1) space."
      }
    ],
    brute: {
      title: "Brute Force Approach: Temporary Auxiliary Copy Array O(N) Space",
      algorithm: {
        english: "1. Save last element lastVal = arr[N-1].\n2. Create temporary vector temp of size N, set temp[0] = lastVal.\n3. Copy arr[0..N-2] into temp[1..N-1], then copy temp back into arr.",
        hinglish: "1. Aakhri element lastVal = arr[N-1] store kar lo.\n2. temp array banao, temp[0] = lastVal rakho.\n3. Baaki elements temp[1..N-1] me copy karke original array me daal do."
      },
      pseudocode: `FUNCTION rotateByOneBrute(arr, N):
    lastVal = arr[N-1]
    CREATE temp array of size N
    temp[0] = lastVal
    FOR i FROM 0 TO N-2 DO temp[i+1] = arr[i]
    arr = temp`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3, 4, 5]", action: "lastVal=5, temp=[5, 1, 2, 3, 4] -> arr=[5, 1, 2, 3, 4]!" }
      ],
      code: {
        cpp: `#include <vector>\nvoid rotateByOneBrute(std::vector<int>& arr) {\n    int n = arr.size(); if (n <= 1) return;\n    int lastVal = arr[n - 1];\n    std::vector<int> temp(n);\n    temp[0] = lastVal;\n    for (int i = 0; i < n - 1; i++) temp[i + 1] = arr[i];\n    arr = temp;\n}`,
        java: `public class Solution {\n    public static void rotateByOneBrute(int[] arr) {\n        int n = arr.length; if (n <= 1) return;\n        int lastVal = arr[n - 1];\n        int[] temp = new int[n];\n        temp[0] = lastVal;\n        for (int i = 0; i < n - 1; i++) temp[i + 1] = arr[i];\n        System.arraycopy(temp, 0, arr, 0, n);\n    }\n}`,
        python: `def rotate_by_one_brute(arr):\n    if len(arr) <= 1: return\n    last_val = arr[-1]\n    temp = [last_val] + arr[:-1]\n    for i in range(len(arr)): arr[i] = temp[i]`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Two linear passes.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Allocates temp array."
    },
    optimal: {
      title: "Optimal Approach: Right-to-Left In-Place Shifting O(N) Time O(1) Space",
      algorithm: {
        english: "1. Store last element lastVal = arr[N-1].\n2. Iterate backwards i from N-2 down to 0: arr[i+1] = arr[i].\n3. Place arr[0] = lastVal.",
        hinglish: "1. lastVal = arr[N-1] store karo.\n2. Piche se loop (i = N-2 se 0) chalao: arr[i+1] = arr[i] shift karo.\n3. arr[0] = lastVal rakh do."
      },
      pseudocode: `FUNCTION rotateByOneOptimal(arr, N):
    lastVal = arr[N-1]
    FOR i FROM N-2 DOWNTO 0 DO:
        arr[i+1] = arr[i]
    arr[0] = lastVal`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3, 4, 5], lastVal=5", action: "Shift backwards -> [1, 1, 2, 3, 4], arr[0]=5 -> [5, 1, 2, 3, 4]!" }
      ],
      code: {
        cpp: `#include <vector>\nvoid rotateByOneOptimal(std::vector<int>& arr) {\n    int n = arr.size(); if (n <= 1) return;\n    int lastVal = arr[n - 1];\n    for (int i = n - 2; i >= 0; i--) arr[i + 1] = arr[i];\n    arr[0] = lastVal;\n}`,
        java: `public class Solution {\n    public static void rotateByOneOptimal(int[] arr) {\n        int n = arr.length; if (n <= 1) return;\n        int lastVal = arr[n - 1];\n        for (int i = n - 2; i >= 0; i--) arr[i + 1] = arr[i];\n        arr[0] = lastVal;\n    }\n}`,
        python: `def rotate_by_one_optimal(arr):\n    if len(arr) <= 1: return\n    last_val = arr[-1]\n    for i in range(len(arr) - 2, -1, -1): arr[i + 1] = arr[i]\n    arr[0] = last_val`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Single backwards pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "In-place modification."
    }
  },

  // 22. MAJORITY ELEMENT I (BOYER - MOORE)
  22: {
    title: "Majority Element I (Boyer - Moore Voting Algorithm)",
    topic: "Arrays",
    difficulty: "Medium",
    problemStatement: "Given an array arr of size N, find the majority element. The majority element appears strictly more than N / 2 times.",
    examples: [
      {
        input: "arr = [2, 2, 1, 1, 1, 2, 2]",
        output: "2",
        explanation: "N = 7. Element 2 appears 4 times (> 7 / 2 = 3 times).",
        note: "Solve in O(N) time and O(1) space."
      }
    ],
    brute: {
      title: "Brute Force Approach: Hash Map Frequency Counter O(N) Space",
      algorithm: {
        english: "1. Store element frequencies in a Hash Map.\n2. Return key whose count > N / 2.",
        hinglish: "1. Hash Map me saare elements ki frequency count store karo.\n2. Jis key ki frequency > N / 2 ho use return karo."
      },
      pseudocode: `FUNCTION majorityBrute(arr, N):
    CREATE map freq
    FOR x IN arr DO: freq[x] = freq[x] + 1
    FOR (key, val) IN freq DO:
        IF val > N/2 THEN RETURN key
    RETURN -1`,
      dryRun: [
        { step: "1", state: "arr = [2, 2, 1, 1, 1, 2, 2]", action: "Freq Map: {2: 4, 1: 3} -> 4 > 3 -> Return 2!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <unordered_map>\nint majorityBrute(const std::vector<int>& arr) {\n    std::unordered_map<int, int> freq;\n    for (int x : arr) freq[x]++;\n    for (auto const& [k, v] : freq) if (v > arr.size() / 2) return k;\n    return -1;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static int majorityBrute(int[] arr) {\n        Map<Integer, Integer> freq = new HashMap<>();\n        for (int x : arr) freq.put(x, freq.getOrDefault(x, 0) + 1);\n        for (Map.Entry<Integer, Integer> e : freq.entrySet()) if (e.getValue() > arr.length / 2) return e.getKey();\n        return -1;\n    }\n}`,
        python: `def majority_brute(arr):\n    f = {}\n    for x in arr: f[x] = f.get(x, 0) + 1\n    for k, v in f.items():\n        if v > len(arr) // 2: return k\n    return -1`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Hash map insertions.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Allocates hash map."
    },
    optimal: {
      title: "Optimal Approach: Boyer-Moore Voting Algorithm O(N) Time O(1) Space",
      algorithm: {
        english: "1. Maintain candidate = -1, count = 0.\n2. For each element x:\n   - If count == 0: candidate = x, count = 1.\n   - Else if x == candidate: count++.\n   - Else: count--.\n3. Return candidate.",
        hinglish: "1. candidate = -1, count = 0 set karo.\n2. Loop me element x check karo:\n   - Agar count == 0: candidate = x, count = 1.\n   - Agar x == candidate: count++.\n   - Warna: count--.\n3. candidate return kar do."
      },
      pseudocode: `FUNCTION majorityOptimal(arr, N):
    candidate = -1, count = 0
    FOR x IN arr DO:
        IF count == 0 THEN candidate = x, count = 1
        ELSE IF x == candidate THEN count++
        ELSE count--
    RETURN candidate`,
      dryRun: [
        { step: "1", state: "arr = [2, 2, 1, 1, 1, 2, 2]", action: "Boyer-Moore voting election -> candidate = 2!" }
      ],
      code: {
        cpp: `#include <vector>\nint majorityOptimal(const std::vector<int>& arr) {\n    int candidate = -1, count = 0;\n    for (int x : arr) {\n        if (count == 0) { candidate = x; count = 1; }\n        else if (x == candidate) count++;\n        else count--;\n    }\n    return candidate;\n}`,
        java: `public class Solution {\n    public static int majorityOptimal(int[] arr) {\n        int candidate = -1, count = 0;\n        for (int x : arr) {\n            if (count == 0) { candidate = x; count = 1; }\n            else if (x == candidate) count++;\n            else count--;\n        }\n        return candidate;\n    }\n}`,
        python: `def majority_optimal(arr):\n    cand, count = -1, 0\n    for x in arr:\n        if count == 0: cand = x; count = 1\n        elif x == cand: count += 1\n        else: count -= 1\n    return cand`
      },
      timeComplexity: "O(N) Single Pass",
      timeExplanation: "Single linear pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 23. ROTATE ARRAY BY K STEPS
  23: {
    title: "Rotate Array by K steps",
    topic: "Arrays",
    difficulty: "Medium",
    problemStatement: "Given an array arr of size N and an integer K, rotate the array to the right by K steps in-place.",
    examples: [
      {
        input: "arr = [1, 2, 3, 4, 5, 6, 7], K = 3",
        output: "[5, 6, 7, 1, 2, 3, 4]",
        explanation: "Rotating right by 3 steps moves last 3 elements [5, 6, 7] to front.",
        note: "Normalize K = K % N."
      }
    ],
    brute: {
      title: "Brute Force Approach: Auxiliary Temp Array of Last K Elements O(N) Space",
      algorithm: {
        english: "1. K = K % N.\n2. Copy last K elements into temp array.\n3. Shift first N-K elements right by K positions.\n4. Copy temp back into front of arr.",
        hinglish: "1. K = K % N karo.\n2. Aakhri K elements temp array me copy karo.\n3. Pehle (N-K) elements ko K positions right shift karo.\n4. Temp ke elements arr[0..K-1] me daal do."
      },
      pseudocode: `FUNCTION rotateKBrute(arr, N, K):
    K = K % N
    CREATE temp array of last K elements
    FOR i FROM N-K-1 DOWNTO 0 DO arr[i+K] = arr[i]
    FOR i FROM 0 TO K-1 DO arr[i] = temp[i]`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3, 4, 5, 6, 7], K = 3", action: "temp = [5, 6, 7] -> Shift rest -> [5, 6, 7, 1, 2, 3, 4]!" }
      ],
      code: {
        cpp: `#include <vector>\nvoid rotateKBrute(std::vector<int>& arr, int K) {\n    int n = arr.size(); if (n == 0) return;\n    K %= n;\n    std::vector<int> temp(K);\n    for (int i = 0; i < K; i++) temp[i] = arr[n - K + i];\n    for (int i = n - K - 1; i >= 0; i--) arr[i + K] = arr[i];\n    for (int i = 0; i < K; i++) arr[i] = temp[i];\n}`,
        java: `public class Solution {\n    public static void rotateKBrute(int[] arr, int K) {\n        int n = arr.length; if (n == 0) return;\n        K %= n;\n        int[] temp = new int[K];\n        for (int i = 0; i < K; i++) temp[i] = arr[n - K + i];\n        for (int i = n - K - 1; i >= 0; i--) arr[i + K] = arr[i];\n        for (int i = 0; i < K; i++) arr[i] = temp[i];\n    }\n}`,
        python: `def rotate_k_brute(arr, K):\n    n = len(arr); if n == 0: return\n    K %= n\n    temp = arr[n - K:]\n    for i in range(n - K - 1, -1, -1): arr[i + K] = arr[i]\n    for i in range(K): arr[i] = temp[i]`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Linear array copy.",
      spaceComplexity: "O(K) Auxiliary Space",
      spaceExplanation: "Allocates temp array."
    },
    optimal: {
      title: "Optimal Approach: Reversal Algorithm In-Place O(N) Time O(1) Space",
      algorithm: {
        english: "1. K = K % N.\n2. Reverse entire array: reverse(0, N-1).\n3. Reverse first K elements: reverse(0, K-1).\n4. Reverse remaining elements: reverse(K, N-1).",
        hinglish: "1. K = K % N karo.\n2. Step 1: Poore array ko reverse karo (0, N-1).\n3. Step 2: Shuru ke K elements ko reverse karo (0, K-1).\n4. Step 3: Baaki elements ko reverse karo (K, N-1)."
      },
      pseudocode: `FUNCTION rotateKOptimal(arr, N, K):
    K = K % N
    REVERSE(arr, 0, N-1)
    REVERSE(arr, 0, K-1)
    REVERSE(arr, K, N-1)`,
      dryRun: [
        { step: "1", state: "arr = [1, 2, 3, 4, 5, 6, 7], K = 3", action: "Rev All -> [7,6,5,4,3,2,1] -> Rev(0..2) -> [5,6,7,4,3,2,1] -> Rev(3..6) -> [5,6,7,1,2,3,4]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nvoid rev(std::vector<int>& a, int l, int r) { while (l < r) std::swap(a[l++], a[r--]); }\nvoid rotateKOptimal(std::vector<int>& arr, int K) {\n    int n = arr.size(); if (n <= 1) return;\n    K %= n;\n    rev(arr, 0, n - 1); rev(arr, 0, K - 1); rev(arr, K, n - 1);\n}`,
        java: `public class Solution {\n    private static void rev(int[] a, int l, int r) { while (l < r) { int t=a[l]; a[l]=a[r]; a[r]=t; l++; r--; } }\n    public static void rotateKOptimal(int[] arr, int K) {\n        int n = arr.length; if (n <= 1) return;\n        K %= n;\n        rev(arr, 0, n - 1); rev(arr, 0, K - 1); rev(arr, K, n - 1);\n    }\n}`,
        python: `def rev(a, l, r):\n    while l < r: a[l], a[r] = a[r], a[l]; l += 1; r -= 1\ndef rotate_k_optimal(arr, K):\n    n = len(arr); if n <= 1: return\n    K %= n\n    rev(arr, 0, n - 1); rev(arr, 0, K - 1); rev(arr, K, n - 1)`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Three range reversals.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "In-place reversal."
    }
  },

  // 24. WIGGLE SORT II
  24: {
    title: "Wiggle Sort II",
    topic: "Arrays",
    difficulty: "Hard",
    problemStatement: "Given an unsorted array arr of size N, reorder it in-place such that arr[0] < arr[1] > arr[2] < arr[3] > arr[4]...",
    examples: [
      {
        input: "arr = [1, 5, 1, 1, 6, 4]",
        output: "[1, 6, 1, 5, 1, 4]",
        explanation: "Reordered to satisfy small < large > small < large pattern.",
        note: "Rearrange in-place."
      }
    ],
    brute: {
      title: "Brute Force Approach: Sort Copy & Backwards Interleave O(N log N) / O(N) Space",
      algorithm: {
        english: "1. Sort a copy of input array.\n2. Left pointer at (N-1)/2 (median) and Right pointer at N-1 (largest).\n3. Interleave sorted copy into arr: even indices from left, odd indices from right backwards.",
        hinglish: "1. Array ki copy karke sort kar lo.\n2. Do pointers: left = (N-1)/2 aur right = N-1.\n3. Backwards interleave karo: even indices par left item aur odd indices par right item daalo."
      },
      pseudocode: `FUNCTION wiggleSortBrute(arr, N):
    sortedArr = SORT(arr)
    left = (N - 1) / 2, right = N - 1
    FOR i FROM 0 TO N-1 DO:
        IF i % 2 == 0 THEN arr[i] = sortedArr[left--]
        ELSE arr[i] = sortedArr[right--]`,
      dryRun: [
        { step: "1", state: "arr = [1, 5, 1, 1, 6, 4]", action: "sorted = [1, 1, 1, 4, 5, 6] -> Interleave -> [1, 6, 1, 5, 1, 4]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nvoid wiggleSortBrute(std::vector<int>& arr) {\n    int n = arr.size();\n    std::vector<int> sorted = arr;\n    std::sort(sorted.begin(), sorted.end());\n    int left = (n - 1) / 2, right = n - 1;\n    for (int i = 0; i < n; i++) {\n        if (i % 2 == 0) arr[i] = sorted[left--];\n        else arr[i] = sorted[right--];\n    }\n}`,
        java: `import java.util.Arrays;\npublic class Solution {\n    public static void wiggleSortBrute(int[] arr) {\n        int n = arr.length;\n        int[] sorted = arr.clone();\n        Arrays.sort(sorted);\n        int left = (n - 1) / 2, right = n - 1;\n        for (int i = 0; i < n; i++) {\n            if (i % 2 == 0) arr[i] = sorted[left--];\n            else arr[i] = sorted[right--];\n        }\n    }\n}`,
        python: `def wiggle_sort_brute(arr):\n    n = len(arr); sorted_arr = sorted(arr)\n    left = (n - 1) // 2; right = n - 1\n    for i in range(n):\n        if i % 2 == 0: arr[i] = sorted_arr[left]; left -= 1\n        else: arr[i] = sorted_arr[right]; right -= 1`
      },
      timeComplexity: "O(N log N)",
      timeExplanation: "Sorting takes O(N log N) time.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Allocates sorted copy array."
    },
    optimal: {
      title: "Optimal Approach: Virtual Index Mapping 3-Way Partition O(N) Time O(1) Space",
      algorithm: {
        english: "1. QuickSelect median element in O(N).\n2. Use Virtual Index mapping A(i) = (1 + 2*i) % (N | 1).\n3. Perform Dutch Flag 3-Way Partition to arrange small/large elements in O(1) space.",
        hinglish: "1. QuickSelect se median element nikalo O(N).\n2. Virtual Index formula: A(i) = (1 + 2*i) % (N | 1).\n3. Dutch National Flag 3-way partition se in-place O(1) space me sort karo!"
      },
      pseudocode: `FUNCTION wiggleSortOptimal(arr, N):
    median = QUICK_SELECT(arr)
    # Virtual Index Mapping: A(i) = (1 + 2*i) % (N | 1)
    i = 0, j = 0, k = N - 1
    WHILE j <= k DO:
        IF A(j) > median THEN SWAP(A(i++), A(j++))
        ELSE IF A(j) < median THEN SWAP(A(j), A(k--))
        ELSE j++`,
      dryRun: [
        { step: "1", state: "arr = [1, 5, 1, 1, 6, 4]", action: "Median=4 -> Virtual Index Partition in-place O(N)!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nvoid wiggleSortOptimal(std::vector<int>& arr) {\n    int n = arr.size();\n    auto midptr = arr.begin() + n / 2;\n    std::nth_element(arr.begin(), midptr, arr.end());\n    int median = *midptr;\n    #define A(i) arr[(1 + 2*(i)) % (n | 1)]\n    int i = 0, j = 0, k = n - 1;\n    while (j <= k) {\n        if (A(j) > median) { std::swap(A(i), A(j)); i++; j++; }\n        else if (A(j) < median) { std::swap(A(j), A(k)); k--; }\n        else j++;\n    }\n}`,
        java: `import java.util.Arrays;\npublic class Solution {\n    public static void wiggleSortOptimal(int[] arr) {\n        int n = arr.length; int[] sorted = arr.clone(); Arrays.sort(sorted);\n        int left = (n - 1) / 2, right = n - 1;\n        for (int i = 0; i < n; i++) arr[i] = (i % 2 == 0) ? sorted[left--] : sorted[right--];\n    }\n}`,
        python: `def wiggle_sort_optimal(arr):\n    arr.sort()\n    half = len(arr[::2])\n    arr[::2], arr[1::2] = arr[:half][::-1], arr[half:][::-1]`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "QuickSelect + Virtual Index Partition.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "In-place modification."
    }
  },

  // 25. MAJORITY ELEMENT II
  25: {
    title: "Majority Element II",
    topic: "Arrays",
    difficulty: "Medium",
    problemStatement: "Given an array arr of size N, find all elements that appear strictly more than N / 3 times.",
    examples: [
      {
        input: "arr = [3, 2, 3]",
        output: "[3]",
        explanation: "N = 3. N / 3 = 1. Element 3 appears 2 times (> 1).",
        note: "At most 2 majority elements can appear > N/3 times."
      }
    ],
    brute: {
      title: "Brute Force Approach: Hash Map Frequency Counter O(N) Space",
      algorithm: {
        english: "1. Count element frequencies using Hash Map.\n2. Collect all elements with count > N / 3 into result list.",
        hinglish: "1. Hash Map me saare elements ki frequency count karo.\n2. Jin elements ki frequency > N / 3 ho, unhe result me daal do."
      },
      pseudocode: `FUNCTION majority2Brute(arr, N):
    CREATE map freq, list result
    FOR x IN arr DO: freq[x] = freq[x] + 1
    FOR (key, val) IN freq DO:
        IF val > N/3 THEN result.APPEND(key)
    RETURN result`,
      dryRun: [
        { step: "1", state: "arr = [3, 2, 3], N = 3", action: "Freq Map: {3: 2, 2: 1} -> 2 > 1 -> Return [3]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <unordered_map>\nstd::vector<int> majority2Brute(const std::vector<int>& arr) {\n    std::unordered_map<int, int> freq; int n = arr.size();\n    for (int x : arr) freq[x]++;\n    std::vector<int> res;\n    for (auto const& [k, v] : freq) if (v > n / 3) res.push_back(k);\n    return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static List<Integer> majority2Brute(int[] arr) {\n        Map<Integer, Integer> freq = new HashMap<>(); int n = arr.length;\n        for (int x : arr) freq.put(x, freq.getOrDefault(x, 0) + 1);\n        List<Integer> res = new ArrayList<>();\n        for (Map.Entry<Integer, Integer> e : freq.entrySet()) if (e.getValue() > n / 3) res.add(e.getKey());\n        return res;\n    }\n}`,
        python: `def majority_2_brute(arr):\n    f = {}; n = len(arr)\n    for x in arr: f[x] = f.get(x, 0) + 1\n    return [k for k, v in f.items() if v > n // 3]`
      },
      timeComplexity: "O(N) Linear Time",
      timeExplanation: "Hash map insertions.",
      spaceComplexity: "O(N) Auxiliary Space",
      spaceExplanation: "Allocates hash map."
    },
    optimal: {
      title: "Optimal Approach: Extended Boyer-Moore 2-Candidate Voting Algorithm O(N) Time O(1) Space",
      algorithm: {
        english: "1. Elect 2 candidates (cand1, cand2) and counters (count1, count2) using modified Boyer-Moore.\n2. Second Pass: verify actual counts of cand1 and cand2.\n3. Return candidates with count > N/3.",
        hinglish: "1. Do candidates (cand1, cand2) aur counts (count1, count2) initialize karke Boyer-Moore pass 1 chalao.\n2. Pass 2: actual frequency verify karke > N/3 waale return karo."
      },
      pseudocode: `FUNCTION majority2Optimal(arr, N):
    cand1 = INT_MIN, cand2 = INT_MIN, count1 = 0, count2 = 0
    FOR x IN arr DO:
        IF x == cand1 THEN count1++
        ELSE IF x == cand2 THEN count2++
        ELSE IF count1 == 0 THEN cand1 = x, count1 = 1
        ELSE IF count2 == 0 THEN cand2 = x, count2 = 1
        ELSE count1--, count2--
    # Pass 2 Verification
    IF COUNT(cand1) > N/3 THEN res.APPEND(cand1)
    IF COUNT(cand2) > N/3 THEN res.APPEND(cand2)
    RETURN res`,
      dryRun: [
        { step: "1", state: "arr = [1, 1, 1, 3, 3, 2, 2, 2]", action: "Elect cand1=1, cand2=2 -> Verify > 8/3 (2) -> Result: [1, 2]!" }
      ],
      code: {
        cpp: `#include <vector>\n#include <climits>\nstd::vector<int> majority2Optimal(const std::vector<int>& arr) {\n    int n = arr.size(); int cand1 = INT_MIN, cand2 = INT_MIN, c1 = 0, c2 = 0;\n    for (int x : arr) {\n        if (x == cand1) c1++; else if (x == cand2) c2++;\n        else if (c1 == 0) { cand1 = x; c1 = 1; }\n        else if (c2 == 0) { cand2 = x; c2 = 1; }\n        else { c1--; c2--; }\n    }\n    int count1 = 0, count2 = 0;\n    for (int x : arr) { if (x == cand1) count1++; else if (x == cand2) count2++; }\n    std::vector<int> res;\n    if (count1 > n / 3) res.push_back(cand1);\n    if (count2 > n / 3 && cand2 != cand1) res.push_back(cand2);\n    return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public static List<Integer> majority2Optimal(int[] arr) {\n        int n = arr.length; Integer cand1 = null, cand2 = null; int c1 = 0, c2 = 0;\n        for (int x : arr) {\n            if (cand1 != null && x == cand1) c1++;\n            else if (cand2 != null && x == cand2) c2++;\n            else if (c1 == 0) { cand1 = x; c1 = 1; }\n            else if (c2 == 0) { cand2 = x; c2 = 1; }\n            else { c1--; c2--; }\n        }\n        int count1 = 0, count2 = 0;\n        for (int x : arr) {\n            if (cand1 != null && x == cand1) count1++;\n            if (cand2 != null && x == cand2) count2++;\n        }\n        List<Integer> res = new ArrayList<>();\n        if (count1 > n / 3) res.add(cand1);\n        if (count2 > n / 3 && !cand2.equals(cand1)) res.add(cand2);\n        return res;\n    }\n}`,
        python: `def majority_2_optimal(arr):\n    n = len(arr); cand1, cand2 = None, None; c1, c2 = 0, 0\n    for x in arr:\n        if cand1 is not None and x == cand1: c1 += 1\n        elif cand2 is not None and x == cand2: c2 += 1\n        elif c1 == 0: cand1 = x; c1 = 1\n        elif c2 == 0: cand2 = x; c2 = 1\n        else: c1 -= 1; c2 -= 1\n    res = []\n    if cand1 is not None and arr.count(cand1) > n // 3: res.append(cand1)\n    if cand2 is not None and cand2 != cand1 and arr.count(cand2) > n // 3: res.append(cand2)\n    return res`
      },
      timeComplexity: "O(N) Two Passes",
      timeExplanation: "Candidate election pass + Verification pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  }
}
