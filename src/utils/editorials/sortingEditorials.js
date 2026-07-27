export const sortingEditorials = {
  // 112. LINEAR SEARCH
  112: {
    title: "Linear Search",
    topic: "Sorting Fundamentals",
    difficulty: "Easy",
    problemStatement: "Given an array arr[] sorted in ascending order of size N and an integer K. Check if K is present in the array or not. (Here, the problem name says Linear Search, but it's a basic array traversal).",
    examples: [ { input: "arr = [1, 2, 3, 4, 6], K = 6", output: "1", explanation: "6 is present in the array." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N)",
      algorithm: { english: "Iterate through the array from start to end. If the current element equals K, return 1 (true). If loop ends without finding K, return -1 (false).", hinglish: "Array ke shuru se end tak ek-ek karke check karo. Agar K mil jaye, toh 1 return karo. Warna -1." },
      pseudocode: `FUNCTION searchInSorted(arr, N, K):\n  FOR i FROM 0 TO N-1:\n    IF arr[i] == K: RETURN 1\n  RETURN -1`,
      dryRun: [ { step: "1", state: "arr=[1,2,3,4,6], K=6", action: "Check 1, 2, 3, 4... Found 6 at index 4! Return 1." } ],
      code: {
        cpp: `int searchInSorted(int arr[], int N, int K) {\n    for (int i = 0; i < N; i++) {\n        if (arr[i] == K) return 1;\n    }\n    return -1;\n}`,
        java: `class Solution {\n    static int searchInSorted(int arr[], int N, int K) {\n        for (int i = 0; i < N; i++) {\n            if (arr[i] == K) return 1;\n        }\n        return -1;\n    }\n}`,
        python: `def searchInSorted(arr, N, K):\n    for num in arr:\n        if num == K: return 1\n    return -1`
      },
      timeComplexity: "O(N)", timeExplanation: "Visits every element once in worst case.", spaceComplexity: "O(1)", spaceExplanation: "No extra space."
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "Since the array is sorted, use Binary Search. Find the middle element, compare with K, and halve the search space accordingly.", hinglish: "Kyunki array sorted hai, Binary Search use kar sakte hain. Middle se check karo aur adha array discard karte jao." },
      pseudocode: `FUNCTION binarySearch(arr, N, K):\n  low = 0, high = N-1\n  WHILE low <= high:\n    mid = (low + high) / 2\n    IF arr[mid] == K: RETURN 1\n    IF arr[mid] < K: low = mid + 1\n    ELSE: high = mid - 1\n  RETURN -1`,
      dryRun: [ { step: "1", state: "arr=[1,2,3,4,6], K=6", action: "mid=3 (arr[3]=4). 4 < 6, search right. mid=4 (arr[4]=6). Found!" } ],
      code: {
        cpp: `int searchInSorted(int arr[], int N, int K) {\n    int low = 0, high = N - 1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] == K) return 1;\n        if(arr[mid] < K) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
        java: `class Solution {\n    static int searchInSorted(int arr[], int N, int K) {\n        int low = 0, high = N - 1;\n        while(low <= high) {\n            int mid = low + (high - low) / 2;\n            if(arr[mid] == K) return 1;\n            if(arr[mid] < K) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n}`,
        python: `def searchInSorted(arr, N, K):\n    low, high = 0, N - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == K: return 1\n        elif arr[mid] < K: low = mid + 1\n        else: high = mid - 1\n    return -1`
      },
      timeComplexity: "O(log N)", timeExplanation: "Binary Search halves the search space.", spaceComplexity: "O(1)", spaceExplanation: "No extra space."
    }
  },

  // 113. SORT AN ARRAY
  113: {
    title: "Sort An Array (Implement Merge / Quick Sort)",
    topic: "Sorting Fundamentals",
    difficulty: "Medium",
    problemStatement: "Given an array of integers nums, sort the array in ascending order and return it. You must solve the problem without using any built-in functions in O(n log(n)) time complexity and with the smallest space complexity possible.",
    examples: [ { input: "nums = [5,2,3,1]", output: "[1,2,3,5]", explanation: "Sorted in ascending order." } ],
    brute: {
      title: "Brute Force Approach: Bubble Sort / Insertion Sort O(N²)",
      algorithm: { english: "Use a simple sorting algorithm like Bubble Sort, repeatedly swapping adjacent elements if they are in the wrong order.", hinglish: "Bubble Sort ya Insertion Sort jaisi basic N^2 sorting use karo." },
      pseudocode: `FUNCTION bubbleSort(nums):\n  n = length(nums)\n  FOR i FROM 0 TO n-1:\n    FOR j FROM 0 TO n-i-2:\n      IF nums[j] > nums[j+1]: SWAP(nums[j], nums[j+1])\n  RETURN nums`,
      dryRun: [ { step: "1", state: "nums=[5,2,3,1]", action: "Swaps cause largest elements to bubble to the end." } ],
      code: {
        cpp: `// Time Limit Exceeded for large inputs!\nvector<int> sortArray(vector<int>& nums) {\n    int n = nums.size();\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<n-i-1; j++) {\n            if(nums[j] > nums[j+1]) swap(nums[j], nums[j+1]);\n        }\n    }\n    return nums;\n}`,
        java: `public int[] sortArray(int[] nums) {\n    int n = nums.length;\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<n-i-1; j++) {\n            if(nums[j] > nums[j+1]) { int t=nums[j]; nums[j]=nums[j+1]; nums[j+1]=t; }\n        }\n    }\n    return nums;\n}`,
        python: `def sortArray(nums):\n    n = len(nums)\n    for i in range(n):\n        for j in range(n-i-1):\n            if nums[j] > nums[j+1]: nums[j], nums[j+1] = nums[j+1], nums[j]\n    return nums`
      },
      timeComplexity: "O(N²)", timeExplanation: "Two nested loops.", spaceComplexity: "O(1)", spaceExplanation: "In-place."
    },
    optimal: {
      title: "Optimal Approach: Merge Sort O(N log N)",
      algorithm: { english: "Divide the array into two halves, recursively sort them, and then merge the two sorted halves in linear time.", hinglish: "Array ko 2 hisso me todo, dono ko sort karo recursion se, aur fir dono sorted hisso ko merge kar lo." },
      pseudocode: `FUNCTION mergeSort(nums, l, r):\n  IF l >= r: RETURN\n  mid = l + (r - l) / 2\n  mergeSort(nums, l, mid)\n  mergeSort(nums, mid+1, r)\n  merge(nums, l, mid, r)`,
      dryRun: [ { step: "1", state: "nums=[5,2,3,1]", action: "Divide to [5,2] and [3,1]. Sort to [2,5] and [1,3]. Merge to [1,2,3,5]." } ],
      code: {
        cpp: `void merge(vector<int>& nums, int l, int mid, int r) {\n    vector<int> temp;\n    int left=l, right=mid+1;\n    while(left<=mid && right<=r) {\n        if(nums[left] <= nums[right]) temp.push_back(nums[left++]);\n        else temp.push_back(nums[right++]);\n    }\n    while(left<=mid) temp.push_back(nums[left++]);\n    while(right<=r) temp.push_back(nums[right++]);\n    for(int i=l; i<=r; i++) nums[i] = temp[i-l];\n}\nvoid mergeSort(vector<int>& nums, int l, int r) {\n    if(l >= r) return;\n    int mid = l + (r-l)/2;\n    mergeSort(nums, l, mid);\n    mergeSort(nums, mid+1, r);\n    merge(nums, l, mid, r);\n}\nvector<int> sortArray(vector<int>& nums) {\n    mergeSort(nums, 0, nums.size()-1);\n    return nums;\n}`,
        java: `private void merge(int[] nums, int l, int mid, int r) {\n    int[] temp = new int[r-l+1];\n    int left=l, right=mid+1, k=0;\n    while(left<=mid && right<=r) {\n        if(nums[left] <= nums[right]) temp[k++] = nums[left++];\n        else temp[k++] = nums[right++];\n    }\n    while(left<=mid) temp[k++] = nums[left++];\n    while(right<=r) temp[k++] = nums[right++];\n    for(int i=0; i<k; i++) nums[l+i] = temp[i];\n}\nprivate void mergeSort(int[] nums, int l, int r) {\n    if(l >= r) return;\n    int mid = l + (r-l)/2;\n    mergeSort(nums, l, mid);\n    mergeSort(nums, mid+1, r);\n    merge(nums, l, mid, r);\n}\npublic int[] sortArray(int[] nums) {\n    mergeSort(nums, 0, nums.length-1);\n    return nums;\n}`,
        python: `def sortArray(nums):\n    if len(nums) <= 1: return nums\n    mid = len(nums)//2\n    L = sortArray(nums[:mid])\n    R = sortArray(nums[mid:])\n    res, i, j = [], 0, 0\n    while i < len(L) and j < len(R):\n        if L[i] <= R[j]: res.append(L[i]); i += 1\n        else: res.append(R[j]); j += 1\n    res.extend(L[i:])\n    res.extend(R[j:])\n    return res`
      },
      timeComplexity: "O(N log N)", timeExplanation: "Dividing array takes logN steps, merging takes N time per step.", spaceComplexity: "O(N)", spaceExplanation: "Temporary array for merging."
    }
  },

  // 114. SORT ARRAY BY PARITY
  114: {
    title: "Sort Array By Parity",
    topic: "Sorting Fundamentals",
    difficulty: "Easy",
    problemStatement: "Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers. Return any array that satisfies this condition.",
    examples: [ { input: "nums = [3,1,2,4]", output: "[2,4,3,1]", explanation: "The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted." } ],
    brute: {
      title: "Brute Force Approach: Two Pass O(N)",
      algorithm: { english: "Create a new array. First, iterate through nums and append all even numbers. Then, iterate again and append all odd numbers.", hinglish: "Ek naya array banao. Pehle loop me saare even numbers daalo. Dusre loop me saare odd numbers daalo." },
      pseudocode: `FUNCTION sortArrayByParity(nums):\n  res = []\n  FOR num IN nums: IF num % 2 == 0: res.append(num)\n  FOR num IN nums: IF num % 2 != 0: res.append(num)\n  RETURN res`,
      dryRun: [ { step: "1", state: "nums=[3,1,2,4]", action: "Evens: [2,4]. Odds: [3,1]. Result: [2,4,3,1]" } ],
      code: {
        cpp: `vector<int> sortArrayByParity(vector<int>& nums) {\n    vector<int> res;\n    for(int n : nums) if(n % 2 == 0) res.push_back(n);\n    for(int n : nums) if(n % 2 != 0) res.push_back(n);\n    return res;\n}`,
        java: `public int[] sortArrayByParity(int[] nums) {\n    int[] res = new int[nums.length];\n    int k = 0;\n    for(int n : nums) if(n % 2 == 0) res[k++] = n;\n    for(int n : nums) if(n % 2 != 0) res[k++] = n;\n    return res;\n}`,
        python: `def sortArrayByParity(nums):\n    res = []\n    for n in nums: \n        if n % 2 == 0: res.append(n)\n    for n in nums: \n        if n % 2 != 0: res.append(n)\n    return res`
      },
      timeComplexity: "O(N)", timeExplanation: "Two passes over the array.", spaceComplexity: "O(N)", spaceExplanation: "Result array."
    },
    optimal: {
      title: "Optimal Approach: Two Pointers In-Place O(N)",
      algorithm: { english: "Use two pointers, left starting at 0 and right at end. If left is even, just increment left. If right is odd, decrement right. If left is odd and right is even, swap them.", hinglish: "Left se even dhoondo, right se odd. Agar ulta ho (left par odd, right par even), toh dono ko swap kar do!" },
      pseudocode: `FUNCTION sortArrayByParity(nums):\n  l = 0, r = len(nums)-1\n  WHILE l < r:\n    IF nums[l] % 2 != 0 AND nums[r] % 2 == 0:\n      SWAP(nums[l], nums[r])\n    IF nums[l] % 2 == 0: l++\n    IF nums[r] % 2 != 0: r--\n  RETURN nums`,
      dryRun: [ { step: "1", state: "nums=[3,1,2,4]", action: "l=0 (3), r=3 (4). Swap! -> [4,1,2,3]. l=1 (1), r=2 (2). Swap! -> [4,2,1,3]." } ],
      code: {
        cpp: `vector<int> sortArrayByParity(vector<int>& nums) {\n    int l = 0, r = nums.size() - 1;\n    while (l < r) {\n        if (nums[l] % 2 != 0 && nums[r] % 2 == 0) swap(nums[l], nums[r]);\n        if (nums[l] % 2 == 0) l++;\n        if (nums[r] % 2 != 0) r--;\n    }\n    return nums;\n}`,
        java: `public int[] sortArrayByParity(int[] nums) {\n    int l = 0, r = nums.length - 1;\n    while (l < r) {\n        if (nums[l] % 2 != 0 && nums[r] % 2 == 0) {\n            int temp = nums[l]; nums[l] = nums[r]; nums[r] = temp;\n        }\n        if (nums[l] % 2 == 0) l++;\n        if (nums[r] % 2 != 0) r--;\n    }\n    return nums;\n}`,
        python: `def sortArrayByParity(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        if nums[l] % 2 != 0 and nums[r] % 2 == 0:\n            nums[l], nums[r] = nums[r], nums[l]\n        if nums[l] % 2 == 0: l += 1\n        if nums[r] % 2 != 0: r -= 1\n    return nums`
      },
      timeComplexity: "O(N)", timeExplanation: "Array is traversed once.", spaceComplexity: "O(1)", spaceExplanation: "In-place swaps."
    }
  },

  // 115. MAXIMUM GAP
  115: {
    title: "Maximum Gap",
    topic: "Sorting Fundamentals",
    difficulty: "Hard",
    problemStatement: "Given an integer array nums, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return 0. You must write an algorithm that runs in linear time and uses linear extra space.",
    examples: [ { input: "nums = [3,6,9,1]", output: "3", explanation: "Sorted: [1,3,6,9]. Max gap is between 3 and 6, or 6 and 9 (diff = 3)." } ],
    brute: {
      title: "Brute Force Approach: Sort the Array O(N log N)",
      algorithm: { english: "Sort the array in ascending order. Then iterate through the array and find the maximum difference between adjacent elements.", hinglish: "Seedha array sort kar lo. Fir adjacent elements subtract karke max nikal lo." },
      pseudocode: `FUNCTION maximumGap(nums):\n  IF length < 2: RETURN 0\n  SORT(nums)\n  maxGap = 0\n  FOR i FROM 1 TO N-1:\n    maxGap = MAX(maxGap, nums[i] - nums[i-1])\n  RETURN maxGap`,
      dryRun: [ { step: "1", state: "nums=[3,6,9,1]", action: "Sort -> [1,3,6,9]. Gaps: 2, 3, 3. Max = 3." } ],
      code: {
        cpp: `#include <algorithm>\nint maximumGap(vector<int>& nums) {\n    if(nums.size() < 2) return 0;\n    sort(nums.begin(), nums.end());\n    int maxG = 0;\n    for(int i=1; i<nums.size(); i++) maxG = max(maxG, nums[i] - nums[i-1]);\n    return maxG;\n}`,
        java: `import java.util.Arrays;\npublic class Solution {\n    public int maximumGap(int[] nums) {\n        if(nums.length < 2) return 0;\n        Arrays.sort(nums);\n        int maxG = 0;\n        for(int i=1; i<nums.length; i++) maxG = Math.max(maxG, nums[i] - nums[i-1]);\n        return maxG;\n    }\n}`,
        python: `def maximumGap(nums):\n    if len(nums) < 2: return 0\n    nums.sort()\n    return max(nums[i] - nums[i-1] for i in range(1, len(nums)))`
      },
      timeComplexity: "O(N log N)", timeExplanation: "Sorting takes N log N time. Problem requires O(N).", spaceComplexity: "O(1) or O(N)", spaceExplanation: "Depends on sorting algorithm used."
    },
    optimal: {
      title: "Optimal Approach: Pigeonhole / Bucket Sort O(N)",
      algorithm: { english: "Find min and max values. Create buckets of size \`ceil((max-min)/(n-1))\`. The max gap will never be between elements in the same bucket, but between max of one bucket and min of the next non-empty bucket.", hinglish: "Min aur Max nikal ke buckets banao jinka size average gap se zyada ho. Isse sabse bada gap hamesha 2 alag buckets ke beech aayega." },
      pseudocode: `FUNCTION maximumGap(nums):\n  minV = MIN(nums), maxV = MAX(nums)\n  bucketSize = MAX(1, (maxV - minV) / (N - 1))\n  bucketCount = (maxV - minV) / bucketSize + 1\n  // Populate buckets with min and max for each\n  FOR num IN nums: bucket = (num - minV)/bucketSize; update bucket min/max\n  // Calculate max gap across non-empty buckets\n  maxGap = 0, prevMax = minV\n  FOR bucket IN buckets:\n    IF empty: CONTINUE\n    maxGap = MAX(maxGap, bucket.min - prevMax)\n    prevMax = bucket.max\n  RETURN maxGap`,
      dryRun: [ { step: "1", state: "nums=[3,6,9,1]", action: "min=1, max=9. Bucket size=(9-1)/3 = 2. Place in buckets and find max gap!" } ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nint maximumGap(vector<int>& nums) {\n    int n = nums.size(); if(n < 2) return 0;\n    int minV = *min_element(nums.begin(), nums.end());\n    int maxV = *max_element(nums.begin(), nums.end());\n    if(minV == maxV) return 0;\n    int bSize = max(1, (maxV - minV) / (n - 1));\n    int bCount = (maxV - minV) / bSize + 1;\n    vector<int> bMin(bCount, INT_MAX), bMax(bCount, INT_MIN);\n    for(int num : nums) {\n        int idx = (num - minV) / bSize;\n        bMin[idx] = min(bMin[idx], num);\n        bMax[idx] = max(bMax[idx], num);\n    }\n    int maxGap = 0, prevMax = minV;\n    for(int i=0; i<bCount; i++) {\n        if(bMin[i] == INT_MAX) continue;\n        maxGap = max(maxGap, bMin[i] - prevMax);\n        prevMax = bMax[i];\n    }\n    return maxGap;\n}`,
        java: `import java.util.Arrays;\npublic class Solution {\n    public int maximumGap(int[] nums) {\n        int n = nums.length; if(n < 2) return 0;\n        int minV = nums[0], maxV = nums[0];\n        for(int num : nums) { minV = Math.min(minV, num); maxV = Math.max(maxV, num); }\n        if(minV == maxV) return 0;\n        int bSize = Math.max(1, (maxV - minV) / (n - 1));\n        int bCount = (maxV - minV) / bSize + 1;\n        int[] bMin = new int[bCount]; Arrays.fill(bMin, Integer.MAX_VALUE);\n        int[] bMax = new int[bCount]; Arrays.fill(bMax, Integer.MIN_VALUE);\n        for(int num : nums) {\n            int idx = (num - minV) / bSize;\n            bMin[idx] = Math.min(bMin[idx], num);\n            bMax[idx] = Math.max(bMax[idx], num);\n        }\n        int maxGap = 0, prevMax = minV;\n        for(int i=0; i<bCount; i++) {\n            if(bMin[i] == Integer.MAX_VALUE) continue;\n            maxGap = Math.max(maxGap, bMin[i] - prevMax);\n            prevMax = bMax[i];\n        }\n        return maxGap;\n    }\n}`,
        python: `def maximumGap(nums):\n    if len(nums) < 2: return 0\n    minV, maxV, n = min(nums), max(nums), len(nums)\n    if minV == maxV: return 0\n    bSize = max(1, (maxV - minV) // (n - 1))\n    bCount = (maxV - minV) // bSize + 1\n    bMin = [float('inf')] * bCount\n    bMax = [float('-inf')] * bCount\n    for num in nums:\n        idx = (num - minV) // bSize\n        bMin[idx] = min(bMin[idx], num)\n        bMax[idx] = max(bMax[idx], num)\n    maxGap, prevMax = 0, minV\n    for i in range(bCount):\n        if bMin[i] == float('inf'): continue\n        maxGap = max(maxGap, bMin[i] - prevMax)\n        prevMax = bMax[i]\n    return maxGap`
      },
      timeComplexity: "O(N)", timeExplanation: "Array parsed a constant number of times.", spaceComplexity: "O(N)", spaceExplanation: "Space for Buckets."
    }
  },

  // 116. SORT ELEMENTS BY DECREASING FREQUENCY
  116: {
    title: "Sort Elements by Decreasing Frequency",
    topic: "Custom Comparator Sorting",
    difficulty: "Medium",
    problemStatement: "Given an array of integers nums, sort the array in decreasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.",
    examples: [ { input: "nums = [1,1,2,2,2,3]", output: "[2,2,2,1,1,3]", explanation: "2 has freq 3, 1 has freq 2, 3 has freq 1." } ],
    brute: {
      title: "Optimal Approach: HashMap + Custom Sort O(N log N)",
      algorithm: { english: "1. Count the frequency of each element using a hash map.\n2. Sort the array using a custom comparator: if frequencies are different, sort by frequency (descending). If frequencies are same, sort by value (descending).", hinglish: "1. Hash map me sabki frequency count karo.\n2. Custom sort lagao: agar frequency alag hai toh jiski zyada frequency wo pehle. Agar frequency same hai, toh jiski value badi wo pehle." },
      pseudocode: `FUNCTION frequencySort(nums):\n  freqMap = COUNT_FREQ(nums)\n  SORT nums USING COMP(a, b):\n    IF freqMap[a] != freqMap[b]: RETURN freqMap[a] > freqMap[b]\n    ELSE: RETURN a > b\n  RETURN nums`,
      dryRun: [ { step: "1", state: "nums=[1,1,2,2,2,3]", action: "Freq: 1->2, 2->3, 3->1. Sorted by freq descending." } ],
      code: {
        cpp: `#include <vector>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\nvector<int> frequencySort(vector<int>& nums) {\n    unordered_map<int, int> freq;\n    for(int n : nums) freq[n]++;\n    sort(nums.begin(), nums.end(), [&](int a, int b) {\n        if(freq[a] == freq[b]) return a > b;\n        return freq[a] > freq[b];\n    });\n    return nums;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public int[] frequencySort(int[] nums) {\n        Map<Integer, Integer> freq = new HashMap<>();\n        for(int n : nums) freq.put(n, freq.getOrDefault(n, 0) + 1);\n        List<Integer> list = new ArrayList<>();\n        for(int n : nums) list.add(n);\n        Collections.sort(list, (a, b) -> {\n            if(freq.get(a).equals(freq.get(b))) return b - a;\n            return freq.get(b) - freq.get(a);\n        });\n        for(int i=0; i<nums.length; i++) nums[i] = list.get(i);\n        return nums;\n    }\n}`,
        python: `import collections\ndef frequencySort(nums):\n    freq = collections.Counter(nums)\n    return sorted(nums, key=lambda x: (-freq[x], -x))`
      },
      timeComplexity: "O(N log N)", timeExplanation: "Sorting takes N log N time.", spaceComplexity: "O(N)", spaceExplanation: "Hash map takes extra space."
    },
    optimal: {
      title: "Same as above", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "O(N log N)", timeExplanation: "-", spaceComplexity: "O(N)", spaceExplanation: "-"
    }
  },

  // 117. REORDER DATA IN LOG FILES
  117: {
    title: "Reorder Data In Log Files",
    topic: "Custom Comparator Sorting",
    difficulty: "Medium",
    problemStatement: "You have an array of logs. Each log is a space delimited string of words. There are letter-logs (words) and digit-logs (numbers). Reorder the logs so that all letter-logs come before digit-logs. Letter-logs are sorted lexicographically by their contents. If contents are the same, sort them lexicographically by their identifiers. Digit-logs maintain their relative ordering.",
    examples: [ { input: "logs = [\"dig1 8 1 5 1\",\"let1 art can\",\"dig2 3 6\",\"let2 own kit dig\",\"let3 art zero\"]", output: "[\"let1 art can\",\"let3 art zero\",\"let2 own kit dig\",\"dig1 8 1 5 1\",\"dig2 3 6\"]", explanation: "Letter-logs are sorted by content, then identifier. Digit-logs stay in original order." } ],
    brute: {
      title: "Optimal Approach: Custom Sorting O(N log N * L)",
      algorithm: { english: "Separate into two lists or use a custom comparator. For comparator: if both are letter logs, compare content, then identifier. If one is letter and one is digit, letter comes first. If both are digit, keep original order.", hinglish: "Comparator likho. Agar dono letter log hain, toh content se sort karo, fir ID se. Agar ek letter ek digit hai, toh letter pehle. Dono digit hain toh same order (0 return karo)." },
      pseudocode: `FUNCTION reorderLogFiles(logs):\n  SORT logs USING COMP(log1, log2):\n    split1 = log1.split(" ", 1), split2 = log2.split(" ", 1)\n    isDigit1 = split1[1][0].isDigit()\n    isDigit2 = split2[1][0].isDigit()\n    IF !isDigit1 AND !isDigit2:\n      cmp = split1[1].compareTo(split2[1])\n      IF cmp != 0: RETURN cmp\n      RETURN split1[0].compareTo(split2[0])\n    IF !isDigit1 AND isDigit2: RETURN -1\n    IF isDigit1 AND !isDigit2: RETURN 1\n    RETURN 0`,
      dryRun: [ { step: "1", state: "logs=[\"dig1 8\", \"let1 art\"]", action: "let1 is letter, dig1 is digit. let1 comes first." } ],
      code: {
        cpp: `#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nvector<string> reorderLogFiles(vector<string>& logs) {\n    stable_sort(logs.begin(), logs.end(), [](const string& a, const string& b) {\n        int i1 = a.find(' '), i2 = b.find(' ');\n        bool isDigit1 = isdigit(a[i1 + 1]), isDigit2 = isdigit(b[i2 + 1]);\n        if (!isDigit1 && !isDigit2) {\n            string content1 = a.substr(i1 + 1), content2 = b.substr(i2 + 1);\n            if (content1 == content2) return a.substr(0, i1) < b.substr(0, i2);\n            return content1 < content2;\n        }\n        if (!isDigit1) return true;\n        if (!isDigit2) return false;\n        return false; // Stable sort keeps original order for digit logs\n    });\n    return logs;\n}`,
        java: `import java.util.Arrays;\npublic class Solution {\n    public String[] reorderLogFiles(String[] logs) {\n        Arrays.sort(logs, (log1, log2) -> {\n            int split1 = log1.indexOf(" "), split2 = log2.indexOf(" ");\n            String id1 = log1.substring(0, split1), id2 = log2.substring(0, split2);\n            String content1 = log1.substring(split1 + 1), content2 = log2.substring(split2 + 1);\n            boolean isDigit1 = Character.isDigit(content1.charAt(0));\n            boolean isDigit2 = Character.isDigit(content2.charAt(0));\n            if(!isDigit1 && !isDigit2) {\n                int cmp = content1.compareTo(content2);\n                if(cmp != 0) return cmp;\n                return id1.compareTo(id2);\n            }\n            if(!isDigit1 && isDigit2) return -1;\n            if(isDigit1 && !isDigit2) return 1;\n            return 0;\n        });\n        return logs;\n    }\n}`,
        python: `def reorderLogFiles(logs):\n    letters, digits = [], []\n    for log in logs:\n        if log.split()[1].isdigit(): digits.append(log)\n        else: letters.append(log)\n    letters.sort(key=lambda x: (x.split()[1:], x.split()[0]))\n    return letters + digits`
      },
      timeComplexity: "O(N log N * L)", timeExplanation: "L is max length of a log. Sorting string comparisons take O(L).", spaceComplexity: "O(N * L)", spaceExplanation: "Temporary space for log contents."
    },
    optimal: {
      title: "Same as above", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "O(N log N * L)", timeExplanation: "-", spaceComplexity: "O(N * L)", spaceExplanation: "-"
    }
  },

  // 118. MERGE INTERVALS
  118: {
    title: "Merge Intervals",
    topic: "Advanced Sorting",
    difficulty: "Medium",
    problemStatement: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [ { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Intervals [1,3] and [2,6] overlap, so merge them into [1,6]." } ],
    brute: {
      title: "Brute Force Approach: Check all pairs O(N²)",
      algorithm: { english: "For each interval, check if it overlaps with any other. If so, merge them, remove the old ones, add the new one. Keep doing until no merges happen.", hinglish: "Har interval ko baki sabse check karo. Agar overlap ho raha hai toh merge karo. Bahut inefficient process hai." },
      pseudocode: `FUNCTION mergeIntervals(intervals):\n  WHILE TRUE:\n    merged = FALSE\n    FOR i FROM 0 TO N-1:\n      FOR j FROM i+1 TO N-1:\n        IF overlaps(intervals[i], intervals[j]):\n          merge intervals[i] and intervals[j]\n          merged = TRUE\n    IF NOT merged: BREAK\n  RETURN intervals`,
      dryRun: [],
      code: {
        cpp: `// Very complex to implement cleanly, not recommended.`,
        java: `// Very complex to implement cleanly, not recommended.`,
        python: `# Very complex to implement cleanly, not recommended.`
      },
      timeComplexity: "O(N²)", timeExplanation: "Multiple passes.", spaceComplexity: "O(1)", spaceExplanation: "Modifying in place."
    },
    optimal: {
      title: "Optimal Approach: Sort and Merge O(N log N)",
      algorithm: { english: "1. Sort the intervals based on their start times.\n2. Initialize a result list with the first interval.\n3. Iterate through intervals. If the current interval overlaps with the last interval in the result (curr.start <= last.end), merge them by updating last.end = MAX(last.end, curr.end).\n4. If no overlap, add the current interval to the result list.", hinglish: "1. Pehle start time se sort karo.\n2. Result list me pehla interval daalo.\n3. Aage ke intervals check karo. Agar curr.start pichle wale ke end se chota ya barabar hai, matlab overlap hai. Dono ko merge kar do (end time max kar do).\n4. Warna naya interval result me daal do." },
      pseudocode: `FUNCTION mergeIntervals(intervals):\n  SORT intervals BY start_time\n  res = [ intervals[0] ]\n  FOR i FROM 1 TO N-1:\n    last = res.back()\n    curr = intervals[i]\n    IF curr.start <= last.end:\n      last.end = MAX(last.end, curr.end)\n    ELSE:\n      res.append(curr)\n  RETURN res`,
      dryRun: [ { step: "1", state: "intervals=[[1,3],[2,6],[8,10]]", action: "Sort: same. res=[[1,3]]. curr=[2,6]. 2 <= 3, merge -> [1,6]. curr=[8,10]. 8 > 6, add -> [[1,6], [8,10]]." } ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nvector<vector<int>> merge(vector<vector<int>>& intervals) {\n    if (intervals.empty()) return {};\n    sort(intervals.begin(), intervals.end());\n    vector<vector<int>> res;\n    res.push_back(intervals[0]);\n    for (int i = 1; i < intervals.size(); i++) {\n        if (intervals[i][0] <= res.back()[1]) res.back()[1] = max(res.back()[1], intervals[i][1]);\n        else res.push_back(intervals[i]);\n    }\n    return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public int[][] merge(int[][] intervals) {\n        if(intervals.length == 0) return new int[0][];\n        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);\n        List<int[]> res = new ArrayList<>();\n        res.add(intervals[0]);\n        for(int i = 1; i < intervals.length; i++) {\n            int[] last = res.get(res.size() - 1);\n            if(intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n            else res.add(intervals[i]);\n        }\n        return res.toArray(new int[res.size()][]);\n    }\n}`,
        python: `def merge(intervals):\n    if not intervals: return []\n    intervals.sort(key=lambda x: x[0])\n    res = [intervals[0]]\n    for i in range(1, len(intervals)):\n        if intervals[i][0] <= res[-1][1]: res[-1][1] = max(res[-1][1], intervals[i][1])\n        else: res.append(intervals[i])\n    return res`
      },
      timeComplexity: "O(N log N)", timeExplanation: "Sorting takes N log N. One pass takes O(N).", spaceComplexity: "O(N)", spaceExplanation: "Result array size."
    }
  },

  // 119. COUNT INVERSIONS
  119: {
    title: "Count Inversions (Merge Sort)",
    topic: "Advanced Sorting",
    difficulty: "Hard",
    problemStatement: "Given an array of integers. Find the Inversion Count in the array. Two elements a[i] and a[j] form an inversion if a[i] > a[j] and i < j.",
    examples: [ { input: "arr = [2, 4, 1, 3, 5]", output: "3", explanation: "Inversions: (2,1), (4,1), (4,3)." } ],
    brute: {
      title: "Brute Force Approach: Nested Loops O(N²)",
      algorithm: { english: "Use two nested loops. For every element, count how many elements to its right are strictly smaller.", hinglish: "Har element ke liye loop chala kar check karo ki aage kitne elements usse chote hain." },
      pseudocode: `FUNCTION countInversions(arr):\n  count = 0\n  FOR i FROM 0 TO N-1:\n    FOR j FROM i+1 TO N-1:\n      IF arr[i] > arr[j]: count++\n  RETURN count`,
      dryRun: [ { step: "1", state: "arr=[2,4,1]", action: "i=0(2), 1 is smaller. count=1. i=1(4), 1 is smaller. count=2. Total 2 inversions." } ],
      code: {
        cpp: `int countInversionsBrute(int arr[], int n) {\n    int count = 0;\n    for(int i=0; i<n; i++) {\n        for(int j=i+1; j<n; j++) {\n            if(arr[i] > arr[j]) count++;\n        }\n    }\n    return count;\n}`,
        java: `public class Solution {\n    public int countInversionsBrute(int[] arr) {\n        int count = 0;\n        for(int i=0; i<arr.length; i++) {\n            for(int j=i+1; j<arr.length; j++) {\n                if(arr[i] > arr[j]) count++;\n            }\n        }\n        return count;\n    }\n}`,
        python: `def countInversionsBrute(arr):\n    count = 0\n    for i in range(len(arr)):\n        for j in range(i+1, len(arr)):\n            if arr[i] > arr[j]: count += 1\n    return count`
      },
      timeComplexity: "O(N²)", timeExplanation: "Two nested loops.", spaceComplexity: "O(1)", spaceExplanation: "No extra space."
    },
    optimal: {
      title: "Optimal Approach: Modified Merge Sort O(N log N)",
      algorithm: { english: "Use Merge Sort. While merging two sorted halves L and R, if L[i] > R[j], then all elements in L from i to mid are strictly greater than R[j]. Thus, we add (mid - i + 1) to our inversion count.", hinglish: "Merge Sort use karo. Jab left aur right half merge kar rahe ho, agar L[i] > R[j] ho, toh matlab L me i se aage wale sabhi elements bhi R[j] se bade honge. Sidha (mid - i + 1) count me add kardo!" },
      pseudocode: `FUNCTION mergeAndCount(arr, l, mid, r):\n  count = 0\n  WHILE i <= mid AND j <= r:\n    IF arr[i] <= arr[j]: temp.append(arr[i++])\n    ELSE:\n      temp.append(arr[j++])\n      count += (mid - i + 1) // IMPORTANT!\n  RETURN count`,
      dryRun: [ { step: "1", state: "L=[2,4], R=[1,3]", action: "L[0]=2 > R[0]=1. Inversions += (1-0+1) = 2. L[0]=2 <= R[1]=3. L[1]=4 > R[1]=3. Inversions += (1-1+1) = 1. Total = 3." } ],
      code: {
        cpp: `#include <vector>\nusing namespace std;\nlong long merge(int arr[], int l, int mid, int r) {\n    vector<int> temp;\n    int i = l, j = mid + 1;\n    long long count = 0;\n    while(i <= mid && j <= r) {\n        if(arr[i] <= arr[j]) temp.push_back(arr[i++]);\n        else { temp.push_back(arr[j++]); count += (mid - i + 1); }\n    }\n    while(i <= mid) temp.push_back(arr[i++]);\n    while(j <= r) temp.push_back(arr[j++]);\n    for(int k=l; k<=r; k++) arr[k] = temp[k-l];\n    return count;\n}\nlong long mergeSort(int arr[], int l, int r) {\n    long long count = 0;\n    if(l < r) {\n        int mid = l + (r-l)/2;\n        count += mergeSort(arr, l, mid);\n        count += mergeSort(arr, mid+1, r);\n        count += merge(arr, l, mid, r);\n    }\n    return count;\n}\nlong long countInversions(int arr[], int n) {\n    return mergeSort(arr, 0, n-1);\n}`,
        java: `public class Solution {\n    private long merge(int[] arr, int l, int mid, int r) {\n        int[] temp = new int[r - l + 1];\n        int i = l, j = mid + 1, k = 0;\n        long count = 0;\n        while(i <= mid && j <= r) {\n            if(arr[i] <= arr[j]) temp[k++] = arr[i++];\n            else { temp[k++] = arr[j++]; count += (mid - i + 1); }\n        }\n        while(i <= mid) temp[k++] = arr[i++];\n        while(j <= r) temp[k++] = arr[j++];\n        for(k=0; k<temp.length; k++) arr[l+k] = temp[k];\n        return count;\n    }\n    private long mergeSort(int[] arr, int l, int r) {\n        long count = 0;\n        if(l < r) {\n            int mid = l + (r-l)/2;\n            count += mergeSort(arr, l, mid);\n            count += mergeSort(arr, mid+1, r);\n            count += merge(arr, l, mid, r);\n        }\n        return count;\n    }\n    public long countInversions(int[] arr) {\n        return mergeSort(arr, 0, arr.length - 1);\n    }\n}`,
        python: `def mergeAndCount(arr, temp, l, mid, r):\n    i, j, k = l, mid + 1, l\n    count = 0\n    while i <= mid and j <= r:\n        if arr[i] <= arr[j]: temp[k] = arr[i]; i+=1; k+=1\n        else: temp[k] = arr[j]; count += (mid - i + 1); j+=1; k+=1\n    while i <= mid: temp[k] = arr[i]; i+=1; k+=1\n    while j <= r: temp[k] = arr[j]; j+=1; k+=1\n    for p in range(l, r+1): arr[p] = temp[p]\n    return count\n\ndef mergeSort(arr, temp, l, r):\n    count = 0\n    if l < r:\n        mid = (l + r) // 2\n        count += mergeSort(arr, temp, l, mid)\n        count += mergeSort(arr, temp, mid+1, r)\n        count += mergeAndCount(arr, temp, l, mid, r)\n    return count\n\ndef countInversions(arr):\n    return mergeSort(arr, [0]*len(arr), 0, len(arr)-1)`
      },
      timeComplexity: "O(N log N)", timeExplanation: "Merge Sort complexity.", spaceComplexity: "O(N)", spaceExplanation: "Temporary array for merging."
    }
  },

  // 120. REVERSE PAIRS
  120: {
    title: "Reverse Pairs (Merge Sort)",
    topic: "Advanced Sorting",
    difficulty: "Hard",
    problemStatement: "Given an integer array nums, return the number of reverse pairs in the array. A reverse pair is a pair (i, j) where 0 <= i < j < nums.length and nums[i] > 2 * nums[j].",
    examples: [ { input: "nums = [1,3,2,3,1]", output: "2", explanation: "The reverse pairs are: (1, 4) --> nums[1]=3 > 2*nums[4]=2, and (3, 4) --> nums[3]=3 > 2*nums[4]=2." } ],
    brute: {
      title: "Brute Force Approach: Nested Loops O(N²)",
      algorithm: { english: "Use two nested loops. Check every pair if nums[i] > 2 * nums[j].", hinglish: "Har jode ke liye check karo. Agar condition milti hai, count badhao." },
      pseudocode: `FUNCTION reversePairs(nums):\n  count = 0\n  FOR i FROM 0 TO N-1:\n    FOR j FROM i+1 TO N-1:\n      IF nums[i] > 2LL * nums[j]: count++\n  RETURN count`,
      dryRun: [ { step: "1", state: "nums=[2,4,3,5,1]", action: "Check condition for all. e.g. 4 > 2*1, 3 > 2*1, 5 > 2*1. Count=3." } ],
      code: {
        cpp: `int reversePairsBrute(vector<int>& nums) {\n    int count = 0;\n    for(int i=0; i<nums.size(); i++) {\n        for(int j=i+1; j<nums.size(); j++) {\n            if(nums[i] > 2LL * nums[j]) count++;\n        }\n    }\n    return count;\n}`,
        java: `public int reversePairsBrute(int[] nums) {\n    int count = 0;\n    for(int i=0; i<nums.length; i++) {\n        for(int j=i+1; j<nums.length; j++) {\n            if((long)nums[i] > 2L * nums[j]) count++;\n        }\n    }\n    return count;\n}`,
        python: `def reversePairsBrute(nums):\n    count = 0\n    for i in range(len(nums)):\n        for j in range(i+1, len(nums)):\n            if nums[i] > 2 * nums[j]: count += 1\n    return count`
      },
      timeComplexity: "O(N²)", timeExplanation: "Double for loops.", spaceComplexity: "O(1)", spaceExplanation: "In place."
    },
    optimal: {
      title: "Optimal Approach: Modified Merge Sort O(N log N)",
      algorithm: { english: "Similar to Count Inversions, but we do the counting step *before* the merge step. While merging, iterate right pointer until nums[i] > 2 * nums[j], then add j - (mid+1) to count.", hinglish: "Merge Sort use karo, lekin merge karne se thik pehle counting kar lo. Left aur right half sorted hain, toh hum count karna aasan kar sakte hain." },
      pseudocode: `FUNCTION mergeSort(nums, l, r):\n  IF l >= r: RETURN 0\n  mid = l + (r-l)/2\n  count = mergeSort(l, mid) + mergeSort(mid+1, r)\n  j = mid + 1\n  FOR i FROM l TO mid:\n    WHILE j <= r AND nums[i] > 2 * nums[j]: j++\n    count += (j - (mid + 1))\n  merge(nums, l, mid, r)\n  RETURN count`,
      dryRun: [ { step: "1", state: "L=[3], R=[1]", action: "i=0(3), j=1(1). 3 > 2*1. j moves to 2. count += (2-1) = 1. Then merge." } ],
      code: {
        cpp: `#include <vector>\nusing namespace std;\nint merge(vector<int>& nums, int l, int mid, int r) {\n    int count = 0, j = mid + 1;\n    for(int i=l; i<=mid; i++) {\n        while(j <= r && nums[i] > 2LL * nums[j]) j++;\n        count += (j - (mid + 1));\n    }\n    vector<int> temp;\n    int left = l, right = mid + 1;\n    while(left <= mid && right <= r) {\n        if(nums[left] <= nums[right]) temp.push_back(nums[left++]);\n        else temp.push_back(nums[right++]);\n    }\n    while(left <= mid) temp.push_back(nums[left++]);\n    while(right <= r) temp.push_back(nums[right++]);\n    for(int i=l; i<=r; i++) nums[i] = temp[i-l];\n    return count;\n}\nint mergeSort(vector<int>& nums, int l, int r) {\n    if(l >= r) return 0;\n    int mid = l + (r-l)/2;\n    int count = mergeSort(nums, l, mid) + mergeSort(nums, mid+1, r);\n    count += merge(nums, l, mid, r);\n    return count;\n}\nint reversePairs(vector<int>& nums) {\n    return mergeSort(nums, 0, nums.size()-1);\n}`,
        java: `import java.util.*;\npublic class Solution {\n    private int merge(int[] nums, int l, int mid, int r) {\n        int count = 0, j = mid + 1;\n        for(int i=l; i<=mid; i++) {\n            while(j <= r && nums[i] > 2L * nums[j]) j++;\n            count += (j - (mid + 1));\n        }\n        int[] temp = new int[r-l+1];\n        int left=l, right=mid+1, k=0;\n        while(left<=mid && right<=r) {\n            if(nums[left] <= nums[right]) temp[k++] = nums[left++];\n            else temp[k++] = nums[right++];\n        }\n        while(left<=mid) temp[k++] = nums[left++];\n        while(right<=r) temp[k++] = nums[right++];\n        for(int i=0; i<k; i++) nums[l+i] = temp[i];\n        return count;\n    }\n    private int mergeSort(int[] nums, int l, int r) {\n        if(l >= r) return 0;\n        int mid = l + (r-l)/2;\n        int count = mergeSort(nums, l, mid) + mergeSort(nums, mid+1, r);\n        count += merge(nums, l, mid, r);\n        return count;\n    }\n    public int reversePairs(int[] nums) {\n        return mergeSort(nums, 0, nums.length-1);\n    }\n}`,
        python: `def reversePairs(nums):\n    def mergeSort(l, r):\n        if l >= r: return 0\n        mid = (l + r) // 2\n        count = mergeSort(l, mid) + mergeSort(mid+1, r)\n        j = mid + 1\n        for i in range(l, mid + 1):\n            while j <= r and nums[i] > 2 * nums[j]: j += 1\n            count += (j - (mid + 1))\n        nums[l:r+1] = sorted(nums[l:r+1])\n        return count\n    return mergeSort(0, len(nums)-1)`
      },
      timeComplexity: "O(N log N)", timeExplanation: "Merge Sort + Linear Count at each level.", spaceComplexity: "O(N)", spaceExplanation: "Temporary array for merge."
    }
  }
}
