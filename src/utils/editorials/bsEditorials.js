export const bsEditorials = {
  // 65. Search X in sorted array
  65: {
    title: "Search X in sorted array",
    topic: "BS on 1D Array Basics",
    difficulty: "Easy",
    problemStatement: "Given a sorted array arr[] of size N and a number X, find the index of X in the array. If X is not present in the array, return -1.",
    examples: [ { input: "arr = [1, 2, 3, 4, 6], X = 4", output: "3", explanation: "4 is present at index 3." } ],
    brute: {
      title: "Brute Force Approach: Linear Search O(N)",
      algorithm: { english: "Iterate through the array. If arr[i] == X, return i.", hinglish: "Array me ek-ek karke check karo. Jaha X mile uska index return kar do." },
      pseudocode: `FUNCTION search(arr, X):\n  FOR i = 0 TO N-1:\n    IF arr[i] == X: RETURN i\n  RETURN -1`,
      dryRun: [],
      code: {
        cpp: `int search(vector<int>& arr, int x) {\n    for(int i=0; i<arr.size(); i++) if(arr[i] == x) return i;\n    return -1;\n}`,
        java: `public int search(int[] arr, int x) {\n    for(int i=0; i<arr.length; i++) if(arr[i] == x) return i;\n    return -1;\n}`,
        python: `def search(arr, x):\n    for i in range(len(arr)):\n        if arr[i] == x: return i\n    return -1`
      },
      timeComplexity: "O(N)", timeExplanation: "Visits every element.", spaceComplexity: "O(1)", spaceExplanation: "No extra space."
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "Since the array is sorted, use Binary Search. Set low = 0, high = N-1. Check mid, if it's X, return mid. If X > arr[mid], search right half. Else search left half.", hinglish: "Array sorted hai isliye Binary Search lagao. Mid check karo, agar X mid se bada hai toh right side search karo, warna left side." },
      pseudocode: `FUNCTION binarySearch(arr, X):\n  low = 0, high = N-1\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    IF arr[mid] == X: RETURN mid\n    IF arr[mid] < X: low = mid + 1\n    ELSE: high = mid - 1\n  RETURN -1`,
      dryRun: [ { step: "1", state: "arr=[1,2,3,4,6], X=4", action: "low=0, high=4. mid=2(3). 3<4 so low=3. mid=3(4). Found!" } ],
      code: {
        cpp: `int search(vector<int>& arr, int x) {\n    int low = 0, high = arr.size() - 1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] == x) return mid;\n        if(arr[mid] < x) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
        java: `public int search(int[] arr, int x) {\n    int low = 0, high = arr.length - 1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] == x) return mid;\n        if(arr[mid] < x) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
        python: `def search(arr, x):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == x: return mid\n        elif arr[mid] < x: low = mid + 1\n        else: high = mid - 1\n    return -1`
      },
      timeComplexity: "O(log N)", timeExplanation: "Halving search space.", spaceComplexity: "O(1)", spaceExplanation: "No extra space."
    }
  },

  // 66. Lower Bound
  66: {
    title: "Lower Bound",
    topic: "BS on 1D Array Basics",
    difficulty: "Easy",
    problemStatement: "Find the lower bound of X in a sorted array. Lower bound is the index of the first element which is greater than or equal to X (arr[i] >= X).",
    examples: [ { input: "arr = [1, 2, 8, 10, 11, 12, 19], X = 5", output: "2", explanation: "The first element >= 5 is 8 at index 2." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N)",
      algorithm: { english: "Iterate through the array. Return the first index where arr[i] >= X. If not found, return N.", hinglish: "Array traverse karo, pehla element jo X se bada ya barabar ho uska index return kardo." },
      pseudocode: `FUNCTION lowerBound(arr, X):\n  FOR i = 0 TO N-1:\n    IF arr[i] >= X: RETURN i\n  RETURN N`,
      dryRun: [],
      code: {
        cpp: `int lowerBound(vector<int>& arr, int x) {\n    for(int i=0; i<arr.size(); i++) if(arr[i] >= x) return i;\n    return arr.size();\n}`,
        java: `public int lowerBound(int[] arr, int x) {\n    for(int i=0; i<arr.length; i++) if(arr[i] >= x) return i;\n    return arr.length;\n}`,
        python: `def lowerBound(arr, x):\n    for i in range(len(arr)):\n        if arr[i] >= x: return i\n    return len(arr)`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "Use binary search. If arr[mid] >= X, it can be the answer, so save mid and search left to find a smaller index. If arr[mid] < X, search right.", hinglish: "BS lagao. Agar arr[mid] >= X, toh yeh ek possible answer hai (save it), aur uske left me aur chota index dhundho. Agar chota hai toh right jao." },
      pseudocode: `FUNCTION lowerBound(arr, X):\n  low = 0, high = N-1, ans = N\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    IF arr[mid] >= X:\n      ans = mid; high = mid - 1\n    ELSE: low = mid + 1\n  RETURN ans`,
      dryRun: [ { step: "1", state: "arr=[1,2,8,10], X=5", action: "mid=1(2) < 5 -> low=2. mid=2(8) >= 5 -> ans=2, high=1. Loop ends. ans=2." } ],
      code: {
        cpp: `int lowerBound(vector<int>& arr, int x) {\n    int low = 0, high = arr.size() - 1, ans = arr.size();\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] >= x) { ans = mid; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        java: `public int lowerBound(int[] arr, int x) {\n    int low = 0, high = arr.length - 1, ans = arr.length;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] >= x) { ans = mid; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        python: `def lowerBound(arr, x):\n    low, high, ans = 0, len(arr) - 1, len(arr)\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] >= x:\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans`
      },
      timeComplexity: "O(log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 67. Upper Bound
  67: {
    title: "Upper Bound",
    topic: "BS on 1D Array Basics",
    difficulty: "Easy",
    problemStatement: "Find the upper bound of X in a sorted array. Upper bound is the index of the first element which is strictly greater than X (arr[i] > X).",
    examples: [ { input: "arr = [1, 2, 8, 10, 11, 12, 19], X = 5", output: "2", explanation: "The first element strictly greater than 5 is 8 at index 2." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N)",
      algorithm: { english: "Iterate through the array. Return the first index where arr[i] > X. If not found, return N.", hinglish: "Array traverse karo, pehla element jo X se bada (strictly greater) ho uska index return kardo." },
      pseudocode: `FUNCTION upperBound(arr, X):\n  FOR i = 0 TO N-1:\n    IF arr[i] > X: RETURN i\n  RETURN N`,
      dryRun: [],
      code: {
        cpp: `int upperBound(vector<int>& arr, int x) {\n    for(int i=0; i<arr.size(); i++) if(arr[i] > x) return i;\n    return arr.size();\n}`,
        java: `public int upperBound(int[] arr, int x) {\n    for(int i=0; i<arr.length; i++) if(arr[i] > x) return i;\n    return arr.length;\n}`,
        python: `def upperBound(arr, x):\n    for i in range(len(arr)):\n        if arr[i] > x: return i\n    return len(arr)`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "Use binary search. If arr[mid] > X, it can be the answer, so save mid and search left. If arr[mid] <= X, search right.", hinglish: "BS lagao. Agar arr[mid] > X, toh yeh upper bound ho sakta hai (save it), aur uske left me chota index dhundho. Agar chota ya equal hai toh right jao." },
      pseudocode: `FUNCTION upperBound(arr, X):\n  low = 0, high = N-1, ans = N\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    IF arr[mid] > X:\n      ans = mid; high = mid - 1\n    ELSE: low = mid + 1\n  RETURN ans`,
      dryRun: [ { step: "1", state: "arr=[1,2,5,10], X=5", action: "mid=1(2) <= 5 -> low=2. mid=2(5) <= 5 -> low=3. mid=3(10) > 5 -> ans=3, high=2. ans=3." } ],
      code: {
        cpp: `int upperBound(vector<int>& arr, int x) {\n    int low = 0, high = arr.size() - 1, ans = arr.size();\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] > x) { ans = mid; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        java: `public int upperBound(int[] arr, int x) {\n    int low = 0, high = arr.length - 1, ans = arr.length;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] > x) { ans = mid; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        python: `def upperBound(arr, x):\n    low, high, ans = 0, len(arr) - 1, len(arr)\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] > x:\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans`
      },
      timeComplexity: "O(log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 68. Search insert position
  68: {
    title: "Search insert position",
    topic: "BS on 1D Array Basics",
    difficulty: "Easy",
    problemStatement: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. (This is exactly the Lower Bound).",
    examples: [ { input: "nums = [1,3,5,6], target = 5", output: "2", explanation: "Found at index 2." }, { input: "nums = [1,3,5,6], target = 2", output: "1", explanation: "Not found. 2 would be inserted at index 1." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N)",
      algorithm: { english: "Same as Lower Bound. Find first element >= target.", hinglish: "Lower bound wala hi same approach. Pehla bada ya barabar element dhoondo." },
      pseudocode: `Same as Lower Bound`,
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "Exact same algorithm as Lower Bound.", hinglish: "Lower bound ka code likh do, bilkul same question hai." },
      pseudocode: `Same as Lower Bound`,
      dryRun: [],
      code: {
        cpp: `int searchInsert(vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1, ans = nums.size();\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(nums[mid] >= target) { ans = mid; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        java: `public int searchInsert(int[] nums, int target) {\n    int low = 0, high = nums.length - 1, ans = nums.length;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(nums[mid] >= target) { ans = mid; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        python: `def searchInsert(nums, target):\n    low, high, ans = 0, len(nums) - 1, len(nums)\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] >= target:\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans`
      },
      timeComplexity: "O(log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 69. Floor In Sorted Array
  69: {
    title: "Floor In Sorted Array",
    topic: "BS on 1D Array Basics",
    difficulty: "Easy",
    problemStatement: "Find the floor of X in a sorted array. The floor of X is the greatest element in the array which is smaller than or equal to X.",
    examples: [ { input: "arr = [1, 2, 8, 10, 11, 12, 19], X = 5", output: "2", explanation: "The largest element <= 5 is 2." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N)",
      algorithm: { english: "Iterate through the array and keep track of the largest element <= X. Since it's sorted, you can return the last seen element <= X.", hinglish: "Array mein last element dhundho jo X se chota ya barabar ho." },
      pseudocode: `FUNCTION floor(arr, X):\n  ans = -1\n  FOR i = 0 TO N-1:\n    IF arr[i] <= X: ans = arr[i]\n    ELSE: BREAK\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `int getFloor(vector<int>& arr, int x) {\n    int ans = -1;\n    for(int i=0; i<arr.size(); i++) {\n        if(arr[i] <= x) ans = arr[i];\n        else break;\n    }\n    return ans;\n}`,
        java: `public int getFloor(int[] arr, int x) {\n    int ans = -1;\n    for(int i=0; i<arr.length; i++) {\n        if(arr[i] <= x) ans = arr[i];\n        else break;\n    }\n    return ans;\n}`,
        python: `def getFloor(arr, x):\n    ans = -1\n    for num in arr:\n        if num <= x: ans = num\n        else: break\n    return ans`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "Use binary search. If arr[mid] <= X, save arr[mid] as a possible answer and search right to find a greater valid element. If arr[mid] > X, search left.", hinglish: "BS lagao. Agar arr[mid] <= X hai, toh isko save karlo aur right side check karo (maybe isse bada koi mil jaye jo X ke equal/chota ho). Agar bada hai toh left jao." },
      pseudocode: `FUNCTION floor(arr, X):\n  low = 0, high = N-1, ans = -1\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    IF arr[mid] <= X:\n      ans = arr[mid]; low = mid + 1\n    ELSE: high = mid - 1\n  RETURN ans`,
      dryRun: [ { step: "1", state: "arr=[1,2,8,10], X=5", action: "mid=1(2) <= 5 -> ans=2, low=2. mid=2(8) > 5 -> high=1. Loop ends. ans=2." } ],
      code: {
        cpp: `int getFloor(vector<int>& arr, int x) {\n    int low = 0, high = arr.size() - 1, ans = -1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] <= x) { ans = arr[mid]; low = mid + 1; }\n        else high = mid - 1;\n    }\n    return ans;\n}`,
        java: `public int getFloor(int[] arr, int x) {\n    int low = 0, high = arr.length - 1, ans = -1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] <= x) { ans = arr[mid]; low = mid + 1; }\n        else high = mid - 1;\n    }\n    return ans;\n}`,
        python: `def getFloor(arr, x):\n    low, high, ans = 0, len(arr) - 1, -1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] <= x:\n            ans = arr[mid]\n            low = mid + 1\n        else:\n            high = mid - 1\n    return ans`
      },
      timeComplexity: "O(log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 70. Ceil In Sorted Array
  70: {
    title: "Ceil In Sorted Array",
    topic: "BS on 1D Array Basics",
    difficulty: "Easy",
    problemStatement: "Find the ceiling of X in a sorted array. The ceiling of X is the smallest element in the array which is greater than or equal to X. (This is exactly the Lower Bound, but returning the value instead of index).",
    examples: [ { input: "arr = [1, 2, 8, 10, 11, 12, 19], X = 5", output: "8", explanation: "The smallest element >= 5 is 8." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N)",
      algorithm: { english: "Iterate through the array. Return the first element where arr[i] >= X.", hinglish: "Array traverse karo, pehla element jo X se bada ya barabar ho uska value return kardo." },
      pseudocode: `FUNCTION getCeil(arr, X):\n  FOR i = 0 TO N-1:\n    IF arr[i] >= X: RETURN arr[i]\n  RETURN -1`,
      dryRun: [],
      code: {
        cpp: `int getCeil(vector<int>& arr, int x) {\n    for(int i=0; i<arr.size(); i++) if(arr[i] >= x) return arr[i];\n    return -1;\n}`,
        java: `public int getCeil(int[] arr, int x) {\n    for(int i=0; i<arr.length; i++) if(arr[i] >= x) return arr[i];\n    return -1;\n}`,
        python: `def getCeil(arr, x):\n    for num in arr:\n        if num >= x: return num\n    return -1`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "Use binary search. If arr[mid] >= X, save arr[mid] as answer and search left to find an even smaller valid element. If arr[mid] < X, search right.", hinglish: "Lower Bound wala logic. Agar element bada ya equal hai toh save karke left jao." },
      pseudocode: `FUNCTION getCeil(arr, X):\n  low = 0, high = N-1, ans = -1\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    IF arr[mid] >= X:\n      ans = arr[mid]; high = mid - 1\n    ELSE: low = mid + 1\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `int getCeil(vector<int>& arr, int x) {\n    int low = 0, high = arr.size() - 1, ans = -1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] >= x) { ans = arr[mid]; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        java: `public int getCeil(int[] arr, int x) {\n    int low = 0, high = arr.length - 1, ans = -1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] >= x) { ans = arr[mid]; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        python: `def getCeil(arr, x):\n    low, high, ans = 0, len(arr) - 1, -1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] >= x:\n            ans = arr[mid]\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans`
      },
      timeComplexity: "O(log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 71. Guess Number Higher or Lower API
  71: {
    title: "Guess Number Higher or Lower",
    topic: "BS on 1D Array Basics",
    difficulty: "Easy",
    problemStatement: "We are playing a Guess Game. I pick a number from 1 to n. You have to guess which number I picked. You call pre-defined API guess(num) which returns -1, 1, or 0 based on whether the guess is higher, lower, or correct.",
    examples: [ { input: "n = 10, pick = 6", output: "6", explanation: "You guess 5 -> 1 (higher). You guess 7 -> -1 (lower). You guess 6 -> 0 (correct)." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N)",
      algorithm: { english: "Loop from 1 to N and call guess() for each number until it returns 0.", hinglish: "1 se N tak sab numbers try karo." },
      pseudocode: `FUNCTION guessNumber(n):\n  FOR i = 1 TO n:\n    IF guess(i) == 0: RETURN i`,
      dryRun: [],
      code: {
        cpp: `// Time Limit Exceeded`,
        java: `// Time Limit Exceeded`,
        python: `# Time Limit Exceeded`
      },
      timeComplexity: "O(N)", timeExplanation: "Calls API N times.", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "Standard Binary Search. Low is 1, High is n. Check mid. If guess(mid) == 0, return mid. If guess(mid) == 1 (our guess is smaller than pick), search right (low = mid + 1). Else search left.", hinglish: "Low ko 1, High ko n rakho. Mid guess karo. Agar API bole number bada hai, toh right search karo, chota hai toh left search karo." },
      pseudocode: `FUNCTION guessNumber(n):\n  low = 1, high = n\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    res = guess(mid)\n    IF res == 0: RETURN mid\n    IF res == 1: low = mid + 1\n    ELSE: high = mid - 1\n  RETURN -1`,
      dryRun: [],
      code: {
        cpp: `int guessNumber(int n) {\n    int low = 1, high = n;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        int res = guess(mid);\n        if(res == 0) return mid;\n        else if(res == 1) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
        java: `public class Solution extends GuessGame {\n    public int guessNumber(int n) {\n        int low = 1, high = n;\n        while(low <= high) {\n            int mid = low + (high - low) / 2;\n            int res = guess(mid);\n            if(res == 0) return mid;\n            else if(res == 1) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n}`,
        python: `def guessNumber(n):\n    low, high = 1, n\n    while low <= high:\n        mid = (low + high) // 2\n        res = guess(mid)\n        if res == 0: return mid\n        elif res == 1: low = mid + 1\n        else: high = mid - 1\n    return -1`
      },
      timeComplexity: "O(log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 72. First 1 in a Sorted Binary Array
  72: {
    title: "First 1 in a Sorted Binary Array",
    topic: "BS on 1D Array Basics",
    difficulty: "Easy",
    problemStatement: "Given a sorted array consisting of 0s and 1s. The task is to find the index of first 1 in the given array.",
    examples: [ { input: "arr = [0, 0, 0, 1, 1, 1]", output: "3", explanation: "The first 1 is at index 3." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N)",
      algorithm: { english: "Iterate through the array, return the index of the first element that is 1. If not found, return -1.", hinglish: "Array mein loop chala kar pehla 1 dhoondho." },
      pseudocode: `FUNCTION firstOne(arr):\n  FOR i = 0 TO N-1:\n    IF arr[i] == 1: RETURN i\n  RETURN -1`,
      dryRun: [],
      code: {
        cpp: `int firstOne(vector<int>& arr) {\n    for(int i=0; i<arr.size(); i++) if(arr[i] == 1) return i;\n    return -1;\n}`,
        java: `public int firstOne(int[] arr) {\n    for(int i=0; i<arr.length; i++) if(arr[i] == 1) return i;\n    return -1;\n}`,
        python: `def firstOne(arr):\n    for i in range(len(arr)):\n        if arr[i] == 1: return i\n    return -1`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search (Lower Bound of 1) O(log N)",
      algorithm: { english: "Use binary search to find the lower bound of 1. If arr[mid] == 1, save mid as answer and search left. If arr[mid] == 0, search right.", hinglish: "Binary search me lower bound dhoondo. Agar 1 mil jaye toh usse left me aur 1s ho sakte hain, toh left search karo." },
      pseudocode: `FUNCTION firstOne(arr):\n  low = 0, high = N-1, ans = -1\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    IF arr[mid] == 1:\n      ans = mid; high = mid - 1\n    ELSE: low = mid + 1\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `int firstOne(vector<int>& arr) {\n    int low = 0, high = arr.size() - 1, ans = -1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] == 1) { ans = mid; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        java: `public int firstOne(int[] arr) {\n    int low = 0, high = arr.length - 1, ans = -1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] == 1) { ans = mid; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        python: `def firstOne(arr):\n    low, high, ans = 0, len(arr) - 1, -1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == 1:\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans`
      },
      timeComplexity: "O(log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 73. Kth Missing Positive Number
  73: {
    title: "Kth Missing Positive Number",
    topic: "BS on 1D Array Basics",
    difficulty: "Easy",
    problemStatement: "Given an array arr of positive integers strictly increasing, find the kth positive integer that is missing from this array.",
    examples: [ { input: "arr = [2,3,4,7,11], k = 5", output: "9", explanation: "Missing: 1, 5, 6, 8, 9, 10. The 5th missing is 9." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N)",
      algorithm: { english: "Since missing numbers start from 1, if k is less than the current array element, the kth missing number is just k. Otherwise, we increase k by 1 to skip the current element.", hinglish: "Start se iterate karo. Agar arr[i] k se chota ya equal hai, iska matlab ek missing number kam ho gaya (shift ho gaya), toh k ko 1 bada do. Jab loop khatam ho, tab k hi result hai." },
      pseudocode: `FUNCTION findKthPositive(arr, k):\n  FOR i = 0 TO N-1:\n    IF arr[i] <= k: k++\n    ELSE: BREAK\n  RETURN k`,
      dryRun: [ { step: "1", state: "arr=[2,3,4,7], k=5", action: "2<=5 -> k=6. 3<=6 -> k=7. 4<=7 -> k=8. 7<=8 -> k=9. Loop ends. Ans=9." } ],
      code: {
        cpp: `int findKthPositive(vector<int>& arr, int k) {\n    for(int i=0; i<arr.size(); i++) {\n        if(arr[i] <= k) k++;\n        else break;\n    }\n    return k;\n}`,
        java: `public int findKthPositive(int[] arr, int k) {\n    for(int i=0; i<arr.length; i++) {\n        if(arr[i] <= k) k++;\n        else break;\n    }\n    return k;\n}`,
        python: `def findKthPositive(arr, k):\n    for num in arr:\n        if num <= k: k += 1\n        else: break\n    return k`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "The number of missing elements before index i is \`arr[i] - (i + 1)\`. Use binary search to find the index where missing elements are < k. The answer will be \`low + k\`.", hinglish: "Har index pe kitne elements miss hue hain wo \`arr[i] - (i+1)\` hota hai. BS se wo position dhundho jiske pehle wale elements me humara answer fall karega. Answer = low + k." },
      pseudocode: `FUNCTION findKthPositive(arr, k):\n  low = 0, high = N-1\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    missing = arr[mid] - (mid + 1)\n    IF missing < k: low = mid + 1\n    ELSE: high = mid - 1\n  RETURN low + k`,
      dryRun: [],
      code: {
        cpp: `int findKthPositive(vector<int>& arr, int k) {\n    int low = 0, high = arr.size() - 1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        int missing = arr[mid] - (mid + 1);\n        if(missing < k) low = mid + 1;\n        else high = mid - 1;\n    }\n    return low + k;\n}`,
        java: `public int findKthPositive(int[] arr, int k) {\n    int low = 0, high = arr.length - 1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        int missing = arr[mid] - (mid + 1);\n        if(missing < k) low = mid + 1;\n        else high = mid - 1;\n    }\n    return low + k;\n}`,
        python: `def findKthPositive(arr, k):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        missing = arr[mid] - (mid + 1)\n        if missing < k: low = mid + 1\n        else: high = mid - 1\n    return low + k`
      },
      timeComplexity: "O(log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 74. Find minimum in Rotated Sorted Array
  74: {
    title: "Find minimum in Rotated Sorted Array",
    topic: "BS on 1D Array Basics",
    difficulty: "Medium",
    problemStatement: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element of this array. Must run in O(log n) time.",
    examples: [ { input: "nums = [3,4,5,1,2]", output: "1", explanation: "The original array was [1,2,3,4,5] rotated 3 times." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N)",
      algorithm: { english: "Iterate through the array and find the minimum element.", hinglish: "Array mein loop chala kar sabse chota element find kar lo." },
      pseudocode: `FUNCTION findMin(nums):\n  minVal = INF\n  FOR num IN nums:\n    minVal = MIN(minVal, num)\n  RETURN minVal`,
      dryRun: [],
      code: {
        cpp: `int findMin(vector<int>& nums) {\n    int minV = nums[0];\n    for(int n : nums) minV = min(minV, n);\n    return minV;\n}`,
        java: `public int findMin(int[] nums) {\n    int minV = nums[0];\n    for(int n : nums) minV = Math.min(minV, n);\n    return minV;\n}`,
        python: `def findMin(nums):\n    return min(nums)`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "In a rotated sorted array, one half is always sorted. If left half is sorted, the minimum in that half is arr[low]. Record it and move to unsorted right half. If right half is sorted, minimum is arr[mid]. Record it and move to unsorted left half.", hinglish: "Hamesha check karo kaunsa half sorted hai. Agar left sorted hai toh uski start value record karke right half check karo. Agar right sorted hai toh mid value record karke left check karo." },
      pseudocode: `FUNCTION findMin(nums):\n  low = 0, high = N-1, ans = INF\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    IF nums[low] <= nums[mid]: // Left is sorted\n      ans = MIN(ans, nums[low]); low = mid + 1\n    ELSE: // Right is sorted\n      ans = MIN(ans, nums[mid]); high = mid - 1\n  RETURN ans`,
      dryRun: [ { step: "1", state: "nums=[3,4,5,1,2]", action: "mid=2 (5). Left [3,4,5] is sorted. Min so far = 3. Go right: low=3. mid=4 (1). Right is sorted. Min = min(3, 1) = 1. Go left. Done." } ],
      code: {
        cpp: `int findMin(vector<int>& nums) {\n    int low = 0, high = nums.size() - 1, ans = 2e9;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(nums[low] <= nums[high]) { ans = min(ans, nums[low]); break; }\n        if(nums[low] <= nums[mid]) {\n            ans = min(ans, nums[low]);\n            low = mid + 1;\n        } else {\n            ans = min(ans, nums[mid]);\n            high = mid - 1;\n        }\n    }\n    return ans;\n}`,
        java: `public int findMin(int[] nums) {\n    int low = 0, high = nums.length - 1, ans = Integer.MAX_VALUE;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(nums[low] <= nums[high]) { ans = Math.min(ans, nums[low]); break; }\n        if(nums[low] <= nums[mid]) {\n            ans = Math.min(ans, nums[low]);\n            low = mid + 1;\n        } else {\n            ans = Math.min(ans, nums[mid]);\n            high = mid - 1;\n        }\n    }\n    return ans;\n}`,
        python: `def findMin(nums):\n    low, high, ans = 0, len(nums) - 1, float('inf')\n    while low <= high:\n        if nums[low] <= nums[high]:\n            ans = min(ans, nums[low])\n            break\n        mid = (low + high) // 2\n        if nums[low] <= nums[mid]:\n            ans = min(ans, nums[low])\n            low = mid + 1\n        else:\n            ans = min(ans, nums[mid])\n            high = mid - 1\n    return ans`
      },
      timeComplexity: "O(log N)", timeExplanation: "Binary search eliminates half the array.", spaceComplexity: "O(1)", spaceExplanation: "No extra space."
    }
  },

  // 81. Count Negative Numbers in a Sorted Matrix
  81: {
    title: "Count Negative Numbers in a Sorted Matrix",
    topic: "BS on 2D Arrays",
    difficulty: "Easy",
    problemStatement: "Given a m x n matrix grid which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in grid.",
    examples: [ { input: "grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]", output: "8", explanation: "There are 8 negatives number in the matrix." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(M*N)",
      algorithm: { english: "Iterate through every element of the matrix and count if it is less than 0.", hinglish: "Matrix ke har element ko check karo, agar 0 se chota hai toh count badha do." },
      pseudocode: `FUNCTION countNegatives(grid):\n  count = 0\n  FOR i = 0 TO M-1:\n    FOR j = 0 TO N-1:\n      IF grid[i][j] < 0: count++\n  RETURN count`,
      dryRun: [],
      code: {
        cpp: `int countNegatives(vector<vector<int>>& grid) {\n    int count = 0;\n    for(auto& row : grid) {\n        for(int val : row) if(val < 0) count++;\n    }\n    return count;\n}`,
        java: `public int countNegatives(int[][] grid) {\n    int count = 0;\n    for(int[] row : grid) {\n        for(int val : row) if(val < 0) count++;\n    }\n    return count;\n}`,
        python: `def countNegatives(grid):\n    count = 0\n    for row in grid:\n        for val in row:\n            if val < 0: count += 1\n    return count`
      },
      timeComplexity: "O(M * N)", timeExplanation: "Visit every element.", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Staircase Search O(M + N)",
      algorithm: { english: "Start at the top-right corner (row = 0, col = N-1). Since the matrix is sorted in non-increasing order, if the current element is negative, all elements below it in the same column are also negative. Add (M - row) to count and move left (col--). If the element is non-negative, move down (row++).", hinglish: "Top-right corner se shuru karo. Agar element negative hai, toh uske niche wale bhi sab negative honge (count me M-row add kardo) aur left shift ho jao. Agar positive hai, toh niche jao." },
      pseudocode: `FUNCTION countNegatives(grid):\n  count = 0\n  r = 0, c = N - 1\n  WHILE r < M AND c >= 0:\n    IF grid[r][c] < 0:\n      count += (M - r)\n      c--\n    ELSE: r++\n  RETURN count`,
      dryRun: [],
      code: {
        cpp: `int countNegatives(vector<vector<int>>& grid) {\n    int m = grid.size(), n = grid[0].size();\n    int r = 0, c = n - 1, count = 0;\n    while(r < m && c >= 0) {\n        if(grid[r][c] < 0) { count += (m - r); c--; }\n        else { r++; }\n    }\n    return count;\n}`,
        java: `public int countNegatives(int[][] grid) {\n    int m = grid.length, n = grid[0].length;\n    int r = 0, c = n - 1, count = 0;\n    while(r < m && c >= 0) {\n        if(grid[r][c] < 0) { count += (m - r); c--; }\n        else { r++; }\n    }\n    return count;\n}`,
        python: `def countNegatives(grid):\n    m, n = len(grid), len(grid[0])\n    r, c, count = 0, n - 1, 0\n    while r < m and c >= 0:\n        if grid[r][c] < 0:\n            count += (m - r)\n            c -= 1\n        else:\n            r += 1\n    return count`
      },
      timeComplexity: "O(M + N)", timeExplanation: "At most M steps down and N steps left.", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 82. Find row with maximum 1's
  82: {
    title: "Find row with maximum 1's",
    topic: "BS on 2D Arrays",
    difficulty: "Medium",
    problemStatement: "Given a boolean 2D array of n x m dimensions where each row is sorted. Find the 0-based index of the first row that has the maximum number of 1's. If no 1 is found, return -1.",
    examples: [ { input: "Arr = [[0, 1, 1, 1], [0, 0, 1, 1], [1, 1, 1, 1], [0, 0, 0, 0]]", output: "2", explanation: "Row 2 has 4 ones, which is the maximum." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(N * M)",
      algorithm: { english: "Iterate through each row and count the number of 1s. Keep track of the row with the maximum 1s.", hinglish: "Har row me jao aur 1s count karo. Jisme sabse zyada 1s ho usko record karo." },
      pseudocode: `FUNCTION maxOnesRow(arr):\n  maxOnes = 0, maxRow = -1\n  FOR i = 0 TO N-1:\n    ones = 0\n    FOR j = 0 TO M-1:\n      IF arr[i][j] == 1: ones++\n    IF ones > maxOnes: maxOnes = ones; maxRow = i\n  RETURN maxRow`,
      dryRun: [],
      code: {
        cpp: `int rowWithMax1s(vector<vector<int> > arr, int n, int m) {\n    int maxOnes = 0, maxRow = -1;\n    for(int i = 0; i < n; i++) {\n        int ones = 0;\n        for(int j = 0; j < m; j++) if(arr[i][j] == 1) ones++;\n        if(ones > maxOnes) { maxOnes = ones; maxRow = i; }\n    }\n    return maxRow;\n}`,
        java: `public int rowWithMax1s(int arr[][], int n, int m) {\n    int maxOnes = 0, maxRow = -1;\n    for(int i = 0; i < n; i++) {\n        int ones = 0;\n        for(int j = 0; j < m; j++) if(arr[i][j] == 1) ones++;\n        if(ones > maxOnes) { maxOnes = ones; maxRow = i; }\n    }\n    return maxRow;\n}`,
        python: `def rowWithMax1s(arr, n, m):\n    maxOnes, maxRow = 0, -1\n    for i in range(n):\n        ones = sum(arr[i])\n        if ones > maxOnes:\n            maxOnes = ones\n            maxRow = i\n    return maxRow`
      },
      timeComplexity: "O(N * M)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Staircase Search O(N + M)",
      algorithm: { english: "Start at the top-right corner (row = 0, col = M-1). If the current element is 1, it means this row has a 1 at this column, so move left to find more 1s and update maxRow. If it's 0, move down.", hinglish: "Top-right corner se start karo. Agar 1 mile toh usko record karke left check karo aur 1s ke liye. Agar 0 mile, toh matlab is row me aage 1s nahi hain, toh niche wali row me jao." },
      pseudocode: `FUNCTION maxOnesRow(arr):\n  r = 0, c = M - 1, maxRow = -1\n  WHILE r < N AND c >= 0:\n    IF arr[r][c] == 1:\n      maxRow = r; c--\n    ELSE: r++\n  RETURN maxRow`,
      dryRun: [],
      code: {
        cpp: `int rowWithMax1s(vector<vector<int> > arr, int n, int m) {\n    int r = 0, c = m - 1, maxRow = -1;\n    while(r < n && c >= 0) {\n        if(arr[r][c] == 1) { maxRow = r; c--; }\n        else { r++; }\n    }\n    return maxRow;\n}`,
        java: `public int rowWithMax1s(int arr[][], int n, int m) {\n    int r = 0, c = m - 1, maxRow = -1;\n    while(r < n && c >= 0) {\n        if(arr[r][c] == 1) { maxRow = r; c--; }\n        else { r++; }\n    }\n    return maxRow;\n}`,
        python: `def rowWithMax1s(arr, n, m):\n    r, c, maxRow = 0, m - 1, -1\n    while r < n and c >= 0:\n        if arr[r][c] == 1:\n            maxRow = r\n            c -= 1\n        else:\n            r += 1\n    return maxRow`
      },
      timeComplexity: "O(N + M)", timeExplanation: "At most N steps down and M steps left.", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 83. Search a 2D Matrix I
  83: {
    title: "Search a 2D Matrix I",
    topic: "BS on 2D Arrays",
    difficulty: "Medium",
    problemStatement: "Write an efficient algorithm that searches for a value in an m x n matrix. Integers in each row are sorted from left to right. The first integer of each row is greater than the last integer of the previous row.",
    examples: [ { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true", explanation: "3 is in the matrix." } ],
    brute: {
      title: "Brute Force Approach: Linear Search O(M*N)",
      algorithm: { english: "Iterate through the entire matrix to find the target.", hinglish: "Pure matrix me ek ek karke dhundo." },
      pseudocode: `FUNCTION searchMatrix(matrix, target):\n  FOR r IN matrix:\n    FOR c IN r:\n      IF c == target: RETURN TRUE\n  RETURN FALSE`,
      dryRun: [],
      code: {
        cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {\n    for(auto row : matrix) {\n        for(int x : row) if(x == target) return true;\n    }\n    return false;\n}`,
        java: `public boolean searchMatrix(int[][] matrix, int target) {\n    for(int[] row : matrix) {\n        for(int x : row) if(x == target) return true;\n    }\n    return false;\n}`,
        python: `def searchMatrix(matrix, target):\n    for row in matrix:\n        for x in row:\n            if x == target: return True\n    return False`
      },
      timeComplexity: "O(M*N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search (Treat as 1D) O(log(M*N))",
      algorithm: { english: "Since each row continues from the previous, the whole matrix is effectively a single sorted 1D array of size M*N. We can do binary search. The 1D index \`mid\` corresponds to \`matrix[mid / N][mid % N]\`.", hinglish: "Kyunki har row pichle wale se badi hai, hum is pure 2D matrix ko ek bada 1D array maan sakte hain. 1D ke index \`mid\` ko 2D me convert karne ke liye \`row = mid / N\` and \`col = mid % N\` karo." },
      pseudocode: `FUNCTION searchMatrix(matrix, target):\n  low = 0, high = M*N - 1\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    val = matrix[mid / N][mid % N]\n    IF val == target: RETURN TRUE\n    IF val < target: low = mid + 1\n    ELSE: high = mid - 1\n  RETURN FALSE`,
      dryRun: [ { step: "1", state: "matrix(3x4), target=3", action: "low=0, high=11. mid=5. val=matrix[1][1]=11. 11>3 -> high=4. mid=2 -> matrix[0][2]=5 > 3 -> high=1. mid=0 -> val=1 < 3 -> low=1. mid=1 -> val=3 == 3. Found." } ],
      code: {
        cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {\n    int m = matrix.size(), n = matrix[0].size();\n    int low = 0, high = m * n - 1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        int val = matrix[mid / n][mid % n];\n        if(val == target) return true;\n        if(val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}`,
        java: `public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length, n = matrix[0].length;\n    int low = 0, high = m * n - 1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        int val = matrix[mid / n][mid % n];\n        if(val == target) return true;\n        if(val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}`,
        python: `def searchMatrix(matrix, target):\n    m, n = len(matrix), len(matrix[0])\n    low, high = 0, m * n - 1\n    while low <= high:\n        mid = (low + high) // 2\n        val = matrix[mid // n][mid % n]\n        if val == target: return True\n        elif val < target: low = mid + 1\n        else: high = mid - 1\n    return False`
      },
      timeComplexity: "O(log(M * N))", timeExplanation: "Binary search on M*N elements.", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 84. Search a 2D Matrix  II
  84: {
    title: "Search a 2D Matrix II",
    topic: "BS on 2D Arrays",
    difficulty: "Medium",
    problemStatement: "Write an efficient algorithm that searches for a value in an m x n matrix. Integers in each row are sorted in ascending from left to right. Integers in each column are sorted in ascending from top to bottom.",
    examples: [ { input: "matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5", output: "true", explanation: "5 is in the matrix." } ],
    brute: {
      title: "Brute Force Approach: Linear Search O(M*N)",
      algorithm: { english: "Search every element.", hinglish: "Linear search." },
      pseudocode: `Same as 2D Matrix I`,
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "O(M*N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Staircase Search O(M + N)",
      algorithm: { english: "Start at top-right (row = 0, col = N-1). If val == target, return true. If val > target, target must be to the left, so col--. If val < target, target must be below, so row++.", hinglish: "Top-right se shuru karo. Agar value target se badi hai toh left jao (col--). Agar choti hai toh niche jao (row++)." },
      pseudocode: `FUNCTION searchMatrix(matrix, target):\n  r = 0, c = N - 1\n  WHILE r < M AND c >= 0:\n    IF matrix[r][c] == target: RETURN TRUE\n    IF matrix[r][c] > target: c--\n    ELSE: r++\n  RETURN FALSE`,
      dryRun: [ { step: "1", state: "matrix, target=5", action: "Start at 15. 15>5 -> go left to 11. 11>5 -> go left to 7. 7>5 -> go left to 4. 4<5 -> go down to 5. 5==5. Found!" } ],
      code: {
        cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {\n    int m = matrix.size(), n = matrix[0].size();\n    int r = 0, c = n - 1;\n    while(r < m && c >= 0) {\n        if(matrix[r][c] == target) return true;\n        if(matrix[r][c] > target) c--;\n        else r++;\n    }\n    return false;\n}`,
        java: `public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length, n = matrix[0].length;\n    int r = 0, c = n - 1;\n    while(r < m && c >= 0) {\n        if(matrix[r][c] == target) return true;\n        if(matrix[r][c] > target) c--;\n        else r++;\n    }\n    return false;\n}`,
        python: `def searchMatrix(matrix, target):\n    m, n = len(matrix), len(matrix[0])\n    r, c = 0, n - 1\n    while r < m and c >= 0:\n        if matrix[r][c] == target: return True\n        elif matrix[r][c] > target: c -= 1\n        else: r += 1\n    return False`
      },
      timeComplexity: "O(M + N)", timeExplanation: "At most M steps down and N steps left.", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 85. Find Peak Element - II
  85: {
    title: "Find Peak Element - II",
    topic: "BS on 2D Arrays",
    difficulty: "Medium",
    problemStatement: "A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbors to the left, right, top, and bottom. Find a peak element and return its index [i,j].",
    examples: [ { input: "mat = [[1,4],[3,2]]", output: "[0,1]", explanation: "Both 3 and 4 are peak elements so [1,0] and [0,1] are both acceptable answers." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(M*N)",
      algorithm: { english: "Iterate through every element and check its up, down, left, right neighbors.", hinglish: "Har cell pe jaake uske 4 neighbors check karo ki kya wo sabse bada hai." },
      pseudocode: `FUNCTION findPeakGrid(mat):\n  FOR i = 0 TO M-1:\n    FOR j = 0 TO N-1:\n      IF mat[i][j] > all valid neighbors: RETURN [i, j]\n  RETURN [-1, -1]`,
      dryRun: [],
      code: {
        cpp: `// Simple double loop implementation`,
        java: `// Simple double loop implementation`,
        python: `# Simple double loop implementation`
      },
      timeComplexity: "O(M * N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Columns O(M * log(N))",
      algorithm: { english: "Binary search on columns. Find the max element in the middle column. If its left neighbor is greater, the peak must be in the left half. If right neighbor is greater, peak is in the right half. Else, it's a peak.", hinglish: "Columns pe BS lagao. Mid column me sabse bada element dhundho. Agar uske left wala usse bada hai, toh left half me answer hoga. Right wala bada hai toh right half me. Warna yahi peak hai." },
      pseudocode: `FUNCTION findPeakGrid(mat):\n  low = 0, high = N - 1\n  WHILE low <= high:\n    midCol = low + (high - low) / 2\n    maxRow = index of max element in midCol\n    leftIsBigger = (midCol > 0 && mat[maxRow][midCol - 1] > mat[maxRow][midCol])\n    rightIsBigger = (midCol < N-1 && mat[maxRow][midCol + 1] > mat[maxRow][midCol])\n    IF !leftIsBigger AND !rightIsBigger: RETURN [maxRow, midCol]\n    IF leftIsBigger: high = midCol - 1\n    ELSE: low = midCol + 1\n  RETURN [-1, -1]`,
      dryRun: [],
      code: {
        cpp: `vector<int> findPeakGrid(vector<vector<int>>& mat) {\n    int m = mat.size(), n = mat[0].size();\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int midCol = low + (high - low) / 2;\n        int maxRow = 0;\n        for (int i = 0; i < m; i++) {\n            if (mat[i][midCol] > mat[maxRow][midCol]) maxRow = i;\n        }\n        bool leftIsBigger = midCol - 1 >= 0 && mat[maxRow][midCol - 1] > mat[maxRow][midCol];\n        bool rightIsBigger = midCol + 1 < n && mat[maxRow][midCol + 1] > mat[maxRow][midCol];\n        if (!leftIsBigger && !rightIsBigger) return {maxRow, midCol};\n        else if (leftIsBigger) high = midCol - 1;\n        else low = midCol + 1;\n    }\n    return {-1, -1};\n}`,
        java: `public int[] findPeakGrid(int[][] mat) {\n    int m = mat.length, n = mat[0].length;\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int midCol = low + (high - low) / 2;\n        int maxRow = 0;\n        for (int i = 0; i < m; i++) {\n            if (mat[i][midCol] > mat[maxRow][midCol]) maxRow = i;\n        }\n        boolean leftIsBigger = midCol - 1 >= 0 && mat[maxRow][midCol - 1] > mat[maxRow][midCol];\n        boolean rightIsBigger = midCol + 1 < n && mat[maxRow][midCol + 1] > mat[maxRow][midCol];\n        if (!leftIsBigger && !rightIsBigger) return new int[]{maxRow, midCol};\n        else if (leftIsBigger) high = midCol - 1;\n        else low = midCol + 1;\n    }\n    return new int[]{-1, -1};\n}`,
        python: `def findPeakGrid(mat):\n    m, n = len(mat), len(mat[0])\n    low, high = 0, n - 1\n    while low <= high:\n        midCol = (low + high) // 2\n        maxRow = 0\n        for i in range(m):\n            if mat[i][midCol] > mat[maxRow][midCol]: maxRow = i\n        leftIsBigger = midCol - 1 >= 0 and mat[maxRow][midCol - 1] > mat[maxRow][midCol]\n        rightIsBigger = midCol + 1 < n and mat[maxRow][midCol + 1] > mat[maxRow][midCol]\n        if not leftIsBigger and not rightIsBigger: return [maxRow, midCol]\n        elif leftIsBigger: high = midCol - 1\n        else: low = midCol + 1\n    return [-1, -1]`
      },
      timeComplexity: "O(M * log N)", timeExplanation: "Binary search on N columns. For each column we take O(M) time to find max.", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 86. Median in a row-wise sorted Matrix
  86: {
    title: "Median in a row-wise sorted Matrix",
    topic: "BS on 2D Arrays",
    difficulty: "Hard",
    problemStatement: "Given a row wise sorted matrix of size R*C where R and C are always odd, find the median of the matrix.",
    examples: [ { input: "matrix = [[1, 3, 5], [2, 6, 9], [3, 6, 9]]", output: "5", explanation: "Sorting all elements we get 1, 2, 3, 3, 5, 6, 6, 9, 9. Median is 5." } ],
    brute: {
      title: "Brute Force Approach: Flatten and Sort O(R*C log(R*C))",
      algorithm: { english: "Put all elements in a 1D array, sort it, and return the middle element.", hinglish: "Sab elements ko ek array me daalo, sort kardo, aur beech wala element nikal lo." },
      pseudocode: `FUNCTION findMedian(matrix):\n  arr = []\n  FOR row IN matrix: FOR x IN row: arr.append(x)\n  SORT(arr)\n  RETURN arr[ (R*C) / 2 ]`,
      dryRun: [],
      code: {
        cpp: `int median(vector<vector<int>> &matrix, int R, int C) {\n    vector<int> arr;\n    for(auto &r : matrix) for(int x : r) arr.push_back(x);\n    sort(arr.begin(), arr.end());\n    return arr[(R*C)/2];\n}`,
        java: `import java.util.Arrays;\npublic class Solution {\n    public int median(int matrix[][], int R, int C) {\n        int[] arr = new int[R*C];\n        int k = 0;\n        for(int[] r : matrix) for(int x : r) arr[k++] = x;\n        Arrays.sort(arr);\n        return arr[(R*C)/2];\n    }\n}`,
        python: `def median(matrix, R, C):\n    arr = []\n    for row in matrix: arr.extend(row)\n    arr.sort()\n    return arr[(R*C)//2]`
      },
      timeComplexity: "O(R*C log(R*C))", timeExplanation: "Sorting takes dominant time.", spaceComplexity: "O(R*C)", spaceExplanation: "1D Array space."
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(R * log C * log(MAX-MIN))",
      algorithm: { english: "We know median will be between Min and Max of matrix. Do Binary Search on this range. For a mid value, count how many elements in the matrix are <= mid (using upper_bound in each row). If count <= (R*C)/2, median is greater, so low = mid + 1. Else high = mid - 1.", hinglish: "Median matrix ke (min, max) range ke beech hoga. Is range par Binary search lagao. Ek \`mid\` lo, fir count karo ki kitne elements us mid se chhote ya barabar hain (har row me binary search (upper bound) lagakar). Agar count (R*C)/2 se kam/barabar hai toh answer bada hoga, warna chota." },
      pseudocode: `FUNCTION countSmallerEqual(row, val):\n  RETURN upperBound(row, val)\n\nFUNCTION median(matrix, R, C):\n  low = 1, high = 1e9\n  req = (R * C) / 2\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    count = 0\n    FOR i = 0 TO R-1: count += countSmallerEqual(matrix[i], mid)\n    IF count <= req: low = mid + 1\n    ELSE: high = mid - 1\n  RETURN low`,
      dryRun: [],
      code: {
        cpp: `int countSmallerThanMid(vector<int>& row, int mid) {\n    int l = 0, h = row.size() - 1;\n    while (l <= h) {\n        int md = (l + h) >> 1;\n        if (row[md] <= mid) l = md + 1;\n        else h = md - 1;\n    }\n    return l;\n}\nint median(vector<vector<int>> &matrix, int R, int C) {\n    int low = 1, high = 1e9;\n    int req = (R * C) / 2;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        int smallEqual = 0;\n        for (int i = 0; i < R; i++) smallEqual += countSmallerThanMid(matrix[i], mid);\n        if (smallEqual <= req) low = mid + 1;\n        else high = mid - 1;\n    }\n    return low;\n}`,
        java: `public class Solution {\n    public int countSmallerThanMid(int[] row, int mid) {\n        int l = 0, h = row.length - 1;\n        while (l <= h) {\n            int md = (l + h) >> 1;\n            if (row[md] <= mid) l = md + 1;\n            else h = md - 1;\n        }\n        return l;\n    }\n    public int median(int matrix[][], int R, int C) {\n        int low = 1, high = (int)1e9;\n        int req = (R * C) / 2;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            int smallEqual = 0;\n            for (int i = 0; i < R; i++) smallEqual += countSmallerThanMid(matrix[i], mid);\n            if (smallEqual <= req) low = mid + 1;\n            else high = mid - 1;\n        }\n        return low;\n    }\n}`,
        python: `import bisect\ndef median(matrix, R, C):\n    low, high = 1, 10**9\n    req = (R * C) // 2\n    while low <= high:\n        mid = (low + high) // 2\n        smallEqual = 0\n        for i in range(R):\n            smallEqual += bisect.bisect_right(matrix[i], mid)\n        if smallEqual <= req:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return low`
      },
      timeComplexity: "O(R * log(C) * log(10^9))", timeExplanation: "Outer BS takes log(1e9), Inner BS on rows takes R * log(C).", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 87. Sqrt (x)
  87: {
    title: "Sqrt (x)",
    topic: "BS on Answer",
    difficulty: "Easy",
    problemStatement: "Given a non-negative integer x, compute and return the square root of x. Since the return type is an integer, the decimal digits are truncated.",
    examples: [ { input: "x = 8", output: "2", explanation: "The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(sqrt(X))",
      algorithm: { english: "Iterate from 1 upwards. If i*i <= x, the answer could be i. Stop when i*i > x.", hinglish: "1 se start karo aur check karo jab tak i*i x se bada na ho jaye. Usse ek number pehle wala hi answer hoga." },
      pseudocode: `FUNCTION mySqrt(x):\n  IF x == 0: RETURN 0\n  ans = 1\n  FOR i = 1 TO x:\n    IF i*i <= x: ans = i\n    ELSE: BREAK\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `int mySqrt(int x) {\n    long long y = 0;\n    while(y*y <= x) y++;\n    return y - 1;\n}`,
        java: `public int mySqrt(int x) {\n    long y = 0;\n    while(y*y <= x) y++;\n    return (int)(y - 1);\n}`,
        python: `def mySqrt(x):\n    y = 0\n    while y * y <= x: y += 1\n    return y - 1`
      },
      timeComplexity: "O(sqrt(X))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log X)",
      algorithm: { english: "Our answer lies in the range [1, x]. We can apply binary search. For a mid value, if mid*mid <= x, then mid is a possible answer, and we check for larger values by setting low = mid + 1. Otherwise, high = mid - 1.", hinglish: "Ans [1, x] ke range me hoga. Binary search lagao. Agar mid*mid <= x hai, toh yeh answer ho sakta hai (save it) aur bade numbers search karo (low = mid + 1). Warna chote numbers." },
      pseudocode: `FUNCTION mySqrt(x):\n  low = 1, high = x, ans = 0\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    IF mid <= x / mid: // To prevent overflow\n      ans = mid\n      low = mid + 1\n    ELSE: high = mid - 1\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `int mySqrt(int x) {\n    if (x == 0) return 0;\n    int low = 1, high = x, ans = 0;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (mid <= x / mid) { ans = mid; low = mid + 1; }\n        else { high = mid - 1; }\n    }\n    return ans;\n}`,
        java: `public int mySqrt(int x) {\n    if (x == 0) return 0;\n    int low = 1, high = x, ans = 0;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (mid <= x / mid) { ans = mid; low = mid + 1; }\n        else { high = mid - 1; }\n    }\n    return ans;\n}`,
        python: `def mySqrt(x):\n    if x == 0: return 0\n    low, high, ans = 1, x, 0\n    while low <= high:\n        mid = (low + high) // 2\n        if mid <= x // mid:\n            ans = mid\n            low = mid + 1\n        else:\n            high = mid - 1\n    return ans`
      },
      timeComplexity: "O(log X)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 88. Valid Perfect Square
  88: {
    title: "Valid Perfect Square",
    topic: "BS on Answer",
    difficulty: "Easy",
    problemStatement: "Given a positive integer num, write a function which returns True if num is a perfect square else False. Do not use any built-in library function such as sqrt.",
    examples: [ { input: "num = 16", output: "true", explanation: "16 = 4 * 4" } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(sqrt(N))",
      algorithm: { english: "Loop from 1 upwards, if i*i == num return true.", hinglish: "1 se start karo, jaha i*i == num waha true." },
      pseudocode: `FUNCTION isPerfectSquare(num):\n  FOR i = 1 TO num:\n    IF i*i == num: RETURN TRUE\n    IF i*i > num: BREAK\n  RETURN FALSE`,
      dryRun: [],
      code: {
        cpp: `bool isPerfectSquare(int num) {\n    for(long long i=1; i*i<=num; i++) if(i*i == num) return true;\n    return false;\n}`,
        java: `public boolean isPerfectSquare(int num) {\n    for(long i=1; i*i<=num; i++) if(i*i == num) return true;\n    return false;\n}`,
        python: `def isPerfectSquare(num):\n    i = 1\n    while i * i <= num:\n        if i * i == num: return True\n        i += 1\n    return False`
      },
      timeComplexity: "O(sqrt(N))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log N)",
      algorithm: { english: "Use Binary Search from 1 to num. If mid * mid == num, it's a perfect square.", hinglish: "Binary Search use karo 1 se num tak. Agar mid*mid == num toh true." },
      pseudocode: `FUNCTION isPerfectSquare(num):\n  low = 1, high = num\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    sq = mid * mid\n    IF sq == num: RETURN TRUE\n    IF sq < num: low = mid + 1\n    ELSE: high = mid - 1\n  RETURN FALSE`,
      dryRun: [],
      code: {
        cpp: `bool isPerfectSquare(int num) {\n    int low = 1, high = num;\n    while(low <= high) {\n        long long mid = low + (high - low) / 2;\n        long long sq = mid * mid;\n        if(sq == num) return true;\n        if(sq < num) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}`,
        java: `public boolean isPerfectSquare(int num) {\n    int low = 1, high = num;\n    while(low <= high) {\n        long mid = low + (high - low) / 2;\n        long sq = mid * mid;\n        if(sq == num) return true;\n        if(sq < num) low = mid + 1;\n        else high = (int)(mid - 1);\n    }\n    return false;\n}`,
        python: `def isPerfectSquare(num):\n    low, high = 1, num\n    while low <= high:\n        mid = (low + high) // 2\n        sq = mid * mid\n        if sq == num: return True\n        if sq < num: low = mid + 1\n        else: high = mid - 1\n    return False`
      },
      timeComplexity: "O(log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 89. Find Nth root of a number
  89: {
    title: "Find Nth root of a number",
    topic: "BS on Answer",
    difficulty: "Medium",
    problemStatement: "You are given 2 numbers (n, m); the task is to find n√m (nth root of m). If the root is not integer then return -1.",
    examples: [ { input: "n = 3, m = 27", output: "3", explanation: "3 * 3 * 3 = 27" } ],
    brute: {
      title: "Brute Force Approach: Linear Search O(M)",
      algorithm: { english: "Loop from 1 to M, calculate i^n. If it equals M, return i.", hinglish: "1 se leke M tak loop lagao. Jaha i^n M ke barabar ho, waha i return kardo." },
      pseudocode: `FUNCTION NthRoot(n, m):\n  FOR i = 1 TO m:\n    IF i^n == m: RETURN i\n    IF i^n > m: BREAK\n  RETURN -1`,
      dryRun: [],
      code: {
        cpp: `int func(int mid, int n, int m) {\n    long long ans = 1;\n    for(int i = 1; i <= n; i++) {\n        ans *= mid;\n        if(ans > m) return 2;\n    }\n    if(ans == m) return 1;\n    return 0;\n}\nint NthRootBrute(int n, int m) {\n    for(int i=1; i<=m; i++) {\n        int res = func(i, n, m);\n        if(res == 1) return i;\n        if(res == 2) break;\n    }\n    return -1;\n}`,
        java: `public int func(int mid, int n, int m) {\n    long ans = 1;\n    for(int i = 1; i <= n; i++) {\n        ans *= mid;\n        if(ans > m) return 2;\n    }\n    if(ans == m) return 1;\n    return 0;\n}\npublic int NthRootBrute(int n, int m) {\n    for(int i=1; i<=m; i++) {\n        int res = func(i, n, m);\n        if(res == 1) return i;\n        if(res == 2) break;\n    }\n    return -1;\n}`,
        python: `def NthRootBrute(n, m):\n    for i in range(1, m + 1):\n        p = i ** n\n        if p == m: return i\n        if p > m: break\n    return -1`
      },
      timeComplexity: "O(M * N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search O(log M * log N)",
      algorithm: { english: "Use binary search from 1 to m. Check if mid^n == m. Be careful with overflow when calculating mid^n.", hinglish: "Binary Search lagao 1 se m tak. Check karo mid^n m ke equal hai ya nahi. Overflow bachane ke liye step-by-step multiply karo aur agar bich me m se bada ho jaye toh ruk jao." },
      pseudocode: `FUNCTION NthRoot(n, m):\n  low = 1, high = m\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    res = power(mid, n, m) // return 1 if ==m, 2 if >m, 0 if <m\n    IF res == 1: RETURN mid\n    IF res == 2: high = mid - 1\n    ELSE: low = mid + 1\n  RETURN -1`,
      dryRun: [],
      code: {
        cpp: `int power(int mid, int n, int m) {\n    long long ans = 1;\n    for(int i = 1; i <= n; i++) {\n        ans *= mid;\n        if(ans > m) return 2;\n    }\n    if(ans == m) return 1;\n    return 0;\n}\nint NthRoot(int n, int m) {\n    int low = 1, high = m;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        int res = power(mid, n, m);\n        if(res == 1) return mid;\n        if(res == 2) high = mid - 1;\n        else low = mid + 1;\n    }\n    return -1;\n}`,
        java: `public int power(int mid, int n, int m) {\n    long ans = 1;\n    for(int i = 1; i <= n; i++) {\n        ans *= mid;\n        if(ans > m) return 2;\n    }\n    if(ans == m) return 1;\n    return 0;\n}\npublic int NthRoot(int n, int m) {\n    int low = 1, high = m;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        int res = power(mid, n, m);\n        if(res == 1) return mid;\n        if(res == 2) high = mid - 1;\n        else low = mid + 1;\n    }\n    return -1;\n}`,
        python: `def NthRoot(n, m):\n    low, high = 1, m\n    while low <= high:\n        mid = (low + high) // 2\n        val = mid ** n\n        if val == m: return mid\n        elif val > m: high = mid - 1\n        else: low = mid + 1\n    return -1`
      },
      timeComplexity: "O(log M * log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 90. Koko eating bananas
  90: {
    title: "Koko eating bananas",
    topic: "BS on Answer",
    difficulty: "Medium",
    problemStatement: "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Return the minimum integer k such that she can eat all the bananas within h hours.",
    examples: [ { input: "piles = [3,6,7,11], h = 8", output: "4", explanation: "At speed 4, it takes 1+2+2+3 = 8 hours." } ],
    brute: {
      title: "Brute Force Approach: Linear Search O(MAX(piles) * N)",
      algorithm: { english: "Try every speed from 1 to max(piles). Calculate total hours taken. The first speed that takes <= h hours is the answer.", hinglish: "Speed 1 se leke max element tak try karo. Jo pehli speed \`h\` hours me khatam kar de, wahi min speed hogi." },
      pseudocode: `FUNCTION minEatingSpeed(piles, h):\n  maxP = MAX(piles)\n  FOR speed = 1 TO maxP:\n    hours = calculateTotalHours(piles, speed)\n    IF hours <= h: RETURN speed\n  RETURN maxP`,
      dryRun: [],
      code: {
        cpp: `// Omitted to save space, standard linear loop over speeds.`,
        java: `// Omitted to save space, standard linear loop over speeds.`,
        python: `# Omitted to save space, standard linear loop over speeds.`
      },
      timeComplexity: "O(N * MAX_VAL)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(N * log(MAX_VAL))",
      algorithm: { english: "The speed will be between 1 and max(piles). Use Binary Search on the speed. For a \`mid\` speed, calculate hours. If hours <= h, it means we can try a slower speed (high = mid - 1) but \`mid\` could be an answer. Otherwise, we need a faster speed (low = mid + 1).", hinglish: "Speed ki range 1 se Max pile size tak hogi. Is range me Binary Search lagao. Har \`mid\` speed pe check karo ki total time kitna laga. Agar time \`h\` se kam ya barabar hai, toh aur dheere khane ka try karo (high = mid - 1), warna speed badao (low = mid + 1)." },
      pseudocode: `FUNCTION calcHours(piles, k):\n  total = 0\n  FOR p IN piles: total += CEIL(p / k)\n  RETURN total\n\nFUNCTION minEatingSpeed(piles, h):\n  low = 1, high = MAX(piles)\n  ans = high\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    IF calcHours(piles, mid) <= h:\n      ans = mid\n      high = mid - 1\n    ELSE: low = mid + 1\n  RETURN ans`,
      dryRun: [ { step: "1", state: "piles=[3,6,7,11], h=8", action: "low=1, high=11. mid=6. Hours at 6 = 1+1+2+2=6 <= 8. Try slower, high=5. mid=3. Hours at 3 = 1+2+3+4=10 > 8. Try faster, low=4. mid=4. Hours = 8 <= 8. Ans=4." } ],
      code: {
        cpp: `long long calculateHours(vector<int>& piles, int k) {\n    long long hours = 0;\n    for(int p : piles) hours += ceil((double)p / (double)k);\n    return hours;\n}\nint minEatingSpeed(vector<int>& piles, int h) {\n    int low = 1, high = *max_element(piles.begin(), piles.end());\n    int ans = high;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (calculateHours(piles, mid) <= (long long)h) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}`,
        java: `public long calculateHours(int[] piles, int k) {\n    long hours = 0;\n    for(int p : piles) hours += Math.ceil((double)p / k);\n    return hours;\n}\npublic int minEatingSpeed(int[] piles, int h) {\n    int low = 1, high = 0;\n    for(int p : piles) high = Math.max(high, p);\n    int ans = high;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (calculateHours(piles, mid) <= h) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}`,
        python: `import math\ndef minEatingSpeed(piles, h):\n    def calc_hours(k):\n        return sum(math.ceil(p / k) for p in piles)\n    low, high = 1, max(piles)\n    ans = high\n    while low <= high:\n        mid = (low + high) // 2\n        if calc_hours(mid) <= h:\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans`
      },
      timeComplexity: "O(N * log(MAX_P))", timeExplanation: "Binary search takes log(MAX_P) steps, inside we iterate N elements.", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 91. Find the Smallest Divisor Given a Threshold
  91: {
    title: "Find the Smallest Divisor Given a Threshold",
    topic: "BS on Answer",
    difficulty: "Medium",
    problemStatement: "Given an array of integers nums and an integer threshold, find the smallest divisor such that the result of dividing all elements by it and summing the ceiling values is less than or equal to threshold.",
    examples: [ { input: "nums = [1,2,5,9], threshold = 6", output: "5", explanation: "With divisor 5, we get ceil(1/5)+ceil(2/5)+ceil(5/5)+ceil(9/5) = 1 + 1 + 1 + 2 = 5 <= 6." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(MAX_VAL * N)",
      algorithm: { english: "Similar to Koko eating bananas, check every divisor from 1 to max(nums) and return the first one satisfying condition.", hinglish: "Koko bananas wale jaisa hi hai, 1 se leke maximum element tak divisor try karo." },
      pseudocode: `Same logic as Koko`,
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "O(MAX_VAL * N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(N * log(MAX_VAL))",
      algorithm: { english: "Use Binary Search on the divisor range [1, max(nums)]. For a divisor \`mid\`, sum \`ceil(num / mid)\`. If sum <= threshold, \`mid\` is a valid divisor and we can try finding a smaller one (high = mid - 1). Else, we need a larger divisor (low = mid + 1).", hinglish: "Divisor ki range [1, max_element] par Binary Search karo. Agar sum threshold se kam ya equal aaye, toh aur chota divisor dhundho. Warna bada divisor try karo." },
      pseudocode: `FUNCTION smallestDivisor(nums, threshold):\n  low = 1, high = MAX(nums)\n  ans = high\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    sum = 0\n    FOR n IN nums: sum += CEIL(n / mid)\n    IF sum <= threshold:\n      ans = mid; high = mid - 1\n    ELSE: low = mid + 1\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `int smallestDivisor(vector<int>& nums, int threshold) {\n    int low = 1, high = *max_element(nums.begin(), nums.end());\n    int ans = high;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        long long sum = 0;\n        for(int n : nums) sum += ceil((double)n / (double)mid);\n        if(sum <= threshold) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}`,
        java: `public int smallestDivisor(int[] nums, int threshold) {\n    int low = 1, high = 0;\n    for(int n : nums) high = Math.max(high, n);\n    int ans = high;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        long sum = 0;\n        for(int n : nums) sum += Math.ceil((double)n / mid);\n        if(sum <= threshold) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}`,
        python: `import math\ndef smallestDivisor(nums, threshold):\n    low, high = 1, max(nums)\n    ans = high\n    while low <= high:\n        mid = (low + high) // 2\n        s = sum(math.ceil(n / mid) for n in nums)\n        if s <= threshold:\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans`
      },
      timeComplexity: "O(N * log(MAX_VAL))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 92. Minimum Speed to Arrive on Time
  92: {
    title: "Minimum Speed to Arrive on Time",
    topic: "BS on Answer",
    difficulty: "Medium",
    problemStatement: "You are given a floating-point number hour, representing the amount of time you have to reach the office. To commute, you must take n trains. You are given an integer array dist of length n. Each train departs only at an integer hour, so you may need to wait. Find minimum integer speed to arrive on time. Return -1 if impossible.",
    examples: [ { input: "dist = [1,3,2], hour = 6", output: "1", explanation: "At speed 1: 1/1 = 1 hr. Wait 0. 3/1 = 3 hrs. Wait 0. 2/1 = 2 hrs. Total = 6." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(MAX_SPEED * N)",
      algorithm: { english: "Linearly search speeds starting from 1 to 10^7.", hinglish: "1 se leke max speed tak sab try karo. Bahut time lagega." },
      pseudocode: `-`,
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "O(10^7 * N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(N * log(10^7))",
      algorithm: { english: "Use Binary Search on speed [1, 10^7]. Calculate total time: sum of \`ceil(dist[i]/speed)\` for all except the last train. Last train time is exactly \`dist[n-1]/speed\`. If total time <= hour, answer is valid and we try smaller speeds. Else try larger speeds.", hinglish: "Speed pe Binary Search lagao [1, 1e7]. Time nikalte waqt bas dhyan rakhna ki aakhiri train ka time float me hi add hoga, baaki sab ceil(time) honge (kyunki integer hour pe hi niklegi). Agar time fit baithe toh speed kam karke dekho, warna badhao." },
      pseudocode: `FUNCTION minSpeedOnTime(dist, hour):\n  IF length(dist) - 1 >= hour: RETURN -1\n  low = 1, high = 1e7, ans = -1\n  WHILE low <= high:\n    mid = low + (high - low) / 2\n    totalTime = 0\n    FOR i = 0 TO N-2: totalTime += CEIL(dist[i] / mid)\n    totalTime += dist[N-1] / mid\n    IF totalTime <= hour:\n      ans = mid; high = mid - 1\n    ELSE: low = mid + 1\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `bool isValid(vector<int>& dist, double hour, int speed) {\n    double time = 0;\n    for (int i = 0; i < dist.size() - 1; i++) time += ceil((double)dist[i] / speed);\n    time += (double)dist.back() / speed;\n    return time <= hour;\n}\nint minSpeedOnTime(vector<int>& dist, double hour) {\n    if (dist.size() - 1 >= hour) return -1;\n    int low = 1, high = 1e7, ans = -1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (isValid(dist, hour, mid)) { ans = mid; high = mid - 1; }\n        else { low = mid + 1; }\n    }\n    return ans;\n}`,
        java: `public boolean isValid(int[] dist, double hour, int speed) {\n    double time = 0;\n    for (int i = 0; i < dist.length - 1; i++) time += Math.ceil((double)dist[i] / speed);\n    time += (double)dist[dist.length - 1] / speed;\n    return time <= hour;\n}\npublic int minSpeedOnTime(int[] dist, double hour) {\n    if (dist.length - 1 >= hour) return -1;\n    int low = 1, high = (int)1e7, ans = -1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (isValid(dist, hour, mid)) { ans = mid; high = mid - 1; }\n        else { low = mid + 1; }\n    }\n    return ans;\n}`,
        python: `import math\ndef minSpeedOnTime(dist, hour):\n    if len(dist) - 1 >= hour: return -1\n    low, high, ans = 1, 10**7, -1\n    while low <= high:\n        mid = (low + high) // 2\n        time = sum(math.ceil(d / mid) for d in dist[:-1])\n        time += dist[-1] / mid\n        if time <= hour:\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans`
      },
      timeComplexity: "O(N * log(10^7))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 93. Minimum days to make M bouquets
  93: {
    title: "Minimum days to make M bouquets",
    topic: "BS on Answer",
    difficulty: "Medium",
    problemStatement: "You want to make m bouquets. You need k adjacent flowers from the garden. The bloomDay array gives the day each flower blooms. Find the minimum days to wait to make m bouquets.",
    examples: [ { input: "bloomDay = [1,10,3,10,2], m = 3, k = 1", output: "3", explanation: "Wait 3 days -> blooms: [x,_,x,_,x]. 3 adjacent groups of 1 flower found." } ],
    brute: {
      title: "Brute Force Approach: Check all days O(MAX_DAY * N)",
      algorithm: { english: "Loop day from min(bloomDay) to max(bloomDay) and check if we can make M bouquets.", hinglish: "Har ek din (min se max tak) check karo ki kya hum M guldaste bana sakte hain." },
      pseudocode: `-`,
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "O(MAX_DAY * N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(N * log(MAX_DAY - MIN_DAY))",
      algorithm: { english: "Binary search on days [minDay, maxDay]. For a given day \`mid\`, count adjacent flowers that have bloomed (bloomDay[i] <= mid). If count reaches k, increment bouquet count and reset flower count. If bouquets >= m, this day is valid, try earlier day (high = mid - 1). Else low = mid + 1.", hinglish: "Days par Binary search lagao. Kisi din par check karo kitne continuous phool khil gaye hain. Jab unka count K ho jaye, tab 1 bouquet ban gaya. Aise total M bouquets banne chahiye. Ban jayein toh aur jaldi wala din try karo." },
      pseudocode: `FUNCTION possible(bloomDay, day, m, k):\n  bouquets = 0, count = 0\n  FOR b IN bloomDay:\n    IF b <= day: count++\n    ELSE: bouquets += count / k; count = 0\n  bouquets += count / k\n  RETURN bouquets >= m`,
      dryRun: [],
      code: {
        cpp: `bool possible(vector<int>& bloomDay, int day, int m, int k) {\n    int bouquets = 0, count = 0;\n    for(int b : bloomDay) {\n        if(b <= day) count++;\n        else { bouquets += count / k; count = 0; }\n    }\n    bouquets += count / k;\n    return bouquets >= m;\n}\nint minDays(vector<int>& bloomDay, int m, int k) {\n    if((long long)m * k > bloomDay.size()) return -1;\n    int low = *min_element(bloomDay.begin(), bloomDay.end());\n    int high = *max_element(bloomDay.begin(), bloomDay.end());\n    int ans = -1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(possible(bloomDay, mid, m, k)) { ans = mid; high = mid - 1; }\n        else { low = mid + 1; }\n    }\n    return ans;\n}`,
        java: `public boolean possible(int[] bloomDay, int day, int m, int k) {\n    int bouquets = 0, count = 0;\n    for(int b : bloomDay) {\n        if(b <= day) count++;\n        else { bouquets += count / k; count = 0; }\n    }\n    bouquets += count / k;\n    return bouquets >= m;\n}\npublic int minDays(int[] bloomDay, int m, int k) {\n    if((long)m * k > bloomDay.length) return -1;\n    int low = Integer.MAX_VALUE, high = Integer.MIN_VALUE;\n    for(int b : bloomDay) { low = Math.min(low, b); high = Math.max(high, b); }\n    int ans = -1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(possible(bloomDay, mid, m, k)) { ans = mid; high = mid - 1; }\n        else { low = mid + 1; }\n    }\n    return ans;\n}`,
        python: `def minDays(bloomDay, m, k):\n    if m * k > len(bloomDay): return -1\n    def possible(day):\n        bouquets = count = 0\n        for b in bloomDay:\n            if b <= day: count += 1\n            else:\n                bouquets += count // k\n                count = 0\n        bouquets += count // k\n        return bouquets >= m\n    low, high = min(bloomDay), max(bloomDay)\n    ans = -1\n    while low <= high:\n        mid = (low + high) // 2\n        if possible(mid):\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans`
      },
      timeComplexity: "O(N * log(MAX_DAY - MIN_DAY))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 94. Capacity to Ship Packages Within D Days
  94: {
    title: "Capacity to Ship Packages Within D Days",
    topic: "BS on Answer",
    difficulty: "Medium",
    problemStatement: "A conveyor belt has packages that must be shipped within days days. Return the least weight capacity of the ship that will result in all packages being shipped.",
    examples: [ { input: "weights = [1,2,3,4,5,6,7,8,9,10], days = 5", output: "15", explanation: "Capacity 15 allows shipping: [1,2,3,4,5], [6,7], [8], [9], [10]." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(SUM_W * N)",
      algorithm: { english: "Check every capacity starting from MAX(weights) up to SUM(weights).", hinglish: "Min capacity MAX(weights) hogi. Ek ek karke capacity badha kar check karo." },
      pseudocode: `-`,
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "O(SUM * N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(N * log(SUM - MAX))",
      algorithm: { english: "The ship capacity must be at least the heaviest package (MAX), and at most the sum of all packages (SUM). Do binary search on [MAX, SUM]. For a given capacity \`mid\`, count the days needed. If days <= required days, we can try a smaller capacity (high = mid - 1). Else try a larger capacity.", hinglish: "Capacity ki range [sabse bhari package, sabka sum] hogi. Binary Search lagao. Ek capacity ke liye din count karo. Agar din kam ya equal lagein, toh hum aur chhoti capacity try kar sakte hain." },
      pseudocode: `FUNCTION daysNeeded(weights, cap):\n  days = 1, currentLoad = 0\n  FOR w IN weights:\n    IF currentLoad + w > cap:\n      days++; currentLoad = w\n    ELSE: currentLoad += w\n  RETURN days`,
      dryRun: [],
      code: {
        cpp: `int daysNeeded(vector<int>& weights, int cap) {\n    int days = 1, load = 0;\n    for(int w : weights) {\n        if(load + w > cap) { days++; load = w; }\n        else load += w;\n    }\n    return days;\n}\nint shipWithinDays(vector<int>& weights, int days) {\n    int low = *max_element(weights.begin(), weights.end());\n    int high = 0;\n    for(int w : weights) high += w;\n    int ans = high;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(daysNeeded(weights, mid) <= days) { ans = mid; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        java: `public int daysNeeded(int[] weights, int cap) {\n    int days = 1, load = 0;\n    for(int w : weights) {\n        if(load + w > cap) { days++; load = w; }\n        else load += w;\n    }\n    return days;\n}\npublic int shipWithinDays(int[] weights, int days) {\n    int low = 0, high = 0;\n    for(int w : weights) { low = Math.max(low, w); high += w; }\n    int ans = high;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(daysNeeded(weights, mid) <= days) { ans = mid; high = mid - 1; }\n        else low = mid + 1;\n    }\n    return ans;\n}`,
        python: `def shipWithinDays(weights, days):\n    def days_needed(cap):\n        d, load = 1, 0\n        for w in weights:\n            if load + w > cap:\n                d += 1\n                load = w\n            else: load += w\n        return d\n    low, high = max(weights), sum(weights)\n    ans = high\n    while low <= high:\n        mid = (low + high) // 2\n        if days_needed(mid) <= days:\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans`
      },
      timeComplexity: "O(N * log(SUM - MAX))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 95. Book Allocation Problem
  95: {
    title: "Book Allocation Problem",
    topic: "BS on Answer",
    difficulty: "Hard",
    problemStatement: "Given an array of integers representing pages of books. Allocate books to M students such that the maximum number of pages assigned to a student is minimized. Each student gets contiguous books, and every student gets at least one book.",
    examples: [ { input: "A = [12, 34, 67, 90], M = 2", output: "113", explanation: "Student 1 gets [12,34,67], Student 2 gets [90]. Max is max(113, 90) = 113." } ],
    brute: {
      title: "Same as Binary Search on Answer pattern",
      algorithm: { english: "Exact same problem as Capacity to Ship Packages and Split Array Largest Sum.", hinglish: "Exact wahi logic jo Ship Packages mein tha." },
      pseudocode: `-`,
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(N * log(SUM - MAX))",
      algorithm: { english: "Range of max pages is [max(A), sum(A)]. Use Binary Search. For \`mid\` pages, calculate how many students are needed. If students > M, it means max pages are too few (low = mid + 1). If students <= M, we can try to minimize it further (high = mid - 1).", hinglish: "Answer ki range [sabse badi book, sabhi books ka sum] hogi. Binary search lagao. Ek \`mid\` (max allowed pages) maan lo. Dekho kitne bachhon me books batengi. Agar bacche M se zyada lag rahe hain, toh limit badhani padegi. Warna limit aur kam karke try karo." },
      pseudocode: `FUNCTION studentsNeeded(A, maxPages):\n  students = 1, pages = 0\n  FOR p IN A:\n    IF pages + p > maxPages:\n      students++; pages = p\n    ELSE: pages += p\n  RETURN students`,
      dryRun: [],
      code: {
        cpp: `int studentsNeeded(vector<int>& arr, int pages) {\n    int students = 1; long long pagesStudent = 0;\n    for (int i = 0; i < arr.size(); i++) {\n        if (pagesStudent + arr[i] <= pages) pagesStudent += arr[i];\n        else { students++; pagesStudent = arr[i]; }\n    }\n    return students;\n}\nint findPages(vector<int>& arr, int n, int m) {\n    if (m > n) return -1;\n    int low = *max_element(arr.begin(), arr.end());\n    int high = accumulate(arr.begin(), arr.end(), 0);\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        int students = studentsNeeded(arr, mid);\n        if (students > m) low = mid + 1;\n        else high = mid - 1;\n    }\n    return low;\n}`,
        java: `public static int countStudents(int[] arr, int pages) {\n    int students = 1;\n    long pagesStudent = 0;\n    for (int i = 0; i < arr.length; i++) {\n        if (pagesStudent + arr[i] <= pages) pagesStudent += arr[i];\n        else { students++; pagesStudent = arr[i]; }\n    }\n    return students;\n}\npublic static int findPages(int[] arr, int n, int m) {\n    if (m > n) return -1;\n    int low = 0, high = 0;\n    for (int num : arr) { low = Math.max(low, num); high += num; }\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        int students = countStudents(arr, mid);\n        if (students > m) low = mid + 1;\n        else high = mid - 1;\n    }\n    return low;\n}`,
        python: `def findPages(arr, n, m):\n    if m > n: return -1\n    def count_students(pages):\n        students, p_student = 1, 0\n        for book in arr:\n            if p_student + book <= pages: p_student += book\n            else: students += 1; p_student = book\n        return students\n    low, high = max(arr), sum(arr)\n    while low <= high:\n        mid = (low + high) // 2\n        if count_students(mid) > m: low = mid + 1\n        else: high = mid - 1\n    return low`
      },
      timeComplexity: "O(N * log(SUM - MAX))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 96. Split Array Largest Sum
  96: {
    title: "Split Array Largest Sum",
    topic: "BS on Answer",
    difficulty: "Hard",
    problemStatement: "Given an array nums and integer m, split the array into m non-empty continuous subarrays such that the largest sum among these m subarrays is minimized.",
    examples: [ { input: "nums = [7,2,5,10,8], m = 2", output: "18", explanation: "Split into [7,2,5] (sum 14) and [10,8] (sum 18). Minimized largest sum is 18." } ],
    brute: {
      title: "Same as Book Allocation Problem", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(N * log(SUM - MAX))",
      algorithm: { english: "This is EXACTLY the same as the Book Allocation Problem. Books = elements, Students = subarrays, Max Pages = Largest Sum.", hinglish: "Bilkul Book Allocation jaisa hai. Code me bas variable names change kar do." },
      pseudocode: `Same as Book Allocation`,
      dryRun: [],
      code: {
        cpp: `// Exactly same logic as Book Allocation problem\nint splitArray(vector<int>& nums, int k) {\n    return findPages(nums, nums.size(), k);\n}`,
        java: `public int splitArray(int[] nums, int k) {\n    return findPages(nums, nums.length, k);\n}`,
        python: `def splitArray(nums, k):\n    return findPages(nums, len(nums), k)`
      },
      timeComplexity: "O(N * log(SUM - MAX))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 97. Painter's Partition Problem
  97: {
    title: "Painter's Partition Problem",
    topic: "BS on Answer",
    difficulty: "Hard",
    problemStatement: "Given an array/list of length N, where the array represents the boards and each element of the given array represents the length of each board. There are K painters available. Minimize the maximum time taken by a painter.",
    examples: [ { input: "boards = [10, 20, 30, 40], K = 2", output: "60", explanation: "Painter 1 paints [10, 20, 30]. Painter 2 paints [40]. Max time is 60." } ],
    brute: {
      title: "Same as Book Allocation Problem", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(N * log(SUM - MAX))",
      algorithm: { english: "This is EXACTLY the same as the Book Allocation Problem. Books = boards, Students = painters.", hinglish: "Ye bhi Book Allocation problem hi hai." },
      pseudocode: `Same as Book Allocation`,
      dryRun: [],
      code: {
        cpp: `// Exactly same logic as Book Allocation problem\nint findLargestMinDistance(vector<int> &boards, int k) {\n    return findPages(boards, boards.size(), k);\n}`,
        java: `public int findLargestMinDistance(int[] boards, int k) {\n    return findPages(boards, boards.length, k);\n}`,
        python: `def findLargestMinDistance(boards, k):\n    return findPages(boards, len(boards), k)`
      },
      timeComplexity: "O(N * log(SUM - MAX))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 98. K-th element of two sorted Arrays
  98: {
    title: "K-th element of two sorted Arrays",
    topic: "BS on Answer",
    difficulty: "Medium",
    problemStatement: "Given two sorted arrays arr1 and arr2 of size N and M respectively and an element K. The task is to find the element that would be at the kth position of the final sorted array.",
    examples: [ { input: "arr1 = [2, 3, 6, 7, 9], arr2 = [1, 4, 8, 10], k = 5", output: "6", explanation: "Sorted: [1,2,3,4,6,7,8,9,10]. The 5th element is 6." } ],
    brute: {
      title: "Brute Force Approach: Merge Arrays O(N + M)",
      algorithm: { english: "Merge the two sorted arrays keeping a count. When count reaches k, return the element.", hinglish: "Dono arrays ko merge karna shuru karo (jaise merge sort me karte hain). Jab k-th element par pahocho tab return kardo." },
      pseudocode: `FUNCTION kthElement(arr1, arr2, k):\n  p1=0, p2=0, count=0, ans=0\n  WHILE p1 < n AND p2 < m:\n    IF arr1[p1] < arr2[p2]: ans = arr1[p1++]; count++\n    ELSE: ans = arr2[p2++]; count++\n    IF count == k: RETURN ans\n  // process remaining elements...`,
      dryRun: [],
      code: {
        cpp: `// Standard two pointer merge loop logic`,
        java: `// Standard two pointer merge loop logic`,
        python: `# Standard two pointer merge loop logic`
      },
      timeComplexity: "O(k)", timeExplanation: "We traverse till k.", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Partitions O(log(min(N, M)))",
      algorithm: { english: "Do Binary Search on the smaller array to find a partition such that left side has exactly k elements, and max(left1, left2) <= min(right1, right2).", hinglish: "Chhote array par binary search lagao aur partitions banao taaki total elements left half me k ho jayein. Fir check karo crossover elements valid hain ya nahi." },
      pseudocode: `FUNCTION kthElement(arr1, arr2, k):\n  IF n1 > n2: swap(arr1, arr2)\n  low = MAX(0, k - n2), high = MIN(k, n1)\n  WHILE low <= high:\n    cut1 = (low + high) / 2\n    cut2 = k - cut1\n    // find l1, l2, r1, r2. Check if valid.\n    IF l1 <= r2 AND l2 <= r1: RETURN MAX(l1, l2)\n    IF l1 > r2: high = cut1 - 1\n    ELSE: low = cut1 + 1`,
      dryRun: [],
      code: {
        cpp: `int kthElement(int arr1[], int arr2[], int n, int m, int k) {\n    if(n > m) return kthElement(arr2, arr1, m, n, k);\n    int low = max(0, k - m), high = min(k, n);\n    while(low <= high) {\n        int cut1 = (low + high) >> 1;\n        int cut2 = k - cut1;\n        int l1 = cut1 == 0 ? INT_MIN : arr1[cut1 - 1];\n        int l2 = cut2 == 0 ? INT_MIN : arr2[cut2 - 1];\n        int r1 = cut1 == n ? INT_MAX : arr1[cut1];\n        int r2 = cut2 == m ? INT_MAX : arr2[cut2];\n        if(l1 <= r2 && l2 <= r1) return max(l1, l2);\n        else if (l1 > r2) high = cut1 - 1;\n        else low = cut1 + 1;\n    }\n    return 1;\n}`,
        java: `public int kthElement(int arr1[], int arr2[], int n, int m, int k) {\n    if(n > m) return kthElement(arr2, arr1, m, n, k);\n    int low = Math.max(0, k - m), high = Math.min(k, n);\n    while(low <= high) {\n        int cut1 = (low + high) >> 1;\n        int cut2 = k - cut1;\n        int l1 = cut1 == 0 ? Integer.MIN_VALUE : arr1[cut1 - 1];\n        int l2 = cut2 == 0 ? Integer.MIN_VALUE : arr2[cut2 - 1];\n        int r1 = cut1 == n ? Integer.MAX_VALUE : arr1[cut1];\n        int r2 = cut2 == m ? Integer.MAX_VALUE : arr2[cut2];\n        if(l1 <= r2 && l2 <= r1) return Math.max(l1, l2);\n        else if (l1 > r2) high = cut1 - 1;\n        else low = cut1 + 1;\n    }\n    return 1;\n}`,
        python: `def kthElement(arr1, arr2, n, m, k):\n    if n > m: return kthElement(arr2, arr1, m, n, k)\n    low, high = max(0, k - m), min(k, n)\n    while low <= high:\n        cut1 = (low + high) // 2\n        cut2 = k - cut1\n        l1 = float('-inf') if cut1 == 0 else arr1[cut1 - 1]\n        l2 = float('-inf') if cut2 == 0 else arr2[cut2 - 1]\n        r1 = float('inf') if cut1 == n else arr1[cut1]\n        r2 = float('inf') if cut2 == m else arr2[cut2]\n        if l1 <= r2 and l2 <= r1: return max(l1, l2)\n        elif l1 > r2: high = cut1 - 1\n        else: low = cut1 + 1\n    return 1`
      },
      timeComplexity: "O(log(min(N, M)))", timeExplanation: "Binary search on the smaller array.", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 99. Aggressive Cows
  99: {
    title: "Aggressive Cows",
    topic: "BS on Answer",
    difficulty: "Hard",
    problemStatement: "Given an array representing positions of stalls. There are k aggressive cows. Assign stalls to cows such that the minimum distance between any two cows is as large as possible. Return the maximum possible minimum distance.",
    examples: [ { input: "stalls = [1, 2, 4, 8, 9], k = 3", output: "3", explanation: "Place cows at stalls 1, 4, 8. Minimum distance is 3." } ],
    brute: {
      title: "Brute Force Approach: Linear Scan O(MAX_DIST * N)",
      algorithm: { english: "Sort stalls. Check if distance d is possible by placing cows greedily. Run d from 1 to max(stalls)-min(stalls).", hinglish: "1 se leke max distance tak check karo ki kya us distance pe cows place ho sakti hain greedy tarike se." },
      pseudocode: `-`,
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "O(N * MAX_DIST)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(N log(MAX_DIST))",
      algorithm: { english: "Binary Search on distance range [1, max_stall - min_stall]. To check if a distance \`mid\` is possible, greedily place cow 1 at first stall. Place the next cow only if distance from previous is >= \`mid\`. If we place k cows, this distance is possible (try larger -> low = mid + 1). Else, try smaller.", hinglish: "Distance ki range par BS lagao. Ek \`mid\` distance maan ke cows ko baitha ke dekho (greedy approach: pehli cow stall 1 pe, dusri agle valid stall pe etc.). Agar K cows baith jayein, toh distance aur badhane ka try karo. Warna kam karo." },
      pseudocode: `FUNCTION canPlace(stalls, dist, k):\n  cows = 1, last = stalls[0]\n  FOR i = 1 TO N-1:\n    IF stalls[i] - last >= dist:\n      cows++; last = stalls[i]\n      IF cows == k: RETURN TRUE\n  RETURN FALSE`,
      dryRun: [],
      code: {
        cpp: `bool canPlace(vector<int>& stalls, int dist, int cows) {\n    int cnt = 1, last = stalls[0];\n    for (int i = 1; i < stalls.size(); i++) {\n        if (stalls[i] - last >= dist) { cnt++; last = stalls[i]; }\n        if (cnt >= cows) return true;\n    }\n    return false;\n}\nint aggressiveCows(vector<int>& stalls, int k) {\n    sort(stalls.begin(), stalls.end());\n    int low = 1, high = stalls.back() - stalls[0], ans = -1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (canPlace(stalls, mid, k)) { ans = mid; low = mid + 1; }\n        else { high = mid - 1; }\n    }\n    return ans;\n}`,
        java: `public boolean canPlace(int[] stalls, int dist, int cows) {\n    int cnt = 1, last = stalls[0];\n    for (int i = 1; i < stalls.length; i++) {\n        if (stalls[i] - last >= dist) { cnt++; last = stalls[i]; }\n        if (cnt >= cows) return true;\n    }\n    return false;\n}\npublic int aggressiveCows(int[] stalls, int k) {\n    Arrays.sort(stalls);\n    int low = 1, high = stalls[stalls.length - 1] - stalls[0], ans = -1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (canPlace(stalls, mid, k)) { ans = mid; low = mid + 1; }\n        else { high = mid - 1; }\n    }\n    return ans;\n}`,
        python: `def aggressiveCows(stalls, k):\n    stalls.sort()\n    def can_place(dist):\n        cnt, last = 1, stalls[0]\n        for i in range(1, len(stalls)):\n            if stalls[i] - last >= dist:\n                cnt += 1\n                last = stalls[i]\n            if cnt >= k: return True\n        return False\n    low, high = 1, stalls[-1] - stalls[0]\n    ans = -1\n    while low <= high:\n        mid = (low + high) // 2\n        if can_place(mid):\n            ans = mid\n            low = mid + 1\n        else:\n            high = mid - 1\n    return ans`
      },
      timeComplexity: "O(N log(MAX_DIST))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 100. Minimize Max Distance to Gas Station
  100: {
    title: "Minimize Max Distance to Gas Station",
    topic: "BS on Answer",
    difficulty: "Hard",
    problemStatement: "Given an array representing positions of gas stations on a number line, and an integer K. We add K more gas stations. Find the minimum possible value of the maximum distance between adjacent gas stations.",
    examples: [ { input: "stations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], K = 9", output: "0.5", explanation: "Add one station between every pair." } ],
    brute: {
      title: "Brute Force Approach: Max Heap O(K log N)",
      algorithm: { english: "Keep track of the number of stations added in between every interval using a Max Heap.", hinglish: "Max Heap use karo jo distances ko store kare, aur hamesha sabse bade distance ke beech me naya station add karo." },
      pseudocode: `-`,
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "O(K log N)", timeExplanation: "-", spaceComplexity: "O(N)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Answer O(N log(MAX_DIST * 10^6))",
      algorithm: { english: "Since we need precision, we do binary search on floating point values. Range is [0, max_adjacent_dist]. For a given distance \`mid\`, calculate how many stations are required to make all adjacent distances <= \`mid\`. If required <= K, it's possible.", hinglish: "Floating point binary search lagao range [0, max_dist] pe. Ek \`mid\` value lo aur dekho sabhi stations ke beech kitne extra stations dalne padenge taaki distance \`mid\` se kam ho jaye. Agar count <= K hai toh ye valid hai." },
      pseudocode: `FUNCTION minmaxGasDist(stations, k):\n  low = 0, high = max distance between adj stations\n  WHILE high - low > 1e-6:\n    mid = (low + high) / 2.0\n    cnt = 0\n    FOR i=0 TO N-2: cnt += INT((stations[i+1] - stations[i]) / mid)\n    IF cnt <= k: high = mid\n    ELSE: low = mid\n  RETURN high`,
      dryRun: [],
      code: {
        cpp: `double minmaxGasDist(vector<int>& stations, int k) {\n    double low = 0, high = 0;\n    for(int i=0; i<stations.size()-1; i++) high = max(high, (double)(stations[i+1]-stations[i]));\n    while(high - low > 1e-6) {\n        double mid = low + (high - low) / 2.0;\n        int cnt = 0;\n        for(int i=0; i<stations.size()-1; i++) cnt += (stations[i+1] - stations[i]) / mid;\n        if(cnt <= k) high = mid;\n        else low = mid;\n    }\n    return high;\n}`,
        java: `public double minmaxGasDist(int[] stations, int k) {\n    double low = 0, high = 0;\n    for(int i=0; i<stations.length-1; i++) high = Math.max(high, stations[i+1]-stations[i]);\n    while(high - low > 1e-6) {\n        double mid = low + (high - low) / 2.0;\n        int cnt = 0;\n        for(int i=0; i<stations.length-1; i++) cnt += (stations[i+1] - stations[i]) / mid;\n        if(cnt <= k) high = mid;\n        else low = mid;\n    }\n    return high;\n}`,
        python: `def minmaxGasDist(stations, k):\n    low, high = 0.0, max(stations[i+1] - stations[i] for i in range(len(stations)-1))\n    while high - low > 1e-6:\n        mid = (low + high) / 2.0\n        cnt = sum(int((stations[i+1] - stations[i]) / mid) for i in range(len(stations)-1))\n        if cnt <= k: high = mid\n        else: low = mid\n    return high`
      },
      timeComplexity: "O(N log(M / 1e-6))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 101. Median of Two Sorted Arrays
  101: {
    title: "Median of Two Sorted Arrays",
    topic: "BS on Answer",
    difficulty: "Hard",
    problemStatement: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    examples: [ { input: "nums1 = [1,3], nums2 = [2]", output: "2.0", explanation: "Merged: [1,2,3]. Median is 2." } ],
    brute: {
      title: "Brute Force Approach: Merge O(N+M)",
      algorithm: { english: "Merge arrays into a single array, find median by indexing.", hinglish: "Dono array merge karo aur median nikal lo." },
      pseudocode: `-`,
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "O(N+M)", timeExplanation: "-", spaceComplexity: "O(N+M)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Binary Search on Partitions O(log(min(N,M)))",
      algorithm: { english: "Similar to Kth element. We partition the two arrays such that left half has (m+n+1)/2 elements, and all elements on left <= all elements on right.", hinglish: "Kth element wala partition logic. Left side me humesha (m+n+1)/2 elements rakhenge. Crossovers ko check karo ki wo valid hai ya nahi (l1 <= r2 and l2 <= r1)." },
      pseudocode: `FUNCTION findMedian(nums1, nums2):\n  IF len(nums1) > len(nums2): swap(nums1, nums2)\n  n = len(nums1), m = len(nums2)\n  low = 0, high = n\n  WHILE low <= high:\n    cut1 = (low + high) / 2\n    cut2 = (n + m + 1) / 2 - cut1\n    // Get l1, l2, r1, r2. If valid, calculate median based on even/odd length.\n    IF l1 <= r2 AND l2 <= r1: RETURN ans\n    IF l1 > r2: high = cut1 - 1\n    ELSE: low = cut1 + 1`,
      dryRun: [],
      code: {
        cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);\n    int n = nums1.size(), m = nums2.size();\n    int low = 0, high = n;\n    while (low <= high) {\n        int cut1 = (low + high) / 2;\n        int cut2 = (n + m + 1) / 2 - cut1;\n        int l1 = (cut1 == 0) ? INT_MIN : nums1[cut1 - 1];\n        int l2 = (cut2 == 0) ? INT_MIN : nums2[cut2 - 1];\n        int r1 = (cut1 == n) ? INT_MAX : nums1[cut1];\n        int r2 = (cut2 == m) ? INT_MAX : nums2[cut2];\n        if (l1 <= r2 && l2 <= r1) {\n            if ((n + m) % 2 == 0) return (max(l1, l2) + min(r1, r2)) / 2.0;\n            else return max(l1, l2);\n        } else if (l1 > r2) high = cut1 - 1;\n        else low = cut1 + 1;\n    }\n    return 0.0;\n}`,
        java: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n    int n = nums1.length, m = nums2.length;\n    int low = 0, high = n;\n    while (low <= high) {\n        int cut1 = (low + high) / 2;\n        int cut2 = (n + m + 1) / 2 - cut1;\n        int l1 = (cut1 == 0) ? Integer.MIN_VALUE : nums1[cut1 - 1];\n        int l2 = (cut2 == 0) ? Integer.MIN_VALUE : nums2[cut2 - 1];\n        int r1 = (cut1 == n) ? Integer.MAX_VALUE : nums1[cut1];\n        int r2 = (cut2 == m) ? Integer.MAX_VALUE : nums2[cut2];\n        if (l1 <= r2 && l2 <= r1) {\n            if ((n + m) % 2 == 0) return (Math.max(l1, l2) + Math.min(r1, r2)) / 2.0;\n            else return Math.max(l1, l2);\n        } else if (l1 > r2) high = cut1 - 1;\n        else low = cut1 + 1;\n    }\n    return 0.0;\n}`,
        python: `def findMedianSortedArrays(nums1, nums2):\n    if len(nums1) > len(nums2): return findMedianSortedArrays(nums2, nums1)\n    n, m = len(nums1), len(nums2)\n    low, high = 0, n\n    while low <= high:\n        cut1 = (low + high) // 2\n        cut2 = (n + m + 1) // 2 - cut1\n        l1 = float('-inf') if cut1 == 0 else nums1[cut1 - 1]\n        l2 = float('-inf') if cut2 == 0 else nums2[cut2 - 1]\n        r1 = float('inf') if cut1 == n else nums1[cut1]\n        r2 = float('inf') if cut2 == m else nums2[cut2]\n        if l1 <= r2 and l2 <= r1:\n            if (n + m) % 2 == 0: return (max(l1, l2) + min(r1, r2)) / 2.0\n            else: return max(l1, l2)\n        elif l1 > r2: high = cut1 - 1\n        else: low = cut1 + 1\n    return 0.0`
      },
      timeComplexity: "O(log(min(N, M)))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  }
}
