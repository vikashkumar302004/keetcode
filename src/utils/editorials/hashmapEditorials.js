export const hashmapEditorials = {
  // 265. Contains Duplicate
  265: {
    title: "Contains Duplicate",
    topic: "Hashmaps",
    difficulty: "Easy",
    problemStatement: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "true", explanation: "1 appears twice at index 0 and 3." },
      { input: "nums = [1,2,3,4]", output: "false", explanation: "All elements are distinct." }
    ],
    brute: {
      title: "Brute Force: Sorting O(N log N)",
      algorithm: {
        english: "Sort the array first. Then iterate through the array and check if adjacent elements are equal.",
        hinglish: "Array ko sort karo. Phir ek loop chala ke check karo kya pas waale do elements same hain."
      },
      pseudocode: `FUNCTION containsDuplicate(nums):\n  SORT(nums)\n  FOR i = 0 TO len(nums)-2:\n    IF nums[i] == nums[i+1]: RETURN true\n  RETURN false`,
      dryRun: [],
      code: {
        cpp: `bool containsDuplicate(vector<int>& nums) {\n    sort(nums.begin(), nums.end());\n    for (int i = 0; i < (int)nums.size() - 1; i++) {\n        if (nums[i] == nums[i+1]) return true;\n    }\n    return false;\n}`,
        java: `public boolean containsDuplicate(int[] nums) {\n    Arrays.sort(nums);\n    for (int i = 0; i < nums.length - 1; i++) {\n        if (nums[i] == nums[i+1]) return true;\n    }\n    return false;\n}`,
        python: `def containsDuplicate(nums):\n    nums.sort()\n    for i in range(len(nums) - 1):\n        if nums[i] == nums[i+1]: return True\n    return False`
      },
      timeComplexity: "O(N log N)", timeExplanation: "Sorting takes O(N log N).", spaceComplexity: "O(1)", spaceExplanation: "In-place sort uses O(1) extra space."
    },
    optimal: {
      title: "Optimal Approach: HashSet Lookup O(N)",
      algorithm: {
        english: "Use a HashSet to keep track of elements seen so far. For each number, if it already exists in the set, a duplicate is found. Otherwise, insert it into the set.",
        hinglish: "Unordered Set ka use karke har number ko track karo. Agar number pehle se set me hai toh duplicate hai!"
      },
      pseudocode: `FUNCTION containsDuplicate(nums):\n  seen = EMPTY SET\n  FOR num IN nums:\n    IF num IN seen: RETURN true\n    ADD num TO seen\n  RETURN false`,
      dryRun: [],
      code: {
        cpp: `bool containsDuplicate(vector<int>& nums) {\n    unordered_set<int> seen;\n    for (int x : nums) {\n        if (seen.count(x)) return true;\n        seen.insert(x);\n    }\n    return false;\n}`,
        java: `public boolean containsDuplicate(int[] nums) {\n    Set<Integer> seen = new HashSet<>();\n    for (int x : nums) {\n        if (seen.contains(x)) return true;\n        seen.add(x);\n    }\n    return false;\n}`,
        python: `def containsDuplicate(nums):\n    seen = set()\n    for x in nums:\n        if x in seen: return True\n        seen.add(x)\n    return False`
      },
      timeComplexity: "O(N)", timeExplanation: "Single pass over the array with O(1) set operations.", spaceComplexity: "O(N)", spaceExplanation: "Set stores up to N distinct numbers."
    }
  },

  // 266. Valid Anagram (Hashmap Approach)
  266: {
    title: "Valid Anagram (Hashmap Approach)",
    topic: "Hashmaps",
    difficulty: "Easy",
    problemStatement: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.",
    examples: [
      { input: "s = 'anagram', t = 'nagaram'", output: "true", explanation: "Both strings contain exact same characters with identical counts." }
    ],
    brute: {
      title: "Brute Force: Sorting O(N log N)",
      algorithm: {
        english: "Sort both strings alphabetically and check if they are identical.",
        hinglish: "Dono strings ko sort karke compare kar lo."
      },
      pseudocode: `FUNCTION isAnagram(s, t):\n  IF len(s) != len(t): RETURN false\n  SORT(s); SORT(t)\n  RETURN s == t`,
      dryRun: [],
      code: {
        cpp: `bool isAnagram(string s, string t) {\n    if (s.length() != t.length()) return false;\n    sort(s.begin(), s.end());\n    sort(t.begin(), t.end());\n    return s == t;\n}`,
        java: `public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    char[] a = s.toCharArray(), b = t.toCharArray();\n    Arrays.sort(a); Arrays.sort(b);\n    return Arrays.equals(a, b);\n}`,
        python: `def isAnagram(s, t):\n    return sorted(s) == sorted(t)`
      },
      timeComplexity: "O(N log N)", timeExplanation: "Sorting strings of length N.", spaceComplexity: "O(N)", spaceExplanation: "Space for sorted copies."
    },
    optimal: {
      title: "Optimal Approach: HashMap Frequency Counter O(N)",
      algorithm: {
        english: "Use a HashMap or 26-size frequency array. Increment counts for string s and decrement for string t. If all frequency counts are 0, return true.",
        hinglish: "Hashmap ya frequency array bana kar s me '+' karo aur t me '-' karo. Saare zero honge toh valid anagram hai."
      },
      pseudocode: `FUNCTION isAnagram(s, t):\n  IF len(s) != len(t): RETURN false\n  counts = MAP\n  FOR i = 0 TO len(s)-1:\n    counts[s[i]]++\n    counts[t[i]]--\n  FOR val IN counts.values:\n    IF val != 0: RETURN false\n  RETURN true`,
      dryRun: [],
      code: {
        cpp: `bool isAnagram(string s, string t) {\n    if (s.length() != t.length()) return false;\n    unordered_map<char, int> freq;\n    for (int i = 0; i < s.length(); i++) {\n        freq[s[i]]++;\n        freq[t[i]]--;\n    }\n    for (auto const& [key, val] : freq) {\n        if (val != 0) return false;\n    }\n    return true;\n}`,
        java: `public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    Map<Character, Integer> map = new HashMap<>();\n    for (char c : s.toCharArray()) map.put(c, map.getOrDefault(c, 0) + 1);\n    for (char c : t.toCharArray()) {\n        if (!map.containsKey(c)) return false;\n        map.put(c, map.get(c) - 1);\n        if (map.get(c) == 0) map.remove(c);\n    }\n    return map.isEmpty();\n}`,
        python: `def isAnagram(s, t):\n    if len(s) != len(t): return False\n    count = {}\n    for ch in s: count[ch] = count.get(ch, 0) + 1\n    for ch in t:\n        if ch not in count or count[ch] == 0: return False\n        count[ch] -= 1\n    return True`
      },
      timeComplexity: "O(N)", timeExplanation: "Single pass through both strings.", spaceComplexity: "O(K)", spaceExplanation: "O(1) auxiliary space for English alphabet size 26."
    }
  },

  // 267. Unique Number of Occurrences
  267: {
    title: "Unique Number of Occurrences",
    topic: "Hashmaps",
    difficulty: "Easy",
    problemStatement: "Given an array of integers arr, return true if the number of occurrences of each value in the array is unique or false otherwise.",
    examples: [
      { input: "arr = [1,2,2,1,1,3]", output: "true", explanation: "1 occurs 3 times, 2 occurs 2 times, 3 occurs 1 time. Counts are [3,2,1] which are all unique." }
    ],
    brute: {
      title: "Optimal Approach: HashMap + HashSet O(N)",
      algorithm: {
        english: "Count frequencies of all numbers using a HashMap. Then insert all frequencies into a HashSet. If the size of the HashSet equals the number of unique elements in HashMap, return true.",
        hinglish: "Pehle HashMap me frequency nikaalo. Phir un frequencies ko HashSet me daalo. Agar hashset size == map size toh sari frequencies unique hain."
      },
      pseudocode: `FUNCTION uniqueOccurrences(arr):\n  freq = MAP\n  FOR x IN arr: freq[x]++\n  uniqueSet = SET of freq.values\n  RETURN len(uniqueSet) == len(freq)`,
      dryRun: [],
      code: {
        cpp: `bool uniqueOccurrences(vector<int>& arr) {\n    unordered_map<int, int> freq;\n    for (int x : arr) freq[x]++;\n    unordered_set<int> st;\n    for (auto const& [key, val] : freq) {\n        if (st.count(val)) return false;\n        st.insert(val);\n    }\n    return true;\n}`,
        java: `public boolean uniqueOccurrences(int[] arr) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int x : arr) freq.put(x, freq.getOrDefault(x, 0) + 1);\n    Set<Integer> set = new HashSet<>(freq.values());\n    return freq.size() == set.size();\n}`,
        python: `def uniqueOccurrences(arr):\n    count = {}\n    for x in arr: count[x] = count.get(x, 0) + 1\n    return len(set(count.values())) == len(count)`
      },
      timeComplexity: "O(N)", timeExplanation: "Linear scan to count frequencies and insert into set.", spaceComplexity: "O(N)", spaceExplanation: "Space for frequency map and set."
    }
  },

  // 268. Find distinct elements / Find the Frequency
  268: {
    title: "Find distinct elements / Find the Frequency",
    topic: "Hashmaps",
    difficulty: "Easy",
    problemStatement: "Given an array arr of integers and a query integer X, return the frequency of X in the given array.",
    examples: [
      { input: "arr = [1, 1, 1, 1, 1], X = 1", output: "5", explanation: "1 appears 5 times." }
    ],
    brute: {
      title: "Optimal Approach: HashMap Frequency Counter O(N)",
      algorithm: {
        english: "Count frequencies of elements using a HashMap or directly iterate through the array to count occurrences of X.",
        hinglish: "Array me iterate karke dekho kitni baar X aaya."
      },
      pseudocode: `FUNCTION findFrequency(arr, X):\n  cnt = 0\n  FOR val IN arr:\n    IF val == X: cnt++\n  RETURN cnt`,
      dryRun: [],
      code: {
        cpp: `int findFrequency(vector<int>& arr, int x) {\n    int cnt = 0;\n    for (int val : arr) if (val == x) cnt++;\n    return cnt;\n}`,
        java: `public int findFrequency(int[] arr, int x) {\n    int cnt = 0;\n    for (int val : arr) if (val == x) cnt++;\n    return cnt;\n}`,
        python: `def findFrequency(arr, x):\n    return arr.count(x)`
      },
      timeComplexity: "O(N)", timeExplanation: "Single scan of array.", spaceComplexity: "O(1)", spaceExplanation: "No extra memory used."
    }
  },

  // 269. Two Sum
  269: {
    title: "Two Sum",
    topic: "Hashmaps",
    difficulty: "Easy",
    problemStatement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9." }
    ],
    brute: {
      title: "Brute Force: Nested Loops O(N^2)",
      algorithm: {
        english: "Check every pair (i, j) using two nested loops to see if nums[i] + nums[j] == target.",
        hinglish: "Do nested loops chala kar har pair check karo."
      },
      pseudocode: `FUNCTION twoSum(nums, target):\n  FOR i = 0 TO len(nums)-1:\n    FOR j = i+1 TO len(nums)-1:\n      IF nums[i] + nums[j] == target: RETURN [i, j]`,
      dryRun: [],
      code: {
        cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    for (int i = 0; i < nums.size(); i++) {\n        for (int j = i + 1; j < nums.size(); j++) {\n            if (nums[i] + nums[j] == target) return {i, j};\n        }\n    }\n    return {};\n}`,
        java: `public int[] twoSum(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n        for (int j = i + 1; j < nums.length; j++) {\n            if (nums[i] + nums[j] == target) return new int[]{i, j};\n        }\n    }\n    return new int[]{};\n}`,
        python: `def twoSum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target: return [i, j]`
      },
      timeComplexity: "O(N^2)", timeExplanation: "Nested loops over N elements.", spaceComplexity: "O(1)", spaceExplanation: "Constant space."
    },
    optimal: {
      title: "Optimal Approach: HashMap Lookup O(N)",
      algorithm: {
        english: "Iterate through nums. For each element `x`, check if `target - x` exists in a HashMap. If yes, return current index and stored index. Otherwise store `x` with index.",
        hinglish: "HashMap ka use karo. Har number x ke liye check karo kya `target - x` pehle dekha hai."
      },
      pseudocode: `FUNCTION twoSum(nums, target):\n  mp = MAP\n  FOR i = 0 TO len(nums)-1:\n    needed = target - nums[i]\n    IF needed IN mp: RETURN [mp[needed], i]\n    mp[nums[i]] = i`,
      dryRun: [],
      code: {
        cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (mp.count(complement)) return {mp[complement], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}`,
        java: `public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) return new int[]{map.get(complement), i};\n        map.put(nums[i], i);\n    }\n    return new int[]{};\n}`,
        python: `def twoSum(nums, target):\n    mp = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in mp:\n            return [mp[complement], i]\n        mp[num] = i`
      },
      timeComplexity: "O(N)", timeExplanation: "Single pass with O(1) average lookup.", spaceComplexity: "O(N)", spaceExplanation: "HashMap stores up to N entries."
    }
  },

  // 270. Intersection of Two Arrays
  270: {
    title: "Intersection of Two Arrays",
    topic: "Hashmaps",
    difficulty: "Easy",
    problemStatement: "Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.",
    examples: [
      { input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2]", explanation: "2 is the only distinct element present in both arrays." }
    ],
    brute: {
      title: "Optimal Approach: HashSet Intersection O(N + M)",
      algorithm: {
        english: "Insert all elements of nums1 into a set. Then iterate over nums2, checking if the current element is in set1. If so, add it to result set and remove from set1.",
        hinglish: "nums1 ke saare elements set me daalo. Phir nums2 iterate karke match hone waale ko result me add kar do."
      },
      pseudocode: `FUNCTION intersection(nums1, nums2):\n  st = SET of nums1\n  res = SET\n  FOR x IN nums2:\n    IF x IN st: res.add(x)\n  RETURN ARRAY(res)`,
      dryRun: [],
      code: {
        cpp: `vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {\n    unordered_set<int> st(nums1.begin(), nums1.end());\n    vector<int> res;\n    for (int x : nums2) {\n        if (st.count(x)) {\n            res.push_back(x);\n            st.erase(x);\n        }\n    }\n    return res;\n}`,
        java: `public int[] intersection(int[] nums1, int[] nums2) {\n    Set<Integer> set1 = new HashSet<>();\n    for (int n : nums1) set1.add(n);\n    Set<Integer> set2 = new HashSet<>();\n    for (int n : nums2) {\n        if (set1.contains(n)) set2.add(n);\n    }\n    int[] res = new int[set2.size()];\n    int i = 0;\n    for (int n : set2) res[i++] = n;\n    return res;\n}`,
        python: `def intersection(nums1, nums2):\n    return list(set(nums1) & set(nums2))`
      },
      timeComplexity: "O(N + M)", timeExplanation: "Creating set takes O(N) and scanning nums2 takes O(M).", spaceComplexity: "O(N)", spaceExplanation: "Space for HashSet."
    }
  },

  // 271. Count Number of Pairs With Absolute Difference K
  271: {
    title: "Count Number of Pairs With Absolute Difference K",
    topic: "Hashmaps",
    difficulty: "Easy",
    problemStatement: "Given an integer array nums and an integer k, return the number of pairs (i, j) where i < j such that |nums[i] - nums[j]| == k.",
    examples: [
      { input: "nums = [1,2,2,1], k = 1", output: "4", explanation: "The pairs with difference 1 are (nums[0], nums[1]), (nums[0], nums[2]), (nums[1], nums[3]), (nums[2], nums[3])." }
    ],
    brute: {
      title: "Optimal Approach: HashMap Frequency Lookup O(N)",
      algorithm: {
        english: "Iterate through nums while maintaining a frequency map. For each number x, add `freq[x - k]` and `freq[x + k]` to the total pair count.",
        hinglish: "HashMap chalao. Har number x ke liye check karo `x - k` aur `x + k` kitni baar aaye hain."
      },
      pseudocode: `FUNCTION countPairs(nums, k):\n  freq = MAP\n  ans = 0\n  FOR x IN nums:\n    ans += freq[x - k] + freq[x + k]\n    freq[x]++\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `int countPairs(vector<int>& nums, int k) {\n    unordered_map<int, int> freq;\n    int count = 0;\n    for (int x : nums) {\n        count += freq[x - k] + freq[x + k];\n        freq[x]++;\n    }\n    return count;\n}`,
        java: `public int countPairs(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    int count = 0;\n    for (int x : nums) {\n        count += freq.getOrDefault(x - k, 0) + freq.getOrDefault(x + k, 0);\n        freq.put(x, freq.getOrDefault(x, 0) + 1);\n    }\n    return count;\n}`,
        python: `def countPairs(nums, k):\n    freq = {}\n    count = 0\n    for x in nums:\n        count += freq.get(x - k, 0) + freq.get(x + k, 0)\n        freq[x] = freq.get(x, 0) + 1\n    return count`
      },
      timeComplexity: "O(N)", timeExplanation: "Single scan over array.", spaceComplexity: "O(N)", spaceExplanation: "Frequency map storage."
    }
  },

  // 272. Design HashMap
  272: {
    title: "Design HashMap",
    topic: "Hashmaps",
    difficulty: "Medium",
    problemStatement: "Design a HashMap without using any built-in hash table libraries. Implement MyHashMap class with put(key, value), get(key), and remove(key) methods.",
    examples: [
      { input: "put(1, 1), put(2, 2), get(1), get(3), put(2, 1), get(2), remove(2), get(2)", output: "1, -1, 1, -1", explanation: "Handles key collisions using separate chaining." }
    ],
    brute: {
      title: "Optimal Approach: Separate Chaining with Linked Lists O(1) Avg",
      algorithm: {
        english: "Use an array of buckets of size prime number (e.g. 10007). Each bucket contains a linked list or vector of key-value pairs to resolve collisions.",
        hinglish: "10007 size ka bucket array banao. Collisions solve karne ke liye LinkedList ya Vector of pairs use karo."
      },
      pseudocode: `CLASS MyHashMap:\n  SIZE = 10007\n  buckets = ARRAY of LISTS of size SIZE\n  HASH(key) = key % SIZE`,
      dryRun: [],
      code: {
        cpp: `class MyHashMap {\n    struct Node {\n        int key, val;\n        Node* next;\n        Node(int k, int v) : key(k), val(v), next(nullptr) {}\n    };\n    static const int SIZE = 10007;\n    vector<Node*> buckets;\n    int hash(int key) { return key % SIZE; }\npublic:\n    MyHashMap() : buckets(SIZE, nullptr) {}\n    \n    void put(int key, int value) {\n        int idx = hash(key);\n        Node* curr = buckets[idx];\n        while (curr) {\n            if (curr->key == key) { curr->val = value; return; }\n            curr = curr->next;\n        }\n        Node* newNode = new Node(key, value);\n        newNode->next = buckets[idx];\n        buckets[idx] = newNode;\n    }\n    \n    int get(int key) {\n        int idx = hash(key);\n        Node* curr = buckets[idx];\n        while (curr) {\n            if (curr->key == key) return curr->val;\n            curr = curr->next;\n        }\n        return -1;\n    }\n    \n    void remove(int key) {\n        int idx = hash(key);\n        Node* curr = buckets[idx];\n        Node* prev = nullptr;\n        while (curr) {\n            if (curr->key == key) {\n                if (prev) prev->next = curr->next;\n                else buckets[idx] = curr->next;\n                delete curr;\n                return;\n            }\n            prev = curr; curr = curr->next;\n        }\n    }\n};`,
        java: `class MyHashMap {\n    class Node { int key, val; Node next; Node(int k, int v) { key = k; val = v; } }\n    private final int SIZE = 10007;\n    private Node[] buckets;\n    public MyHashMap() { buckets = new Node[SIZE]; }\n    public void put(int key, int value) {\n        int idx = key % SIZE;\n        Node curr = buckets[idx];\n        while (curr != null) {\n            if (curr.key == key) { curr.val = value; return; }\n            curr = curr.next;\n        }\n        Node newNode = new Node(key, value);\n        newNode.next = buckets[idx];\n        buckets[idx] = newNode;\n    }\n    public int get(int key) {\n        int idx = key % SIZE;\n        Node curr = buckets[idx];\n        while (curr != null) {\n            if (curr.key == key) return curr.val;\n            curr = curr.next;\n        }\n        return -1;\n    }\n    public void remove(int key) {\n        int idx = key % SIZE;\n        Node curr = buckets[idx], prev = null;\n        while (curr != null) {\n            if (curr.key == key) {\n                if (prev != null) prev.next = curr.next;\n                else buckets[idx] = curr.next;\n                return;\n            }\n            prev = curr; curr = curr.next;\n        }\n    }\n}`,
        python: `class MyHashMap:\n    def __init__(self):\n        self.size = 10007\n        self.table = [[] for _ in range(self.size)]\n    def put(self, key: int, value: int) -> None:\n        idx = key % self.size\n        for item in self.table[idx]:\n            if item[0] == key: item[1] = value; return\n        self.table[idx].append([key, value])\n    def get(self, key: int) -> int:\n        idx = key % self.size\n        for item in self.table[idx]:\n            if item[0] == key: return item[1]\n        return -1\n    def remove(self, key: int) -> None:\n        idx = key % self.size\n        for i, item in enumerate(self.table[idx]):\n            if item[0] == key:\n                del self.table[idx][i]; return`
      },
      timeComplexity: "O(1) Average", timeExplanation: "O(1) average lookup and put with prime modulus separate chaining.", spaceComplexity: "O(K)", spaceExplanation: "Memory for inserted keys."
    }
  },

  // 273. Group Anagrams
  273: {
    title: "Group Anagrams",
    topic: "Hashmaps",
    difficulty: "Medium",
    problemStatement: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    examples: [
      { input: "strs = ['eat','tea','tan','ate','nat','bat']", output: "[['bat'],['nat','tan'],['ate','eat','tea']]", explanation: "Strings with identical sorted forms belong to the same anagram group." }
    ],
    brute: {
      title: "Optimal Approach: HashMap of Sorted Strings O(N * K log K)",
      algorithm: {
        english: "For each string, create its sorted key representation. Use a HashMap mapping `sortedKey -> List[Original Strings]`. Finally return values of the map.",
        hinglish: "Har string ko sort karo, string ki sorted key HashMap ki key banegi aur original strings uski list me rahengi."
      },
      pseudocode: `FUNCTION groupAnagrams(strs):\n  mp = MAP of String -> List of Strings\n  FOR s IN strs:\n    key = SORT(s)\n    mp[key].append(s)\n  RETURN VALUES(mp)`,
      dryRun: [],
      code: {
        cpp: `vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    unordered_map<string, vector<string>> mp;\n    for (string s : strs) {\n        string key = s;\n        sort(key.begin(), key.end());\n        mp[key].push_back(s);\n    }\n    vector<vector<string>> res;\n    for (auto const& [key, group] : mp) res.push_back(group);\n    return res;\n}`,
        java: `public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> map = new HashMap<>();\n    for (String s : strs) {\n        char[] ca = s.toCharArray();\n        Arrays.sort(ca);\n        String key = String.valueOf(ca);\n        map.putIfAbsent(key, new ArrayList<>());\n        map.get(key).add(s);\n    }\n    return new ArrayList<>(map.values());\n}`,
        python: `def groupAnagrams(strs):\n    mp = {}\n    for s in strs:\n        key = "".join(sorted(s))\n        if key not in mp: mp[key] = []\n        mp[key].append(s)\n    return list(mp.values())`
      },
      timeComplexity: "O(N * K log K)", timeExplanation: "N strings, sorting each string of max length K.", spaceComplexity: "O(N * K)", spaceExplanation: "HashMap storing all strings."
    }
  },

  // 274. Longest Consecutive Sequence
  274: {
    title: "Longest Consecutive Sequence",
    topic: "Hashmaps",
    difficulty: "Medium",
    problemStatement: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence in O(N) time.",
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4." }
    ],
    brute: {
      title: "Brute Force: Sorting O(N log N)",
      algorithm: {
        english: "Sort the array and iterate to count consecutive elements.",
        hinglish: "Array sort karke consecutive numbers ki counting karo."
      },
      pseudocode: `FUNCTION longestConsecutive(nums):\n  SORT(nums)\n  maxLen = 1, currLen = 1\n  ...`,
      dryRun: [],
      code: {
        cpp: `int longestConsecutive(vector<int>& nums) {\n    if (nums.empty()) return 0;\n    sort(nums.begin(), nums.end());\n    int maxLen = 1, currLen = 1;\n    for (int i = 1; i < nums.size(); i++) {\n        if (nums[i] != nums[i-1]) {\n            if (nums[i] == nums[i-1] + 1) currLen++;\n            else {\n                maxLen = max(maxLen, currLen);\n                currLen = 1;\n            }\n        }\n    }\n    return max(maxLen, currLen);\n}`,
        java: `public int longestConsecutive(int[] nums) {\n    if (nums.length == 0) return 0;\n    Arrays.sort(nums);\n    int maxLen = 1, currLen = 1;\n    for (int i = 1; i < nums.length; i++) {\n        if (nums[i] != nums[i-1]) {\n            if (nums[i] == nums[i-1] + 1) currLen++;\n            else { maxLen = Math.max(maxLen, currLen); currLen = 1; }\n        }\n    }\n    return Math.max(maxLen, currLen);\n}`,
        python: `def longestConsecutive(nums):\n    if not nums: return 0\n    nums.sort()\n    maxLen = currLen = 1\n    for i in range(1, len(nums)):\n        if nums[i] != nums[i-1]:\n            if nums[i] == nums[i-1] + 1:\n                currLen += 1\n            else:\n                maxLen = max(maxLen, currLen)\n                currLen = 1\n    return max(maxLen, currLen)`
      },
      timeComplexity: "O(N log N)", timeExplanation: "Sorting takes O(N log N).", spaceComplexity: "O(1)", spaceExplanation: "In-place sorting."
    },
    optimal: {
      title: "Optimal Approach: HashSet Sequence Building O(N)",
      algorithm: {
        english: "Store all numbers in a HashSet. Only start counting a sequence if `num - 1` is NOT in the set (meaning `num` is the start of a sequence). Then count consecutive numbers `num + 1`, `num + 2`, etc.",
        hinglish: "HashSet me saare numbers dalo. Sirf tab counting start karo jab `num - 1` set me NA HO (woh sequence ka pehla number ho). Total iterations O(N) hongi."
      },
      pseudocode: `FUNCTION longestConsecutive(nums):\n  st = SET of nums\n  maxLen = 0\n  FOR x IN st:\n    IF x - 1 NOT IN st: // Start of sequence\n      curr = x, len = 1\n      WHILE curr + 1 IN st:\n        curr++, len++\n      maxLen = MAX(maxLen, len)\n  RETURN maxLen`,
      dryRun: [],
      code: {
        cpp: `int longestConsecutive(vector<int>& nums) {\n    unordered_set<int> st(nums.begin(), nums.end());\n    int maxLen = 0;\n    for (int x : st) {\n        if (!st.count(x - 1)) {\n            int curr = x, currLen = 1;\n            while (st.count(curr + 1)) {\n                curr++; currLen++;\n            }\n            maxLen = max(maxLen, currLen);\n        }\n    }\n    return maxLen;\n}`,
        java: `public int longestConsecutive(int[] nums) {\n    Set<Integer> set = new HashSet<>();\n    for (int n : nums) set.add(n);\n    int maxLen = 0;\n    for (int n : set) {\n        if (!set.contains(n - 1)) {\n            int curr = n, len = 1;\n            while (set.contains(curr + 1)) { curr++; len++; }\n            maxLen = Math.max(maxLen, len);\n        }\n    }\n    return maxLen;\n}`,
        python: `def longestConsecutive(nums):\n    st = set(nums)\n    maxLen = 0\n    for x in st:\n        if (x - 1) not in st:\n            curr = x\n            length = 1\n            while (curr + 1) in st:\n                curr += 1\n                length += 1\n            maxLen = max(maxLen, length)\n    return maxLen`
      },
      timeComplexity: "O(N)", timeExplanation: "Each number is visited at most twice.", spaceComplexity: "O(N)", spaceExplanation: "Space for HashSet."
    }
  },

  // 275. Subarray Sum Equals K
  275: {
    title: "Subarray Sum Equals K",
    topic: "Hashmaps",
    difficulty: "Medium",
    problemStatement: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.",
    examples: [
      { input: "nums = [1,1,1], k = 2", output: "2", explanation: "Subarrays [1,1] at index 0-1 and index 1-2 both sum to 2." }
    ],
    brute: {
      title: "Brute Force: Cumulative Sum O(N^2)",
      algorithm: {
        english: "Use two nested loops to check all possible subarray sums.",
        hinglish: "Do loops chala kar har sub-array ka sum calculate karo."
      },
      pseudocode: `FUNCTION subarraySum(nums, k):\n  count = 0\n  FOR i = 0 TO N-1:\n    sum = 0\n    FOR j = i TO N-1:\n      sum += nums[j]\n      IF sum == k: count++\n  RETURN count`,
      dryRun: [],
      code: {
        cpp: `int subarraySum(vector<int>& nums, int k) {\n    int count = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        int sum = 0;\n        for (int j = i; j < nums.size(); j++) {\n            sum += nums[j];\n            if (sum == k) count++;\n        }\n    }\n    return count;\n}`,
        java: `public int subarraySum(int[] nums, int k) {\n    int count = 0;\n    for (int i = 0; i < nums.length; i++) {\n        int sum = 0;\n        for (int j = i; j < nums.length; j++) {\n            sum += nums[j];\n            if (sum == k) count++;\n        }\n    }\n    return count;\n}`,
        python: `def subarraySum(nums, k):\n    count = 0\n    for i in range(len(nums)):\n        sum_val = 0\n        for j in range(i, len(nums)):\n            sum_val += nums[j]\n            if sum_val == k: count += 1\n    return count`
      },
      timeComplexity: "O(N^2)", timeExplanation: "Two nested loops.", spaceComplexity: "O(1)", spaceExplanation: "No extra space."
    },
    optimal: {
      title: "Optimal Approach: Prefix Sum + HashMap Frequency O(N)",
      algorithm: {
        english: "Maintain running prefix sum `currSum`. If `currSum - k` exists in HashMap, add its frequency to `count`. Store `currSum` frequency in HashMap. Initialize HashMap with `{0: 1}` for prefix sum 0.",
        hinglish: "Prefix sum aur HashMap frequency ka use karo. Agar `currSum - k` HashMap me hai toh uski frequency count me add kar do. Map me `{0: 1}` zaroor rakhein!"
      },
      pseudocode: `FUNCTION subarraySum(nums, k):\n  prefixMap = {0: 1}\n  currSum = 0, count = 0\n  FOR x IN nums:\n    currSum += x\n    IF (currSum - k) IN prefixMap:\n      count += prefixMap[currSum - k]\n    prefixMap[currSum] = prefixMap.get(currSum, 0) + 1\n  RETURN count`,
      dryRun: [],
      code: {
        cpp: `int subarraySum(vector<int>& nums, int k) {\n    unordered_map<int, int> prefixMap;\n    prefixMap[0] = 1;\n    int currSum = 0, count = 0;\n    for (int x : nums) {\n        currSum += x;\n        if (prefixMap.count(currSum - k)) {\n            count += prefixMap[currSum - k];\n        }\n        prefixMap[currSum]++;\n    }\n    return count;\n}`,
        java: `public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> prefixMap = new HashMap<>();\n    prefixMap.put(0, 1);\n    int currSum = 0, count = 0;\n    for (int x : nums) {\n        currSum += x;\n        if (prefixMap.containsKey(currSum - k)) {\n            count += prefixMap.get(currSum - k);\n        }\n        prefixMap.put(currSum, prefixMap.getOrDefault(currSum, 0) + 1);\n    }\n    return count;\n}`,
        python: `def subarraySum(nums, k):\n    prefixMap = {0: 1}\n    currSum = count = 0\n    for x in nums:\n        currSum += x\n        if (currSum - k) in prefixMap:\n            count += prefixMap[currSum - k]\n        prefixMap[currSum] = prefixMap.get(currSum, 0) + 1\n    return count`
      },
      timeComplexity: "O(N)", timeExplanation: "Single scan over array.", spaceComplexity: "O(N)", spaceExplanation: "HashMap stores prefix sums."
    }
  },

  // 276. Contiguous Array / Largest subarray with 0 sum
  276: {
    title: "Contiguous Array / Largest subarray with 0 sum",
    topic: "Hashmaps",
    difficulty: "Medium",
    problemStatement: "Given a binary array nums (containing 0s and 1s), find the maximum length of a contiguous subarray with an equal number of 0s and 1s.",
    examples: [
      { input: "nums = [0,1,0]", output: "2", explanation: "[0, 1] or [1, 0] is the longest contiguous subarray with equal 0s and 1s." }
    ],
    brute: {
      title: "Optimal Approach: Replace 0 with -1 + Prefix Sum Map O(N)",
      algorithm: {
        english: "Treat 0 as -1 and 1 as +1. Then the problem transforms to finding the longest subarray with sum 0! Store first seen index of each prefix sum in a HashMap.",
        hinglish: "0 ko -1 aur 1 ko +1 maano. Problem reduce ho gayi 'Longest Subarray with Sum 0' me! First index map karke max length nikaal lo."
      },
      pseudocode: `FUNCTION findMaxLength(nums):\n  mp = {0: -1}\n  maxLen = 0, currSum = 0\n  FOR i = 0 TO len(nums)-1:\n    currSum += (1 IF nums[i] == 1 ELSE -1)\n    IF currSum IN mp:\n      maxLen = MAX(maxLen, i - mp[currSum])\n    ELSE:\n      mp[currSum] = i\n  RETURN maxLen`,
      dryRun: [],
      code: {
        cpp: `int findMaxLength(vector<int>& nums) {\n    unordered_map<int, int> mp;\n    mp[0] = -1;\n    int maxLen = 0, currSum = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        currSum += (nums[i] == 1 ? 1 : -1);\n        if (mp.count(currSum)) {\n            maxLen = max(maxLen, i - mp[currSum]);\n        } else {\n            mp[currSum] = i;\n        }\n    }\n    return maxLen;\n}`,
        java: `public int findMaxLength(int[] nums) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, -1);\n    int maxLen = 0, currSum = 0;\n    for (int i = 0; i < nums.length; i++) {\n        currSum += (nums[i] == 1 ? 1 : -1);\n        if (map.containsKey(currSum)) {\n            maxLen = Math.max(maxLen, i - map.get(currSum));\n        } else {\n            map.put(currSum, i);\n        }\n    }\n    return maxLen;\n}`,
        python: `def findMaxLength(nums):\n    mp = {0: -1}\n    maxLen = currSum = 0\n    for i, x in enumerate(nums):\n        currSum += 1 if x == 1 else -1\n        if currSum in mp:\n            maxLen = max(maxLen, i - mp[currSum])\n        else:\n            mp[currSum] = i\n    return maxLen`
      },
      timeComplexity: "O(N)", timeExplanation: "Single scan of array.", spaceComplexity: "O(N)", spaceExplanation: "HashMap for prefix sums."
    }
  },

  // 277. Count subarrays with given XOR
  277: {
    title: "Count subarrays with given XOR",
    topic: "Hashmaps",
    difficulty: "Medium",
    problemStatement: "Given an array of integers A and an integer B, return the number of subarrays having bitwise XOR of all elements equal to B.",
    examples: [
      { input: "A = [4, 2, 2, 6, 4], B = 6", output: "4", explanation: "Subarrays with XOR 6 are [4,2], [4,2,2,6,4], [2,2,6], and [6]." }
    ],
    brute: {
      title: "Optimal Approach: Prefix XOR + Frequency Map O(N)",
      algorithm: {
        english: "Using property `XR ^ B = K => XR ^ K = B`. Maintain running prefix XOR `xr`. Add `freq[xr ^ B]` to count. Increment `freq[xr]`. Initialize `freq[0] = 1`.",
        hinglish: "XOR property `XR ^ B` ka use karo. Prefix XOR ko Map me store karte raho aur `xr ^ B` ki frequency count me add karo."
      },
      pseudocode: `FUNCTION solve(A, B):\n  freq = {0: 1}\n  xr = 0, count = 0\n  FOR x IN A:\n    xr ^= x\n    target = xr ^ B\n    IF target IN freq: count += freq[target]\n    freq[xr] = freq.get(xr, 0) + 1\n  RETURN count`,
      dryRun: [],
      code: {
        cpp: `int solve(vector<int>& A, int B) {\n    unordered_map<int, int> freq;\n    freq[0] = 1;\n    int xr = 0, count = 0;\n    for (int x : A) {\n        xr ^= x;\n        int target = xr ^ B;\n        if (freq.count(target)) count += freq[target];\n        freq[xr]++;\n    }\n    return count;\n}`,
        java: `public int solve(int[] A, int B) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n    int xr = 0, count = 0;\n    for (int x : A) {\n        xr ^= x;\n        int target = xr ^ B;\n        if (freq.containsKey(target)) count += freq.get(target);\n        freq.put(xr, freq.getOrDefault(xr, 0) + 1);\n    }\n    return count;\n}`,
        python: `def solve(A, B):\n    freq = {0: 1}\n    xr = count = 0\n    for x in A:\n        xr ^= x\n        target = xr ^ B\n        if target in freq:\n            count += freq[target]\n        freq[xr] = freq.get(xr, 0) + 1\n    return count`
      },
      timeComplexity: "O(N)", timeExplanation: "Single linear pass.", spaceComplexity: "O(N)", spaceExplanation: "Prefix XOR map storage."
    }
  },

  // 278. Subarray Sums Divisible by K
  278: {
    title: "Subarray Sums Divisible by K",
    topic: "Hashmaps",
    difficulty: "Medium",
    problemStatement: "Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.",
    examples: [
      { input: "nums = [4,5,0,-2,-3,1], k = 5", output: "7", explanation: "7 subarrays have a sum divisible by 5." }
    ],
    brute: {
      title: "Optimal Approach: Remainder Map O(N)",
      algorithm: {
        english: "If two prefix sums have the same remainder modulo K, the subarray between them is divisible by K. Handle negative remainders by `rem = ((rem % k) + k) % k`.",
        hinglish: "Agar do prefix sums ka remainder `% K` same hai, toh unke beech ka sub-array K se divisible hoga! Negative remainder handle karna zaroori hai."
      },
      pseudocode: `FUNCTION subarraysDivByK(nums, k):\n  remMap = {0: 1}\n  currSum = 0, count = 0\n  FOR x IN nums:\n    currSum += x\n    rem = ((currSum % k) + k) % k\n    IF rem IN remMap: count += remMap[rem]\n    remMap[rem] = remMap.get(rem, 0) + 1\n  RETURN count`,
      dryRun: [],
      code: {
        cpp: `int subarraysDivByK(vector<int>& nums, int k) {\n    unordered_map<int, int> remMap;\n    remMap[0] = 1;\n    int currSum = 0, count = 0;\n    for (int x : nums) {\n        currSum += x;\n        int rem = ((currSum % k) + k) % k;\n        if (remMap.count(rem)) count += remMap[rem];\n        remMap[rem]++;\n    }\n    return count;\n}`,
        java: `public int subarraysDivByK(int[] nums, int k) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, 1);\n    int currSum = 0, count = 0;\n    for (int x : nums) {\n        currSum += x;\n        int rem = ((currSum % k) + k) % k;\n        if (map.containsKey(rem)) count += map.get(rem);\n        map.put(rem, map.getOrDefault(rem, 0) + 1);\n    }\n    return count;\n}`,
        python: `def subarraysDivByK(nums, k):\n    remMap = {0: 1}\n    currSum = count = 0\n    for x in nums:\n        currSum += x\n        rem = currSum % k\n        if rem in remMap: count += remMap[rem]\n        remMap[rem] = remMap.get(rem, 0) + 1\n    return count`
      },
      timeComplexity: "O(N)", timeExplanation: "Single scan.", spaceComplexity: "O(K)", spaceExplanation: "Remainder map of at most K entries."
    }
  },

  // 279. Continuous Subarray Sum
  279: {
    title: "Continuous Subarray Sum",
    topic: "Hashmaps",
    difficulty: "Medium",
    problemStatement: "Given an integer array nums and an integer k, return true if nums has a good subarray of size at least 2 whose sum is a multiple of k.",
    examples: [
      { input: "nums = [23,2,4,6,7], k = 6", output: "true", explanation: "[2, 4] is a continuous subarray of size 2 whose sum is 6 (a multiple of 6)." }
    ],
    brute: {
      title: "Optimal Approach: Remainder First-Seen Index Map O(N)",
      algorithm: {
        english: "Store the first index of each remainder in a HashMap. If a remainder is seen again at index `i` and `i - firstIndex >= 2`, return true.",
        hinglish: "Remainder ka PEHLA index map me store karo. Agar same remainder wapas mile aur length `>= 2` ho toh return true!"
      },
      pseudocode: `FUNCTION checkSubarraySum(nums, k):\n  remMap = {0: -1}\n  currSum = 0\n  FOR i = 0 TO len(nums)-1:\n    currSum += nums[i]\n    rem = currSum % k\n    IF rem IN remMap:\n      IF i - remMap[rem] >= 2: RETURN true\n    ELSE:\n      remMap[rem] = i\n  RETURN false`,
      dryRun: [],
      code: {
        cpp: `bool checkSubarraySum(vector<int>& nums, int k) {\n    unordered_map<int, int> remMap;\n    remMap[0] = -1;\n    int currSum = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        currSum += nums[i];\n        int rem = currSum % k;\n        if (remMap.count(rem)) {\n            if (i - remMap[rem] >= 2) return true;\n        } else {\n            remMap[rem] = i;\n        }\n    }\n    return false;\n}`,
        java: `public boolean checkSubarraySum(int[] nums, int k) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, -1);\n    int currSum = 0;\n    for (int i = 0; i < nums.length; i++) {\n        currSum += nums[i];\n        int rem = currSum % k;\n        if (map.containsKey(rem)) {\n            if (i - map.get(rem) >= 2) return true;\n        } else {\n            map.put(rem, i);\n        }\n    }\n    return false;\n}`,
        python: `def checkSubarraySum(nums, k):\n    remMap = {0: -1}\n    currSum = 0\n    for i, x in enumerate(nums):\n        currSum += x\n        rem = currSum % k\n        if rem in remMap:\n            if i - remMap[rem] >= 2: return True\n        else:\n            remMap[rem] = i\n    return False`
      },
      timeComplexity: "O(N)", timeExplanation: "Single linear scan.", spaceComplexity: "O(min(N, K))", spaceExplanation: "Map of remainders."
    }
  },

  // 280. Maximum Size Subarray Sum Equals k
  280: {
    title: "Maximum Size Subarray Sum Equals k",
    topic: "Hashmaps",
    difficulty: "Medium",
    problemStatement: "Given an array of integers nums and an integer k, return the maximum length of a subarray that sums to k. If there is not one, return 0 instead.",
    examples: [
      { input: "nums = [1, -1, 5, -2, 3], k = 3", output: "4", explanation: "Subarray [1, -1, 5, -2] sums to 3 and has length 4." }
    ],
    brute: {
      title: "Optimal Approach: First Index Prefix Map O(N)",
      algorithm: {
        english: "Store the FIRST occurrence of each prefix sum in HashMap. If `currSum - k` exists in map, update `maxLen = max(maxLen, i - map[currSum - k])`.",
        hinglish: "Prefix sum ki PEHLI occurrence store karo Map me. Maximum length paane ke liye pehli occurrence hi index subtract karegi!"
      },
      pseudocode: `FUNCTION maxSubArrayLen(nums, k):\n  mp = {0: -1}\n  currSum = 0, maxLen = 0\n  FOR i = 0 TO len(nums)-1:\n    currSum += nums[i]\n    IF (currSum - k) IN mp:\n      maxLen = MAX(maxLen, i - mp[currSum - k])\n    IF currSum NOT IN mp:\n      mp[currSum] = i\n  RETURN maxLen`,
      dryRun: [],
      code: {
        cpp: `int maxSubArrayLen(vector<int>& nums, int k) {\n    unordered_map<int, int> mp;\n    mp[0] = -1;\n    int currSum = 0, maxLen = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        currSum += nums[i];\n        if (mp.count(currSum - k)) {\n            maxLen = max(maxLen, i - mp[currSum - k]);\n        }\n        if (!mp.count(currSum)) {\n            mp[currSum] = i;\n        }\n    }\n    return maxLen;\n}`,
        java: `public int maxSubArrayLen(int[] nums, int k) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, -1);\n    int currSum = 0, maxLen = 0;\n    for (int i = 0; i < nums.length; i++) {\n        currSum += nums[i];\n        if (map.containsKey(currSum - k)) {\n            maxLen = Math.max(maxLen, i - map.get(currSum - k));\n        }\n        if (!map.containsKey(currSum)) {\n            map.put(currSum, i);\n        }\n    }\n    return maxLen;\n}`,
        python: `def maxSubArrayLen(nums, k):\n    mp = {0: -1}\n    currSum = maxLen = 0\n    for i, x in enumerate(nums):\n        currSum += x\n        if (currSum - k) in mp:\n            maxLen = max(maxLen, i - mp[currSum - k])\n        if currSum not in mp:\n            mp[currSum] = i\n    return maxLen`
      },
      timeComplexity: "O(N)", timeExplanation: "Single scan.", spaceComplexity: "O(N)", spaceExplanation: "Prefix sum map storage."
    }
  },

  // 281. Top K Frequent Elements
  281: {
    title: "Top K Frequent Elements",
    topic: "Hashmaps",
    difficulty: "Medium",
    problemStatement: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]", explanation: "1 has frequency 3, 2 has frequency 2. Top 2 frequent elements are [1, 2]." }
    ],
    brute: {
      title: "Optimal Approach: HashMap + Bucket Sort O(N)",
      algorithm: {
        english: "Count frequencies with HashMap. Then create an array of buckets where `bucket[i]` stores numbers with frequency `i`. Iterate buckets from end to collect top K elements.",
        hinglish: "HashMap se frequency ginne ke baad Bucket Sort style me `bucket[freq]` me numbers dalo. Last se K elements fetch kar lo."
      },
      pseudocode: `FUNCTION topKFrequent(nums, k):\n  freq = MAP\n  FOR x IN nums: freq[x]++\n  buckets = ARRAY of LISTS of size len(nums)+1\n  FOR (num, count) IN freq:\n    buckets[count].append(num)\n  res = []\n  FOR i = len(nums) DOWN TO 1:\n    FOR num IN buckets[i]:\n      res.append(num)\n      IF len(res) == k: RETURN res`,
      dryRun: [],
      code: {
        cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {\n    unordered_map<int, int> freq;\n    for (int x : nums) freq[x]++;\n    int n = nums.size();\n    vector<vector<int>> buckets(n + 1);\n    for (auto const& [num, count] : freq) {\n        buckets[count].push_back(num);\n    }\n    vector<int> res;\n    for (int i = n; i >= 1 && res.size() < k; i--) {\n        for (int num : buckets[i]) {\n            res.push_back(num);\n            if (res.size() == k) break;\n        }\n    }\n    return res;\n}`,
        java: `public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int x : nums) freq.put(x, freq.getOrDefault(x, 0) + 1);\n    List<Integer>[] buckets = new List[nums.length + 1];\n    for (int key : freq.keySet()) {\n        int count = freq.get(key);\n        if (buckets[count] == null) buckets[count] = new ArrayList<>();\n        buckets[count].add(key);\n    }\n    int[] res = new int[k];\n    int idx = 0;\n    for (int i = buckets.length - 1; i >= 1 && idx < k; i--) {\n        if (buckets[i] != null) {\n            for (int num : buckets[i]) {\n                res[idx++] = num;\n                if (idx == k) break;\n            }\n        }\n    }\n    return res;\n}`,
        python: `def topKFrequent(nums, k):\n    count = {}\n    for x in nums: count[x] = count.get(x, 0) + 1\n    buckets = [[] for _ in range(len(nums) + 1)]\n    for num, freq in count.items():\n        buckets[freq].append(num)\n    res = []\n    for i in range(len(nums), 0, -1):\n        for num in buckets[i]:\n            res.append(num)\n            if len(res) == k: return res\n    return res`
      },
      timeComplexity: "O(N)", timeExplanation: "Bucket sort runs in O(N) time.", spaceComplexity: "O(N)", spaceExplanation: "Space for frequencies and buckets."
    }
  },

  // 282. LRU Cache (Least Recently Used)
  282: {
    title: "LRU Cache (Least Recently Used)",
    topic: "Hashmaps",
    difficulty: "Hard",
    problemStatement: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement LRUCache with get(key) and put(key, value) in O(1) time complexity.",
    examples: [
      { input: "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)", output: "1, -1", explanation: "2 is evicted when 3 is put because key 1 was recently accessed." }
    ],
    brute: {
      title: "Optimal Approach: HashMap + Doubly Linked List O(1)",
      algorithm: {
        english: "Use a Doubly Linked List to maintain order of usage (head = most recent, tail = least recent). Use HashMap mapping `key -> Node*` for O(1) node access. When capacity is exceeded, delete tail node.",
        hinglish: "HashMap + Doubly Linked List ka combination! HashMap se O(1) node pointer milta hai aur DLL se fast O(1) removal aur insertion head par."
      },
      pseudocode: `CLASS LRUCache:\n  capacity, head, tail, map\n  get(key):\n    IF key IN map:\n      move node to head\n      RETURN node.val\n    RETURN -1\n  put(key, val):\n    IF key IN map: update val, move node to head\n    ELSE:\n      IF size == capacity: remove tail node, delete from map\n      insert new node at head, add to map`,
      dryRun: [],
      code: {
        cpp: `class LRUCache {\n    struct Node {\n        int key, val;\n        Node *prev, *next;\n        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}\n    };\n    int capacity;\n    unordered_map<int, Node*> mp;\n    Node *head, *tail;\n    \n    void addHead(Node* node) {\n        node->next = head->next;\n        node->prev = head;\n        head->next->prev = node;\n        head->next = node;\n    }\n    void removeNode(Node* node) {\n        node->prev->next = node->next;\n        node->next->prev = node->prev;\n    }\npublic:\n    LRUCache(int cap) : capacity(cap) {\n        head = new Node(-1, -1);\n        tail = new Node(-1, -1);\n        head->next = tail; tail->prev = head;\n    }\n    \n    int get(int key) {\n        if (!mp.count(key)) return -1;\n        Node* node = mp[key];\n        removeNode(node);\n        addHead(node);\n        return node->val;\n    }\n    \n    void put(int key, int value) {\n        if (mp.count(key)) {\n            Node* node = mp[key];\n            node->val = value;\n            removeNode(node);\n            addHead(node);\n        } else {\n            if (mp.size() == capacity) {\n                Node* lru = tail->prev;\n                mp.erase(lru->key);\n                removeNode(lru);\n                delete lru;\n            }\n            Node* node = new Node(key, value);\n            mp[key] = node;\n            addHead(node);\n        }\n    }\n};`,
        java: `class LRUCache {\n    class Node { int key, val; Node prev, next; Node(int k, int v) { key = k; val = v; } }\n    private int capacity;\n    private Map<Integer, Node> map = new HashMap<>();\n    private Node head, tail;\n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        head = new Node(-1, -1);\n        tail = new Node(-1, -1);\n        head.next = tail; tail.prev = head;\n    }\n    private void addHead(Node node) {\n        node.next = head.next; node.prev = head;\n        head.next.prev = node; head.next = node;\n    }\n    private void removeNode(Node node) {\n        node.prev.next = node.next; node.next.prev = node.prev;\n    }\n    public int get(int key) {\n        if (!map.containsKey(key)) return -1;\n        Node node = map.get(key);\n        removeNode(node); addHead(node);\n        return node.val;\n    }\n    public void put(int key, int value) {\n        if (map.containsKey(key)) {\n            Node node = map.get(key);\n            node.val = value; removeNode(node); addHead(node);\n        } else {\n            if (map.size() == capacity) {\n                Node lru = tail.prev;\n                map.remove(lru.key); removeNode(lru);\n            }\n            Node node = new Node(key, value);\n            map.put(key, node); addHead(node);\n        }\n    }\n}`,
        python: `class LRUCache:\n    class Node:\n        def __init__(self, k, v):\n            self.key, self.val = k, v\n            self.prev = self.next = None\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.mp = {}\n        self.head = self.Node(-1, -1)\n        self.tail = self.Node(-1, -1)\n        self.head.next = self.tail\n        self.tail.prev = self.head\n    def _add(self, node):\n        node.next = self.head.next; node.prev = self.head\n        self.head.next.prev = node; self.head.next = node\n    def _remove(self, node):\n        node.prev.next = node.next; node.next.prev = node.prev\n    def get(self, key: int) -> int:\n        if key in self.mp:\n            node = self.mp[key]\n            self._remove(node); self._add(node)\n            return node.val\n        return -1\n    def put(self, key: int, value: int) -> None:\n        if key in self.mp:\n            node = self.mp[key]\n            node.val = value\n            self._remove(node); self._add(node)\n        else:\n            if len(self.mp) == self.cap:\n                lru = self.tail.prev\n                del self.mp[lru.key]\n                self._remove(lru)\n            node = self.Node(key, value)\n            self.mp[key] = node\n            self._add(node)`
      },
      timeComplexity: "O(1)", timeExplanation: "Both get and put run in O(1) time.", spaceComplexity: "O(Capacity)", spaceExplanation: "Stores up to Capacity elements."
    }
  },

  // 283. LFU Cache (Least Frequently Used)
  283: {
    title: "LFU Cache (Least Frequently Used)",
    topic: "Hashmaps",
    difficulty: "Hard",
    problemStatement: "Design and implement a data structure for a Least Frequently Used (LFU) cache. Implement get(key) and put(key, value) in O(1) average time complexity.",
    examples: [
      { input: "LFUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), get(3)", output: "1, -1, 3", explanation: "2 is evicted because its frequency is 1 (less than 1's frequency of 2)." }
    ],
    brute: {
      title: "Optimal Approach: Key Map + Frequency Map of Doubly Linked Lists O(1)",
      algorithm: {
        english: "Use keyMap to map `key -> Node*` and freqMap to map `frequency -> DoublyLinkedList`. Track `minFreq`. When capacity is full, evict least recently used node from `freqMap[minFreq]`.",
        hinglish: "KeyMap `key -> Node` aur FreqMap `freq -> DLL` banao. `minFreq` variable se sabse kam baar aane waale node ko delete karo."
      },
      pseudocode: `CLASS LFUCache:\n  cap, minFreq, keyMap, freqMap\n  get(key):\n    IF key NOT IN keyMap: RETURN -1\n    updateFrequency(keyMap[key])\n    RETURN node.val`,
      dryRun: [],
      code: {
        cpp: `class LFUCache {\n    struct Node {\n        int key, val, freq;\n        Node *prev, *next;\n        Node(int k, int v) : key(k), val(v), freq(1), prev(nullptr), next(nullptr) {}\n    };\n    struct List {\n        Node *head, *tail;\n        int size;\n        List() {\n            head = new Node(-1, -1);\n            tail = new Node(-1, -1);\n            head->next = tail; tail->prev = head;\n            size = 0;\n        }\n        void addHead(Node* node) {\n            node->next = head->next;\n            node->prev = head;\n            head->next->prev = node;\n            head->next = node;\n            size++;\n        }\n        void removeNode(Node* node) {\n            node->prev->next = node->next;\n            node->next->prev = node->prev;\n            size--;\n        }\n    };\n    int cap, minFreq;\n    unordered_map<int, Node*> keyMap;\n    unordered_map<int, List*> freqMap;\n    \n    void updateFreq(Node* node) {\n        int f = node->freq;\n        freqMap[f]->removeNode(node);\n        if (freqMap[f]->size == 0 && minFreq == f) minFreq++;\n        node->freq++;\n        if (!freqMap.count(node->freq)) freqMap[node->freq] = new List();\n        freqMap[node->freq]->addHead(node);\n    }\npublic:\n    LFUCache(int capacity) : cap(capacity), minFreq(0) {}\n    \n    int get(int key) {\n        if (!keyMap.count(key)) return -1;\n        Node* node = keyMap[key];\n        updateFreq(node);\n        return node->val;\n    }\n    \n    void put(int key, int value) {\n        if (cap == 0) return;\n        if (keyMap.count(key)) {\n            Node* node = keyMap[key];\n            node->val = value;\n            updateFreq(node);\n        } else {\n            if (keyMap.size() == cap) {\n                List* minList = freqMap[minFreq];\n                Node* lfu = minList->tail->prev;\n                keyMap.erase(lfu->key);\n                minList->removeNode(lfu);\n                delete lfu;\n            }\n            Node* node = new Node(key, value);\n            keyMap[key] = node;\n            minFreq = 1;\n            if (!freqMap.count(1)) freqMap[1] = new List();\n            freqMap[1]->addHead(node);\n        }\n    }\n};`,
        java: `class LFUCache {\n    class Node {\n        int key, val, freq;\n        Node prev, next;\n        Node(int k, int v) { key = k; val = v; freq = 1; }\n    }\n    class DoublyLinkedList {\n        Node head, tail; int size;\n        DoublyLinkedList() {\n            head = new Node(-1, -1); tail = new Node(-1, -1);\n            head.next = tail; tail.prev = head; size = 0;\n        }\n        void addHead(Node node) {\n            node.next = head.next; node.prev = head;\n            head.next.prev = node; head.next = node; size++;\n        }\n        void removeNode(Node node) {\n            node.prev.next = node.next; node.next.prev = node.prev; size--;\n        }\n    }\n    private int cap, minFreq;\n    private Map<Integer, Node> keyMap = new HashMap<>();\n    private Map<Integer, DoublyLinkedList> freqMap = new HashMap<>();\n    public LFUCache(int capacity) { this.cap = capacity; minFreq = 0; }\n    private void updateFreq(Node node) {\n        int f = node.freq;\n        freqMap.get(f).removeNode(node);\n        if (freqMap.get(f).size == 0 && minFreq == f) minFreq++;\n        node.freq++;\n        freqMap.putIfAbsent(node.freq, new DoublyLinkedList());\n        freqMap.get(node.freq).addHead(node);\n    }\n    public int get(int key) {\n        if (!keyMap.containsKey(key)) return -1;\n        Node node = keyMap.get(key);\n        updateFreq(node);\n        return node.val;\n    }\n    public void put(int key, int value) {\n        if (cap == 0) return;\n        if (keyMap.containsKey(key)) {\n            Node node = keyMap.get(key);\n            node.val = value; updateFreq(node);\n        } else {\n            if (keyMap.size() == cap) {\n                DoublyLinkedList list = freqMap.get(minFreq);\n                Node lfu = list.tail.prev;\n                keyMap.remove(lfu.key); list.removeNode(lfu);\n            }\n            Node node = new Node(key, value);\n            keyMap.put(key, node); minFreq = 1;\n            freqMap.putIfAbsent(1, new DoublyLinkedList());\n            freqMap.get(1).addHead(node);\n        }\n    }\n}`,
        python: `class LFUCache:\n    class Node:\n        def __init__(self, k, v):\n            self.key, self.val = k, v\n            self.freq = 1\n            self.prev = self.next = None\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.minFreq = 0\n        self.keyMap = {}\n        self.freqMap = {}\n    def _update(self, node):\n        f = node.freq\n        # remove node from current freq list\n        node.prev.next = node.next; node.next.prev = node.prev\n        if self.freqMap[f][0].next == self.freqMap[f][1] and self.minFreq == f:\n            self.minFreq += 1\n        node.freq += 1\n        f = node.freq\n        if f not in self.freqMap:\n            h, t = self.Node(-1, -1), self.Node(-1, -1)\n            h.next = t; t.prev = h\n            self.freqMap[f] = (h, t)\n        h, t = self.freqMap[f]\n        node.next = h.next; node.prev = h\n        h.next.prev = node; h.next = node\n    def get(self, key: int) -> int:\n        if key in self.keyMap:\n            node = self.keyMap[key]\n            self._update(node)\n            return node.val\n        return -1\n    def put(self, key: int, value: int) -> None:\n        if self.cap == 0: return\n        if key in self.keyMap:\n            node = self.keyMap[key]\n            node.val = value\n            self._update(node)\n        else:\n            if len(self.keyMap) == self.cap:\n                h, t = self.freqMap[self.minFreq]\n                lfu = t.prev\n                del self.keyMap[lfu.key]\n                lfu.prev.next = lfu.next; lfu.next.prev = lfu.prev\n            node = self.Node(key, value)\n            self.keyMap[key] = node\n            self.minFreq = 1\n            if 1 not in self.freqMap:\n                h, t = self.Node(-1, -1), self.Node(-1, -1)\n                h.next = t; t.prev = h\n                self.freqMap[1] = (h, t)\n            h, t = self.freqMap[1]\n            node.next = h.next; node.prev = h\n            h.next.prev = node; h.next = node`
      },
      timeComplexity: "O(1) Average", timeExplanation: "O(1) average time for both get and put operations.", spaceComplexity: "O(Capacity)", spaceExplanation: "Stores at most Capacity elements."
    }
  }
};
