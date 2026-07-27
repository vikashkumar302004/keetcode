export const stringEditorials = {
  // 48. Maximum Occuring Character
  48: {
    title: "Maximum Occuring Character",
    topic: "String Fundamentals",
    difficulty: "Easy",
    problemStatement: "Given a string str of lowercase alphabets. The task is to find the maximum occurring character in the string str. If more than one character occurs the maximum number of time then print the lexicographically smaller character.",
    examples: [ { input: "str = testsample", output: "e", explanation: "e occurs 2 times and is the lexicographically smallest." } ],
    brute: {
      title: "Brute Force Approach: Nested Loops O(N^2)",
      algorithm: { english: "Iterate through each character and count its frequency by iterating through the string again. Keep track of the max count and character.", hinglish: "Har character ke liye baaki string traverse karke uski frequency count karo." },
      pseudocode: `FUNCTION getMaxOccuringChar(str):\n  maxCount = 0, ans = '{'\n  FOR i = 0 TO N-1:\n    count = 0\n    FOR j = 0 TO N-1:\n      IF str[i] == str[j]: count++\n    IF count > maxCount OR (count == maxCount AND str[i] < ans):\n      maxCount = count; ans = str[i]\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `char getMaxOccuringChar(string str) {\n    int maxCount = 0;\n    char ans = '{';\n    for(int i=0; i<str.length(); i++) {\n        int count = 0;\n        for(int j=0; j<str.length(); j++) if(str[i] == str[j]) count++;\n        if(count > maxCount || (count == maxCount && str[i] < ans)) { maxCount = count; ans = str[i]; }\n    }\n    return ans;\n}`,
        java: `public char getMaxOccuringChar(String str) {\n    int maxCount = 0;\n    char ans = '{';\n    for(int i=0; i<str.length(); i++) {\n        int count = 0;\n        for(int j=0; j<str.length(); j++) if(str.charAt(i) == str.charAt(j)) count++;\n        if(count > maxCount || (count == maxCount && str.charAt(i) < ans)) { maxCount = count; ans = str.charAt(i); }\n    }\n    return ans;\n}`,
        python: `def getMaxOccuringChar(s):\n    maxCount, ans = 0, '{'\n    for i in range(len(s)):\n        count = 0\n        for j in range(len(s)):\n            if s[i] == s[j]: count += 1\n        if count > maxCount or (count == maxCount and s[i] < ans):\n            maxCount = count; ans = s[i]\n    return ans`
      },
      timeComplexity: "O(N^2)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Frequency Array O(N)",
      algorithm: { english: "Use a frequency array of size 26 to store counts of each character. Then iterate from 0 to 25 to find the character with the maximum count. Iterating 0 to 25 ensures we naturally pick the lexicographically smallest.", hinglish: "26 size ka ek array banao letters count karne ke liye. Phir 'a' se 'z' tak loop chala ke jiski frequency max ho wo return karo." },
      pseudocode: `FUNCTION getMaxOccuringChar(str):\n  freq = ARRAY of size 26 initialized to 0\n  FOR ch IN str: freq[ch - 'a']++\n  maxCount = 0, ans = 'a'\n  FOR i = 0 TO 25:\n    IF freq[i] > maxCount: maxCount = freq[i]; ans = 'a' + i\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `char getMaxOccuringChar(string str) {\n    vector<int> freq(26, 0);\n    for (char c : str) freq[c - 'a']++;\n    int maxCount = 0;\n    char ans = 'a';\n    for (int i = 0; i < 26; i++) {\n        if (freq[i] > maxCount) {\n            maxCount = freq[i];\n            ans = 'a' + i;\n        }\n    }\n    return ans;\n}`,
        java: `public char getMaxOccuringChar(String str) {\n    int[] freq = new int[26];\n    for (char c : str.toCharArray()) freq[c - 'a']++;\n    int maxCount = 0;\n    char ans = 'a';\n    for (int i = 0; i < 26; i++) {\n        if (freq[i] > maxCount) {\n            maxCount = freq[i];\n            ans = (char)('a' + i);\n        }\n    }\n    return ans;\n}`,
        python: `def getMaxOccuringChar(s):\n    freq = [0] * 26\n    for ch in s: freq[ord(ch) - ord('a')] += 1\n    maxCount, ans = 0, 'a'\n    for i in range(26):\n        if freq[i] > maxCount:\n            maxCount = freq[i]\n            ans = chr(ord('a') + i)\n    return ans`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "Array of constant size 26."
    }
  },

  // 49. Remove Spaces
  49: {
    title: "Remove Spaces",
    topic: "String Fundamentals",
    difficulty: "Easy",
    problemStatement: "Given a string, remove all the spaces from the string and return it.",
    examples: [ { input: "S = 'geeks  for geeks'", output: "geeksforgeeks", explanation: "All spaces are removed." } ],
    brute: {
      title: "Optimal Approach (Only Approach Needed) O(N)",
      algorithm: { english: "Iterate through the string. If the current character is not a space, append it to the result string.", hinglish: "String iterate karo, agar space nahi hai toh result string me jod do." },
      pseudocode: `FUNCTION modify(s):\n  ans = ""\n  FOR ch IN s:\n    IF ch != ' ': ans += ch\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `string modify(string s) {\n    string ans = "";\n    for(char c : s) if(c != ' ') ans += c;\n    return ans;\n}`,
        java: `public String modify(String s) {\n    StringBuilder sb = new StringBuilder();\n    for(char c : s.toCharArray()) if(c != ' ') sb.append(c);\n    return sb.toString();\n}`,
        python: `def modify(s):\n    return s.replace(" ", "")`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(N)", spaceExplanation: "To store the modified string."
    },
    optimal: {
      title: "In-place Approach (Optional) O(N)",
      algorithm: { english: "Keep a pointer for the position of non-space characters and overwrite the string in-place.", hinglish: "Ek pointer use karke string ko in-place update karo." },
      pseudocode: `-`,
      dryRun: [],
      code: {
        cpp: `string modify(string s) {\n    int count = 0;\n    for(int i=0; i<s.length(); i++) {\n        if(s[i] != ' ') s[count++] = s[i];\n    }\n    return s.substr(0, count);\n}`,
        java: `// Same as stringbuilder for java`,
        python: `# Same as replace for python`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 50. Print first letter of every word in the string
  50: {
    title: "Print first letter of every word in the string",
    topic: "String Fundamentals",
    difficulty: "Easy",
    problemStatement: "Given a string S, the task is to create a string with the first letter of every word in the string.",
    examples: [ { input: "S = 'geeks for geeks'", output: "gfg", explanation: "First letters are g, f, g." } ],
    brute: {
      title: "Optimal Approach (Only Approach Needed) O(N)",
      algorithm: { english: "First character is always taken (if not space). For the rest, if the previous character was a space and the current one isn't, append the current character.", hinglish: "Pehla character le lo. Uske baad check karo: agar pichla space tha aur current letter hai, toh usko append kardo." },
      pseudocode: `FUNCTION firstAlphabet(S):\n  ans = ""\n  IF S[0] != ' ': ans += S[0]\n  FOR i = 1 TO N-1:\n    IF S[i-1] == ' ' AND S[i] != ' ': ans += S[i]\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `string firstAlphabet(string S) {\n    string ans = "";\n    if(S.length() > 0 && S[0] != ' ') ans += S[0];\n    for(int i=1; i<S.length(); i++) {\n        if(S[i-1] == ' ' && S[i] != ' ') ans += S[i];\n    }\n    return ans;\n}`,
        java: `public String firstAlphabet(String S) {\n    StringBuilder sb = new StringBuilder();\n    if(S.length() > 0 && S.charAt(0) != ' ') sb.append(S.charAt(0));\n    for(int i=1; i<S.length(); i++) {\n        if(S.charAt(i-1) == ' ' && S.charAt(i) != ' ') sb.append(S.charAt(i));\n    }\n    return sb.toString();\n}`,
        python: `def firstAlphabet(S):\n    words = S.split()\n    return "".join(w[0] for w in words if w)`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(N)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach (Same)", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    }
  },

  // 51. Remove Consecutive Characters
  51: {
    title: "Remove Consecutive Characters",
    topic: "String Fundamentals",
    difficulty: "Easy",
    problemStatement: "Given a string S. For each index i(1<=i<=N-1), erase it if s[i] is equal to s[i-1] in the string.",
    examples: [ { input: "S = aabb", output: "ab", explanation: "Remove adjacent duplicates." } ],
    brute: {
      title: "Optimal Approach (Only Approach Needed) O(N)",
      algorithm: { english: "Iterate from index 1. If the current character is different from the previous one, append it to the result. Always append the first character.", hinglish: "Pehla character append karo. Uske baad wale character tabhi append karo jab wo pichle character se alag ho." },
      pseudocode: `FUNCTION removeConsecutiveCharacter(S):\n  ans = ""\n  IF len(S) == 0: RETURN ans\n  ans += S[0]\n  FOR i = 1 TO N-1:\n    IF S[i] != S[i-1]: ans += S[i]\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `string removeConsecutiveCharacter(string S) {\n    if (S.empty()) return "";\n    string ans = "";\n    ans += S[0];\n    for (int i = 1; i < S.length(); i++) {\n        if (S[i] != S[i - 1]) ans += S[i];\n    }\n    return ans;\n}`,
        java: `public String removeConsecutiveCharacter(String S) {\n    if (S.length() == 0) return "";\n    StringBuilder sb = new StringBuilder();\n    sb.append(S.charAt(0));\n    for (int i = 1; i < S.length(); i++) {\n        if (S.charAt(i) != S.charAt(i - 1)) sb.append(S.charAt(i));\n    }\n    return sb.toString();\n}`,
        python: `def removeConsecutiveCharacter(S):\n    if not S: return ""\n    ans = [S[0]]\n    for i in range(1, len(S)):\n        if S[i] != S[i - 1]: ans.append(S[i])\n    return "".join(ans)`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(N)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach (Same)", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    }
  },

  // 52. Valid Palindrome
  52: {
    title: "Valid Palindrome",
    topic: "String Fundamentals",
    difficulty: "Easy",
    problemStatement: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    examples: [ { input: "s = 'A man, a plan, a canal: Panama'", output: "true", explanation: "'amanaplanacanalpanama' is a palindrome." } ],
    brute: {
      title: "Brute Force Approach: Filter and Reverse O(N)",
      algorithm: { english: "Create a new string with only lowercase alphanumeric characters. Compare it with its reverse.", hinglish: "Nayi string banao jisme sirf letters ho aur lowercase ho. Phir usko reverse karke check kar lo." },
      pseudocode: `FUNCTION isPalindrome(s):\n  filtered = ""\n  FOR ch IN s:\n    IF isAlphanumeric(ch): filtered += lower(ch)\n  reversed = reverse(filtered)\n  RETURN filtered == reversed`,
      dryRun: [],
      code: {
        cpp: `bool isPalindrome(string s) {\n    string temp = "";\n    for(char c : s) {\n        if(isalnum(c)) temp += tolower(c);\n    }\n    string rev = temp;\n    reverse(rev.begin(), rev.end());\n    return rev == temp;\n}`,
        java: `public boolean isPalindrome(String s) {\n    StringBuilder sb = new StringBuilder();\n    for(char c : s.toCharArray()) {\n        if(Character.isLetterOrDigit(c)) sb.append(Character.toLowerCase(c));\n    }\n    String temp = sb.toString();\n    return temp.equals(sb.reverse().toString());\n}`,
        python: `def isPalindrome(s):\n    filtered = [ch.lower() for ch in s if ch.isalnum()]\n    return filtered == filtered[::-1]`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(N)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Two Pointers O(N)",
      algorithm: { english: "Use two pointers, one at the start and one at the end. Skip non-alphanumeric characters. Compare characters (lowercased). If they differ, return false. If they meet, it's a palindrome.", hinglish: "Do pointers lo, start aur end par. Agar koi non-letter aye toh skip kardo. Compare karo, agar match nahi karta toh false." },
      pseudocode: `FUNCTION isPalindrome(s):\n  left = 0, right = N - 1\n  WHILE left < right:\n    WHILE left < right AND NOT isAlphanumeric(s[left]): left++\n    WHILE left < right AND NOT isAlphanumeric(s[right]): right--\n    IF lower(s[left]) != lower(s[right]): RETURN FALSE\n    left++; right--\n  RETURN TRUE`,
      dryRun: [],
      code: {
        cpp: `bool isPalindrome(string s) {\n    int l = 0, r = s.length() - 1;\n    while(l < r) {\n        while(l < r && !isalnum(s[l])) l++;\n        while(l < r && !isalnum(s[r])) r--;\n        if(tolower(s[l]) != tolower(s[r])) return false;\n        l++; r--;\n    }\n    return true;\n}`,
        java: `public boolean isPalindrome(String s) {\n    int l = 0, r = s.length() - 1;\n    while(l < r) {\n        while(l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n        while(l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n        if(Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;\n        l++; r--;\n    }\n    return true;\n}`,
        python: `def isPalindrome(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and not s[l].isalnum(): l += 1\n        while l < r and not s[r].isalnum(): r -= 1\n        if s[l].lower() != s[r].lower(): return False\n        l += 1; r -= 1\n    return True`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 53. Valid Anagram
  53: {
    title: "Valid Anagram",
    topic: "String Fundamentals",
    difficulty: "Easy",
    problemStatement: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase.",
    examples: [ { input: "s = 'anagram', t = 'nagaram'", output: "true", explanation: "Frequencies match." } ],
    brute: {
      title: "Brute Force Approach: Sort O(N log N)",
      algorithm: { english: "Sort both strings. If they are equal after sorting, they are anagrams.", hinglish: "Dono strings ko sort kardo aur check karo equal hain ya nahi." },
      pseudocode: `FUNCTION isAnagram(s, t):\n  IF len(s) != len(t): RETURN FALSE\n  SORT(s); SORT(t)\n  RETURN s == t`,
      dryRun: [],
      code: {
        cpp: `bool isAnagram(string s, string t) {\n    if(s.length() != t.length()) return false;\n    sort(s.begin(), s.end());\n    sort(t.begin(), t.end());\n    return s == t;\n}`,
        java: `public boolean isAnagram(String s, String t) {\n    if(s.length() != t.length()) return false;\n    char[] sArr = s.toCharArray();\n    char[] tArr = t.toCharArray();\n    Arrays.sort(sArr);\n    Arrays.sort(tArr);\n    return Arrays.equals(sArr, tArr);\n}`,
        python: `def isAnagram(s, t):\n    return sorted(s) == sorted(t)`
      },
      timeComplexity: "O(N log N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Frequency Array O(N)",
      algorithm: { english: "Count the frequency of characters in the first string. Then, for the second string, decrement the frequency count. If all counts are zero, they are anagrams.", hinglish: "Ek 26 size ka array lo. Pehle string ke letters ki frequency badhao, aur dusre string ke letters ki ghatao. End mein sab 0 hona chahiye." },
      pseudocode: `FUNCTION isAnagram(s, t):\n  IF len(s) != len(t): RETURN FALSE\n  freq = ARRAY of 26 initialized to 0\n  FOR ch IN s: freq[ch - 'a']++\n  FOR ch IN t: freq[ch - 'a']--\n  FOR f IN freq: IF f != 0 RETURN FALSE\n  RETURN TRUE`,
      dryRun: [],
      code: {
        cpp: `bool isAnagram(string s, string t) {\n    if(s.length() != t.length()) return false;\n    vector<int> freq(26, 0);\n    for(char c : s) freq[c - 'a']++;\n    for(char c : t) freq[c - 'a']--;\n    for(int f : freq) if(f != 0) return false;\n    return true;\n}`,
        java: `public boolean isAnagram(String s, String t) {\n    if(s.length() != t.length()) return false;\n    int[] freq = new int[26];\n    for(char c : s.toCharArray()) freq[c - 'a']++;\n    for(char c : t.toCharArray()) freq[c - 'a']--;\n    for(int f : freq) if(f != 0) return false;\n    return true;\n}`,
        python: `def isAnagram(s, t):\n    if len(s) != len(t): return False\n    freq = [0] * 26\n    for ch in s: freq[ord(ch) - ord('a')] += 1\n    for ch in t: freq[ord(ch) - ord('a')] -= 1\n    return all(f == 0 for f in freq)`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 54. Isomorphic Strings
  54: {
    title: "Isomorphic Strings",
    topic: "String Fundamentals",
    difficulty: "Easy",
    problemStatement: "Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t. All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.",
    examples: [ { input: "s = 'egg', t = 'add'", output: "true", explanation: "'e' maps to 'a', 'g' maps to 'd'." } ],
    brute: {
      title: "Optimal Approach (Only Approach Needed) O(N)",
      algorithm: { english: "Use two arrays or hash maps to keep track of the mapping from s to t and t to s. When processing character s[i] and t[i], if a mapping already exists and doesn't match, return false. Otherwise, establish the mapping.", hinglish: "Do arrays rakho (s->t aur t->s map karne ke liye). Agar current letter ka mapping pehle se hai aur match nahi karta, toh false. Warna map kardo dono taraf." },
      pseudocode: `FUNCTION isIsomorphic(s, t):\n  IF len(s) != len(t): RETURN FALSE\n  mapS = ARRAY of 256 initialized to -1\n  mapT = ARRAY of 256 initialized to -1\n  FOR i = 0 TO N-1:\n    c1 = s[i], c2 = t[i]\n    IF mapS[c1] != -1 AND mapS[c1] != c2: RETURN FALSE\n    IF mapT[c2] != -1 AND mapT[c2] != c1: RETURN FALSE\n    mapS[c1] = c2\n    mapT[c2] = c1\n  RETURN TRUE`,
      dryRun: [],
      code: {
        cpp: `bool isIsomorphic(string s, string t) {\n    vector<int> mapS(256, -1), mapT(256, -1);\n    for (int i = 0; i < s.length(); i++) {\n        if (mapS[s[i]] != -1 && mapS[s[i]] != t[i]) return false;\n        if (mapT[t[i]] != -1 && mapT[t[i]] != s[i]) return false;\n        mapS[s[i]] = t[i];\n        mapT[t[i]] = s[i];\n    }\n    return true;\n}`,
        java: `public boolean isIsomorphic(String s, String t) {\n    int[] mapS = new int[256];\n    int[] mapT = new int[256];\n    Arrays.fill(mapS, -1);\n    Arrays.fill(mapT, -1);\n    for (int i = 0; i < s.length(); i++) {\n        char c1 = s.charAt(i), c2 = t.charAt(i);\n        if (mapS[c1] != -1 && mapS[c1] != c2) return false;\n        if (mapT[c2] != -1 && mapT[c2] != c1) return false;\n        mapS[c1] = c2;\n        mapT[c2] = c1;\n    }\n    return true;\n}`,
        python: `def isIsomorphic(s, t):\n    map_s, map_t = {}, {}\n    for c1, c2 in zip(s, t):\n        if c1 in map_s and map_s[c1] != c2: return False\n        if c2 in map_t and map_t[c2] != c1: return False\n        map_s[c1] = c2\n        map_t[c2] = c1\n    return True`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "Fixed size arrays of 256."
    },
    optimal: {
      title: "Optimal Approach (Same)", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    }
  },

  // 55. Delete Characters To Make Fancy String
  55: {
    title: "Delete Characters To Make Fancy String",
    topic: "String Manipulation",
    difficulty: "Medium",
    problemStatement: "A fancy string is a string where no three consecutive characters are equal. Given a string s, delete the minimum possible number of characters from s to make it fancy.",
    examples: [ { input: "s = 'leeetcode'", output: "'leetcode'", explanation: "Remove one 'e' to avoid three consecutive 'e's." } ],
    brute: {
      title: "Optimal Approach (Only Approach Needed) O(N)",
      algorithm: { english: "Iterate over the string. Maintain a count of consecutive identical characters. If the count is less than 3, append to the result.", hinglish: "String par loop lagao. Count rakho ki lagataar kitne same letters aaye hain. Agar count 3 se kam hai toh result mein daal do." },
      pseudocode: `FUNCTION makeFancyString(s):\n  ans = ""\n  count = 1\n  ans += s[0]\n  FOR i = 1 TO N-1:\n    IF s[i] == s[i-1]: count++\n    ELSE: count = 1\n    IF count < 3: ans += s[i]\n  RETURN ans`,
      dryRun: [],
      code: {
        cpp: `string makeFancyString(string s) {\n    if (s.length() < 3) return s;\n    string ans = "";\n    ans += s[0];\n    int count = 1;\n    for (int i = 1; i < s.length(); i++) {\n        if (s[i] == s[i - 1]) count++;\n        else count = 1;\n        if (count < 3) ans += s[i];\n    }\n    return ans;\n}`,
        java: `public String makeFancyString(String s) {\n    if (s.length() < 3) return s;\n    StringBuilder sb = new StringBuilder();\n    sb.append(s.charAt(0));\n    int count = 1;\n    for (int i = 1; i < s.length(); i++) {\n        if (s.charAt(i) == s.charAt(i - 1)) count++;\n        else count = 1;\n        if (count < 3) sb.append(s.charAt(i));\n    }\n    return sb.toString();\n}`,
        python: `def makeFancyString(s):\n    if len(s) < 3: return s\n    ans = [s[0]]\n    count = 1\n    for i in range(1, len(s)):\n        if s[i] == s[i - 1]: count += 1\n        else: count = 1\n        if count < 3: ans.append(s[i])\n    return "".join(ans)`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(N)", spaceExplanation: "To store the resulting string."
    },
    optimal: {
      title: "Optimal Approach (Same)", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    }
  },

  // 56. Reverse Words in a String
  56: {
    title: "Reverse Words in a String",
    topic: "String Manipulation",
    difficulty: "Medium",
    problemStatement: "Given an input string s, reverse the order of the words. Return a string of the words in reverse order concatenated by a single space. Note that s may contain leading or trailing spaces or multiple spaces between two words.",
    examples: [ { input: "s = 'the sky is blue'", output: "'blue is sky the'", explanation: "Words reversed." } ],
    brute: {
      title: "Brute Force Approach: String Splitting and Reversing O(N)",
      algorithm: { english: "Split the string into words based on spaces. Reverse the array of words and join them with a single space.", hinglish: "String ko spaces ke hisaab se tod lo. Phir words ko ulta karke join kar do." },
      pseudocode: `FUNCTION reverseWords(s):\n  words = split(s, " ")\n  reverse(words)\n  RETURN join(words, " ")`,
      dryRun: [],
      code: {
        cpp: `string reverseWords(string s) {\n    stringstream ss(s);\n    string word;\n    vector<string> words;\n    while(ss >> word) words.push_back(word);\n    string ans = "";\n    for(int i=words.size()-1; i>=0; i--) {\n        ans += words[i] + (i == 0 ? "" : " ");\n    }\n    return ans;\n}`,
        java: `public String reverseWords(String s) {\n    String[] words = s.trim().split("\\\\s+");\n    StringBuilder sb = new StringBuilder();\n    for (int i = words.length - 1; i >= 0; i--) {\n        sb.append(words[i]);\n        if (i > 0) sb.append(" ");\n    }\n    return sb.toString();\n}`,
        python: `def reverseWords(s):\n    return " ".join(s.split()[::-1])`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(N)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Two Pointers (In-place if mutable) O(N)",
      algorithm: { english: "Reverse the entire string, then reverse each word individually, and finally clean up extra spaces.", hinglish: "Pehle puri string ko reverse kardo. Phir usme se har ek word ko individually reverse kardo. Last mein extra spaces hata do." },
      pseudocode: `FUNCTION reverseWords(s):\n  reverse(s.begin(), s.end())\n  start = 0\n  FOR end = 0 TO N:\n    IF s[end] == ' ' OR end == N:\n      reverse(s.begin() + start, s.begin() + end)\n      start = end + 1\n  cleanSpaces(s)`,
      dryRun: [],
      code: {
        cpp: `string reverseWords(string s) {\n    reverse(s.begin(), s.end());\n    int n = s.length(), i = 0, j = 0;\n    while (i < n) {\n        while (i < n && s[i] == ' ') i++;\n        if (i == n) break;\n        int start = j;\n        while (i < n && s[i] != ' ') s[j++] = s[i++];\n        reverse(s.begin() + start, s.begin() + j);\n        if (j < n) s[j++] = ' ';\n    }\n    if (j > 0 && s[j - 1] == ' ') j--;\n    s.resize(j);\n    return s;\n}`,
        java: `// Same logic, Java Strings are immutable so O(N) extra space is needed anyway.`,
        python: `# Strings immutable in Python, so split approach is preferred.`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "In-place in C++ (O(N) for Java/Python due to immutability)."
    }
  },

  // 57. String to integer (atoi)
  57: {
    title: "String to integer (atoi)",
    topic: "String Manipulation",
    difficulty: "Medium",
    problemStatement: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer. Follow rules for whitespace, sign, digits, and bounds ([-2^31, 2^31 - 1]).",
    examples: [ { input: "s = '   -42'", output: "-42", explanation: "Ignore spaces, read sign and digits." } ],
    brute: {
      title: "Optimal Approach (Only Approach Needed) O(N)",
      algorithm: { english: "Skip leading spaces. Check for a sign (+ or -). Process digits while maintaining the result and checking for overflow before multiplying by 10.", hinglish: "Pehle leading spaces ignore karo. Phir sign check karo. Digits read karte jao aur overflow condition ka dhyan rakho." },
      pseudocode: `FUNCTION myAtoi(s):\n  i = 0, sign = 1, res = 0\n  WHILE s[i] == ' ': i++\n  IF s[i] == '-' OR s[i] == '+':\n    sign = (s[i] == '-') ? -1 : 1\n    i++\n  WHILE isDigit(s[i]):\n    digit = s[i] - '0'\n    IF res > INT_MAX / 10 OR (res == INT_MAX / 10 AND digit > 7):\n      RETURN (sign == 1) ? INT_MAX : INT_MIN\n    res = res * 10 + digit\n    i++\n  RETURN res * sign`,
      dryRun: [],
      code: {
        cpp: `int myAtoi(string s) {\n    int i = 0, n = s.length(), sign = 1;\n    while(i < n && s[i] == ' ') i++;\n    if(i < n && (s[i] == '+' || s[i] == '-')) {\n        sign = (s[i] == '-') ? -1 : 1;\n        i++;\n    }\n    int res = 0;\n    while(i < n && isdigit(s[i])) {\n        int digit = s[i] - '0';\n        if (res > INT_MAX / 10 || (res == INT_MAX / 10 && digit > 7)) {\n            return sign == 1 ? INT_MAX : INT_MIN;\n        }\n        res = res * 10 + digit;\n        i++;\n    }\n    return res * sign;\n}`,
        java: `public int myAtoi(String s) {\n    int i = 0, n = s.length(), sign = 1;\n    while(i < n && s.charAt(i) == ' ') i++;\n    if(i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {\n        sign = (s.charAt(i) == '-') ? -1 : 1;\n        i++;\n    }\n    int res = 0;\n    while(i < n && Character.isDigit(s.charAt(i))) {\n        int digit = s.charAt(i) - '0';\n        if (res > Integer.MAX_VALUE / 10 || (res == Integer.MAX_VALUE / 10 && digit > 7)) {\n            return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;\n        }\n        res = res * 10 + digit;\n        i++;\n    }\n    return res * sign;\n}`,
        python: `def myAtoi(s):\n    s = s.lstrip()\n    if not s: return 0\n    sign = 1\n    if s[0] in ['-', '+']:\n        if s[0] == '-': sign = -1\n        s = s[1:]\n    res = 0\n    for char in s:\n        if not char.isdigit(): break\n        res = res * 10 + int(char)\n    res = sign * res\n    INT_MIN, INT_MAX = -2**31, 2**31 - 1\n    if res < INT_MIN: return INT_MIN\n    if res > INT_MAX: return INT_MAX\n    return res`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach (Same)", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    }
  },

  // 58. Roman to integer
  58: {
    title: "Roman to integer",
    topic: "String Manipulation",
    difficulty: "Medium",
    problemStatement: "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given a roman numeral, convert it to an integer.",
    examples: [ { input: "s = 'IX'", output: "9", explanation: "I is before X, so 10 - 1 = 9." } ],
    brute: {
      title: "Optimal Approach (Only Approach Needed) O(N)",
      algorithm: { english: "Iterate from left to right. If the current numeral is less than the next numeral, subtract its value. Otherwise, add its value.", hinglish: "Left se right traverse karo. Agar current symbol ki value agle se choti hai toh minus karo (jaise IV mein I). Nahi toh normal add karo." },
      pseudocode: `FUNCTION romanToInt(s):\n  map = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000}\n  res = 0\n  FOR i = 0 TO N-1:\n    IF i < N-1 AND map[s[i]] < map[s[i+1]]:\n      res -= map[s[i]]\n    ELSE:\n      res += map[s[i]]\n  RETURN res`,
      dryRun: [],
      code: {
        cpp: `int romanToInt(string s) {\n    unordered_map<char, int> roman = {{'I', 1}, {'V', 5}, {'X', 10}, {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}};\n    int res = 0;\n    for(int i=0; i<s.length(); i++) {\n        if(i < s.length() - 1 && roman[s[i]] < roman[s[i+1]]) {\n            res -= roman[s[i]];\n        } else {\n            res += roman[s[i]];\n        }\n    }\n    return res;\n}`,
        java: `public int romanToInt(String s) {\n    Map<Character, Integer> roman = new HashMap<>();\n    roman.put('I', 1); roman.put('V', 5); roman.put('X', 10); roman.put('L', 50);\n    roman.put('C', 100); roman.put('D', 500); roman.put('M', 1000);\n    int res = 0;\n    for(int i=0; i<s.length(); i++) {\n        if(i < s.length() - 1 && roman.get(s.charAt(i)) < roman.get(s.charAt(i+1))) {\n            res -= roman.get(s.charAt(i));\n        } else {\n            res += roman.get(s.charAt(i));\n        }\n    }\n    return res;\n}`,
        python: `def romanToInt(s):\n    roman = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000}\n    res = 0\n    for i in range(len(s)):\n        if i < len(s) - 1 and roman[s[i]] < roman[s[i+1]]:\n            res -= roman[s[i]]\n        else:\n            res += roman[s[i]]\n    return res`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "Map size is constant (7 elements)."
    },
    optimal: {
      title: "Optimal Approach (Same)", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    }
  },

  // 59. Rotate String
  59: {
    title: "Rotate String",
    topic: "String Manipulation",
    difficulty: "Medium",
    problemStatement: "Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s. A shift on s consists of moving the leftmost character of s to the rightmost position.",
    examples: [ { input: "s = 'abcde', goal = 'cdeab'", output: "true", explanation: "Shift by 2 gets cdeab." } ],
    brute: {
      title: "Brute Force Approach: Try all rotations O(N^2)",
      algorithm: { english: "Try shifting the string one by one and check if it matches the goal string.", hinglish: "Har ek character ko ek ek karke shift karo aur check karo ki goal ke equal hai ya nahi." },
      pseudocode: `FUNCTION rotateString(s, goal):\n  IF len(s) != len(goal): RETURN FALSE\n  FOR i = 0 TO len(s)-1:\n    s = s.substr(1) + s[0]\n    IF s == goal: RETURN TRUE\n  RETURN FALSE`,
      dryRun: [],
      code: {
        cpp: `bool rotateString(string s, string goal) {\n    if(s.length() != goal.length()) return false;\n    for(int i=0; i<s.length(); i++) {\n        s = s.substr(1) + s[0];\n        if(s == goal) return true;\n    }\n    return false;\n}`,
        java: `public boolean rotateString(String s, String goal) {\n    if(s.length() != goal.length()) return false;\n    for(int i=0; i<s.length(); i++) {\n        s = s.substring(1) + s.charAt(0);\n        if(s.equals(goal)) return true;\n    }\n    return false;\n}`,
        python: `def rotateString(s, goal):\n    if len(s) != len(goal): return False\n    for _ in range(len(s)):\n        s = s[1:] + s[0]\n        if s == goal: return True\n    return False`
      },
      timeComplexity: "O(N^2)", timeExplanation: "-", spaceComplexity: "O(N)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Concatenation O(N)",
      algorithm: { english: "If we concatenate s with itself (s + s), it contains all possible rotations of s. We just need to check if goal is a substring of (s + s).", hinglish: "Agar hum s ko apne aap se jod de (s + s), usme saari rotations aa jati hain. Bas check karo ki goal string isme exist karti hai ya nahi." },
      pseudocode: `FUNCTION rotateString(s, goal):\n  IF len(s) != len(goal): RETURN FALSE\n  RETURN (s + s).contains(goal)`,
      dryRun: [],
      code: {
        cpp: `bool rotateString(string s, string goal) {\n    if(s.length() != goal.length()) return false;\n    string doubled = s + s;\n    return doubled.find(goal) != string::npos;\n}`,
        java: `public boolean rotateString(String s, String goal) {\n    if(s.length() != goal.length()) return false;\n    String doubled = s + s;\n    return doubled.contains(goal);\n}`,
        python: `def rotateString(s, goal):\n    if len(s) != len(goal): return False\n    return goal in (s + s)`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(N)", spaceExplanation: "For concatenated string."
    }
  },

  // 60. Longest common prefix
  60: {
    title: "Longest common prefix",
    topic: "String Manipulation",
    difficulty: "Medium",
    problemStatement: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
    examples: [ { input: "strs = ['flower','flow','flight']", output: "'fl'", explanation: "'fl' is common." } ],
    brute: {
      title: "Brute Force Approach: Vertical Scanning O(N * M)",
      algorithm: { english: "Take the first string's characters one by one and compare them with the characters at the same index in all other strings.", hinglish: "Pehle string ka har ek character pakdo aur usko baaki sabhi strings ke same index se compare karo. Agar match nahi hua ya end aagaya, toh wahi prefix hai." },
      pseudocode: `FUNCTION longestCommonPrefix(strs):\n  FOR i = 0 TO len(strs[0])-1:\n    c = strs[0][i]\n    FOR j = 1 TO len(strs)-1:\n      IF i == len(strs[j]) OR strs[j][i] != c:\n        RETURN strs[0].substring(0, i)\n  RETURN strs[0]`,
      dryRun: [],
      code: {
        cpp: `string longestCommonPrefix(vector<string>& strs) {\n    if(strs.empty()) return "";\n    for(int i=0; i<strs[0].length(); i++) {\n        char c = strs[0][i];\n        for(int j=1; j<strs.size(); j++) {\n            if(i == strs[j].length() || strs[j][i] != c) {\n                return strs[0].substr(0, i);\n            }\n        }\n    }\n    return strs[0];\n}`,
        java: `public String longestCommonPrefix(String[] strs) {\n    if(strs.length == 0) return "";\n    for(int i=0; i<strs[0].length(); i++) {\n        char c = strs[0].charAt(i);\n        for(int j=1; j<strs.length; j++) {\n            if(i == strs[j].length() || strs[j].charAt(i) != c) {\n                return strs[0].substring(0, i);\n            }\n        }\n    }\n    return strs[0];\n}`,
        python: `def longestCommonPrefix(strs):\n    if not strs: return ""\n    for i in range(len(strs[0])):\n        c = strs[0][i]\n        for j in range(1, len(strs)):\n            if i == len(strs[j]) or strs[j][i] != c:\n                return strs[0][:i]\n    return strs[0]`
      },
      timeComplexity: "O(S)", timeExplanation: "S is sum of all characters in all strings.", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Sorting O(N log N * M)",
      algorithm: { english: "Sort the array of strings lexicographically. Then, compare only the first and last strings in the sorted array, as they will have the most differing characters.", hinglish: "Strings ki array ko sort kardo. Phir sirf pehli aur aakhri string ko compare karo, kyunki sorted array me sabse zyada difference pehle aur aakhri me hi hota hai." },
      pseudocode: `FUNCTION longestCommonPrefix(strs):\n  SORT(strs)\n  first = strs[0], last = strs[strs.size()-1]\n  i = 0\n  WHILE i < len(first) AND i < len(last) AND first[i] == last[i]: i++\n  RETURN first.substring(0, i)`,
      dryRun: [],
      code: {
        cpp: `string longestCommonPrefix(vector<string>& strs) {\n    if(strs.empty()) return "";\n    sort(strs.begin(), strs.end());\n    string first = strs[0], last = strs[strs.size()-1];\n    int i = 0;\n    while(i < first.length() && i < last.length() && first[i] == last[i]) i++;\n    return first.substr(0, i);\n}`,
        java: `public String longestCommonPrefix(String[] strs) {\n    if(strs.length == 0) return "";\n    Arrays.sort(strs);\n    String first = strs[0], last = strs[strs.length-1];\n    int i = 0;\n    while(i < first.length() && i < last.length() && first.charAt(i) == last.charAt(i)) i++;\n    return first.substring(0, i);\n}`,
        python: `def longestCommonPrefix(strs):\n    if not strs: return ""\n    strs.sort()\n    first, last = strs[0], strs[-1]\n    i = 0\n    while i < len(first) and i < len(last) and first[i] == last[i]: i += 1\n    return first[:i]`
      },
      timeComplexity: "O(N log N * M)", timeExplanation: "Sorting takes N log N.", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 61. Longest palindromic substring
  61: {
    title: "Longest palindromic substring",
    topic: "Advanced Problems",
    difficulty: "Hard",
    problemStatement: "Given a string s, return the longest palindromic substring in s.",
    examples: [ { input: "s = 'babad'", output: "'bab' or 'aba'", explanation: "Both are valid palindromes." } ],
    brute: {
      title: "Brute Force Approach: Check all substrings O(N^3)",
      algorithm: { english: "Generate all possible substrings of s, and for each, check if it's a palindrome. Keep track of the maximum length.", hinglish: "String ki saari substrings nikalo, aur har ek ko check karo palindrome hai ya nahi. Jo sabse badi ho usko save karlo." },
      pseudocode: `FUNCTION longestPalindrome(s):\n  maxLen = 0, start = 0\n  FOR i = 0 TO N-1:\n    FOR j = i TO N-1:\n      IF isPalindrome(s, i, j) AND (j - i + 1 > maxLen):\n        maxLen = j - i + 1\n        start = i\n  RETURN s.substring(start, maxLen)`,
      dryRun: [],
      code: {
        cpp: `bool isPalindrome(string& s, int l, int r) {\n    while(l < r) { if(s[l++] != s[r--]) return false; }\n    return true;\n}\nstring longestPalindrome(string s) {\n    int maxLen = 0, start = 0;\n    for(int i=0; i<s.length(); i++) {\n        for(int j=i; j<s.length(); j++) {\n            if(isPalindrome(s, i, j) && (j - i + 1 > maxLen)) {\n                maxLen = j - i + 1; start = i;\n            }\n        }\n    }\n    return s.substr(start, maxLen);\n}`,
        java: `public boolean isPalindrome(String s, int l, int r) {\n    while(l < r) { if(s.charAt(l++) != s.charAt(r--)) return false; }\n    return true;\n}\npublic String longestPalindrome(String s) {\n    int maxLen = 0, start = 0;\n    for(int i=0; i<s.length(); i++) {\n        for(int j=i; j<s.length(); j++) {\n            if(isPalindrome(s, i, j) && (j - i + 1 > maxLen)) {\n                maxLen = j - i + 1; start = i;\n            }\n        }\n    }\n    return s.substring(start, start + maxLen);\n}`,
        python: `def longestPalindrome(s):\n    def isPal(l, r):\n        while l < r:\n            if s[l] != s[r]: return False\n            l += 1; r -= 1\n        return True\n    maxLen, start = 0, 0\n    for i in range(len(s)):\n        for j in range(i, len(s)):\n            if isPal(i, j) and (j - i + 1 > maxLen):\n                maxLen = j - i + 1\n                start = i\n    return s[start:start+maxLen]`
      },
      timeComplexity: "O(N^3)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Expand around center O(N^2)",
      algorithm: { english: "A palindrome mirrors around its center. We can iterate through each character, treating it as the center, and expand outwards. A center can be 1 character (odd length) or between 2 characters (even length).", hinglish: "Har character (aur 2 characters ke beech ki space) ko center mankar left aur right me expand karo. Jitna bada palindrome bane note karlo." },
      pseudocode: `FUNCTION expand(s, l, r):\n  WHILE l >= 0 AND r < N AND s[l] == s[r]: l--; r++\n  RETURN r - l - 1\n\nFUNCTION longestPalindrome(s):\n  start = 0, maxLen = 0\n  FOR i = 0 TO N-1:\n    len1 = expand(s, i, i)\n    len2 = expand(s, i, i+1)\n    len = MAX(len1, len2)\n    IF len > maxLen:\n      maxLen = len\n      start = i - (len - 1) / 2\n  RETURN s.substring(start, maxLen)`,
      dryRun: [],
      code: {
        cpp: `int expand(string& s, int l, int r) {\n    while (l >= 0 && r < s.length() && s[l] == s[r]) { l--; r++; }\n    return r - l - 1;\n}\nstring longestPalindrome(string s) {\n    int start = 0, maxLen = 0;\n    for (int i = 0; i < s.length(); i++) {\n        int len1 = expand(s, i, i);\n        int len2 = expand(s, i, i + 1);\n        int len = max(len1, len2);\n        if (len > maxLen) {\n            maxLen = len;\n            start = i - (len - 1) / 2;\n        }\n    }\n    return s.substr(start, maxLen);\n}`,
        java: `private int expand(String s, int l, int r) {\n    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }\n    return r - l - 1;\n}\npublic String longestPalindrome(String s) {\n    int start = 0, maxLen = 0;\n    for (int i = 0; i < s.length(); i++) {\n        int len1 = expand(s, i, i);\n        int len2 = expand(s, i, i + 1);\n        int len = Math.max(len1, len2);\n        if (len > maxLen) {\n            maxLen = len;\n            start = i - (len - 1) / 2;\n        }\n    }\n    return s.substring(start, start + maxLen);\n}`,
        python: `def longestPalindrome(s):\n    def expand(l, r):\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            l -= 1\n            r += 1\n        return r - l - 1\n    start, maxLen = 0, 0\n    for i in range(len(s)):\n        len1 = expand(i, i)\n        len2 = expand(i, i + 1)\n        length = max(len1, len2)\n        if length > maxLen:\n            maxLen = length\n            start = i - (length - 1) // 2\n    return s[start:start+maxLen]`
      },
      timeComplexity: "O(N^2)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 62. Multiply Two Strings
  62: {
    title: "Multiply Two Strings",
    topic: "Advanced Problems",
    difficulty: "Hard",
    problemStatement: "Given two numbers as strings s1 and s2. Calculate their Product. Numbers can be negative and arbitrarily large.",
    examples: [ { input: "s1 = '11', s2 = '23'", output: "'253'", explanation: "11 * 23 = 253." } ],
    brute: {
      title: "Optimal Approach (Only Approach Needed) O(N * M)",
      algorithm: { english: "Mimic manual multiplication. An array of size N+M stores the result. Multiply each digit, add to the respective position, handle carry, and finally remove leading zeros.", hinglish: "Bachpan ki multiplication mimic karni hai. Ek N+M size ka array lo. Digits ko multiply karke us array me store karte jao, carry aage badhate jao." },
      pseudocode: `FUNCTION multiplyStrings(s1, s2):\n  IF s1 == "0" OR s2 == "0": RETURN "0"\n  res = ARRAY of size N+M initialized to 0\n  FOR i = N-1 DOWNTO 0:\n    FOR j = M-1 DOWNTO 0:\n      mul = (s1[i] - '0') * (s2[j] - '0')\n      sum = mul + res[i + j + 1]\n      res[i + j + 1] = sum % 10\n      res[i + j] += sum / 10\n  Convert res to string, skipping leading zeros.`,
      dryRun: [],
      code: {
        cpp: `string multiplyStrings(string s1, string s2) {\n    int sign = 1;\n    if(s1[0] == '-') { sign *= -1; s1 = s1.substr(1); }\n    if(s2[0] == '-') { sign *= -1; s2 = s2.substr(1); }\n    if(s1 == "0" || s2 == "0") return "0";\n    int n = s1.length(), m = s2.length();\n    vector<int> res(n + m, 0);\n    for(int i = n - 1; i >= 0; i--) {\n        for(int j = m - 1; j >= 0; j--) {\n            int mul = (s1[i] - '0') * (s2[j] - '0');\n            int sum = mul + res[i + j + 1];\n            res[i + j + 1] = sum % 10;\n            res[i + j] += sum / 10;\n        }\n    }\n    string ans = "";\n    for(int val : res) if(!(ans.empty() && val == 0)) ans += to_string(val);\n    return sign == -1 ? "-" + ans : ans;\n}`,
        java: `public String multiplyStrings(String s1, String s2) {\n    int sign = 1;\n    if(s1.charAt(0) == '-') { sign *= -1; s1 = s1.substring(1); }\n    if(s2.charAt(0) == '-') { sign *= -1; s2 = s2.substring(1); }\n    if(s1.equals("0") || s2.equals("0")) return "0";\n    int n = s1.length(), m = s2.length();\n    int[] res = new int[n + m];\n    for(int i = n - 1; i >= 0; i--) {\n        for(int j = m - 1; j >= 0; j--) {\n            int mul = (s1.charAt(i) - '0') * (s2.charAt(j) - '0');\n            int sum = mul + res[i + j + 1];\n            res[i + j + 1] = sum % 10;\n            res[i + j] += sum / 10;\n        }\n    }\n    StringBuilder sb = new StringBuilder();\n    for(int val : res) if(!(sb.length() == 0 && val == 0)) sb.append(val);\n    return sign == -1 ? "-" + sb.toString() : sb.toString();\n}`,
        python: `def multiplyStrings(s1, s2):\n    sign = -1 if (s1.startswith('-') ^ s2.startswith('-')) else 1\n    s1 = s1.lstrip('-')\n    s2 = s2.lstrip('-')\n    if s1 == "0" or s2 == "0": return "0"\n    n, m = len(s1), len(s2)\n    res = [0] * (n + m)\n    for i in range(n - 1, -1, -1):\n        for j in range(m - 1, -1, -1):\n            mul = int(s1[i]) * int(s2[j])\n            total = mul + res[i + j + 1]\n            res[i + j + 1] = total % 10\n            res[i + j] += total // 10\n    ans = "".join(map(str, res)).lstrip('0')\n    return "-" + ans if sign == -1 else ans`
      },
      timeComplexity: "O(N * M)", timeExplanation: "-", spaceComplexity: "O(N + M)", spaceExplanation: "To store intermediate results."
    },
    optimal: {
      title: "Optimal Approach (Same)", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    }
  },

  // 63. Maximum Nesting Depth of the Parentheses
  63: {
    title: "Maximum Nesting Depth of the Parentheses",
    topic: "Advanced Problems",
    difficulty: "Hard",
    problemStatement: "Given a valid parentheses string s, return the nesting depth of s. The nesting depth is the maximum number of nested parentheses at any point.",
    examples: [ { input: "s = '(1+(2*3)+((8)/4))+1'", output: "3", explanation: "Depth of ((8)/4) is 3." } ],
    brute: {
      title: "Optimal Approach (Only Approach Needed) O(N)",
      algorithm: { english: "Maintain a counter for the current depth. Increment on '(' and decrement on ')'. Keep track of the maximum depth seen so far.", hinglish: "Sirf '(' pe depth badhao aur ')' pe depth ghatao. Max depth ko ek variable me save karte raho." },
      pseudocode: `FUNCTION maxDepth(s):\n  depth = 0, maxD = 0\n  FOR ch IN s:\n    IF ch == '(':\n      depth++\n      maxD = MAX(maxD, depth)\n    ELSE IF ch == ')':\n      depth--\n  RETURN maxD`,
      dryRun: [],
      code: {
        cpp: `int maxDepth(string s) {\n    int depth = 0, maxD = 0;\n    for(char c : s) {\n        if(c == '(') {\n            depth++;\n            maxD = max(maxD, depth);\n        } else if(c == ')') {\n            depth--;\n        }\n    }\n    return maxD;\n}`,
        java: `public int maxDepth(String s) {\n    int depth = 0, maxD = 0;\n    for(char c : s.toCharArray()) {\n        if(c == '(') {\n            depth++;\n            maxD = Math.max(maxD, depth);\n        } else if(c == ')') {\n            depth--;\n        }\n    }\n    return maxD;\n}`,
        python: `def maxDepth(s):\n    depth, max_d = 0, 0\n    for char in s:\n        if char == '(':\n            depth += 1\n            max_d = max(max_d, depth)\n        elif char == ')':\n            depth -= 1\n    return max_d`
      },
      timeComplexity: "O(N)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach (Same)", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    }
  },

  // 64. Beauty Of All substrings
  64: {
    title: "Beauty Of All substrings",
    topic: "Advanced Problems",
    difficulty: "Hard",
    problemStatement: "The beauty of a string is the difference in frequencies between the most frequent and least frequent characters. Return the sum of beauty of all of its substrings.",
    examples: [ { input: "s = 'aabcb'", output: "5", explanation: "Calculated across all possible substrings." } ],
    brute: {
      title: "Brute Force / Optimal Approach O(N^2)",
      algorithm: { english: "Iterate all possible starting points. For each, extend the substring character by character. Maintain a frequency array for the current substring. Calculate beauty dynamically by finding max and min frequencies.", hinglish: "Har substring generate karte jao. Ek 26 size ka frequency array rakho jo saath saath update hota rahe. Har step par us array me se max aur min non-zero frequency ka difference beauty me add kardo." },
      pseudocode: `FUNCTION beautySum(s):\n  totalBeauty = 0\n  FOR i = 0 TO N-1:\n    freq = ARRAY[26] initialized to 0\n    FOR j = i TO N-1:\n      freq[s[j] - 'a']++\n      maxF = getMaximum(freq)\n      minF = getMinimumNonZero(freq)\n      totalBeauty += (maxF - minF)\n  RETURN totalBeauty`,
      dryRun: [],
      code: {
        cpp: `int beautySum(string s) {\n    int sum = 0;\n    for (int i = 0; i < s.length(); i++) {\n        vector<int> freq(26, 0);\n        for (int j = i; j < s.length(); j++) {\n            freq[s[j] - 'a']++;\n            int maxF = 0, minF = INT_MAX;\n            for (int f : freq) {\n                if (f > 0) {\n                    maxF = max(maxF, f);\n                    minF = min(minF, f);\n                }\n            }\n            sum += (maxF - minF);\n        }\n    }\n    return sum;\n}`,
        java: `public int beautySum(String s) {\n    int sum = 0;\n    for (int i = 0; i < s.length(); i++) {\n        int[] freq = new int[26];\n        for (int j = i; j < s.length(); j++) {\n            freq[s.charAt(j) - 'a']++;\n            int maxF = 0, minF = Integer.MAX_VALUE;\n            for (int f : freq) {\n                if (f > 0) {\n                    maxF = Math.max(maxF, f);\n                    minF = Math.min(minF, f);\n                }\n            }\n            sum += (maxF - minF);\n        }\n    }\n    return sum;\n}`,
        python: `def beautySum(s):\n    total_sum = 0\n    for i in range(len(s)):\n        freq = [0] * 26\n        for j in range(i, len(s)):\n            freq[ord(s[j]) - ord('a')] += 1\n            valid_freqs = [f for f in freq if f > 0]\n            if valid_freqs:\n                total_sum += max(valid_freqs) - min(valid_freqs)\n    return total_sum`
      },
      timeComplexity: "O(N^2 * 26)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "Array of size 26."
    },
    optimal: {
      title: "Optimal Approach (Same)", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "-", timeExplanation: "-", spaceComplexity: "-", spaceExplanation: "-"
    }
  }
};
