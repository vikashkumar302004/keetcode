// Ultra-Detailed Editorials for Basic Maths / Number Theory Problems 42 to 47

export const mathEditorials = {
  // 42. ARMSTRONG NUMBER
  42: {
    title: "Check if a number is Armstrong",
    topic: "Basic Maths",
    difficulty: "Easy",
    problemStatement: "Given a number N, check if it is an Armstrong number or not. An Armstrong number is a number that is equal to the sum of cubes of its digits (for a 3-digit number). For a general N-digit number, it is equal to the sum of its digits raised to the power of the number of digits.",
    examples: [ { input: "N = 153", output: "true", explanation: "1^3 + 5^3 + 3^3 = 153" }, { input: "N = 170", output: "false", explanation: "1^3 + 7^3 + 0^3 = 344 != 170" } ],
    brute: {
      title: "Optimal Approach: Digit Extraction O(log10(N))",
      algorithm: { english: "1. Count the number of digits in N.\n2. Extract digits one by one using % 10.\n3. Add (digit ^ count) to sum.\n4. Divide N by 10 to remove the last digit.\n5. Compare sum with original N.", hinglish: "1. Number of digits count karo.\n2. %10 karke ek ek digit nikalo, uski power count karke sum me add karo.\n3. N ko 10 se divide karo. Last me original se compare karo." },
      pseudocode: `FUNCTION isArmstrong(N):\n  count = 0, temp = N\n  WHILE temp > 0: count++; temp = temp / 10\n  sum = 0, temp = N\n  WHILE temp > 0:\n    digit = temp % 10\n    sum = sum + POW(digit, count)\n    temp = temp / 10\n  RETURN sum == N`,
      dryRun: [ { step: "1", state: "N=153", action: "Digits=3. sum = 3^3 + 5^3 + 1^3 = 153. Equal!" } ],
      code: {
        cpp: `#include <cmath>\nbool isArmstrong(int n) {\n    int original = n, count = 0, temp = n, sum = 0;\n    while(temp > 0) { count++; temp /= 10; }\n    temp = n;\n    while(temp > 0) { sum += pow(temp % 10, count); temp /= 10; }\n    return sum == original;\n}`,
        java: `public class Solution {\n    public boolean isArmstrong(int n) {\n        int original = n, temp = n, sum = 0;\n        int count = String.valueOf(n).length();\n        while(temp > 0) { sum += Math.pow(temp % 10, count); temp /= 10; }\n        return sum == original;\n    }\n}`,
        python: `def isArmstrong(n):\n    s = str(n)\n    return sum(int(digit)**len(s) for digit in s) == n`
      },
      timeComplexity: "O(log10(N))", timeExplanation: "Depends on number of digits.", spaceComplexity: "O(1)", spaceExplanation: "No extra space."
    },
    optimal: {
      title: "Same as above", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "O(log10(N))", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 43. DIVISORS OF A NUMBER
  43: {
    title: "Print all Divisors of a Number",
    topic: "Basic Maths",
    difficulty: "Easy",
    problemStatement: "Given an integer N, print all of its divisors.",
    examples: [ { input: "N = 36", output: "1 2 3 4 6 9 12 18 36", explanation: "These divide 36 without a remainder." } ],
    brute: {
      title: "Brute Force Approach: Check up to N O(N)",
      algorithm: { english: "1. Loop i from 1 to N.\n2. If N % i == 0, print i.", hinglish: "1. 1 se N tak loop lagao.\n2. Agar N, i se completely divide ho, toh i divisor hai." },
      pseudocode: `FUNCTION printDivisors(N):\n  FOR i FROM 1 TO N:\n    IF N % i == 0: PRINT i`,
      dryRun: [ { step: "1", state: "N=6", action: "1,2,3 divide 6. Print them." } ],
      code: {
        cpp: `#include <iostream>\nvoid printDivisorsBrute(int n) {\n    for(int i=1; i<=n; i++) if(n % i == 0) std::cout << i << " ";\n}`,
        java: `public class Solution {\n    public void printDivisorsBrute(int n) {\n        for(int i=1; i<=n; i++) if(n % i == 0) System.out.print(i + " ");\n    }\n}`,
        python: `def printDivisorsBrute(n):\n    for i in range(1, n+1):\n        if n % i == 0: print(i, end=" ")`
      },
      timeComplexity: "O(N)", timeExplanation: "Loop runs N times.", spaceComplexity: "O(1)", spaceExplanation: "No extra space."
    },
    optimal: {
      title: "Optimal Approach: Check up to √N O(√N)",
      algorithm: { english: "1. Loop i from 1 to √N.\n2. If N % i == 0, print i. Also print N/i if it is different from i.", hinglish: "1. 1 se √N tak loop lagao.\n2. Agar i divisor hai, toh N/i bhi divisor hoga (pair me aate hain). Dono ko collect karo." },
      pseudocode: `FUNCTION printDivisors(N):\n  FOR i FROM 1 TO SQRT(N):\n    IF N % i == 0:\n      PRINT i\n      IF i != N/i: PRINT N/i`,
      dryRun: [ { step: "1", state: "N=36, i=2", action: "36%2=0. Print 2 and 36/2=18" } ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nvector<int> printDivisors(int n) {\n    vector<int> res;\n    for(int i=1; i*i<=n; i++) {\n        if(n % i == 0) {\n            res.push_back(i);\n            if(i != n/i) res.push_back(n/i);\n        }\n    }\n    sort(res.begin(), res.end());\n    return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public List<Integer> printDivisors(int n) {\n        List<Integer> res = new ArrayList<>();\n        for(int i=1; i*i<=n; i++) {\n            if(n % i == 0) {\n                res.add(i);\n                if(i != n/i) res.add(n/i);\n            }\n        }\n        Collections.sort(res);\n        return res;\n    }\n}`,
        python: `def printDivisors(n):\n    res = []\n    for i in range(1, int(n**0.5)+1):\n        if n % i == 0:\n            res.append(i)\n            if i != n//i: res.append(n//i)\n    return sorted(res)`
      },
      timeComplexity: "O(√N)", timeExplanation: "Loop runs up to square root of N.", spaceComplexity: "O(1)", spaceExplanation: "Ignoring output list."
    }
  },

  // 44. CHECK PRIME
  44: {
    title: "Check if a number is Prime",
    topic: "Basic Maths",
    difficulty: "Easy",
    problemStatement: "Given an integer N, check if it is a prime number. A prime number has exactly 2 divisors: 1 and itself.",
    examples: [ { input: "N = 7", output: "true", explanation: "Only divisible by 1 and 7" }, { input: "N = 9", output: "false", explanation: "Divisible by 1, 3, 9" } ],
    brute: {
      title: "Brute Force Approach: Check Divisors O(N)",
      algorithm: { english: "Loop from 2 to N-1 and check if N is divisible.", hinglish: "2 se lekar N-1 tak kisi bhi number se divide karke dekho. Agar ho gaya toh prime nahi." },
      pseudocode: `FUNCTION isPrime(N):\n  IF N <= 1: RETURN FALSE\n  FOR i FROM 2 TO N-1:\n    IF N % i == 0: RETURN FALSE\n  RETURN TRUE`,
      dryRun: [ { step: "1", state: "N=7", action: "Try 2,3,4,5,6. None divide 7. Return true!" } ],
      code: {
        cpp: `bool isPrime(int n) {\n    if (n <= 1) return false;\n    for(int i=2; i<n; i++) if(n % i == 0) return false;\n    return true;\n}`,
        java: `public class Solution {\n    public boolean isPrime(int n) {\n        if (n <= 1) return false;\n        for(int i=2; i<n; i++) if(n % i == 0) return false;\n        return true;\n    }\n}`,
        python: `def isPrime(n):\n    if n <= 1: return False\n    for i in range(2, n):\n        if n % i == 0: return False\n    return True`
      },
      timeComplexity: "O(N)", timeExplanation: "Checking every number up to N.", spaceComplexity: "O(1)", spaceExplanation: "No space used."
    },
    optimal: {
      title: "Optimal Approach: Check up to √N O(√N)",
      algorithm: { english: "Only loop up to the square root of N. If no divisor is found by √N, the number is prime.", hinglish: "Sirf √N tak loop chalao. Kyunki agar koi divisor hona hoga, toh √N tak zaroor mil jayega." },
      pseudocode: `FUNCTION isPrime(N):\n  IF N <= 1: RETURN FALSE\n  FOR i FROM 2 TO SQRT(N):\n    IF N % i == 0: RETURN FALSE\n  RETURN TRUE`,
      dryRun: [ { step: "1", state: "N=37", action: "SQRT(37) ≈ 6. Try 2,3,4,5,6. None divide. Prime!" } ],
      code: {
        cpp: `bool isPrime(int n) {\n    if(n<=1) return false;\n    for(int i=2; i*i<=n; i++) if(n % i == 0) return false;\n    return true;\n}`,
        java: `public class Solution {\n    public boolean isPrime(int n) {\n        if(n<=1) return false;\n        for(int i=2; i*i<=n; i++) if(n % i == 0) return false;\n        return true;\n    }\n}`,
        python: `def isPrime(n):\n    if n <= 1: return False\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0: return False\n    return True`
      },
      timeComplexity: "O(√N)", timeExplanation: "Loop limit reduced significantly.", spaceComplexity: "O(1)", spaceExplanation: "O(1) extra space."
    }
  },

  // 45. GCD / HCF
  45: {
    title: "GCD / HCF of 2 numbers",
    topic: "Basic Maths",
    difficulty: "Easy",
    problemStatement: "Given two integers A and B, find their Greatest Common Divisor (GCD) / Highest Common Factor (HCF).",
    examples: [ { input: "A = 12, B = 15", output: "3", explanation: "Largest number dividing both is 3." } ],
    brute: {
      title: "Brute Force Approach: Check downwards O(min(A,B))",
      algorithm: { english: "Iterate from min(A,B) down to 1. Return the first number that divides both A and B.", hinglish: "Min(A,B) se 1 tak ulta loop chalao. Jo sabse pehle dono ko divide kare wahi GCD hai." },
      pseudocode: `FUNCTION getGCD(a, b):\n  FOR i FROM MIN(a, b) DOWNTO 1:\n    IF a % i == 0 AND b % i == 0: RETURN i`,
      dryRun: [ { step: "1", state: "A=12,B=15", action: "Min=12. i=12..4 fail. i=3 divides both. GCD=3!" } ],
      code: {
        cpp: `#include <algorithm>\nint getGCDBrute(int a, int b) {\n    for(int i = std::min(a, b); i >= 1; i--) {\n        if(a % i == 0 && b % i == 0) return i;\n    }\n    return 1;\n}`,
        java: `public class Solution {\n    public int getGCDBrute(int a, int b) {\n        for(int i = Math.min(a, b); i >= 1; i--) {\n            if(a % i == 0 && b % i == 0) return i;\n        }\n        return 1;\n    }\n}`,
        python: `def getGCDBrute(a, b):\n    for i in range(min(a,b), 0, -1):\n        if a % i == 0 and b % i == 0: return i\n    return 1`
      },
      timeComplexity: "O(min(A, B))", timeExplanation: "Looping backwards.", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Euclidean Algorithm O(log(min(A,B)))",
      algorithm: { english: "Repeatedly apply GCD(a, b) = GCD(b, a % b) until b becomes 0. Then a is the GCD.", hinglish: "Euclidean algo use karo: GCD(a,b) is same as GCD(b, a%b). Karte raho jab tak remainder 0 na ho jaye." },
      pseudocode: `FUNCTION GCD(a, b):\n  WHILE b != 0:\n    temp = b\n    b = a % b\n    a = temp\n  RETURN a`,
      dryRun: [ { step: "1", state: "a=15, b=12", action: "b=15%12=3, a=12" }, { step: "2", state: "a=12, b=3", action: "b=12%3=0, a=3. Answer 3!" } ],
      code: {
        cpp: `int getGCD(int a, int b) {\n    while(b != 0) { int temp = b; b = a % b; a = temp; }\n    return a;\n}`,
        java: `public class Solution {\n    public int getGCD(int a, int b) {\n        while(b != 0) { int temp = b; b = a % b; a = temp; }\n        return a;\n    }\n}`,
        python: `def getGCD(a, b):\n    while b != 0: a, b = b, a % b\n    return a`
      },
      timeComplexity: "O(log(min(A, B)))", timeExplanation: "Values reduce exponentially.", spaceComplexity: "O(1)", spaceExplanation: "In-place."
    }
  },

  // 46. PRIME FACTORISATION
  46: {
    title: "Prime Factorisation of a Number",
    topic: "Basic Maths",
    difficulty: "Medium",
    problemStatement: "Given a number N, print all its prime factors.",
    examples: [ { input: "N = 60", output: "2 2 3 5", explanation: "2 * 2 * 3 * 5 = 60" } ],
    brute: {
      title: "Brute Force Approach: Check all numbers O(N)",
      algorithm: { english: "Loop from 2 to N. If i divides N, divide N by i repeatedly.", hinglish: "2 se N tak loop chalao. Agar koi divide kar raha hai, toh divide karte jao jab tak possible ho." },
      pseudocode: `FUNCTION primeFactors(N):\n  FOR i FROM 2 TO N:\n    WHILE N % i == 0:\n      PRINT i\n      N = N / i`,
      dryRun: [ { step: "1", state: "N=60", action: "i=2 divides it twice. N becomes 15." } ],
      code: {
        cpp: `#include <vector>\nusing namespace std;\nvector<int> primeFactorsBrute(int n) {\n    vector<int> res;\n    for(int i=2; i<=n; i++) {\n        while(n % i == 0) { res.push_back(i); n /= i; }\n    }\n    return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public List<Integer> primeFactorsBrute(int n) {\n        List<Integer> res = new ArrayList<>();\n        for(int i=2; i<=n; i++) {\n            while(n % i == 0) { res.add(i); n /= i; }\n        }\n        return res;\n    }\n}`,
        python: `def primeFactorsBrute(n):\n    res = []\n    for i in range(2, n+1):\n        while n % i == 0:\n            res.append(i)\n            n //= i\n    return res`
      },
      timeComplexity: "O(N)", timeExplanation: "Loop goes up to N in worst case.", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Check up to √N O(√N)",
      algorithm: { english: "Loop up to √N. Divide N by i. If N > 1 at the end, it's the last prime factor.", hinglish: "Sirf √N tak jao. Agar N bach gaya (>1) loop ke baad, toh khud ek prime factor hai." },
      pseudocode: `FUNCTION primeFactors(N):\n  FOR i FROM 2 TO SQRT(N):\n    WHILE N % i == 0:\n      PRINT i\n      N = N / i\n  IF N > 1: PRINT N`,
      dryRun: [ { step: "1", state: "N=35", action: "i=5 divides it. N=7. Loop ends. N>1 so print 7. Res: 5, 7." } ],
      code: {
        cpp: `#include <vector>\nusing namespace std;\nvector<int> primeFactors(int n) {\n    vector<int> res;\n    for(int i=2; i*i<=n; i++) {\n        while(n % i == 0) { res.push_back(i); n /= i; }\n    }\n    if(n > 1) res.push_back(n);\n    return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public List<Integer> primeFactors(int n) {\n        List<Integer> res = new ArrayList<>();\n        for(int i=2; i*i<=n; i++) {\n            while(n % i == 0) { res.add(i); n /= i; }\n        }\n        if(n > 1) res.add(n);\n        return res;\n    }\n}`,
        python: `def primeFactors(n):\n    res = []\n    for i in range(2, int(n**0.5)+1):\n        while n % i == 0:\n            res.append(i)\n            n //= i\n    if n > 1: res.append(n)\n    return res`
      },
      timeComplexity: "O(√N)", timeExplanation: "Reduced limit to square root of N.", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 47. COUNT PRIMES IN RANGE L TO R
  47: {
    title: "Count Primes in range L to R",
    topic: "Number Theory",
    difficulty: "Medium",
    problemStatement: "Given an integer n, count the number of prime numbers strictly less than n. (Sieve of Eratosthenes)",
    examples: [ { input: "n = 10", output: "4", explanation: "Primes less than 10 are 2, 3, 5, 7." } ],
    brute: {
      title: "Brute Force Approach: Check Prime for Each Number O(N√N)",
      algorithm: { english: "Loop from 2 to N-1. Check if each number is prime using O(√N) method.", hinglish: "Har number ke liye isPrime() function call karo. Bohat time lagega." },
      pseudocode: `FUNCTION countPrimesBrute(N):\n  count = 0\n  FOR i FROM 2 TO N-1:\n    IF isPrime(i): count++\n  RETURN count`,
      dryRun: [ { step: "1", state: "N=10", action: "Check 2,3,4,5,6,7,8,9. 4 primes found." } ],
      code: {
        cpp: `bool isP(int n) { if(n<=1) return false; for(int i=2; i*i<=n; i++) if(n%i==0) return false; return true; }\nint countPrimesBrute(int n) {\n    int c = 0; for(int i=2; i<n; i++) if(isP(i)) c++; return c;\n}`,
        java: `public class Solution {\n    public boolean isP(int n) { if(n<=1) return false; for(int i=2; i*i<=n; i++) if(n%i==0) return false; return true; }\n    public int countPrimesBrute(int n) {\n        int c = 0; for(int i=2; i<n; i++) if(isP(i)) c++; return c;\n    }\n}`,
        python: `def isP(n):\n    if n<=1: return False\n    for i in range(2, int(n**0.5)+1): \n        if n%i==0: return False\n    return True\n\ndef countPrimesBrute(n):\n    return sum(1 for i in range(2, n) if isP(i))`
      },
      timeComplexity: "O(N √N)", timeExplanation: "Loop N times, each takes √N.", spaceComplexity: "O(1)", spaceExplanation: "-"
    },
    optimal: {
      title: "Optimal Approach: Sieve of Eratosthenes O(N log(log N))",
      algorithm: { english: "1. Create boolean array size N initialized to true.\n2. Starting from 2, if a number is true (prime), mark all its multiples as false.\n3. Count remaining true values.", hinglish: "1. Sieve array banao, sabko prime (true) mark karo.\n2. 2 se shuru karo, jo prime mile uske saare multiples ko cross (false) kar do.\n3. Jo bach gaye true, wo primes hain!" },
      pseudocode: `FUNCTION countPrimes(n):\n  primes = ARRAY[n] OF TRUE\n  primes[0] = FALSE, primes[1] = FALSE\n  FOR i FROM 2 TO SQRT(n):\n    IF primes[i]:\n      FOR j FROM i*i TO n STEP i:\n        primes[j] = FALSE\n  RETURN count(TRUE)`,
      dryRun: [ { step: "1", state: "N=10", action: "2 is prime, cross 4,6,8. 3 is prime, cross 9." } ],
      code: {
        cpp: `#include <vector>\nusing namespace std;\nint countPrimes(int n) {\n    if (n <= 2) return 0;\n    vector<bool> isPrime(n, true);\n    isPrime[0] = isPrime[1] = false;\n    for (int i = 2; i * i < n; i++) {\n        if (isPrime[i]) {\n            for (int j = i * i; j < n; j += i) isPrime[j] = false;\n        }\n    }\n    int count = 0;\n    for (int i = 2; i < n; i++) if (isPrime[i]) count++;\n    return count;\n}`,
        java: `public class Solution {\n    public int countPrimes(int n) {\n        if (n <= 2) return 0;\n        boolean[] isPrime = new boolean[n];\n        for (int i = 2; i < n; i++) isPrime[i] = true;\n        for (int i = 2; i * i < n; i++) {\n            if (isPrime[i]) {\n                for (int j = i * i; j < n; j += i) isPrime[j] = false;\n            }\n        }\n        int count = 0;\n        for (int i = 2; i < n; i++) if (isPrime[i]) count++;\n        return count;\n    }\n}`,
        python: `def countPrimes(n):\n    if n <= 2: return 0\n    isPrime = [True] * n\n    isPrime[0] = isPrime[1] = False\n    for i in range(2, int(n**0.5) + 1):\n        if isPrime[i]:\n            for j in range(i*i, n, i):\n                isPrime[j] = False\n    return sum(isPrime)`
      },
      timeComplexity: "O(N log(log N))", timeExplanation: "Sieve math bound.", spaceComplexity: "O(N)", spaceExplanation: "Boolean array of size N."
    }
  }
}
